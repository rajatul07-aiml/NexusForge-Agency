"use cache";

import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexus Forge",
  description:
    "Review the privacy policy of Nexus Forge. Learn how we handle project inquiries, protect your data, and ensure digital privacy.",
};

export default async function PrivacyPage() {
  return <PrivacyClient />;
}
