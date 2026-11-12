"use cache";

import { Metadata } from "next";
import StartProjectClient from "../start-project/StartProjectClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nexus Forge. Discuss your software engineering, AI automation, or digital marketing requirements.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Nexus Forge",
    description:
      "Get in touch with Nexus Forge. Discuss your software engineering, AI automation, or digital marketing requirements.",
    url: "https://nexusforgeagency.in/contact",
    type: "website",
    images: ["/banner.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Nexus Forge",
    description:
      "Get in touch with Nexus Forge. Discuss your software engineering, AI automation, or digital marketing requirements.",
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
      name: "Contact",
      item: "https://nexusforgeagency.in/contact",
    },
  ],
};

export default async function ContactPage() {
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
