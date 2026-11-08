"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SERVICES_OPTIONS = [
  "Custom AI Solutions & Automations",
  "Full-Stack Web & Software Development",
  "Digital Marketing & Growth",
  "UI/UX & Product Design",
  "Complete Digital Transformation",
  "Other / Custom Inquiry",
];

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: SERVICES_OPTIONS[0],
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: SERVICES_OPTIONS[0],
        description: "",
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
        color: "#0A0A0B",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          borderBottom: "1px solid #E4E4E8",
          backgroundColor: "#FFFFFF",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 48px)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src="/favicon.ico"
                alt="Nexus Forge"
                width={32}
                height={32}
                style={{ objectFit: "contain", display: "block" }}
                priority
              />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#0A0A0B",
                letterSpacing: "-0.02em",
              }}
            >
              Nexus Forge
            </span>
          </Link>

          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#52525B",
              fontSize: "0.88rem",
              fontWeight: 500,
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid #E4E4E8",
              backgroundColor: "#FAFAFA",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0A0A0B";
              e.currentTarget.style.borderColor = "#D0D0D8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#52525B";
              e.currentTarget.style.borderColor = "#E4E4E8";
            }}
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 72px) clamp(20px, 4vw, 32px)",
        }}
      >
        {/* Title & Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6366F1",
              backgroundColor: "#6366F115",
              border: "1px solid #6366F130",
              padding: "4px 12px",
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            Start a Project
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              color: "#0A0A0B",
              marginBottom: 14,
            }}
          >
            Let's build something extraordinary.
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#52525B",
              lineHeight: 1.6,
              maxWidth: "50ch",
              margin: "0 auto",
            }}
          >
            Fill out the form below with your requirements. We'll review your project details and respond within 24 hours.
          </p>
        </motion.div>

        {/* Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E4E8",
            borderRadius: 20,
            padding: "clamp(24px, 4vw, 40px)",
            boxShadow: "0 12px 36px -12px rgba(0,0,0,0.06)",
          }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ textAlign: "center", padding: "40px 16px" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  color: "#15803D",
                  fontSize: "1.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                  color: "#0A0A0B",
                }}
              >
                Inquiry Received!
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#52525B",
                  maxWidth: "42ch",
                  margin: "0 auto 28px",
                  lineHeight: 1.6,
                }}
              >
                Thank you for reaching out. We have received your project details and our team will get back to you within 24 hours.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  style={{
                    backgroundColor: "#6366F1",
                    color: "#fff",
                    padding: "10px 22px",
                    borderRadius: 10,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Submit Another Project
                </button>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "10px 22px",
                    borderRadius: 10,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "1px solid #E4E4E8",
                    color: "#0A0A0B",
                    textDecoration: "none",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Error banner */}
              {status === "error" && (
                <div
                  style={{
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                    color: "#B91C1C",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                  }}
                >
                  {errorMessage || "Failed to submit. Please check your network and try again."}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#0A0A0B",
                  }}
                >
                  Full Name <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1px solid #D0D0D8",
                    backgroundColor: "#FAFAFA",
                    fontSize: "0.95rem",
                    color: "#0A0A0B",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Email & Phone Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 16,
                }}
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      marginBottom: 6,
                      color: "#0A0A0B",
                    }}
                  >
                    Email Address <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid #D0D0D8",
                      backgroundColor: "#FAFAFA",
                      fontSize: "0.95rem",
                      color: "#0A0A0B",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      marginBottom: 6,
                      color: "#0A0A0B",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid #D0D0D8",
                      backgroundColor: "#FAFAFA",
                      fontSize: "0.95rem",
                      color: "#0A0A0B",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Service Required Dropdown */}
              <div>
                <label
                  htmlFor="service"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#0A0A0B",
                  }}
                >
                  Service Required <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1px solid #D0D0D8",
                    backgroundColor: "#FAFAFA",
                    fontSize: "0.95rem",
                    color: "#0A0A0B",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  {SERVICES_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Description */}
              <div>
                <label
                  htmlFor="description"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#0A0A0B",
                  }}
                >
                  Service / Project Description <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  placeholder="Tell us about your project goals, scope, requirements, or target timeline..."
                  value={formData.description}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1px solid #D0D0D8",
                    backgroundColor: "#FAFAFA",
                    fontSize: "0.95rem",
                    color: "#0A0A0B",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                style={{
                  backgroundColor: "#6366F1",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  boxShadow: "0 4px 16px -2px rgba(99,102,241,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                {status === "loading" ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    Sending Inquiry...
                  </>
                ) : (
                  <>Send Project Inquiry →</>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Direct contact info */}
        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#71717A",
          }}
        >
          Prefer direct email? Reach us at{" "}
          <a
            href="mailto:contact@nexusforgeagency.in"
            style={{ color: "#6366F1", textDecoration: "none", fontWeight: 600 }}
          >
            contact@nexusforgeagency.in
          </a>
        </div>
      </main>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

