"use cache";

import { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog & Insights | Nexus Forge",
  description:
    "Explore engineering insights, digital strategy, AI automations, and modern web architecture articles by Nexus Forge.",
};

export default async function BlogPage() {
  const items = await getPublishedContent("blog");
  return <BlogClient items={items} />;
}

