"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size,
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQuantity = useCallback(
    (id: number, size: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          i.id === id && i.size === size ? { ...i, quantity } : i,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        drawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
