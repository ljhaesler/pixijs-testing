import { Application, Sprite, Graphics } from "pixi.js";

// Create a new application
const app = new Application();

// Initialize the application
await app.init({ background: "#FFFFFF", resizeTo: window });

// Append the application canvas to the document body
document.body.appendChild(app.canvas);

const rectGraphics = new Graphics();
const circleGraphics = new Graphics();

rectGraphics
  .rect(0, 0, 20, 20)
  .fill({ color: 0xff0000 })
  .stroke({ width: 2, color: 0x000000 });

const rectTexture = app.renderer.generateTexture(rectGraphics);

circleGraphics
  .circle(0, 0, 5)
  .fill({ color: 0xffff00 })
  .stroke({ width: 2, color: 0x000000 });

const circleTexture = app.renderer.generateTexture(circleGraphics);

const rects = [];
const circles = [];

for (let i = 1; i < 40000; i++) {
  const rect = new Sprite(rectTexture);

  rect.anchor.set(0.5);

  rect.x = app.screen.width * Math.random();
  rect.y = app.screen.height * Math.random();

  rect.rotationSpeed = Math.random() * 0.1;

  app.stage.addChild(rect);
  rects.push(rect);
}

for (let i = 1; i < 40000; i++) {
  const circle = new Sprite(circleTexture);

  circle.anchor.set(0.5);

  circle.x = app.screen.width * Math.random();
  circle.y = app.screen.height * Math.random();

  app.stage.addChild(circle);
  circles.push(circle);
}

app.ticker.add((time) => {
  for (const rect of rects) {
    rect.rotation += rect.rotationSpeed * time.deltaTime;
    rect.x += time.deltaTime;
  }
});

app.ticker.add((time) => {
  for (const circle of circles) {
    circle.y += time.deltaTime;
  }
});
