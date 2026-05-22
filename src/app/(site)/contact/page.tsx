import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Maison de Parfum",
  description:
    "Get in touch with Maison de Parfum. Product enquiries, order support, Perfume Bar bookings, and wholesale — our team is here to help.",
  openGraph: {
    title: "Contact Maison de Parfum",
    description:
      "Reach out for product enquiries, order support, or Perfume Bar bookings.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
