"use cache";

import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the privacy policy of Nexus Forge. Learn how we handle project inquiries, protect your data, and ensure digital privacy.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Nexus Forge",
    description:
      "Review the privacy policy of Nexus Forge. Learn how we handle project inquiries, protect your data, and ensure digital privacy.",
    url: "https://nexusforgeagency.in/privacy",
    type: "website",
    images: ["/banner.jpeg"],
  },
};

export default async function PrivacyPage() {
  return <PrivacyClient />;
}
