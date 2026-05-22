import FeaturedProducts from "./_components/FeaturedProducts";
import BrandStoryStrip from "./_components/BrandStoryStrip";
import ScentFamilies from "./_components/ScentFamilies";
import PerfumeBarSpotlight from "./_components/PerfumeBarSpotlight";
import type { Product } from "@/lib/products";
import { sql } from "@/lib/db";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Maison de Parfum — Luxury Extrait de Parfum, Brisbane Australia",
  description:
    "Discover handcrafted Extrait de Parfum by Maison de Parfum. Luxury fragrances compounded in Australia, crafted from the world's finest raw ingredients.",
  openGraph: {
    title: "Maison de Parfum — Luxury Extrait de Parfum",
    description:
      "Discover handcrafted Extrait de Parfum by Maison de Parfum. Luxury fragrances compounded in Australia.",
    type: "website",
  },
};

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
          playsInline
          preload="metadata"
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
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl"
              style={{ fontFamily: "var(--font-montserrat)", color: "#FAF8F5", textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)" }}
            >
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

      <FeaturedProducts products={featuredProducts} />
      <BrandStoryStrip />
      <ScentFamilies />
      <PerfumeBarSpotlight />
    </div>
  );
}
