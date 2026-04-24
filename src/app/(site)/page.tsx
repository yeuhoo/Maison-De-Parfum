import { sql } from "@/lib/db";
import type { Product } from "@/lib/products";
import HomepageHero from "./_components/HomepageHero";
import BrandStoryStrip from "./_components/BrandStoryStrip";
import ScentFamilies from "./_components/ScentFamilies";
import FeaturedProducts from "./_components/FeaturedProducts";
import PerfumeBarSpotlight from "./_components/PerfumeBarSpotlight";

export default async function Home() {
  const rows = await sql`
    SELECT id, name, category, notes,
           price_50ml AS "price50ml", price_30ml AS "price30ml",
           bestseller, description, ingredients, warning,
           manufactured_for AS "manufacturedFor",
           image_url AS "imageUrl"
    FROM products
    ORDER BY id
  `;

  const products = rows as Product[];
  const best = products.filter((p) => p.bestseller);
  const rest = products.filter((p) => !p.bestseller);
  const featured = [...best, ...rest].slice(0, 3);

  return (
    <div className="min-h-screen">
      <HomepageHero />
      <BrandStoryStrip />
      <ScentFamilies />
      <FeaturedProducts products={featured} />
      <PerfumeBarSpotlight />
    </div>
  );
}

