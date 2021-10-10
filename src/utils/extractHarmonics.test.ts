import { approximateMissingHarmonics, extractHarmonics, predictKeyFromHarmonics } from './extractHarmonics';
import { KEYS } from './keys';
import steinwayKeys1Data from '../test/steinwayKeys1Data.json';
import _notePeakData from '../test/notePeakData.json';
import { Peak } from './findPeaks';

const notePeakData = _notePeakData as { peaks: Peak[]; key: number }[];

describe('extractHarmonics', () => {
  it('parses steinway note 1', () => {
    const harmonics = [
      28.070996928418797, 57.19693175747862, 86.36944110576923, 115.53955078125, 144.44405691964286, 173.45660665760872,
      202.82660590277777, 232.23198784722223, 277.0797859909188, 321.9275841346154, 352.353515625, 383.056640625,
      445.3688401442308, 476.74804687499994, 541.728515625, 574.3877704326924, 641.11328125, 709.0799082880435,
      744.6145450367646, 796.875, 890.2306189903846, 966.7013417119565, 1006.5403988486843, 1125.732421875,
      1167.216796875, 1351.1641652960527, 1386.0560825892856, 1520.9854789402175, 1815.8133370535713,
      1867.8089488636363, 2249.961451480263, 2464.8581112132356, 2728.156594669118, 2991.455078125, 3388.916015625,
    ];
    const fq = KEYS[0].hz;
    expect(approximateMissingHarmonics(extractHarmonics(steinwayKeys1Data, fq).harmonics).map(h => h?.center)).toEqual(
      harmonics,
    );
    // console.log(harmonics.map((h, i) => Math.round((h / fq / (i + 1)) * 100) / 100));
  });
});
describe('predictKeyFromHarmonics', () => {
  it('identifies notes', () => {
    const tests = [
      [160, 1],
      [244, 2],
      [315, 3],
      [386, 4],
      [465, 5],
      [543, 6],
      [630, 7],
      [696, 8],
      [777, 9],
      [862, 10],
      [948, 11],
      [1032, 12],
      [1115, 13],
      [1205, 14],
      [1350, 15],
      [1388, 16],
      [1468, 17],
      [1556, 18],
      [1660, 19],
      [1750, 20],
      [1811, 21],
      [1900, 22],
      [1988, 23],
      [2076, 24],
      [2165, 25],
      [2253, 26],
      [2340, 27],
      [2440, 28],
      [2542, 29],
      [2670, 30],
      [2756, 31],
      [2852, 32],
      [2955, 33],
      [3054, 34],
      [3152, 35],
      [3251, 36],
      [3355, 37],
      [3468, 38],
      [3566, 39],
      [3659, 40],
      [3790, 41],
      [3846, 42],
      [3960, 43],
      [4056, 44],
      [4160, 45],
      [4280, 46],
      [4385, 47],
      [4510, 48],
      [4623, 49],
      [4780, 50],
      [4920, 51],
      [5030, 52],
      [5160, 53],
      [5241, 54],
      [5381, 55],
      [5453, 56],
      [5582, 57],
      [5626, 58],
      [5722, 59],
      [5850, 60],
      [5950, 61],
      [6050, 62],
      [6150, 63],
      [6250, 64],
      [6315, 65],
      [6359, 65],
      [6412, 66],
      [6510, 67],
      [6590, 68],
      [6680, 69],
      [6800, 70],
      [6910, 71],
      [7030, 72],
      [7130, 73],
      [7220, 74],
      [7305, 75],
      [7390, 76],
      [7500, 77],
      [7580, 78],
      [7670, 79],
      [7750, 80],
      [7830, 81],
      [7920, 82],
      [7990, 83],
      [8060, 84],
      [8135, 85],
      [8205, 86],
      [8270, 87],
      // [8342, 88],
    ];
    tests.forEach(([idx, target]) => {
      const { peaks } = notePeakData[idx];
      const { key, prediction } = predictKeyFromHarmonics(peaks);
      try {
        expect(key).toEqual(target);
      } catch (e) {
        console.log('expected:', KEYS[target - 1].hz);
        console.log('received:', KEYS[key - 1]?.hz);
        console.log(peaks);
        console.log(JSON.stringify(prediction, null, 2));
        throw e;
      }
    });
  });

  // it('finds the attacks', () => {
  //   const output: any[] = [];
  //   const lastTen: number[] = [];
  //   let lastAttack = 0;
  //   let lastAmplitude = 0;
  //   notePeakData.forEach((note, idx) => {
  //     const peaks = note.peaks;
  //     // if ((max(peaks.map(p => p.amplitude)) || 0) < 50) return;

  //     // const { key } = predictKeyFromHarmonics(peaks);
  //     // output.push([idx, key]);
  //     const amplitude = max(peaks.map(p => p.amplitude)) || 0;
  //     if (amplitude > 30 && amplitude > mean(lastTen) * 1.5 && amplitude > lastAmplitude && idx - lastAttack > 10) {
  //       output.push([idx, notePeakData[idx + 10].key, amplitude, mean(lastTen)]);
  //       lastAttack = idx;
  //     }
  //     lastAmplitude = amplitude;
  //     lastTen.push(amplitude);
  //     if (lastTen.length > 10) lastTen.shift();
  //     // console.log(minKey, minError);
  //   });
  //   console.log(output.length);
  //   console.log(JSON.stringify(output, null, 2));
  // });

  // it('identifies notes properly', () => {
  //   const output: any[] = [];
  //   let lastNote = 0;
  //   notePeakData.forEach((note, idx) => {
  //     if (note.key === lastNote) return;
  //     note = notePeakData[idx + 10];
  //     lastNote = note.key;
  //     const peaks = note.peaks;
  //     const { key } = predictKeyFromHarmonics(peaks);
  //     output.push([idx + 10, note.key + 1]); // [idx, note.key, key]
  //   });
  //   console.log(output.length);
  //   console.log(JSON.stringify(output, null, 2));
  // });
});
