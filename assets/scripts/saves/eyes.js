import {
  Application,
  Sprite,
  Graphics,
  ParticleContainer,
  Particle,
} from "pixi.js";

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

// Append the application canvas to the document body
document.body.appendChild(app.canvas);

const w = app.screen.width;
const h = app.screen.height;

const particleContainer = new ParticleContainer({
  dynamicProperties: {
    position: true,
    vertex: false,
    rotation: false,
    color: false,
  },
});

app.stage.addChild(particleContainer);

const clearRectGraphics = new Graphics();
clearRectGraphics.rect(0, 0, 1, 1).fill();
const clearRectTexture = app.renderer.generateTexture(clearRectGraphics);

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];

const particles = [];

for (let i = 1; i < 150000; i++) {
  const color = Math.floor(Math.random() * 6);
  const particle = new Particle({
    texture: clearRectTexture,
    x: w * Math.random(),
    y: h * Math.random(),
    tint: colors[color],
  });

  particleContainer.addParticle(particle);
  particles.push(particle);
}

app.ticker.add(() => {
  for (let i = 0; i < particles.length; i++) {
    let x = particles[i].x;
    let y = particles[i].y;

    if (x > w || x < 0) particles[i].x = Math.random() * w;
    if (y > h || y < 0) particles[i].y = Math.random() * h;

    particles[i].x += Math.tan(y / 16);
    particles[i].y += Math.cos(x / 16);
  }
});
