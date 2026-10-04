import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "NexMetal — graded copper scrap supplier in Kundli, Sonipat";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Copper · Non-ferrous scrap",
    title: "Graded copper scrap, dispatched fast from Kundli",
    subtitle: "Patti · Rassa · Tally · AC Pipe · Dori — GST invoice on every load",
  });
}
