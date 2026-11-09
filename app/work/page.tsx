"use cache";

import { Metadata } from "next";
import { getPublishedContent } from "@/lib/cms";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Proven Results & Case Studies | Nexus Forge",
  description:
    "Explore our published client partnerships, enterprise platform transformations, and technical architectures.",
};

export default async function WorkPage() {
  const items = await getPublishedContent(["case_study", "portfolio"]);
  return <WorkClient items={items} />;
}

