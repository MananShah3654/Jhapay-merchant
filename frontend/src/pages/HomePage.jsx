import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  ShoppingBasket,
  Star,
  Plus,
  Delete,
  Search,
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  Tag,
  PlusCircle,
  Wrench,
  Grid2x2,
  Trash2,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/Primitives";
import { catalog, catalogCategories } from "@/data/mock";

const KEYS = ["1","2","3","4","5","6","7","8","9","C","0","del"];
const TABS = ["keyin", "catalog", "quicklist"];

function Segmented({ value, onChange }) {
  const items = [
    { id: "keyin", label: "Key In", icon: Calculator, testid: "seg-keyin" },
    { id: "catalog", label: "Catalog", icon: ShoppingBasket, testid: "seg-catalog" },
    { id: "quicklist", label: "Quick List", icon: Star, testid: "seg-quicklist" },
  ];
  const activeIdx = items.findIndex((i) => i.id === value);
  return (
    <div
      className="relative grid grid-cols-3 gap-1 p-1 rounded-[18px]"
      style={{
        background: "rgba(22, 22, 26, 0.85)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      data-testid="segmented-control"
    >
      {/* Sliding pill */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 rounded-[14px] pointer-events-none"
        style={{
          width: "calc(33.333% - 5px)",
          left: `calc(${activeIdx} * 33.333% + 4px)`,
          background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
          boxShadow: "0 6px 18px rgba(0,245,160,0.35)",
          transition: "left 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {items.map((it) => {
        const active = value === it.id;
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            data-testid={it.testid}
            onClick={() => onChange(it.id)}
            className="relative h-11 rounded-[14px] flex items-center justify-center gap-1.5 jh-press z-[1]"
          >
            <Icon size={14} color={active ? "#0A0A0B" : "#A3A3AC"} strokeWidth={2.2} />
            <span
              className={`text-[12px] font-semibold tracking-tight ${
                active ? "text-[#0A0A0B]" : "text-[#A3A3AC]"
              }`}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function KeyInView({ cents, setCents }) {
  const press = (k) => {
    if (k === "del") return setCents((c) => Math.floor(c / 10));
    if (k === "C") return setCents(0);
    setCents((c) => {
      const next = c * 10 + parseInt(k, 10);
      return next > 9_999_999 ? c : next;
    });
  };
  const amount = (cents / 100).toFixed(2);
  return (
    <div data-testid="keyin-view">
      <div className="px-1 flex items-start justify-between">
        <div>
          <div
            data-testid="amount-display"
            className={`jh-num font-bold leading-none ${
              cents === 0 ? "text-[#3F3F46]" : "text-white"
            }`}
            style={{ fontSize: "54px" }}
          >
            ${amount}
          </div>
        </div>
        <button
          data-testid="add-note-btn"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[14px] jh-press"
          style={{
            background: "rgba(0, 245, 160, 0.08)",
            border: "1px solid rgba(0, 245, 160, 0.25)",
            color: "#00F5A0",
          }}
        >
          <Plus size={14} strokeWidth={2.4} />
          <span className="text-[12px] font-semibold">Note</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {KEYS.map((k) => (
          <button
            key={k}
            data-testid={`key-${k.toLowerCase()}`}
            onClick={() => press(k)}
            className="jh-key h-[68px] rounded-[18px] flex items-center justify-center text-[26px] font-semibold text-white"
          >
            {k === "del" ? (
              <Delete size={22} color="#00F5A0" strokeWidth={2} />
            ) : k === "C" ? (
              <span className="text-[22px] font-bold text-[#00F5A0]">C</span>
            ) : (
              k
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const catIcons = {
  grid: Grid2x2,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  "shopping-bag": ShoppingBag,
  "credit-card": CreditCard,
  tag: Tag,
  "plus-circle": PlusCircle,
  tool: Wrench,
};

function CatalogView({ cart, setCart, query, setQuery }) {
  const [cat, setCat] = useState("all");
  const items = catalog.filter(
    (p) =>
      (cat === "all" || p.category.toLowerCase() === cat) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  const add = (p) => setCart((c) => [...c, p]);

  return (
    <div data-testid="catalog-view">
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-[16px]"
        style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Search size={16} color="#6E6E78" />
        <input
          data-testid="catalog-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="flex-1 outline-none text-[13px] bg-transparent placeholder:text-[#6E6E78] text-white"
        />
      </div>

      <div className="mt-3 grid grid-cols-[110px_1fr] gap-3">
        <div
          className="rounded-[18px] p-1.5"
          style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto pr-1">
            {catalogCategories.map((c) => {
              const Icon = catIcons[c.icon] || Grid2x2;
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  data-testid={`cat-${c.id}`}
                  onClick={() => setCat(c.id)}
                  className="flex items-center gap-2 px-2 py-2.5 rounded-[12px] jh-press text-left"
                  style={{
                    background: active ? "rgba(0,245,160,0.08)" : "transparent",
                    boxShadow: active ? "inset 2px 0 0 #00F5A0" : "none",
                  }}
                >
                  <Icon size={14} color={active ? "#00F5A0" : "#A3A3AC"} strokeWidth={1.8} />
                  <span
                    className={`text-[11px] font-semibold tracking-tight ${
                      active ? "text-[#00F5A0]" : "text-[#A3A3AC]"
                    }`}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-[18px] overflow-hidden"
          style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-h-[320px] overflow-y-auto">
            {items.map((p, i, arr) => (
              <button
                key={p.id}
                data-testid={`product-${p.id}`}
                onClick={() => add(p)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 jh-press ${
                  i < arr.length - 1 ? "jh-hairline" : ""
                }`}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-10 h-10 rounded-[10px] object-cover"
                  style={{ background: "#1F1F24" }}
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <div className="flex-1 text-left min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">{p.name}</div>
                  <div className="text-[11px] text-[#A3A3AC] jh-num">${p.price.toFixed(2)}</div>
                </div>
                <span
                  className="grid place-items-center w-7 h-7 rounded-full"
                  style={{
                    background: "rgba(0,245,160,0.10)",
                    border: "1px solid rgba(0,245,160,0.25)",
                  }}
                >
                  <Plus size={14} color="#00F5A0" strokeWidth={2.6} />
                </span>
              </button>
            ))}
            {items.length === 0 && (
              <div className="py-8 text-center text-[12px] text-[#A3A3AC]">
                No products match.
              </div>
            )}
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="mt-3">
          <Card className="p-3" testid="cart-summary">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-[#A3A3AC] font-medium">
                {cart.length} item{cart.length > 1 ? "s" : ""} in order
              </div>
              <button
                data-testid="clear-cart"
                onClick={() => setCart([])}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#EF4444] jh-press"
              >
                <Trash2 size={12} /> Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cart.map((p, i) => (
                <span
                  key={`${p.id}-${i}`}
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{ background: "#1F1F24", color: "#FAFAFA" }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function QuickListView() {
  return (
    <div className="flex flex-col items-center text-center pb-2" data-testid="quicklist-view">
      <div
        className="grid place-items-center w-16 h-16 rounded-2xl mb-3 mt-4"
        style={{
          background: "rgba(0,245,160,0.10)",
          border: "1px solid rgba(0,245,160,0.25)",
        }}
      >
        <Star size={28} color="#00F5A0" strokeWidth={2} />
      </div>
      <div className="text-[16px] font-semibold text-white tracking-tight">
        No quick items yet
      </div>
      <div className="text-[12px] text-[#A3A3AC] mt-1 px-8 leading-relaxed">
        Add your most used items here for faster checkout.
      </div>

      <div
        className="mt-5 grid grid-cols-3 gap-2 w-full max-w-[280px]"
        style={{
          padding: "10px",
          borderRadius: "20px",
          border: "1.5px dashed rgba(0,245,160,0.3)",
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[14px]"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {i === 4 && (
              <div className="w-full h-full grid place-items-center">
                <span
                  className="grid place-items-center w-9 h-9 rounded-full"
                  style={{
                    background: "rgba(0,245,160,0.12)",
                    border: "1.5px solid rgba(0,245,160,0.45)",
                  }}
                >
                  <Plus size={18} color="#00F5A0" strokeWidth={2.6} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-[11px] text-[#6E6E78] mt-3 leading-relaxed">
        Tap and hold items from{" "}
        <span style={{ color: "#00F5A0" }}>Catalog</span> to add them here.
      </div>
    </div>
  );
}

/* ---------------- Swipeable carousel ---------------- */

function SwipeDots({ idx }) {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-3" data-testid="swipe-dots">
      {TABS.map((t, i) => (
        <span
          key={t}
          className="rounded-full transition-all"
          style={{
            width: i === idx ? 18 : 5,
            height: 5,
            background: i === idx ? "#00F5A0" : "rgba(255,255,255,0.18)",
            boxShadow: i === idx ? "0 0 8px rgba(0,245,160,0.6)" : "none",
            transition: "width 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease",
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("keyin");
  const [cents, setCents] = useState(0);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");

  const idx = TABS.indexOf(tab);

  // Swipe state
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackerRef = useRef({
    startX: 0,
    startY: 0,
    lock: null, // 'h' | 'v' | null
    pointerId: null,
    swiped: false,
  });

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // Do NOT setPointerCapture here — it would hijack the synthesized click on pure taps.
    trackerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lock: null,
      pointerId: e.pointerId,
      swiped: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const t = trackerRef.current;
    if (!dragging || e.pointerId !== t.pointerId) return;
    const dx = e.clientX - t.startX;
    const dy = e.clientY - t.startY;

    if (!t.lock) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      t.lock = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      if (t.lock === "v") {
        setDragging(false);
        return;
      }
      // Engage capture only once we know this is a horizontal swipe — preserves taps.
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
    }

    if (t.lock === "h") {
      t.swiped = Math.abs(dx) > 6;
      let resisted = dx;
      if ((idx === 0 && dx > 0) || (idx === TABS.length - 1 && dx < 0)) {
        resisted = dx * 0.3;
      }
      setDragX(resisted);
    }
  };

  const onPointerUp = (e) => {
    const t = trackerRef.current;
    if (!dragging || e.pointerId !== t.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
    setDragging(false);
    const threshold = 50;
    if (dragX < -threshold && idx < TABS.length - 1) setTab(TABS[idx + 1]);
    else if (dragX > threshold && idx > 0) setTab(TABS[idx - 1]);
    setDragX(0);
  };

  // Block clicks (e.g., on keypad buttons) that happen right after a swipe gesture.
  const onClickCapture = (e) => {
    if (trackerRef.current.swiped) {
      e.stopPropagation();
      e.preventDefault();
      trackerRef.current.swiped = false;
    }
  };

  const cartTotal = cart.reduce((s, p) => s + p.price, 0);
  const grandTotal = tab === "catalog" ? cartTotal * 100 + cents : cents;
  const canCharge = grandTotal > 0;
  const grandStr = (grandTotal / 100).toFixed(2);

  const onCharge = () => {
    if (!canCharge) return;
    navigate("/success", { state: { amount: grandTotal / 100 } });
  };

  return (
    <div className="pb-6" data-testid="home-page">
      <TopBar />

      <div className="px-4 pt-3">
        <Segmented value={tab} onChange={setTab} />
        <SwipeDots idx={idx} />
      </div>

      {/* Swipe carousel */}
      <div
        className="overflow-hidden mt-2"
        data-testid="swipe-carousel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex"
          style={{
            width: "100%",
            transform: `translate3d(calc(${-idx * 100}% + ${dragX}px), 0, 0)`,
            transition: dragging
              ? "none"
              : "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="px-4 pt-3"
            style={{ minWidth: "100%", flexShrink: 0 }}
            data-testid="slide-keyin"
          >
            <KeyInView cents={cents} setCents={setCents} />
          </div>
          <div
            className="px-4 pt-3"
            style={{ minWidth: "100%", flexShrink: 0 }}
            data-testid="slide-catalog"
          >
            <CatalogView cart={cart} setCart={setCart} query={query} setQuery={setQuery} />
          </div>
          <div
            className="px-4 pt-3"
            style={{ minWidth: "100%", flexShrink: 0 }}
            data-testid="slide-quicklist"
          >
            <QuickListView />
          </div>
        </div>
      </div>

      {/* Charge bar */}
      <div
        className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px]"
        style={{ zIndex: 30 }}
      >
        <button
          data-testid="charge-btn"
          disabled={!canCharge}
          onClick={onCharge}
          className="w-full h-[58px] rounded-[22px] font-semibold text-[16px] jh-press inline-flex items-center justify-center gap-2 disabled:opacity-50"
          style={{
            background: canCharge
              ? "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)"
              : "#1F1F24",
            color: canCharge ? "#0A0A0B" : "#6E6E78",
            boxShadow: canCharge ? "0 10px 28px rgba(0,245,160,0.40)" : "none",
            border: canCharge ? "none" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <CreditCard size={18} strokeWidth={2.4} />
          Charge ${grandStr}
        </button>
      </div>
    </div>
  );
}
