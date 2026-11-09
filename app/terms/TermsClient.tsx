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

function TermsContent() {
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
            <SectionLabel label="Agreements & Policies" />
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
              Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p style={{ margin: 0 }}>
                  By accessing the Nexus Forge website (<strong>nexusforgeagency.in</strong>) or retaining our professional services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our website and contracting our services.
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
                  2. Services & Statements of Work
                </h2>
                <p style={{ marginBottom: 16 }}>
                  Nexus Forge provides bespoke digital engineering, intelligent AI automations, product UI/UX design, and media marketing solutions. Each client engagement is defined by an agreed proposal or Statement of Work (SOW) outlining:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li>Detailed project scope, technical specifications, and key deliverables.</li>
                  <li>Milestone schedules, demo intervals, and targeted launch dates.</li>
                  <li>Agreed pricing structures (fixed milestone or dedicated sprint retainer).</li>
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
                  3. Intellectual Property Rights
                </h2>
                <p style={{ marginBottom: 16 }}>
                  We believe in unequivocal client ownership of finished assets:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Client Ownership:</strong> Upon full and final settlement of agreed project fees, all bespoke code, custom design assets, copy, and database schemas crafted specifically for you become your exclusive intellectual property.
                  </li>
                  <li>
                    <strong style={{ color: tk.TEXT_HI }}>Agency Tools & Portfolio:</strong> Nexus Forge retains ownership of proprietary developer tooling, generalized starter libraries, and pre-existing code frameworks. Unless explicitly restricted by an active NDA, Nexus Forge reserves the right to display project outcomes, anonymized metrics, and screenshots in our portfolio and case studies.
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
                  4. Client Obligations & Approvals
                </h2>
                <p style={{ margin: 0 }}>
                  Successful project delivery requires active collaboration. Clients agree to provide timely feedback, required third-party credentials, copy assets, and formal sign-offs within agreed sprint review windows. Delays in client feedback may lead to adjusted deployment timelines.
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
                  5. Payment Terms & Change Requests
                </h2>
                <p style={{ margin: 0 }}>
                  Invoices are issued on a milestone or scheduled sprint basis and are payable within the terms specified on the invoice. Any modifications, feature additions, or architectural deviations beyond the initial agreed Statement of Work will be scoped transparently as an approved change order before implementation.
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
                  6. Warranties & Limitation of Liability
                </h2>
                <p style={{ margin: 0 }}>
                  We engineer products in accordance with modern industry standards, rigorous unit testing, and optimal security best practices. However, to the maximum extent permitted by applicable law, Nexus Forge shall not be liable for indirect, incidental, or consequential damages resulting from third-party API downtime, hosting outages, or unauthorized third-party intrusion. Total liability for any direct claims shall not exceed the fees paid to Nexus Forge under the applicable contract.
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
                  7. Contact Information
                </h2>
                <p style={{ margin: 0 }}>
                  For questions regarding these Terms of Service or contract specifics, please contact us at{" "}
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

export default function TermsClient() {
  return (
    <ThemeProvider>
      <TermsContent />
    </ThemeProvider>
  );
}

