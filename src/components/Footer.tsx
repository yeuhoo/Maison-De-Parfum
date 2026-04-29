export default function Footer() {
  return (
    <footer className="bg-(--bridal-white) text-(--text-primary) border-t border-(--muted-sand)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">
              Maison de Parfum
            </h3>
            <p className="text-(--text-secondary)">
              Discover the finest perfumes crafted with passion and elegance.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shipping"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-(--text-secondary) hover:text-(--button-gold) transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase">Newsletter</h4>
            <p className="text-(--text-secondary) mb-4">
              Stay updated with our latest fragrances
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-(--muted-sand) bg-(--bridal-white) text-(--text-primary) placeholder-(--text-secondary) focus:border-(--button-gold) focus:outline-none"
              />
              <button className="bg-(--button-gold) text-(--bridal-white) px-4 py-2 hover:bg-(--button-gold-hover) transition-colors font-bold" style={{ color: "#FAF8F5" }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-(--muted-sand) mt-8 pt-8 text-center">
          <p className="text-(--text-secondary)">
            © 2024 Maison de Parfum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
