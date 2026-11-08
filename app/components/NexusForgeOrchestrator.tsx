"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, createContext, useContext, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Theme Tokens
───────────────────────────────────────────────────────────── */
interface Tokens {
  BG: string;
  SURFACE: string;
  SURFACE_HOVER: string;
  BORDER: string;
  BORDER_LT: string;
  TEXT_HI: string;
  TEXT_MED: string;
  TEXT_LO: string;
  ACCENT: string;
  ACCENT_DIM: string;
  ACCENT_MED: string;
  SHADOW_CARD: string;
  STEP_NUM: string;
  NAV_BG: string;
}

const dark: Tokens = {
  BG: "#0A0A0B",
  SURFACE: "#111113",
  SURFACE_HOVER: "#141416",
  BORDER: "#1E1E22",
  BORDER_LT: "#2A2A2E",
  TEXT_HI: "#F0EEE9",
  TEXT_MED: "#9A9896",
  TEXT_LO: "#4A4A50",
  ACCENT: "#6366F1",
  ACCENT_DIM: "#6366F120",
  ACCENT_MED: "#6366F140",
  SHADOW_CARD: "0 24px 60px -16px rgba(0,0,0,0.6)",
  STEP_NUM: "#2A2A2E",
  NAV_BG: "#0A0A0BCC",
};

const light: Tokens = {
  BG: "#FAFAFA",
  SURFACE: "#FFFFFF",
  SURFACE_HOVER: "#F4F4F8",
  BORDER: "#E4E4E8",
  BORDER_LT: "#D0D0D8",
  TEXT_HI: "#0A0A0B",
  TEXT_MED: "#52525B",
  TEXT_LO: "#A1A1AA",
  ACCENT: "#6366F1",
  ACCENT_DIM: "#6366F115",
  ACCENT_MED: "#6366F130",
  SHADOW_CARD: "0 24px 60px -16px rgba(0,0,0,0.1)",
  STEP_NUM: "#D4D4D8",
  NAV_BG: "#FAFAFAe6",
};

/* ─────────────────────────────────────────────────────────────
   Theme Context
───────────────────────────────────────────────────────────── */
interface ThemeCtx { tk: Tokens; isDark: boolean; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ tk: light, isDark: false, toggle: () => { } });
function useTheme() { return useContext(ThemeContext); }

/* ─────────────────────────────────────────────────────────────
   Theme Toggle
───────────────────────────────────────────────────────────── */
function ThemeToggle() {
  const { isDark, toggle, tk } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 40, height: 40, borderRadius: 10,
        border: `1px solid ${hov ? tk.ACCENT_MED : tk.BORDER}`,
        backgroundColor: hov ? tk.ACCENT_DIM : "transparent",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background-color 0.2s, border-color 0.2s",
        flexShrink: 0,
      }}
    >
      <motion.span
        key={isDark ? "sun" : "moon"}
        initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   FadeIn scroll helper
───────────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style }: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section divider label
───────────────────────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  const { tk } = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: tk.BORDER }} />
      <span style={{ color: tk.TEXT_LO, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: tk.BORDER }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Navbar
───────────────────────────────────────────────────────────── */
function NavLink({ href, label }: { href: string; label: string }) {
  const { tk } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: hov ? tk.TEXT_HI : tk.TEXT_MED,
        textDecoration: "none",
        fontSize: "0.875rem", fontWeight: 500,
        transition: "color 0.15s",
        position: "relative",
        paddingBottom: 2,
      }}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute", bottom: -2, left: 0,
          width: "100%", height: 1.5,
          backgroundColor: tk.ACCENT,
          display: "block",
          transformOrigin: "left",
        }}
      />
    </a>
  );
}

