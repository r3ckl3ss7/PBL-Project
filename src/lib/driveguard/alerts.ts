// Voice + alarm utilities (browser SpeechSynthesis + WebAudio)

let lastSpoken = 0;
export function speak(text: string, cooldownMs = 4000) {
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
    /* noop */
  }
}

let audioCtx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioCtx;
}

let alarmStop: (() => void) | null = null;
export function startAlarm() {
  if (alarmStop) return;
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 880;
  gain.gain.value = 0.0001;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  const t0 = ctx.currentTime;
  // pulsing alarm
  const interval = setInterval(() => {
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.setValueAtTime(560, t + 0.18);
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  }, 400);
  gain.gain.setValueAtTime(0.12, t0);
  alarmStop = () => {
    clearInterval(interval);
    try {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch { /* noop */ }
    alarmStop = null;
  };
}

export function stopAlarm() {
  alarmStop?.();
}

export function beep(freq = 660, dur = 0.12) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0.0001;
  osc.connect(gain).connect(ctx.destination);
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}
