"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Enquiry {
  id: string;
  status: string;
}

interface Product {
  id: number;
}

const STATUS_STYLES: Record<string, string> = {
  pending:    "bg-amber-50   text-amber-600   border border-amber-200",
  processing: "bg-blue-50    text-blue-600    border border-blue-200",
  shipped:    "bg-purple-50  text-purple-600  border border-purple-200",
  delivered:  "bg-green-50   text-green-700   border border-green-200",
  cancelled:  "bg-red-50     text-red-600     border border-red-200",
};

const QUICK_LINKS = [
  { href: "/admin/products",  label: "Manage products" },
  { href: "/admin/orders",    label: "View all orders" },
  { href: "/admin/enquiries", label: "View enquiries" },
];

export default function DashboardPage() {
  const [orders,    setOrders]    = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products,  setProducts]  = useState<Product[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/inquiries").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ])
      .then(([o, e, p]) => {
        setOrders(o);
        setEnquiries(e);
        setProducts(p);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  // Stats
  const ordersThisMonth = orders.filter((o) => {
    const d = new Date(o.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const revenueMTD = ordersThisMonth
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const recentOrders = orders.slice(0, 5);

  const STATS = [
    {
      label:  "Total Products",
      value:  loading ? "…" : String(products.length),
      sub:    loading ? "Loading…" : `${products.length} in catalogue`,
      accent: "#c9a96e",
    },
    {
      label:  "Orders This Month",
      value:  loading ? "…" : String(ordersThisMonth.length),
      sub:    loading ? "Loading…" : `${orders.length} total all time`,
      accent: "#7e99b0",
    },
    {
      label:  "New Enquiries",
      value:  loading ? "…" : String(newEnquiries),
      sub:    loading ? "Loading…" : `${enquiries.length} total enquiries`,
      accent: "#9b8ea0",
    },
    {
      label:  "Revenue MTD",
      value:  loading ? "…" : `$${(revenueMTD / 100).toFixed(0)}`,
      sub:    loading ? "Loading…" : `${ordersThisMonth.length} orders this month`,
      accent: "#7fa882",
    },
  ];

  return (
    <div className="px-8 py-8 max-w-[1200px]">
      {/* ── Page header ── */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#9a8a7a] mb-1">
            Overview
          </p>
          <h1
            className="text-[22px] font-light text-[#1a1a1a] tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dashboard
          </h1>
        </div>
        <p className="text-[12px] text-[#aaa]">{dateStr}</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, sub, accent }) => (
          <div
            key={label}
            className="bg-white rounded-lg px-5 py-5 border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#999]">
                {label}
              </p>
              {!loading && (
                <span className="flex items-center gap-1 text-[9px] text-green-600 tracking-wide">
                  <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>
            <p className="text-[28px] font-light leading-none mb-2" style={{ color: accent }}>
              {value}
            </p>
            <p className="text-[11px] text-[#bbb]">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Lower grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-[12px] font-medium tracking-[0.08em] text-[#333] uppercase">
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="text-[11px] text-[#c9a96e] hover:underline">
              View all
            </Link>
          </div>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-[#f5f5f5]">
                {["Order", "Customer", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-[#ccc] text-[13px]">
                    Loading…
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-[#ccc] text-[13px]">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#fafafa] hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-[#555] font-mono text-[12px]">{order.id}</td>
                    <td className="px-5 py-3.5 text-[#333]">{order.customerName}</td>
                    <td className="px-5 py-3.5 text-[#555]">${(order.total / 100).toFixed(2)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] capitalize tracking-wide ${STATUS_STYLES[order.status] ?? ""}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f0f0f0]">
              <h2 className="text-[12px] font-medium tracking-[0.08em] text-[#333] uppercase">
                Quick Actions
              </h2>
            </div>
            <ul className="divide-y divide-[#f5f5f5]">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between px-5 py-3.5 text-[12.5px] text-[#555] hover:text-[#c9a96e] hover:bg-[#fafafa] transition-colors"
                  >
                    {label}
                    <svg className="w-4 h-4 opacity-40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* New enquiries alert */}
          {!loading && newEnquiries > 0 && (
            <Link
              href="/admin/enquiries"
              className="bg-[#c9a96e]/[0.07] border border-[#c9a96e]/20 rounded-lg px-5 py-4 hover:bg-[#c9a96e]/[0.12] transition-colors"
            >
              <p className="text-[10px] font-medium text-[#9a7a50] mb-1 tracking-wide uppercase">
                Action Required
              </p>
              <p className="text-[12px] text-[#7a6040] leading-relaxed">
                You have <strong>{newEnquiries}</strong> new{" "}
                {newEnquiries === 1 ? "enquiry" : "enquiries"} waiting for a reply.
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
