import { useRef } from 'react';

interface BrowserAudioConfig {
  fftSize?: number;
  minDecibels?: number;
  maxDecibels?: number;
}

export class BrowserAudio {
  audioContext!: AudioContext;
  analyser!: AnalyserNode;

  sampleRate!: number;
  fftSize!: number;

  freqDataArray!: Uint8Array;
  timeDataArray!: Uint8Array;
  stepSize!: number;

  creatContextAndAnalyser(config?: BrowserAudioConfig) {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = config?.fftSize || 16384 * 2;
    this.analyser.minDecibels = config?.minDecibels || -90;
    this.analyser.maxDecibels = config?.maxDecibels || -10;

    this.sampleRate = this.audioContext.sampleRate;
    this.fftSize = this.analyser.fftSize;
    this.stepSize = this.sampleRate / this.fftSize;

    const bufferLength = this.fftSize / 2;

    this.freqDataArray = new Uint8Array(bufferLength);
    this.timeDataArray = new Uint8Array(bufferLength);
  }

  constructor(config?: BrowserAudioConfig) {
    this.creatContextAndAnalyser(config);
    navigator.getUserMedia(
      { audio: true },
      stream => {
        const audioSource = this.audioContext.createMediaStreamSource(stream);
        audioSource.connect(this.analyser);
      },
      err => {
        err && console.error(err);
      },
    );
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.freqDataArray);
    return this.freqDataArray;
  }
  getTimeData() {
    this.analyser.getByteTimeDomainData(this.timeDataArray);
    return this.timeDataArray;
  }
}

export const useBrowserAudio = (props?: BrowserAudioConfig) => {
  const ref = useRef<BrowserAudio>();
  if (!ref.current) ref.current = new BrowserAudio(props);
  return ref.current;
};
