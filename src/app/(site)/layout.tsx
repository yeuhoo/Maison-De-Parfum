import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

const SQ_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? "";
const SQ_SCRIPT = SQ_APP_ID.startsWith("sandbox-")
  ? "https://sandbox.web.squarecdn.com/v1/square.js"
  : "https://web.squarecdn.com/v1/square.js";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {/* Preload Square SDK so it is ready before checkout renders */}
      <Script src={SQ_SCRIPT} strategy="afterInteractive" />
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </CartProvider>
  );
}
