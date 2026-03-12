import app from "../../main.js";

export class ParticleTicker {
  constructor(particles, tickerSettings) {
    this.particles = particles;

    this.fft = tickerSettings.fft;

    this.xFn = this[tickerSettings.xFn].bind(this);
    this.yFn = this[tickerSettings.yFn].bind(this);
    this.xSpd = tickerSettings.xSpd || 1;
    this.ySpd = tickerSettings.ySpd || 1;

    this.outOfBoundsType =
      this[tickerSettings.outOfBoundsType]?.bind(this) || this.none;
    this.audioDataFn =
      this[tickerSettings.audioDataFn]?.bind(this) || this.none;

    this.PIMulti = tickerSettings.PIMulti;

    this.w = app.canvas.width;
    this.h = app.canvas.height;
    console.log("canvas size: " + this.w + " " + this.h);
  }

  setupAudio(src) {
    const audioElement = new Audio(src);
    const audioContext = new AudioContext();

    this.audioAnalyserNode = audioContext.createAnalyser();
    const audioSourceNode = audioContext.createMediaElementSource(audioElement);

    audioSourceNode.connect(this.audioAnalyserNode);
    this.audioAnalyserNode.connect(audioContext.destination);

    this.audioAnalyserNode.fftSize = this.fft;
    this.bufferLength = this.audioAnalyserNode.frequencyBinCount;
    this.audioData = new Uint8Array(this.bufferLength);

    document.addEventListener("click", () => {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      audioElement.play();
    });
  }

  cos(ratio) {
    return Math.cos(ratio * Math.PI * this.PIMulti);
  }

  sin(ratio) {
    return Math.sin(ratio * Math.PI * this.PIMulti);
  }

  tan(ratio) {
    return Math.tan(ratio * Math.PI * this.PIMulti);
  }

  simpleModulation(ratio) {
    return this.audioData[Math.floor(this.bufferLength * ratio)] - 128;
  }

  diffModulation(ratio) {
    let i = Math.floor(this.bufferLength * ratio);
    return this.audioData[i] - this.audioData[i - 1] || 0;
  }

  respawn(particle) {
    if (particle.x > this.w || particle.x < 0 || isNaN(particle.x))
      particle.x = Math.random() * this.w;

    if (particle.y > this.h || particle.y < 0 || isNaN(particle.y))
      particle.y = Math.random() * this.h;
  }

  wrap(particle) {
    if (particle.x > this.w) particle.x = 20;
    if (particle.x < 5) particle.x = this.w;
    if (particle.y > this.h) particle.y = 20;
    if (particle.y < 5) particle.x = this.h;
  }

  none() {
    return 0;
  }

  frequencyData() {
    this.audioAnalyserNode.getByteFrequencyData(this.audioData);
    this.audioData = this.audioData.map((el) => el - 128);
  }

  timeDomainData() {
    this.audioAnalyserNode.getByteTimeDomainData(this.audioData);
  }

  addTicker() {
    app.ticker.add(() => {
      this.audioDataFn();

      for (const p of this.particles) {
        let yRatio = p.y / this.h;
        let xRatio = p.x / this.w;

        this.outOfBoundsType(p);
        const vector = [
          this.xFn(yRatio) * this.xSpd,
          this.yFn(xRatio) * this.ySpd,
        ];

        p.x += vector[0];
        p.y += vector[1];
      }
    });
  }
}
