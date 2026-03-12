import { Application, Assets, Sprite } from "pixi.js";
import { ParticleGenerator } from "./assets/scripts/particleGenerator.js";
import { ParticleTicker } from "./assets/scripts/particleMath.js";
import { createImageParticles } from "./assets/scripts/createImageParticles.js";

const img = await createImageParticles("images/tron_legacy.jpg");

// Create a new application
const app = new Application();

// Initialize the application
await app.init({
  width: img.img.naturalWidth,
  height: img.img.naturalHeight,
  backgroundAlpha: 0,
  clearBeforeRender: false,
  preserveDrawingBuffer: true,
});

document.body.appendChild(app.canvas);

export default app;

// const randomParticleGenerator = new ParticleGenerator({
//   colors: [0xffffff],
//   size: 1,
//   alpha: 1,
//   quantity: 200,
// });
// const randomParticleContainer = randomParticleGenerator.generateContainer();
// app.stage.addChild(randomParticleContainer);
// const randomParticleTicker = new ParticleTicker(
//   randomParticleContainer.particleChildren,
//   {
//     xSpd: 1,
//     ySpd: 1,
//     xFn: "sin",
//     yFn: "sin",
//     outOfBoundsType: "respawn",
//     PIMulti: 2,
//   },
// );
// randomParticleTicker.addTicker();

const imageParticleGenerator = new ParticleGenerator({
  size: 4,
  alpha: 1,
  particles: img.particles,
});

const imageParticleContainer = imageParticleGenerator.generateContainer();

app.stage.addChild(imageParticleContainer);

const imageParticleTicker = new ParticleTicker(
  imageParticleContainer.particleChildren,
  {
    fft: 8192,
    xSpd: 0.04,
    ySpd: 0.005,
    outOfBoundsType: "wrap",
    xFn: "diffModulation",
    yFn: "simpleModulation",
    audioDataFn: "frequencyData",
    PIMulti: 16,
  },
);

imageParticleTicker.setupAudio("audio/music.mp3");
imageParticleTicker.addTicker();
