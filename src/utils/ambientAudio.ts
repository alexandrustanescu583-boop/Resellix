// Pure procedural ambient sound generator for gentle forest wind & rustling tree leaves
class ForestAmbientAudio {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private windNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private intervalId: any = null;

  start() {
    if (this.isPlaying) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Master gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.audioCtx.currentTime + 2);
      this.gainNode.connect(this.audioCtx.destination);

      // Pink noise buffer for wind sound
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for smooth rustling leaves sound
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(2, this.audioCtx.currentTime);

      // LFO to modulate wind frequency (gusts of breeze)
      const lfo = this.audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.2, this.audioCtx.currentTime);
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(180, this.audioCtx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      whiteNoise.connect(filter);
      filter.connect(this.gainNode);
      whiteNoise.start();

      this.windNode = whiteNoise;
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not permitted or supported yet', e);
    }
  }

  stop() {
    if (!this.isPlaying || !this.audioCtx || !this.gainNode) return;
    try {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
      setTimeout(() => {
        this.audioCtx?.close();
        this.audioCtx = null;
        this.isPlaying = false;
      }, 1000);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const forestAmbient = new ForestAmbientAudio();
