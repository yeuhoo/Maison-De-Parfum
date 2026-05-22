import type { Metadata } from "next";
import PerfumeBarContent from "./PerfumeBarContent";

export const metadata: Metadata = {
  title: "Perfume Bar — Maison de Parfum",
  description:
    "Bring luxury fragrance to your wedding or event with the Maison de Parfum Perfume Bar. Personalised scent experiences and custom keepsakes for every guest.",
  openGraph: {
    title: "Perfume Bar — Maison de Parfum",
    description:
      "A personalised luxury perfume bar for weddings and events. Your scent, your story.",
    type: "website",
  },
};

export default function PerfumeBarPage() {
  return <PerfumeBarContent />;
}
