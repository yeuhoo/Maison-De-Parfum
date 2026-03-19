import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
    SELECT
      id, customer_name AS "customerName", email,
      address_line1 AS "addressLine1", address_line2 AS "addressLine2",
      city, state, postcode, country,
      delivery_method AS "deliveryMethod",
      items, subtotal, shipping_cost AS "shippingCost", total,
      status, created_at AS "createdAt"
    FROM orders
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    customerName,
    email,
    addressLine1,
    addressLine2 = "",
    city,
    state,
    postcode,
    country = "Australia",
    deliveryMethod = "standard",
    items,
    subtotal,
    shippingCost,
    total,
  } = body;

  const [order] = await sql`
    INSERT INTO orders (
      id, customer_name, email,
      address_line1, address_line2,
      city, state, postcode, country,
      delivery_method, items, subtotal, shipping_cost, total, status
    ) VALUES (
      ${id}, ${customerName}, ${email},
      ${addressLine1}, ${addressLine2},
      ${city}, ${state}, ${postcode}, ${country},
      ${deliveryMethod}, ${JSON.stringify(items)}, ${subtotal}, ${shippingCost}, ${total}, 'pending'
    )
    RETURNING *
  `;

  // ── Placeholder: email confirmation ──────────────────────────────────────
  // TODO: replace with Resend when API key is available
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: 'orders@maisondeparfum.com', to: email, ... });
  console.log(
    `[ORDER CONFIRMED] #${id} for ${customerName} <${email}> — $${total / 100}`,
  );

  return NextResponse.json(order, { status: 201 });
}
