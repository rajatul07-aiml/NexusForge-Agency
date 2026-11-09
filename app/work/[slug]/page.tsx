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
      title: "Case Study | Nexus Forge",
    };
  }

  return {
    title: `${item.title} | Nexus Forge Case Study`,
    description: item.summary || "Case study by Nexus Forge.",
  };
}

async function CaseStudyContentLoader({ params }: Props) {
  const { slug } = await params;
  const item = await getContentItemBySlug(slug);
  return <CaseStudyClient item={item} />;
}

export default function CaseStudyPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }} />}>
      <CaseStudyContentLoader {...props} />
    </Suspense>
  );
}
