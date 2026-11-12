"use cache";

import { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog & Engineering Insights",
  description:
    "Explore engineering insights, digital strategy, AI automations, and modern web architecture articles by Nexus Forge.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Engineering Insights | Nexus Forge",
    description:
      "Explore engineering insights, digital strategy, AI automations, and modern web architecture articles by Nexus Forge.",
    url: "https://nexusforgeagency.in/blog",
    type: "website",
    images: ["/banner.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Engineering Insights | Nexus Forge",
    description:
      "Explore engineering insights, digital strategy, AI automations, and modern web architecture articles by Nexus Forge.",
    images: ["/banner.jpeg"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://nexusforgeagency.in",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog & Insights",
      "item": "https://nexusforgeagency.in/blog",
    },
  ],
};

export default async function BlogPage() {
  const items = await getPublishedContent("blog");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogClient items={items} />
    </>
  );
}
