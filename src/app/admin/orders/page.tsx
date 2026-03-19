"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  deliveryMethod: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadOrders = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data: Order[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const visible = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: OrderStatus) => {
    fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() =>
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      ),
    );
  };

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] =
      s === "All" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatItems = (items: OrderItem[]) =>
    items.map((i) => `${i.name} (${i.size} ×${i.quantity})`).join(", ");

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
        Orders placed via checkout appear here in real time.
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
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-[#ccc] text-[13px]"
                >
                  Loading orders…
                </td>
              </tr>
            ) : visible.length === 0 ? null : (
              visible.map((order) => {
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
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-[#aaa] hidden sm:block">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#888] hidden md:table-cell">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 text-[#888] hidden lg:table-cell max-w-[200px] truncate">
                        {formatItems(order.items)}
                      </td>
                      <td className="px-5 py-3.5 text-[#333] font-medium">
                        ${(order.total / 100).toFixed(2)}
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
                            updateStatus(
                              order.id,
                              e.target.value as OrderStatus,
                            )
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
                          className="px-5 py-3 text-[12px] text-[#777] space-y-1"
                        >
                          <div>
                            <strong className="text-[#555]">Address:</strong>{" "}
                            {order.addressLine1}
                            {order.addressLine2
                              ? `, ${order.addressLine2}`
                              : ""}
                            , {order.city} {order.state} {order.postcode},{" "}
                            {order.country}
                          </div>
                          <div>
                            <strong className="text-[#555]">Delivery:</strong>{" "}
                            {order.deliveryMethod} ·{" "}
                            <strong className="text-[#555]">Shipping:</strong> $
                            {(order.shippingCost / 100).toFixed(2)}
                          </div>
                          <div>
                            <strong className="text-[#555]">Items:</strong>{" "}
                            {formatItems(order.items)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
        {visible.length === 0 && !loading && (
          <div className="px-5 py-12 text-center text-[#ccc] text-[13px]">
            No orders match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
