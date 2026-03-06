import { ParticleContainer, Particle, Graphics } from "pixi.js";
import app from "../../main.js";

export class ParticleGenerator {
  constructor(particleOptions) {
    this.colors = particleOptions.colors || [0x000000];
    this.size = particleOptions.size || 1;
    this.alpha = particleOptions.alpha || 1;
    this.quantity = particleOptions.quantity || 10000;
    this.w = app.screen.width;
    this.h = app.screen.height;
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
      let color = Math.floor(Math.random() * this.colors.length);
      const particle = new Particle({
        texture,
        x: this.w * Math.random(),
        y: this.h * Math.random(),
        tint: this.colors[color],
        alpha: this.alpha,
      });

      particleContainer.addParticle(particle);
    }

    return particleContainer;
  }
}
