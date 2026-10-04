import { getProduct, products } from "@/content/products";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "NexMetal copper scrap product";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const purity = product?.specs.find((s) => s.label === "Purity")?.value;
  const grade = product?.specs.find((s) => s.label === "Grade")?.value;
  return renderOgImage({
    eyebrow: product?.eyebrow ?? "Copper scrap",
    title: product?.name ?? "Copper scrap",
    subtitle: [grade, purity].filter(Boolean).join(" · "),
  });
}
