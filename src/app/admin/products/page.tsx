"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "Floral" | "Woody" | "Oriental" | "Fresh";

interface Product {
  id: number;
  name: string;
  category: Category;
  notes: string;
  price: number;
  size: string;
  bestseller: boolean;
}

// ─── Initial product catalogue (mirrors shop page) ────────────────────────────
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Elegant Rose",
    category: "Floral",
    notes: "Rose · Jasmine · White Musk",
    price: 89,
    size: "50ml",
    bestseller: true,
  },
  {
    id: 2,
    name: "Blush Peony",
    category: "Floral",
    notes: "Peony · White Tea · Sandalwood",
    price: 95,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 3,
    name: "White Gardenia",
    category: "Floral",
    notes: "Gardenia · Ylang Ylang · Amber",
    price: 110,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 4,
    name: "Cedar & Oud",
    category: "Woody",
    notes: "Oud · Cedarwood · Vetiver",
    price: 125,
    size: "50ml",
    bestseller: true,
  },
  {
    id: 5,
    name: "Dark Sandalwood",
    category: "Woody",
    notes: "Sandalwood · Tobacco · Vanilla",
    price: 135,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 6,
    name: "Forest & Rain",
    category: "Woody",
    notes: "Petrichor · Moss · Pine",
    price: 105,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 7,
    name: "Amber Mystique",
    category: "Oriental",
    notes: "Amber · Spice · Benzoin",
    price: 140,
    size: "50ml",
    bestseller: true,
  },
  {
    id: 8,
    name: "Saffron Noir",
    category: "Oriental",
    notes: "Saffron · Rose · Musk",
    price: 155,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 9,
    name: "Midnight Oud",
    category: "Oriental",
    notes: "Black Oud · Incense · Labdanum",
    price: 175,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 10,
    name: "Aqua Lumineux",
    category: "Fresh",
    notes: "Sea Salt · Bergamot · White Tea",
    price: 80,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 11,
    name: "Citrus Soleil",
    category: "Fresh",
    notes: "Lemon · Neroli · Soft Musk",
    price: 85,
    size: "50ml",
    bestseller: false,
  },
  {
    id: 12,
    name: "Green Vetiver",
    category: "Fresh",
    notes: "Vetiver · Grapefruit · Basil",
    price: 98,
    size: "50ml",
    bestseller: false,
  },
];

const CATEGORIES: Category[] = ["Floral", "Woody", "Oriental", "Fresh"];

const CATEGORY_COLORS: Record<Category, string> = {
  Floral: "bg-pink-50   text-pink-600   border-pink-200",
  Woody: "bg-amber-50  text-amber-700  border-amber-200",
  Oriental: "bg-purple-50 text-purple-600 border-purple-200",
  Fresh: "bg-teal-50   text-teal-600   border-teal-200",
};

