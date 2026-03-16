import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

// ── Static params for SSG ─────────────────────────────────────────────────────
export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

// ── Per-product SEO metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
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
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
