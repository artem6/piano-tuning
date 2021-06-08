import { Peak } from './findPeaks';

export const predictHarmonic = (fq: number, n: number, coeff: number = 0.00055) => {
  const calcFq = fq * (n + 1) * Math.sqrt(1 + coeff * n * n);
  return calcFq;
};

export const generateHarmonics = (fq: number, count: number, coeff: number = 0.00055) => {
  const peaks: Peak[] = [];
  for (let i = 0; i <= count; i++) {
    peaks.push({ amplitude: 255 - i * 10, center: predictHarmonic(fq, i, coeff) });
  }
  return peaks;
};
