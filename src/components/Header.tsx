"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-(--bridal-white) border-b border-(--muted-sand) shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-330 mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-heading text-xl font-semibold tracking-wide text-(--text-primary) group-hover:text-(--button-gold) transition-colors duration-300">
            Maison de Parfum
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-(--text-secondary) mt-0.5">
            Luxury Fragrances
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[13px] tracking-[0.12em] uppercase font-medium text-(--text-primary) hover:text-(--button-gold) transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-(--button-gold) after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <button
            aria-label="Search"
            className="text-(--text-primary) hover:text-(--button-gold) transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-(--text-primary) hover:text-(--button-gold) transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-(--button-gold) text-white text-[9px] flex items-center justify-center font-medium leading-none">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1 text-(--text-primary) hover:text-(--button-gold) transition-colors"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-(--bridal-white) border-b border-(--muted-sand) ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] tracking-[0.12em] uppercase font-medium text-(--text-primary) hover:text-(--button-gold) transition-colors duration-300 py-1 border-b border-(--muted-sand) last:border-0"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-[13px] tracking-[0.12em] uppercase font-medium text-(--text-primary) hover:text-(--button-gold) transition-colors duration-300 py-1"
          >
            Cart (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}
