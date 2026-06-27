import React from "react";
import { Landmark, ChevronRight, ArrowUpRight, Calendar, Info } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { Card, StatusPill, currency } from "@/components/Primitives";
import { payouts, payoutSchedule } from "@/data/mock";

function payoutBadge(status) {
  if (status === "scheduled")
    return { bg: "rgba(245,158,11,0.16)", fg: "#F59E0B", label: "Scheduled" };
  if (status === "in-transit")
    return { bg: "rgba(59,130,246,0.18)", fg: "#60A5FA", label: "In transit" };
  if (status === "failed")
    return { bg: "rgba(239,68,68,0.18)", fg: "#F87171", label: "Failed" };
  return { bg: "rgba(0,245,160,0.14)", fg: "#00F5A0", label: "Paid" };
}

export default function PayoutsPage() {
  const nextPayout = payouts.find((p) => p.status === "scheduled");
  const monthTotal = payouts
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div className="pb-32" data-testid="payouts-page">
      <SubPageHeader eyebrow="Payments & Finance" title="Payouts" />

      <div className="px-5 mt-3 jh-stagger">
        {/* Hero next payout */}
        {nextPayout && (
          <Card
            className="p-5 relative overflow-hidden"
            testid="next-payout"
            style={{
              background:
                "radial-gradient(800px 200px at -10% -10%, rgba(0,245,160,0.18) 0%, transparent 60%), #16161A",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#A3A3AC] font-medium">Next payout</div>
                <div className="jh-num text-[36px] font-bold text-white mt-1 leading-none">
                  {currency(nextPayout.amount)}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#00F5A0] font-semibold">
                  <Calendar size={11} /> {nextPayout.date}
                </div>
              </div>
              <div
                className="grid place-items-center w-12 h-12 rounded-2xl"
                style={{
                  background: "rgba(0,245,160,0.10)",
                  border: "1px solid rgba(0,245,160,0.25)",
                }}
              >
                <Landmark size={22} color="#00F5A0" strokeWidth={1.8} />
              </div>
            </div>
            <div className="mt-4 pt-3 jh-hairline flex items-center justify-between">
              <div className="text-[11px] text-[#A3A3AC]">
                Destination · {nextPayout.bank}
              </div>
              <button
                data-testid="instant-payout"
                className="px-3 py-1.5 rounded-full text-[11px] font-bold jh-press"
                style={{
                  background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
                  color: "#0A0A0B",
                  boxShadow: "0 6px 16px rgba(0,245,160,0.35)",
                }}
              >
                Instant Payout · 1% fee
              </button>
            </div>
          </Card>
        )}

        {/* Schedule + Month total */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <Card className="p-3" testid="schedule-card">
            <div className="text-[11px] text-[#A3A3AC] font-medium">Schedule</div>
            <div className="text-[14px] font-semibold text-white mt-1">
              {payoutSchedule.cadence}
            </div>
            <button
              data-testid="change-schedule"
              className="mt-2 text-[11px] font-semibold text-[#00F5A0] inline-flex items-center gap-0.5"
            >
              Change <ChevronRight size={11} />
            </button>
          </Card>
          <Card className="p-3" testid="month-card">
            <div className="text-[11px] text-[#A3A3AC] font-medium">This month</div>
            <div className="jh-num text-[20px] font-bold text-white mt-1">
              {currency(monthTotal)}
            </div>
            <div className="text-[10px] font-semibold text-[#00F5A0] mt-1 inline-flex items-center gap-0.5">
              <ArrowUpRight size={10} /> 12.4%
            </div>
          </Card>
        </div>

        {/* Info banner */}
        <Card className="mt-3 p-3 flex items-start gap-2.5" testid="info-banner">
          <Info size={14} color="#60A5FA" className="mt-0.5 shrink-0" />
          <div className="text-[11px] text-[#A3A3AC] leading-relaxed">
            Standard payouts land in <span className="text-white font-semibold">1–2 business days</span>.
            Instant Payout deposits in seconds for a 1% fee.
          </div>
        </Card>

        {/* History */}
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="text-[13px] font-semibold text-white">Recent payouts</div>
          <button className="text-[11px] font-semibold text-[#00F5A0]">All</button>
        </div>
        <Card className="mt-2 overflow-hidden" testid="payouts-list">
          {payouts.map((p, i, arr) => {
            const b = payoutBadge(p.status);
            return (
              <div
                key={p.id}
                data-testid={`payout-${p.id}`}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  i < arr.length - 1 ? "jh-hairline" : ""
                }`}
              >
                <div
                  className="grid place-items-center w-9 h-9 rounded-full shrink-0"
                  style={{ background: b.bg, border: `1px solid ${b.fg}33` }}
                >
                  <Landmark size={14} color={b.fg} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white">
                    {currency(p.amount)}
                  </div>
                  <div className="text-[11px] text-[#A3A3AC] truncate">
                    {p.bank} · {p.txCount} tx
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: b.bg, color: b.fg }}
                  >
                    {b.label}
                  </span>
                  <span className="text-[10px] text-[#6E6E78]">{p.date}</span>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
