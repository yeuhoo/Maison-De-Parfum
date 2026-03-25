import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

const SQUARE_API_BASE =
  process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";

export async function POST(request: Request) {
  const {
    sourceId,
    orderId,
    customerName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    postcode,
    country,
    deliveryMethod,
    items,
    subtotal,
    shippingCost,
    total,
  } = await request.json();

  if (!sourceId || !orderId || !customerName || !email || total <= 0) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  // ── Charge via Square Payments API ──────────────────────────────────────────
  const squareRes = await fetch(`${SQUARE_API_BASE}/v2/payments`, {
    method: "POST",
    headers: {
      "Square-Version": "2025-01-23",
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_id: sourceId,
      idempotency_key: orderId,
      amount_money: {
        amount: total, // cents
        currency: "AUD",
      },
      location_id: process.env.SQUARE_LOCATION_ID,
      buyer_email_address: email,
      shipping_address: {
        address_line_1: addressLine1,
        address_line_2: addressLine2 || undefined,
        locality: city,
        administrative_district_level_1: state,
        postal_code: postcode,
        country: "AU",
      },
      note: `Maison de Parfum — Order ${orderId}`,
    }),
  });

  const squareData = await squareRes.json();

  if (!squareRes.ok || squareData.payment?.status !== "COMPLETED") {
    const msg =
      squareData.errors?.[0]?.detail ??
      squareData.errors?.[0]?.code ??
      "Payment declined";
    console.error("[CHECKOUT] Square error:", squareData.errors);
    return NextResponse.json({ error: msg }, { status: 402 });
  }

  // ── Save order to DB ─────────────────────────────────────────────────────────
  await sql`
    INSERT INTO orders (
      id, customer_name, email,
      address_line1, address_line2, city, state, postcode, country,
      delivery_method, items, subtotal, shipping_cost, total, status
    ) VALUES (
      ${orderId}, ${customerName}, ${email},
      ${addressLine1}, ${addressLine2 || ""}, ${city}, ${state}, ${postcode}, ${country},
      ${deliveryMethod}, ${JSON.stringify(items)}, ${subtotal}, ${shippingCost}, ${total},
      'pending'
    )
  `;

  console.log(
    `[CHECKOUT] Order ${orderId} paid via Square — $${(total / 100).toFixed(2)} AUD`,
  );

  // ── Placeholder: order confirmation email ────────────────────────────────────
  // TODO: uncomment when RESEND_API_KEY is available
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ ... });

  return NextResponse.json({ orderId });
}
