"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const BottleIcon = () => (
  <svg
    width="38"
    height="58"
    viewBox="0 0 36 56"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="13"
      y="0"
      width="10"
      height="6"
      rx="1"
      fill="currentColor"
      opacity="0.35"
    />
    <rect x="15" y="5" width="6" height="4" fill="currentColor" opacity="0.5" />
    <path
      d="M10 9h16l3 6v32a4 4 0 01-4 4H11a4 4 0 01-4-4V15l3-6z"
      fill="currentColor"
    />
    <rect x="7" y="19" width="22" height="1" fill="white" opacity="0.12" />
    <rect x="7" y="30" width="22" height="8" fill="white" opacity="0.06" />
  </svg>
);

export default function PerfumeBarSpotlight() {
  return (
    <section className="overflow-hidden relative" style={{ background: "linear-gradient(to bottom, #faf8f5, #e8ddd0)" }}>
      {/* Radial gold glow — right side behind text */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-full" style={{ background: "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(201,169,110,0.12) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left: editorial image */}
        <div className="relative h-64 sm:h-80 lg:min-h-[420px] overflow-hidden">
          <Image
            src="/perfume-bar.png"
            alt="Wedding Perfume Bar experience"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-16"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] mb-5">
            Signature Experience
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary leading-snug mb-5">
            Your Wedding Scent,
            <br />
            <em className="italic font-light text-[#c9a96e]">
              Personally Crafted.
            </em>
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            Our Wedding Perfume Bar is an immersive, interactive fragrance
            experience for your most important day. Guests blend, discover, and
            leave with a bespoke scent memory — a keepsake unlike any other.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mb-8">
            Available across Australia. Enquire now to check your date.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/perfume-bar"
              className="inline-block bg-[#c9a96e] text-white px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-[#b8935a] transition-colors"
            >
              Explore Perfume Bar
            </Link>
            <Link
              href="/contact"
              className="text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-[#c9a96e] transition-colors border-b border-current hover:border-[#c9a96e] pb-0.5"
            >
              Enquire
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
