import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maison de Parfum - Elegant Perfumes",
  description:
    "Discover exquisite perfumes at Maison de Parfum. Shop our collection of luxury fragrances with elegant scents for every occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
