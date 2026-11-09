"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PublishedContent, getContentItemBySlug, incrementViewCount } from "@/lib/cms";
import {
  ThemeProvider,
  useTheme,
  Navbar,
  Footer,
  FadeIn,
  SectionLabel,
} from "@/app/components/NexusForgeOrchestrator";

function BlogPostContent({
  item,
  viewsCount,
}: {
  item: PublishedContent | null;
  viewsCount: number;
}) {
  const { tk } = useTheme();

  if (!item) {
    return (
      <motion.div
        animate={{ backgroundColor: tk.BG }}
        transition={{ duration: 0.35 }}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: tk.SURFACE,
              border: `1px solid ${tk.BORDER}`,
              borderRadius: 20,
              padding: 40,
              maxWidth: 500,
            }}
          >
            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: tk.TEXT_HI,
                marginBottom: 12,
              }}
            >
              Article Not Found
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: tk.TEXT_MED,
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              The article you are looking for does not exist or has not yet been published.
            </p>
            <Link
              href="/blog"
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
              ← Back to All Articles
            </Link>
          </div>
        </main>
        <Footer />
      </motion.div>
    );
  }

  const formattedDate = item.published_at
    ? new Date(item.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <motion.div
      animate={{ backgroundColor: tk.BG }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <main style={{ flex: 1, paddingTop: 100, paddingBottom: 80 }}>
        <article
          style={{
            maxWidth: 840,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 36px)",
          }}
        >
          {/* Back link */}
          <FadeIn style={{ marginBottom: 32 }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.86rem",
                fontWeight: 600,
                color: tk.TEXT_MED,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${tk.BORDER}`,
                backgroundColor: tk.SURFACE,
              }}
            >
              <span>←</span> All Articles
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn style={{ marginBottom: 36 }}>
            <SectionLabel label="Engineering Insights" />
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 900,
                color: tk.TEXT_HI,
                letterSpacing: "-0.04em",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              {item.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
                padding: "16px 0",
                borderTop: `1px solid ${tk.BORDER}`,
                borderBottom: `1px solid ${tk.BORDER}`,
                fontSize: "0.85rem",
                color: tk.TEXT_MED,
              }}
            >
              <span>By <strong style={{ color: tk.TEXT_HI }}>{item.author_name}</strong></span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: "inline-block", flexShrink: 0, opacity: 0.8 }}
                  aria-hidden="true"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <strong style={{ color: tk.TEXT_HI, fontWeight: 700 }}>{viewsCount.toLocaleString()}</strong>
                <span>{viewsCount === 1 ? "view" : "views"}</span>
              </span>
            </div>
          </FadeIn>

          {/* Article Summary / Content from CMS */}
          {item.summary && (
            <FadeIn style={{ marginBottom: 44 }}>
              <div
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 20,
                  padding: "clamp(24px, 4vw, 40px)",
                  boxShadow: tk.SHADOW_CARD,
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                    color: tk.TEXT_HI,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {item.summary}
                </p>
              </div>
            </FadeIn>
          )}

          {/* Optional Extended Content from CMS if present */}
          {item.content && (
            <FadeIn style={{ marginBottom: 44 }}>
              <div
                style={{
                  color: tk.TEXT_MED,
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.content}
              </div>
            </FadeIn>
          )}

          {/* Call to action */}
          <FadeIn>
            <div
              style={{
                backgroundColor: tk.SURFACE_HOVER,
                border: `1px solid ${tk.BORDER}`,
                borderRadius: 20,
                padding: "clamp(32px, 5vw, 48px)",
                textAlign: "center",
                marginTop: 48,
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 900,
                  color: tk.TEXT_HI,
                  marginBottom: 12,
                  letterSpacing: "-0.03em",
                }}
              >
                Have questions or need technical guidance?
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: tk.TEXT_MED,
                  maxWidth: "48ch",
                  margin: "0 auto 24px",
                  lineHeight: 1.6,
                }}
              >
                Let's discuss your tech stack, system automations, or upcoming digital build.
              </p>
              <Link
                href="/start-project"
                style={{
                  display: "inline-block",
                  backgroundColor: tk.ACCENT,
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: `0 4px 20px ${tk.ACCENT}55`,
                }}
              >
                Start a Conversation →
              </Link>
            </div>
          </FadeIn>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
}

export default function BlogPostClient({ item: initialItem }: { item: PublishedContent | null }) {
  const [item, setItem] = useState<PublishedContent | null>(initialItem);
  const [viewsCount, setViewsCount] = useState<number>(initialItem?.views_count || 0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const slug = pathParts[pathParts.length - 1];
      if (slug) {
        if (!initialItem || initialItem.slug !== slug) {
          getContentItemBySlug(slug).then((data) => {
            if (data) {
              setItem(data);
              setViewsCount(data.views_count || 0);
            }
          });
        }

        // Live real-time view increment
        incrementViewCount(slug).then((newCount) => {
          if (typeof newCount === "number") {
            setViewsCount(newCount);
          }
        });
      }
    }
  }, [initialItem]);

  return (
    <ThemeProvider>
      <BlogPostContent item={item} viewsCount={viewsCount} />
    </ThemeProvider>
  );
}
