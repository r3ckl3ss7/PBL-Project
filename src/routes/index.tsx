import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Camera,
  CameraOff,
  CircleGauge,
  Download,
  Eye,
  EyeOff,
  Gauge,
  Power,
  ScanFace,
  ShieldCheck,
  Smile,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useDriverMonitor } from "@/hooks/use-driver-monitor";
import type { FrameMetrics, RiskLevel, SafetyEvent, SessionStats } from "@/lib/driveguard/types";
import { beep, speak, startAlarm, stopAlarm } from "@/lib/driveguard/alerts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DriveGuard AI — Real-Time Driver Safety Monitor" },
      {
        name: "description",
        content:
          "AI-powered driver monitoring that detects drowsiness, yawning and distraction in real time and triggers voice and alarm alerts.",
      },
      { property: "og:title", content: "DriveGuard AI" },
      { property: "og:description", content: "Real-time AI driver safety & accident prevention." },
    ],
  }),
  component: Dashboard,
});

const DROWSY_FRAMES = 35; // ~1.2s of closed eyes @ ~30fps
const DISTRACT_FRAMES = 60; // ~2s looking away
const YAWN_FRAMES = 18;
const NO_FACE_FRAMES = 60;

function levelFromScore(score: number): RiskLevel {
  if (score >= 70) return "dangerous";
  if (score >= 35) return "warning";
  return "safe";
}

