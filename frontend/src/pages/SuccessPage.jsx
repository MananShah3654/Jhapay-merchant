import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Share2, Home as HomeIcon } from "lucide-react";

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ["#00F5A0", "#22C55E", "#F59E0B", "#3B82F6", "#A78BFA"];
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 250,
      dx: (Math.random() - 0.5) * 260,
      rot: 180 + Math.random() * 540,
      color: colors[i % colors.length],
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
    }));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="jh-confetti"
          style={{
            left: `${p.left}%`,
            top: "20%",
            background: p.color,
            width: p.w,
            height: p.h,
            animationDelay: `${p.delay}ms`,
            ["--dx"]: `${p.dx}px`,
            ["--rot"]: `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const amount = state?.amount ?? 0;
  const [txId] = useState(
    () => `JHP-${Math.floor(Math.random() * 9_000_000 + 1_000_000)}`
  );

  useEffect(() => {
    if (amount <= 0) {
      const t = setTimeout(() => navigate("/", { replace: true }), 0);
      return () => clearTimeout(t);
    }
  }, [amount, navigate]);

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-between px-6 pt-16 pb-10"
      style={{
        background:
          "radial-gradient(800px 400px at 50% 0%, rgba(0,245,160,0.20) 0%, rgba(0,245,160,0) 60%), #0A0A0B",
      }}
      data-testid="success-page"
    >
      <Confetti />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div
          className="grid place-items-center w-24 h-24 rounded-full jh-fade-in"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%)",
            boxShadow:
              "0 20px 50px rgba(0,245,160,0.55), inset 0 -8px 16px rgba(0,0,0,0.18)",
          }}
        >
          <Check size={48} color="#0A0A0B" strokeWidth={3.4} />
        </div>
        <div className="mt-7 text-[14px] text-[#A3A3AC] font-medium jh-fade-in">
          Payment received
        </div>
        <div
          className="mt-1 jh-num font-bold text-white jh-fade-in"
          style={{ fontSize: "48px" }}
        >
          ${amount.toFixed(2)}
        </div>
        <div className="mt-2 text-[12px] text-[#6E6E78] jh-num" data-testid="tx-id">
          Transaction · {txId}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5 relative z-10">
        <button
          data-testid="share-receipt-btn"
          className="w-full h-[54px] rounded-[20px] font-semibold text-[15px] inline-flex items-center justify-center gap-2 jh-press"
          style={{
            background: "#16161A",
            color: "#FAFAFA",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Share2 size={16} /> Share receipt
        </button>
        <button
          data-testid="done-btn"
          onClick={() => navigate("/")}
          className="w-full h-[58px] rounded-[20px] font-semibold text-[16px] jh-press inline-flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
            color: "#0A0A0B",
            boxShadow: "0 10px 28px rgba(0,245,160,0.45)",
          }}
        >
          <HomeIcon size={16} strokeWidth={2.4} /> Done
        </button>
      </div>
    </div>
  );
}
