import React from "react";
import {
  ChevronRight,
  LogOut,
  ClipboardList,
  ShoppingBag,
  Package,
  Users,
  IdCard,
  ArrowLeftRight,
  BarChart3,
  FileText,
  Globe,
  Landmark,
  Wallet,
  Coins,
  CreditCard,
  Settings,
  MonitorSmartphone,
  Bell,
  LifeBuoy,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/Primitives";
import { merchant, moreSections } from "@/data/mock";

const iconMap = {
  "clipboard-list": ClipboardList,
  "shopping-bag": ShoppingBag,
  "package": Package,
  "users": Users,
  "id-card": IdCard,
  "arrow-left-right": ArrowLeftRight,
  "bar-chart-3": BarChart3,
  "file-text": FileText,
  "globe": Globe,
  "landmark": Landmark,
  "wallet": Wallet,
  "coins": Coins,
  "credit-card": CreditCard,
  "settings": Settings,
  "monitor-smartphone": MonitorSmartphone,
  "bell": Bell,
  "life-buoy": LifeBuoy,
};

function Tile({ item }) {
  const Icon = iconMap[item.icon] || ClipboardList;
  return (
    <button
      data-testid={`more-${item.id}`}
      className="rounded-[18px] flex flex-col items-center gap-2 py-4 jh-press"
      style={{
        background: "#16161A",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Icon size={26} color={item.color} strokeWidth={1.8} />
      <span className="text-[11px] font-semibold text-white tracking-tight text-center px-2 leading-tight">
        {item.label}
      </span>
    </button>
  );
}

export default function MorePage() {
  return (
    <div className="pb-6" data-testid="more-page">
      <TopBar />
      <div className="px-5 mt-3">
        <div className="text-[26px] font-bold tracking-tight text-white">More</div>
        <div className="text-[12px] text-[#A3A3AC] mt-0.5">{merchant.business}</div>

        {/* Front counter card */}
        <Card className="mt-4 p-3 flex items-center gap-3" testid="profile-card">
          <img
            src={merchant.avatar}
            alt="merchant"
            className="w-11 h-11 rounded-full object-cover"
            style={{ border: "2px solid rgba(0,245,160,0.35)" }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-white tracking-tight">
              Front Counter
            </div>
            <div className="text-[11px] text-[#A3A3AC]">Standard Mode</div>
          </div>
          <ChevronRight size={16} color="#6E6E78" />
        </Card>

        {/* Sign out (red row) */}
        <button
          data-testid="more-logout"
          className="mt-2 w-full rounded-[16px] py-3.5 jh-press inline-flex items-center justify-center gap-2"
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
          }}
        >
          <LogOut size={15} className="text-[#EF4444]" strokeWidth={2.2} />
          <span className="text-[13px] font-semibold text-[#EF4444]">Sign Out</span>
        </button>

        {/* Sections */}
        {moreSections.map((sec) => (
          <div key={sec.title} className="mt-5">
            <div className="px-1 mb-2 text-[11px] font-semibold text-[#6E6E78] uppercase tracking-wider">
              {sec.title}
            </div>
            <div className="grid grid-cols-4 gap-2" data-testid={`group-${sec.title.toLowerCase().split(" ")[0]}`}>
              {sec.items.map((it) => (
                <Tile key={it.id} item={it} />
              ))}
            </div>
          </div>
        ))}

        <div className="text-center text-[10px] text-[#6E6E78] mt-6">
          JhaPay · v1.0.0
        </div>
      </div>
    </div>
  );
}
