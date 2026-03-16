"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: string;
  total: string;
  status: OrderStatus;
}

// ─── Placeholder orders ───────────────────────────────────────────────────────
const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-0012",
    customer: "Sophia Lau",
    email: "sophia@example.com",
    date: "2025-01-15",
    items: "Elegant Rose × 1",
    total: "$89.00",
    status: "delivered",
  },
  {
    id: "ORD-0011",
    customer: "James Montfort",
    email: "james@example.com",
    date: "2025-01-14",
    items: "Cedar & Oud × 2",
    total: "$250.00",
    status: "shipped",
  },
  {
    id: "ORD-0010",
    customer: "Isabelle Chen",
    email: "isabelle@example.com",
    date: "2025-01-13",
    items: "Amber Mystique × 1",
    total: "$140.00",
    status: "processing",
  },
  {
    id: "ORD-0009",
    customer: "Marcus Dubois",
    email: "marcus@example.com",
    date: "2025-01-12",
    items: "Midnight Oud × 1",
    total: "$175.00",
    status: "pending",
  },
  {
    id: "ORD-0008",
    customer: "Aria Fontaine",
    email: "aria@example.com",
    date: "2025-01-11",
    items: "White Gardenia × 1",
    total: "$110.00",
    status: "delivered",
  },
  {
    id: "ORD-0007",
    customer: "Leon Nakashima",
    email: "leon@example.com",
    date: "2025-01-10",
    items: "Saffron Noir × 1",
    total: "$155.00",
    status: "cancelled",
  },
  {
    id: "ORD-0006",
    customer: "Clara Whitfield",
    email: "clara@example.com",
    date: "2025-01-09",
    items: "Blush Peony × 2",
    total: "$190.00",
    status: "delivered",
  },
  {
    id: "ORD-0005",
    customer: "Ethan Moreau",
    email: "ethan@example.com",
    date: "2025-01-08",
    items: "Dark Sandalwood × 1",
    total: "$135.00",
    status: "delivered",
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; classes: string }> = {
  pending: {
    label: "Pending",
    classes: "bg-amber-50   text-amber-700   border border-amber-200",
  },
  processing: {
    label: "Processing",
    classes: "bg-blue-50    text-blue-700    border border-blue-200",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-purple-50  text-purple-700  border border-purple-200",
  },
  delivered: {
    label: "Delivered",
    classes: "bg-green-50   text-green-700   border border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50     text-red-600     border border-red-200",
  },
};

const ALL_STATUSES: (OrderStatus | "All")[] = [
  "All",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] =
      s === "All" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="px-8 py-8 max-w-[1200px]">
      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#9a8a7a] mb-1">
          Commerce
        </p>
        <h1
          className="text-[22px] font-light text-[#1a1a1a] tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Orders
        </h1>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase px-3 py-1.5 border transition-colors duration-150 ${
              filter === s
                ? "bg-[#c9a96e] border-[#c9a96e] text-white"
                : "bg-white border-[#e5e5e5] text-[#888] hover:border-[#c9a96e] hover:text-[#c9a96e]"
            }`}
          >
            {s === "All" ? "All" : STATUS_CONFIG[s as OrderStatus].label}
            <span
              className={`text-[9px] px-1 py-0.5 rounded font-normal ${filter === s ? "bg-white/20" : "bg-[#f0f0f0]"}`}
            >
              {counts[s]}
            </span>
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or order ID…"
          className="ml-auto bg-white border border-[#e5e5e5] text-[12.5px] px-4 py-1.5 outline-none focus:border-[#c9a96e] transition-colors w-60 text-[#333] placeholder-[#bbb]"
        />
      </div>

      {/* ── Note ── */}
      <div className="mb-4 px-4 py-2.5 bg-[#c9a96e]/[0.06] border border-[#c9a96e]/15 text-[11.5px] text-[#9a7a50]">
        Sample data shown below. Real orders will appear here once the backend
        is integrated.
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Order
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Customer
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden md:table-cell">
                Date
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden lg:table-cell">
                Items
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Total
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Status
              </th>
              <th className="text-right px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const isExpanded = expanded === order.id;
              return (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : order.id)}
                  >
                    <td className="px-5 py-3.5 text-[#555] font-mono text-[12px]">
                      {order.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-[#222] font-medium">
                        {order.customer}
                      </div>
                      <div className="text-[11px] text-[#aaa] hidden sm:block">
                        {order.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#888] hidden md:table-cell">
                      {order.date}
                    </td>
                    <td className="px-5 py-3.5 text-[#888] hidden lg:table-cell">
                      {order.items}
                    </td>
                    <td className="px-5 py-3.5 text-[#333] font-medium">
                      {order.total}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] capitalize tracking-wide ${cfg.classes}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td
                      className="px-5 py-3.5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="text-[11px] text-[#555] bg-white border border-[#e5e5e5] px-2 py-1 outline-none focus:border-[#c9a96e] transition-colors cursor-pointer"
                      >
                        {(
                          [
                            "pending",
                            "processing",
                            "shipped",
                            "delivered",
                            "cancelled",
                          ] as OrderStatus[]
                        ).map((s) => (
                          <option key={s} value={s}>
                            {STATUS_CONFIG[s].label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-[#fafafa] border-b border-[#f0f0f0]">
                      <td
                        colSpan={7}
                        className="px-5 py-3 text-[12px] text-[#777]"
                      >
                        <strong className="text-[#555]">Email:</strong>{" "}
                        {order.email}
                        {"  ·  "}
                        <strong className="text-[#555]">Items:</strong>{" "}
                        {order.items}
                        {"  ·  "}
                        <strong className="text-[#555]">Date:</strong>{" "}
                        {order.date}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="px-5 py-12 text-center text-[#ccc] text-[13px]">
            No orders match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
