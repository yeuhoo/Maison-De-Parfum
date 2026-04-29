"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function CartDrawer() {
  const {
    items,
    count,
    total,
    drawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 bg-black/25"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-(--bridal-white) flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-(--muted-sand)">
              <div>
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Your Bag
                </h2>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#7C6D5A] mt-0.5">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-(--button-gold) transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 1l14 14M15 1L1 15"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-24 text-center gap-4"
                  >
                    <svg
                      className="text-(--muted-sand)"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p className="font-heading text-lg text-text-primary">
                      Your bag is empty
                    </p>
                    <p className="text-[#7C6D5A] text-sm">
                      Add a fragrance to get started.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="mt-2 text-[11px] tracking-widest uppercase text-[#7C6D5A] border border-[#7C6D5A] px-5 py-2.5 hover:bg-[#7C6D5A] hover:text-(--bridal-white) transition-colors duration-300 font-['Montserrat']"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: 30,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex gap-4 py-5 border-b border-(--muted-sand) last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 shrink-0 bg-(--soft-cream) border border-(--muted-sand) rounded overflow-hidden flex items-center justify-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            width="18"
                            height="28"
                            viewBox="0 0 36 56"
                            fill="none"
                            className="text-(--muted-sand)"
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
                            <rect
                              x="15"
                              y="5"
                              width="6"
                              height="4"
                              fill="currentColor"
                              opacity="0.5"
                            />
                            <path
                              d="M10 9h16l3 6v32a4 4 0 01-4 4H11a4 4 0 01-4-4V15l3-6z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-base font-semibold text-text-primary leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-[11px] tracking-widest uppercase text-[#7C6D5A] mt-0.5 mb-3">
                          {item.size} · Extrait de Parfum
                        </p>

                        {/* Quantity + remove */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-(--muted-sand) rounded">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-(--button-gold) transition-colors disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <svg
                                width="10"
                                height="2"
                                viewBox="0 0 10 2"
                                fill="none"
                              >
                                <path
                                  d="M1 1h8"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                            <span className="w-7 text-center text-sm text-text-primary font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-(--button-gold) transition-colors"
                              aria-label="Increase quantity"
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M5 1v8M1 5h8"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-[11px] tracking-wide text-[#7C6D5A] hover:text-red-400 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="shrink-0 text-right">
                        <span className="font-heading text-base font-semibold text-text-primary">
                          ${item.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            ${item.price} each
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer — only when cart has items */}
            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="px-6 py-6 border-t border-(--muted-sand) space-y-4"
                >
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#7C6D5A] font-sans">
                      Subtotal
                    </span>
                    <span className="font-heading text-xl font-semibold text-text-primary">
                      ${total}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7C6D5A] font-sans">
                    Shipping & taxes calculated at checkout.
                  </p>

                  {/* Proceed to checkout */}
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-(--button-gold) text-[#FAF8F5] text-[12px] tracking-widest uppercase font-bold font-sans hover:bg-(--button-gold-hover) transition-colors duration-300"
                  >
                    Proceed to Checkout
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

                  {/* Continue shopping */}
                  <button
                    onClick={closeDrawer}
                    className="w-full text-center text-[11px] tracking-widest uppercase text-[#7C6D5A] font-['Montserrat'] hover:text-(--button-gold) transition-colors duration-200 py-1"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
