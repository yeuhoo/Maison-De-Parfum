"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

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

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">
              Bestsellers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary">
              Featured Fragrances
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-block text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-[#c9a96e] transition-colors border-b border-current pb-0.5"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group bg-[#faf8f5] border border-[#ede8e0] hover:border-[#c9a96e]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(60,34,24,0.08)]"
            >
              {/* Product image area */}
              <div className="relative h-64 bg-linear-to-b from-[#f5ede0] to-[#ede4d4] flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[#c9a96e]/60 group-hover:scale-110 transition-transform duration-500">
                    <BottleIcon />
                  </span>
                )}
                {product.bestseller && (
                  <span className="absolute top-3 left-3 bg-[#c9a96e] text-white text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                    Bestseller
                  </span>
                )}
                {/* Hover reveal overlay */}
                <div className="img-overlay-slide absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#c9a96e]/20 to-transparent flex items-end justify-center pb-2.5 pointer-events-none">
                  <span className="text-[9px] tracking-[0.22em] uppercase text-text-primary font-medium">
                    View Details →
                  </span>
                </div>
              </div>
              {/* Details */}
              <div className="p-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-1">
                  {product.category}
                </p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                  {product.name}
                </h3>
                <p className="text-[11px] text-text-secondary mb-4 tracking-wide">
                  {product.notes}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-semibold text-text-primary">
                    ${product.price50ml}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/shop/${product.id}`}
                      className="text-[10px] tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price50ml,
                          size: "50ml",
                        })
                      }
                      className="bg-[#c9a96e] text-white text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:bg-[#b8935a] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-[#c9a96e] transition-colors border-b border-current pb-0.5"
          >
            View All Fragrances
          </Link>
        </div>
      </div>
    </section>
  );
}
