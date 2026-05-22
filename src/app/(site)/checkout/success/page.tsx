"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") ?? "";
  const email = params.get("email") ?? "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <p className="text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">
          Order Confirmed
        </p>
        <h1 className="font-heading text-3xl font-semibold text-text-primary mb-4">
          Thank You
        </h1>
        <p className="text-[#666] text-sm leading-relaxed mb-6">
          Your order has been placed successfully. We will be in touch shortly
          to process your payment and confirm dispatch.
        </p>

        {orderId && (
          <div className="border border-[#e5e5e5] bg-[#fafafa] rounded px-5 py-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#aaa]">Order Number</span>
              <span className="font-mono font-medium text-text-primary">
                {orderId}
              </span>
            </div>
            {email && (
              <div className="flex justify-between text-sm">
                <span className="text-[#aaa]">Confirmation sent to</span>
                <span className="text-text-primary">{email}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[#aaa]">Status</span>
              <span className="text-amber-600 font-medium">Pending</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 border border-[#c9a96e] text-[#c9a96e] text-[11px] tracking-widest uppercase hover:bg-[#c9a96e] hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
