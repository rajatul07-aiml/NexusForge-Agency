import { Suspense } from "react";
import { Metadata } from "next";
import { getContentItemBySlug, getPublishedContent } from "@/lib/cms";
import CaseStudyClient from "./CaseStudyClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getPublishedContent(["case_study", "portfolio"]);
  if (!items || items.length === 0) {
    return [{ slug: "_" }];
  }
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentItemBySlug(slug);

  if (!item) {
    return {
      title: "Case Study Not Found",
    };
  }

  const title = item.title;
  const description = item.summary || "Case study by Nexus Forge.";
  const url = `https://nexusforgeagency.in/work/${item.slug}`;
  const image = item.cover_image || "/banner.jpeg";

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${item.slug}`,
    },
    openGraph: {
      title: `${title} | Nexus Forge Case Study`,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Nexus Forge Case Study`,
      description,
      images: [image],
    },
  };
}

async function CaseStudyContentLoader({ params }: Props) {
  const { slug } = await params;
  const item = await getContentItemBySlug(slug);

  if (!item) {
    return <CaseStudyClient item={null} />;
  }

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    headline: item.title,
    description: item.summary || item.title,
    image: item.cover_image || "https://nexusforgeagency.in/banner.jpeg",
    datePublished: item.published_at || item.updated_at,
    dateModified: item.updated_at,
    author: {
      "@type": "Organization",
      name: "Nexus Forge",
      url: "https://nexusforgeagency.in",
    },
    provider: {
      "@type": "Organization",
      name: "Nexus Forge",
      url: "https://nexusforgeagency.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nexusforgeagency.in/work/${item.slug}`,
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
        name: "Case Studies",
        item: "https://nexusforgeagency.in/work",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `https://nexusforgeagency.in/work/${item.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseStudyClient item={item} />
    </>
  );
}

export default function CaseStudyPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }} />}>
      <CaseStudyContentLoader {...props} />
    </Suspense>
  );
}
