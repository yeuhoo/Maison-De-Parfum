"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What types of events are suitable for a perfume bar?",
    a: "Weddings, engagement parties, bridal showers, corporate events — any celebration where you want to offer a luxury, personalised experience.",
  },
  {
    q: "How long does the perfume bar service take?",
    a: "Typically 2–3 hours, providing guests ample time to explore, enjoy, and take home their personalised fragrance.",
  },
  {
    q: "Are the perfume bottles already personalised?",
    a: "Yes. Every guest receives a beautifully presented perfume bottle, already customised with 3D-printed names or details, making it a ready-to-take luxury keepsake.",
  },
  {
    q: "Do you provide themed or branded setups?",
    a: "Absolutely. Our perfume bar can be styled to match your event theme, from elegant florals to modern minimalism, creating a visual centrepiece that enhances your celebration.",
  },
  {
    q: "Is the perfume bar suitable for children or family-friendly events?",
    a: "Yes, we offer age-appropriate fragrance options so all guests can enjoy the sensory experience.",
  },
];

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-(--muted-sand) last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4 group"
      >
        <span className="font-heading text-base md:text-lg text-text-primary group-hover:text-(--button-gold) transition-colors duration-300">
          {q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-(--muted-sand) flex items-center justify-center text-(--button-gold) transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="text-text-secondary pb-5 text-base leading-relaxed">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function PerfumeBarPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-background py-32 md:py-44 overflow-hidden">
        {/* subtle decorative ring */}
        <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full border border-(--muted-sand) opacity-30 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-87.5 h-87.5 rounded-full border border-(--muted-sand) opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="font-heading text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}
          >
            Maison de Parfum · Perfume Bar
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-text-primary mb-6"
          >
            More than a wedding favour —<br className="hidden md:block" />
            <span style={{ color: "#B28E3B" }}>
              {" "}
              it&apos;s an experience
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#7C6D5A" }}
          >
            Your scent, your story. A personalised luxury perfume bar for
            unforgettable events.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link
              href="#enquire"
              className="inline-flex items-center gap-2 bg-(--button-gold) text-(--bridal-white) px-8 py-4 rounded text-sm font-sans font-bold uppercase tracking-widest hover:bg-(--button-gold-hover) transition-colors duration-300"
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, color: "#FAF8F5" }}
            >
              Enquire About Your Perfume Bar
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 1: Bespoke Guest Experience ─────────────── */}
      <section className="py-24 bg-(--bridal-white)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <p
                className="font-heading text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}
              >
                01 · Bespoke Experience
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-6 leading-snug">
                Memories deserve a<br /> signature scent.
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-montserrat)", color: "#7C6D5A" }}
              >
                Transform your celebration into an immersive, sensory journey.
                Guests explore a curated collection of premium fragrances while
                enjoying an interactive and elegant experience. Each moment at
                the bar is guided and refined, creating a luxury touch your
                guests will remember.
              </p>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:gap-4 transition-all duration-300"
                style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}
              >
                Discover How It Works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="h-80 md:h-96 bg-(--soft-cream) rounded-lg border border-(--muted-sand) flex items-center justify-center overflow-hidden"
            >
              <img
                src="/0D0A4312-2.jpg"
                alt="Bespoke experience event"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive Entertainment ────────────── */}
      <section id="how-it-works" className="py-24 bg-(--soft-cream)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="h-80 md:h-96 bg-(--bridal-white) rounded-lg border border-(--muted-sand) flex items-center justify-center order-last md:order-first overflow-hidden"
            >
              <img
                src="/0D0A4844-2.jpg"
                alt="Interactive perfume bar entertainment"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <p
                className="font-heading text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}
              >
                02 · Interactive Entertainment
              </p>
              <h2
                className="font-heading text-3xl md:text-4xl font-semibold mb-6 leading-snug"
                style={{ color: "#3C2218" }}
              >
                A keepsake they
                <br /> can wear.
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "var(--font-montserrat)", color: "#7C6D5A" }}
              >
                Our perfume bar is more than choosing a fragrance — it&apos;s an
                activity. Guests engage with scents, learn about notes, and
                enjoy a visually stunning setup that complements your event
                theme. Interactive, elegant, and completely memorable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Luxury Personalisation ───────────────── */}
      <section className="py-24 bg-(--bridal-white)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <p
                className="font-heading text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}
              >
                03 · Luxury Personalisation
              </p>
              <h2
                className="font-heading text-3xl md:text-4xl font-semibold mb-6 leading-snug"
                style={{ color: "#3C2218" }}
              >
                Exquisitely crafted,
                <br /> just for your day.
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-montserrat)", color: "#7C6D5A" }}
              >
                Every guest receives a beautifully presented perfume bottle,
                personalised with 3D-printed names or details. From scent
                selection to presentation, every detail is tailored to your
                wedding or event, ensuring each keepsake reflects the luxury and
                style of your celebration.
              </p>
              <Link
                href="#enquire"
                className="inline-flex items-center gap-2 bg-(--button-gold) text-(--bridal-white) px-7 py-3.5 rounded text-sm uppercase tracking-widest hover:bg-(--button-gold-hover) transition-colors duration-300 font-bold"
                style={{ fontFamily: "var(--font-montserrat)", color: "#FAF8F5" }}
              >
                Book Your Perfume Bar Experience
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="h-80 md:h-96 bg-(--soft-cream) rounded-lg border border-(--muted-sand) flex items-center justify-center overflow-hidden"
            >
              <img
                src="/0D0A4272.jpg"
                alt="Luxury personalised perfume bar presentation"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 4: FAQs ─────────────────────────────────── */}
      <section className="py-24 bg-(--soft-cream)">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-(--button-gold) mb-4">
              04 · FAQs
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary">
              Everything you need to know
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="bg-(--bridal-white) rounded-lg border border-(--muted-sand) px-6 md:px-10"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────── */}
      <section
        id="enquire"
        className="py-28 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-(--muted-sand) opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-(--muted-sand) opacity-15" />
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#B28E3B" }}>
              A scent for every memory
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold text-text-primary mb-6 leading-snug" style={{ fontFamily: "var(--font-playfair)", color: "#3C2218" }}>
              Elevate your event with a perfume bar that is interactive,
              elegant, and truly personalised.
            </h2>
            <p className="text-text-secondary text-base mb-10 leading-relaxed" style={{ fontFamily: "var(--font-montserrat)", color: "#7C6D5A" }}>
              Get in touch and let us create an experience your guests will talk
              about long after the celebration ends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-(--button-gold) text-(--bridal-white) px-8 py-4 rounded text-sm font-medium uppercase tracking-widest hover:bg-(--button-gold-hover) transition-colors duration-300"
                style={{ fontFamily: "var(--font-montserrat)", fontWeight: 700, color: "#FAF8F5" }}
              >
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-(--button-gold) text-(--button-gold) px-8 py-4 rounded text-sm font-medium uppercase tracking-widest hover:bg-(--button-gold) hover:text-(--bridal-white) transition-colors duration-300"
                style={{ borderColor: "#B28E3B", color: "#B28E3B", fontFamily: "var(--font-montserrat)" }}
              >
                See Our Fragrances
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
