import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendDeliveryUpdate } from "@/lib/delivery-notifications";

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status, trackingNumber, courier } = await request.json();

  if (!ORDER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
  }

  const [previousOrder] = await sql`
    SELECT
      status, customer_name AS "customerName", email,
      courier, tracking_number AS "trackingNumber"
    FROM orders
    WHERE id = ${id}
  `;

  if (!previousOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const nextCourier = courier?.trim() || previousOrder.courier || null;
  const nextTrackingNumber =
    trackingNumber?.trim() || previousOrder.trackingNumber || null;
  const trackingChanged =
    nextCourier !== previousOrder.courier ||
    nextTrackingNumber !== previousOrder.trackingNumber;

  const [order] = await sql`
    UPDATE orders
    SET
      status = ${status},
      courier = ${nextCourier},
      tracking_number = ${nextTrackingNumber},
      tracking_status = ${status},
      tracking_updated_at = CASE
        WHEN ${trackingChanged || status !== previousOrder.status}
          THEN NOW()
        ELSE tracking_updated_at
      END
    WHERE id = ${id}
    RETURNING
      id, customer_name AS "customerName", email,
      status, courier, tracking_number AS "trackingNumber",
      tracking_status AS "trackingStatus",
      tracking_updated_at AS "trackingUpdatedAt"
  `;

  const shouldNotify =
    (status === "shipped" || status === "delivered") &&
    (status !== previousOrder.status || trackingChanged);

  if (shouldNotify) {
    await sendDeliveryUpdate({
      orderId: id,
      customerName: previousOrder.customerName,
      email: previousOrder.email,
      status,
      courier: nextCourier,
      trackingNumber: nextTrackingNumber,
    }).catch((error) =>
      console.error(`[DELIVERY UPDATE] Email failed for order #${id}:`, error),
    );
  }

  return NextResponse.json(order);
}
