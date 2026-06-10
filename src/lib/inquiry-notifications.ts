type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

const SUBJECT_LABELS: Record<string, string> = {
  product: "Product Enquiry",
  order: "Order Support",
  "perfume-bar": "Perfume Bar / Events",
  wholesale: "Wholesale",
  other: "Other",
};

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

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DELIVERY_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "Inquiry email is not configured. RESEND_API_KEY and DELIVERY_FROM_EMAIL are required.",
    );
  }

  return { apiKey, from };
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { apiKey, from } = getEmailConfig();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the email: ${await response.text()}`);
  }
}

export async function sendNewInquiryEmails(inquiry: Inquiry) {
  const inquiryToEmail = process.env.INQUIRY_TO_EMAIL;
  if (!inquiryToEmail) {
    throw new Error("INQUIRY_TO_EMAIL is not configured.");
  }

  const subjectLabel = SUBJECT_LABELS[inquiry.subject] ?? inquiry.subject;

  await Promise.all([
    sendEmail({
      to: inquiryToEmail,
      replyTo: inquiry.email,
      subject: `New ${subjectLabel} from ${inquiry.name}`,
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Reference:</strong> ${escapeHtml(inquiry.id)}</p>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${formatMessage(inquiry.message)}</p>
      `,
    }),
    sendEmail({
      to: inquiry.email,
      replyTo: inquiryToEmail,
      subject: "We received your message — Maison de Parfum",
      html: `
        <p>Hi ${escapeHtml(inquiry.name)},</p>
        <p>Thank you for reaching out to Maison de Parfum. We have received your message and will get back to you within 1–2 business days.</p>
        <p><strong>Your reference:</strong> ${escapeHtml(inquiry.id)}</p>
        <p>Warmly,<br />Maison de Parfum</p>
      `,
    }),
  ]);
}

export async function sendInquiryReply(
  inquiry: Inquiry,
  reply: string,
) {
  await sendEmail({
    to: inquiry.email,
    replyTo: process.env.INQUIRY_TO_EMAIL,
    subject: `Re: ${SUBJECT_LABELS[inquiry.subject] ?? inquiry.subject} — Maison de Parfum`,
    html: `
      <p>Hi ${escapeHtml(inquiry.name)},</p>
      <p>${formatMessage(reply)}</p>
      <hr />
      <p style="color:#777;font-size:12px;"><strong>Your original message:</strong><br />${formatMessage(inquiry.message)}</p>
      <p>Warmly,<br />Maison de Parfum</p>
    `,
  });
}
