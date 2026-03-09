import { Application, Graphics } from "pixi.js";
import { ParticleGenerator } from "./assets/scripts/particleGenerator.js";
import { ParticleTicker } from "./assets/scripts/particleMath.js";

// Create a new application
const app = new Application();

// Initialize the application
await app.init({
  backgroundAlpha: 0,
  resizeTo: window,
  clearBeforeRender: false,
  preserveDrawingBuffer: true,
  antialias: true,
});

document.body.appendChild(app.canvas);

export default app;

const particleGenerator1 = new ParticleGenerator({
  colors: [0x0000ff, 0xff0000],
  size: 1,
  alpha: 0.02,
  quantity: 10000,
});

const particleGenerator2 = new ParticleGenerator({
  colors: [0xff00ff, 0x00ff00],
  size: 1,
  alpha: 0.02,
  quantity: 10000,
});

const particleContainer1 = particleGenerator1.generateContainer();
const particleContainer2 = particleGenerator2.generateContainer();

app.stage.addChild(particleContainer1);
app.stage.addChild(particleContainer2);

const particleTicker1 = new ParticleTicker(
  particleContainer1.particleChildren,
  {
    outOfBoundsType: "respawn",
    xMathFunction: "cos",
    yMathFunction: "sin",
    PIMulti: 4,
  },
);
const particleTicker2 = new ParticleTicker(
  particleContainer2.particleChildren,
  {
    outOfBoundsType: "respawn",
    xMathFunction: "sin",
    yMathFunction: "cos",
    PIMulti: 4,
  },
);

particleTicker1.addTicker();
particleTicker2.addTicker();
