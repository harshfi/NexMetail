import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About NexMetal Recycling Private Limited";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "About NexMetal",
    title: "Copper scrap, handled properly",
    subtitle: "NexMetal Recycling Private Limited — GST-registered since 2019",
  });
}
