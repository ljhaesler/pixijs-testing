import app from "../../main.js";

export class ParticleTicker {
  constructor(particles, tickerSettings) {
    this.particles = particles;

    this.fft = tickerSettings.fft;
    this.particleSpeed = tickerSettings.particleSpeed;
    this.xFn = this[tickerSettings.xFn].bind(this);
    this.yFn = this[tickerSettings.yFn].bind(this);
    this.outOfBoundsType = this[tickerSettings.outOfBoundsType].bind(this);

    this.PIMulti = tickerSettings.PIMulti;

    this.w = app.screen.width;
    this.h = app.screen.height;
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
    return Math.cos(ratio * Math.PI * this.PIMulti) * this.particleSpeed;
  }

  sin(ratio) {
    return Math.sin(ratio * Math.PI * this.PIMulti) * this.particleSpeed;
  }

  tan(ratio) {
    return Math.tan(ratio * Math.PI * this.PIMulti) * this.particleSpeed;
  }

  simpleModulation(ratio) {
    return (
      (this.audioData[Math.floor(this.bufferLength * ratio)] - 128) *
      this.particleSpeed
    );
  }

  diffModulation(ratio) {
    let i = Math.floor(this.bufferLength * ratio);
    return (
      (this.audioData[i] - this.audioData[i - 1] || 0) * this.particleSpeed
    );
  }

  respawn(particle) {
    if (particle.x > this.w - 5 || particle.x < 5 || isNaN(particle.x))
      particle.x = Math.random() * this.w;
    if (particle.y > this.h - 5 || particle.y < 5 || isNaN(particle.y))
      particle.y = Math.random() * this.h;
  }

  wrap(particle) {
    if (particle.x > this.w) particle.x = 0;
    if (particle.x < 0) particle.x = this.w;
    if (particle.y > this.h) particle.y = 0;
    if (particle.y < 0) particle.x = this.h;
  }

  none() {
    return;
  }

  addTicker() {
    app.ticker.add(() => {
      this.audioAnalyserNode.getByteTimeDomainData(this.audioData);

      for (const p of this.particles) {
        let yRatio = p.y / this.h;
        let xRatio = p.x / this.w;

        this.outOfBoundsType(p);
        const vector = [this.xFn(yRatio), this.yFn(xRatio)];

        p.x += vector[0];
        p.y += vector[1];
      }
    });
  }
}
