"use cache";

import { Metadata } from "next";
import StartProjectClient from "./StartProjectClient";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Launch your next digital platform, web application, AI automation, or high-growth media campaign with Nexus Forge.",
  alternates: {
    canonical: "/start-project",
  },
  openGraph: {
    title: "Start Your Project | Nexus Forge",
    description:
      "Launch your next digital platform, web application, AI automation, or high-growth media campaign with Nexus Forge.",
    url: "https://nexusforgeagency.in/start-project",
    type: "website",
    images: ["/banner.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Project | Nexus Forge",
    description:
      "Launch your next digital platform, web application, AI automation, or high-growth media campaign with Nexus Forge.",
    images: ["/banner.jpeg"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://nexusforgeagency.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Start Project",
      item: "https://nexusforgeagency.in/start-project",
    },
  ],
};

export default async function StartProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StartProjectClient />
    </>
  );
}
