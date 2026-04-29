"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// ── Square Web Payments SDK types ──────────────────────────────────────────────
interface SqCard {
  attach(selector: string): Promise<void>;
  tokenize(): Promise<{
    status: string;
    token?: string;
    errors?: Array<{ message: string }>;
  }>;
  destroy(): Promise<void>;
}
interface SqApplePay {
  attach(selector: string): Promise<void>;
  addEventListener(event: string, handler: (e: CustomEvent) => void): void;
  destroy(): Promise<void>;
}
interface SqPayments {
  card(opts?: object): Promise<SqCard>;
  applePay(req: object): Promise<SqApplePay>;
  paymentRequest(opts: object): object;
}
declare global {
  interface Window {
    Square?: {
      payments(appId: string, locationId: string): Promise<SqPayments>;
    };
  }
}

const SQ_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
const SQ_LOC_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

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

  // ── Square state ─────────────────────────────────────────────────────────────
  const [sqLoaded, setSqLoaded] = useState(false);
  const [paymentsReady, setPaymentsReady] = useState(false);
  const [cardMounted, setCardMounted] = useState(false);
  const [applePayReady, setApplePayReady] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const paymentsRef = useRef<SqPayments | null>(null);
  const cardRef = useRef<SqCard | null>(null);
  const applePayRef = useRef<SqApplePay | null>(null);

  // Always-fresh snapshot for event-handler callbacks
  const snap = useRef({
    form,
    items,
    subtotalCents: 0,
    shippingCost: 0,
    totalCents: 0,
  });

  // Convert cart total (dollars) to cents
  const subtotalCents = total * 100;
  const selectedDelivery = DELIVERY_OPTIONS.find(
    (o) => o.value === form.deliveryMethod,
  )!;
  const shippingCost =
    subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : selectedDelivery.price;
  const totalCents = subtotalCents + shippingCost;

  // Keep snapshot fresh for Square event-handler callbacks
  useEffect(() => {
    snap.current = { form, items, subtotalCents, shippingCost, totalCents };
  });

  // If Square script was already loaded by a prior navigation, trigger init immediately
  useEffect(() => {
    if (window.Square) setSqLoaded(true);
  }, []);

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateSnap = () => {
    const f = snap.current.form;
    const errs: Record<string, string> = {};
    if (!f.customerName.trim()) errs.customerName = "Required";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      errs.email = "Valid email required";
    if (!f.addressLine1.trim()) errs.addressLine1 = "Required";
    if (!f.city.trim()) errs.city = "Required";
    if (!f.state.trim()) errs.state = "Required";
    if (!f.postcode.trim()) errs.postcode = "Required";
    if (!f.country.trim()) errs.country = "Required";
    return errs;
  };

  // ── Submit order to /api/checkout after Square tokenises ─────────────────────
  const submitOrder = useCallback(
    async (sourceId: string) => {
      const {
        form: f,
        items: itms,
        subtotalCents: stc,
        shippingCost: sc,
        totalCents: tc,
      } = snap.current;
      const orderId = generateOrderId();
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceId,
            orderId,
            customerName: f.customerName,
            email: f.email,
            addressLine1: f.addressLine1,
            addressLine2: f.addressLine2,
            city: f.city,
            state: f.state,
            postcode: f.postcode,
            country: f.country,
            deliveryMethod: f.deliveryMethod,
            items: itms.map((i) => ({
              id: i.id,
              name: i.name,
              size: i.size,
              price: i.price,
              quantity: i.quantity,
            })),
            subtotal: stc,
            shippingCost: sc,
            total: tc,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Payment declined");
        }
        clearCart();
        router.push(
          `/checkout/success?order=${orderId}&email=${encodeURIComponent(f.email)}`,
        );
      } catch (err: unknown) {
        setPaymentError(
          err instanceof Error
            ? err.message
            : "Payment failed. Please try again.",
        );
        setPlacing(false);
      }
    },
    [clearCart, router],
  );

  // ── Initialise Square card form ───────────────────────────────────────────────
  useEffect(() => {
    // Script may already be available if navigated via client-side Link
    if (!sqLoaded && window.Square) setSqLoaded(true);
    if (!sqLoaded || !window.Square) return;
    let card: SqCard | null = null;
    (async () => {
      const payments = await window.Square!.payments(SQ_APP_ID, SQ_LOC_ID);
      paymentsRef.current = payments;
      setPaymentsReady(true);
      card = await payments.card({
        style: {
          ".input-container": { borderColor: "#e5e5e5", borderRadius: "0px" },
          ".input-container.is-focus": { borderColor: "#c9a96e" },
          ".input-container.is-error": { borderColor: "#ef4444" },
          ".message-text": { color: "#555" },
        },
      });
      await card.attach("#sq-card");
      cardRef.current = card;
      setCardMounted(true);
    })().catch(console.error);
    return () => {
      card?.destroy().catch(() => {});
    };
  }, [sqLoaded]);

  // ── Initialise Apple Pay (after payments ready, re-init on total change) ──────
  useEffect(() => {
    if (!paymentsReady || !paymentsRef.current) return;
    let ap: SqApplePay | null = null;
    (async () => {
      await applePayRef.current?.destroy().catch(() => {});
      setApplePayReady(false);
      const request = paymentsRef.current!.paymentRequest({
        countryCode: "AU",
        currencyCode: "AUD",
        total: {
          amount: (snap.current.totalCents / 100).toFixed(2),
          label: "Maison de Parfum",
        },
      });
      ap = await paymentsRef.current!.applePay(request);
      ap.addEventListener("ontokenization", (event: CustomEvent) => {
        const { tokenResult, error } = (
          event as CustomEvent & {
            detail: {
              tokenResult: { status: string; token?: string };
              error?: unknown;
            };
          }
        ).detail;
        if (error || tokenResult?.status !== "OK") {
          setPaymentError("Apple Pay was declined. Please try card payment.");
          setPlacing(false);
          return;
        }
        const errs = validateSnap();
        if (Object.keys(errs).length) {
          setErrors(errs);
          setPaymentError("Please complete the shipping fields above first.");
          setPlacing(false);
          return;
        }
        setPlacing(true);
        setPaymentError("");
        submitOrder(tokenResult.token!);
      });
      await ap.attach("#sq-apple-pay");
      applePayRef.current = ap;
      setApplePayReady(true);
    })().catch(() => setApplePayReady(false));
    return () => {
      ap?.destroy().catch(() => {});
    };
  }, [paymentsReady, totalCents, submitOrder]);

  // ── Pay by card ───────────────────────────────────────────────────────────────
  const handlePayWithCard = async () => {
    if (!cardRef.current || !cardMounted) return;
    const errs = validateSnap();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setPlacing(true);
    setPaymentError("");
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK") {
        setPaymentError(
          result.errors?.[0]?.message ??
            "Card error. Please check your details.",
        );
        setPlacing(false);
        return;
      }
      await submitOrder(result.token!);
    } catch {
      setPaymentError("Payment failed. Please try again.");
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
    <>
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
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#7C6D5A] mb-5">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map((f) => (
                    <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                      <label className="block text-[11px] tracking-[0.12em] uppercase text-[#7C6D5A] font-sans mb-1.5">
                        {f.label}
                      </label>
                      <input
                        type={f.type ?? "text"}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => set(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        autoComplete={f.autoComplete}
                        className={`w-full border px-4 py-3 text-sm text-text-primary bg-white outline-none transition-colors placeholder:text-[#848484] placeholder:font-sans
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
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#7C6D5A] mb-5">
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
                            <p className="text-[11px] text-[#848484] font-sans">
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

              {/* Payment */}
              <section>
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#7C6D5A] mb-5">
                  PAYMENT
                </h2>
                <div className="rounded-2xl shadow-xl border border-[#f0e8d9] bg-white/80 p-7 max-w-xl mx-auto flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Only Name, Address, City Inputs */}
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          name: "customerName",
                          label: "Full Name",
                          autoComplete: "name",
                          placeholder: "Jane Smith",
                        },
                        {
                          name: "addressLine1",
                          label: "Street Address",
                          autoComplete: "address-line1",
                          placeholder: "123 Example St",
                        },
                        {
                          name: "addressLine2",
                          label: "Apartment / Suite (optional)",
                          autoComplete: "address-line2",
                          placeholder: "Apt 4B",
                        },
                        {
                          name: "city",
                          label: "City",
                          autoComplete: "address-level2",
                          placeholder: "Brisbane",
                        },
                        {
                          name: "postcode",
                          label: "Postal Code",
                          autoComplete: "postal-code",
                          placeholder: "4000",
                        },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-[11px] tracking-[0.12em] uppercase text-[#888] mb-1.5">
                            {f.label}
                          </label>
                          <input
                            type="text"
                            value={form[f.name as keyof typeof form]}
                            onChange={(e) => set(f.name, e.target.value)}
                            placeholder={f.placeholder}
                            autoComplete={f.autoComplete}
                            className={`w-full border px-4 py-3 text-sm text-text-primary bg-white outline-none transition-colors placeholder:text-[#ccc] ${errors[f.name] ? "border-red-400 focus:border-red-400" : "border-[#e5e5e5] focus:border-[#c9a96e]"}`}
                          />
                          {errors[f.name] && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {errors[f.name]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Credit Card */}
                    <div className="flex flex-col justify-start self-start h-full">
                      <div
                        id="sq-card"
                        className={cardMounted ? "" : "hidden"}
                      />
                      {!cardMounted && (
                        <div className="border border-[#e5e5e5] h-24 flex items-center justify-center bg-[#fafafa] rounded-lg">
                          <span className="text-[12px] text-[#bbb]">
                            Loading secure payment form…
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {paymentError && (
                    <div className="mb-3">
                      <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                        {paymentError}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px] text-[#bbb] mb-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span>PCI DSS compliant</span>
                  </div>
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
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#7C6D5A] font-sans mb-5">
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
                        <div className="w-12 h-14 bg-[#f7f4ef] border border-[#ede8df] shrink-0 flex items-center justify-center relative overflow-hidden">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <svg
                              width="14"
                              height="22"
                              viewBox="0 0 36 56"
                              fill="none"
                              className="text-[#ccc]"
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
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#7C6D5A] font-sans">
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
                    <div className="flex justify-between text-[#666] font-sans">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#666] font-sans">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `$${(shippingCost / 100).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-text-primary pt-2 border-t border-[#f0f0f0] font-sans">
                      <span>Total</span>
                      <span>${(totalCents / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-5 py-5">
                    <button
                      onClick={handlePayWithCard}
                      disabled={placing || !cardMounted}
                      className="w-full py-4 bg-[#c9a96e] text-[#FAF8F5] text-[12px] tracking-widest uppercase font-bold font-sans hover:bg-[#b8935a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {placing
                        ? "Processing…"
                        : `Pay $${(totalCents / 100).toFixed(2)}`}
                    </button>
                    <p className="text-[10px] text-[#7C6D5A] font-sans text-center mt-3">
                      By placing your order you agree to our terms & conditions.
                    </p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="flex items-center gap-1.5 mt-4 text-[11px] tracking-wide text-[#7C6D5A] font-sans hover:text-[#c9a96e] transition-colors"
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
    </>
  );
}
