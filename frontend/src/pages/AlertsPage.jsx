import React, { useState } from "react";
import { Bell, Info, AlertTriangle, CheckCircle2, MailCheck } from "lucide-react";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/Primitives";
import { alerts as initial } from "@/data/mock";

function iconForType(t) {
  if (t === "warning") return { Icon: AlertTriangle, color: "#F59E0B" };
  if (t === "success") return { Icon: CheckCircle2, color: "#00F5A0" };
  return { Icon: Info, color: "#3B82F6" };
}

export default function AlertsPage() {
  const [items, setItems] = useState(initial);

  const unreadCount = items.filter((a) => a.unread).length;

  const markAll = () => setItems((arr) => arr.map((a) => ({ ...a, unread: false })));

  return (
    <div className="pb-32" data-testid="alerts-page">
      <TopBar />
      <div className="px-5 mt-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[26px] font-bold tracking-tight text-[color:var(--jh-text)]">Alerts</div>
            <div className="text-[12px] text-[color:var(--jh-text-2)] mt-0.5">
              {unreadCount} unread · {items.length} total
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              data-testid="mark-all-read"
              onClick={markAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[14px] text-[12px] font-semibold jh-press"
              style={{
                background: "rgba(0,245,160,0.08)",
                border: "1px solid rgba(0,245,160,0.20)",
                color: "var(--jh-primary)",
              }}
            >
              <MailCheck size={13} /> Mark all read
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2.5 jh-stagger">
          {items.map((a) => {
            const { Icon, color } = iconForType(a.type);
            return (
              <Card
                key={a.id}
                className="p-4"
                testid={`alert-${a.id}`}
                style={a.unread ? { borderColor: "rgba(0,245,160,0.30)" } : {}}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid place-items-center w-9 h-9 rounded-[12px] shrink-0"
                    style={{
                      background: `${color}1F`,
                      border: `1px solid ${color}55`,
                    }}
                  >
                    <Icon size={15} color={color} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[13px] font-semibold text-[color:var(--jh-text)]">{a.title}</div>
                      {a.unread && (
                        <span
                          className="mt-1 w-2 h-2 rounded-full shrink-0"
                          style={{ background: "var(--jh-primary)", boxShadow: "0 0 8px #00F5A0" }}
                        />
                      )}
                    </div>
                    <div className="text-[12px] text-[color:var(--jh-text-2)] mt-1 leading-relaxed">
                      {a.body}
                    </div>
                    <div className="text-[10px] text-[color:var(--jh-text-3)] mt-2">{a.time}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-14">
            <Bell size={28} color="var(--jh-text-3)" className="mx-auto mb-2" />
            <div className="text-[13px] text-[color:var(--jh-text-2)]">No alerts. You're all caught up.</div>
          </div>
        )}
      </div>
    </div>
  );
}
