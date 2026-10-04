#!/usr/bin/env node
// Lists product images referenced in src/content/products.ts that are missing from /public.
// Usage: npm run check:images   (exit code 1 if any are missing, for use in CI)
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(path.join(root, "src/content/products.ts"), "utf8");

// Each product calls productImages("<slug>", [ "...alt", ... ]) — count alts per slug.
const pattern = /productImages\(\s*"([^"]+)",\s*\[([\s\S]*?)\]\s*\)/g;
const missing = [];
let total = 0;

for (const [, slug, altBlock] of source.matchAll(pattern)) {
  const count = [...altBlock.matchAll(/"(?:[^"\\]|\\.)*"/g)].length;
  for (let i = 1; i <= count; i++) {
    total++;
    const rel = `public/images/products/${slug}/${i}.jpg`;
    if (!existsSync(path.join(root, rel))) missing.push(rel);
  }
}

if (total === 0) {
  console.error("No productImages(...) calls found — has products.ts changed shape?");
  process.exit(1);
}

if (missing.length === 0) {
  console.log(`✓ All ${total} product images present.`);
} else {
  console.log(
    `✗ ${missing.length} of ${total} product images missing (placeholder will render):`,
  );
  for (const file of missing) console.log(`  - ${file}`);
  process.exitCode = 1;
}
