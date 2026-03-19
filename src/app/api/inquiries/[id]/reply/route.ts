import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

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
    UPDATE inquiries
    SET reply = ${reply}, replied_at = NOW(), status = 'replied'
    WHERE id = ${id}
    RETURNING id, name, email, subject, message, status, reply, replied_at AS "repliedAt", created_at AS "createdAt"
  `;

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  // ── Placeholder: send reply email to customer ─────────────────────────────
  // TODO: uncomment when RESEND_API_KEY is available
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'hello@maisondeparfum.com',
  //   to: inquiry.email,
  //   subject: 'Re: Your enquiry — Maison de Parfum',
  //   html: `
  //     <p>Hi ${inquiry.name},</p>
  //     <p>${reply}</p>
  //     <hr/>
  //     <p style="color:#aaa;font-size:12px;">Your original message: ${inquiry.message}</p>
  //     <p style="color:#aaa;font-size:12px;">— Maison de Parfum Team</p>
  //   `
  // });
  console.log(`[INQUIRY REPLIED] #${id} reply sent to ${inquiry.email}`);

  return NextResponse.json(inquiry);
}
