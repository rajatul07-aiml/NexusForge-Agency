"use cache";

import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Nexus Forge",
  description:
    "Review the terms of service governing contracts, intellectual property, and client engagements with Nexus Forge digital agency.",
};

export default async function TermsPage() {
  return <TermsClient />;
}
