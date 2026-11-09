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
      title: "Article | Nexus Forge",
    };
  }

  return {
    title: `${item.title} | Nexus Forge Blog`,
    description: item.summary || "Article by Nexus Forge.",
  };
}

async function BlogPostContentLoader({ params }: Props) {
  const { slug } = await params;
  const item = await getContentItemBySlug(slug);
  return <BlogPostClient item={item} />;
}

export default function BlogPostPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }} />}>
      <BlogPostContentLoader {...props} />
    </Suspense>
  );
}
