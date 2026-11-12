import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/NexusForgeOrchestrator";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ], 
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusforgeagency.in"),
  title: {
    default: "Nexus Forge | Digital Agency — Web, Automation & Media",
    template: "%s | Nexus Forge",
  },
  description:
    "Nexus Forge builds high-performance websites, intelligent automations, and media marketing campaigns that scale modern businesses.",
  applicationName: "Nexus Forge",
  authors: [{ name: "Nexus Forge Team", url: "https://nexusforgeagency.in" }],
  creator: "Nexus Forge",
  publisher: "Nexus Forge",
  keywords: [
    "Nexus Forge",
    "Nexus Forge Agency",
    "digital agency",
    "web development agency",
    "AI automations",
    "Next.js web development",
    "media marketing",
    "software engineering",
    "growth marketing",
    "enterprise software",
    "custom web applications",
    "digital transformation",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Nexus Forge | Digital Agency — Web, Automation & Media",
    description:
      "Websites, automations, and media marketing forged for modern growth.",
    url: "https://nexusforgeagency.in",
    siteName: "Nexus Forge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,  
        alt: "Nexus Forge - Web, Automation & Media Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Forge | Digital Agency — Web, Automation & Media",
    description:
      "Websites, automations, and media marketing forged for modern growth.",
    images: ["/banner.jpeg"],
    creator: "@nexusforgeagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google1e5aaf96a9b4fc2e",
  },
  category: "technology",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nexus Forge",
  alternateName: "Nexus Forge Digital Agency",
  url: "https://nexusforgeagency.in",
  logo: "https://nexusforgeagency.in/logo.jpeg",
  image: "https://nexusforgeagency.in/banner.jpeg",
  description:
    "Nexus Forge builds high-performance websites, intelligent automations, and media marketing campaigns that scale modern businesses.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/nexus-forge",
    "https://twitter.com/nexusforgeagency",
    "https://instagram.com/nexusforgeagency",
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Agency Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack Web & Software Development",
          description: "High-performance Next.js web applications, APIs, and scalable cloud architectures.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom AI Solutions & Automations",
          description: "Tailored AI pipelines, workflow automations, and internal business tools.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing & Growth",
          description: "High-ROI paid media, content strategy, and organic acquisition funnels.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX & Product Design",
          description: "World-class interface design, user journey mapping, and conversion optimization.",
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('nexusforge_theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.style.backgroundColor = '#0A0A0B';
                } else if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                  document.documentElement.style.backgroundColor = '#FAFAFA';
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
