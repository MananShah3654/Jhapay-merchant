import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Download, TrendingUp } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { Card, currency } from "@/components/Primitives";
import { reportsData } from "@/data/mock";

function Bars({ data, labels }) {
  const max = Math.max(...data);
  const W = 320;
  const H = 140;
  const padding = 4;
  const barW = (W - padding * (data.length - 1)) / data.length;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 18}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00F5A0" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const h = (v / max) * H;
        const x = i * (barW + padding);
        const y = H - h;
        const isLast = i === data.length - 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={6}
              fill="url(#barGrad)"
              opacity={isLast ? 1 : 0.7}
            />
            <text
              x={x + barW / 2}
              y={H + 14}
              fontSize="9"
              fill="var(--jh-text-3)"
              textAnchor="middle"
            >
              {labels[i]}
            </text>
            {isLast && (
              <text
                x={x + barW / 2}
                y={y - 6}
                fontSize="9"
                fill="#00F5A0"
                fontWeight="700"
                textAnchor="middle"
              >
                ${v}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ slices, total }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--jh-surface-2)" strokeWidth="14" />
      {slices.map((s, i) => {
        const len = (s.value / total) * c;
        const el = (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        );
        offset += len;
        return el;
      })}
      <text x="60" y="58" fontSize="10" fill="var(--jh-text-2)" textAnchor="middle">
        Total
      </text>
      <text
        x="60"
        y="74"
        fontSize="14"
        fill="var(--jh-text)"
        textAnchor="middle"
        fontWeight="700"
      >
        ${total.toLocaleString()}
      </text>
    </svg>
  );
}

const RANGES = ["7D", "30D", "90D", "12M"];

export default function ReportsPage() {
  const [range, setRange] = useState("7D");

  const { weekRevenue, weekLabels, topSellers, categoryMix, kpis } = reportsData;
  const categoryTotal = categoryMix.reduce((s, c) => s + c.value, 0);

  return (
    <div className="pb-32" data-testid="reports-page">
      <SubPageHeader
        eyebrow="Sales"
        title="Reports"
        action={
          <button
            data-testid="export-btn"
            className="grid place-items-center w-10 h-10 rounded-full jh-press"
            style={{ background: "var(--jh-surface)", border: "1px solid var(--jh-border-soft)" }}
            aria-label="Export"
          >
            <Download size={16} color="var(--jh-text)" />
          </button>
        }
      />

      <div className="px-5 mt-3 jh-stagger">
        {/* Range selector */}
        <div
          className="grid grid-cols-4 gap-1 p-1 rounded-[16px]"
          style={{ background: "var(--jh-surface)", border: "1px solid var(--jh-border-soft)" }}
        >
          {RANGES.map((r) => {
            const active = range === r;
            return (
              <button
                key={r}
                data-testid={`range-${r}`}
                onClick={() => setRange(r)}
                className="h-9 rounded-[12px] text-[12px] font-semibold jh-press"
                style={
                  active
                    ? {
                        background: "linear-gradient(180deg, var(--jh-primary) 0%, var(--jh-primary-strong) 100%)",
                        color: "#0A0A0B",
                      }
                    : { color: "var(--jh-text-2)", background: "transparent" }
                }
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Hero revenue card with bars */}
        <Card className="mt-3 p-4" testid="revenue-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[color:var(--jh-text-2)] font-medium">Revenue · {range}</div>
              <div className="jh-num text-[28px] font-bold text-[color:var(--jh-text)] mt-0.5">
                {currency(kpis.revenue)}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--jh-primary)]">
                <ArrowUpRight size={11} /> {kpis.revenueDelta}% vs prev
              </div>
            </div>
            <div
              className="grid place-items-center w-10 h-10 rounded-full"
              style={{
                background: "rgba(0,245,160,0.10)",
                border: "1px solid rgba(0,245,160,0.25)",
              }}
            >
              <TrendingUp size={16} color="var(--jh-primary)" />
            </div>
          </div>
          <div className="mt-3 -mx-1">
            <Bars data={weekRevenue} labels={weekLabels} />
          </div>
        </Card>

        {/* KPI grid */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {[
            { label: "Gross sales", value: kpis.gross, delta: 8.2, up: true, key: "gross" },
            { label: "Refunds", value: kpis.refunds, delta: 2.1, up: false, key: "refunds" },
            { label: "Tips", value: kpis.tips, delta: 14.5, up: true, key: "tips" },
            { label: "Taxes", value: kpis.taxes, delta: 6.0, up: true, key: "taxes" },
          ].map((k) => (
            <Card key={k.key} className="p-3" testid={`kpi-${k.key}`}>
              <div className="text-[11px] text-[color:var(--jh-text-2)] font-medium">{k.label}</div>
              <div className="jh-num text-[18px] font-bold text-[color:var(--jh-text)] mt-1">
                {currency(k.value)}
              </div>
              <div
                className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold"
                style={{ color: k.up ? "var(--jh-primary)" : "#F87171" }}
              >
                {k.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {k.delta}%
              </div>
            </Card>
          ))}
        </div>

        {/* Top sellers */}
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="text-[13px] font-semibold text-[color:var(--jh-text)]">Top sellers</div>
          <button className="text-[11px] font-semibold text-[color:var(--jh-primary)]">View all</button>
        </div>
        <Card className="mt-2 overflow-hidden" testid="top-sellers">
          {topSellers.map((s, i, arr) => (
            <div
              key={s.name}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < arr.length - 1 ? "jh-hairline" : ""
              }`}
              data-testid={`seller-${i}`}
            >
              <div
                className="w-7 h-7 rounded-full grid place-items-center text-[11px] font-bold"
                style={{
                  background:
                    i === 0
                      ? "rgba(245,158,11,0.18)"
                      : i === 1
                      ? "rgba(163,163,172,0.18)"
                      : "rgba(180,83,9,0.18)",
                  color: i === 0 ? "#F59E0B" : i === 1 ? "#D4D4D8" : "#D97706",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[color:var(--jh-text)] truncate">{s.name}</div>
                <div className="text-[11px] text-[color:var(--jh-text-2)]">{s.units} sold</div>
              </div>
              <div className="jh-num text-[13px] font-bold text-[color:var(--jh-text)]">
                {currency(s.revenue)}
              </div>
            </div>
          ))}
        </Card>

        {/* Category donut */}
        <Card className="mt-3 p-4" testid="category-mix">
          <div className="text-[13px] font-semibold text-[color:var(--jh-text)]">Category mix</div>
          <div className="mt-3 flex items-center gap-4">
            <Donut slices={categoryMix} total={categoryTotal} />
            <div className="flex-1 flex flex-col gap-2">
              {categoryMix.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 text-[12px]"
                  data-testid={`cat-mix-${c.label.toLowerCase()}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="flex-1 text-[color:var(--jh-text)]">{c.label}</span>
                  <span className="jh-num text-[color:var(--jh-text-2)]">
                    {Math.round((c.value / categoryTotal) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
