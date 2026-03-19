import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

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

  const [inquiry] = await sql`
    INSERT INTO inquiries (id, name, email, subject, message, status)
    VALUES (${id}, ${name}, ${email}, ${subject}, ${message}, 'new')
    RETURNING *
  `;

  // ── Placeholder: auto-acknowledgement email ───────────────────────────────
  // TODO: uncomment when RESEND_API_KEY is available
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'hello@maisondeparfum.com',
  //   to: email,
  //   subject: 'We received your message — Maison de Parfum',
  //   html: `<p>Hi ${name}, thank you for reaching out. We'll get back to you within 1–2 business days.</p>`
  // });
  console.log(`[INQUIRY RECEIVED] #${id} from ${name} <${email}>`);

  return NextResponse.json(inquiry, { status: 201 });
}
