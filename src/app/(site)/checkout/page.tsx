"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  half?: boolean;
};

const FIELDS: Field[] = [
  {
    name: "customerName",
    label: "Full Name",
    placeholder: "Jane Smith",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "jane@example.com",
    autoComplete: "email",
  },
  {
    name: "addressLine1",
    label: "Street Address",
    placeholder: "123 Example St",
    autoComplete: "address-line1",
  },
  {
    name: "addressLine2",
    label: "Apartment / Suite (optional)",
    placeholder: "Apt 4B",
    autoComplete: "address-line2",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Brisbane",
    autoComplete: "address-level2",
    half: true,
  },
  {
    name: "state",
    label: "State",
    placeholder: "QLD",
    autoComplete: "address-level1",
    half: true,
  },
  {
    name: "postcode",
    label: "Postcode",
    placeholder: "4000",
    autoComplete: "postal-code",
    half: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Australia",
    autoComplete: "country-name",
    half: true,
  },
];

const DELIVERY_OPTIONS = [
  {
    value: "standard",
    label: "Standard Shipping",
    detail: "5–7 business days",
    price: 0,
  },
  {
    value: "express",
    label: "Express Shipping",
    detail: "1–3 business days",
    price: 1500,
  },
];

const FREE_SHIPPING_THRESHOLD = 15000; // $150 in cents

function generateOrderId() {
  return (
    "MDP-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
    deliveryMethod: "standard",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  // Convert cart total (dollars) to cents
  const subtotalCents = total * 100;
  const selectedDelivery = DELIVERY_OPTIONS.find(
    (o) => o.value === form.deliveryMethod,
  )!;
  const shippingCost =
    subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : selectedDelivery.price;
  const totalCents = subtotalCents + shippingCost;

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customerName.trim()) errs.customerName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.addressLine1.trim()) errs.addressLine1 = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.state.trim()) errs.state = "Required";
    if (!form.postcode.trim()) errs.postcode = "Required";
    if (!form.country.trim()) errs.country = "Required";
    return errs;
  };

  const handlePlaceOrder = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!items.length) return;

    setPlacing(true);
    try {
      const orderId = generateOrderId();
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          customerName: form.customerName,
          email: form.email,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          postcode: form.postcode,
          country: form.country,
          deliveryMethod: form.deliveryMethod,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            size: i.size,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal: subtotalCents,
          shippingCost,
          total: totalCents,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      router.push(
        `/checkout/success?order=${orderId}&email=${encodeURIComponent(form.email)}`,
      );
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
      setPlacing(false);
    }
  };

  if (!items.length && !placing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-heading text-2xl text-text-primary">
          Your bag is empty
        </p>
        <Link
          href="/shop"
          className="text-[11px] tracking-widest uppercase border border-[#c9a96e] text-[#c9a96e] px-8 py-3 hover:bg-[#c9a96e] hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#aaa] mb-2">
            Maison de Parfum
          </p>
          <h1 className="font-heading text-3xl font-semibold text-text-primary">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          {/* ── Left: Form ─────────────────────────────────────── */}
          <div className="space-y-10">
            {/* Contact & Shipping */}
            <section>
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#aaa] mb-5">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.map((f) => (
                  <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                    <label className="block text-[11px] tracking-[0.12em] uppercase text-[#888] mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type ?? "text"}
                      value={form[f.name as keyof typeof form]}
                      onChange={(e) => set(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      className={`w-full border px-4 py-3 text-sm text-text-primary bg-white outline-none transition-colors placeholder:text-[#ccc]
                        ${
                          errors[f.name]
                            ? "border-red-400 focus:border-red-400"
                            : "border-[#e5e5e5] focus:border-[#c9a96e]"
                        }`}
                    />
                    {errors[f.name] && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery Method */}
            <section>
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#aaa] mb-5">
                Delivery Method
              </h2>
              <div className="space-y-3">
                {DELIVERY_OPTIONS.map((opt) => {
                  const isFree = subtotalCents >= FREE_SHIPPING_THRESHOLD;
                  const displayPrice = isFree
                    ? "Free"
                    : opt.price === 0
                      ? "Free"
                      : `$${(opt.price / 100).toFixed(2)}`;
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-between px-4 py-4 border cursor-pointer transition-colors
                        ${
                          form.deliveryMethod === opt.value
                            ? "border-[#c9a96e] bg-[#fdf9f4]"
                            : "border-[#e5e5e5] hover:border-[#d4b88a]"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                            ${form.deliveryMethod === opt.value ? "border-[#c9a96e]" : "border-[#ccc]"}`}
                        >
                          {form.deliveryMethod === opt.value && (
                            <span className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-[#aaa]">
                            {opt.detail}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {displayPrice}
                      </span>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={opt.value}
                        checked={form.deliveryMethod === opt.value}
                        onChange={() => set("deliveryMethod", opt.value)}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>
              {subtotalCents >= FREE_SHIPPING_THRESHOLD && (
                <p className="text-[11px] text-[#c9a96e] mt-2">
                  ✓ You qualify for free standard shipping
                </p>
              )}
            </section>

            {/* Payment placeholder */}
            <section>
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#aaa] mb-5">
                Payment
              </h2>
              <div className="border border-dashed border-[#e5e5e5] rounded p-6 bg-[#fafafa] text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#f5f0e8] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c9a96e"
                    strokeWidth="1.5"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Square Payment
                </p>
                <p className="text-[11px] text-[#aaa]">
                  Secure card payment via Square will be available soon.
                  <br />
                  For now, place your order and we will contact you to process
                  payment.
                </p>
              </div>
            </section>

            {/* Submit error */}
            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}
          </div>

          {/* ── Right: Order Summary ─────────────────────────────── */}
          <div>
            <div className="sticky top-28">
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#aaa] mb-5">
                Order Summary
              </h2>
              <div className="border border-[#e5e5e5] divide-y divide-[#f0f0f0]">
                {/* Items */}
                <div className="px-5 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-14 bg-[#f7f4ef] border border-[#ede8df] shrink-0 flex items-center justify-center text-[#ccc]">
                        <svg
                          width="14"
                          height="22"
                          viewBox="0 0 36 56"
                          fill="none"
                        >
                          <rect
                            x="13"
                            y="0"
                            width="10"
                            height="6"
                            rx="1"
                            fill="currentColor"
                            opacity="0.35"
                          />
                          <rect
                            x="15"
                            y="5"
                            width="6"
                            height="4"
                            fill="currentColor"
                            opacity="0.5"
                          />
                          <path
                            d="M10 9h16l3 6v32a4 4 0 01-4 4H11a4 4 0 01-4-4V15l3-6z"
                            fill="currentColor"
                            opacity="0.18"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#aaa]">
                          {item.size} · qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-text-primary shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-5 py-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#666]">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#666]">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `$${(shippingCost / 100).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-text-primary pt-2 border-t border-[#f0f0f0]">
                    <span>Total</span>
                    <span>${(totalCents / 100).toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 py-5">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="w-full py-4 bg-[#c9a96e] text-white text-[12px] tracking-widest uppercase font-medium hover:bg-[#b8935a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {placing ? "Placing Order…" : "Place Order"}
                  </button>
                  <p className="text-[10px] text-[#aaa] text-center mt-3">
                    By placing your order you agree to our terms & conditions.
                  </p>
                </div>
              </div>

              <Link
                href="/shop"
                className="flex items-center gap-1.5 mt-4 text-[11px] tracking-wide text-[#aaa] hover:text-[#c9a96e] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M13 7H1M6 2L1 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
