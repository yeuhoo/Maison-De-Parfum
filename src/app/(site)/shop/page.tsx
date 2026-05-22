import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Maison de Parfum",
  description:
    "Browse the full Maison de Parfum collection. Luxury Extrait de Parfum in Floral, Woody, Oriental, and Fresh — handcrafted in Australia.",
  openGraph: {
    title: "Shop the Collection — Maison de Parfum",
    description:
      "Luxury Extrait de Parfum handcrafted in Australia. Discover your signature scent.",
    type: "website",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
