import { ParticleContainer, Particle, Graphics } from "pixi.js";
import app from "../../main.js";

export class ParticleGenerator {
  constructor(particleOptions) {
    this.colors = particleOptions.colors || [0x000000];
    this.size = particleOptions.size || 1;
    this.alpha = particleOptions.alpha || 1;
    this.particles = particleOptions.particles || null;
    this.quantity = particleOptions.quantity || this.particles.length;

    this.w = app.screen.width;
    this.h = app.screen.height;
  }

  getLocation(location) {
    if (location) return location;
    else return [this.w * Math.random(), this.h * Math.random()];
  }

  getColor(color) {
    if (color) return color;
    else return Math.floor(Math.random() * this.colors.length);
  }

  generateContainer() {
    const particleContainer = new ParticleContainer({
      dynamicProperties: {
        position: true,
        vertex: false,
        rotation: false,
        color: false,
      },
    });

    const particleGraphics = new Graphics();
    particleGraphics.rect(0, 0, this.size, this.size).fill();
    const texture = app.renderer.generateTexture(particleGraphics);

    for (let i = 1; i < this.quantity; i++) {
      const location = this.getLocation(this.particles[i]?.location);
      const color = this.getColor(this.particles[i].color);
      const particle = new Particle({
        texture,
        x: location[0],
        y: location[1],
        tint: color,
        alpha: this.alpha,
      });

      particleContainer.addParticle(particle);
    }

    return particleContainer;
  }
}
