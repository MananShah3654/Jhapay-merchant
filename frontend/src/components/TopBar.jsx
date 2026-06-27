import React from "react";
import { Wifi, User } from "lucide-react";

/**
 * Persistent top bar with JhaPay logo, Tap-to-Pay status indicator, and profile.
 */
export default function TopBar({ tapToPay = true, onProfile }) {
  return (
    <div
      className="sticky top-0 z-30 jh-glass px-5 pt-4 pb-3 flex items-center justify-between"
      data-testid="top-bar"
    >
      <div className="flex items-center gap-1.5">
        <span
          className="grid place-items-center w-6 h-6 rounded-md"
          style={{
            background:
              "linear-gradient(135deg, #00F5A0 0%, #00D78A 100%)",
            boxShadow: "0 4px 10px rgba(0,245,160,0.35)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 18 L13 6 L19 6 L11 18 Z M11 6 L19 18"
              stroke="#0A0A0B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="jh-brand text-[15px] font-bold tracking-tight text-white">
          Jha<span style={{ color: "#00F5A0" }}>Pay</span>
        </span>
      </div>

      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(0, 245, 160, 0.08)",
          border: "1px solid rgba(0, 245, 160, 0.18)",
        }}
        data-testid="tap-to-pay-indicator"
      >
        <span className="relative grid place-items-center w-3 h-3">
          <span
            className="absolute w-2 h-2 rounded-full jh-dot-live"
            style={{ background: "#00F5A0" }}
          />
          <Wifi size={10} color="#00F5A0" strokeWidth={2.5} />
        </span>
        <span className="text-[11px] font-semibold text-[#00F5A0] tracking-tight">
          {tapToPay ? "Tap to Pay" : "Offline"}
        </span>
      </div>

      <button
        data-testid="profile-btn"
        onClick={onProfile}
        className="relative grid place-items-center w-9 h-9 rounded-full jh-press"
        style={{
          background: "#1A1A1F",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <User size={16} color="#A3A3AC" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444]" />
      </button>
    </div>
  );
}
