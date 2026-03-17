"use client";

// ─── Sample data ──────────────────────────────────────────────────────────────
const MONTHLY_REVENUE = [
  { month: "Apr", value: 3200 },
  { month: "May", value: 4750 },
  { month: "Jun", value: 5100 },
  { month: "Jul", value: 4400 },
  { month: "Aug", value: 6200 },
  { month: "Sep", value: 7850 },
  { month: "Oct", value: 6900 },
  { month: "Nov", value: 9400 },
  { month: "Dec", value: 11200 },
  { month: "Jan", value: 8600 },
  { month: "Feb", value: 9800 },
  { month: "Mar", value: 10450 },
];

const TOP_PRODUCTS = [
  { name: "Rose Éternelle", category: "Floral", units: 84, revenue: 12600 },
  { name: "Oud Majesty", category: "Oriental", units: 71, revenue: 13490 },
  { name: "Cedarwood Noir", category: "Woody", units: 68, revenue: 10200 },
  { name: "Neroli Blanche", category: "Floral", units: 55, revenue: 8250 },
  { name: "Amber Soleil", category: "Oriental", units: 49, revenue: 9310 },
];

const CATEGORY_SALES = [
  { category: "Floral", units: 186, color: "#c9a96e" },
  { category: "Oriental", units: 154, color: "#9b8ea0" },
  { category: "Woody", units: 132, color: "#7e9a8a" },
  { category: "Fresh", units: 98, color: "#7e99b0" },
];

const ORDER_STATUS = [
  { label: "Delivered", count: 312, color: "#7e9a8a" },
  { label: "Shipped", count: 48, color: "#c9a96e" },
  { label: "Processing", count: 22, color: "#7e99b0" },
  { label: "Pending", count: 14, color: "#9b8ea0" },
  { label: "Cancelled", count: 9, color: "#b06060" },
];