function Dashboard() {
  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [metrics, setMetrics] = useState<FrameMetrics | null>(null);
  const [events, setEvents] = useState<SafetyEvent[]>([]);
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [score, setScore] = useState(0);

  // streaks tracked across frames
  const closedRef = useRef(0);
  const awayRef = useRef(0);
  const yawnRef = useRef(0);
  const noFaceRef = useRef(0);
  const lastTickRef = useRef<number>(Date.now());
  const blinkActiveRef = useRef(false);
  const soundOnRef = useRef(soundOn);
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const statsRef = useRef<SessionStats | null>(null);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const pushEvent = useCallback((e: Omit<SafetyEvent, "id" | "ts">) => {
    setEvents((prev) =>
      [
        { ...e, id: crypto.randomUUID(), ts: Date.now() },
        ...prev,
      ].slice(0, 50),
    );
  }, []);

  const onMetrics = useCallback(
    (m: FrameMetrics) => {
      setMetrics(m);

      // time accounting
      const now = Date.now();
      const dt = now - lastTickRef.current;
      lastTickRef.current = now;
      setStats((s) => {
        if (!s) return s;
        const focused = m.faceDetected && !m.lookingAway && !m.eyesClosed;
        return {
          ...s,
          totalMs: s.totalMs + dt,
          focusedMs: s.focusedMs + (focused ? dt : 0),
        };
      });

      // No face
      if (!m.faceDetected) {
        noFaceRef.current += 1;
        if (noFaceRef.current === NO_FACE_FRAMES) {
          pushEvent({
            type: "no_face",
            message: "Driver face not detected.",
            severity: "warn",
          });
          setStats((s) => (s ? { ...s, noFaceEvents: s.noFaceEvents + 1 } : s));
        }
        // decay score slightly
        setScore((sc) => Math.max(0, sc - 0.6));
        return;
      } else {
        noFaceRef.current = 0;
      }

      // Blink detection — count rising edge of eyesClosed brief closures
      if (m.eyesClosed && !blinkActiveRef.current) {
        blinkActiveRef.current = true;
      } else if (!m.eyesClosed && blinkActiveRef.current) {
        blinkActiveRef.current = false;
        // brief closures (< DROWSY_FRAMES) count as blinks
        if (closedRef.current > 0 && closedRef.current < DROWSY_FRAMES) {
          setStats((s) => (s ? { ...s, blinkCount: s.blinkCount + 1 } : s));
        }
        closedRef.current = 0;
      }

      // Drowsiness (sustained eye closure)
      if (m.eyesClosed) {
        closedRef.current += 1;
        if (closedRef.current === DROWSY_FRAMES) {
          pushEvent({
            type: "drowsy",
            message: "Drowsiness detected — eyes closed.",
            severity: "danger",
          });
          setStats((s) => (s ? { ...s, drowsyEvents: s.drowsyEvents + 1 } : s));
          if (soundOnRef.current) speak("Warning! Driver appears drowsy.");
          setScore((sc) => Math.min(100, sc + 35));
        } else if (closedRef.current > DROWSY_FRAMES) {
          setScore((sc) => Math.min(100, sc + 0.6));
        }
      }

      // Yawning
      if (m.yawning) {
        yawnRef.current += 1;
        if (yawnRef.current === YAWN_FRAMES) {
          pushEvent({
            type: "yawn",
            message: "Yawning detected — possible fatigue.",
            severity: "warn",
          });
          setStats((s) => (s ? { ...s, yawnEvents: s.yawnEvents + 1 } : s));
          if (soundOnRef.current) speak("You seem tired. Consider taking a break.");
          setScore((sc) => Math.min(100, sc + 18));
        }
      } else {
        yawnRef.current = 0;
      }

      // Distraction (head turned / looking away)
      if (m.lookingAway) {
        awayRef.current += 1;
        if (awayRef.current === DISTRACT_FRAMES) {
          pushEvent({
            type: "distraction",
            message: "Distraction detected — please focus on the road.",
            severity: "danger",
          });
          setStats((s) => (s ? { ...s, distractionEvents: s.distractionEvents + 1 } : s));
          if (soundOnRef.current) speak("Please focus on the road.");
          setScore((sc) => Math.min(100, sc + 28));
        } else if (awayRef.current > DISTRACT_FRAMES) {
          setScore((sc) => Math.min(100, sc + 0.4));
        }
      } else {
        awayRef.current = 0;
      }

      // Cool-down decay when behaving well
      if (!m.eyesClosed && !m.lookingAway && !m.yawning) {
        setScore((sc) => Math.max(0, sc - 0.8));
      }
    },
    [pushEvent],
  );

  const { videoRef, overlayRef, ready, loading, error } = useDriverMonitor({
    enabled: running,
    onMetrics,
  });

  // alarm control based on risk level
  const level = levelFromScore(score);
  useEffect(() => {
    if (running && soundOn && level === "dangerous") startAlarm();
    else stopAlarm();
  }, [level, running, soundOn]);
  useEffect(() => () => stopAlarm(), []);

  const start = () => {
    setEvents([]);
    setScore(0);
    closedRef.current = 0;
    awayRef.current = 0;
    yawnRef.current = 0;
    noFaceRef.current = 0;
    lastTickRef.current = Date.now();
    const s: SessionStats = {
      startedAt: Date.now(),
      drowsyEvents: 0,
      yawnEvents: 0,
      distractionEvents: 0,
      noFaceEvents: 0,
      blinkCount: 0,
      focusedMs: 0,
      totalMs: 0,
    };
    setStats(s);
    setRunning(true);
    pushEvent({
      type: "session_start",
      message: "Monitoring session started.",
      severity: "info",
    });
    if (soundOn) beep(880, 0.1);
  };

  const stopSession = () => {
    setRunning(false);
    stopAlarm();
    setStats((s) => (s ? { ...s, endedAt: Date.now() } : s));
    pushEvent({
      type: "session_end",
      message: "Monitoring session ended.",
      severity: "info",
    });
    if (soundOn) beep(440, 0.12);
  };

  const downloadReport = () => {
    const s = statsRef.current;
    if (!s) return;
    const ended = s.endedAt ?? Date.now();
    const focusPct = s.totalMs > 0 ? (s.focusedMs / s.totalMs) * 100 : 0;
    const safetyScore = Math.max(
      0,
      100 -
        s.drowsyEvents * 18 -
        s.distractionEvents * 12 -
        s.yawnEvents * 5 -
        s.noFaceEvents * 4,
    );
    const lines = [
      "DriveGuard AI — Trip Safety Report",
      "===================================",
      `Started:  ${new Date(s.startedAt).toLocaleString()}`,
      `Ended:    ${new Date(ended).toLocaleString()}`,
      `Duration: ${(s.totalMs / 1000 / 60).toFixed(2)} minutes`,
      "",
      `Focus level:        ${focusPct.toFixed(1)} %`,
      `Driver safety score:${safetyScore.toFixed(0)} / 100`,
      "",
      `Drowsiness events:  ${s.drowsyEvents}`,
      `Yawning events:     ${s.yawnEvents}`,
      `Distraction events: ${s.distractionEvents}`,
      `Face-lost events:   ${s.noFaceEvents}`,
      `Total blinks:       ${s.blinkCount}`,
      "",
      "Event log:",
      ...events
        .slice()
        .reverse()
        .map((e) => `  [${new Date(e.ts).toLocaleTimeString()}] ${e.type.padEnd(12)} ${e.message}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `driveguard-report-${new Date().toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const focusPct = useMemo(() => {
    if (!stats || stats.totalMs <= 0) return 100;
    return Math.round((stats.focusedMs / stats.totalMs) * 100);
  }, [stats]);

  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border/60 bg-background/40 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/15 grid place-items-center glow-blue">
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                DriveGuard <span className="text-primary">AI</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Real-time driver safety & accident prevention
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/60 px-3 py-2 text-sm hover:bg-card"
              title="Toggle sound"
            >
              {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              {soundOn ? "Sound on" : "Muted"}
            </button>
            {!running ? (
              <button
                onClick={start}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-blue hover:opacity-90"
              >
                <Camera className="size-4" />
                Start monitoring
              </button>
            ) : (
              <button
                onClick={stopSession}
                className="inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground glow-red hover:opacity-90"
              >
                <Power className="size-4" />
                Stop
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6 grid gap-6 lg:grid-cols-3">
        {/* Camera feed */}
        <section className="lg:col-span-2 space-y-4">
          <div
            className={`relative rounded-2xl border border-border/60 bg-black overflow-hidden scanline ${
              level === "dangerous"
                ? "glow-red pulse-danger"
                : level === "warning"
                  ? "glow-amber"
                  : ready
                    ? "glow-blue"
                    : ""
            }`}
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 size-full object-cover -scale-x-100"
            />
            <canvas
              ref={overlayRef}
              className="absolute inset-0 size-full -scale-x-100 pointer-events-none"
            />

            {!running && (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-background/80 to-background/50">
                <div className="text-center max-w-md px-6">
                  <ScanFace className="size-12 text-primary mx-auto mb-3" />
                  <h2 className="text-xl font-semibold">Driver camera offline</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start monitoring to enable the in-browser AI vision model. We never upload your video.
                  </p>
                </div>
              </div>
            )}

            {running && loading && !ready && (
              <div className="absolute inset-0 grid place-items-center bg-background/60">
                <div className="text-center">
                  <div className="size-8 mx-auto rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                  <p className="text-sm text-muted-foreground mt-3">Loading vision model…</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 grid place-items-center bg-background/80 p-6">
                <div className="text-center max-w-md">
                  <CameraOff className="size-10 text-destructive mx-auto mb-3" />
                  <h3 className="font-semibold">Camera unavailable</h3>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* HUD chips */}
            {ready && metrics && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-2 text-xs">
                <Chip
                  label={metrics.faceDetected ? "Face locked" : "No face"}
                  tone={metrics.faceDetected ? "ok" : "warn"}
                  icon={<ScanFace className="size-3.5" />}
                />
                <Chip
                  label={metrics.eyesClosed ? "Eyes closed" : "Eyes open"}
                  tone={metrics.eyesClosed ? "danger" : "ok"}
                  icon={metrics.eyesClosed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                />
                <Chip
                  label={metrics.yawning ? "Yawning" : "Mouth normal"}
                  tone={metrics.yawning ? "warn" : "ok"}
                  icon={<Smile className="size-3.5" />}
                />
                <Chip
                  label={metrics.lookingAway ? "Looking away" : "On road"}
                  tone={metrics.lookingAway ? "danger" : "ok"}
                  icon={<Activity className="size-3.5" />}
                />
              </div>
            )}
          </div>

          {/* Metric strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Metric
              label="EAR"
              value={metrics ? metrics.ear.toFixed(2) : "—"}
              hint="Eye aspect ratio"
            />
            <Metric
              label="MAR"
              value={metrics ? metrics.mar.toFixed(2) : "—"}
              hint="Mouth aspect ratio"
            />
            <Metric
              label="Head yaw"
              value={metrics ? `${metrics.yaw.toFixed(0)}°` : "—"}
              hint="Left / right turn"
            />
            <Metric
              label="Blinks"
              value={stats ? String(stats.blinkCount) : "0"}
              hint="Session total"
            />
          </div>
        </section>

        {/* Right panel */}
        <aside className="space-y-4">
          <RiskCard score={score} level={level} />

          <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Focus level
              </h3>
              <Gauge className="size-4 text-primary" />
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-bold">{focusPct}</span>
              <span className="text-muted-foreground mb-1.5">%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${focusPct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Session stats
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Drowsy" value={stats?.drowsyEvents ?? 0} tone="danger" />
              <Stat label="Yawns" value={stats?.yawnEvents ?? 0} tone="warn" />
              <Stat label="Distractions" value={stats?.distractionEvents ?? 0} tone="danger" />
              <Stat label="No face" value={stats?.noFaceEvents ?? 0} tone="warn" />
            </div>
            <button
              onClick={downloadReport}
              disabled={!stats}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md border border-border/60 bg-secondary/60 px-3 py-2 text-sm hover:bg-secondary disabled:opacity-50"
            >
              <Download className="size-4" />
              Download trip report
            </button>
          </div>
        </aside>

        {/* Event log full width */}
        <section className="lg:col-span-3 rounded-2xl border border-border/60 bg-card/60">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-primary" />
              <h3 className="font-semibold">Event log</h3>
            </div>
            <span className="text-xs text-muted-foreground">{events.length} events</span>
          </div>
          <div className="max-h-72 overflow-auto divide-y divide-border/40">
            {events.length === 0 && (
              <p className="px-5 py-8 text-sm text-muted-foreground text-center">
                No events yet — start a monitoring session to see real-time alerts.
              </p>
            )}
            {events.map((e) => (
              <div key={e.id} className="px-5 py-3 flex items-center gap-3 text-sm">
                <span
                  className={`size-2 rounded-full ${
                    e.severity === "danger"
                      ? "bg-destructive"
                      : e.severity === "warn"
                        ? "bg-[var(--warning)]"
                        : "bg-primary"
                  }`}
                />
                <span className="text-muted-foreground tabular-nums w-20">
                  {new Date(e.ts).toLocaleTimeString()}
                </span>
                <span className="uppercase text-xs tracking-wider text-muted-foreground w-28">
                  {e.type.replace("_", " ")}
                </span>
                <span className="flex-1">{e.message}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground">
        All video processing runs locally in your browser via MediaPipe FaceLandmarker — nothing is uploaded.
      </footer>
    </div>
  );
}

function Chip({
  label,
  tone,
  icon,
}: {
  label: string;
  tone: "ok" | "warn" | "danger";
  icon?: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "bg-destructive/20 text-destructive border-destructive/40"
      : tone === "warn"
        ? "bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/40"
        : "bg-primary/15 text-primary border-primary/40";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "danger" | "warn" | "ok";
}) {
  const color =
    tone === "danger"
      ? "text-destructive"
      : tone === "warn"
        ? "text-[var(--warning)]"
        : "text-primary";
  return (
    <div className="rounded-lg bg-secondary/60 px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={`text-xl font-semibold tabular-nums ${color}`}>{value}</div>
    </div>
  );
}

function RiskCard({ score, level }: { score: number; level: RiskLevel }) {
  const label = level === "dangerous" ? "Dangerous" : level === "warning" ? "Warning" : "Safe";
  const tone =
    level === "dangerous" ? "glow-red" : level === "warning" ? "glow-amber" : "glow-green";
  const barColor =
    level === "dangerous"
      ? "bg-destructive"
      : level === "warning"
        ? "bg-[var(--warning)]"
        : "bg-[var(--success)]";

  return (
    <div className={`rounded-2xl border border-border/60 bg-card/60 p-5 ${tone}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Risk score
        </h3>
        <CircleGauge className="size-4 text-primary" />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-5xl font-bold tabular-nums">{Math.round(score)}</span>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            level === "dangerous"
              ? "bg-destructive/20 text-destructive"
              : level === "warning"
                ? "bg-[var(--warning)]/20 text-[var(--warning)]"
                : "bg-[var(--success)]/20 text-[var(--success)]"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full transition-all ${barColor}`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Updated continuously from eye closure, yawning and head pose.
      </p>
    </div>
  );
}
