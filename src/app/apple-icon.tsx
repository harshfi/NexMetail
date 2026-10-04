import { ImageResponse } from "next/og";

import { Mark } from "./icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // Apple applies its own corner mask, so render square.
  return new ImageResponse(<Mark radius={0} />, size);
}
