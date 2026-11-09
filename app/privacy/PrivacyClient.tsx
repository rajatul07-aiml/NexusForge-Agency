"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ThemeProvider,
  useTheme,
  Navbar,
  Footer,
  FadeIn,
  SectionLabel,
} from "@/app/components/NexusForgeOrchestrator";

function PrivacyContent() {
  const { tk } = useTheme();

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
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 36px)",
          }}
        >
          {/* Back link */}
          <FadeIn style={{ marginBottom: 32 }}>
            <Link
              href="/"
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
              <span>←</span> Back to Home
            </Link>
          </FadeIn>

          {/* Header */}
          <FadeIn style={{ marginBottom: 40 }}>
            <SectionLabel label="Legal & Transparency" />
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 900,
                color: tk.TEXT_HI,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ fontSize: "0.95rem", color: tk.TEXT_LO, margin: 0 }}>
              Last revised: November 2026 • Nexus Forge Agency (nexusforgeagency.in)
            </p>
          </FadeIn>

          {/* Content sections */}
          <FadeIn>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 36,
                color: tk.TEXT_MED,
                fontSize: "0.98rem",
                lineHeight: 1.8,
              }}
            >
              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  1. Overview & Commitment
                </h2>
                <p style={{ margin: 0 }}>
                  Nexus Forge (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{" "}
                  <strong style={{ color: tk.TEXT_HI }}>nexusforgeagency.in</strong>. We respect your privacy and are committed to protecting any personal information you share with us through our website, project inquiry forms, and client communication channels.
                </p>
              </section>

              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  2. Information We Collect
                </h2>
                <p style={{ marginBottom: 16 }}>
                  We collect information strictly necessary to communicate with you and deliver high-impact digital solutions:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Direct Project Inquiries:</strong> When you submit our &quot;Start a Project&quot; form, we collect your full name, email address, phone number, requested service category, and project description.
                  </li>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Technical & Usage Data:</strong> Standard server telemetry including your browser user agent, device screen dimensions, operating system, and IP address collected automatically to ensure responsive layout delivery and security.
                  </li>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Client Communications:</strong> Correspondence via email, WhatsApp, or scheduled calls when scoping project requirements.
                  </li>
                </ul>
              </section>

              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  3. How We Use Your Information
                </h2>
                <p style={{ marginBottom: 16 }}>
                  The data collected is utilized solely for lawful business purposes:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li>Reviewing project proposals and generating tailored technical scopes.</li>
                  <li>Delivering transactional emails, status notifications, and answering inquiries.</li>
                  <li>Maintaining system stability, fraud prevention, and performance audits.</li>
                  <li>Strictly <strong>never</strong> selling, renting, or trading your personal data to third-party data brokers or marketing advertisers.</li>
                </ul>
              </section>

              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  4. Third-Party Processors & Infrastructure
                </h2>
                <p style={{ marginBottom: 16 }}>
                  We rely on industry-standard, secure cloud services to power our operations:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Resend:</strong> Secure transactional email dispatch for contact inquiries.
                  </li>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Supabase:</strong> Headless content management and structured data storage with row-level security.
                  </li>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Vercel:</strong> Global edge network deployment with automatic TLS encryption and DDOS mitigation.
                  </li>
                </ul>
              </section>

              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  5. Security & Data Protection
                </h2>
                <p style={{ margin: 0 }}>
                  All network traffic is encrypted in transit via Transport Layer Security (TLS 1.3). Access to our internal dashboards, CMS databases, and inquiry logs is protected by granular role-based access control and multi-factor authentication.
                </p>
              </section>

              <section
                style={{
                  backgroundColor: tk.SURFACE,
                  border: `1px solid ${tk.BORDER}`,
                  borderRadius: 16,
                  padding: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: tk.TEXT_HI,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  6. Your Rights & Inquiries
                </h2>
                <p style={{ margin: 0 }}>
                  You have the right to request access to the personal data we hold about you, request corrections, or ask for complete deletion of your submission records. For any privacy-related questions or data deletion requests, email us directly at{" "}
                  <a
                    href="mailto:contact@nexusforgeagency.in"
                    style={{ color: tk.ACCENT, textDecoration: "none", fontWeight: 600 }}
                  >
                    contact@nexusforgeagency.in
                  </a>.
                </p>
              </section>
            </div>
          </FadeIn>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
}

export default function PrivacyClient() {
  return (
    <ThemeProvider>
      <PrivacyContent />
    </ThemeProvider>
  );
}

