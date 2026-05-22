import FeaturedProducts from "./_components/FeaturedProducts";
import HomepageHero from "./_components/HomepageHero";
import BrandStoryStrip from "./_components/BrandStoryStrip";
import ScentFamilies from "./_components/ScentFamilies";
import PerfumeBarSpotlight from "./_components/PerfumeBarSpotlight";
import type { Product } from "@/lib/products";
import { sql } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

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
      <HomepageHero />
      <FeaturedProducts products={featuredProducts} />
      <BrandStoryStrip />
      <ScentFamilies />
      <PerfumeBarSpotlight />
    </div>
  );
}
