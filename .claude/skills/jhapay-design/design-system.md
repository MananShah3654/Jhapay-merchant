# JhaPay Design System — Reference

The complete design reference for the JhaPay merchant app. Every value here is
the **ground truth** as implemented in [frontend/src/index.css](../../../frontend/src/index.css)
and the chrome components. Match these exactly when building or editing UI.

> ⚠️ **Two sources, one truth.** The repo also contains
> [design_guidelines.json](../../../design_guidelines.json), which describes an
> *older light "organic/earthy"* concept (primary `#18B76A`, white cards, dark
> text). **The shipped app does not use it.** The implemented system is the
> **premium dark fintech** theme documented below. When they disagree, this file
> and `index.css` win. Treat `design_guidelines.json` as historical.

---

## 1. Identity

- **Archetype:** premium dark fintech — think Apple-grade polish on near-black.
- **Feel:** ultra-clean, minimal, highly rounded, one-hand mobile usability, zero clutter.
- **Signature:** a single neon-mint green (`#00F5A0`) glowing against deep charcoal, used sparingly for the one primary action on each screen.

---

## 2. Color tokens (dark — authoritative)

Defined as CSS variables on `:root` in `index.css`. Prefer the variable; the hex
is given for inline `style={{}}` use (the codebase uses hex literals inline a lot).

| Token | Variable | Hex | Use |
|---|---|---|---|
| Primary | `--jh-primary` | `#00F5A0` | Primary action, active states, brand glow |
| Primary strong | `--jh-primary-strong` | `#00D78A` | Gradient bottom stop, pressed primary |
| Primary dim | `--jh-primary-dim` | `rgba(0,245,160,0.14)` | Tinted active key / chip background |
| Primary glow | `--jh-primary-glow` | `rgba(0,245,160,0.35)` | Shadows/halos around green elements |
| Success | `--jh-success` | `#16A34A` | Positive amounts, confirmations |
| Warning | `--jh-warning` | `#F59E0B` | Low-stock, caution |
| Danger | `--jh-danger` | `#EF4444` | Errors, refunds, badge counts |
| Info | `--jh-info` | `#3B82F6` | Informational accents |
| Background | `--jh-bg` | `#0A0A0B` | App canvas (the deepest layer) |
| Surface | `--jh-surface` | `#16161A` | Cards, sheets |
| Surface 2 | `--jh-surface-2` | `#1F1F24` | Inputs, raised chips, secondary buttons |
| Surface 3 | `--jh-surface-3` | `#2A2A31` | Hover / third elevation |
| Border | `--jh-border` | `#2A2A31` | Standard 1px borders |
| Border soft | `--jh-border-soft` | `#1F1F24` | Subtle dividers |
| Text | `--jh-text` | `#FAFAFA` | Primary text |
| Text 2 | `--jh-text-2` | `#A3A3AC` | Secondary text, inactive icons |
| Text 3 | `--jh-text-3` | `#6E6E78` | Placeholders, tertiary |
| Icon | `--jh-icon` | `#A3A3AC` | Default icon color |

Tailwind's shadcn HSL tokens in `index.css` mirror these (e.g. `--primary: 158 100% 48%` = `#00F5A0`, `--radius: 18px`). shadcn/ui components (`@/components/ui/*`) inherit them automatically.

**The primary green gradient** (used on the active nav pill, send button, AI orb):
```css
linear-gradient(180deg, #00F5A0 0%, #00D78A 100%)
/* radial variant for the orb: */
radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%)
```

**Forbidden:** purple of any kind (`#9D4CDD`, `#7351B7`), light/white backgrounds as
the canvas, filled heavy icons, sharp corners, dense enterprise tables.

---

## 3. Typography

```
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Geist',
             'Inter', 'Helvetica Neue', Arial, sans-serif;
letter-spacing: -0.011em;   /* global tightening */
```

- **Tight tracking** everywhere (`tracking-tight`). Large bold titles, small muted secondary text.
- **Numbers:** wrap any amount/metric in `.jh-num` — enables tabular figures, `ss01`, and `-0.04em` tracking so digits align in columns. Always use it for money and stats.
- **Brand mark:** `.jh-brand` switches to `Geist Mono` for the "JhaPay" wordmark.
- Suggested scale: title `text-[28px]–text-4xl font-bold`, section `text-[15px] font-semibold`, body `text-[14px]`, secondary `text-[12px] text-[#A3A3AC]`, caption `text-[10px]–text-[11px]`.

