import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
    SELECT id, name, category, notes,
           price_50ml AS "price50ml", price_30ml AS "price30ml",
           bestseller, description, ingredients, warning,
           manufactured_for AS "manufacturedFor"
    FROM products
    ORDER BY id
  `;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    category,
    notes,
    price50ml = 0,
    price30ml = 0,
    bestseller = false,
    description = "",
    ingredients = "",
    warning = "",
    manufacturedFor = "",
  } = body;

  const rows = await sql`
    INSERT INTO products
      (name, category, notes, price_50ml, price_30ml, bestseller, description, ingredients, warning, manufactured_for)
    VALUES
      (${name}, ${category}, ${notes}, ${price50ml}, ${price30ml}, ${bestseller}, ${description}, ${ingredients}, ${warning}, ${manufacturedFor})
    RETURNING id, name, category, notes,
              price_50ml AS "price50ml", price_30ml AS "price30ml",
              bestseller, description, ingredients, warning,
              manufactured_for AS "manufacturedFor"
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
