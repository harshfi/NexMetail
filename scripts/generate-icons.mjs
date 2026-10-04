// Renders favicon.ico (16/32/48), apple-icon.png (180, square) and PWA icons from the SVG mark.
import fs from "node:fs";

import sharp from "sharp"; // installed with next
const svg = fs.readFileSync("src/app/icon.svg");
// Apple masks corners itself and PWA maskable icons need a safe zone: square, full-bleed variant.
const square = Buffer.from(svg.toString().replace('rx="14"', 'rx="0"'));
const maskable = Buffer.from(
  square
    .toString()
    .replace(
      '<path d="M19 46V18l26 28V18"',
      '<path transform="translate(6.4 6.4) scale(0.8)" d="M19 46V18l26 28V18"',
    ),
);
const png = (src, size) =>
  sharp(src, { density: 600 }).resize(size, size).png().toBuffer();

await (async () => {
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map((s) => png(svg, s)));
  // ICO container with embedded PNGs.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const dirs = images.map((img, i) => {
    const d = Buffer.alloc(16);
    d.writeUInt8(sizes[i], 0);
    d.writeUInt8(sizes[i], 1);
    d.writeUInt8(0, 2);
    d.writeUInt8(0, 3);
    d.writeUInt16LE(1, 4);
    d.writeUInt16LE(32, 6);
    d.writeUInt32LE(img.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += img.length;
    return d;
  });
  fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...dirs, ...images]));
  fs.writeFileSync("src/app/apple-icon.png", await png(square, 180));
  fs.writeFileSync("public/icons/icon-192.png", await png(svg, 192));
  fs.writeFileSync("public/icons/icon-512.png", await png(svg, 512));
  fs.writeFileSync("public/icons/icon-maskable-512.png", await png(maskable, 512));
})();
