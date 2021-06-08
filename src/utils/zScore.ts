// needs fixing - uses rolling average efficiency gain
export function ZScoreBoundary(samples: Uint8Array) {
  const lag = 60;
  const threshold = 2.5;
  const signals = new Uint8Array(samples.length);
  const sumArr: number[] = [];
  const sum2diffArr: number[] = [];
  const binArr: number[] = [];

  // i = index within the sample (sometimes too big or too small)
  for (let i = -lag; i < samples.length + lag; i++) {
    const firstSampleIdx = Math.max(0, i - lag);
    const lastSampleIdx = Math.min(i + lag, samples.length - 1);
    let bin = lastSampleIdx - firstSampleIdx + 1;

    // keep last sum, add in val[i+lag] ahead and remove val[i-lag-1] behind
    let sum = sumArr[i - 1 + lag] || 0;
    if (i + lag < samples.length) sum += samples[i + lag];
    if (i - lag - 1 >= 0) sum -= samples[i - lag - 1];
    const avg = sum / bin;

    let sum2diff = 0;
    for (let j = firstSampleIdx; j <= lastSampleIdx; j++) {
      sum2diff += Math.pow(samples[j] - avg, 2);
    }

    sumArr[i + lag] = sum;
    sum2diffArr[i + lag] = sum2diff;
    binArr[i + lag] = bin;

    if (i < 0 || i > samples.length) continue;

    let std = Math.pow(sum2diff / (bin - 1), 0.5);
    std = Math.min(10, std);

    signals[i] = Math.min(threshold * std + avg, 255);
  }

  // console.log(
  //   sum2diffArr.map((v, i) => Math.pow(v / (binArr[i] - 1), 0.5)).join(",")
  // );

  return signals;
}
