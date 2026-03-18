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

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const products = readProducts();
  const nextId =
    products.length > 0
      ? Math.max(...products.map((p) => Number(p.id))) + 1
      : 1;
  const newProduct = { description: "", ...body, id: nextId };
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}