function Navbar() {
  const { tk } = useTheme();
  const links = ["Services", "Work", "About", "Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background appears as user scrolls down towards the 2nd page
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: `1px solid ${scrolled || menuOpen ? tk.BORDER : "transparent"}`,
        backgroundColor: scrolled || menuOpen ? tk.NAV_BG : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        boxShadow: scrolled || menuOpen ? "0 10px 30px -10px rgba(0,0,0,0.08)" : "none",
        transition: "background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, -webkit-backdrop-filter 0.35s ease, box-shadow 0.35s ease",
      } as React.CSSProperties}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 48px)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
      }}>
        {/* Logo — favicon.ico */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            overflow: "hidden", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Image
              src="/favicon.ico"
              alt="Nexus Forge logo"
              width={32}
              height={32}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: tk.TEXT_HI, letterSpacing: "-0.02em" }}>
            Nexus Forge
          </span>
        </Link>

        {/* Right side container */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Desktop links */}
          <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 28, marginRight: 8 }}>
            {links.map(l => (
              <NavLink
                key={l}
                href={l === "Contact" ? "/start-project" : `#${l.toLowerCase()}`}
                label={l}
              />
            ))}
          </div>

          {/* Theme Toggle (both mobile & desktop) */}
          <ThemeToggle />

          {/* Desktop CTA */}
          <Link
            href="/start-project"
            className="desktop-only"
            style={{
              backgroundColor: tk.ACCENT, color: "#fff",
              padding: "8px 18px", borderRadius: 8,
              fontSize: "0.85rem", fontWeight: 600,
              textDecoration: "none", letterSpacing: "-0.01em",
              display: "inline-block",
              boxShadow: `0 4px 16px -2px ${tk.ACCENT}66`,
              transition: "transform 0.15s ease, opacity 0.15s ease",
            }}
          >
            Start a Project
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-only"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: `1px solid ${tk.BORDER}`,
              backgroundColor: menuOpen ? tk.ACCENT_DIM : "transparent",
              color: tk.TEXT_HI,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              cursor: "pointer",
              padding: 0,
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                backgroundColor: tk.TEXT_HI,
                borderRadius: 2,
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                transition: "transform 0.25s ease",
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                backgroundColor: tk.TEXT_HI,
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                backgroundColor: tk.TEXT_HI,
                borderRadius: 2,
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                transition: "transform 0.25s ease",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              backgroundColor: tk.SURFACE,
              borderBottom: `1px solid ${tk.BORDER}`,
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{
              padding: "16px clamp(16px, 4vw, 32px) 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              {links.map((l) => (
                <a
                  key={l}
                  href={l === "Contact" ? "/start-project" : `#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: tk.TEXT_HI,
                    textDecoration: "none",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    padding: "10px 0",
                    borderBottom: `1px solid ${tk.BORDER_LT}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{l}</span>
                  <span style={{ color: tk.TEXT_LO, fontSize: "0.85rem" }}>→</span>
                </a>
              ))}

              <div style={{ paddingTop: 8 }}>
                <Link
                  href="/start-project"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    backgroundColor: tk.ACCENT,
                    color: "#fff",
                    padding: "14px 20px",
                    borderRadius: 10,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: `0 4px 16px ${tk.ACCENT}40`,
                    minHeight: 44,
                  }}
                >
                  Start a Project →
                </Link>
              </div>

              {/* Social icons in drawer */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 10 }}>
                {SOCIALS.map((s) => (
                  <SocialIcon key={s.label} social={s} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────────── */
function Hero() {
  const { tk, isDark } = useTheme();
  return (
    <section style={{
      position: "relative",
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      borderBottom: `1px solid ${tk.BORDER}`,
      paddingTop: 64,
      boxSizing: "border-box",
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
        src="/background.mp4"
      />

      {/* Video Overlay / Tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isDark ? "rgba(10, 10, 11, 0.72)" : "rgba(250, 250, 250, 0.84)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          zIndex: 1,
          transition: "background-color 0.3s ease",
        }}
      />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)",
        boxSizing: "border-box",
      }}>
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2.4rem, 7.5vw, 5.8rem)",
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: "-0.045em", color: tk.TEXT_HI,
            maxWidth: "16ch", marginBottom: 20,
          }}
        >
          Build.{" "}
          <span style={{
            background: `linear-gradient(135deg, ${tk.ACCENT} 0%, #818cf8 60%, #c084fc 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Automate.
          </span>
          {" "}Grow.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)",
            color: tk.TEXT_MED, lineHeight: 1.7,
            maxWidth: "52ch", marginBottom: 32,
          }}
        >
          Nexus Forge is a full-service digital agency crafting intelligent web products,
          AI automations, and growth-focused campaigns for ambitious businesses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-buttons-container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          <motion.a
            className="hero-btn"
            href="/start-project"
            whileHover={{ scale: 1.04, boxShadow: `0 10px 48px -8px ${tk.ACCENT}BB` }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              backgroundColor: tk.ACCENT, color: "#fff",
              padding: "14px 28px", borderRadius: 10,
              fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: `0 0 40px -8px ${tk.ACCENT}66`,
              minHeight: 48,
            }}
          >
            Start a Project <span>→</span>
          </motion.a>
          <motion.a
            className="hero-btn"
            href="#work"
            whileHover={{ borderColor: tk.BORDER_LT, color: tk.TEXT_HI, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid ${tk.BORDER_LT}`, color: tk.TEXT_MED,
              padding: "14px 28px", borderRadius: 10,
              fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
              minHeight: 48,
            }}
          >
            See Our Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01", icon: "⬡",
    title: "AI Solutions",
    desc: "From intelligent chatbots to predictive pipelines — we build AI that works for your business, not the other way around.",
    tags: ["LLM Fine-tuning", "RAG Systems", "Process Automation", "Chatbots"],
  },
  {
    num: "02", icon: "◈",
    title: "Software Development",
    desc: "Pixel-perfect web apps and scalable backends built with the modern stack. Performance, accessibility, and long-term quality.",
    tags: ["Next.js / React", "React Native", "Node.js / Python", "REST & GraphQL"],
  },
  {
    num: "03", icon: "✦",
    title: "Digital Marketing",
    desc: "Data-driven campaigns across SEO, paid, and social that compound over time. We track revenue — not vanity metrics.",
    tags: ["SEO & Content", "Paid Ads", "Social Media", "Analytics"],
  },
];

function ServiceCard({ service, i }: { service: typeof SERVICES[0]; i: number }) {
  const { tk } = useTheme();
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -8, boxShadow: `${tk.SHADOW_CARD}, 0 0 0 1px ${tk.ACCENT}44` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: tk.SURFACE,
        border: `1px solid ${hov ? tk.ACCENT + "55" : tk.BORDER}`,
        borderRadius: 16,
        padding: "clamp(28px, 3vw, 40px)",
        cursor: "default",
        transition: "border-color 0.3s",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Accent glow top-left on hover */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: -40, left: -40,
          width: 160, height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tk.ACCENT}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: tk.TEXT_LO, letterSpacing: "0.08em" }}>
          {service.num}
        </span>
        <motion.div
          animate={{
            backgroundColor: hov ? tk.ACCENT_DIM : tk.BORDER,
            borderColor: hov ? tk.ACCENT_MED : tk.BORDER_LT,
            color: hov ? tk.ACCENT : tk.TEXT_LO,
            rotate: hov ? 15 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            border: `1px solid ${tk.BORDER_LT}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          {service.icon}
        </motion.div>
      </div>

      <h3 style={{
        fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
        fontWeight: 800, color: tk.TEXT_HI,
        letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.2,
      }}>
        {service.title}
      </h3>

      <p style={{
        fontSize: "0.9rem", color: tk.TEXT_MED,
        lineHeight: 1.75, marginBottom: 28, flexGrow: 1,
      }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        {service.tags.map(t => (
          <motion.span
            key={t}
            whileHover={{ backgroundColor: tk.ACCENT_DIM, borderColor: tk.ACCENT_MED, color: tk.ACCENT }}
            transition={{ duration: 0.15 }}
            style={{
              fontSize: "0.72rem", fontWeight: 600, color: tk.TEXT_MED,
              border: `1px solid ${tk.BORDER_LT}`,
              padding: "4px 10px", borderRadius: 999, letterSpacing: "0.01em",
              cursor: "default",
            }}
          >{t}</motion.span>
        ))}
      </div>

      {/* Hover CTA */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
        transition={{ duration: 0.25 }}
        style={{
          marginTop: 16, fontSize: "0.84rem",
          fontWeight: 700, color: tk.ACCENT,
          display: "flex", alignItems: "center", gap: 6,
        }}
      >
        Learn more
        <motion.span animate={{ x: hov ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  const { tk } = useTheme();
  return (
    <section id="services" style={{
      maxWidth: 1200, margin: "0 auto",
      padding: "0 clamp(20px, 4vw, 48px) clamp(80px, 10vw, 120px)",
    }}>
      <FadeIn style={{ marginBottom: 56 }}>
        <SectionLabel label="What We Do" />
        <h2 style={{
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          fontWeight: 900, color: tk.TEXT_HI,
          letterSpacing: "-0.04em", lineHeight: 1.1, maxWidth: "20ch",
        }}>
          Everything you need to scale your business
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
        {SERVICES.map((s, i) => <ServiceCard key={i} service={s} i={i} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Process
───────────────────────────────────────────────────────────── */
const STEPS = [
  { n: "01", title: "Discovery", desc: "We start with a deep-dive into your goals, users, and competitive landscape to map a clear path forward." },
  { n: "02", title: "Strategy", desc: "From the insights we build a focused plan — product scope, tech stack, timeline, and KPIs you'll actually care about." },
  { n: "03", title: "Build", desc: "Our team executes with speed and precision. You get weekly demos, transparent progress, and zero surprises." },
  { n: "04", title: "Launch & Grow", desc: "We ship, monitor, and iterate. Post-launch support and growth work are always part of the equation." },
];

function ProcessRow({ step, i, last }: { step: typeof STEPS[0]; i: number; last: boolean }) {
  const { tk } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="process-row-grid"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ backgroundColor: hov ? tk.SURFACE_HOVER : "rgba(0,0,0,0)" }}
      transition={{ duration: 0.2 }}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "clamp(20px, 3vw, 40px)",
        padding: "clamp(24px, 3vw, 40px) clamp(12px, 2vw, 24px)",
        borderBottom: !last ? `1px solid ${tk.BORDER}` : "none",
        alignItems: "center",
        borderRadius: 12,
        cursor: "default",
      }}
    >
      <motion.div
        animate={{ color: hov ? tk.ACCENT : tk.STEP_NUM }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {step.n}
      </motion.div>
      <div className="process-inner-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(16px, 3vw, 48px)", alignItems: "start" }}>
        <motion.h3
          animate={{ color: hov ? tk.ACCENT : tk.TEXT_HI }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            paddingTop: 2,
          }}
        >
          {step.title}
        </motion.h3>
        <p style={{ fontSize: "0.9rem", color: tk.TEXT_MED, lineHeight: 1.75 }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

function Process() {
  const { tk } = useTheme();
  return (
    <section id="work" style={{
      borderTop: `1px solid ${tk.BORDER}`,
      padding: "clamp(80px, 10vw, 120px) 0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <FadeIn style={{ marginBottom: 64 }}>
          <SectionLabel label="How We Work" />
          <h2 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
            fontWeight: 900, color: tk.TEXT_HI,
            letterSpacing: "-0.04em", lineHeight: 1.1,
          }}>
            Our process
          </h2>
        </FadeIn>
        <div>
          {STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <ProcessRow step={step} i={i} last={i === STEPS.length - 1} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Testimonials
───────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "Nexus Forge took our idea from a rough brief to a polished, live product in just 6 weeks. The team is sharp, communicative, and genuinely cares about results.",
    name: "Rahul M.", role: "Founder, TechVenture",
  },
  {
    quote: "The AI automation they built cut our manual processing time by 80%. It's the kind of leverage that actually changes how a business operates.",
    name: "Anika S.", role: "COO, RetailScale",
  },
  {
    quote: "Working with Nexus Forge felt like having a world-class product team in-house. They think about growth, not just deliverables.",
    name: "Dev P.", role: "CEO, GrowthLab",
  },
];

function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const { tk } = useTheme();
  return (
    <FadeIn delay={i * 0.1}>
      <motion.div
        whileHover={{
          y: -6,
          boxShadow: `${tk.SHADOW_CARD}, 0 0 0 1px ${tk.ACCENT}44`,
          borderColor: tk.ACCENT + "55",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        style={{
          backgroundColor: tk.BG,
          border: `1px solid ${tk.BORDER}`,
          borderRadius: 16,
          padding: "clamp(24px, 3vw, 36px)",
          cursor: "default",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
          {Array(5).fill(0).map((_, j) => (
            <span key={j} style={{ color: tk.ACCENT, fontSize: "0.9rem" }}>★</span>
          ))}
        </div>
        <p style={{
          fontSize: "0.95rem", color: tk.TEXT_MED,
          lineHeight: 1.75, marginBottom: 24, fontStyle: "italic",
        }}>
          "{t.quote}"
        </p>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: tk.TEXT_HI }}>{t.name}</div>
          <div style={{ fontSize: "0.78rem", color: tk.TEXT_LO, marginTop: 2 }}>{t.role}</div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

function Testimonials() {
  const { tk } = useTheme();
  return (
    <section id="about" style={{
      borderTop: `1px solid ${tk.BORDER}`,
      padding: "clamp(80px, 10vw, 120px) 0",
      backgroundColor: tk.SURFACE,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <FadeIn style={{ marginBottom: 56 }}>
          <SectionLabel label="Client Stories" />
          <h2 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
            fontWeight: 900, color: tk.TEXT_HI,
            letterSpacing: "-0.04em", lineHeight: 1.1,
          }}>
            What our clients say
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA / Contact
───────────────────────────────────────────────────────────── */
function CTA() {
  const { tk } = useTheme();
  return (
    <section id="contact" style={{
      borderTop: `1px solid ${tk.BORDER}`,
      padding: "clamp(80px, 10vw, 140px) 0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <FadeIn>
          <div style={{
            backgroundColor: tk.SURFACE,
            border: `1px solid ${tk.BORDER}`,
            borderRadius: 24,
            padding: "clamp(48px, 6vw, 80px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%", height: "60%",
              background: `radial-gradient(circle, ${tk.ACCENT}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid ${tk.BORDER_LT}`,
              borderRadius: 999, padding: "5px 14px", marginBottom: 24,
              color: tk.TEXT_LO, fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Let's Talk
            </span>

            <h2 style={{
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              fontWeight: 900, color: tk.TEXT_HI,
              letterSpacing: "-0.045em", lineHeight: 1.05,
              maxWidth: "18ch", margin: "0 auto 20px",
            }}>
              Ready to build something great?
            </h2>

            <p style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: tk.TEXT_MED, lineHeight: 1.75,
              maxWidth: "48ch", margin: "0 auto 44px",
            }}>
              Tell us about your project and we'll get back to you within 24 hours.
              No sales pitches — just an honest conversation.
            </p>

            <div className="cta-buttons-container" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a
                className="cta-btn"
                href="/start-project"
                whileHover={{ scale: 1.05, boxShadow: `0 10px 56px -8px ${tk.ACCENT}BB` }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  backgroundColor: tk.ACCENT, color: "#fff",
                  padding: "16px 32px", borderRadius: 10,
                  fontSize: "1rem", fontWeight: 700, textDecoration: "none",
                  letterSpacing: "-0.01em",
                  boxShadow: `0 0 40px -8px ${tk.ACCENT}66`,
                  minHeight: 48,
                }}
              >
                Start a Project →
              </motion.a>
              <motion.a
                className="cta-btn"
                href="https://wa.me/919709381728"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, borderColor: tk.BORDER_LT, color: tk.TEXT_HI }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${tk.BORDER_LT}`, color: tk.TEXT_MED,
                  padding: "16px 32px", borderRadius: 10,
                  fontSize: "1rem", fontWeight: 600, textDecoration: "none",
                  minHeight: 48,
                }}
              >
                WhatsApp
              </motion.a>
            </div>

            {/* Social icons strip */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 32 }}>
              {SOCIALS.map(s => <SocialIcon key={s.label} social={s} />)}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Social icons (inline SVG)
───────────────────────────────────────────────────────────── */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nexusforgeagency/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@nexusforgeagency",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexusforge.agency",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Nexusforgeagency/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

function SocialIcon({ social }: { social: typeof SOCIALS[0] }) {
  const { tk } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        width: 38, height: 38, borderRadius: 10,
        border: `1px solid ${hov ? tk.ACCENT + "66" : tk.BORDER}`,
        backgroundColor: hov ? tk.ACCENT_DIM : "transparent",
        color: hov ? tk.ACCENT : tk.TEXT_LO,
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
        flexShrink: 0,
      }}
    >
      {social.icon}
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────── */
function Footer() {
  const { tk } = useTheme();
  return (
    <footer style={{
      borderTop: `1px solid ${tk.BORDER}`,
      maxWidth: 1200, margin: "0 auto",
    }}>
      {/* Social row */}
      <div
        className="footer-social-row"
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(20px, 4vw, 48px)",
          borderBottom: `1px solid ${tk.BORDER}`,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "0.82rem", color: tk.TEXT_LO, letterSpacing: "0.01em" }}>
          Follow us for updates & behind-the-scenes
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIALS.map(s => <SocialIcon key={s.label} social={s} />)}
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="footer-bottom-row"
        style={{
          padding: "clamp(20px, 2.5vw, 32px) clamp(20px, 4vw, 48px)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 16, flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
            <Image src="/favicon.ico" alt="Nexus Forge" width={24} height={24} style={{ objectFit: "contain", display: "block" }} />
          </div>
          <span style={{ fontSize: "0.78rem", color: tk.TEXT_LO }}>© 2026 Nexus Forge. All rights reserved.</span>
        </div>

        {/* Legal links */}
        <div style={{ display: "flex", gap: 24 }}>
          {[["Privacy", "#"], ["Terms", "#"]].map(([label, href]) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ color: tk.ACCENT }}
              transition={{ duration: 0.15 }}
              style={{ color: tk.TEXT_LO, fontSize: "0.82rem", textDecoration: "none" }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Landing Page
───────────────────────────────────────────────────────────── */
function LandingPage() {
  const { tk } = useTheme();
  return (
    <motion.div
      animate={{ backgroundColor: tk.BG }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Root — provides theme context
───────────────────────────────────────────────────────────── */
export default function NexusForgeOrchestrator() {
  const [isDark, setIsDark] = useState(false);
  const toggle = useCallback(() => setIsDark(d => !d), []);
  const tk = isDark ? dark : light;

  return (
    <ThemeContext.Provider value={{ tk, isDark, toggle }}>
      <LandingPage />
    </ThemeContext.Provider>
  );
}
