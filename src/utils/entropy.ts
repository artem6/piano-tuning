import { CENTS1 } from './constants';
import { deepCopy } from './deepCopy';
import { approximateMissingHarmonics } from './extractHarmonics';
import { Peak } from './findPeaks';
import { KEYS } from './keys';
import { randomInt } from './random';

const cutoff = 20;

interface KeyData {
  key: number;
  fundamentalFq: number;
  fundamentalFqTWM: number;
  fundamentalFqAutocorr: number;
  harmonics: (Peak | null)[];
}

/*
  1.25 = third
  1.5 = fifth
  2 = octave

  1,   2,   3,   4,   5,   6,   7,   8,   9,   10
  1.25, 2.5, 3.75,    5, 6.25, 7.5, 8.75,      10
    1.5,    3,    4.5,     6,     7.5,    9
       2,        4,        6,        8,        10
*/

const fraction = (decimal: number) => {
  let num = 1;
  let den = 1;
  let iter = 0;
  while (true) {
    if (iter++ > 1000) throw new Error('not a fraction');
    if (num / den < decimal) {
      num++;
      den = 1;
    }
    if (num / den > decimal) {
      den++;
    }
    if (num / den === decimal) break;
  }
  return [num, den];
};

const generateOverlap = (decimal: number) => {
  let lower: number[] = [];
  let higher: number[] = [];

  let [num, den] = fraction(decimal);
  let l = 0;
  let h = 0;
  for (let i = 0; i < 20; i++) {
    l += num;
    h += den;
    lower.push(l - 1);
    higher.push(h - 1);
  }
  return [lower, higher];
};

const acceptableIntervals: { [interval: number]: number } = {
  4: 1.25, // third
  7: 1.5, // fifth
  12: 2, // octave
  24: 4, // 2 * octave
  // 36: 6, // 3 * octave
};

export const compareKeys = (a: KeyData, b: KeyData) => {
  if (!a || !b) return null;
  let error: number[] = [];

  if (b.key < a.key) {
    const temp = a;
    a = b;
    b = temp;
  }

  // if a note doesn't have a harmonic, approximate one using a multiple
  const firstPeak = a.harmonics[0];
  if (a.harmonics.length <= 2 && !a.harmonics[1] && firstPeak) {
    a = { ...a, harmonics: [...a.harmonics] };
    a.harmonics[1] = { amplitude: firstPeak.amplitude, center: firstPeak.center * 2.01 };
  }

  const ratio = acceptableIntervals[b.key - a.key];
  if (!ratio) return null;

  const [low, high] = generateOverlap(ratio);

  // console.log(a, b);
  // console.log(low, high);

  for (let i = 0; i < low.length; i++) {
    if (low[i] >= a.harmonics.length) break;
    if (high[i] >= b.harmonics.length) break;
    const ampA = a.harmonics[low[i]]?.amplitude || 0;
    const ampB = b.harmonics[high[i]]?.amplitude || 0;
    if (ampA < cutoff) break;
    if (ampB < cutoff) break;
    let fA = a.harmonics[low[i]]?.center || 0;
    let fB = b.harmonics[high[i]]?.center || 0;
    // console.log(fA, fB);

    const offset = Math.abs((fA - fB) / fA) * (ampA / 255) * (ampB / 255);
    error.push(offset);
  }
  if (!error.length) return null;
  const meanError = error.reduce((a, b) => a + b) / error.length;
  return meanError / (CENTS1 - 1);
};

const offsetNote = <T extends KeyData>(note: T, offset: number) => ({
  ...note,
  fundamentalFq: note.fundamentalFq * offset,
  fundamentalFqTWM: note.fundamentalFqTWM * offset,
  fundamentalFqAutocorr: note.fundamentalFqAutocorr * offset,
  harmonics: note.harmonics.map(peak => (peak ? { ...peak, center: peak.center * offset } : peak)),
});

