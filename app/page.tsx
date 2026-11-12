"use cache";

import NexusForgeOrchestrator from "./components/NexusForgeOrchestrator";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nexus Forge",
  url: "https://nexusforgeagency.in",
  description:
    "High-performance websites, intelligent automations, and media marketing campaigns that scale modern businesses.",
  publisher: {
    "@type": "Organization",
    name: "Nexus Forge",
    logo: "https://nexusforgeagency.in/logo.jpeg",
  },
};

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <NexusForgeOrchestrator />
    </>
  );
}
