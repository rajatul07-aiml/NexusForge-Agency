"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PublishedContent, getPublishedContent } from "@/lib/cms";
import {
  ThemeProvider,
  useTheme,
  Navbar,
  Footer,
  FadeIn,
  SectionLabel,
  WorkCard,
} from "@/app/components/NexusForgeOrchestrator";

function BlogPageContent({ initialItems = [] }: { initialItems?: PublishedContent[] }) {
  const { tk } = useTheme();
  const [items, setItems] = useState<PublishedContent[]>(initialItems);

  useEffect(() => {
    // Live client-side fetch: visible in the browser DevTools Network tab
    getPublishedContent("blog")
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      animate={{ backgroundColor: tk.BG }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <main style={{ flex: 1, paddingTop: 100, paddingBottom: 80 }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 48px)",
          }}
        >
          {/* Header */}
          <FadeIn style={{ marginBottom: 48 }}>
            <SectionLabel label="Articles & Insights" />
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 900,
                color: tk.TEXT_HI,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                maxWidth: "20ch",
                marginBottom: 16,
              }}
            >
              Insights for modern digital growth
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: tk.TEXT_MED,
                maxWidth: "60ch",
                lineHeight: 1.7,
              }}
            >
              In-depth analysis, engineering best practices, and automation blueprints
              from our designers, software architects, and growth engineers.
            </p>
          </FadeIn>

          {/* Grid or Empty State — NO dummy/sample data */}
          {items.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: 24,
              }}
            >
              {items.map((item, i) => (
                <WorkCard key={item.id} item={item} i={i} />
              ))}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: tk.SURFACE,
                border: `1px solid ${tk.BORDER}`,
                borderRadius: 20,
                padding: "clamp(48px, 6vw, 80px) 24px",
                textAlign: "center",
                maxWidth: 600,
                margin: "40px auto 0",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: tk.ACCENT_DIM,
                  color: tk.ACCENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "1.2rem",
                }}
              >
                ✦
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: tk.TEXT_HI,
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                }}
              >
                No articles published yet
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: tk.TEXT_MED,
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                We are actively writing engineering deep-dives, design breakdown pieces,
                and business automation guides. Check back soon!
              </p>
              <Link
                href="/start-project"
                style={{
                  display: "inline-block",
                  backgroundColor: tk.ACCENT,
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Start a Conversation →
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}

export default function BlogClient({ items = [] }: { items?: PublishedContent[] }) {
  return (
    <ThemeProvider>
      <BlogPageContent initialItems={items} />
    </ThemeProvider>
  );
}

