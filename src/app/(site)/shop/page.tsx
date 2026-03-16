"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

type Category = "All" | "Floral" | "Woody" | "Oriental" | "Fresh";

const products: {
  id: number;
  name: string;
  category: Category;
  notes: string;
  price: number;
  size: string;
  bestseller: boolean;
  description: string;
}[] = [
  {
    id: 1,
    name: "Elegant Rose",
    category: "Floral",
    notes: "Rose · Jasmine · White Musk",
    price: 89,
    size: "50ml",
    bestseller: true,
    description:
      "A feminine masterpiece anchored in velvety rose petals and a luminous jasmine heart.",
  },
  {
    id: 2,
    name: "Blush Peony",
    category: "Floral",
    notes: "Peony · White Tea · Sandalwood",
    price: 95,
    size: "50ml",
    bestseller: false,
    description:
      "Delicate and airy — the scent of a sun-lit garden in full, unhurried bloom.",
  },
  {
    id: 3,
    name: "White Gardenia",
    category: "Floral",
    notes: "Gardenia · Ylang Ylang · Amber",
    price: 110,
    size: "50ml",
    bestseller: false,
    description:
      "Rich and intoxicating with lush white florals and a warm, resinous finish.",
  },
  {
    id: 4,
    name: "Cedar & Oud",
    category: "Woody",
    notes: "Oud · Cedarwood · Vetiver",
    price: 125,
    size: "50ml",
    bestseller: true,
    description:
      "A commanding presence — smoky oud enveloped in warm cedarwood and earthy vetiver.",
  },
  {
    id: 5,
    name: "Sandalwood Dreams",
    category: "Woody",
    notes: "Sandalwood · Vanilla · Tonka Bean",
    price: 99,
    size: "50ml",
    bestseller: false,
    description:
      "Creamy, warm, and deeply sensual — a scent that lingers like a whispered memory.",
  },
  {
    id: 6,
    name: "Amber Forest",
    category: "Woody",
    notes: "Amber · Patchouli · Oakmoss",
    price: 115,
    size: "50ml",
    bestseller: false,
    description:
      "Deep and earthy, reminiscent of ancient forest floors at the edge of dusk.",
  },
  {
    id: 7,
    name: "Midnight Amber",
    category: "Oriental",
    notes: "Amber · Vanilla · Dark Musk",
    price: 79,
    size: "50ml",
    bestseller: false,
    description:
      "Warm and mysterious — amber and rich vanilla unfold slowly on the skin.",
  },
  {
    id: 8,
    name: "Saffron Noir",
    category: "Oriental",
    notes: "Saffron · Rose · Leather",
    price: 135,
    size: "50ml",
    bestseller: true,
    description:
      "A bold, opulent signature inspired by the gilded spice markets of the East.",
  },
  {
    id: 9,
    name: "Spiced Vanilla",
    category: "Oriental",
    notes: "Vanilla · Cardamom · Benzoin",
    price: 85,
    size: "50ml",
    bestseller: false,
    description:
      "Sweet and spiced — a comforting oriental with depth for every season.",
  },
  {
    id: 10,
    name: "Citrus Breeze",
    category: "Fresh",
    notes: "Bergamot · Lemon · Marine",
    price: 69,
    size: "50ml",
    bestseller: false,
    description:
      "Fresh and invigorating — bright citrus lifted by a cool marine breeze.",
  },
  {
    id: 11,
    name: "Sea Salt Mist",
    category: "Fresh",
    notes: "Sea Salt · Driftwood · Iris",
    price: 75,
    size: "50ml",
    bestseller: false,
    description:
      "Clean, crisp, and effortlessly coastal — inspired by open water at sunrise.",
  },
  {
    id: 12,
    name: "Green Tea Garden",
    category: "Fresh",
    notes: "Green Tea · Jasmine · Cedarwood",
    price: 72,
    size: "50ml",
    bestseller: false,
    description:
      "Light and serene — a breath of fresh botanical air with a lingering woody base.",
  },
];

const CATEGORIES: Category[] = ["All", "Floral", "Woody", "Oriental", "Fresh"];

