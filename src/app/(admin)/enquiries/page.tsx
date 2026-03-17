"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EnquiryStatus = "new" | "reviewed" | "replied" | "archived";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue?: string;
  message: string;
  receivedAt: string;
  status: EnquiryStatus;
}

// ─── Sample enquiries (Perfume Bar) ──────────────────────────────────────────
const SAMPLE_ENQUIRIES: Enquiry[] = [];

const STATUS_CONFIG: Record<EnquiryStatus, { label: string; classes: string }> =
  {
    new: {
      label: "New",
      classes: "bg-sky-50    text-sky-700    border border-sky-200",
    },
    reviewed: {
      label: "Reviewed",
      classes: "bg-amber-50  text-amber-700  border border-amber-200",
    },
    replied: {
      label: "Replied",
      classes: "bg-green-50  text-green-700  border border-green-200",
    },
    archived: {
      label: "Archived",
      classes: "bg-stone-100 text-stone-500  border border-stone-200",
    },
  };

const ALL_STATUSES: (EnquiryStatus | "All")[] = [
  "All",
  "new",
  "reviewed",
  "replied",
  "archived",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(SAMPLE_ENQUIRIES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "All">("All");
  const [detail, setDetail] = useState<Enquiry | null>(null);

  const visible = enquiries.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.eventType.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
    if (detail?.id === id)
      setDetail((prev) => (prev ? { ...prev, status } : null));
  };

  const counts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] =
      s === "All"
        ? enquiries.length
        : enquiries.filter((e) => e.status === s).length;
    return acc;
  }, {});

  return (
    <div className="px-8 py-8 max-w-[1200px]">
      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#9a8a7a] mb-1">
          Perfume Bar
        </p>
        <h1
          className="text-[22px] font-light text-[#1a1a1a] tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Enquiries
        </h1>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex gap-1.5 flex-wrap mb-4 items-center">
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
            {s === "All" ? "All" : STATUS_CONFIG[s as EnquiryStatus].label}
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
          placeholder="Search name, email or event…"
          className="ml-auto bg-white border border-[#e5e5e5] text-[12.5px] px-4 py-1.5 outline-none focus:border-[#c9a96e] transition-colors w-64 text-[#333] placeholder-[#bbb]"
        />
      </div>

      {/* ── Note ── */}
      <div className="mb-4 px-4 py-2.5 bg-[#c9a96e]/[0.06] border border-[#c9a96e]/15 text-[11.5px] text-[#9a7a50]">
        Sample data shown. Live enquiries will appear here once the contact form
        is connected to the backend.
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-black/[0.05] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                ID
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Contact
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden sm:table-cell">
                Event Type
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden md:table-cell">
                Event Date
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden lg:table-cell">
                Guests
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal hidden xl:table-cell">
                Received
              </th>
              <th className="text-left px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Status
              </th>
              <th className="text-right px-5 py-3 text-[10px] tracking-[0.12em] uppercase text-[#bbb] font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((enq) => {
              const cfg = STATUS_CONFIG[enq.status];
              return (
                <tr
                  key={enq.id}
                  className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors cursor-pointer"
                  onClick={() => setDetail(enq)}
                >
                  <td className="px-5 py-3.5 text-[#bbb] font-mono text-[11px]">
                    {enq.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[#222] font-medium">{enq.name}</div>
                    <div className="text-[11px] text-[#aaa]">{enq.email}</div>
                  </td>
                  <td className="px-5 py-3.5 text-[#555] hidden sm:table-cell">
                    {enq.eventType}
                  </td>
                  <td className="px-5 py-3.5 text-[#888] hidden md:table-cell">
                    {enq.eventDate}
                  </td>
                  <td className="px-5 py-3.5 text-[#888] hidden lg:table-cell">
                    {enq.guestCount}
                  </td>
                  <td className="px-5 py-3.5 text-[#aaa] text-[11px] hidden xl:table-cell">
                    {enq.receivedAt}
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
                      value={enq.status}
                      onChange={(e) =>
                        updateStatus(enq.id, e.target.value as EnquiryStatus)
                      }
                      className="text-[11px] text-[#555] bg-white border border-[#e5e5e5] px-2 py-1 outline-none focus:border-[#c9a96e] transition-colors cursor-pointer"
                    >
                      {(
                        [
                          "new",
                          "reviewed",
                          "replied",
                          "archived",
                        ] as EnquiryStatus[]
                      ).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_CONFIG[s].label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="px-5 py-12 text-center text-[#ccc] text-[13px]">
            No enquiries match your filters.
          </div>
        )}
      </div>

      {/* ── Detail panel ── */}
      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/30"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white w-full max-w-[420px] h-full overflow-y-auto shadow-2xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0] sticky top-0 bg-white z-10">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-0.5">
                  {detail.id}
                </p>
                <h2
                  className="text-[15px] font-medium text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {detail.name}
                </h2>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="text-[#bbb] hover:text-[#555] text-xl transition-colors leading-none"
              >
                ✕
              </button>
            </div>

            {/* Panel body */}
            <div className="px-6 py-5 space-y-5">
              {/* Status + update */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex px-2.5 py-1 rounded text-[10px] capitalize tracking-wide ${STATUS_CONFIG[detail.status].classes}`}
                >
                  {STATUS_CONFIG[detail.status].label}
                </span>
                <select
                  value={detail.status}
                  onChange={(e) =>
                    updateStatus(detail.id, e.target.value as EnquiryStatus)
                  }
                  className="text-[11px] text-[#555] bg-white border border-[#e5e5e5] px-2 py-1.5 outline-none focus:border-[#c9a96e] transition-colors cursor-pointer"
                >
                  {(
                    [
                      "new",
                      "reviewed",
                      "replied",
                      "archived",
                    ] as EnquiryStatus[]
                  ).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_CONFIG[s].label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact info */}
              <div className="space-y-2 border-b border-[#f5f5f5] pb-5">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-3">
                  Contact
                </h3>
                <InfoRow label="Name" value={detail.name} />
                <InfoRow
                  label="Email"
                  value={
                    <a
                      href={`mailto:${detail.email}`}
                      className="text-[#c9a96e] hover:underline"
                    >
                      {detail.email}
                    </a>
                  }
                />
                {detail.phone && <InfoRow label="Phone" value={detail.phone} />}
                <InfoRow label="Received" value={detail.receivedAt} />
              </div>

              {/* Event info */}
              <div className="space-y-2 border-b border-[#f5f5f5] pb-5">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-3">
                  Event Details
                </h3>
                <InfoRow label="Type" value={detail.eventType} />
                <InfoRow label="Date" value={detail.eventDate} />
                <InfoRow label="Guests" value={detail.guestCount} />
                {detail.venue && <InfoRow label="Venue" value={detail.venue} />}
              </div>

              {/* Message */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-3">
                  Message
                </h3>
                <p className="text-[13px] text-[#555] leading-relaxed bg-[#fafafa] border border-[#f0f0f0] rounded px-4 py-3">
                  {detail.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 text-[12.5px]">
      <span className="text-[#bbb] w-16 flex-shrink-0">{label}</span>
      <span className="text-[#444]">{value}</span>
    </div>
  );
}
