import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Calculator, ArrowLeftRight, MonitorSmartphone, Bell, LayoutGrid } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Calculator, testid: "nav-home" },
  { to: "/activity", label: "Activity", icon: ArrowLeftRight, testid: "nav-activity" },
  { to: "/devices", label: "Devices", icon: MonitorSmartphone, badge: 2, testid: "nav-devices" },
  { to: "/alerts", label: "Alerts", icon: Bell, badge: 1, testid: "nav-alerts" },
  { to: "/more", label: "More", icon: LayoutGrid, testid: "nav-more" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px]"
      style={{ zIndex: 10001 }}
      data-testid="bottom-nav"
    >
      <div className="jh-glass-strong jh-shadow-float rounded-[34px] px-2 py-2 flex items-center justify-between">
        {tabs.map((t) => {
          const active = location.pathname === t.to;
          const Icon = t.icon;
          return (
            <NavLink
              key={t.to}
              to={t.to}
              data-testid={t.testid}
              className="flex-1"
            >
              <div
                className={`relative flex flex-col items-center justify-center rounded-[26px] py-2 jh-press ${
                  active ? "" : ""
                }`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)",
                        boxShadow: "0 8px 22px rgba(0,245,160,0.35)",
                      }
                    : {}
                }
              >
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.4 : 1.8}
                    color={active ? "#0A0A0B" : "#A3A3AC"}
                  />
                  {t.badge && !active && (
                    <span
                      data-testid={`${t.testid}-badge`}
                      className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#EF4444] text-white text-[9px] font-bold grid place-items-center"
                    >
                      {t.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-0.5 font-semibold tracking-tight ${
                    active ? "text-[#0A0A0B]" : "text-[#A3A3AC]"
                  }`}
                >
                  {t.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
