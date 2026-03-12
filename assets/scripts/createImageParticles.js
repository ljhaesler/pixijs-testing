export async function createImageParticles(src) {
  const img = new Image();
  img.src = src;
  await img.decode();

  const w = img.width;
  const h = img.height;

  const canvas = document.getElementById("c");
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const pixelLocation = (i) => {
    // 4 bytes per pixel => actual pixel index = i / 4 floored
    i = Math.floor(i / 4);
    return [i % w, Math.floor(i / w)];
  };

  function createParticles() {
    const imageData = ctx.getImageData(0, 0, w, h);

    let particles = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];

      if (red > 40 && blue < 150) {
        const location = pixelLocation(i);
        particles.push({
          location,
          color: new Uint8Array([red, green, blue]),
        });
      }
    }
    return particles;
  }

  canvas.remove();

  let particles = createParticles();
  console.log("particle count: " + particles.length);
  return { particles, img };
}
