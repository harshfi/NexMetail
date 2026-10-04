import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "NexMetal copper scrap product catalogue";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Product catalogue",
    title: "Copper scrap grades",
    subtitle: "Patti, rassa (Millberry), tally, AC copper pipe and dori",
  });
}
