"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

const BottleIcon = ({ size = 56 }: { size?: number }) => (
  <svg
    width={size * 0.64}
    height={size}
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

const CATEGORY_DETAILS: Record<string, { accent: string; mood: string }> = {
  Floral: { accent: "Rose · Delicate · Feminine", mood: "Light & Romantic" },
  Woody: { accent: "Earthy · Warm · Grounded", mood: "Deep & Sensual" },
  Oriental: { accent: "Spiced · Rich · Luxurious", mood: "Bold & Opulent" },
  Fresh: { accent: "Clean · Crisp · Airy", mood: "Light & Invigorating" },
};

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<"50ml" | "30ml">("50ml");
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const { addToCart } = useCart();

  // Combine main image with additional images
  const allImages = product.imageUrl
    ? [product.imageUrl, ...(product.imageUrls || [])]
    : product.imageUrls || [];
  const displayImage = hoveredImage ?? selectedImage;

  const detail = CATEGORY_DETAILS[product.category];

  const handleAddToBag = () => {
    const selectedPrice =
      selectedSize === "50ml" ? product.price50ml : product.price30ml;
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: selectedPrice,
        size: selectedSize,
        imageUrl: product.imageUrl,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 pb-0">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-text-secondary">
          <Link
            href="/"
            className="hover:text-(--button-gold) transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href="/shop"
            className="hover:text-(--button-gold) transition-colors"
          >
            Shop
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-text-primary">{product.name}</span>
        </nav>
      </div>

      {/* ── Main product section ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="relative"
          >
            <div className="relative aspect-square bg-(--bridal-white) border border-(--muted-sand) flex flex-col items-center justify-center gap-6 overflow-hidden">
              {product.bestseller && (
                <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] uppercase text-(--button-gold) bg-background border border-(--muted-sand) px-3 py-1.5 z-10">
                  Bestseller
                </span>
              )}
              {allImages.length > 0 ? (
                <>
                  {/* Main image with crossfade transitions */}
                  {allImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        idx === displayImage ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}

                  {allImages.length > 1 && (
                    <span className="absolute top-5 right-5 text-[10px] tracking-[0.14em] uppercase text-text-secondary bg-background/80 border border-(--muted-sand) px-2.5 py-1 z-10">
                      View {displayImage + 1} / {allImages.length}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="text-(--muted-sand)"
                    style={{ transform: "scale(2.4)" }}
                  >
                    <BottleIcon size={56} />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-(--warm-taupe) mt-4">
                    {product.category}
                  </span>
                </>
              )}
              {/* Decorative circles */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-(--muted-sand) opacity-20 pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full border border-(--muted-sand) opacity-15 pointer-events-none" />
            </div>

            {/* Thumbnails below main image */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-2 mt-4 md:mt-0 justify-center md:justify-start md:absolute md:top-4 md:-right-20">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onMouseEnter={() => setHoveredImage(idx)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onFocus={() => setHoveredImage(idx)}
                    onBlur={() => setHoveredImage(null)}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 border overflow-hidden transition-colors ${
                      displayImage === idx
                        ? "border-(--button-gold)"
                        : "border-(--muted-sand)"
                    }`}
                    aria-label={`View image ${idx + 1} of ${allImages.length}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Mood tag below image */}
            <div className="mt-4 flex items-center justify-between px-1">
              <p
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{ color: "#7C6D5A" }}
              >
                {detail?.accent}
              </p>
              <p
                className="text-[11px] tracking-[0.12em]"
                style={{ color: "#7C6D5A" }}
              >
                {detail?.mood}
              </p>
            </div>
          </motion.div>

          {/* Right — details */}
          <div className="flex flex-col gap-8 md:pt-4">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="space-y-5"
            >
              {/* Category + notes */}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-(--button-gold) mb-3">
                  {product.category}
                </p>
                <h1
                  className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
                  style={{ color: "#3C2218" }}
                >
                  {product.name}
                </h1>
              </div>

              {/* Divider */}
              <div className="w-10 h-px bg-(--muted-sand)" />

              {/* Description */}
              <p
                className="leading-relaxed text-base md:text-lg"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "#7C6D5A",
                }}
              >
                {product.description}
              </p>

              {/* Scent profile */}
              <div>
                <p
                  className="text-[10px] tracking-[0.22em] uppercase mb-3"
                  style={{ color: "#7C6D5A" }}
                >
                  Scent Profile
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.split(" · ").map((note) => (
                    <span
                      key={note}
                      className="text-[11px] tracking-[0.12em] uppercase border border-(--muted-sand) px-3 py-1.5"
                      style={{ color: "#7C6D5A" }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Purchase block */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="border-t border-(--muted-sand) pt-8 space-y-6"
            >
              {/* Size selector */}
              <div className="space-y-2">
                <p
                  className="text-[12px] tracking-[0.18em] uppercase font-bold"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#3C2218",
                  }}
                >
                  Size
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSize("50ml")}
                    className={`px-5 py-3 border text-[12px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                      selectedSize === "50ml"
                        ? "border-(--button-gold) text-text-primary bg-(--soft-cream)"
                        : "border-(--muted-sand) text-text-secondary hover:border-(--button-gold)"
                    }`}
                  >
                    50ml &middot; ${product.price50ml}
                  </button>
                  {product.price30ml > 0 && (
                    <button
                      onClick={() => setSelectedSize("30ml")}
                      className={`px-5 py-3 border text-[12px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                        selectedSize === "30ml"
                          ? "border-(--button-gold) text-text-primary bg-(--soft-cream)"
                          : "border-(--muted-sand) text-text-secondary hover:border-(--button-gold)"
                      }`}
                    >
                      30ml &middot; ${product.price30ml}
                    </button>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-semibold text-text-primary">
                  $
                  {selectedSize === "50ml"
                    ? product.price50ml
                    : product.price30ml}
                </span>
                <span className="text-sm" style={{ color: "#7C6D5A" }}>
                  / {selectedSize}
                </span>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-5">
                <p
                  className="text-[12px] tracking-[0.18em] uppercase font-bold"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#3C2218",
                  }}
                >
                  Qty
                </p>
                <div className="flex items-center border border-(--muted-sand)">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors text-xl leading-none"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-[14px] text-text-primary font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors text-xl leading-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToBag}
                className="w-full text-[12px] tracking-widest uppercase py-4 font-bold transition-colors duration-300 bg-(--button-gold) hover:bg-(--button-gold-hover)"
                style={{
                  color: "#FAF8F5",
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <p className="text-[11px] text-text-secondary text-center">
                Free shipping on orders over $150
              </p>
            </motion.div>

            {/* Product details */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="border-t border-(--muted-sand) pt-6 space-y-3 text-[12.5px]"
            >
              {[
                ["Category", product.category],
                ["Concentration", "Eau de Parfum"],
                [
                  "Available in",
                  product.price30ml > 0 ? "50ml · 30ml" : "50ml",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between text-text-secondary"
                >
                  <span className="tracking-[0.12em] uppercase text-[10px]">
                    {label}
                  </span>
                  <span className="text-text-primary">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Ingredients */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="border-t border-(--muted-sand) pt-6 space-y-2"
            >
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-2"
                style={{ color: "#B28E3B" }}
              >
                Ingredients
              </p>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {product.ingredients}
              </p>
            </motion.div>

            {/* Warning */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="border-t border-(--muted-sand) pt-6 space-y-2"
            >
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-2"
                style={{ color: "#B28E3B" }}
              >
                Warning
              </p>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {product.warning}
              </p>
            </motion.div>

            {/* Manufactured For */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="border-t border-(--muted-sand) pt-6 space-y-2"
            >
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-2"
                style={{ color: "#B28E3B" }}
              >
                Manufactured For
              </p>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {product.manufacturedFor}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="border-t border-(--muted-sand) py-16 md:py-24 bg-(--bridal-white)">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-(--button-gold) mb-2">
                Same Collection
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary">
                You May Also Like
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Link href={`/shop/${rel.id}`} className="group block">
                    <div className="relative h-52 bg-background border border-(--muted-sand) flex items-center justify-center mb-4 overflow-hidden">
                      {rel.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={rel.imageUrl}
                          alt={rel.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-(--muted-sand) transition-transform duration-500 group-hover:scale-110">
                          <BottleIcon size={44} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-(--warm-taupe) mb-1">
                      {rel.notes}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-(--button-gold) transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">
                      ${rel.price50ml} · 50ml
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back to shop ── */}
      <div className="py-12 border-t border-(--muted-sand) text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase text-text-secondary hover:text-(--button-gold) transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M13 7H1M6 2L1 7l5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
