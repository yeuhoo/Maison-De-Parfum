"use client";

import Link from "next/link";
import Image from "next/image";
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

const values = [
  {
    title: "Uncompromising Quality",
    body: "Every fragrance is formulated at Extrait de Parfum concentration — the highest standard in fine perfumery — ensuring exceptional longevity and depth.",
  },
  {
    title: "Modern Luxury",
    body: "We believe luxury should be accessible. Our pricing reflects the quality of our ingredients, not the weight of a heritage name.",
  },
  {
    title: "Thoughtful Craft",
    body: "Each scent is developed through a rigorous creative process — from initial brief to final formulation — with strict IFRA and AICIS compliance throughout.",
  },
  {
    title: "Experiential Storytelling",
    body: "Fragrance is memory. We design each scent to evoke a moment, a mood, a feeling — not just to smell beautiful, but to mean something.",
  },
];

export default function AboutPage() {
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
            className="font-heading text-[11px] tracking-[0.3em] uppercase text-[#B28E3B] mb-6"
          >
            Maison de Parfum · Our Story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#3C2218] mb-6"
          >
            Crafted with intention,
            <br className="hidden md:block" />
            <span className="text-[#B28E3B]"> worn with meaning.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-sans text-[#7C6D5A] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We are an Australian luxury fragrance house dedicated to creating
            performance-driven Extrait de Parfum — and unforgettable scent
            experiences.
          </motion.p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────── */}
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
              <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-[#B28E3B] mb-4">
                01 · The Beginning
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#3C2218] mb-6 leading-snug">
                Born from a love of
                <br /> fine fragrance.
              </h2>
              <p className="font-sans text-[#7C6D5A] text-base leading-relaxed mb-4">
                [Placeholder — Founder story goes here. Describe how Maison de
                Parfum began, what inspired the brand, and the journey from
                concept to creation.]
              </p>
              <p className="font-sans text-[#7C6D5A] text-base leading-relaxed">
                [Placeholder — Continue with the brand's early milestones, first
                collections, and the moment the vision became clear.]
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="h-80 md:h-120 bg-(--soft-cream) rounded border border-(--muted-sand) flex items-center justify-center overflow-hidden"
            >
              <Image
                src="/7.png"
                alt="The Beginning"
                width={600}
                height={480}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="py-24 bg-(--soft-cream)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="h-80 md:h-100 bg-(--bridal-white) rounded border border-(--muted-sand) flex items-center justify-center order-last md:order-first overflow-hidden"
            >
              <Image
                src="/4.png"
                alt="Our Mission"
                width={600}
                height={500}
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
              <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-[#B28E3B] mb-4">
                02 · Our Mission
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#3C2218] mb-6 leading-snug">
                Luxury performance,
                <br /> without the markup.
              </h2>
              <p className="font-sans text-[#7C6D5A] text-base leading-relaxed mb-4">
                Our mission is to create meaningful fragrance experiences
                through elevated Extrait de Parfum formulations — and
                unforgettable wedding scent experiences through our Perfume Bar
                service.
              </p>
              <p className="font-sans text-[#7C6D5A] text-base leading-relaxed">
                We believe great fragrance should be accessible without
                compromise. Every bottle we craft meets the same standard as the
                world&apos;s finest perfume houses — at a price that respects
                your intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="py-24 bg-(--bridal-white)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-[#B28E3B] mb-4">
              03 · What We Stand For
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#3C2218]">
              Our values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="border-t border-(--muted-sand) pt-8"
              >
                <h3 className="font-heading text-xl font-semibold text-[#3C2218] mb-3">
                  {v.title}
                </h3>
                <p className="font-sans text-[#7C6D5A] text-base leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="py-24 bg-(--soft-cream)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase text-[#B28E3B] mb-4">
              04 · The People
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#3C2218]">
              The faces behind the fragrance
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
            {[
              { role: "Founder & Creative Director", image: "/6.png" },
              { role: "Head Perfumer", image: "/8.png" },
            ].map((member, i) => (
              <motion.div
                key={member.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group"
              >
                <div className="h-72 bg-(--bridal-white) border border-(--muted-sand) rounded mb-5 flex items-center justify-center text-text-secondary text-sm tracking-widest uppercase group-hover:border-(--button-gold) transition-colors duration-300 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.role}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-heading text-[11px] tracking-[0.2em] uppercase text-[#B28E3B] mb-1">
                  {member.role}
                </p>
                <h3 className="font-heading text-lg font-semibold text-[#3C2218] mb-1">
                  [Team Member Name]
                </h3>
                <p className="font-sans text-[#7C6D5A] text-sm leading-relaxed">
                  [Short bio placeholder — background, expertise, and what they
                  bring to Maison de Parfum.]
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-t border-(--muted-sand)">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase"
              style={{ color: "#B28E3B" }}
            >
              Explore
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#3C2218] leading-snug">
              Ready to find your
              <br /> signature scent?
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-(--button-gold) text-[#FAF8F5] px-8 py-4 text-[12px] font-sans font-bold uppercase tracking-widest hover:bg-(--button-gold-hover) transition-colors duration-300"
              >
                Shop the Collection
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 border px-8 py-4 text-[12px] font-sans tracking-widest uppercase hover:bg-(--button-gold) hover:text-(--bridal-white) transition-colors duration-300"
                style={{ borderColor: "#B28E3B", color: "#B28E3B" }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
