import app from "../../main.js";

export class ParticleTicker {
  constructor(particles, tickerSettings) {
    this.particles = particles;

    this.xFn = Math[tickerSettings.xMathFunction];
    this.yFn = Math[tickerSettings.yMathFunction];
    this.outOfBoundsType = this[tickerSettings.outOfBoundsType].bind(this);

    this.PIMulti = tickerSettings.PIMulti;

    this.w = app.screen.width;
    this.h = app.screen.height;
  }

  respawn(particle) {
    if (particle.x > this.w || particle.x < 0)
      particle.x = Math.random() * this.w;
    if (particle.y > this.h || particle.y < 0)
      particle.y = Math.random() * this.h;
  }

  wrap(particle) {
    if (particle.x > this.w) particle.x = 0;
    if (particle.x < 0) particle.x = this.w;
    if (particle.y > this.h) particle.y = 0;
    if (particle.y < 0) particle.x = this.h;
  }

  addTicker() {
    app.ticker.add(() => {
      for (const p of this.particles) {
        let yRatio = p.y / this.h;
        let xRatio = p.x / this.w;

        this.outOfBoundsType(p);
        p.x += this.xFn(yRatio * Math.PI * this.PIMulti);
        p.y += this.yFn(xRatio * Math.PI * this.PIMulti);
      }
    });
  }
}
