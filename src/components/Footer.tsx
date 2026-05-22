import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--bridal-white) text-(--text-primary) border-t border-(--muted-sand)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">
              Maison de Parfum
            </h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Luxury Extrait de Parfum, compounded in Australia from the
              world&apos;s finest raw ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/perfume-bar", label: "Perfume Bar" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-(--text-secondary)">
              <li>Brisbane, QLD 4000</li>
              <li>Australia</li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="hover:text-(--button-gold) transition-colors"
                >
                  Send an Enquiry →
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-widest">
              Newsletter
            </h4>
            <p className="text-(--text-secondary) text-sm mb-4">
              Stay updated with our latest fragrances and events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-(--muted-sand) bg-(--bridal-white) text-(--text-primary) placeholder-(--text-secondary) focus:border-(--button-gold) focus:outline-none"
              />
              <button
                className="bg-(--button-gold) text-white px-4 py-2 text-sm font-bold hover:bg-(--button-gold-hover) transition-colors"
                style={{ color: "#FAF8F5" }}
              >
                Go
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-(--muted-sand) mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-(--text-secondary) text-sm">
            © {year} Maison de Parfum. All rights reserved.
          </p>
          <p className="text-(--text-secondary) text-xs">
            Compounded in Australia · IFRA & AICIS compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
