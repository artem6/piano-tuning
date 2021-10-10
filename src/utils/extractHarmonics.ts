import { CENTS100, CENTS50, CENTS75 } from './constants';
import { Peak } from './findPeaks';
import { KEYS } from './keys';
import { max } from './stat';

// given peaks and a fundamental frequency, find all harmonics in those peaks
export const extractHarmonics = (peaks: Peak[], fq: number) => {
  if (!peaks.length) return { score: 0, error: 1 / 0, peaksUnused: 0, harmonicsMissing: 0, harmonics: [] };
  const harmonics: (Peak | null)[] = [];
  let score = 0;
  const precisionList = [CENTS50, CENTS75, CENTS100];
  const peaksUnused = new Set(peaks.map(p => p.center));
  let peaksUnusedWeighted = 0;
  let harmonicsMissing = 0;
  let error = 0;
  const maxPeak = max(peaks.map(p => p.amplitude)) || 0;

  for (let i = 0; i < precisionList.length; i++) {
    const precision = precisionList[i];
    let step = fq;
    let lastFq = 0;
    let currentFq = 0;

    const highestFq = peaks[peaks.length - 1].center;

    let amplitudeSum = 0;
    let ittr = 0;
    let nullCount = 0;
    harmonicsMissing = 0;
    error = 0;
    let lastPeakAmp = maxPeak * 0.5;
    while (currentFq * precision < highestFq && ittr++ < 50) {
      lastFq = currentFq;
      currentFq += step;
      if (nullCount >= 5) break;

      const matches = peaks.filter(
        // eslint-disable-next-line no-loop-func
        peak => peak.center >= currentFq / precision && peak.center <= currentFq * precision,
      );
      if (!matches.length) {
        nullCount++;
        harmonics.push(null);
        harmonicsMissing++;
        error += lastPeakAmp * 0.8; // max amplitude is 255
      } else {
        nullCount = 0;
        let peak = matches[0];
        matches.forEach(match => {
          peaksUnused.delete(match.center);
          if (match.amplitude > peak.amplitude) peak = match;
        });
        harmonics.push(peak);
        amplitudeSum += peak.amplitude;
        lastPeakAmp += peak.amplitude;
        step = Math.max(peak.center - lastFq, step);
      }
    }
    while (harmonics[harmonics.length - 1] === null) {
      harmonics.pop();
      harmonicsMissing--;
    }

    // turn missing harmonics into percentage
    harmonicsMissing = harmonicsMissing / harmonics.length;

    // error right now is only for missing harmonics, so adjust it to normalize by total harmonics
    error /= harmonics.length;

    score = amplitudeSum; // + harmonics.filter(Boolean).length * 255;
    // eslint-disable-next-line no-loop-func
    peaks.forEach(peak => {
      if (peaksUnused.has(peak.center)) error += peak.amplitude;
    });

    // reduce unusued peak count if the peaks are really small
    let unusedPeakAmp = 0;
    let allPeakAmp = 0;
    peaks.forEach(peak => {
      // if (peak.amplitude < maxPeak * 0.5) peaksUnused.delete(peak.center);
      if (peaksUnused.has(peak.center)) unusedPeakAmp += peak.amplitude;
      allPeakAmp += peak.amplitude;
    });
    peaksUnusedWeighted = unusedPeakAmp / allPeakAmp;

    // the larger the precision we need to use the higher the error should be
    if (precision === CENTS75) error += 5000;
    if (precision === CENTS100) error += 10000;

    if (score) break;
  }
  return { score, error, peaksUnused: peaksUnusedWeighted, harmonicsMissing, harmonics };
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

export const predictKeyFromHarmonics = (peaks: Peak[]) => {
  type Prediction = ReturnType<typeof extractHarmonics>;
  const prediction: Prediction[] = [];
  let bestPrediction: Prediction | null = null;
  KEYS.forEach(key => {
    const keyPrediction = extractHarmonics(peaks, key.hz);
    // console.log(error, peaksUnused, harmonicsMissing);
    prediction.push(keyPrediction);
    if (
      (!bestPrediction || bestPrediction.error > keyPrediction.error) &&
      keyPrediction.harmonicsMissing < 0.34 &&
      keyPrediction.peaksUnused < 0.5
    ) {
      bestPrediction = keyPrediction;
    }
  });
  return {
    key: bestPrediction ? prediction.indexOf(bestPrediction) + 1 : -1,
    bestPrediction: bestPrediction as Prediction | null,
    prediction,
  };
};
