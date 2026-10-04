import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

import type { ProductImage } from "@/content/products";

const publicDir = path.join(process.cwd(), "public");

/** True if a /public-relative image path exists on disk. Checked at build time. */
export function publicImageExists(src: string) {
  return existsSync(path.join(publicDir, src.replace(/^\//, "")));
}

export type ResolvedImage = ProductImage & { available: boolean };

/**
 * Marks which product images exist so components can render the copper
 * placeholder instead of a broken image. Always returns at least one entry.
 */
export function resolveImages(images: ProductImage[]): ResolvedImage[] {
  return images.map((img) => ({ ...img, available: publicImageExists(img.src) }));
}
