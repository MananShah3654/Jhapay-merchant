import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function SubPageHeader({ eyebrow, title, action, backTo }) {
  const navigate = useNavigate();
  const goBack = () => (backTo ? navigate(backTo) : navigate(-1));
  return (
    <header
      className="sticky top-0 z-30 jh-glass px-5 pt-5 pb-3 flex items-center gap-3"
      data-testid="sub-page-header"
    >
      <button
        data-testid="back-btn"
        onClick={goBack}
        className="grid place-items-center w-10 h-10 rounded-full jh-press shrink-0"
        style={{ background: "var(--jh-surface)", border: "1px solid var(--jh-border-soft)" }}
        aria-label="Back"
      >
        <ChevronLeft size={18} color="var(--jh-text)" />
      </button>
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <div className="text-[11px] text-[color:var(--jh-text-2)] font-medium">{eyebrow}</div>
        )}
        <div className="text-[20px] font-bold tracking-tight text-[color:var(--jh-text)] truncate">
          {title}
        </div>
      </div>
      {action}
    </header>
  );
}
