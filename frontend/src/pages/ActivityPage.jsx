import React, { useState } from "react";
import { Search, ArrowUp, SlidersHorizontal, DollarSign, Receipt, TrendingUp, ChevronRight, ChevronDown, RotateCcw, Share2 } from "lucide-react";
import TopBar from "@/components/TopBar";
import { Card, StatusPill, currency } from "@/components/Primitives";
import { transactions, activityStats } from "@/data/mock";

const FILTERS = ["All", "Today", "Yesterday", "This Week", "This Month"];

function BrandLogo({ brand }) {
  const map = {
    visa: { bg: "#FFFFFF", fg: "#1A1F71", label: "VISA", italic: true },
    mastercard: { bg: "#FFFFFF", logo: "mc" },
    amex: { bg: "#1F72CD", logo: "amex" },
    discover: { bg: "#FF6F00", fg: "#FFFFFF", label: "DSCVR" },
    applepay: { bg: "#FFFFFF", logo: "apple" },
  };
  const m = map[brand] || map.visa;
  return (
    <div
      className="w-11 h-11 rounded-[12px] grid place-items-center shrink-0"
      style={{ background: m.bg, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {m.logo === "mc" ? (
        <span className="flex">
          <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] -mr-1.5" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
        </span>
      ) : m.logo === "amex" ? (
        <span className="text-[9px] font-black tracking-tighter text-white">AMEX</span>
      ) : m.logo === "apple" ? (
        <span className="text-[14px]">🍎</span>
      ) : (
        <span
          className={`text-[9px] font-black ${m.italic ? "italic" : ""}`}
          style={{ color: m.fg, letterSpacing: m.label === "VISA" ? "0.5px" : "0" }}
        >
          {m.label}
        </span>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta, testid }) {
  return (
    <Card className="p-3" testid={testid}>
      <div
        className="grid place-items-center w-8 h-8 rounded-full mb-2"
        style={{
          background: "rgba(0,245,160,0.10)",
          border: "1px solid rgba(0,245,160,0.25)",
        }}
      >
        <Icon size={14} color="#00F5A0" strokeWidth={2} />
      </div>
      <div className="text-[10px] text-[#A3A3AC] font-medium">{label}</div>
      <div className="jh-num text-[18px] font-bold text-white mt-0.5">{value}</div>
      <div className="mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#00F5A0]">
        <ArrowUp size={10} strokeWidth={2.6} /> {delta}% vs yesterday
      </div>
    </Card>
  );
}

function TxRow({ t, open, onToggle }) {
  return (
    <div data-testid={`tx-row-${t.id}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 jh-press"
      >
        <BrandLogo brand={t.brand} />
        <div className="flex-1 min-w-0 text-left">
          <div className="text-[13px] font-semibold text-white">#{t.id}</div>
          <div className="text-[11px] text-[#A3A3AC] truncate">
            {t.method}{t.last4 !== "—" ? ` •••• ${t.last4}` : ""}
          </div>
          <div className="text-[11px] text-[#6E6E78]">
            {t.time} · {t.customer}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div
            className={`jh-num text-[14px] font-semibold ${
              t.status === "refunded" ? "text-[#60A5FA]" : "text-white"
            }`}
          >
            {t.status === "refunded" ? "−" : ""}
            {currency(t.amount)}
          </div>
          <StatusPill status={t.status} />
        </div>
        <ChevronRight
          size={14}
          color="#6E6E78"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 jh-fade-in">
          <div className="rounded-[14px] p-3 text-[11px] text-[#A3A3AC]"
            style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex justify-between py-1">
              <span>Receipt</span>
              <span className="jh-num text-white font-medium">#{t.id}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Payment</span>
              <span className="text-white font-medium">
                {t.method}{t.last4 !== "—" ? ` •• ${t.last4}` : ""}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Status</span>
              <StatusPill status={t.status} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              data-testid={`tx-refund-${t.id}`}
              className="h-10 rounded-[14px] text-[12px] font-semibold inline-flex items-center justify-center gap-1 jh-press"
              style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.08)", color: "#FAFAFA" }}
            >
              <RotateCcw size={13} /> Refund
            </button>
            <button
              data-testid={`tx-share-${t.id}`}
              className="h-10 rounded-[14px] text-[12px] font-semibold inline-flex items-center justify-center gap-1 jh-press"
              style={{
                background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
                color: "#0A0A0B",
                boxShadow: "0 6px 16px rgba(0,245,160,0.35)",
              }}
            >
              <Share2 size={13} /> Share receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivityPage() {
  const [filter, setFilter] = useState("Today");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const filtered = transactions.filter((t) =>
    `${t.customer} ${t.method} ${t.last4} ${t.id} ${t.amount}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="pb-32" data-testid="activity-page">
      <TopBar />
      <div className="px-5 mt-3">
        <div className="text-[26px] font-bold tracking-tight text-white">Activity</div>

        <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-[16px]"
          style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Search size={16} color="#6E6E78" />
          <input
            data-testid="activity-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search receipt, card, customer or amount"
            className="flex-1 outline-none text-[13px] bg-transparent placeholder:text-[#6E6E78] text-white"
          />
          <SlidersHorizontal size={16} color="#A3A3AC" />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setFilter(f)}
                className="shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold jh-press"
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
                        color: "#0A0A0B",
                        boxShadow: "0 6px 16px rgba(0,245,160,0.35)",
                      }
                    : {
                        background: "#16161A",
                        color: "#A3A3AC",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 jh-stagger">
          <StatCard icon={DollarSign} label="Total Collected" value={`$${activityStats.totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} delta={activityStats.totalDelta} testid="stat-total" />
          <StatCard icon={Receipt} label="Transactions" value={activityStats.txCount} delta={activityStats.txDelta} testid="stat-tx" />
          <StatCard icon={TrendingUp} label="Avg Ticket" value={`$${activityStats.avgTicket.toFixed(2)}`} delta={activityStats.avgDelta} testid="stat-avg" />
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <div className="text-[13px] font-semibold text-white">
            {filtered.length} Transactions
          </div>
          <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00F5A0]">
            Newest First <ChevronDown size={12} />
          </button>
        </div>

        <Card className="mt-2 overflow-hidden" testid="activity-list">
          {filtered.map((t, i, arr) => (
            <div key={t.id} className={i < arr.length - 1 ? "jh-hairline" : ""}>
              <TxRow
                t={t}
                open={openId === t.id}
                onToggle={() => setOpenId(openId === t.id ? null : t.id)}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-[13px] text-[#A3A3AC] py-10">No matches.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
