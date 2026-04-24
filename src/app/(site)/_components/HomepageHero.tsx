"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

export default function HomepageHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#faf8f5]">
      {/* Soft warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,169,110,0.10),transparent)]" />
      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full border border-[#c9a96e]/12 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full border border-[#c9a96e]/8 pointer-events-none" />
      {/* Gold corner accents */}
      <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-[#c9a96e]/30 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-[#c9a96e]/30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] mb-8"
        >
          Maison de Parfum · Extrait de Parfum
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.08] text-text-primary mb-6"
        >
          Discover Your
          <br />
          <em className="text-[#c9a96e] font-light italic">Signature Scent</em>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-12 tracking-wide"
        >
          Luxury extrait formulations, crafted from the world&apos;s finest raw
          ingredients — worn with confidence.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex items-center justify-center gap-5"
        >
          <Link
            href="/shop"
            className="inline-block bg-[#c9a96e] text-white px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-[#b8935a] transition-colors duration-300"
          >
            Shop the Collection
          </Link>
          <Link
            href="/perfume-bar"
            className="inline-block border border-[#c9a96e] text-[#c9a96e] px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#c9a96e] hover:text-white transition-colors duration-300"
          >
            Perfume Bar
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-linear-to-b from-[#c9a96e]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
