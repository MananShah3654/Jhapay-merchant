import React from "react";
import { Smartphone, Wifi, Battery, BatteryLow, MoreVertical, Plus, RefreshCw, Printer } from "lucide-react";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/Primitives";
import { devices } from "@/data/mock";

function statusColor(s) {
  if (s === "online") return { fg: "#00F5A0", bg: "rgba(0,245,160,0.12)", label: "Online" };
  if (s === "needs-update") return { fg: "#F59E0B", bg: "rgba(245,158,11,0.14)", label: "Update available" };
  return { fg: "#EF4444", bg: "rgba(239,68,68,0.14)", label: "Offline" };
}

function iconFor(name) {
  if (name.toLowerCase().includes("printer")) return Printer;
  if (name.toLowerCase().includes("reader")) return Wifi;
  return Smartphone;
}

export default function DevicesPage() {
  return (
    <div className="pb-32" data-testid="devices-page">
      <TopBar />
      <div className="px-5 mt-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[26px] font-bold tracking-tight text-white">Devices</div>
            <div className="text-[12px] text-[#A3A3AC] mt-0.5">2 active · 1 offline</div>
          </div>
          <button
            data-testid="add-device-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[14px] jh-press"
            style={{
              background: "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
              color: "#0A0A0B",
              boxShadow: "0 8px 22px rgba(0,245,160,0.35)",
            }}
          >
            <Plus size={14} strokeWidth={2.6} />
            <span className="text-[12px] font-bold">Add</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 jh-stagger">
          {devices.map((d) => {
            const Icon = iconFor(d.name);
            const s = statusColor(d.status);
            const BatIcon = d.battery && d.battery < 30 ? BatteryLow : Battery;
            return (
              <Card key={d.id} className="p-4" testid={`device-${d.id}`}>
                <div className="flex items-start gap-3">
                  <div
                    className="grid place-items-center w-11 h-11 rounded-[14px] shrink-0"
                    style={{
                      background: "rgba(0,245,160,0.08)",
                      border: "1px solid rgba(0,245,160,0.20)",
                    }}
                  >
                    <Icon size={18} color="#00F5A0" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[14px] font-semibold text-white truncate">
                        {d.name}
                      </div>
                      <button className="grid place-items-center w-7 h-7 rounded-full jh-press">
                        <MoreVertical size={14} color="#6E6E78" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#A3A3AC] mt-0.5">{d.model}</div>
                    <div className="text-[10px] text-[#6E6E78] mt-0.5 jh-num">{d.serial}</div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: s.bg, color: s.fg }}
                      >
                        ● {s.label}
                      </span>
                      <span className="text-[10px] text-[#A3A3AC]">{d.last}</span>
                      {d.battery !== null && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#A3A3AC]">
                          <BatIcon size={12} color={d.battery < 30 ? "#EF4444" : "#A3A3AC"} />
                          {d.battery}%
                        </span>
                      )}
                    </div>

                    {d.status === "needs-update" && (
                      <button
                        data-testid={`update-${d.id}`}
                        className="mt-3 w-full h-10 rounded-[14px] inline-flex items-center justify-center gap-2 jh-press"
                        style={{
                          background: "rgba(245,158,11,0.10)",
                          border: "1px solid rgba(245,158,11,0.30)",
                          color: "#F59E0B",
                        }}
                      >
                        <RefreshCw size={13} strokeWidth={2.4} />
                        <span className="text-[12px] font-semibold">Update to v3.2</span>
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