const BottleIcon = () => (
  <svg
    width="36"
    height="56"
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

type Product = (typeof products)[number];

export default function ShopPage() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const openQuickView = (p: Product) => {
    setQuickView(p);
    setQty(1);
    document.body.style.overflow = "hidden";
  };
  const closeQuickView = () => {
    setQuickView(null);
    document.body.style.overflow = "";
  };

  const filtered = products.filter((p) => {
    const matchesCategory = active === "All" || p.category === active;
    const q = query.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.notes.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-background py-24 md:py-36 overflow-hidden">
        <div className="absolute -top-28 -right-28 w-md h-md rounded-full border border-(--muted-sand) opacity-25 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-(--muted-sand) opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[11px] tracking-[0.3em] uppercase text-(--button-gold) mb-6"
          >
            Maison de Parfum · Collection
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-text-primary mb-6"
          >
            The Art of Fragrance
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            Discover our curated collection of luxury fragrances, hand-crafted
            from the world&apos;s finest raw ingredients.
          </motion.p>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div className="bg-background sticky top-20 z-30 border-b border-(--muted-sand)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Category tabs */}
            <div className="flex items-center overflow-x-auto shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative px-5 py-5 text-[11px] tracking-[0.2em] uppercase font-medium whitespace-nowrap transition-colors duration-200 ${
                    active === cat
                      ? "text-(--button-gold)"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat}
                  {active === cat && (
                    <motion.div
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-(--button-gold)"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="ml-auto relative flex items-center py-3">
              <svg
                className="absolute left-3 w-3.5 h-3.5 text-text-secondary pointer-events-none"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M10.5 10.5l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances…"
                className="pl-8 pr-4 py-2 w-44 md:w-56 bg-(--soft-cream) border border-(--muted-sand) rounded text-[12px] text-text-primary placeholder:text-(--warm-taupe) focus:outline-none focus:border-(--button-gold) focus:w-64 transition-all duration-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-text-secondary hover:text-(--button-gold) transition-colors"
                  aria-label="Clear search"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 1l8 8M9 1L1 9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-center justify-center py-28 text-center gap-4"
              >
                <svg
                  className="text-(--muted-sand) mb-2"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M28 28l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 18h10M18 13v10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-heading text-xl text-text-primary">
                  No fragrances found
                </p>
                <p className="text-text-secondary text-sm">
                  Try a different search term or{" "}
                  <button
                    onClick={() => {
                      setQuery("");
                      setActive("All");
                    }}
                    className="text-(--button-gold) hover:underline"
                  >
                    clear filters
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, delay: i * 0.06, ease: EASE },
                  }}
                  exit={{
                    opacity: 0,
                    y: 12,
                    transition: { duration: 0.25, ease: EASE },
                  }}
                  className="group"
                >
                  {/* Image area */}
                  <div className="relative h-72 md:h-80 bg-(--bridal-white) border border-(--muted-sand) rounded overflow-hidden mb-5">
                    {product.bestseller && (
                      <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase text-(--button-gold) bg-background border border-(--muted-sand) px-2.5 py-1 z-10">
                        Bestseller
                      </span>
                    )}
                    {/* Bottle illustration */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-(--muted-sand) transition-transform duration-700 group-hover:scale-105">
                      <BottleIcon />
                      <span className="text-[10px] tracking-[0.25em] uppercase opacity-60">
                        {product.category}
                      </span>
                    </div>
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
                    {/* Quick View */}
                    <button
                      onClick={() => openQuickView(product)}
                      className="absolute inset-x-0 bottom-0 flex justify-center pb-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20"
                    >
                      <span className="text-[10px] tracking-[0.25em] uppercase text-(--button-gold) bg-background border border-(--muted-sand) px-5 py-2">
                        Quick View
                      </span>
                    </button>
                  </div>

                  {/* Card info */}
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-(--warm-taupe) mb-1.5">
                      {product.notes}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-text-primary group-hover:text-(--button-gold) transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-heading text-lg font-semibold text-text-primary">
                          ${product.price}
                        </span>
                        <span className="text-[11px] text-text-secondary">
                          / {product.size}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            size: product.size,
                          })
                        }
                        className="text-[11px] tracking-[0.18em] uppercase text-(--bridal-white) bg-(--button-gold) px-4 py-2.5 hover:bg-(--button-gold-hover) transition-colors duration-300"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Editorial Strip ───────────────────────────────────── */}
      <section className="py-24 bg-(--bridal-white) border-t border-(--muted-sand)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {[
              {
                label: "Premium Ingredients",
                body: "We source only the finest essential oils and raw materials — from Bulgarian rose to aged Indonesian oud.",
              },
              {
                label: "Artisan Crafted",
                body: "Every fragrance is created by master perfumers blending art and science in equal, unhurried measure.",
              },
              {
                label: "Sustainable Packaging",
                body: "Our packaging is as considered as the scent it holds — beautifully designed, responsibly sourced.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i}
                className="space-y-4"
              >
                <div className="w-px h-10 bg-(--muted-sand) mx-auto" />
                <h3 className="font-heading text-xl font-semibold text-text-primary">
                  {item.label}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20 bg-background border-t border-(--muted-sand)">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-(--button-gold)">
              Bespoke Events
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary leading-snug">
              Looking for a wedding
              <br />
              or event experience?
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Bring luxury fragrance to your celebration with our personalised
              Perfume Bar service.
            </p>
            <Link
              href="/perfume-bar"
              className="inline-flex items-center gap-2.5 bg-(--button-gold) text-(--bridal-white) px-8 py-4 text-[12px] tracking-widest uppercase hover:bg-(--button-gold-hover) transition-colors duration-300"
            >
              Explore the Perfume Bar
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

      {/* ── Quick View Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {quickView && (
          <>
            {/* Backdrop */}
            <motion.div
              key="qv-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={closeQuickView}
            />

            {/* Panel */}
            <motion.div
              key="qv-panel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div
                className="bg-background w-full max-w-3xl pointer-events-auto relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={closeQuickView}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close quick view"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left — visual */}
                  <div className="relative h-72 md:h-auto min-h-75 bg-(--bridal-white) border-b md:border-b-0 md:border-r border-(--muted-sand) flex flex-col items-center justify-center gap-5">
                    {quickView.bestseller && (
                      <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase text-(--button-gold) bg-background border border-(--muted-sand) px-2.5 py-1">
                        Bestseller
                      </span>
                    )}
                    <div className="text-(--muted-sand) scale-150">
                      <BottleIcon />
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-(--warm-taupe)">
                      {quickView.category}
                    </span>
                  </div>

                  {/* Right — details */}
                  <div className="px-8 py-10 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      {/* Name + notes */}
                      <div>
                        <p className="text-[10px] tracking-[0.25em] uppercase text-(--button-gold) mb-2">
                          {quickView.notes}
                        </p>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary leading-tight">
                          {quickView.name}
                        </h2>
                      </div>

                      {/* Divider */}
                      <div className="w-8 h-px bg-(--muted-sand)" />

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {quickView.description}
                      </p>

                      {/* Scent profile pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {quickView.notes.split(" · ").map((note) => (
                          <span
                            key={note}
                            className="text-[10px] tracking-[0.12em] uppercase text-(--warm-taupe) border border-(--muted-sand) px-2.5 py-1"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price + size */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-2xl font-semibold text-text-primary">
                        ${quickView.price}
                      </span>
                      <span className="text-[12px] text-text-secondary">
                        / {quickView.size}
                      </span>
                    </div>

                    {/* Qty + Add to Bag */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-(--muted-sand)">
                          <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors text-lg leading-none"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[13px] text-text-primary font-medium">
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty((q) => q + 1)}
                            className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors text-lg leading-none"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            for (let i = 0; i < qty; i++) {
                              addToCart({
                                id: quickView.id,
                                name: quickView.name,
                                price: quickView.price,
                                size: quickView.size,
                              });
                            }
                            closeQuickView();
                          }}
                          className="flex-1 text-[11px] tracking-[0.2em] uppercase text-(--bridal-white) bg-(--button-gold) py-3 hover:bg-(--button-gold-hover) transition-colors duration-300"
                        >
                          Add to Bag
                        </button>
                      </div>
                      <p className="text-[11px] text-text-secondary text-center">
                        Free shipping on orders over $150
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
