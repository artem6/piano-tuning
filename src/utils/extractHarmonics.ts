import { CENTS50 } from './constants';
import { Peak } from './findPeaks';

// given peaks and a fundamental frequency, find all harmonics in those peaks
export const extractHarmonics = (peaks: Peak[], fq: number) => {
  if (!peaks.length) return { score: 0, harmonics: [] };
  const precision = CENTS50;

  const harmonics: (Peak | null)[] = [];
  let step = fq;
  let lastFq = 0;
  let currentFq = 0;

  const highestFq = peaks[peaks.length - 1].center;

  let amplitudeSum = 0;

  let ittr = 0;
  let nullCount = 0;
  while (currentFq * precision < highestFq && ittr++ < 50) {
    lastFq = currentFq;
    currentFq += step;
    if (nullCount >= 5) break;

    // eslint-disable-next-line no-loop-func
    const matches = peaks.filter(peak => peak.center >= currentFq / precision && peak.center <= currentFq * precision);
    if (!matches.length) {
      nullCount++;
      harmonics.push(null);
    } else {
      nullCount = 0;
      let peak = matches[0];
      matches.forEach(match => {
        if (match.amplitude > peak.amplitude) peak = match;
      });
      harmonics.push(peak);
      amplitudeSum += peak.amplitude;
      step = Math.max(peak.center - lastFq, step);
    }
  }
  while (harmonics[harmonics.length - 1] === null) harmonics.pop();

  const score = amplitudeSum; // + harmonics.filter(Boolean).length * 255;
  return { score, harmonics };
};

export const approximateMissingHarmonics = (peaks: (Peak | null)[]) => {
  peaks = [...(peaks || [])];

  let data = peaks.filter(Boolean).length;
  if (data / peaks.length < 0.3) return peaks;

  const getHarmonicValue = (idx: number, stack = 0): number | null => {
    let center = peaks[idx]?.center || null;
    if (center) return center;
    if (stack === 3) return null;
    const dist = 5;
    if (!peaks[idx - 1]) {
      const next1 = getHarmonicValue(idx + 1, stack + 1);
      const next2 = getHarmonicValue(idx + 1 + dist, stack + 1);
      if (next1 === null || next2 === null) center = null;
      else {
        const diff = (next2 - next1) / dist;
        // console.log(idx, diff);
        center = next1 - diff;
      }
    } else if (!peaks[idx + 1]) {
      const prior1 = getHarmonicValue(idx - 1, stack + 1);
      const prior2 = getHarmonicValue(idx - 1 - dist, stack + 1);
      if (prior1 === null || prior2 === null) center = null;
      else {
        const diff = (prior1 - prior2) / dist;
        center = prior1 + diff;
      }
    } else {
      const next = getHarmonicValue(idx + 1, stack + 1);
      const prior = getHarmonicValue(idx - 1, stack + 1);
      if (next === null || prior === null) center = null;
      else {
        center = (next + prior) / 2;
      }
    }
    if (center !== null) peaks[idx] = { center, amplitude: 0 };

    return center;
  };

  peaks.forEach((peak, idx) => getHarmonicValue(idx));
  return peaks;
};

export const medianSpaceBetweenHarmonics = (peaks: (Peak | null)[]) => {
  const dist: number[] = [];
  let last: number | undefined = 0;
  peaks.forEach(peak => {
    if (peak?.center && last !== undefined) {
      dist.push(peak.center - last);
    }
    last = peak?.center;
  });
  dist.sort();
  return dist[Math.floor(dist.length / 2)];
};
