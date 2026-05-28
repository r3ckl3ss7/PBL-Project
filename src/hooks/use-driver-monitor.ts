// Real-time driver monitoring hook using MediaPipe FaceLandmarker (loaded from CDN).
// Computes EAR (eye aspect ratio), MAR (mouth aspect ratio) and head yaw/pitch
// to detect drowsiness, yawning and distraction in the browser.

import { useCallback, useEffect, useRef, useState } from "react";
import type { FrameMetrics } from "@/lib/driveguard/types";

// MediaPipe FaceLandmarker landmark indices (468-point mesh)
// Eye landmark sets used for EAR (six points each, similar to dlib's 6-point EAR)
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
// Mouth landmarks for MAR
const MOUTH_TOP = 13;
const MOUTH_BOTTOM = 14;
const MOUTH_LEFT = 78;
const MOUTH_RIGHT = 308;
// Face anchors for head pose
const NOSE_TIP = 1;
const CHIN = 152;
const LEFT_FACE = 234;
const RIGHT_FACE = 454;
const FOREHEAD = 10;

type Pt = { x: number; y: number; z?: number };

function dist(a: Pt, b: Pt) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function ear(pts: Pt[], idx: number[]) {
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

function mar(pts: Pt[]) {
  const v = dist(pts[MOUTH_TOP], pts[MOUTH_BOTTOM]);
  const h = dist(pts[MOUTH_LEFT], pts[MOUTH_RIGHT]);
  return h === 0 ? 0 : v / h;
}

function headPose(pts: Pt[]) {
  // Rough horizontal yaw from nose position between left/right face anchors.
  const nose = pts[NOSE_TIP];
  const left = pts[LEFT_FACE];
  const right = pts[RIGHT_FACE];
  const midX = (left.x + right.x) / 2;
  const halfW = (right.x - left.x) / 2 || 1;
  const yawNorm = (nose.x - midX) / halfW; // -1 .. 1
  const yawDeg = Math.max(-60, Math.min(60, yawNorm * 50));

  const forehead = pts[FOREHEAD];
  const chin = pts[CHIN];
  const midY = (forehead.y + chin.y) / 2;
  const halfH = (chin.y - forehead.y) / 2 || 1;
  const pitchNorm = (nose.y - midY) / halfH;
  const pitchDeg = Math.max(-60, Math.min(60, pitchNorm * 50));

  return { yaw: yawDeg, pitch: pitchDeg };
}

interface UseDriverMonitorOpts {
  enabled: boolean;
  onMetrics?: (m: FrameMetrics) => void;
}

const VISION_VERSION = "0.10.14";

export function useDriverMonitor({ enabled, onMetrics }: UseDriverMonitorOpts) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onMetricsRef = useRef(onMetrics);
  useEffect(() => {
    onMetricsRef.current = onMetrics;
  }, [onMetrics]);

  const stop = useCallback(() => {
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

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        // Dynamic import from CDN — keeps bundle tiny.
        const vision: any = await import(
          /* @vite-ignore */ `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VISION_VERSION}/+esm`
        );
        if (cancelled) return;
        const fileset = await vision.FilesetResolver.forVisionTasks(
          `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VISION_VERSION}/wasm`,
        );
        const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });
        if (cancelled) return;
        landmarkerRef.current = landmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
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

            // Resize overlay to match video.
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
                  // Highlight eyes & mouth
                  ctx.strokeStyle = "rgba(120, 255, 180, 0.9)";
                  ctx.lineWidth = 1.5;
                  const drawLine = (idxs: number[]) => {
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
                lookingAway,
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
                lookingAway: false,
              });
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch (e: any) {
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
