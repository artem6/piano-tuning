// sample rate = samples / second
// fq = modulation / second
// k = samples / modulation
// --> fq = sample rate / k = samples / second / ( samples / modulation ) = modulations / second

import { findPeaks } from './findPeaks';

export const autoCorrelate = function (buffer: Uint8Array, sampleRate: number, minFq = 20, maxFq = 5000) {
  let data: number[] = [];
  const minK = Math.floor(sampleRate / maxFq) - 1;
  const maxK = Math.ceil(sampleRate / minFq) + 1;
  let n = buffer.length - maxK;

  let bestR = 0;
  let worstR = 1;
  let bestK = -1;

  // loop over all possible frequencies we want to test
  // k = 8      --> 44100 / 8     = 5,512 hz (C8 = 4186.01hz)
  // k = 2000   --> 44100 / 2000  = 22 hz (A0 = 27.5)
  for (var k = minK; k < maxK; k++) {
    let sum = 0;

    n = buffer.length - k;
    for (let i = 0; i < n; i++) {
      const v1 = (buffer[i] - 128) / 128;
      const v2 = (buffer[i + k] - 128) / 128;
      sum += v1 * v2;
      // sum +=  (v1-v2) * (v1-v2);
    }

    // const r = sum / (n + k);
    const r = sum / n;
    // const r = sum;

    data.push(r);

    if (r < worstR) worstR = r;

    if (r > bestR) {
      bestR = r;
      bestK = k;
    }
  }

  return data.map((r, k) => ({
    r: (r - worstR) / (bestR - worstR),
    k: k / bestK,
    fq: sampleRate / (k + minK),
  }));
};

export const findFundamentalFqUsingAutocorrelation = function (
  timeData: Uint8Array,
  sampleRate: number,
  minFq = 20,
  maxFq = 5000,
) {
  const autocorrelation = autoCorrelate(timeData, sampleRate, minFq, maxFq);

  const autoPeaks = findPeaks(
    autocorrelation.map(a => a.r),
    0.9,
  );

  // adjust peaks so that they correspond to the frequency, not the index
  const autoPeaksFq = autoPeaks.map(peak => {
    const idx = Math.floor(peak.center);
    const dist = peak.center - idx;
    const fq1 = autocorrelation[idx]?.fq;
    const fq2 = autocorrelation[idx + 1]?.fq || fq1;
    return { amplitude: peak.amplitude, center: fq1 * (1 - dist) + fq2 * dist };
  });

  let largestPeakFq = 0;
  let largestPeakAmp = 0;

  autoPeaksFq.forEach(peak => {
    if (peak.amplitude > largestPeakAmp * 1.05) {
      largestPeakAmp = peak.amplitude;
      largestPeakFq = peak.center;
    }
  });

  return {
    autocorrelation,
    autoPeaksFq,
    largestPeakFq,
  };
};
