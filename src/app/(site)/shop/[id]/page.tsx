import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

// Dynamic — reads from products.json on every request so CRM changes are live
export const dynamic = "force-dynamic";

function getProducts(): Product[] {
  const filePath = path.join(process.cwd(), "src/data/products.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Product[];
}

// ── Per-product SEO metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const products = getProducts();
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
  const products = getProducts();
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
