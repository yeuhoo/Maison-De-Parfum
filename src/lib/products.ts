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

export const products: Product[] = [
  {
    id: 1,
    name: "Elegant Rose",
    category: "Floral",
    notes: "Rose · Jasmine · White Musk",
    price: 89,
    size: "50ml",
    bestseller: true,
    description:
      "A feminine masterpiece anchored in velvety rose petals and a luminous jasmine heart.",
  },
  {
    id: 2,
    name: "Blush Peony",
    category: "Floral",
    notes: "Peony · White Tea · Sandalwood",
    price: 95,
    size: "50ml",
    bestseller: false,
    description:
      "Delicate and airy — the scent of a sun-lit garden in full, unhurried bloom.",
  },
  {
    id: 3,
    name: "White Gardenia",
    category: "Floral",
    notes: "Gardenia · Ylang Ylang · Amber",
    price: 110,
    size: "50ml",
    bestseller: false,
    description:
      "Rich and intoxicating with lush white florals and a warm, resinous finish.",
  },
  {
    id: 4,
    name: "Cedar & Oud",
    category: "Woody",
    notes: "Oud · Cedarwood · Vetiver",
    price: 125,
    size: "50ml",
    bestseller: true,
    description:
      "A commanding presence — smoky oud enveloped in warm cedarwood and earthy vetiver.",
  },
  {
    id: 5,
    name: "Sandalwood Dreams",
    category: "Woody",
    notes: "Sandalwood · Vanilla · Tonka Bean",
    price: 99,
    size: "50ml",
    bestseller: false,
    description:
      "Creamy, warm, and deeply sensual — a scent that lingers like a whispered memory.",
  },
  {
    id: 6,
    name: "Amber Forest",
    category: "Woody",
    notes: "Amber · Patchouli · Oakmoss",
    price: 115,
    size: "50ml",
    bestseller: false,
    description:
      "Deep and earthy, reminiscent of ancient forest floors at the edge of dusk.",
  },
  {
    id: 7,
    name: "Midnight Amber",
    category: "Oriental",
    notes: "Amber · Vanilla · Dark Musk",
    price: 79,
    size: "50ml",
    bestseller: false,
    description:
      "Warm and mysterious — amber and rich vanilla unfold slowly on the skin.",
  },
  {
    id: 8,
    name: "Saffron Noir",
    category: "Oriental",
    notes: "Saffron · Rose · Leather",
    price: 135,
    size: "50ml",
    bestseller: true,
    description:
      "A bold, opulent signature inspired by the gilded spice markets of the East.",
  },
  {
    id: 9,
    name: "Spiced Vanilla",
    category: "Oriental",
    notes: "Vanilla · Cardamom · Benzoin",
    price: 85,
    size: "50ml",
    bestseller: false,
    description:
      "Sweet and spiced — a comforting oriental with depth for every season.",
  },
  {
    id: 10,
    name: "Citrus Breeze",
    category: "Fresh",
    notes: "Bergamot · Lemon · Marine",
    price: 69,
    size: "50ml",
    bestseller: false,
    description:
      "Fresh and invigorating — bright citrus lifted by a cool marine breeze.",
  },
  {
    id: 11,
    name: "Sea Salt Mist",
    category: "Fresh",
    notes: "Sea Salt · Driftwood · Iris",
    price: 75,
    size: "50ml",
    bestseller: false,
    description:
      "Clean, crisp, and effortlessly coastal — inspired by open water at sunrise.",
  },
  {
    id: 12,
    name: "Green Tea Garden",
    category: "Fresh",
    notes: "Green Tea · Jasmine · Cedarwood",
    price: 72,
    size: "50ml",
    bestseller: false,
    description:
      "Light and serene — a breath of fresh botanical air with a lingering woody base.",
  },
];

export const CATEGORIES: Category[] = [
  "All",
  "Floral",
  "Woody",
  "Oriental",
  "Fresh",
];
