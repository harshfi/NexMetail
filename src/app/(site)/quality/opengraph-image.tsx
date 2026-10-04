import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "NexMetal quality and process";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Quality & process",
    title: "What we quote is what you receive",
    subtitle: "Sourcing → sorting → grading → packing → weighment & dispatch",
  });
}
