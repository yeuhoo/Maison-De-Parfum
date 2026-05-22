import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us — Maison de Parfum",
  description:
    "Learn about Maison de Parfum — an Australian luxury fragrance house crafting performance-driven Extrait de Parfum from the world's finest raw ingredients.",
  openGraph: {
    title: "About Maison de Parfum",
    description:
      "An Australian luxury fragrance house dedicated to Extrait de Parfum and unforgettable scent experiences.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
