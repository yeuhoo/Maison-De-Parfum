import { Leaf, Sparkles, Package } from "lucide-react";
import FeaturedProducts from "./_components/FeaturedProducts";
import type { Product } from "@/lib/products";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT id, name, category, notes,
           price_50ml AS "price50ml", price_30ml AS "price30ml",
           bestseller, description, ingredients, warning,
           manufactured_for AS "manufacturedFor",
           image_url AS "imageUrl",
           image_urls AS "imageUrls"
    FROM products
    WHERE bestseller = true
    ORDER BY id DESC
    LIMIT 6
  `;

  return rows as Product[];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-(--text-primary) py-24 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          style={{ zIndex: 0 }}
        >
          <source src="/hero_vid.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 px-4 sm:px-6 lg:px-24 py-24">
          <div className="text-left">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight"
              style={{ color: "#FAF8F5", textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)" }}
            >
              Discover Your Signature Scent
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl" style={{ fontFamily: "var(--font-montserrat)", color: "#FAF8F5", textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)" }}>
              Explore our curated collection of luxury perfumes, crafted with
              the finest ingredients for an unforgettable experience.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 rounded font-bold transition-colors uppercase text-sm border border-(--bridal-white)"
              style={{ fontFamily: "var(--font-montserrat)", color: "#FAF8F5", backgroundColor: "transparent", textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)" }}
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />

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