---

## 4. Border radius — everything is soft

Nothing has sharp corners. Use bracket radii (not Tailwind's default `rounded-lg`):

| Element | Radius |
|---|---|
| Phone frame (desktop) | `44px` |
| Bottom sheet / modal top | `rounded-t-[32px]` |
| Bottom navigation bar | `rounded-[34px]` |
| Nav active pill | `rounded-[26px]` |
| Cards / floating cards | `rounded-[24px]`–`rounded-[26px]` |
| Inputs / chip rows | `rounded-[22px]` / `rounded-[16px]` |
| Message bubbles | `rounded-[20px]` (one corner tightened to `8px` for the "tail") |
| Buttons | `rounded-[18px]` (shadcn `--radius`) |
| FABs / orb / avatars / dots | `rounded-full` |

---

## 5. Glass, shadows & surfaces

**Glassmorphism** is core to the chrome (header, bottom nav, sheets). Two classes:

```css
.jh-glass        /* header bars: blur(18px), bg rgba(10,10,11,0.78), hairline bottom */
.jh-glass-strong /* nav + sheets: blur(28px), bg rgba(22,22,26,0.86), 1px white/6% border */
```

**Shadows** (dark-tuned — never a soft light-mode shadow):

```css
.jh-shadow-card   /* resting cards: inset top highlight + 0 8px 24px black/35% */
.jh-shadow-float  /* floating nav/cards: 0 10px 30px black/50% + inset highlight */
.jh-shadow-orb    /* AI orb: layered green halo + inner bevel */
.jh-glow-green    /* green ring + soft green drop for emphasized elements */
```

**Layering rule:** `#0A0A0B` canvas → `#16161A` card → `#1F1F24` input/chip → `#2A2A31` hover. Borders are 1px `rgba(255,255,255,0.04–0.08)`, never solid grey.

---

## 6. Motion & micro-interactions

All defined in `index.css`. Reach for these before writing new animations.

| Class / keyframe | Effect | Where |
|---|---|---|
| `.jh-press` | `scale(0.97)` on `:active`, 120ms | Every tappable element |
| `.jh-float` | gentle 4px vertical bob, 4s loop | AI orb |
| `.jh-orb-pulse` | expanding green ring pulse, 2.6s | AI orb halo |
| `.jh-sheet-in` | slide up from 100% + fade, cubic-bezier(.22,1,.36,1) | Bottom sheets |
| `.jh-fade-in` | fade + 8px rise, 360ms | Cards on mount |
| `.jh-stagger` | children fade in with 40–390ms cascade | Lists / dashboards |
| `.jh-skeleton` | shimmer loading placeholder (dark) | Loading states |
| `.jh-confetti` | falling confetti pieces | Success screen |
| `.jh-dot-live` | pulsing green dot | "Tap to Pay" live indicator |
| `.jh-key` | keypad key with green pressed tint | POS numeric keypad |

`framer-motion` is available for anything bespoke, but match these durations/easings.

---

## 7. Icons

- **Library:** `lucide-react` only.
- **Style:** rounded outline, SF-Symbols-like. `strokeWidth` ~`1.8` inactive, `2.4` active. Typical `size={20}`.
- **Color:** `#A3A3AC` default; `#0A0A0B` when sitting on the green gradient; `#00F5A0` for green accents.
- No filled/heavy icon sets.

---

## 8. Layout & chrome

- **Mobile-first, single column.** `PhoneFrame` (`.jh-phone-frame`) caps width at **440px**, centered; on ≥768px it becomes a floating phone (44px radius, deep shadow, `body.jh-stage` radial backdrop).
- **Generous spacing.** Lots of breathing room; page content uses `pb-[120px]` to clear the floating nav.
- **Touch targets** ≥ 48×48px.
- **Bottom navigation** ([BottomNav.jsx](../../../frontend/src/components/BottomNav.jsx)): fixed, floating, `jh-glass-strong` + `jh-shadow-float`, `rounded-[34px]`, `zIndex 10001`. **5 tabs:** Home, Activity, Devices, Alerts, More. Active tab = green gradient pill with `#0A0A0B` icon+label; badges are `#EF4444` dots.
  - *(Note: the stale JSON lists different tabs — the real tabs are the five above.)*
- **AI Assistant** ([AIAssistant.jsx](../../../frontend/src/components/AIAssistant.jsx)): a floating 56px green **orb**, fixed `right-5 bottom-160`, `jh-float` + `jh-orb-pulse` + `jh-shadow-orb`, `zIndex 10000`. Opens a 78dvh `jh-glass-strong` bottom sheet with chat bubbles.

---

## 9. Component patterns (copy these shapes)

**Card**
```jsx
<div className="jh-shadow-card jh-fade-in rounded-[24px] p-5"
     style={{ background: "#16161A", border: "1px solid rgba(255,255,255,0.06)" }}>
  …
</div>
```

**Primary action (green gradient + press)**
```jsx
<button data-testid="collect-pay" className="jh-press rounded-[18px] py-3 font-semibold"
        style={{ background: "linear-gradient(180deg,#00F5A0 0%,#00D78A 100%)",
                 color: "#0A0A0B", boxShadow: "0 8px 22px rgba(0,245,160,0.35)" }}>
  Collect
</button>
```

**Secondary surface / input**
```jsx
<div className="rounded-[22px] px-4 py-2.5"
     style={{ background: "#1F1F24", border: "1px solid rgba(255,255,255,0.08)" }} />
```

**Amount / stat** — always `jh-num`:
```jsx
<div className="jh-num text-[34px] font-bold text-white">$1,284.50</div>
```

---

## 10. Testability (required)

Every interactive **and** key informational element **must** carry a
`data-testid` in **kebab-case** (e.g. `nav-home`, `ai-orb`, `collect-pay`,
`phone-frame`). This is enforced convention across the codebase — see existing
test-id constants in [frontend/src/constants/testIds](../../../frontend/src/constants/testIds).

---

## 11. Do / Don't

**Do**
- Use the exact hex/variable tokens above.
- Keep one green primary action per screen; everything else is surface/text.
- Use bracket radii, glass chrome, and the `jh-*` motion classes.
- Wrap money/metrics in `.jh-num`. Add `data-testid` to everything tappable.

**Don't**
- Introduce ad-hoc light backgrounds in dark mode, purple, Material components, or sharp corners. (For light mode, use the official light theme below — never one-off white surfaces.)
- Hand-roll shadows/animations when a `jh-*` class exists.
- Trust `design_guidelines.json` over `index.css`.
- Use tiny buttons or dense tables.

---

## 12. Light theme (opt-in)

A sanctioned light skin lives in `index.css`, gated by `[data-theme="light"]` on
`<html>`. **Dark is the default**; light turns on only when that attribute is set.
The mint is deepened to `#00C27A` for legibility on white; green-filled buttons keep
the bright gradient.

| Role | Dark | Light |
|---|---|---|
| Primary | `#00F5A0` | `#00C27A` |
| Background | `#0A0A0B` | `#F4F6F5` |
| Surface / input | `#16161A` / `#1F1F24` | `#FFFFFF` / `#EDF1EF` |
| Text / secondary | `#FAFAFA` / `#A3A3AC` | `#0F1715` / `#5C6B65` |
| Border | `#2A2A31` | `#E2E7E4` |

The `[data-theme="light"]` block overrides every `--jh-*` and shadcn HSL token plus
light variants of `.jh-glass(-strong)`, `.jh-shadow-card/float/orb`, `.jh-glow-green`,
`.jh-skeleton`, and `.jh-key`. Toggle with
`document.documentElement.dataset.theme = "light"` (remove the attribute for dark).

> **Caveat:** components that read tokens (`var(--jh-*)`, `hsl(var(--…))`) switch
> automatically; existing screens that hard-code hex inline won't repaint until
> migrated to the variables. The full portable spec (with copy-paste CSS) is in
> [asset.md](../../../asset.md) §9.
