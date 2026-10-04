import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact NexMetal for a copper scrap quote";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Get a quote for copper scrap",
    subtitle: "Call, WhatsApp or send an enquiry — HSIIDC Industrial Estate, Kundli",
  });
}
