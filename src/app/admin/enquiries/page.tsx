"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EnquiryStatus = "new" | "reviewed" | "replied" | "archived";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

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
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "All">("All");
  const [detail, setDetail] = useState<Enquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyError, setReplyError] = useState("");

  useEffect(() => {
    fetch("/api/inquiries")
      .then((r) => r.json())
      .then((data) => setEnquiries(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visible = enquiries.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = async (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
    if (detail?.id === id)
      setDetail((prev) => (prev ? { ...prev, status } : null));
    await fetch(`/api/inquiries/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const openDetail = (enq: Enquiry) => {
    setDetail(enq);
    setReplyText(enq.reply ?? "");
    setReplyError("");
  };

  const sendReply = async () => {
    if (!detail || !replyText.trim()) return;
    setReplying(true);
    setReplyError("");
    try {
      const res = await fetch(`/api/inquiries/${detail.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText }),
      });
      if (!res.ok) throw new Error("Failed to send reply");
      const updated: Enquiry = await res.json();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e)),
      );
      setDetail(updated);
    } catch {
      setReplyError("Failed to send reply. Please try again.");
    } finally {
      setReplying(false);
    }
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
          Customer Relations
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
          placeholder="Search name, email or subject…"
          className="ml-auto bg-white border border-[#e5e5e5] text-[12.5px] px-4 py-1.5 outline-none focus:border-[#c9a96e] transition-colors w-64 text-[#333] placeholder-[#bbb]"
        />
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
                Subject
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
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-[#ccc] text-[13px]"
                >
                  Loading enquiries…
                </td>
              </tr>
            ) : (
              visible.map((enq) => {
                const cfg = STATUS_CONFIG[enq.status];
                return (
                  <tr
                    key={enq.id}
                    className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors cursor-pointer"
                    onClick={() => openDetail(enq)}
                  >
                    <td className="px-5 py-3.5 text-[#bbb] font-mono text-[11px]">
                      {enq.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-[#222] font-medium">{enq.name}</div>
                      <div className="text-[11px] text-[#aaa]">{enq.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-[#555] hidden sm:table-cell">
                      {enq.subject}
                    </td>
                    <td className="px-5 py-3.5 text-[#aaa] text-[11px] hidden xl:table-cell">
                      {new Date(enq.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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
              })
            )}
          </tbody>
        </table>
        {!loading && visible.length === 0 && (
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
            className="bg-white w-full max-w-[460px] h-full overflow-y-auto shadow-2xl"
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
                <InfoRow
                  label="Received"
                  value={new Date(detail.createdAt).toLocaleDateString(
                    "en-AU",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                />
              </div>

              {/* Inquiry details */}
              <div className="space-y-2 border-b border-[#f5f5f5] pb-5">
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-3">
                  Enquiry
                </h3>
                <InfoRow label="Subject" value={detail.subject} />
                <div className="mt-2">
                  <p className="text-[12px] text-[#555] leading-relaxed bg-[#fafafa] border border-[#f0f0f0] rounded px-4 py-3 whitespace-pre-wrap">
                    {detail.message}
                  </p>
                </div>
              </div>

              {/* Reply section */}
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] mb-3">
                  {detail.reply ? "Reply Sent" : "Send Reply"}
                </h3>
                {detail.repliedAt && (
                  <p className="text-[11px] text-[#aaa] mb-2">
                    Replied{" "}
                    {new Date(detail.repliedAt).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={5}
                  placeholder="Type your reply…"
                  className="w-full bg-[#fafafa] border border-[#e5e5e5] text-[12.5px] text-[#444] px-4 py-3 outline-none focus:border-[#c9a96e] transition-colors resize-none leading-relaxed placeholder-[#ccc]"
                />
                {replyError && (
                  <p className="text-red-600 text-[11px] mt-1">{replyError}</p>
                )}
                <button
                  onClick={sendReply}
                  disabled={replying || !replyText.trim()}
                  className="mt-3 w-full bg-[#c9a96e] text-white text-[11px] tracking-[0.15em] uppercase py-2.5 hover:bg-[#b8934d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {replying
                    ? "Sending…"
                    : detail.reply
                      ? "Update Reply"
                      : "Send Reply"}
                </button>
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

