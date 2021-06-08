import { useRef, useState } from 'react';

import './App.css';
import { CanvasChart, useCanvasChart } from './components/chart';
import { Piano } from './components/piano';
import config from './config';
import { BrowserAudio } from './utils/browserAudio';
import { approximateMissingHarmonics, extractHarmonics } from './utils/extractHarmonics';
import { findPeaks, Peak } from './utils/findPeaks';
import { KEYS } from './utils/keys';
import { generateHarmonics } from './utils/predictHarmonics';
import { findFundamentalFqUsingTwoWayMismatch } from './utils/twoWayMismatchAlgo';
import { useAnimate } from './utils/useAnimate';
import { ZScoreBoundary } from './utils/zScore';
import { useKeyboard } from './utils/useKeyboard';
import { CENTS1, CENTS100 } from './utils/constants';
import {
  compareKeys,
  generateTunedUsingFifths,
  generateTunedUsingNoCurve,
  generateTunedUsingTotalEntropy,
} from './utils/entropy';
import { generateGradient } from './utils/colorGradient';
import { playNote } from './utils/playNote';
import { usePolling } from './utils/usePolling';
import { storageService } from './utils/storageService';
import { deepCopy } from './utils/deepCopy';
import { findFundamentalFqUsingAutocorrelation } from './utils/autocorrelation';
import { downloadObjectAsJson, uploadJsonProps } from './utils/jsonIO';
import { max, mean } from './utils/stat';

interface PianoKeysData {
  [key: number]: {
    key: number;
    score: number;
    fundamentalFq: number;
    fundamentalFqTWM: number;
    fundamentalFqAutocorr: number;
    harmonics: (Peak | null)[];
  };
}

let recordedHarmonics: PianoKeysData = storageService.get('recordedHarmonics') || {};
let tunedHarmonics: PianoKeysData = storageService.get('tunedHarmonics') || {};

const colorGradient = generateGradient('00FF00', 'FF0000', 100);

const defaultSettings = {
  mode: 'recording' as 'tuning' | 'recording',
  noteSounds: {
    harmonics: 'tuned' as 'recorded' | 'tuned',
    notes: [] as number[],
  },
  tuning: {
    curve: 'entropy' as 'none' | 'copy' | '7,12' | 'entropy',
  },
  transition: {
    auto: 'next' as 'none' | 'next',
  },
  hiddenCharts: [] as string[],
};

