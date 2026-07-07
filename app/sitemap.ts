import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webairy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/orders`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.1,
    },
  ];
}
