import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-(--bridal-white) shadow-sm border-b border-(--muted-sand) sticky top-0 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-(--text-primary) font-heading"
            >
              Maison de Parfum
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-(--text-primary) hover:text-(--button-gold) uppercase text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-(--text-primary) hover:text-(--button-gold) uppercase text-sm font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-(--text-primary) hover:text-(--button-gold) uppercase text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-(--text-primary) hover:text-(--button-gold) uppercase text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="text-(--text-primary) hover:text-(--button-gold) uppercase text-sm font-medium transition-colors"
            >
              Cart (0)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
