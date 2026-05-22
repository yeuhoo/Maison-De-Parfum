"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const SCENT_FAMILIES = [
  {
    name: "Floral",
    descriptor: "Rose · Jasmine · Peony",
    image: "/floralnew.png",
    bg: "transparent",
    position: "object-[center_65%]",
  },
  {
    name: "Woody",
    descriptor: "Sandalwood · Cedar · Vetiver",
    image: "/woodynew.png",
    bg: "transparent",
    position: "object-center",
  },
  {
    name: "Oriental",
    descriptor: "Oud · Amber · Vanilla",
    image: "/orientalnew.png",
    bg: "transparent",
    position: "object-center",
  },
  {
    name: "Fresh",
    descriptor: "Citrus · Aquatic · Green Tea",
    image: "/Fresh.png",
    bg: "transparent",
    position: "object-center",
  },
];

export default function ScentFamilies() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #ede4d4, #faf8f5)" }}>
      {/* Radial glow — top left */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.11) 0%, transparent 70%)" }} />
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
                <div className="aspect-[4/3] md:aspect-[3/2] w-full relative" style={{ background: family.bg }}>
                  <Image
                    src={family.image}
                    alt={family.name}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${family.position}`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    priority={i < 2}
                  />
                  {/* Subtle inner border */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#c9a96e]/10" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#3c2218] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-400" />
                  {/* Label overlay */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 bg-linear-to-t from-[rgba(30,16,8,0.65)] to-transparent">
                    <p className="font-heading text-lg md:text-xl font-semibold text-[#faf8f5]">
                      {family.name}
                    </p>
                    <p className="text-[10px] tracking-wide text-[#e8ddd4] mt-0.5">
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
