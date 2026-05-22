"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const SCENT_FAMILIES = [
  {
    name: "Floral",
    descriptor: "Rose · Jasmine · Peony",
    gradient: "from-[#f9e8ee] to-[#f3d5e0] bg-linear-to-b",
    accent: "#c97a8a",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.7" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <ellipse
            key={i}
            cx="20"
            cy="9"
            rx="4"
            ry="7"
            fill="currentColor"
            opacity="0.35"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
      </svg>
    ),
  },
  {
    name: "Woody",
    descriptor: "Sandalwood · Cedar · Vetiver",
    gradient: "from-[#ede2d4] to-[#dfd0bc] bg-linear-to-b",
    accent: "#8b6b4a",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path
          d="M20 4 L24 16 L36 16 L26 24 L30 36 L20 28 L10 36 L14 24 L4 16 L16 16 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "Oriental",
    descriptor: "Oud · Amber · Vanilla",
    gradient: "from-[#f5e8d0] to-[#ead8b8] bg-linear-to-b",
    accent: "#b8762a",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <polygon
          points="20,4 25,16 38,16 27,24 31,37 20,29 9,37 13,24 2,16 15,16"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    name: "Fresh",
    descriptor: "Citrus · Aquatic · Green Tea",
    gradient: "from-[#d8edf0] to-[#c4dfe4] bg-linear-to-b",
    accent: "#3a8a9c",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.4"
        />
        <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.3" />
        <path
          d="M20 6 C14 12 14 28 20 34 C26 28 26 12 20 6Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

export default function ScentFamilies() {
  return (
    <section className="py-20 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
            Explore by Family
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary">
            Find Your Olfactive World
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SCENT_FAMILIES.map((family, i) => (
            <motion.div
              key={family.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={`/shop?category=${family.name}`}
                className={`group relative flex flex-col items-center justify-center gap-4 py-10 px-6 ${family.gradient} border border-transparent hover:border-[#c9a96e]/30 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(60,34,24,0.08)] transition-all duration-300`}
              >
                <span
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: family.accent }}
                >
                  {family.icon}
                </span>
                <div className="text-center">
                  <p className="font-heading text-lg font-semibold text-text-primary">
                    {family.name}
                  </p>
                  <p className="text-[10px] tracking-wide text-text-secondary mt-1">
                    {family.descriptor}
                  </p>
                </div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Browse →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
