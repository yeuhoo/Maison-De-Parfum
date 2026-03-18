import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/products.json");

function readProducts(): Array<Record<string, unknown>> {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeProducts(data: Array<Record<string, unknown>>): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  // Merge so fields not sent by the admin form (e.g. description) are preserved
  products[idx] = { ...products[idx], ...body, id: Number(id) };
  writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const products = readProducts();
  const filtered = products.filter((p) => p.id !== Number(id));
  if (filtered.length === products.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeProducts(filtered);
  return NextResponse.json({ success: true });
}
