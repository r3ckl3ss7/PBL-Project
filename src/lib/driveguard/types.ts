export type RiskLevel = "safe" | "warning" | "dangerous";

export type EventType =
  | "drowsy"
  | "yawn"
  | "distraction"
  | "no_face"
  | "blink_spike"
  | "session_start"
  | "session_end";

export interface SafetyEvent {
  id: string;
  type: EventType;
  message: string;
  ts: number;
  severity: "info" | "warn" | "danger";
}

export interface FrameMetrics {
  faceDetected: boolean;
  ear: number;       // eye aspect ratio (avg L/R)
  mar: number;       // mouth aspect ratio
  yaw: number;       // head yaw deg (- left / + right)
  pitch: number;     // head pitch deg
  eyesClosed: boolean;
  yawning: boolean;
  lookingAway: boolean;
  landmarks?: { x: number; y: number }[];
}

export interface SessionStats {
  startedAt: number;
  endedAt?: number;
  drowsyEvents: number;
  yawnEvents: number;
  distractionEvents: number;
  noFaceEvents: number;
  blinkCount: number;
  focusedMs: number;
  totalMs: number;
}
