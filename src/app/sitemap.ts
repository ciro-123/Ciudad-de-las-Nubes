import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gooblinstudio.com/",
      lastModified: new Date("2026-08-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://gooblinstudio.com/about-us",
      lastModified: new Date("2026-08-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

