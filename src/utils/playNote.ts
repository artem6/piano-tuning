import { Peak } from './findPeaks';
import { KEY_MP3 } from './keyMp3';

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
    o.type = 'triangle';
    g.connect(context.destination);
    o.start(0);
    o.stop(duration);
  });
  setTimeout(() => context.close(), duration * 333);
};

const mp3Channels: { [channel: number]: HTMLAudioElement } = {};

export const playMp3 = (key: number, idx: number) => {
  mp3Channels[idx] = mp3Channels[idx] || document.createElement('audio');
  mp3Channels[idx].src = '/piano-tuning/mp3/' + KEY_MP3[key];
  mp3Channels[idx].play();
};
