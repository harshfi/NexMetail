import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<Mark radius={7} />, size);
}

export function Mark({ radius }: { radius: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        background: "linear-gradient(135deg, #E0A36A 0%, #B5763F 45%, #7A4A22 100%)",
      }}
    >
      <svg width="70%" height="70%" viewBox="8 8 24 24">
        <path
          d="M12 29V11l16 18V11"
          fill="none"
          stroke="white"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
