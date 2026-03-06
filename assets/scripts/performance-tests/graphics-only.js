import { Application, Sprite, Graphics } from "pixi.js";

// Create a new application
const app = new Application();

// Initialize the application
await app.init({ background: "#FFFFFF", resizeTo: window });

// Append the application canvas to the document body
document.body.appendChild(app.canvas);

const rects = [];
const circles = [];

for (let i = 1; i < 20000; i++) {
  const rectGraphics = new Graphics();
  rectGraphics
    .rect(0, 0, 20, 20)
    .fill({ color: 0xff0000 })
    .stroke({ width: 2, color: 0x000000 });
  rectGraphics.x = app.screen.width * Math.random();
  rectGraphics.y = app.screen.height * Math.random();
  rectGraphics.rotationSpeed = Math.random() * 0.1;

  app.stage.addChild(rectGraphics);
  rects.push(rectGraphics);
}

for (let i = 1; i < 20000; i++) {
  const circleGraphics = new Graphics();
  circleGraphics
    .circle(0, 0, 5)
    .fill({ color: 0xffff00 })
    .stroke({ width: 2, color: 0x000000 });
  circleGraphics.x = app.screen.width * Math.random();
  circleGraphics.y = app.screen.height * Math.random();

  app.stage.addChild(circleGraphics);
  circles.push(circleGraphics);
}

app.ticker.add((time) => {
  for (const rectGraphics of rects) {
    rectGraphics.rotation += rectGraphics.rotationSpeed * time.deltaTime;
    rectGraphics.x += time.deltaTime;
  }
});

app.ticker.add((time) => {
  for (const circleGraphics of circles) {
    circleGraphics.y += time.deltaTime;
  }
});
