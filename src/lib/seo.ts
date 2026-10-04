import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

/** Builds per-page metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
