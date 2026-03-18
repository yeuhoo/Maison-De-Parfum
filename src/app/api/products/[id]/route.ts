import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const {
    name,
    category,
    notes,
    price,
    size,
    bestseller,
    description,
    ingredients,
    warning,
    manufacturedFor,
  } = body;

  const rows = await sql`
    UPDATE products SET
      name             = COALESCE(${name ?? null}, name),
      category         = COALESCE(${category ?? null}, category),
      notes            = COALESCE(${notes ?? null}, notes),
      price            = COALESCE(${price ?? null}, price),
      size             = COALESCE(${size ?? null}, size),
      bestseller       = COALESCE(${bestseller ?? null}, bestseller),
      description      = COALESCE(${description ?? null}, description),
      ingredients      = COALESCE(${ingredients ?? null}, ingredients),
      warning          = COALESCE(${warning ?? null}, warning),
      manufactured_for = COALESCE(${manufacturedFor ?? null}, manufactured_for)
    WHERE id = ${Number(id)}
    RETURNING id, name, category, notes, price, size, bestseller,
              description, ingredients, warning,
              manufactured_for AS "manufacturedFor"
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const rows = await sql`
    DELETE FROM products WHERE id = ${Number(id)} RETURNING id
  `;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
