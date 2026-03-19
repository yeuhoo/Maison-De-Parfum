import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status, trackingNumber, courier } = await request.json();

  const [order] = await sql`
    UPDATE orders
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // ── Placeholder: shipping notification email ──────────────────────────────
  // TODO: when Resend is set up, send shipping email here if status === 'shipped'
  if (status === "shipped") {
    console.log(
      `[SHIPPING NOTIFICATION] Order #${id} shipped via ${courier ?? "—"} — tracking: ${trackingNumber ?? "—"}`,
    );
  }

  return NextResponse.json(order);
}
