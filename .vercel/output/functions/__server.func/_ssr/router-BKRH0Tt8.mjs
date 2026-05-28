import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as ShieldCheck, V as Volume2, f as VolumeX, C as Camera, P as Power, S as ScanFace, a as CameraOff, c as EyeOff, E as Eye, e as Smile, A as Activity, G as Gauge, D as Download, T as TriangleAlert, b as CircleGauge } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-DCIW4rrL.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DriveGuard AI" },
      { name: "description", content: "App Drivers Safety" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "DriveGuard AI" },
      { property: "og:description", content: "App Drivers Safety" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "DriveGuard AI" },
      { name: "twitter:description", content: "App Drivers Safety" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cd7b4302-59a9-40d6-ae01-2cb364f4f883/id-preview-0cb44cd2--63825ff6-00df-400d-9764-a91c6e55496d.lovable.app-1779958514556.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cd7b4302-59a9-40d6-ae01-2cb364f4f883/id-preview-0cb44cd2--63825ff6-00df-400d-9764-a91c6e55496d.lovable.app-1779958514556.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const Route$1 = createFileRoute("/about")({
  component: AboutPage
});
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 py-12 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "About DriveGuard AI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "DriveGuard AI is an in-browser driver safety monitor that runs locally on your device." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "What it does" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "It detects drowsiness, yawning, and distraction using your camera feed and provides real-time visual and audio alerts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Privacy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "All processing happens in your browser. No video frames are uploaded." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
        children: "Back to dashboard"
      }
    ) })
  ] }) });
}
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
const MOUTH_TOP = 13;
const MOUTH_BOTTOM = 14;
const MOUTH_LEFT = 78;
const MOUTH_RIGHT = 308;
const NOSE_TIP = 1;
const CHIN = 152;
const LEFT_FACE = 234;
const RIGHT_FACE = 454;
const FOREHEAD = 10;
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}
function ear(pts, idx) {
  const p1 = pts[idx[0]];
  const p2 = pts[idx[1]];
  const p3 = pts[idx[2]];
  const p4 = pts[idx[3]];
  const p5 = pts[idx[4]];
  const p6 = pts[idx[5]];
  const vertical = dist(p2, p6) + dist(p3, p5);
  const horizontal = 2 * dist(p1, p4);
  return horizontal === 0 ? 0 : vertical / horizontal;
}
function mar(pts) {
  const v = dist(pts[MOUTH_TOP], pts[MOUTH_BOTTOM]);
  const h = dist(pts[MOUTH_LEFT], pts[MOUTH_RIGHT]);
  return h === 0 ? 0 : v / h;
}
function headPose(pts) {
  const nose = pts[NOSE_TIP];
  const left = pts[LEFT_FACE];
  const right = pts[RIGHT_FACE];
  const midX = (left.x + right.x) / 2;
  const halfW = (right.x - left.x) / 2 || 1;
  const yawNorm = (nose.x - midX) / halfW;
  const yawDeg = Math.max(-60, Math.min(60, yawNorm * 50));
  const forehead = pts[FOREHEAD];
  const chin = pts[CHIN];
  const midY = (forehead.y + chin.y) / 2;
  const halfH = (chin.y - forehead.y) / 2 || 1;
  const pitchNorm = (nose.y - midY) / halfH;
  const pitchDeg = Math.max(-60, Math.min(60, pitchNorm * 50));
  return { yaw: yawDeg, pitch: pitchDeg };
}
const VISION_VERSION = "0.10.14";
function useDriverMonitor({ enabled, onMetrics }) {
  const videoRef = reactExports.useRef(null);
  const overlayRef = reactExports.useRef(null);
  const landmarkerRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [ready, setReady] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const onMetricsRef = reactExports.useRef(onMetrics);
  reactExports.useEffect(() => {
    onMetricsRef.current = onMetrics;
  }, [onMetrics]);
  const stop = reactExports.useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setReady(false);
  }, []);
  reactExports.useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const vision = await import(
          /* @vite-ignore */
          `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VISION_VERSION}/+esm`
        );
        if (cancelled) return;
        const fileset = await vision.FilesetResolver.forVisionTasks(
          `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VISION_VERSION}/wasm`
        );
        const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1
        });
        if (cancelled) return;
        landmarkerRef.current = landmarker;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        setReady(true);
        setLoading(false);
        const loop = () => {
          if (!videoRef.current || !landmarkerRef.current) return;
          const v = videoRef.current;
          if (v.readyState >= 2) {
            const ts = performance.now();
            const res = landmarkerRef.current.detectForVideo(v, ts);
            const overlay = overlayRef.current;
            const lm = res?.faceLandmarks?.[0];
            if (overlay) {
              if (overlay.width !== v.videoWidth || overlay.height !== v.videoHeight) {
                overlay.width = v.videoWidth;
                overlay.height = v.videoHeight;
              }
              const ctx = overlay.getContext("2d");
              if (ctx) {
                ctx.clearRect(0, 0, overlay.width, overlay.height);
                if (lm) {
                  ctx.fillStyle = "rgba(80, 200, 255, 0.85)";
                  for (const p of lm) {
                    ctx.beginPath();
                    ctx.arc(p.x * overlay.width, p.y * overlay.height, 1.1, 0, Math.PI * 2);
                    ctx.fill();
                  }
                  ctx.strokeStyle = "rgba(120, 255, 180, 0.9)";
                  ctx.lineWidth = 1.5;
                  const drawLine = (idxs) => {
                    ctx.beginPath();
                    idxs.forEach((i, k) => {
                      const p = lm[i];
                      const x = p.x * overlay.width;
                      const y = p.y * overlay.height;
                      if (k === 0) ctx.moveTo(x, y);
                      else ctx.lineTo(x, y);
                    });
                    ctx.closePath();
                    ctx.stroke();
                  };
                  drawLine(LEFT_EYE);
                  drawLine(RIGHT_EYE);
                  drawLine([MOUTH_LEFT, MOUTH_TOP, MOUTH_RIGHT, MOUTH_BOTTOM]);
                }
              }
            }
            if (lm) {
              const earL = ear(lm, LEFT_EYE);
              const earR = ear(lm, RIGHT_EYE);
              const earAvg = (earL + earR) / 2;
              const m = mar(lm);
              const { yaw, pitch } = headPose(lm);
              const eyesClosed = earAvg < 0.21;
              const yawning = m > 0.6;
              const lookingAway = Math.abs(yaw) > 22 || Math.abs(pitch) > 22;
              onMetricsRef.current?.({
                faceDetected: true,
                ear: earAvg,
                mar: m,
                yaw,
                pitch,
                eyesClosed,
                yawning,
                lookingAway
              });
            } else {
              onMetricsRef.current?.({
                faceDetected: false,
                ear: 0,
                mar: 0,
                yaw: 0,
                pitch: 0,
                eyesClosed: false,
                yawning: false,
                lookingAway: false
              });
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch (e) {
        console.error(e);
        setError(e?.message ?? "Could not start camera or load model.");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      stop();
    };
  }, [enabled, stop]);
  return { videoRef, overlayRef, ready, loading, error };
}
let lastSpoken = 0;
function speak(text, cooldownMs = 4e3) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - lastSpoken < cooldownMs) return;
  lastSpoken = now;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1;
    u.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
  }
}
let audioCtx = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
let alarmStop = null;
function startAlarm() {
  if (alarmStop) return;
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 880;
  gain.gain.value = 1e-4;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  const t0 = ctx.currentTime;
  const interval = setInterval(() => {
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.setValueAtTime(560, t + 0.18);
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(1e-4, t + 0.35);
  }, 400);
  gain.gain.setValueAtTime(0.12, t0);
  alarmStop = () => {
    clearInterval(interval);
    try {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(1e-4, ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
    }
    alarmStop = null;
  };
}
function stopAlarm() {
  alarmStop?.();
}
function beep(freq = 660, dur = 0.12) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 1e-4;
  osc.connect(gain).connect(ctx.destination);
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(1e-4, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DriveGuard AI — Real-Time Driver Safety Monitor" },
      {
        name: "description",
        content: "AI-powered driver monitoring that detects drowsiness, yawning and distraction in real time and triggers voice and alarm alerts."
      },
      { property: "og:title", content: "DriveGuard AI" },
      { property: "og:description", content: "Real-time AI driver safety & accident prevention." }
    ]
  }),
  component: Dashboard
});
const DROWSY_FRAMES = 35;
const DISTRACT_FRAMES = 60;
const YAWN_FRAMES = 18;
const NO_FACE_FRAMES = 60;
function levelFromScore(score) {
  if (score >= 70) return "dangerous";
  if (score >= 35) return "warning";
  return "safe";
}
function Dashboard() {
  const [running, setRunning] = reactExports.useState(false);
  const [soundOn, setSoundOn] = reactExports.useState(true);
  const [metrics, setMetrics] = reactExports.useState(null);
  const [events, setEvents] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(0);
  const closedRef = reactExports.useRef(0);
  const awayRef = reactExports.useRef(0);
  const yawnRef = reactExports.useRef(0);
  const noFaceRef = reactExports.useRef(0);
  const lastTickRef = reactExports.useRef(Date.now());
  const blinkActiveRef = reactExports.useRef(false);
  const soundOnRef = reactExports.useRef(soundOn);
  reactExports.useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);
  const statsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    statsRef.current = stats;
  }, [stats]);
  const pushEvent = reactExports.useCallback((e) => {
    setEvents(
      (prev) => [
        { ...e, id: crypto.randomUUID(), ts: Date.now() },
        ...prev
      ].slice(0, 50)
    );
  }, []);
  const onMetrics = reactExports.useCallback(
    (m) => {
      setMetrics(m);
      const now = Date.now();
      const dt = now - lastTickRef.current;
      lastTickRef.current = now;
      setStats((s) => {
        if (!s) return s;
        const focused = m.faceDetected && !m.lookingAway && !m.eyesClosed;
        return {
          ...s,
          totalMs: s.totalMs + dt,
          focusedMs: s.focusedMs + (focused ? dt : 0)
        };
      });
      if (!m.faceDetected) {
        noFaceRef.current += 1;
        if (noFaceRef.current === NO_FACE_FRAMES) {
          pushEvent({
            type: "no_face",
            message: "Driver face not detected.",
            severity: "warn"
          });
          setStats((s) => s ? { ...s, noFaceEvents: s.noFaceEvents + 1 } : s);
        }
        setScore((sc) => Math.max(0, sc - 0.6));
        return;
      } else {
        noFaceRef.current = 0;
      }
      if (m.eyesClosed && !blinkActiveRef.current) {
        blinkActiveRef.current = true;
      } else if (!m.eyesClosed && blinkActiveRef.current) {
        blinkActiveRef.current = false;
        if (closedRef.current > 0 && closedRef.current < DROWSY_FRAMES) {
          setStats((s) => s ? { ...s, blinkCount: s.blinkCount + 1 } : s);
        }
        closedRef.current = 0;
      }
      if (m.eyesClosed) {
        closedRef.current += 1;
        if (closedRef.current === DROWSY_FRAMES) {
          pushEvent({
            type: "drowsy",
            message: "Drowsiness detected — eyes closed.",
            severity: "danger"
          });
          setStats((s) => s ? { ...s, drowsyEvents: s.drowsyEvents + 1 } : s);
          if (soundOnRef.current) speak("Warning! Driver appears drowsy.");
          setScore((sc) => Math.min(100, sc + 35));
        } else if (closedRef.current > DROWSY_FRAMES) {
          setScore((sc) => Math.min(100, sc + 0.6));
        }
      }
      if (m.yawning) {
        yawnRef.current += 1;
        if (yawnRef.current === YAWN_FRAMES) {
          pushEvent({
            type: "yawn",
            message: "Yawning detected — possible fatigue.",
            severity: "warn"
          });
          setStats((s) => s ? { ...s, yawnEvents: s.yawnEvents + 1 } : s);
          if (soundOnRef.current) speak("You seem tired. Consider taking a break.");
          setScore((sc) => Math.min(100, sc + 18));
        }
      } else {
        yawnRef.current = 0;
      }
      if (m.lookingAway) {
        awayRef.current += 1;
        if (awayRef.current === DISTRACT_FRAMES) {
          pushEvent({
            type: "distraction",
            message: "Distraction detected — please focus on the road.",
            severity: "danger"
          });
          setStats((s) => s ? { ...s, distractionEvents: s.distractionEvents + 1 } : s);
          if (soundOnRef.current) speak("Please focus on the road.");
          setScore((sc) => Math.min(100, sc + 28));
        } else if (awayRef.current > DISTRACT_FRAMES) {
          setScore((sc) => Math.min(100, sc + 0.4));
        }
      } else {
        awayRef.current = 0;
      }
      if (!m.eyesClosed && !m.lookingAway && !m.yawning) {
        setScore((sc) => Math.max(0, sc - 0.8));
      }
    },
    [pushEvent]
  );
  const { videoRef, overlayRef, ready, loading, error } = useDriverMonitor({
    enabled: running,
    onMetrics
  });
  const level = levelFromScore(score);
  reactExports.useEffect(() => {
    if (running && soundOn && level === "dangerous") startAlarm();
    else stopAlarm();
  }, [level, running, soundOn]);
  reactExports.useEffect(() => () => stopAlarm(), []);
  const start = () => {
    setEvents([]);
    setScore(0);
    closedRef.current = 0;
    awayRef.current = 0;
    yawnRef.current = 0;
    noFaceRef.current = 0;
    lastTickRef.current = Date.now();
    const s = {
      startedAt: Date.now(),
      drowsyEvents: 0,
      yawnEvents: 0,
      distractionEvents: 0,
      noFaceEvents: 0,
      blinkCount: 0,
      focusedMs: 0,
      totalMs: 0
    };
    setStats(s);
    setRunning(true);
    pushEvent({
      type: "session_start",
      message: "Monitoring session started.",
      severity: "info"
    });
    if (soundOn) beep(880, 0.1);
  };
  const stopSession = () => {
    setRunning(false);
    stopAlarm();
    setStats((s) => s ? { ...s, endedAt: Date.now() } : s);
    pushEvent({
      type: "session_end",
      message: "Monitoring session ended.",
      severity: "info"
    });
    if (soundOn) beep(440, 0.12);
  };
  const downloadReport = () => {
    const s = statsRef.current;
    if (!s) return;
    const ended = s.endedAt ?? Date.now();
    const focusPct2 = s.totalMs > 0 ? s.focusedMs / s.totalMs * 100 : 0;
    const safetyScore = Math.max(
      0,
      100 - s.drowsyEvents * 18 - s.distractionEvents * 12 - s.yawnEvents * 5 - s.noFaceEvents * 4
    );
    const lines = [
      "DriveGuard AI — Trip Safety Report",
      "===================================",
      `Started:  ${new Date(s.startedAt).toLocaleString()}`,
      `Ended:    ${new Date(ended).toLocaleString()}`,
      `Duration: ${(s.totalMs / 1e3 / 60).toFixed(2)} minutes`,
      "",
      `Focus level:        ${focusPct2.toFixed(1)} %`,
      `Driver safety score:${safetyScore.toFixed(0)} / 100`,
      "",
      `Drowsiness events:  ${s.drowsyEvents}`,
      `Yawning events:     ${s.yawnEvents}`,
      `Distraction events: ${s.distractionEvents}`,
      `Face-lost events:   ${s.noFaceEvents}`,
      `Total blinks:       ${s.blinkCount}`,
      "",
      "Event log:",
      ...events.slice().reverse().map((e) => `  [${new Date(e.ts).toLocaleTimeString()}] ${e.type.padEnd(12)} ${e.message}`)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `driveguard-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const focusPct = reactExports.useMemo(() => {
    if (!stats || stats.totalMs <= 0) return 100;
    return Math.round(stats.focusedMs / stats.totalMs * 100);
  }, [stats]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/60 bg-background/40 backdrop-blur sticky top-0 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-primary/15 grid place-items-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-semibold tracking-tight", children: [
            "DriveGuard ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Real-time driver safety & accident prevention" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSoundOn((v) => !v),
            className: "inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/60 px-3 py-2 text-sm hover:bg-card",
            title: "Toggle sound",
            children: [
              soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "size-4" }),
              soundOn ? "Sound on" : "Muted"
            ]
          }
        ),
        !running ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: start,
            className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow-blue hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "size-4" }),
              "Start monitoring"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: stopSession,
            className: "inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground glow-red hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "size-4" }),
              "Stop"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-6 py-6 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative rounded-2xl border border-border/60 bg-black overflow-hidden scanline ${level === "dangerous" ? "glow-red pulse-danger" : level === "warning" ? "glow-amber" : ready ? "glow-blue" : ""}`,
            style: { aspectRatio: "16 / 9" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  ref: videoRef,
                  playsInline: true,
                  muted: true,
                  className: "absolute inset-0 size-full object-cover -scale-x-100"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "canvas",
                {
                  ref: overlayRef,
                  className: "absolute inset-0 size-full -scale-x-100 pointer-events-none"
                }
              ),
              !running && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-gradient-to-br from-background/80 to-background/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md px-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "size-12 text-primary mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Driver camera offline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Start monitoring to enable the in-browser AI vision model. We never upload your video." })
              ] }) }),
              running && loading && !ready && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 mx-auto rounded-full border-2 border-primary/40 border-t-primary animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: "Loading vision model…" })
              ] }) }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-background/80 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CameraOff, { className: "size-10 text-destructive mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Camera unavailable" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: error })
              ] }) }),
              ready && metrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-wrap gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Chip,
                  {
                    label: metrics.faceDetected ? "Face locked" : "No face",
                    tone: metrics.faceDetected ? "ok" : "warn",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "size-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Chip,
                  {
                    label: metrics.eyesClosed ? "Eyes closed" : "Eyes open",
                    tone: metrics.eyesClosed ? "danger" : "ok",
                    icon: metrics.eyesClosed ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Chip,
                  {
                    label: metrics.yawning ? "Yawning" : "Mouth normal",
                    tone: metrics.yawning ? "warn" : "ok",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "size-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Chip,
                  {
                    label: metrics.lookingAway ? "Looking away" : "On road",
                    tone: metrics.lookingAway ? "danger" : "ok",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Metric,
            {
              label: "EAR",
              value: metrics ? metrics.ear.toFixed(2) : "—",
              hint: "Eye aspect ratio"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Metric,
            {
              label: "MAR",
              value: metrics ? metrics.mar.toFixed(2) : "—",
              hint: "Mouth aspect ratio"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Metric,
            {
              label: "Head yaw",
              value: metrics ? `${metrics.yaw.toFixed(0)}°` : "—",
              hint: "Left / right turn"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Metric,
            {
              label: "Blinks",
              value: stats ? String(stats.blinkCount) : "0",
              hint: "Session total"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiskCard, { score, level }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Focus level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "size-4 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold", children: focusPct }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-1.5", children: "%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-gradient-to-r from-primary to-accent transition-all",
              style: { width: `${focusPct}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Session stats" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Drowsy", value: stats?.drowsyEvents ?? 0, tone: "danger" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Yawns", value: stats?.yawnEvents ?? 0, tone: "warn" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Distractions", value: stats?.distractionEvents ?? 0, tone: "danger" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "No face", value: stats?.noFaceEvents ?? 0, tone: "warn" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: downloadReport,
              disabled: !stats,
              className: "mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md border border-border/60 bg-secondary/60 px-3 py-2 text-sm hover:bg-secondary disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
                "Download trip report"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-3 rounded-2xl border border-border/60 bg-card/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Event log" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            events.length,
            " events"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-72 overflow-auto divide-y divide-border/40", children: [
          events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 py-8 text-sm text-muted-foreground text-center", children: "No events yet — start a monitoring session to see real-time alerts." }),
          events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `size-2 rounded-full ${e.severity === "danger" ? "bg-destructive" : e.severity === "warn" ? "bg-[var(--warning)]" : "bg-primary"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground tabular-nums w-20", children: new Date(e.ts).toLocaleTimeString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase text-xs tracking-wider text-muted-foreground w-28", children: e.type.replace("_", " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: e.message })
          ] }, e.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground", children: "All video processing runs locally in your browser via MediaPipe FaceLandmarker — nothing is uploaded." })
  ] });
}
function Chip({
  label,
  tone,
  icon
}) {
  const cls = tone === "danger" ? "bg-destructive/20 text-destructive border-destructive/40" : tone === "warn" ? "bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/40" : "bg-primary/15 text-primary border-primary/40";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${cls}`, children: [
    icon,
    label
  ] });
}
function Metric({ label, value, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-semibold tabular-nums", children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: hint })
  ] });
}
function Stat({
  label,
  value,
  tone
}) {
  const color = tone === "danger" ? "text-destructive" : tone === "warn" ? "text-[var(--warning)]" : "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-secondary/60 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xl font-semibold tabular-nums ${color}`, children: value })
  ] });
}
function RiskCard({ score, level }) {
  const label = level === "dangerous" ? "Dangerous" : level === "warning" ? "Warning" : "Safe";
  const tone = level === "dangerous" ? "glow-red" : level === "warning" ? "glow-amber" : "glow-green";
  const barColor = level === "dangerous" ? "bg-destructive" : level === "warning" ? "bg-[var(--warning)]" : "bg-[var(--success)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border/60 bg-card/60 p-5 ${tone}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Risk score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleGauge, { className: "size-4 text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold tabular-nums", children: Math.round(score) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${level === "dangerous" ? "bg-destructive/20 text-destructive" : level === "warning" ? "bg-[var(--warning)]/20 text-[var(--warning)]" : "bg-[var(--success)]/20 text-[var(--success)]"}`,
          children: label
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full transition-all ${barColor}`,
        style: { width: `${Math.min(100, score)}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Updated continuously from eye closure, yawning and head pose." })
  ] });
}
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
