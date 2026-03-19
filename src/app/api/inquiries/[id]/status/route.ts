import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status } = await request.json();

  const validStatuses = ["new", "reviewed", "replied", "archived"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const [inquiry] = await sql`
    UPDATE inquiries
    SET status = ${status}
    WHERE id = ${id}
    RETURNING id, status
  `;

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json(inquiry);
}
