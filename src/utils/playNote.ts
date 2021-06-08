import { Peak } from './findPeaks';

export const playNote = (peaks: (Peak | null)[], duration = 6) => {
  const context = new AudioContext();
  peaks.forEach(peak => {
    if (!peak) return;
    const o = context.createOscillator();
    o.frequency.value = peak.center;
    const g = context.createGain();
    g.gain.value = peak.amplitude / 255;
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    o.stop(duration);
  });
  setTimeout(() => context.close(), duration * 333);
};
