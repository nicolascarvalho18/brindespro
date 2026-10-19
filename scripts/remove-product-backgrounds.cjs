const fs = require('node:fs');
const path = require('node:path');
const sharp = require('../frontend/node_modules/sharp');

const sourceDir = path.join(__dirname, '../frontend/public/images');
const outputDir = path.join(sourceDir, 'products');
const files = [
  'backpack.png', 'bottle-angle.png', 'bottle-back.png', 'bottle-blue.png',
  'bottle-white.png', 'bottle.png', 'kit.png', 'mug.png', 'notebook.png',
  'pens.png', 'tumbler.png',
];

function colorDistance(r, g, b, bg) {
  const dr = r - bg[0], dg = g - bg[1], db = b - bg[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function removeBackground(file) {
  const input = path.join(sourceDir, file);
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const border = [];
  const stride = Math.max(1, Math.floor(Math.min(width, height) / 150));
  const sample = (x, y) => {
    const i = (y * width + x) * channels;
    border.push([data[i], data[i + 1], data[i + 2]]);
  };
  for (let x = 0; x < width; x += stride) { sample(x, 0); sample(x, height - 1); }
  for (let y = stride; y < height - 1; y += stride) { sample(0, y); sample(width - 1, y); }
  const bg = [0, 0, 0];
  for (let c = 0; c < 3; c++) bg[c] = border.reduce((sum, p) => sum + p[c], 0) / border.length;
  const alpha = Buffer.alloc(width * height, 255);
  const seen = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0, tail = 0;
  const push = (idx) => { if (!seen[idx]) { seen[idx] = 1; queue[tail++] = idx; } };
  for (let x = 0; x < width; x++) { push(x); push((height - 1) * width + x); }
  for (let y = 1; y < height - 1; y++) { push(y * width); push(y * width + width - 1); }

  // Follow only the neutral, bright studio backdrop connected to the image edge.
  // This keeps white product surfaces intact when they are separated by a visible contour.
  while (head < tail) {
    const idx = queue[head++], i = idx * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const luminance = .2126 * r + .7152 * g + .0722 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const dist = colorDistance(r, g, b, bg);
    const whiteProductNeedsSaferMask = file === 'bottle-white.png';
    const isBackdrop = whiteProductNeedsSaferMask
      ? luminance >= 218 && chroma <= 27 && dist <= 43
      : luminance >= 190 && chroma <= 35 && dist <= 90;
    if (!isBackdrop) continue;
    alpha[idx] = 0;
    const x = idx % width, y = Math.floor(idx / width);
    if (x > 0) push(idx - 1);
    if (x + 1 < width) push(idx + 1);
    if (y > 0) push(idx - width);
    if (y + 1 < height) push(idx + width);
  }

  // Feather a narrow edge band to avoid a hard, jagged cut while keeping opaque interiors.
  const feather = new Uint8Array(width * height);
  for (let idx = 0; idx < alpha.length; idx++) {
    if (alpha[idx] !== 0) continue;
    const x = idx % width, y = Math.floor(idx / width);
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = ny * width + nx;
      if (alpha[ni] === 255) feather[ni] = 1;
    }
  }
  for (let idx = 0; idx < feather.length; idx++) {
    if (!feather[idx]) continue;
    const i = idx * channels, r = data[i], g = data[i + 1], b = data[i + 2];
    const d = colorDistance(r, g, b, bg);
    // Partially remove only neutral fringe pixels. Product-colored edges remain opaque.
    const neutral = Math.max(r, g, b) - Math.min(r, g, b) <= 24;
    if (neutral && d < 55) alpha[idx] = Math.max(48, Math.round(255 * (d / 55)));
  }
  const rgba = Buffer.alloc(width * height * 4);
  for (let idx = 0; idx < width * height; idx++) {
    const si = idx * channels, di = idx * 4;
    const a = alpha[idx] / 255;
    rgba[di] = a < 1 ? Math.min(255, Math.max(0, Math.round((data[si] - bg[0] * (1 - a)) / Math.max(a, .01)))) : data[si];
    rgba[di + 1] = a < 1 ? Math.min(255, Math.max(0, Math.round((data[si + 1] - bg[1] * (1 - a)) / Math.max(a, .01)))) : data[si + 1];
    rgba[di + 2] = a < 1 ? Math.min(255, Math.max(0, Math.round((data[si + 2] - bg[2] * (1 - a)) / Math.max(a, .01)))) : data[si + 2];
    rgba[di + 3] = alpha[idx];
  }
  const output = path.join(outputDir, file.replace(/\.png$/i, '.webp'));
  await sharp(rgba, { raw: { width, height, channels: 4 } }).webp({ lossless: true, effort: 6, alphaQuality: 100 }).toFile(output);
  const transparent = alpha.reduce((n, value) => n + (value < 255 ? 1 : 0), 0);
  console.log(`${file}: ${width}x${height}, ${Math.round(transparent / alpha.length * 100)}% transparent pixels`);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  for (const file of files) await removeBackground(file);
})().catch((error) => { console.error(error); process.exitCode = 1; });
