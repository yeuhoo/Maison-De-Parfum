import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </CartProvider>
  );
}
