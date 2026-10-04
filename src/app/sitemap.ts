import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/quality", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
