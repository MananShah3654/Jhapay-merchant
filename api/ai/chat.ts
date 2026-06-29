import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// ----- Mock merchant context fed to the AI assistant -----
const MERCHANT_CONTEXT = `
You are JhaPay AI, the in-app assistant for a coffee + bakery merchant named "Maya Cafe" using the JhaPay merchant app.

Live business snapshot (today):
- Today's sales: $1,284.50 (32 transactions)
- Yesterday: $1,102.00 (28 transactions)
- 7-day average: $1,150
- Wallet balance: $4,326.18
- Pending settlement: $612.40 (lands tomorrow 9am)
- Top sellers today: Iced Latte (18), Croissant (14), Blueberry Muffin (11), Avocado Toast (9)
- Slow movers (last 14d): Matcha Tin, Almond Biscotti, Cold Brew Bottle 1L
- Refunds this week: 2 totaling $24.00 (Customer: Riya Sharma)
- Busy hours: 8-10am and 5-6pm
- Low stock: Oat Milk (3 left), Espresso Beans (1 bag), Brown Sugar Syrup (out)

Tone: warm, concise, premium, like an Apple product. Keep answers under 80 words, use friendly bullet points when listing.
Always speak in USD. Never mention you are an AI model. Never break character.
If asked something unrelated to the merchant business, gently steer back.
`.trim();

const MODEL = "claude-sonnet-4-5";

type ChatMessage = { role: "user" | "assistant"; content: string };

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

function normalizeMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as Record<string, unknown>).messages;

  // Preferred shape: { messages: [{ role, content }] }
  if (Array.isArray(raw)) {
    const msgs: ChatMessage[] = [];
    for (const m of raw) {
      if (!m || typeof m !== "object") return null;
      const { role, content } = m as Record<string, unknown>;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
      if (!content.trim()) continue;
      msgs.push({ role, content });
    }
    return msgs.length ? msgs : null;
  }

  // Fallback shape: { message: "..." }
  const single = (body as Record<string, unknown>).message;
  if (typeof single === "string" && single.trim()) {
    return [{ role: "user", content: single }];
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  const messages = normalizeMessages(req.body);
  if (!messages || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "a non-empty messages array ending in a user turn is required" });
  }

  const sessionId =
    (req.body as Record<string, unknown> | undefined)?.session_id ?? null;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured" });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: MERCHANT_CONTEXT,
      messages,
    });

    let reply = "";
    for (const block of response.content) {
      if (block.type === "text") reply += block.text;
    }

    return res.status(200).json({ reply, session_id: sessionId });
  } catch (err) {
    console.error("AI chat error", err);
    return res.status(500).json({ error: "ai_error" });
  }
}
