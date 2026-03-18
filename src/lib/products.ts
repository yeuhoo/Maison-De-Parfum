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
    name: "Midnight Muse",
    category: "Woody",
    notes: "Jasmine · Dark Musk · Sandalwood",
    price: 149,
    size: "50ml",
    bestseller: true,
    description:
      "A hypnotic blend that awakens the senses. Dark jasmine meets warm sandalwood and lingering musk in an evening fragrance made for the bold.",
  },
  {
    id: 2,
    name: "Blue Aura",
    category: "Fresh",
    notes: "Ocean Breeze · Bergamot · White Musk",
    price: 139,
    size: "50ml",
    bestseller: false,
    description:
      "Clean, bright, and effortlessly fresh. An airy composition of ocean breeze and bergamot lifted by a soft white musk base.",
  },
  {
    id: 3,
    name: "Crimson Rouge No. 5",
    category: "Oriental",
    notes: "Rose · Warm Spice · Amber",
    price: 159,
    size: "50ml",
    bestseller: false,
    description:
      "Opulent and daring. A rich heart of rose and spice unfolds over warm amber — a fragrance that commands attention.",
  },
  {
    id: 4,
    name: "Maison No. 2",
    category: "Fresh",
    notes: "Neroli · Soft Musk · Cedar",
    price: 145,
    size: "50ml",
    bestseller: false,
    description:
      "Refined simplicity at its finest. Neroli and soft cedar form an elegant signature suited for every occasion.",
  },
  {
    id: 5,
    name: "Azure",
    category: "Fresh",
    notes: "Sea Salt · Aquatic · Iris",
    price: 135,
    size: "50ml",
    bestseller: false,
    description:
      "Pure aquatic clarity. A cool, shimmering blend of sea salt and iris that evokes clear skies and open water.",
  },
  {
    id: 6,
    name: "Pear and Blossom",
    category: "Floral",
    notes: "Pear · Rose · White Blossom",
    price: 149,
    size: "50ml",
    bestseller: true,
    description:
      "A delicate dance of ripe pear and cherry blossom over a gentle musk base. Light, playful, and effortlessly chic.",
  },
  {
    id: 7,
    name: "Mysterious",
    category: "Oriental",
    notes: "Oud · Incense · Vanilla",
    price: 155,
    size: "50ml",
    bestseller: false,
    description:
      "Deep and enveloping. Oud and incense weave through a warm vanilla base, creating a fragrance of rare, brooding allure.",
  },
  {
    id: 8,
    name: "Velvet Cherry",
    category: "Oriental",
    notes: "Black Cherry · Rose · Warm Vanilla",
    price: 159,
    size: "50ml",
    bestseller: true,
    description:
      "Luscious and indulgent. Black cherry and rose entwined with warm vanilla — rich, sensual, and utterly unforgettable.",
  },
  {
    id: 9,
    name: "Aqua Mist",
    category: "Fresh",
    notes: "Citrus · Fresh Water · Green Tea",
    price: 129,
    size: "50ml",
    bestseller: false,
    description:
      "A breath of clarity. Light citrus and fresh water notes layer over green tea in a fragrance as refreshing as morning air.",
  },
  {
    id: 10,
    name: "Duchess",
    category: "Floral",
    notes: "Peony · Rose · Soft Amber",
    price: 149,
    size: "50ml",
    bestseller: false,
    description:
      "Poised and timeless. Peony and rose bloom softly over a delicate amber base in this quietly elegant signature scent.",
  },
  {
    id: 11,
    name: "Soft Petal",
    category: "Floral",
    notes: "White Rose · Jasmine · Peach",
    price: 139,
    size: "50ml",
    bestseller: false,
    description:
      "Tender and feminine. White rose and jasmine rest on a blush of peach in a fragrance as delicate as its name.",
  },
  {
    id: 12,
    name: "Vanilla Bloom",
    category: "Oriental",
    notes: "Vanilla · Tonka Bean · White Flowers",
    price: 145,
    size: "50ml",
    bestseller: false,
    description:
      "Warmth and softness in every spray. Vanilla and tonka bean mingled with white blossoms create an inviting, comforting fragrance.",
  },
];

export const CATEGORIES: Category[] = [
  "All",
  "Floral",
  "Woody",
  "Oriental",
  "Fresh",
];
