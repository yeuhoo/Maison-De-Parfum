export type Category = "All" | "Floral" | "Woody" | "Oriental" | "Fresh";

export type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  notes: string;
  price: number;
  size: string;
  bestseller: boolean;
  description: string;
};

// Product data is persisted in src/data/products.json and served via /api/products

export const CATEGORIES: Category[] = [
  "All",
  "Floral",
  "Woody",
  "Oriental",
  "Fresh",
];
