import type { MetadataRoute } from "next";
import { getPublishedContent } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nexusforgeagency.in";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/start-project`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic CMS items
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const allPublished = await getPublishedContent();
    for (const item of allPublished) {
      if (!item.slug || item.slug === "_") continue;

      const lastModified = item.updated_at ? new Date(item.updated_at) : new Date();

      if (item.type === "blog") {
        dynamicRoutes.push({
          url: `${baseUrl}/blog/${item.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      } else if (item.type === "case_study" || item.type === "portfolio") {
        dynamicRoutes.push({
          url: `${baseUrl}/work/${item.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Graceful fallback to static routes if database is unreachable during build
  }

  return [...staticRoutes, ...dynamicRoutes];
}

