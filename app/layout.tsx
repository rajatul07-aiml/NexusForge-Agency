import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusforgeagency.in"),
  title: "Nexus Forge | Digital Agency — Web, Automation & Media",
  description:
    "Nexus Forge builds high-performance websites, intelligent automations, and media marketing campaigns that scale modern businesses.",
  icons: { icon: "/logo.jpeg" },
  openGraph: {
    title: "Nexus Forge | Digital Agency",
    description:
      "Websites, automations, and media marketing forged for modern growth.",
    images: ["/banner.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
