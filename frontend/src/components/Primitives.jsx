import React from "react";

export function currency(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export function StatusPill({ status }) {
  const map = {
    settled: { bg: "rgba(22,163,74,0.16)", fg: "#22C57E", label: "Settled" },
    completed: { bg: "rgba(22,163,74,0.16)", fg: "#22C57E", label: "Completed" },
    pending: { bg: "rgba(245,158,11,0.16)", fg: "#F59E0B", label: "Pending" },
    refunded: { bg: "rgba(59,130,246,0.18)", fg: "#60A5FA", label: "Refunded" },
    failed: { bg: "rgba(239,68,68,0.18)", fg: "#F87171", label: "Failed" },
    preparing: { bg: "rgba(0,245,160,0.14)", fg: "#00F5A0", label: "Preparing" },
    ready: { bg: "rgba(59,130,246,0.18)", fg: "#60A5FA", label: "Ready" },
    new: { bg: "rgba(245,158,11,0.16)", fg: "#F59E0B", label: "New" },
  };
  const s = map[status] || map.settled;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-tight"
      style={{ background: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

export function Card({ children, className = "", testid, style }) {
  return (
    <div
      data-testid={testid}
      className={`rounded-[24px] jh-shadow-card ${className}`}
      style={{
        background: "#16161A",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
