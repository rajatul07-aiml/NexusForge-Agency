import { Suspense } from "react";
import { Metadata } from "next";
import { getContentItemBySlug, getPublishedContent } from "@/lib/cms";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getPublishedContent("blog");
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
      title: "Article Not Found",
    };
  }

  const title = item.title;
  const description = item.summary || "Article by Nexus Forge engineering and product team.";
  const url = `https://nexusforgeagency.in/blog/${item.slug}`;
  const image = item.cover_image || "/banner.jpeg";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${item.slug}`,
    },
    openGraph: {
      title: `${title} | Nexus Forge Blog`,
      description,
      url,
      type: "article",
      publishedTime: item.published_at || item.updated_at,
      modifiedTime: item.updated_at,
      authors: [item.author_name || "Nexus Forge"],
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Nexus Forge Blog`,
      description,
      images: [image],
    },
  };
}

async function BlogPostContentLoader({ params }: Props) {
  const { slug } = await params;
  const item = await getContentItemBySlug(slug);

  if (!item) {
    return <BlogPostClient item={null} />;
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: item.title,
    description: item.summary || item.title,
    image: item.cover_image || "https://nexusforgeagency.in/banner.jpeg",
    datePublished: item.published_at || item.updated_at,
    dateModified: item.updated_at,
    author: {
      "@type": "Person",
      name: item.author_name || "Nexus Forge Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexus Forge",
      logo: {
        "@type": "ImageObject",
        url: "https://nexusforgeagency.in/logo.jpeg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nexusforgeagency.in/blog/${item.slug}`,
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
        name: "Blog",
        item: "https://nexusforgeagency.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `https://nexusforgeagency.in/blog/${item.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient item={item} />
    </>
  );
}

export default function BlogPostPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }} />}>
      <BlogPostContentLoader {...props} />
    </Suspense>
  );
}
