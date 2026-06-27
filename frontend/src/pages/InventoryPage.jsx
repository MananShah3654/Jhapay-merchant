import React, { useState } from "react";
import { Search, Plus, AlertTriangle, Package, ChevronRight } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { Card, currency } from "@/components/Primitives";
import { inventory } from "@/data/mock";

function StockPill({ stock }) {
  let bg, fg, label;
  if (stock === 0) {
    bg = "rgba(239,68,68,0.15)"; fg = "#F87171"; label = "Out";
  } else if (stock < 10) {
    bg = "rgba(245,158,11,0.15)"; fg = "#FBBF24"; label = `${stock} left`;
  } else {
    bg = "rgba(0,245,160,0.12)"; fg = "#00F5A0"; label = "In stock";
  }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ background: bg, color: fg }}
    >
      ● {label}
    </span>
  );
}

export default function InventoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All" },
    { id: "low", label: "Low" },
    { id: "out", label: "Out" },
    { id: "beverages", label: "Beverages" },
    { id: "food", label: "Food" },
  ];

  const filtered = inventory.filter((p) => {
    if (filter === "low") return p.stock > 0 && p.stock < 10;
    if (filter === "out") return p.stock === 0;
    if (["beverages", "food"].includes(filter))
      return p.category.toLowerCase() === filter;
    return true;
  }).filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const totalValue = inventory.reduce((s, p) => s + p.price * p.stock, 0);
  const lowCount = inventory.filter((p) => p.stock > 0 && p.stock < 10).length;
  const outCount = inventory.filter((p) => p.stock === 0).length;

  return (
    <div className="pb-32" data-testid="inventory-page">
      <SubPageHeader
        eyebrow="Business"
        title="Inventory"
        action={
          <button
            data-testid="add-item-btn"
            className="grid place-items-center w-10 h-10 rounded-full jh-press"
            style={{
              background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
              boxShadow: "0 8px 22px rgba(0,245,160,0.35)",
            }}
            aria-label="Add item"
          >
            <Plus size={16} color="#0A0A0B" strokeWidth={2.6} />
          </button>
        }
      />

      <div className="px-5 mt-3">
        <div className="grid grid-cols-3 gap-2 jh-stagger">
          <Card className="p-3" testid="stat-items">
            <Package size={14} color="#00F5A0" />
            <div className="text-[10px] text-[#A3A3AC] font-medium mt-1.5">Items</div>
            <div className="jh-num text-[18px] font-bold text-white">{inventory.length}</div>
          </Card>
          <Card className="p-3" testid="stat-low">
            <AlertTriangle size={14} color="#F59E0B" />
            <div className="text-[10px] text-[#A3A3AC] font-medium mt-1.5">Low</div>
            <div className="jh-num text-[18px] font-bold text-[#F59E0B]">{lowCount}</div>
          </Card>
          <Card className="p-3" testid="stat-value">
            <div className="grid place-items-center w-3.5 h-3.5 rounded-full border-2 border-[#3B82F6]" />
            <div className="text-[10px] text-[#A3A3AC] font-medium mt-1.5">Value</div>
            <div className="jh-num text-[18px] font-bold text-white">{currency(totalValue)}</div>
          </Card>
        </div>

        <div
          className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-[16px]"
          style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Search size={16} color="#6E6E78" />
          <input
            data-testid="inventory-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items"
            className="flex-1 outline-none text-[13px] bg-transparent placeholder:text-[#6E6E78] text-white"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                data-testid={`inv-filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className="shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold jh-press"
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
                        color: "#0A0A0B",
                        boxShadow: "0 6px 16px rgba(0,245,160,0.30)",
                      }
                    : {
                        background: "#16161A",
                        color: "#A3A3AC",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {outCount > 0 && (
          <Card className="mt-3 p-3 flex items-center gap-3" testid="reorder-banner"
            style={{ border: "1px solid rgba(245,158,11,0.25)" }}>
            <div
              className="grid place-items-center w-8 h-8 rounded-full"
              style={{ background: "rgba(245,158,11,0.12)" }}
            >
              <AlertTriangle size={14} color="#F59E0B" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white">
                {outCount} out of stock
              </div>
              <div className="text-[11px] text-[#A3A3AC]">Tap to reorder from your suppliers.</div>
            </div>
            <ChevronRight size={14} color="#6E6E78" />
          </Card>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2.5 jh-stagger" data-testid="inventory-grid">
          {filtered.map((p) => (
            <button
              key={p.id}
              data-testid={`item-${p.id}`}
              className="rounded-[20px] overflow-hidden text-left jh-press"
              style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-full aspect-square relative overflow-hidden" style={{ background: "#1F1F24" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <div className="absolute top-2 left-2">
                  <StockPill stock={p.stock} />
                </div>
              </div>
              <div className="p-3">
                <div className="text-[13px] font-semibold text-white truncate">{p.name}</div>
                <div className="flex items-center justify-between mt-0.5">
                  <div className="text-[11px] text-[#A3A3AC]">{p.category}</div>
                  <div className="jh-num text-[13px] font-bold text-white">${p.price.toFixed(2)}</div>
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-[13px] text-[#A3A3AC] py-10">
              No items match.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
