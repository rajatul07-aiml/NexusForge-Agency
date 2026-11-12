"use cache";

import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms of service governing contracts, intellectual property, and client engagements with Nexus Forge digital agency.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Nexus Forge",
    description:
      "Review the terms of service governing contracts, intellectual property, and client engagements with Nexus Forge digital agency.",
    url: "https://nexusforgeagency.in/terms",
    type: "website",
    images: ["/banner.jpeg"],
  },
};

export default async function TermsPage() {
  return <TermsClient />;
}
