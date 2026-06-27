import React, { useState } from "react";
import { Search, MessageCircle, Phone, Mail, ChevronRight, Star, UserPlus } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { Card, currency } from "@/components/Primitives";
import { customers } from "@/data/mock";

function Avatar({ name, color = "#00F5A0" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="grid place-items-center w-12 h-12 rounded-full shrink-0 text-[14px] font-bold"
      style={{
        background: `${color}1F`,
        border: `1px solid ${color}44`,
        color,
      }}
    >
      {initials}
    </div>
  );
}

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const filtered = customers.filter((c) =>
    `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(query.toLowerCase())
  );

  const totalLTV = customers.reduce((s, c) => s + c.ltv, 0);

  return (
    <div className="pb-32" data-testid="customers-page">
      <SubPageHeader
        eyebrow="Business"
        title="Customers"
        action={
          <button
            data-testid="add-customer-btn"
            className="grid place-items-center w-10 h-10 rounded-full jh-press"
            style={{
              background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
              boxShadow: "0 8px 22px rgba(0,245,160,0.35)",
            }}
            aria-label="Add customer"
          >
            <UserPlus size={16} color="#0A0A0B" strokeWidth={2.4} />
          </button>
        }
      />

      <div className="px-5 mt-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 jh-stagger">
          <Card className="p-4" testid="stat-customers">
            <div className="text-[11px] text-[#A3A3AC] font-medium">Total customers</div>
            <div className="jh-num text-[24px] font-bold text-white mt-1">
              {customers.length}
            </div>
            <div className="text-[10px] text-[#00F5A0] font-semibold mt-1">
              +3 this week
            </div>
          </Card>
          <Card className="p-4" testid="stat-ltv">
            <div className="text-[11px] text-[#A3A3AC] font-medium">Lifetime value</div>
            <div className="jh-num text-[24px] font-bold text-white mt-1">
              {currency(totalLTV)}
            </div>
            <div className="text-[10px] text-[#00F5A0] font-semibold mt-1">
              +$84 this week
            </div>
          </Card>
        </div>

        {/* Search */}
        <div
          className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-[16px]"
          style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Search size={16} color="#6E6E78" />
          <input
            data-testid="customer-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers"
            className="flex-1 outline-none text-[13px] bg-transparent placeholder:text-[#6E6E78] text-white"
          />
        </div>

        {/* List */}
        <Card className="mt-3 overflow-hidden" testid="customers-list">
          {filtered.map((c, i, arr) => (
            <div key={c.id} className={i < arr.length - 1 ? "jh-hairline" : ""}>
              <button
                data-testid={`customer-${c.id}`}
                onClick={() => setActive(active === c.id ? null : c.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left jh-press"
              >
                <Avatar name={c.name} color={c.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-[14px] font-semibold text-white truncate">
                      {c.name}
                    </div>
                    {c.tags.includes("VIP") && (
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    )}
                  </div>
                  <div className="text-[11px] text-[#A3A3AC] truncate">
                    {c.visits} visits · last {c.last}
                  </div>
                </div>
                <div className="text-right">
                  <div className="jh-num text-[13px] font-semibold text-white">
                    {currency(c.ltv)}
                  </div>
                  <div className="text-[10px] text-[#6E6E78]">lifetime</div>
                </div>
                <ChevronRight size={14} color="#6E6E78" />
              </button>
              {active === c.id && (
                <div className="px-4 pb-4 jh-fade-in" data-testid={`customer-detail-${c.id}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(0,245,160,0.10)",
                          color: "#00F5A0",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    className="grid grid-cols-3 gap-2"
                    data-testid={`customer-actions-${c.id}`}
                  >
                    <button
                      className="h-10 rounded-[12px] inline-flex items-center justify-center gap-1 jh-press text-[12px] font-semibold text-white"
                      style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <MessageCircle size={13} /> Message
                    </button>
                    <button
                      className="h-10 rounded-[12px] inline-flex items-center justify-center gap-1 jh-press text-[12px] font-semibold text-white"
                      style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <Phone size={13} /> Call
                    </button>
                    <button
                      className="h-10 rounded-[12px] inline-flex items-center justify-center gap-1 jh-press text-[12px] font-semibold text-white"
                      style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <Mail size={13} /> Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-[13px] text-[#A3A3AC] py-10">
              No customers match.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
