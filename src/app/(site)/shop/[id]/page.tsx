import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/lib/products";
import { sql } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT id, name, category, notes,
           price_50ml AS "price50ml", price_30ml AS "price30ml",
           bestseller, description, ingredients, warning,
           manufactured_for AS "manufacturedFor",
           image_url AS "imageUrl"
    FROM products
    ORDER BY id
  `;
  return rows as Product[];
}

// ── Per-product SEO metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(id));
  if (!product) return {};
  return {
    title: `${product.name} — Maison de Parfum`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Maison de Parfum`,
      description: product.description,
      type: "website",
    },
  };
}

// ── Page (server component) ───────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
