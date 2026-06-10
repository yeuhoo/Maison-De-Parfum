type DeliveryStatus = "shipped" | "delivered";

type DeliveryUpdate = {
  orderId: string;
  customerName: string;
  email: string;
  status: DeliveryStatus;
  courier?: string | null;
  trackingNumber?: string | null;
};

export const COURIERSPLEASE_TRACKING_URL =
  "https://www.couriersplease.com.au/tools-track";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

export async function sendDeliveryUpdate(update: DeliveryUpdate) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DELIVERY_FROM_EMAIL;

  if (!apiKey || !from) {
    console.log(
      `[DELIVERY UPDATE] Order #${update.orderId} is ${update.status}. Email skipped because RESEND_API_KEY or DELIVERY_FROM_EMAIL is not configured.`,
    );
    return;
  }

  const isDelivered = update.status === "delivered";
  const subject = isDelivered
    ? `Your Maison de Parfum order has been delivered`
    : `Your Maison de Parfum order is on its way`;
  const trackingDetails =
    update.trackingNumber && !isDelivered
      ? `<p><strong>${escapeHtml(update.courier ?? "Courier")} tracking number:</strong> ${escapeHtml(update.trackingNumber)}</p>
         <p><a href="${COURIERSPLEASE_TRACKING_URL}">Track your parcel with CouriersPlease</a></p>`
      : "";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [update.email],
      subject,
      html: `
        <p>Hi ${escapeHtml(update.customerName)},</p>
        <p>Your Maison de Parfum order <strong>#${escapeHtml(update.orderId)}</strong> has been ${isDelivered ? "delivered" : "shipped"}.</p>
        ${trackingDetails}
        <p>Thank you for choosing Maison de Parfum.</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error(
      `[DELIVERY UPDATE] Resend rejected the email for order #${update.orderId}:`,
      await response.text(),
    );
  }
}
