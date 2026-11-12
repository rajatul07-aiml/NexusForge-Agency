"use cache";

import { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Proven Results & Case Studies",
  description:
    "Explore our published client partnerships, enterprise platform transformations, and technical architectures built by Nexus Forge.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Proven Results & Case Studies | Nexus Forge",
    description:
      "Explore our published client partnerships, enterprise platform transformations, and technical architectures.",
    url: "https://nexusforgeagency.in/work",
    type: "website",
    images: ["/banner.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proven Results & Case Studies | Nexus Forge",
    description:
      "Explore our published client partnerships, enterprise platform transformations, and technical architectures.",
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
      "name": "Case Studies",
      "item": "https://nexusforgeagency.in/work",
    },
  ],
};

export default async function WorkPage() {
  const items = await getPublishedContent(["case_study", "portfolio"]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <WorkClient items={items} />
    </>
  );
}
