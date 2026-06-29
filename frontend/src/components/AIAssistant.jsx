import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, ArrowUp } from "lucide-react";
import { promptSuggestions } from "@/data/mock";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-end h-4">
      <span
        className="w-1.5 h-1.5 rounded-full animate-bounce"
        style={{ animationDelay: "0ms", background: "var(--jh-text-2)" }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full animate-bounce"
        style={{ animationDelay: "120ms", background: "var(--jh-text-2)" }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full animate-bounce"
        style={{ animationDelay: "240ms", background: "var(--jh-text-2)" }}
      />
    </span>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey Maya 👋 I'm your JhaPay assistant. Ask me anything about your sales, inventory, or customers.",
    },
  ]);
  const scrollRef = useRef(null);
  const sessionRef = useRef(`jh_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (textRaw) => {
    const text = (textRaw ?? input).trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);

    // Build the conversation to send: prior turns (minus the canned greeting and
    // any empty placeholders) plus this new user message. The serverless function
    // is stateless, so the client carries the history.
    const history = messages
      .filter((mm) => mm.text)
      .slice(1)
      .map((mm) => ({ role: mm.role, content: mm.text }));
    history.push({ role: "user", content: text });

    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "" }]);
    try {
      const res = await axios.post(`${API}/ai/chat`, {
        messages: history,
        session_id: sessionRef.current,
      });
      const reply = res.data?.reply || "Sorry, I couldn't reach the server.";
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = { role: "assistant", text: reply };
        return next;
      });
    } catch (e) {
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = {
          role: "assistant",
          text: "Hmm, I couldn't reach the AI right now. Try again in a moment.",
        };
        return next;
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        data-testid="ai-orb"
        onClick={() => setOpen(true)}
        className="fixed right-5 jh-press jh-float"
        style={{ bottom: 160, zIndex: 10000 }}
        aria-label="Open AI assistant"
      >
        <span className="absolute inset-0 rounded-full jh-orb-pulse pointer-events-none" />
        <span
          className="relative grid place-items-center w-14 h-14 rounded-full jh-shadow-orb"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%)",
          }}
        >
          {/* icon stays dark — ink on the green orb (on-primary) */}
          <Sparkles size={22} color="#0A0A0B" strokeWidth={2.4} />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 10010 }}
          data-testid="ai-sheet"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 jh-fade-in" />
          <div
            className="absolute bottom-0 left-0 right-0 mx-auto max-w-[440px] jh-glass-strong jh-sheet-in rounded-t-[32px]"
            style={{
              height: "78dvh",
              boxShadow: "0 -30px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-3 pb-1 flex items-center justify-center">
              <div className="w-10 h-1.5 rounded-full" style={{ background: "var(--jh-surface-3)" }} />
            </div>

            <div className="px-5 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-9 h-9 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%)",
                    boxShadow: "0 8px 18px rgba(0,245,160,0.4)",
                  }}
                >
                  <Sparkles size={16} color="#0A0A0B" />
                </span>
                <div>
                  <div className="text-[15px] font-semibold tracking-tight text-[color:var(--jh-text)]">
                    JhaPay Assistant
                  </div>
                  <div className="text-[11px] text-[color:var(--jh-text-2)]">
                    Powered by Claude Sonnet 4.5
                  </div>
                </div>
              </div>
              <button
                data-testid="ai-close"
                onClick={() => setOpen(false)}
                className="grid place-items-center w-9 h-9 rounded-full jh-press"
                style={{ background: "var(--jh-surface-2)", border: "1px solid var(--jh-border-soft)" }}
              >
                <X size={16} color="var(--jh-icon)" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="px-5 pt-3 pb-2 overflow-y-auto"
              style={{ height: "calc(78dvh - 220px)" }}
            >
              <div className="flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "rounded-[20px] rounded-br-[8px]"
                          : "rounded-[20px] rounded-bl-[8px]"
                      }`}
                      style={
                        m.role === "user"
                          ? {
                              background:
                                "linear-gradient(180deg, var(--jh-primary) 0%, var(--jh-primary-strong) 100%)",
                              color: "#0A0A0B",
                              boxShadow: "0 6px 18px rgba(0,245,160,0.30)",
                            }
                          : {
                              background: "var(--jh-surface-2)",
                              color: "var(--jh-text)",
                              border: "1px solid var(--jh-border-soft)",
                            }
                      }
                    >
                      {m.text === "" ? <TypingDots /> : m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {messages.length <= 1 && (
              <div className="px-5 pt-1 pb-2">
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  {promptSuggestions.map((p) => (
                    <button
                      key={p}
                      data-testid={`ai-suggestion-${p.slice(0, 10)}`}
                      onClick={() => send(p)}
                      className="shrink-0 px-3.5 py-2 rounded-full text-[12px] jh-press"
                      style={{
                        background: "var(--jh-surface-2)",
                        color: "var(--jh-text)",
                        border: "1px solid var(--jh-border-soft)",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="px-4 pt-2 pb-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 rounded-[22px] px-4 py-2.5"
                style={{
                  background: "var(--jh-surface-2)",
                  border: "1px solid var(--jh-border-soft)",
                }}
              >
                <input
                  data-testid="ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about your business…"
                  className="flex-1 outline-none text-[14px] bg-transparent placeholder:text-[color:var(--jh-text-3)] text-[color:var(--jh-text)]"
                />
                <button
                  data-testid="ai-send"
                  type="submit"
                  disabled={!input.trim() || sending}
                  className="grid place-items-center w-9 h-9 rounded-full jh-press disabled:opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%)",
                    boxShadow: "0 6px 18px rgba(0,245,160,0.40)",
                  }}
                  aria-label="Send"
                >
                  {/* icon stays dark — ink on the green button (on-primary) */}
                  <ArrowUp size={16} color="#0A0A0B" strokeWidth={2.6} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
