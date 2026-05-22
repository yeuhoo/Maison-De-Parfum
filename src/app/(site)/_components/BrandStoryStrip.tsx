"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function BrandStoryStrip() {
  return (
    <section className="py-20 px-6 text-center overflow-hidden border-y border-[#e0d0bc] relative" style={{ background: "linear-gradient(to bottom, #ede4d4, #e8dbc8, #ede4d4)" }}>
      {/* Centered radial gold glow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,169,110,0.14) 0%, transparent 70%)" }} />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-12 h-px bg-[#c9a96e] mx-auto mb-8 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="font-heading text-2xl md:text-4xl lg:text-5xl font-light italic text-text-primary leading-[1.3] tracking-wide"
        >
          &ldquo;Extrait de Parfum.
          <br />
          Crafted for presence.&rdquo;
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="w-12 h-px bg-[#c9a96e] mx-auto mt-8 mb-6 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="text-[11px] tracking-[0.35em] uppercase text-[#8B6914]"
        >
          All Extrait concentration · Compounded in Australia
        </motion.p>
      </div>
    </section>
  );
}
