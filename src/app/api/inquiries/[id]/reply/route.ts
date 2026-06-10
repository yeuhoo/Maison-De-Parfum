import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendInquiryReply } from "@/lib/inquiry-notifications";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { reply } = await request.json();

  if (!reply?.trim()) {
    return NextResponse.json(
      { error: "Reply cannot be empty" },
      { status: 400 },
    );
  }

  const [inquiry] = await sql`
    SELECT id, name, email, subject, message
    FROM inquiries
    WHERE id = ${id}
  `;

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  try {
    await sendInquiryReply(
      {
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
      },
      reply.trim(),
    );
  } catch (error) {
    console.error(`[INQUIRY REPLIED] Email failed for #${id}:`, error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send reply email",
      },
      { status: 502 },
    );
  }

  const [updatedInquiry] = await sql`
    UPDATE inquiries
    SET reply = ${reply.trim()}, replied_at = NOW(), status = 'replied'
    WHERE id = ${id}
    RETURNING id, name, email, subject, message, status, reply, replied_at AS "repliedAt", created_at AS "createdAt"
  `;

  return NextResponse.json(updatedInquiry);
}
