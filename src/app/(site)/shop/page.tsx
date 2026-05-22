import { sql } from "@/lib/db";
import type { Product } from "@/lib/products";
import ShopContent from "./ShopContent";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT
      id,
      name,
      category,
      notes,
      price_50ml   AS "price50ml",
      price_30ml   AS "price30ml",
      bestseller,
      description,
      ingredients,
      warning,
      manufactured_for AS "manufacturedFor",
      image_url    AS "imageUrl",
      image_urls   AS "imageUrls"
    FROM products
    ORDER BY id
  `;
  return rows as Product[];
}

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopContent initialProducts={products} />;
}
