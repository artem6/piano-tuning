import { Peak } from './findPeaks';

export const playNote = (peaks: (Peak | null)[], duration = 6) => {
  const context = new AudioContext();
  peaks.forEach(peak => {
    if (!peak) return;
    const o = context.createOscillator();
    o.frequency.value = peak.center;
    const g = context.createGain();

    const maxGain = peak.amplitude / 255;
    const zeroGain = 0.00001;
    const sustainedGain = maxGain * 0.01;

    // start at zero
    g.gain.value = zeroGain;
    // attack
    g.gain.exponentialRampToValueAtTime(maxGain, context.currentTime + 0.01);
    // decay
    g.gain.exponentialRampToValueAtTime(sustainedGain, context.currentTime + 1);
    // release
    g.gain.exponentialRampToValueAtTime(zeroGain, context.currentTime + duration);

    o.connect(g);
    o.type = 'sine';
    g.connect(context.destination);
    o.start(0);
    o.stop(duration);
  });
  setTimeout(() => context.close(), duration * 333);
};