const minimizeKeyError = <T extends KeyData>(targetKey: T, errorFunc: { (key: T): number | null }): T => {
  let offset = CENTS1;
  let lastError = errorFunc(targetKey);
  let lastTune = targetKey;

  if (!lastError) return targetKey;

  let flopped = false;
  let itter = 0;
  while (Math.abs(1 - offset) > 0.0001 && itter++ < 100) {
    let testTune = offsetNote(lastTune, offset);
    // console.log('test', offset, testTune.harmonics[0]?.center);
    let testError = errorFunc(testTune) || 0;
    if (testError < lastError) {
      lastTune = testTune;
      lastError = testError;
    } else if (!flopped) {
      flopped = true;
      offset = 1 / offset;
    } else {
      flopped = false;
      offset = offset / 2;
    }
  }
  // console.log('minimized', lastError, targetKey.harmonics[0]?.center, lastTune.harmonics[0]?.center);

  return lastTune;
};

const minimizeOctaveInPlace = <T extends KeyData>(keys: { [key: number]: T }, start: number) => {
  for (let key = start + 12; key <= 87; key += 12) {
    keys[key] = minimizeKeyError(keys[key], targetKey => compareKeys(keys[key - 12], targetKey));
  }
  for (let key = start - 12; key >= 0; key -= 12) {
    keys[key] = minimizeKeyError(keys[key], targetKey => compareKeys(keys[key + 12], targetKey));
  }
};

export const generateTunedUsingFifths = <T extends KeyData>(keys: { [key: number]: T }) => {
  keys = deepCopy(keys);
  const A440 = keys[48];
  keys[48] = offsetNote(A440, 440 / (A440.harmonics[0]?.center || 440));

  // A 48
  let currOctave = 48;
  minimizeOctaveInPlace(keys, currOctave);

  // A --> D --> G --> C ...
  for (let i = 0; i < 11; i++) {
    if (currOctave < 30) currOctave += 12;
    // eslint-disable-next-line no-loop-func
    minimizeKeyError(keys[currOctave - 7], targetKey => compareKeys(keys[currOctave], targetKey));
    currOctave += -7;
    minimizeOctaveInPlace(keys, currOctave);
  }

  return keys;
};

export const generateTunedUsingTotalEntropy = <T extends KeyData>(keys: { [key: number]: T }) => {
  keys = deepCopy(keys);
  const A440 = keys[48];
  keys[48] = offsetNote(A440, 440 / (A440.harmonics[0]?.center || 440));
  let minErr = findTotalEntropy(keys);
  console.log(minErr);

  for (let i = 0; i < 10; i++) {
    let startKey = 48;
    while (startKey !== 48) startKey = randomInt(88);

    let key = startKey + 1;
    while (key !== startKey) {
      if (key === 88) key = 0;
      // eslint-disable-next-line no-loop-func
      keys[key] = minimizeKeyError(keys[key], targetKey => findTotalEntropy({ ...keys, [key]: targetKey }));
      key += 1;
    }

    let totalErr = findTotalEntropy(keys);
    if (totalErr < minErr) {
      minErr = totalErr;
    } else break;
    console.log(i, minErr);
  }

  return keys;
};

export const generateTunedUsingNoCurve = <T extends KeyData>(keys: { [key: number]: T }) => {
  keys = deepCopy(keys);
  for (let i = 0; i < 88; i++) {
    keys[i].harmonics = approximateMissingHarmonics(keys[i].harmonics);
    keys[i] = offsetNote(keys[i], KEYS[i].hz / (keys[i].harmonics[0]?.center || KEYS[i].hz));
  }
  return keys;
};

export const findTotalEntropy = <T extends KeyData>(keys: { [key: number]: T }) => {
  let totalErr = 0;
  let count = 0;
  for (let i = 0; i < 88; i++) {
    for (let j = i + 1; j < 88; j++) {
      let err = compareKeys(keys[i], keys[j]);
      if (err !== null) {
        totalErr += err;
        count++;
      }
    }
  }
  return totalErr / count;
};
