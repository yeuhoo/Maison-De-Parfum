"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const DashboardIcon = () => (
  <svg
    className="w-[17px] h-[17px]"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1.5" y="1.5" width="6" height="6" rx="1" />
    <rect x="10.5" y="1.5" width="6" height="6" rx="1" />
    <rect x="1.5" y="10.5" width="6" height="6" rx="1" />
    <rect x="10.5" y="10.5" width="6" height="6" rx="1" />
  </svg>
);
const BoxIcon = () => (
  <svg
    className="w-[17px] h-[17px]"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16.5 5.1 9 9 1.5 5.1" />
    <path d="M1.5 12.9V5.1L9 1 16.5 5.1v7.8L9 17 1.5 12.9z" />
    <line x1="9" y1="9" x2="9" y2="17" />
  </svg>
);
const BarChartIcon = () => (
  <svg
    className="w-4.25 h-4.25"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="1.5" y1="16.5" x2="16.5" y2="16.5" />
    <rect x="2.5" y="9" width="3" height="7.5" rx="0.5" />
    <rect x="7.5" y="5" width="3" height="11.5" rx="0.5" />
    <rect x="12.5" y="2" width="3" height="14.5" rx="0.5" />
  </svg>
);
const ReceiptIcon = () => (
  <svg
    className="w-[17px] h-[17px]"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 1h12a1 1 0 0 1 1 1v14l-2-1.5L12 16l-2-1.5L8 16l-2-1.5L4 16l-2 1.5V2a1 1 0 0 1 1-1z" />
    <line x1="6" y1="6" x2="12" y2="6" />
    <line x1="6" y1="9" x2="12" y2="9" />
    <line x1="6" y1="12" x2="9.5" y2="12" />
  </svg>
);
const MailIcon = () => (
  <svg
    className="w-[17px] h-[17px]"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h11A1.5 1.5 0 0 1 16 4.5v9A1.5 1.5 0 0 1 14.5 15h-11A1.5 1.5 0 0 1 2 13.5v-9z" />
    <polyline points="2 4.5 9 10 16 4.5" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    className="w-[17px] h-[17px]"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4" />
    <polyline points="12 12 16 9 12 6" />
    <line x1="16" y1="9" x2="7" y2="9" />
  </svg>
);

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <DashboardIcon /> },
  { label: "Products", href: "/admin/products", icon: <BoxIcon /> },
  { label: "Orders", href: "/admin/orders", icon: <ReceiptIcon /> },
  { label: "Enquiries", href: "/admin/enquiries", icon: <MailIcon /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChartIcon /> },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin2024";
    setTimeout(() => {
      if (pw === expected) {
        sessionStorage.setItem("admin_auth", "true");
        setAuthed(true);
      } else {
        setError("Incorrect password. Please try again.");
      }
      setBusy(false);
    }, 350);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPw("");
    setError("");
  };

  // Pre-hydration — render nothing to avoid flash
  if (authed === null) return null;

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div
        className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        <div className="w-full max-w-[320px]">
          {/* Brand */}
          <div className="text-center mb-10">
            <h1
              className="text-[26px] font-light text-white tracking-[0.14em] uppercase leading-snug"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Maison
              <br />
              de Parfum
            </h1>
            <div className="w-7 h-[1px] bg-[#c9a96e] mx-auto my-4" />
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
              Admin Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#c9a96e] text-white placeholder-white/15 px-4 py-3 text-sm outline-none transition-colors duration-200"
              />
              {error && (
                <p className="text-red-400/75 text-[11px] mt-1.5">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={busy || !pw}
              className="w-full bg-[#c9a96e] hover:bg-[#b8925a] disabled:opacity-40 text-white text-[11px] tracking-[0.22em] uppercase py-3 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              {busy ? "Verifying…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-white/15 text-[10px] mt-8 leading-relaxed">
            Default: <span className="text-white/30 font-mono">admin2024</span>
            <br />
            Set{" "}
            <span className="text-white/25 font-mono text-[9px]">
              NEXT_PUBLIC_ADMIN_PASSWORD
            </span>{" "}
            in <span className="text-white/25">.env.local</span>
          </p>
        </div>
      </div>
    );
  }

  // ── Admin Shell ───────────────────────────────────────────────────────────────
  return (
    <div
      className="flex min-h-screen"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-55 bg-[#111111] flex flex-col z-50 border-r border-white/5">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/[0.07]">
          <p
            className="text-[13px] text-white tracking-[0.15em] uppercase leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Maison de Parfum
          </p>
          <p className="text-white/22 text-[9px] tracking-[0.28em] uppercase mt-1">
            CRM Console
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-[2px] overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-2.5 px-3 py-[9px] rounded text-[12.5px] transition-all duration-150 ${
                  active
                    ? "bg-[#c9a96e]/[0.11] text-[#c9a96e]"
                    : "text-white/42 hover:text-white/72 hover:bg-white/[0.04]"
                }`}
              >
                <span className={active ? "text-[#c9a96e]" : "text-white/22"}>
                  {icon}
                </span>
                {label}
                {active && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[#c9a96e]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-3 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-[9px] w-full text-[12.5px] text-white/28 hover:text-white/55 transition-colors duration-150"
          >
            <span className="text-white/18">
              <LogoutIcon />
            </span>
            Log out
          </button>
        </div>
      </aside>

      {/* ── Content area ── */}
      <main className="ml-55 flex-1 min-h-screen bg-[#f4f4f4]">{children}</main>
    </div>
  );
}
