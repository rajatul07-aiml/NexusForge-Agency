import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "800"],
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nexus Forge | Coming soon",
  description:
    "Nexus Forge builds websites, automations and media marketing at fair prices. Launching soon.",
  icons: { icon: "/logo.jpg" },
  openGraph: {
    title: "Nexus Forge | Coming soon",
    description:
      "Websites, automations and media marketing at fair prices. Launching soon.",
    images: ["/banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}