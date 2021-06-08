export interface Peak {
  center: number;
  amplitude: number;
}

// finds the peaks from an FFT
export function findPeaks(dataArr: Uint8Array | number[], boundary: number | Uint8Array | number[]): Peak[] {
  const peaks: { center: number; amplitude: number }[] = [];

  for (let i = 1; i < dataArr.length - 1; i++) {
    const threshhold = typeof boundary === 'number' ? boundary : boundary[i];
    // peak detection
    const a = dataArr[i - 1];
    const b = dataArr[i];
    const c = dataArr[i + 1];
    if (b > threshhold && b >= a && b >= c) {
      // parabolic interpolation
      const center = i + (0.5 * (a - c)) / (a - 2 * b + c);
      const amplitude = b - 0.25 * (center - i) * (a - c);
      peaks.push({ center, amplitude });
    }
  }

  return peaks;
}
