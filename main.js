import { Application, Assets, Sprite } from "pixi.js";
import { ParticleGenerator } from "./assets/scripts/particleGenerator.js";
import { ParticleTicker } from "./assets/scripts/particleMath.js";
import { createImageParticles } from "./assets/scripts/createImageParticles.js";

const img = await createImageParticles("images/flowers.jpg");

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

// test for commit
const imageParticleGenerator = new ParticleGenerator({
  size: 1,
  alpha: 1,
  particles: img.particles,
});

const imageParticleContainer = imageParticleGenerator.generateContainer();

const transparencyAsset = await Assets.load("images/flowers.jpg");
const transparencySprite = new Sprite(transparencyAsset);
transparencySprite.alpha = 0.01;
transparencySprite.position.set(0, 0);

app.stage.addChild(transparencySprite);
app.stage.addChild(imageParticleContainer);

const imageParticleTicker = new ParticleTicker(
  imageParticleContainer.particleChildren,
  {
    fft: 2048,
    particleSpeed: 0.1,
    outOfBoundsType: "respawn",
    xFn: "diffModulation",
    yFn: "cos",
    PIMulti: 2,
  },
);

imageParticleTicker.setupAudio("audio/music.mp3");
imageParticleTicker.addTicker();

// const particleGenerator1 = new ParticleGenerator({
//   colors: [0x0000ff, 0xff0000],
//   size: 1,
//   alpha: 1,
//   quantity: 10000,
// });

// const particleGenerator2 = new ParticleGenerator({
//   colors: [0xff00ff, 0x00ff00],
//   size: 1,
//   alpha: 1,
//   quantity: 10000,
// });

// const particleContainer1 = particleGenerator1.generateContainer();
// const particleContainer2 = particleGenerator2.generateContainer();

// app.stage.addChild(particleContainer1);
// app.stage.addChild(particleContainer2);

// const particleTicker1 = new ParticleTicker(
//   particleContainer1.particleChildren,
//   {
//     outOfBoundsType: "respawn",
//     xMathFunction: "cos",
//     yMathFunction: "sin",
//     PIMulti: 4,
//   },
// );
// const particleTicker2 = new ParticleTicker(
//   particleContainer2.particleChildren,
//   {
//     outOfBoundsType: "respawn",
//     xMathFunction: "sin",
//     yMathFunction: "cos",
//     PIMulti: 4,
//   },
// );

// particleTicker1.addTicker();
// particleTicker2.addTicker();
