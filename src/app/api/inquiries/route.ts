import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendNewInquiryEmails } from "@/lib/inquiry-notifications";

export async function GET() {
  const rows = await sql`
    SELECT id, name, email, subject, message, status, reply, replied_at AS "repliedAt", created_at AS "createdAt"
    FROM inquiries
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { id, name, email, subject, message } = await request.json();

  if (!id || !name?.trim() || !email?.trim() || !subject || !message?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const [inquiry] = await sql`
    INSERT INTO inquiries (id, name, email, subject, message, status)
    VALUES (${id}, ${name}, ${email}, ${subject}, ${message}, 'new')
    RETURNING *
  `;

  let emailSent = true;
  let emailError: string | undefined;

  try {
    await sendNewInquiryEmails({ id, name, email, subject, message });
  } catch (error) {
    emailSent = false;
    emailError = error instanceof Error ? error.message : "Email failed";
    console.error(`[INQUIRY RECEIVED] Email failed for #${id}:`, error);
  }

  return NextResponse.json(
    { ...inquiry, emailSent, emailError },
    { status: 201 },
  );
}
