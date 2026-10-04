import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Branded 1200×630 social card: dark background, copper accent, big uppercase title. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "radial-gradient(circle at 85% 10%, #4a2d16 0%, #121110 55%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 40 40">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E0A36A" />
              <stop offset="0.45" stopColor="#B5763F" />
              <stop offset="1" stopColor="#7A4A22" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#g)" />
          <path
            d="M12 29V11l16 18V11"
            fill="none"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 6 }}>
          {siteConfig.wordmark}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(224,163,106,0.6)",
            color: "#E0A36A",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            marginTop: 28,
            fontSize: title.length > 34 ? 68 : 84,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -1,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              marginTop: 22,
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 980,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <span>Kundli, Sonipat · Haryana · GSTIN {siteConfig.gst.gstin}</span>
        <span
          style={{
            display: "flex",
            width: 220,
            height: 8,
            borderRadius: 8,
            background: "linear-gradient(135deg, #E0A36A 0%, #B5763F 45%, #7A4A22 100%)",
          }}
        />
      </div>
    </div>,
    ogSize,
  );
}
