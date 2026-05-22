"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const SCENT_FAMILIES = [
  {
    name: "Floral",
    descriptor: "Rose · Jasmine · Peony",
    bg: "bg-[#f5ece8]",
  },
  {
    name: "Woody",
    descriptor: "Sandalwood · Cedar · Vetiver",
    bg: "bg-[#ede3d6]",
  },
  {
    name: "Oriental",
    descriptor: "Oud · Amber · Vanilla",
    bg: "bg-[#f0e5d0]",
  },
  {
    name: "Fresh",
    descriptor: "Citrus · Aquatic · Green Tea",
    bg: "bg-[#deeae8]",
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

        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {SCENT_FAMILIES.map((family, i) => (
            <motion.div
              key={family.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={`/shop?category=${family.name}`}
                className="group block relative rounded-2xl overflow-hidden"
              >
                {/* Image placeholder */}
                <div className={`${family.bg} aspect-[4/3] md:aspect-[3/2] w-full relative`}>
                  {/* Subtle inner border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#c9a96e]/10" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#3c2218] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-400" />
                  {/* Corner accent */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#c9a96e]/30 rounded-tl" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#c9a96e]/30 rounded-br" />
                  {/* Label overlay */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10 bg-linear-to-t from-[rgba(60,34,24,0.18)] to-transparent">
                    <p className="font-heading text-lg md:text-xl font-semibold text-[#3c2218]">
                      {family.name}
                    </p>
                    <p className="text-[10px] tracking-wide text-[#7c6d5a] mt-0.5">
                      {family.descriptor}
                    </p>
                  </div>
                  {/* Browse arrow — appears on hover */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#c9a96e] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="#faf8f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
