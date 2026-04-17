"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const id = "ENQ-" + Date.now().toString(36).toUpperCase();
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-background py-24 md:py-40 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-100 h-100 rounded-full border border-(--muted-sand) opacity-25 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-(--muted-sand) opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[11px] tracking-[0.3em] uppercase font-heading mb-6"
            style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}
          >
            Maison de Parfum · Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-text-primary mb-6"
          >
            We&apos;d love to
            <br className="hidden md:block" />
            <span style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}>
              hear from you.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}
          >
            Whether it&apos;s a product question, a Perfume Bar enquiry, or
            simply a hello — our team is here.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Grid ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-(--bridal-white)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left — Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-12"
            >
              {/* General */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase font-heading mb-4"
                  style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}
                >
                  General Enquiries
                </p>
                <div className="space-y-2 text-text-secondary text-sm leading-relaxed">
                  <p>
                    <span style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                      Email:
                    </span>{" "}
                    <span className="text-text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
                      [hello@maisondeparfum.com.au]
                    </span>
                  </p>
                  <p>
                    <span style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                      Phone:
                    </span>{" "}
                    <span className="text-text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>[+61 XXX XXX XXX]</span>
                  </p>
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                    Response time: within 1–2 business days
                  </p>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase font-heading mb-4"
                  style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}
                >
                  Location
                </p>
                <div className="space-y-1 text-text-secondary text-sm leading-relaxed">
                  <p className="text-text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
                    [Studio / Showroom Address]
                  </p>
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>[Suburb, State, Postcode]</p>
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>Australia</p>
                </div>
              </div>

              {/* Hours */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase font-heading mb-4"
                  style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}
                >
                  Business Hours
                </p>
                <div className="space-y-1 text-text-secondary text-sm">
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                    Monday – Friday:{" "}
                    <span className="text-text-primary">[9am – 5pm AEST]</span>
                  </p>
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                    Saturday:{" "}
                    <span className="text-text-primary">[By appointment]</span>
                  </p>
                  <p style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                    Sunday: <span className="text-text-primary">Closed</span>
                  </p>
                </div>
              </div>

              {/* Perfume Bar shortcut */}
              <div className="border-t border-(--muted-sand) pt-8">
                <p className="text-[11px] tracking-[0.3em] uppercase font-heading mb-3"
                  style={{ color: "#B28E3B", fontFamily: "var(--font-playfair)" }}
                >
                  Perfume Bar Enquiries
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-4" style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                  Planning a wedding or event? Use our dedicated enquiry form
                  for a faster response.
                </p>
                <Link
                  href="/perfume-bar#enquire"
                  className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase border border-(--button-gold) px-5 py-2.5 hover:bg-(--button-gold) hover:text-(--bridal-white) transition-colors duration-300"
                  style={{ color: "#B28E3B", fontFamily: "var(--font-montserrat)" }}
                >
                  Perfume Bar Enquiry
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 space-y-5"
                >
                  <div className="w-12 h-12 rounded-full border border-(--button-gold) flex items-center justify-center text-(--button-gold) mb-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10l5 5 7-8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-text-primary">
                    Thank you for reaching out.
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-sm">
                    We&apos;ve received your message and will get back to you
                    within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-[11px] tracking-widest uppercase text-(--button-gold) hover:underline mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary" style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                        Full Name{" "}
                        <span className="text-(--button-gold)">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="h-13 px-4 bg-(--soft-cream) border border-(--muted-sand) rounded text-text-primary text-sm placeholder:text-(--warm-taupe) focus:outline-none focus:border-(--button-gold) transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary" style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                        Email Address{" "}
                        <span className="text-(--button-gold)">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="h-13 px-4 bg-(--soft-cream) border border-(--muted-sand) rounded text-text-primary text-sm placeholder:text-(--warm-taupe) focus:outline-none focus:border-(--button-gold) transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary" style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                      Subject <span className="text-(--button-gold)">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="h-13 px-4 bg-(--soft-cream) border border-(--muted-sand) rounded text-text-primary text-sm focus:outline-none focus:border-(--button-gold) transition-colors duration-200 appearance-none"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="product">Product Enquiry</option>
                      <option value="order">Order Support</option>
                      <option value="perfume-bar">Perfume Bar / Events</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary" style={{ color: "#7C6D5A", fontFamily: "var(--font-montserrat)" }}>
                      Message <span className="text-(--button-gold)">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="px-4 py-3.5 bg-(--soft-cream) border border-(--muted-sand) rounded text-text-primary text-sm placeholder:text-(--warm-taupe) focus:outline-none focus:border-(--button-gold) transition-colors duration-200 resize-none leading-relaxed"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-13 bg-(--button-gold) text-[12px] tracking-widest uppercase font-bold hover:bg-(--button-gold-hover) transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ color: "#FAF8F5", fontFamily: "var(--font-montserrat)" }}
                  >
                    {submitting ? "Sending…" : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Socials strip ────────────────────────────────────── */}
      <section className="py-16 bg-background border-t border-(--muted-sand)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <p className="font-heading text-xl font-semibold text-text-primary">
              Follow our journey
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Instagram", handle: "@maisondeparfum" },
                { label: "TikTok", handle: "@maisondeparfum" },
                { label: "Pinterest", handle: "@maisondeparfum" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-0.5">
                    {s.label}
                  </p>
                  <p className="text-sm text-(--button-gold) font-medium">
                    {s.handle}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
