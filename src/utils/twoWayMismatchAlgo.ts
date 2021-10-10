import { CENTS50 } from './constants';
import { findPeaks, Peak } from './findPeaks';
import { KEYS } from './keys';
import { generateHarmonics } from './predictHarmonics';

export const findClosestPeak = (peaks: Peak[], target: number) => {
  let minDist: number | null = null;
  let minAmp = 0;
  let minPeak: Peak | undefined;

  const errorRange = CENTS50;
  peaks.forEach(peak => {
    const dist = Math.abs(target - peak.center);
    if (minDist === null || dist < minDist / errorRange || (dist < minDist * errorRange && minAmp <= peak.amplitude)) {
      minDist = dist;
      minAmp = peak.amplitude;
      minPeak = peak;
    }
  });
  if (!minPeak) throw new Error();
  return minPeak;
};

export const twoWayMismatchAlgo = (peaks: Peak[], possibleHarmonics: Peak[][]) => {
  const p = 0.5; // weighting by frequency value?
  const q = 1.4; // weighting related to magnitude of peaks?
  const r = 0.5; // scaling related to magnitude of peaks?
  const rho = 0.33; // weighting of MP (measured to predicted) error
  // const harmonicWeight = 0.9; // further harmonics are treated as less important

  const maxAmplitude = 255;

  // predicted to measured mismatch
  const errors1: number[] = [];
  possibleHarmonics.forEach(harmonic => {
    let totalErr = 0;
    harmonic.forEach((peak, idx) => {
      const closest = findClosestPeak(peaks, peak.center);
      if (2 > 1) {
        const dist = Math.abs(closest.center - peak.center) / peak.center;
        let err = -0.5;
        if (dist < CENTS50) {
          err = Math.min(closest.amplitude / maxAmplitude / dist, 100);
        }
        totalErr += err / harmonic.length;
      } else {
        // real formula
        const dist = Math.abs(closest.center - peak.center);
        const err =
          dist * Math.pow(closest.center, -p) +
          (closest.amplitude / maxAmplitude) * (q * dist * Math.pow(closest.center, -p) - r);
        totalErr += err;
      }
    });
    errors1.push(totalErr);
  });

  // measured to predicted mismatch
  const errors2: number[] = [];
  peaks.forEach((peak, idx) => {
    possibleHarmonics.forEach((harmonic, idx) => {
      const closest = findClosestPeak(harmonic, peak.center);
      errors2[idx] = errors2[idx] || 0;

      if (2 > 1) {
        const dist = Math.abs(closest.center - peak.center) / closest.center;
        let err = -0.5 * (peak.amplitude / maxAmplitude); // if the measured peak is small, then don't deduct as much
        if (dist < CENTS50) {
          err = Math.min(peak.amplitude / maxAmplitude / dist, 100);
        }
        errors2[idx] += err / peaks.length;
      } else {
        // real formula
        const dist = Math.abs(closest.center - peak.center);
        const err =
          dist * Math.pow(peak.center, -p) +
          (peak.amplitude / maxAmplitude) * (q * dist * Math.pow(peak.center, -p) - r);
        errors2[idx] += err;
      }
    });
  });

  // combine the two errors
  const errors: number[] = [];
  let maxErr = 0;
  for (let i = 0; i < errors1.length; i++) {
    errors[i] = errors1[i] + errors2[i] * rho;
    if (errors[i] > maxErr) maxErr = errors[i];
  }

  // normalize to 0-1
  for (let i = 0; i < errors.length; i++) {
    errors[i] = errors[i] / maxErr;
  }

  return errors;
};

export const findFundamentalFqUsingTwoWayMismatch = ({
  lowFq,
  highFq,
  stepSize,
  peaks,
  targetHarmonics,
}: {
  lowFq: number;
  highFq: number;
  stepSize: number;
  peaks: Peak[];
  targetHarmonics: (fq: number) => Peak[];
}) => {
  try {
    const harmonics: Peak[][] = [];
    for (let i = lowFq; i < highFq; i += stepSize) {
      const offset = i / (targetHarmonics(i)[0]?.center || i);
      harmonics.push(targetHarmonics(i).map(h => ({ ...h, center: (h?.center || 0) * offset })));
    }

    const prediction = twoWayMismatchAlgo(peaks, harmonics);
    const predictionPeaks = findPeaks(prediction, 0.2);
    const maxPeak = predictionPeaks.length
      ? predictionPeaks.reduce((a, b) => (a.amplitude > b.amplitude ? a : b))
      : null;
    const peakCenterFq = lowFq + (maxPeak?.center || 0) * stepSize;

    return {
      prediction,
      maxPeak,
      peakCenterFq,
    };
  } catch (e) {
    return { prediction: [], maxPeak: null, peakCenterFq: 0 };
  }
};

export const findClosestKeyUsingTwoWayMismatch = (peaks: Peak[]) => {
  if (!peaks?.length) return [];
  const maxFq = peaks[peaks.length - 1].center;
  const harmonics = KEYS.map(key => generateHarmonics(key.hz, Math.round(maxFq / key.hz)));
  const prediction = twoWayMismatchAlgo(peaks, harmonics);
  return prediction;
};
