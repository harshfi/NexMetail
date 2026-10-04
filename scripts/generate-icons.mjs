// Renders favicon.ico (16/32/48), apple-icon.png and PWA icons from src/app/icon.svg.
// Run after changing the mark: npm run icons
import fs from "node:fs";

import sharp from "sharp"; // installed with next

const svg = fs.readFileSync("src/app/icon.svg", "utf8");

// Full-bleed square (Apple and Android apply their own corner masks): drop the rounded
// corners and the rim stroke.
const square = svg
  .replace('<rect width="64" height="64" rx="15"', '<rect width="64" height="64"')
  .replace(/<rect x="1\.25"[^>]*\/>/, "");
// Maskable icons need the mark inside the central ~80% safe zone.
const maskable = square
  .replace(/(<path d="M18\.5)/, '<g transform="translate(6.4 6.4) scale(0.8)">$1')
  .replace(/(<\/svg>)/, "</g>$1");

const png = (src, size) =>
  sharp(Buffer.from(src), { density: 800 }).resize(size, size).png().toBuffer();

// ICO container with embedded PNGs.
async function writeIco(file, sizes) {
  const images = await Promise.all(sizes.map((s) => png(svg, s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i], 0);
    e.writeUInt8(sizes[i], 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  fs.writeFileSync(file, Buffer.concat([header, ...entries, ...images]));
}

await writeIco("src/app/favicon.ico", [16, 32, 48]);
fs.mkdirSync("public/icons", { recursive: true });
fs.writeFileSync("src/app/apple-icon.png", await png(square, 180));
fs.writeFileSync("public/icons/icon-192.png", await png(svg, 192));
fs.writeFileSync("public/icons/icon-512.png", await png(svg, 512));
fs.writeFileSync("public/icons/icon-maskable-512.png", await png(maskable, 512));
console.log("✓ Icons generated from src/app/icon.svg");
