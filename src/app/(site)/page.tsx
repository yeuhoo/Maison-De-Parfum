import { Leaf, Sparkles, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-(--bridal-white) text-(--text-primary) py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Discover Your Signature Scent
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-montserrat)", color: "var(--text-primary)" }}>
              Explore our curated collection of luxury perfumes, crafted with
              the finest ingredients for an unforgettable experience.
            </p>
            <a
              href="/shop"
              className="inline-block bg-(--button-gold) text-(--bridal-white) px-8 py-3 rounded font-medium hover:bg-(--button-gold-hover) transition-colors uppercase text-sm"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-(--soft-cream)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">
            Featured Fragrances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder products */}
            <div className="card-hover bg-(--bridal-white) rounded-lg shadow-sm overflow-hidden border border-(--muted-sand)">
              <div className="h-64 bg-(--soft-cream) flex items-center justify-center">
                <span className="text-(--warm-taupe)">Perfume Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-heading">
                  Elegant Rose
                </h3>
                <p className="text-(--text-secondary) mb-4">
                  A floral masterpiece with notes of rose and jasmine.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-(--text-primary)">
                    $89.99
                  </span>
                  <button className="bg-(--button-gold) text-(--bridal-white) px-4 py-2 rounded hover:bg-(--button-gold-hover) transition-colors uppercase text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="card-hover bg-(--bridal-white) rounded-lg shadow-sm overflow-hidden border border-(--muted-sand)">
              <div className="h-64 bg-(--soft-cream) flex items-center justify-center">
                <span className="text-(--warm-taupe)">Perfume Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-heading">
                  Midnight Amber
                </h3>
                <p className="text-(--text-secondary) mb-4">
                  Warm and mysterious with amber and vanilla notes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-(--text-primary)">
                    $79.99
                  </span>
                  <button className="bg-(--button-gold) text-(--bridal-white) px-4 py-2 rounded hover:bg-(--button-gold-hover) transition-colors uppercase text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="card-hover bg-(--bridal-white) rounded-lg shadow-sm overflow-hidden border border-(--muted-sand)">
              <div className="h-64 bg-(--soft-cream) flex items-center justify-center">
                <span className="text-(--warm-taupe)">Perfume Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-heading">
                  Citrus Breeze
                </h3>
                <p className="text-(--text-secondary) mb-4">
                  Fresh and invigorating with citrus and marine notes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-(--text-primary)">
                    $69.99
                  </span>
                  <button className="bg-(--button-gold) text-(--bridal-white) px-4 py-2 rounded hover:bg-(--button-gold-hover) transition-colors uppercase text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-(--bridal-white)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-16 font-heading">
              Why Choose Maison de Parfum?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Leaf className="mx-auto mb-5 h-12 w-12 text-(--button-gold)" />
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Premium Ingredients
                </h3>
                <p className="mb-4" style={{ fontFamily: "var(--font-montserrat)", color: "var(--text-primary)" }}>
                  We source only the finest essential oils and fragrances from
                  around the world.
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="mx-auto mb-5 h-12 w-12 text-(--button-gold)" />
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Artisan Crafted
                </h3>
                <p className="mb-4" style={{ fontFamily: "var(--font-montserrat)", color: "var(--text-primary)" }}>
                  Each perfume is carefully crafted by master perfumers with
                  years of experience.
                </p>
              </div>
              <div className="text-center">
                <Package className="mx-auto mb-5 h-12 w-12 text-(--button-gold)" />
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Sustainable Packaging
                </h3>
                <p className="mb-4" style={{ fontFamily: "var(--font-montserrat)", color: "var(--text-primary)" }}>
                  Our eco-friendly packaging ensures your perfume arrives
                  beautifully and responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