const KPI = [
  {
    label: "Total Revenue",
    value: "$97,450",
    delta: "+18.4%",
    up: true,
    sub: "vs prior 12 months",
    accent: "#c9a96e",
  },
  {
    label: "Orders Placed",
    value: "405",
    delta: "+12.1%",
    up: true,
    sub: "last 12 months",
    accent: "#7e99b0",
  },
  {
    label: "Avg. Order Value",
    value: "$240.62",
    delta: "+5.7%",
    up: true,
    sub: "vs prior period",
    accent: "#9b8ea0",
  },
  {
    label: "Units Sold",
    value: "570",
    delta: "+9.3%",
    up: true,
    sub: "across all products",
    accent: "#7e9a8a",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
const maxCatUnits = Math.max(...CATEGORY_SALES.map((c) => c.units));
const totalOrderStatus = ORDER_STATUS.reduce((s, o) => s + o.count, 0);

function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  return (
    <div
      className="min-h-screen bg-[#f4f4f4]"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {/* Header */}
      <div className="bg-white border-b border-black/[0.07] px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-[#1a1a1a] tracking-[0.04em]">
            Analytics
          </h1>
          <p className="text-[11px] text-black/30 mt-0.5 tracking-[0.02em]">
            12-month overview · Sample data
          </p>
        </div>
        <span className="text-[10px] text-black/25 tracking-[0.18em] uppercase border border-black/10 px-3 py-1.5">
          Apr 2025 – Mar 2026
        </span>
      </div>

      <div className="px-8 py-7 space-y-7">
        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI.map((k) => (
            <div
              key={k.label}
              className="bg-white p-5 border border-black/[0.07]"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-3">
                {k.label}
              </p>
              <p
                className="text-[26px] font-semibold leading-none mb-2"
                style={{ color: k.accent }}
              >
                {k.value}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[11px] font-medium"
                  style={{ color: k.up ? "#7e9a8a" : "#b06060" }}
                >
                  {k.up ? "▲" : "▼"} {k.delta}
                </span>
                <span className="text-[10px] text-black/25">{k.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Revenue Chart + Order Status ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Monthly Revenue Bar Chart */}
          <div className="xl:col-span-2 bg-white border border-black/[0.07] p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-6">
              Monthly Revenue
            </p>
            <div className="flex items-end gap-2 h-44">
              {MONTHLY_REVENUE.map((m) => {
                const pct = (m.value / maxRevenue) * 100;
                return (
                  <div
                    key={m.month}
                    className="flex-1 flex flex-col items-center gap-1.5 group"
                  >
                    <span className="text-[9px] text-black/0 group-hover:text-black/35 transition-colors duration-150 leading-none">
                      {fmt(m.value)}
                    </span>
                    <div
                      className="w-full relative flex flex-col justify-end"
                      style={{ height: "148px" }}
                    >
                      <div
                        className="w-full rounded-[1px] transition-all duration-300 group-hover:opacity-90"
                        style={{
                          height: `${pct}%`,
                          background:
                            "linear-gradient(to top, #c9a96e, #dfc08a)",
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-black/28 leading-none">
                      {m.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-white border border-black/[0.07] p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-6">
              Orders by Status
            </p>
            {/* Stacked bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-5">
              {ORDER_STATUS.map((o) => (
                <div
                  key={o.label}
                  style={{
                    width: `${(o.count / totalOrderStatus) * 100}%`,
                    backgroundColor: o.color,
                  }}
                />
              ))}
            </div>
            <div className="space-y-3">
              {ORDER_STATUS.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: o.color }}
                    />
                    <span className="text-[12px] text-black/55">{o.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-black/70">
                      {o.count}
                    </span>
                    <span className="text-[10px] text-black/25 w-8 text-right">
                      {((o.count / totalOrderStatus) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-black/6 flex justify-between">
              <span className="text-[10px] text-black/28 uppercase tracking-[0.15em]">
                Total Orders
              </span>
              <span className="text-[13px] font-semibold text-black/60">
                {totalOrderStatus}
              </span>
            </div>
          </div>
        </div>

        {/* ── Top Products + Category Sales ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Top Products */}
          <div className="bg-white border border-black/[0.07] p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-5">
              Top Products by Revenue
            </p>
            <div className="space-y-4">
              {TOP_PRODUCTS.map((p, i) => {
                const maxRev = TOP_PRODUCTS[0].revenue;
                const pct = (p.revenue / maxRev) * 100;
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] text-black/20 w-4 text-right font-mono">
                          {i + 1}
                        </span>
                        <div>
                          <span className="text-[12.5px] text-black/70 font-medium">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-black/30 ml-1.5">
                            {p.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[12.5px] font-semibold text-black/65">
                          ${p.revenue.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-black/25 ml-1">
                          / {p.units} units
                        </span>
                      </div>
                    </div>
                    <div className="h-0.75 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(to right, #c9a96e, #dfc08a)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white border border-black/[0.07] p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-5">
              Units Sold by Category
            </p>
            <div className="space-y-5">
              {CATEGORY_SALES.map((c) => {
                const pct = (c.units / maxCatUnits) * 100;
                const totalUnits = CATEGORY_SALES.reduce(
                  (s, x) => s + x.units,
                  0,
                );
                const share = ((c.units / totalUnits) * 100).toFixed(0);
                return (
                  <div key={c.category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="text-[12.5px] text-black/65 font-medium">
                          {c.category}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[13px] font-semibold text-black/65">
                          {c.units}
                        </span>
                        <span className="text-[10px] text-black/25">
                          units · {share}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: c.color,
                          opacity: 0.75,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-black/6 flex justify-between items-center">
              <span className="text-[10px] text-black/28 uppercase tracking-[0.15em]">
                Total Units
              </span>
              <span className="text-[13px] font-semibold text-black/60">
                {CATEGORY_SALES.reduce((s, c) => s + c.units, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Backend notice */}
        <div className="bg-[#c9a96e]/8 border border-[#c9a96e]/20 px-5 py-3.5 flex items-center gap-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0 text-[#c9a96e]"
          >
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <line
              x1="7"
              y1="4"
              x2="7"
              y2="7.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="7" cy="10" r="0.7" fill="currentColor" />
          </svg>
          <p className="text-[11px] text-[#9a7a4e] leading-relaxed">
            Data shown is illustrative. Connect the Node.js/MongoDB backend to
            populate live order, revenue, and product analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
