import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

import type { ProductImage } from "@/content/products";

const publicDir = path.join(process.cwd(), "public");

/** True if a /public-relative image path exists on disk. Checked at build time. */
export function publicImageExists(src: string) {
  return existsSync(path.join(publicDir, src.replace(/^\//, "")));
}

/**
 * Product images that actually exist on disk. Components render the copper
 * placeholder when this is empty, so a missing photo never breaks the build.
 */
export function availableImages(images: ProductImage[]): ProductImage[] {
  return images.filter((img) => publicImageExists(img.src));
}