function App() {
  const audioRef = useRef<BrowserAudio>();
  const lastValues = useRef({
    autoChange: 0,
    volume: [] as number[],
    lastReset: 0,
  });
  const settingsRef = useRef<typeof defaultSettings>(storageService.get('tuningSettings') || defaultSettings);
  const pianoKeyRef = useRef(0);
  const [pianoKey, _setPianoKey] = useState(0); // currently focused key
  const setPianoKey = (val: number) => {
    const harmonics = settingsRef.current.noteSounds.harmonics === 'recorded' ? recordedHarmonics : tunedHarmonics;
    const notes = settingsRef.current.noteSounds.notes;
    if (notes.indexOf(0) !== -1) playNote(harmonics?.[val]?.harmonics);
    if (notes.indexOf(notes[4]) !== -1 && val + 4 < 88) playNote(harmonics?.[val + 4]?.harmonics); // third
    if (notes.indexOf(notes[7]) !== -1 && val + 7 < 88) playNote(harmonics?.[val + 7]?.harmonics); // fifth
    if (notes.indexOf(notes[12]) !== -1 && val + 12 < 88) playNote(harmonics?.[val + 12]?.harmonics); // octave
    if (notes.indexOf(notes[24]) !== -1 && val + 24 < 88) playNote(harmonics?.[val + 24]?.harmonics); // double  octave
    _setPianoKey(val);
    pianoKeyRef.current = val;
  };
  useKeyboard('ArrowLeft', () => {
    if (pianoKey > 0) setPianoKey(pianoKey - 1);
  });
  useKeyboard('ArrowRight', () => {
    if (pianoKey < 87) setPianoKey(pianoKey + 1);
  });
  usePolling(() => {
    const storedRecordedHarmonics = JSON.stringify(storageService.get('recordedHarmonics'));
    if (storedRecordedHarmonics !== JSON.stringify(recordedHarmonics)) {
      storageService.set('recordedHarmonics', recordedHarmonics);
    }

    const storedTunedHarmonics = JSON.stringify(storageService.get('tunedHarmonics'));
    if (storedTunedHarmonics !== JSON.stringify(tunedHarmonics)) {
      storageService.set('tunedHarmonics', tunedHarmonics);
    }

    const storedSettings = JSON.stringify(storageService.get('tuningSettings'));
    if (storedSettings !== JSON.stringify(settingsRef.current)) {
      storageService.set('tuningSettings', settingsRef.current);
    }
  }, 60 * 1000);
  const [, _rerender] = useState(0);
  const rerender = () => _rerender(a => a + 1);

  // highlight played keys with harmonic errors
  const keyErrorStyles: { [key: number]: any } = {};
  (() => {
    const harmonics = settingsRef.current.noteSounds.harmonics === 'recorded' ? recordedHarmonics : tunedHarmonics;
    const notes = settingsRef.current.noteSounds.notes;

    const keyErrors: { [key: number]: number | null } = {};
    const currKey = harmonics[pianoKey];
    if (!currKey) return;
    for (let key = 0; key < 88; key++) {
      if (notes.indexOf(Math.abs(harmonics?.[key]?.key || 0 - currKey.key)) === -1) continue;
      const err = compareKeys(currKey, harmonics[key]);
      if (err !== null) {
        keyErrors[key] = err;
        const normErr = Math.floor(Math.min(99, err * 10));
        keyErrorStyles[key + 1] = {
          fill: `#${colorGradient[normErr]}`,
        };
      }
    }
  })();

  const chartWidth = Math.min(window.innerWidth - 2, 1024);
  const chartHeight = Math.min((chartWidth / 1024) * 300, 150);

  const fftChart = useCanvasChart({
    domain: {
      x1: 0,
      x2: 4500,
      y1: 255,
      y2: 0,
    },
    width: chartWidth,
    height: chartHeight,
  });
  const focusedFftChart = useCanvasChart({
    domain: {
      x1: 1 / CENTS100,
      x2: CENTS100,
      y1: 255,
      y2: 0,
    },
    width: chartWidth,
    height: chartHeight,
  });
  const predictionChart = useCanvasChart({
    domain: {
      x1: -2,
      x2: 104,
      y1: 1,
      y2: 0,
    },
    width: chartWidth,
    height: chartHeight,
  });
  const autocorrelationChart = useCanvasChart({
    domain: {
      x1: 0,
      x2: 4500,
      y1: 1,
      y2: 0,
    },
    width: chartWidth,
    height: chartHeight,
  });
  const harmonicsChart = useCanvasChart({
    domain: {
      x1: -1,
      x2: 50,
      y1: 2,
      y2: 0.8,
    },
    width: chartWidth,
    height: chartHeight,
  });
  const tunningCurveChart = useCanvasChart({
    domain: {
      x1: -1,
      x2: 88,
      y1: 1 * CENTS100,
      y2: 1 / CENTS100,
    },
    width: chartWidth,
    height: chartHeight,
  });

  const chartVisible = (name: string) => (settingsRef.current.hiddenCharts?.indexOf(name) ?? -1) === -1;
  const toggleChart = (name: string) => {
    const idx = settingsRef.current.hiddenCharts.indexOf(name);
    if (idx === -1) settingsRef.current.hiddenCharts.push(name);
    else settingsRef.current.hiddenCharts.splice(idx, 1);
    rerender();
  };

  useAnimate(() => {
    const selectedKeyDef = KEYS[pianoKeyRef.current];

    fftChart.clear();
    focusedFftChart.clear();
    predictionChart.clear();
    harmonicsChart.clear();
    tunningCurveChart.clear();
    autocorrelationChart.clear();

    // draw the recorded harmonics for the current key
    (() => {
      const tunedFundamentalFq = tunedHarmonics[pianoKeyRef.current]?.fundamentalFq || 0;
      const recorededFundamentalFq = recordedHarmonics[pianoKeyRef.current]?.fundamentalFq || 0;

      harmonicsChart.line({
        x1: 0,
        x2: 49,
        y1: 1,
        y2: 1,
      });

      harmonicsChart.line(
        {
          x1: 0,
          x2: 49,
          y1: (tunedFundamentalFq || recorededFundamentalFq) / selectedKeyDef.hz,
          y2: (tunedFundamentalFq || recorededFundamentalFq) / selectedKeyDef.hz,
        },
        'red',
      );

      harmonicsChart.text({ x: 0, y: 1.9 }, `${selectedKeyDef.name} (${Math.round(selectedKeyDef.hz * 100) / 100})`);

      if (recorededFundamentalFq)
        harmonicsChart.text({ x: 0, y: 1.8 }, `Recorded (${Math.round(recorededFundamentalFq * 100) / 100})`);
      if (tunedFundamentalFq)
        harmonicsChart.text({ x: 0, y: 1.7 }, `Tuned (${Math.round(tunedFundamentalFq * 100) / 100})`, 'red');

      // draw the peaks on the main FFT
      (tunedHarmonics[pianoKeyRef.current]?.harmonics || recordedHarmonics[pianoKeyRef.current]?.harmonics)?.forEach(
        (harmonic, idx) => {
          if (!harmonic) return;
          fftChart.line(
            {
              x1: harmonic.center,
              x2: harmonic.center,
              y1: 0,
              y2: harmonic.amplitude,
            },
            'green',
          );
        },
      );

      // draw the recorded harmonic peaks
      recordedHarmonics[pianoKeyRef.current]?.harmonics?.forEach((harmonic, idx) => {
        if (!harmonic) return;
        harmonicsChart.circle(
          { x: idx, y: harmonic.center / selectedKeyDef.hz / (idx + 1) },
          5,
          `rgb(0 0 0 / ${Math.round(Math.min(100, (harmonic.amplitude + 30) / 2.55))}%)`,
        );
      });

      // draw the tuned harmonic peaks
      tunedHarmonics[pianoKeyRef.current]?.harmonics?.forEach((harmonic, idx) => {
        if (!harmonic) return;
        const fq = harmonic.center / selectedKeyDef.hz / (idx + 1);
        harmonicsChart.line({ x1: idx - 0.5, x2: idx + 0.5, y1: fq, y2: fq }, `red`);
      });
    })();

    // draw the tuning curve for all notes
    (() => {
      KEYS.forEach((key, idx) => {
        const harmonicsRecorded = recordedHarmonics[idx]?.harmonics;
        const harmonicsTuned = tunedHarmonics[idx]?.harmonics;

        if (recordedHarmonics?.[idx]) recordedHarmonics[idx].harmonics = approximateMissingHarmonics(harmonicsRecorded);
        let fundamentalFq = recordedHarmonics?.[idx]?.fundamentalFq || harmonicsRecorded?.[0]?.center;
        if (fundamentalFq) {
          tunningCurveChart.circle({
            x: idx,
            y: fundamentalFq / key.hz,
          });
        }

        if (tunedHarmonics?.[idx]) tunedHarmonics[idx].harmonics = approximateMissingHarmonics(harmonicsTuned);
        fundamentalFq = tunedHarmonics?.[idx]?.fundamentalFq || harmonicsTuned?.[0]?.center;
        if (fundamentalFq) {
          tunningCurveChart.line(
            {
              x1: idx - 0.5,
              x2: idx + 0.5,
              y1: fundamentalFq / key.hz,
              y2: fundamentalFq / key.hz,
            },
            'red',
          );
        }

        if (idx === pianoKeyRef.current) {
          tunningCurveChart.line(
            {
              x1: idx,
              x2: idx,
              y1: CENTS100,
              y2: 1 / CENTS100,
            },
            'blue',
          );
        }
      });
      tunningCurveChart.line({
        x1: 0,
        x2: 87,
        y1: 1,
        y2: 1,
      });
    })();

    const audio = audioRef.current;
    if (!audio) return;
    const fqData = audio.getFrequencyData();
    const timeData = audio.getTimeData();
    const bucketWidth = audio.sampleRate / audio.fftSize;
    const zScore = ZScoreBoundary(fqData);
    const peaks = findPeaks(fqData, zScore).map(peak => ({ ...peak, center: peak.center * bucketWidth }));

    // Main FFT Drawing
    (() => {
      // draw the FFT
      fqData.forEach((val, idx) => {
        fftChart.rect({
          x1: idx * bucketWidth,
          x2: (idx + 1) * bucketWidth,
          y1: 0,
          y2: val,
        });
      });

      // draw the floor
      zScore.forEach((val, idx) => {
        if (idx === 0) return;
        fftChart.line(
          {
            x1: idx * bucketWidth,
            x2: (idx + 1) * bucketWidth,
            y1: zScore[idx - 1],
            y2: val,
          },
          'blue',
        );
      });

      // draw the peaks
      peaks.forEach((peak, idx) => {
        fftChart.circle({ x: peak.center, y: peak.amplitude }, 5, 'red');

        fftChart.text(
          { x: 4000, y: 245 - (idx + 1) * 10 },
          `Peak: ${Math.round(peak.center * 10) / 10} (${Math.round(peak.amplitude)})`,
        );
      });

      // find the median distance between peaks
      const distBetweenPeaks: number[] = [];
      for (let i = 0; i < peaks.length; i++) {
        distBetweenPeaks.push(peaks[i].center - (peaks[i - 1]?.center || 0));
      }
      const medianDistance = distBetweenPeaks[Math.floor(distBetweenPeaks.length / 2)];
      fftChart.text({ x: 4000, y: 245 }, `Med Dist: ${Math.round(medianDistance * 10) / 10}`);
    })();

    // focused FFT drawing
    (() => {
      const harmonics =
        tunedHarmonics[pianoKeyRef.current]?.harmonics || recordedHarmonics[pianoKeyRef.current]?.harmonics;
      const center = harmonics?.find(p => p?.amplitude === Math.max(...harmonics.map(p => p?.amplitude || 0)))?.center;
      if (!center) return;

      const currentFq = tunedHarmonics?.[pianoKeyRef.current]?.fundamentalFq || selectedKeyDef.hz;
      const adjustmentFactor = currentFq / center;

      fqData.forEach((val, idx) => {
        focusedFftChart.rect({
          x1: ((idx - 0.5) * bucketWidth) / center,
          x2: ((idx + 0.5) * bucketWidth) / center,
          y1: 0,
          y2: val,
        });
      });

      focusedFftChart.line({ x1: 1, x2: 1, y1: 0, y2: 255 }, 'red');

      peaks.forEach((peak, idx) => {
        focusedFftChart.line(
          {
            x1: peak.center / center,
            x2: peak.center / center,
            y1: 0,
            y2: 255,
          },
          'green',
        );
      });

      const closestPeak = peaks.length
        ? peaks.reduce((a, b) => (Math.abs(center - a.center) < Math.abs(center - b.center) ? a : b))
        : null;

      focusedFftChart.text(
        { x: 1.001 / CENTS100, y: 240 },
        `${selectedKeyDef.name} (${Math.round(selectedKeyDef.hz * 100) / 100})`,
      );
      focusedFftChart.text(
        { x: 1.001 / CENTS100, y: 220 },
        `Focused: ${Math.round(center * adjustmentFactor * 100) / 100}`,
        'red',
      );
      focusedFftChart.text(
        { x: 1.001 / CENTS100, y: 200 },
        `Peak: ${Math.round((closestPeak?.center || 0) * adjustmentFactor * 100) / 100}`,
        'green',
      );
      focusedFftChart.text({ x: 1.001 / CENTS100, y: 180 }, `Harmonic Shown: ${Math.round(center * 100) / 100}`);
    })();

    // store some data
    const predictNote = () => {
      const closestNote = (fq: number) => {
        let minDist = CENTS100;
        let minKey: number | null = null;
        KEYS.forEach(key => {
          const keyDist = Math.abs(key.hz - fq) / key.hz;
          if (keyDist < minDist) {
            minDist = keyDist;
            minKey = key.hz;
          }
        });
        return minKey;
      };
      const distBetweenPeaks: number[] = [];
      for (let i = 0; i < peaks.length; i++) {
        distBetweenPeaks.push(peaks[i].center - (peaks[i - 1]?.center || 0));
      }
      const medianDistance = distBetweenPeaks[Math.floor(distBetweenPeaks.length / 2)];
      const medianOutput = closestNote(medianDistance);

      const volume = mean(fqData);
      const zLevel = mean(zScore);
      const maxVolume = max(fqData);

      const { largestPeakFq } = findFundamentalFqUsingAutocorrelation(timeData, audio.sampleRate, 20, 5000);
      const autoCorrOutput = closestNote(largestPeakFq);

      const maxPeak = peaks.find(p => p.amplitude === Math.max(...peaks.map(p => p.amplitude)))?.center || 0;
      const maxPeakOutput = closestNote(maxPeak);

      const peakCount = peaks.length;

      let result: number | null = null;

      if (!result && medianOutput && medianOutput === autoCorrOutput && medianOutput === maxPeakOutput) {
        // peaks count above 10 is not possible for fq above 600hz
        if (peakCount < 10 || medianOutput < 600) result = medianOutput;
      }
      // autocorrelation is accurate up to about 2500hz
      if (!result && autoCorrOutput && autoCorrOutput < 2500) {
        if (peakCount < 10 || autoCorrOutput < 600) result = autoCorrOutput;
      }

      // median distance between peaks gives a good approximation of what note we are hearing
      // - after about 1500hz starts showing problems since there is a lower harmonic at play
      if (!result && medianOutput && medianOutput < 1500) {
        if (peakCount < 10 || medianOutput < 600) result = medianOutput;
      }
      // max peak is accurate for notes actually above 1000hz
      //  - but has a few problems with notes below that having harmonics up to about 2000hz
      if (!result && maxPeakOutput && maxPeakOutput > 2000) {
        if (peakCount < 10) result = maxPeakOutput;
      }

      (window as any).timelineData = (window as any).timelineData || [];
      (window as any).timelineData.push(
        `${volume},${maxVolume},${zLevel},${peakCount},${medianOutput},${autoCorrOutput},${maxPeakOutput},${result},${pianoKeyRef.current}`,
      );

      return result;
    };
    if (2 < 1) predictNote();

    // draw the autocorrelation
    (() => {
      const currentFq =
        tunedHarmonics?.[pianoKeyRef.current]?.fundamentalFqAutocorr ||
        tunedHarmonics?.[pianoKeyRef.current]?.fundamentalFq ||
        selectedKeyDef.hz;
      const adjustmentFactor =
        tunedHarmonics[pianoKeyRef.current]?.fundamentalFq /
          (tunedHarmonics?.[pianoKeyRef.current]?.fundamentalFqAutocorr || 0) || 1;

      const minFq = currentFq / CENTS100;
      const maxFq = currentFq * CENTS100;

      const { autocorrelation, largestPeakFq } = findFundamentalFqUsingAutocorrelation(
        timeData,
        audio.sampleRate,
        minFq,
        maxFq,
      );

      autocorrelationChart.setDomain({ x1: minFq, x2: maxFq, y1: 1, y2: 0 });
      for (let i = 1; i < autocorrelation.length; i++) {
        autocorrelationChart.rect({
          x1: autocorrelation[i - 1].fq,
          x2: autocorrelation[i].fq,
          y1: 0,
          y2: autocorrelation[i - 1].r,
        });
      }
      autocorrelationChart.line({ x1: currentFq, x2: currentFq, y1: 0, y2: 1 }, 'red');
      autocorrelationChart.line({ x1: largestPeakFq, x2: largestPeakFq, y1: 0, y2: 1 }, 'green');
      autocorrelationChart.text(
        { x: currentFq / CENTS100, y: 0.9 },
        `${selectedKeyDef.name} (${Math.round(selectedKeyDef.hz * 100) / 100})`,
      );
      autocorrelationChart.text(
        { x: currentFq / CENTS100, y: 0.8 },
        `Focused: ${Math.round(currentFq * adjustmentFactor * 100) / 100}`,
        'red',
      );
      autocorrelationChart.text(
        { x: currentFq / CENTS100, y: 0.7 },
        `Peak: ${Math.round(largestPeakFq * adjustmentFactor * 10) / 10}`,
        'green',
      );
    })();

    // extract and record the harmonics
    (() => {
      const extractHarmonicsForKey = (key: number) => {
        const targetFq = KEYS[key].hz;
        const extracted = extractHarmonics(peaks, targetFq);
        return extracted;
      };
      const recordHarmonicsForKey = (key: number, extracted: ReturnType<typeof extractHarmonicsForKey>) => {
        const targetFq = KEYS[key].hz;
        if (extracted.score > (recordedHarmonics[key]?.score || 0)) {
          // get two way mismatch fq
          const stepSize = targetFq * (CENTS1 - 1);
          const lowFq = targetFq - stepSize * 50;
          const highFq = targetFq + stepSize * 50;
          const maxFq = peaks[peaks.length - 1].center;
          let { peakCenterFq } = findFundamentalFqUsingTwoWayMismatch({
            lowFq,
            highFq,
            stepSize,
            targetHarmonics: generateHarmonics(targetFq, Math.round(maxFq / targetFq), 0.00055),
            peaks,
          });
          // get autocorrelation fq
          const { largestPeakFq } = findFundamentalFqUsingAutocorrelation(
            timeData,
            audio.sampleRate,
            targetFq / CENTS100,
            targetFq * CENTS100,
          );
          // fill in holes
          const harmonics = approximateMissingHarmonics(extracted.harmonics);
          let fundamentalFq = peakCenterFq;
          if (fundamentalFq <= lowFq * 1.1 || fundamentalFq >= highFq * 0.9) fundamentalFq = harmonics[0]?.center || 0;
          recordedHarmonics[key] = {
            ...extracted,
            harmonics,
            fundamentalFq,
            fundamentalFqTWM: peakCenterFq,
            fundamentalFqAutocorr: largestPeakFq,
            key,
          };
        }
      };

      const curNote = extractHarmonicsForKey(pianoKeyRef.current);

      // if in tuning mode, reset the harmonics extracted each key press
      const volume = max(fqData) || 0;
      if (
        settingsRef.current.mode === 'tuning' &&
        mean(lastValues.current.volume) < 10 &&
        volume > 50 &&
        Date.now() - lastValues.current.lastReset > 2000 &&
        curNote.score > (recordedHarmonics[pianoKeyRef.current]?.score || 0) * 0.5
      ) {
        delete recordedHarmonics[pianoKeyRef.current];
        lastValues.current.lastReset = Date.now();
      }
      lastValues.current.volume.push(volume);
      if (lastValues.current.volume.length > 10) lastValues.current.volume.shift();

      recordHarmonicsForKey(pianoKeyRef.current, curNote);

      if (settingsRef.current.transition.auto === 'next' && pianoKeyRef.current < 87) {
        const nextNote = extractHarmonicsForKey(pianoKeyRef.current + 1);
        if (nextNote.score > curNote.score && Date.now() - lastValues.current.autoChange > 2000) {
          lastValues.current.autoChange = Date.now();
          recordHarmonicsForKey(pianoKeyRef.current + 1, nextNote);
          setPianoKey(pianoKeyRef.current + 1);
        }
      }
    })();

    // two way mismatch algo drawing
    (() => {
      if (peaks.length) {
        const maxFq = peaks[peaks.length - 1].center;

        // two way mismatch on current key +- 50 cents

        const targetHarmonics = (tunedHarmonics[pianoKeyRef.current]?.harmonics ||
          // recordedHarmonics[pianoKeyRef.current]?.harmonics ||
          generateHarmonics(selectedKeyDef.hz, Math.round(maxFq / selectedKeyDef.hz), 0.00055)) as Peak[];
        const currentFq =
          tunedHarmonics[pianoKeyRef.current]?.harmonics?.[0]?.center ||
          // recordedHarmonics[pianoKeyRef.current]?.fundamentalFq ||
          selectedKeyDef.hz;
        const stepSize = currentFq * (CENTS1 - 1);

        // since we adjust based on the first harmonic, but the other displayed values are the fundemantal frequency
        const adjustmentFactor =
          tunedHarmonics[pianoKeyRef.current]?.fundamentalFq /
            (tunedHarmonics[pianoKeyRef.current]?.harmonics?.[0]?.center || 1) || 1;
        // console.log(
        //   tunedHarmonics[pianoKeyRef.current]?.fundamentalFq,
        //   tunedHarmonics[pianoKeyRef.current]?.harmonics?.[0]?.center,
        // );

        const { prediction, maxPeak, peakCenterFq } = findFundamentalFqUsingTwoWayMismatch({
          lowFq: currentFq - stepSize * 50,
          highFq: currentFq + stepSize * 50,
          stepSize,
          targetHarmonics,
          peaks,
        });
        // console.log(prediction);

        prediction.forEach((weight, idx) => {
          predictionChart.rect({ x1: idx - 0.5, x2: idx + 0.5, y1: 0, y2: weight });
        });
        predictionChart.line({ x1: maxPeak?.center || 0, x2: maxPeak?.center || 0, y1: 0, y2: 1 }, 'green');
        predictionChart.line({ x1: 50, x2: 50, y1: 0, y2: 1 }, 'red');
        predictionChart.text({ x: 0, y: 0.9 }, `${selectedKeyDef.name} (${Math.round(selectedKeyDef.hz * 100) / 100})`);
        predictionChart.text(
          { x: 0, y: 0.8 },
          `Focused: ${Math.round(currentFq * adjustmentFactor * 100) / 100}`,
          'red',
        );
        predictionChart.text(
          { x: 0, y: 0.7 },
          `Peak: ${Math.round(peakCenterFq * adjustmentFactor * 100) / 100}`,
          'green',
        );
      }
    })();
  });

  return (
    <div className='App'>
      {!audioRef.current ? (
        <button
          style={{
            background: '#37c53c',
            color: '#fff',
            margin: 20,
            border: '1px solid green',
          }}
          onClick={() => {
            audioRef.current = new BrowserAudio({
              fftSize: config('fftSize'),
              minDecibels: config('minDecibels'),
              maxDecibels: config('maxDecibels'),
            });
            rerender();
          }}
        >
          Start Listening
        </button>
      ) : (
        <button
          style={{
            background: '#f44336',
            color: '#fff',
            margin: 20,
            border: '1px solid #a92319',
          }}
          onClick={() => {
            audioRef.current = undefined;
            rerender();
          }}
        >
          Stop Listening
        </button>
      )}

      <div style={{ overflowX: 'auto', overflowY: 'hidden', height: 150 }}>
        <Piano onClick={setPianoKey} notes={[KEYS[pianoKey]]} keyStyles={keyErrorStyles} />
      </div>

      <div>
        Mode
        <select
          value={settingsRef.current.mode}
          onChange={e => {
            settingsRef.current.mode = e.target.value as any;
          }}
        >
          <option value='recording'>Recording</option>
          <option value='tuning'>Tuning</option>
        </select>
        <select
          value={settingsRef.current.transition.auto}
          onChange={e => {
            settingsRef.current.transition.auto = e.target.value as any;
          }}
        >
          <option value='none'>Auto Transition Disabled</option>
          <option value='next'>Auto Transition To Next Note</option>
        </select>
      </div>
      <div>
        Recorded
        <button onClick={() => downloadObjectAsJson(recordedHarmonics, 'recorded.json')}>Download</button>
        <input className='fileInput' {...uploadJsonProps(data => (recordedHarmonics = data))} />
        <button onClick={() => delete recordedHarmonics[pianoKey]}>Clear Current</button>
        <button onClick={() => (recordedHarmonics = {})}>Clear All</button>
      </div>
      <div>
        Tuned
        <button onClick={() => downloadObjectAsJson(tunedHarmonics, 'tuned.json')}>Download</button>
        <input className='fileInput' {...uploadJsonProps(data => (tunedHarmonics = data))} />
        <button onClick={() => (tunedHarmonics = {})}>Clear All</button>
      </div>
      <div>
        Sounds
        <select
          value={JSON.stringify(settingsRef.current.noteSounds.notes)}
          onChange={e => {
            settingsRef.current.noteSounds.notes = JSON.parse(e.target.value);
          }}
        >
          <option value='[]'>No Sounds</option>
          <option value='[0]'>Note Only</option>
          <option value='[0,4]'>Note + Third</option>
          <option value='[0,7]'>Note + Fifth</option>
          <option value='[0,12]'>Note + Octave</option>
          <option value='[0,24]'>Note + Double Octave</option>
          <option value='[0,4,7]'>Note + Third + Fifth</option>
          <option value='[0,4,7,12]'>Note + Third + Fifth + Octave</option>
          <option value='[0,12,24]'>Note + Octave + Double Octave</option>
          <option value='[0,4,7,12,24]'>Note + All</option>
        </select>
        <select
          value={settingsRef.current.noteSounds.harmonics}
          onChange={e => {
            settingsRef.current.noteSounds.harmonics = e.target.value as any;
          }}
        >
          <option value='recorded'>Recorded Notes</option>
          <option value='tuned'>Tuned Notes</option>
        </select>
      </div>
      <div>
        Tuning
        <select
          value={settingsRef.current.tuning.curve}
          onChange={e => {
            settingsRef.current.tuning.curve = e.target.value as any;
          }}
        >
          <option value='none'>No Curve</option>
          <option value='copy'>Same as Recorded</option>
          <option value='7,12'>Tune With Fifths + Octaves</option>
          <option value='entropy'>Tune With Entropy</option>
        </select>
        <button
          onClick={() => {
            const curve = settingsRef.current.tuning.curve;
            if (curve === 'copy') tunedHarmonics = deepCopy(recordedHarmonics);
            if (curve === 'none') tunedHarmonics = generateTunedUsingNoCurve(recordedHarmonics);
            if (curve === '7,12') tunedHarmonics = generateTunedUsingFifths(recordedHarmonics);
            if (curve === 'entropy') tunedHarmonics = generateTunedUsingTotalEntropy(recordedHarmonics);
          }}
        >
          Generate Tuning Curve
        </button>
      </div>
      <br />
      <div className='chartTitle' onClick={() => toggleChart('fullFFT')}>
        Full Spectrum FFT
      </div>
      <div className='chartContainer' style={{ height: chartVisible('fullFFT') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...fftChart} />
      </div>
      <div className='chartTitle' onClick={() => toggleChart('focusedFFT')}>
        Focused FFT
      </div>
      <div className='chartContainer' style={{ height: chartVisible('focusedFFT') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...focusedFftChart} />
      </div>
      <div className='chartTitle' onClick={() => toggleChart('twm')}>
        Two Way Mismatch
      </div>
      <div className='chartContainer' style={{ height: chartVisible('twm') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...predictionChart} />
      </div>
      <div className='chartTitle' onClick={() => toggleChart('autocorr')}>
        Autocorrelation
      </div>
      <div className='chartContainer' style={{ height: chartVisible('autocorr') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...autocorrelationChart} />
      </div>
      <div className='chartTitle' onClick={() => toggleChart('harmonics')}>
        Current Note Harmonics
      </div>
      <div className='chartContainer' style={{ height: chartVisible('harmonics') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...harmonicsChart} />
      </div>
      <div className='chartTitle' onClick={() => toggleChart('curve')}>
        Tuning Curve
      </div>
      <div className='chartContainer' style={{ height: chartVisible('curve') ? chartHeight + 2 : 0 }}>
        <CanvasChart {...tunningCurveChart} />
      </div>
    </div>
  );
}

export default App;