const EMPTY_FORM: Omit<Product, "id"> = {
  name: "",
  category: "Floral",
  notes: "",
  price: 0,
  size: "50ml",
  bestseller: false,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category | "All">("All");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ── Filtered list ──
  const visible = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.notes.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.category === filter;
    return matchSearch && matchFilter;
  });

  // ── Handlers ──
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (p: Product) => {
    const { id, ...rest } = p;
    setForm(rest);
    setEditId(id);
    setModal("edit");
  };

  const closeModal = () => {
    setModal(null);
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.notes.trim() || form.price <= 0) return;
    if (modal === "add") {
      const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
      setProducts((prev) => [...prev, { ...form, id: nextId }]);
    } else if (modal === "edit" && editId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...form, id: p.id } : p)),
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="px-8 py-8 max-w-[1200px]">
      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#9a8a7a] mb-1">
            Catalogue
          </p>
          <h1
            className="text-[22px] font-light text-[#1a1a1a] tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Products
          </h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#111111] text-white text-[11px] tracking-[0.18em] uppercase px-4 py-2.5 hover:bg-[#333] transition-colors duration-150"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
          Add Product
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="bg-white border border-[#e5e5e5] text-[13px] px-4 py-2 outline-none focus:border-[#c9a96e] transition-colors w-60 text-[#333] placeholder-[#bbb]"
        />
        <div className="flex gap-1.5">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors duration-150 ${
                filter === cat
                  ? "bg-[#c9a96e] border-[#c9a96e] text-white"
                  : "bg-white border-[#e5e5e5] text-[#888] hover:border-[#c9a96e] hover:text-[#c9a96e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[11px] text-[#bbb]">
          {visible.length} of {products.length} products
        </span>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal w-8">
                #
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Name
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Category
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden lg:table-cell">
                Notes
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Price
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden xl:table-cell">
                Size
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Best
              </th>
              <th className="text-right px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors"
              >
                <td className="px-5 py-3.5 text-[#ccc] font-mono">{p.id}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[#222] font-medium">{p.name}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[10px] border ${CATEGORY_COLORS[p.category]}`}
                  >
                    {p.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[#888] hidden lg:table-cell max-w-[200px] truncate">
                  {p.notes}
                </td>
                <td className="px-5 py-3.5 text-[#333] font-medium">
                  ${p.price}
                </td>
                <td className="px-5 py-3.5 text-[#999] hidden xl:table-cell">
                  {p.size}
                </td>
                <td className="px-5 py-3.5">
                  {p.bestseller ? (
                    <span className="text-[#c9a96e] text-[11px]">✦</span>
                  ) : (
                    <span className="text-[#ddd] text-[11px]">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-[11px] text-[#888] hover:text-[#c9a96e] transition-colors mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="text-[11px] text-[#888] hover:text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="px-5 py-12 text-center text-[#ccc] text-[13px]">
            No products match your filters.
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-[480px] shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
              <h2
                className="text-[14px] font-medium text-[#1a1a1a] tracking-wide uppercase"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {modal === "add" ? "Add Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-[#bbb] hover:text-[#555] transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="field-label">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="field-input"
                  placeholder="e.g. Elegant Rose"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as Category })
                    }
                    className="field-input"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Size</label>
                  <input
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="field-input"
                    placeholder="50ml"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Scent Notes</label>
                <input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="field-input"
                  placeholder="Rose · Jasmine · White Musk"
                />
              </div>
              <div>
                <label className="field-label">Price (USD)</label>
                <input
                  type="number"
                  min={0}
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  className="field-input"
                  placeholder="89"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <input
                  id="bestseller"
                  type="checkbox"
                  checked={form.bestseller}
                  onChange={(e) =>
                    setForm({ ...form, bestseller: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#c9a96e]"
                />
                <label
                  htmlFor="bestseller"
                  className="text-[12.5px] text-[#555]"
                >
                  Mark as bestseller
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#f0f0f0] flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-[11.5px] tracking-[0.1em] uppercase text-[#888] border border-[#e5e5e5] hover:bg-[#f9f9f9] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={
                  !form.name.trim() || !form.notes.trim() || form.price <= 0
                }
                className="px-5 py-2 text-[11.5px] tracking-[0.1em] uppercase bg-[#111111] text-white hover:bg-[#333] disabled:opacity-40 transition-colors"
              >
                {modal === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation ── */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="bg-white w-full max-w-[360px] shadow-xl px-6 py-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <h2 className="text-[14px] font-medium text-[#1a1a1a] mb-2">
              Delete product?
            </h2>
            <p className="text-[12.5px] text-[#888] mb-5">
              This will remove{" "}
              <strong className="text-[#333]">
                {products.find((p) => p.id === deleteId)?.name}
              </strong>{" "}
              from the catalogue. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-[11.5px] tracking-[0.1em] uppercase text-[#888] border border-[#e5e5e5] hover:bg-[#f9f9f9] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-[11.5px] tracking-[0.1em] uppercase bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Shared field styles (Tailwind @apply alternative) ── */}
      <style>{`
        .field-label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }
        .field-input {
          width: 100%;
          border: 1px solid #e5e5e5;
          padding: 8px 12px;
          font-size: 13px;
          color: #333;
          outline: none;
          transition: border-color 0.15s;
          background: white;
          font-family: var(--font-montserrat);
        }
        .field-input:focus {
          border-color: #c9a96e;
        }
      `}</style>
    </div>
  );
}
