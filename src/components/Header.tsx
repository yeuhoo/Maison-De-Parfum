"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/perfume-bar", label: "Perfume Bar" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 shadow-sm transition-all duration-300 ease-in-out ${scrolled ? "bg-(--bridal-white) border-b border-(--muted-sand)" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="max-w-330 mx-auto px-8 lg:px-12 h-full flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-heading text-xl md:text-2xl font-semibold tracking-wide text-text-primary group-hover:text-(--button-gold) transition-colors duration-300">
              Maison de Parfum
            </span>
            <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "#beaf9f" }}>
              Luxury Fragrances
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex absolute left-[54%] top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-14">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-[13px] tracking-[0.12em] uppercase font-medium text-text-primary hover:text-(--button-gold) transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-(--button-gold) after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-8">
            <button
              aria-label="Search"
              className="text-text-primary hover:text-(--button-gold) transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              onClick={openDrawer}
              aria-label="Open cart"
              className="relative text-text-primary hover:text-(--button-gold) transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-(--button-gold) text-white text-[9px] flex items-center justify-center font-medium leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 text-text-primary hover:text-(--button-gold) transition-colors"
          >
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu — outside header so it can overlay full width */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-(--bridal-white) border-b border-(--muted-sand) shadow-md"
          >
            <nav className="flex flex-col px-6 py-5">
              {[
                ...navLinks,
                { href: "#", label: `Bag${count > 0 ? ` (${count})` : ""}` },
              ].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: i * 0.06,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {href === "#" ? (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openDrawer();
                      }}
                      className="flex items-center w-full py-3 text-[13px] tracking-[0.12em] uppercase font-medium text-text-primary hover:text-(--button-gold) transition-colors duration-300 border-b border-(--muted-sand) last:border-0"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-3 text-[13px] tracking-[0.12em] uppercase font-medium text-text-primary hover:text-(--button-gold) transition-colors duration-300 border-b border-(--muted-sand) last:border-0"
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
