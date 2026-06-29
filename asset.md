# JhaPay Theme Asset — Portable Design Tokens

A **self-contained, copy-paste** kit for reusing the JhaPay look (fonts, colors,
theme) in any other application. Nothing here depends on the JhaPay repo — paste
the blocks below into a new project and you have the same premium **dark fintech**
identity: neon-mint `#00F5A0` on near-black `#0A0A0B`, glassmorphism, soft radii,
Apple-grade motion.

Works with plain CSS, Tailwind, or any framework. Skip the sections you don't need.
A ready-made **light theme** variant (opt-in) is in **section 9**.

---

## 1. Fonts

Primary is the system SF Pro stack with **Geist** as the web fallback and a
**Geist Mono** brand/number face.

**Add to your `<head>` (or CSS `@import`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

**Font families:**
```css
/* Body / UI */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Geist',
             'Inter', 'Helvetica Neue', Arial, sans-serif;
letter-spacing: -0.011em;          /* global tightening — keep this */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

/* Brand mark / monospace numbers */
font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
```

**Type rules:** tight tracking everywhere (`letter-spacing: -0.011em`, headings
tighter). Suggested scale — title `28–48px / 700`, section `15px / 600`, body
`14px`, secondary `12px` muted, caption `10–11px`. Always render money/metrics with
the `.jh-num` class (section 4) for aligned tabular figures.

---

## 2. Colors

The full palette. Use the CSS variables; hex is provided for inline styles.

| Role | Variable | Hex |
|---|---|---|
| **Primary** | `--jh-primary` | `#00F5A0` |
| Primary strong | `--jh-primary-strong` | `#00D78A` |
| Primary dim | `--jh-primary-dim` | `rgba(0,245,160,0.14)` |
| Primary glow | `--jh-primary-glow` | `rgba(0,245,160,0.35)` |
| Success | `--jh-success` | `#16A34A` |
| Warning | `--jh-warning` | `#F59E0B` |
| Danger | `--jh-danger` | `#EF4444` |
| Info | `--jh-info` | `#3B82F6` |
| **Background** (canvas) | `--jh-bg` | `#0A0A0B` |
| Surface (cards/sheets) | `--jh-surface` | `#16161A` |
| Surface 2 (inputs/chips) | `--jh-surface-2` | `#1F1F24` |
| Surface 3 (hover) | `--jh-surface-3` | `#2A2A31` |
| Border | `--jh-border` | `#2A2A31` |
| Border soft | `--jh-border-soft` | `#1F1F24` |
| Text | `--jh-text` | `#FAFAFA` |
| Text 2 (secondary) | `--jh-text-2` | `#A3A3AC` |
| Text 3 (placeholder) | `--jh-text-3` | `#6E6E78` |
| Icon | `--jh-icon` | `#A3A3AC` |

**Signature green gradients:**
```css
/* buttons, active states */
background: linear-gradient(180deg, #00F5A0 0%, #00D78A 100%);
/* glowing orb / FAB */
background: radial-gradient(circle at 30% 25%, #4AF7B7 0%, #00F5A0 55%, #00B47A 100%);
```

**Forbidden:** purple (`#9D4CDD`, `#7351B7`), light/white canvas, filled heavy
icons, sharp corners, dense tables. Keep **one** green primary action per screen.

---

## 3. Drop-in CSS (`:root` variables)

Paste into your global stylesheet. Includes the JhaPay tokens **and** a matching
shadcn/ui-style HSL set so component libraries pick up the theme automatically.

```css
:root {
  /* Brand */
  --jh-primary: #00F5A0;
  --jh-primary-strong: #00D78A;
  --jh-primary-dim: rgba(0, 245, 160, 0.14);
  --jh-primary-glow: rgba(0, 245, 160, 0.35);

  /* Status */
  --jh-success: #16A34A;
  --jh-warning: #F59E0B;
  --jh-danger: #EF4444;
  --jh-info: #3B82F6;

  /* Dark surfaces */
  --jh-bg: #0A0A0B;
  --jh-surface: #16161A;
  --jh-surface-2: #1F1F24;
  --jh-surface-3: #2A2A31;
  --jh-border: #2A2A31;
  --jh-border-soft: #1F1F24;

  /* Text */
  --jh-text: #FAFAFA;
  --jh-text-2: #A3A3AC;
  --jh-text-3: #6E6E78;
  --jh-icon: #A3A3AC;

  /* shadcn/ui HSL tokens (mirror the above) */
  --background: 240 6% 5%;
  --foreground: 0 0% 98%;
  --card: 240 6% 9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 6% 9%;
  --popover-foreground: 0 0% 98%;
  --primary: 158 100% 48%;
  --primary-foreground: 240 10% 4%;
  --secondary: 240 5% 14%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 5% 14%;
  --muted-foreground: 240 5% 64%;
  --accent: 158 100% 14%;
  --accent-foreground: 158 100% 48%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5% 18%;
  --input: 240 5% 18%;
  --ring: 158 100% 48%;
  --radius: 18px;
}

html, body { background: var(--jh-bg); color: var(--jh-text); }
```

---

## 4. Theme utility classes (glass, shadows, motion)

Paste this block to get the JhaPay chrome and micro-interactions. Plain CSS — no
build step needed.

```css
/* ---- Glassmorphism (header / nav / sheets) ---- */
.jh-glass {
  backdrop-filter: saturate(160%) blur(18px);
  -webkit-backdrop-filter: saturate(160%) blur(18px);
  background: rgba(10, 10, 11, 0.78);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.jh-glass-strong {
  backdrop-filter: saturate(180%) blur(28px);
  -webkit-backdrop-filter: saturate(180%) blur(28px);
  background: rgba(22, 22, 26, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ---- Shadows (dark-tuned) ---- */
.jh-shadow-card  { box-shadow: 0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 24px rgba(0,0,0,0.35); }
.jh-shadow-float { box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.02) inset; }
.jh-shadow-orb {
  box-shadow: 0 0 0 6px rgba(0,245,160,0.10), 0 14px 36px rgba(0,245,160,0.45),
    inset 0 -6px 14px rgba(0,0,0,0.30), inset 0 6px 14px rgba(255,255,255,0.20);
}
.jh-glow-green { box-shadow: 0 0 0 1px rgba(0,245,160,0.25), 0 10px 30px rgba(0,245,160,0.25); }

/* ---- Tabular numbers (use on every amount/metric) ---- */
.jh-num { font-variant-numeric: tabular-nums; font-feature-settings: 'tnum' 1, 'ss01' 1; letter-spacing: -0.04em; }

/* ---- Press / tap feedback ---- */
.jh-press { transition: transform 120ms ease, box-shadow 200ms ease, background 200ms ease, color 200ms ease, opacity 200ms ease; }
.jh-press:active { transform: scale(0.97); }

/* ---- Brand mark ---- */
.jh-brand { font-family: 'Geist Mono','JetBrains Mono',ui-monospace,SFMono-Regular,monospace; letter-spacing: 0.02em; }

/* ---- Motion ---- */
@keyframes jh-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
.jh-float { animation: jh-float 4s ease-in-out infinite; }

@keyframes jh-pulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(0,245,160,0.4);} 50%{transform:scale(1.04);box-shadow:0 0 0 16px rgba(0,245,160,0);} }
.jh-orb-pulse { animation: jh-pulse 2.6s ease-in-out infinite; }

@keyframes jh-sheet-in { 0%{transform:translateY(100%);opacity:0;} 100%{transform:translateY(0);opacity:1;} }
.jh-sheet-in { animation: jh-sheet-in 320ms cubic-bezier(0.22,1,0.36,1); }

@keyframes jh-fade-in { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
.jh-fade-in { animation: jh-fade-in 360ms ease-out both; }

/* Staggered list reveal */
.jh-stagger > * { animation: jh-fade-in 420ms ease-out both; }
.jh-stagger > *:nth-child(1){animation-delay:40ms;}  .jh-stagger > *:nth-child(2){animation-delay:90ms;}
.jh-stagger > *:nth-child(3){animation-delay:140ms;} .jh-stagger > *:nth-child(4){animation-delay:190ms;}
.jh-stagger > *:nth-child(5){animation-delay:240ms;} .jh-stagger > *:nth-child(6){animation-delay:290ms;}

/* Skeleton shimmer */
@keyframes jh-shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
.jh-skeleton { background: linear-gradient(90deg,#1A1A1F 0%,#25252B 50%,#1A1A1F 100%); background-size: 800px 100%; animation: jh-shimmer 1.4s infinite linear; }

/* Live status dot (e.g. "Tap to Pay") */
@keyframes jh-dot-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,245,160,0.6);} 50%{box-shadow:0 0 0 6px rgba(0,245,160,0);} }
.jh-dot-live { animation: jh-dot-pulse 1.8s ease-out infinite; }

/* Selection + hidden scrollbars */
::selection { background: rgba(0,245,160,0.25); color: var(--jh-text); }
::-webkit-scrollbar { width: 0; height: 0; }
```

---

## 5. Border radius (everything is soft)

| Element | Radius |
|---|---|
| Bottom sheet / modal top | `32px` (`border-top-left/right-radius`) |
| Bottom navigation bar | `34px` |
| Cards / floating cards | `24–26px` |
| Inputs / chip rows | `16–22px` |
| Buttons | `18px` |
| Message bubbles | `20px` (tighten one corner to `8px` for a "tail") |
| FAB / orb / avatar / dot | `9999px` (fully round) |
| Phone frame (if used on desktop) | `44px` |

---

## 6. Tailwind setup (optional)

If the new app uses Tailwind, extend the theme so utilities map to these tokens.

**`tailwind.config.js`:**
```js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // brand shortcuts
        "jh-green": "#00F5A0",
        "jh-bg": "#0A0A0B",
        "jh-surface": "#16161A",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```
Keep section 3's `:root` block in your global CSS so these `hsl(var(--…))` resolve.

---

## 7. Usage examples

**Card**
```html
<div class="jh-shadow-card jh-fade-in" style="background:#16161A;border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:20px;">
  …
</div>
```

**Primary action (green gradient + press)**
```html
<button class="jh-press" style="background:linear-gradient(180deg,#00F5A0,#00D78A);color:#0A0A0B;border-radius:18px;padding:12px 18px;font-weight:600;box-shadow:0 8px 22px rgba(0,245,160,0.35);">
  Collect
</button>
```

**Secondary surface / input**
```html
<div style="background:#1F1F24;border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:10px 16px;"></div>
```

**Amount / metric** — always `.jh-num`:
```html
<div class="jh-num" style="font-size:34px;font-weight:700;color:#FAFAFA;">$1,284.50</div>
```

**Floating glass nav / sheet**
```html
<nav class="jh-glass-strong jh-shadow-float" style="border-radius:34px;padding:8px;">…</nav>
```

---

## 8. Icons

Use **lucide** (`lucide-react`, `lucide-vue`, or the SVG set). Outline style,
`strokeWidth` ~`1.8` (inactive) / `2.4` (active), `size 20`. Color `#A3A3AC`
default, `#0A0A0B` on the green gradient, `#00F5A0` for green accents. No filled
icon sets.

---

## 9. Light theme (opt-in)

The same identity in a light skin. **Dark is the default**; light turns on when
`data-theme="light"` is set on `<html>` (or the root element). The neon mint is
deepened slightly so it stays legible on white surfaces; the green-filled buttons
keep the bright gradient.

**Light palette:**

| Role | Variable | Hex |
|---|---|---|
| **Primary** | `--jh-primary` | `#00C27A` |
| Primary strong | `--jh-primary-strong` | `#00A368` |
| Primary dim | `--jh-primary-dim` | `rgba(0,194,122,0.12)` |
| Primary glow | `--jh-primary-glow` | `rgba(0,194,122,0.30)` |
| Success / Warning / Danger / Info | — | `#16A34A` / `#D97706` / `#DC2626` / `#2563EB` |
| **Background** (canvas) | `--jh-bg` | `#F4F6F5` |
| Surface (cards) | `--jh-surface` | `#FFFFFF` |
| Surface 2 (inputs/chips) | `--jh-surface-2` | `#EDF1EF` |
| Surface 3 (hover) | `--jh-surface-3` | `#E2E7E4` |
| Border / soft | `--jh-border` / `--jh-border-soft` | `#E2E7E4` / `#EDF1EF` |
| Text | `--jh-text` | `#0F1715` |
| Text 2 (secondary) | `--jh-text-2` | `#5C6B65` |
| Text 3 (placeholder) | `--jh-text-3` | `#9AA6A1` |
| Icon | `--jh-icon` | `#5C6B65` |

Buttons keep the bright fill `linear-gradient(180deg, #00F5A0, #00D78A)` with
`#0A0A0B` text — it pops on light too.

**Drop-in CSS (append after the `:root` block from section 3):**
```css
[data-theme="light"] {
  /* Brand */
  --jh-primary: #00C27A;
  --jh-primary-strong: #00A368;
  --jh-primary-dim: rgba(0, 194, 122, 0.12);
  --jh-primary-glow: rgba(0, 194, 122, 0.30);

  /* Status (deepened for contrast on light) */
  --jh-success: #16A34A;
  --jh-warning: #D97706;
  --jh-danger: #DC2626;
  --jh-info: #2563EB;

  /* Light surfaces */
  --jh-bg: #F4F6F5;
  --jh-surface: #FFFFFF;
  --jh-surface-2: #EDF1EF;
  --jh-surface-3: #E2E7E4;
  --jh-border: #E2E7E4;
  --jh-border-soft: #EDF1EF;

  /* Text */
  --jh-text: #0F1715;
  --jh-text-2: #5C6B65;
  --jh-text-3: #9AA6A1;
  --jh-icon: #5C6B65;

  /* shadcn/ui HSL tokens — light */
  --background: 150 12% 96%;
  --foreground: 160 23% 8%;
  --card: 0 0% 100%;
  --card-foreground: 160 23% 8%;
  --popover: 0 0% 100%;
  --popover-foreground: 160 23% 8%;
  --primary: 158 100% 38%;
  --primary-foreground: 150 30% 6%;
  --secondary: 150 10% 92%;
  --secondary-foreground: 160 23% 12%;
  --muted: 150 10% 92%;
  --muted-foreground: 155 8% 42%;
  --accent: 158 55% 90%;
  --accent-foreground: 158 100% 22%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 150 8% 88%;
  --input: 150 8% 88%;
  --ring: 158 100% 38%;
}

/* Light variants of the chrome / shadow / motion classes */
[data-theme="light"] .jh-glass        { background: rgba(255,255,255,0.72); border-bottom: 1px solid rgba(0,0,0,0.06); }
[data-theme="light"] .jh-glass-strong { background: rgba(255,255,255,0.82); border: 1px solid rgba(0,0,0,0.06); }
[data-theme="light"] .jh-shadow-card  { box-shadow: 0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03); }
[data-theme="light"] .jh-shadow-float { box-shadow: 0 8px 30px rgba(0,0,0,0.10); }
[data-theme="light"] .jh-glow-green   { box-shadow: 0 0 0 1px rgba(0,194,122,0.25), 0 10px 30px rgba(0,194,122,0.18); }
[data-theme="light"] .jh-shadow-orb {
  box-shadow: 0 0 0 6px rgba(0,194,122,0.10), 0 14px 36px rgba(0,194,122,0.35),
    inset 0 -6px 14px rgba(0,0,0,0.12), inset 0 6px 14px rgba(255,255,255,0.55);
}
[data-theme="light"] .jh-skeleton { background: linear-gradient(90deg,#E8ECEA 0%,#F2F5F3 50%,#E8ECEA 100%); background-size: 800px 100%; }
[data-theme="light"] ::selection  { background: rgba(0,194,122,0.20); color: var(--jh-text); }
```

**Toggle it (vanilla JS):**
```js
// to light
document.documentElement.dataset.theme = "light";
// back to dark (default)
document.documentElement.removeAttribute("data-theme");
```

**Follow the OS preference instead** (no toggle UI):
```css
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) { /* ...paste the [data-theme="light"] vars here... */ }
}
```

> Because every value is a CSS variable, components that read the tokens
> (`var(--jh-*)` or the `hsl(var(--…))` Tailwind colors) switch automatically.
> Components that hard-code hex inline won't switch until they're migrated to the
> variables.

---

### Checklist for a faithful copy
- [ ] Geist + Geist Mono loaded; body uses the SF/Geist stack with `-0.011em` tracking
- [ ] `:root` variables (section 3) in global CSS
- [ ] Utility classes (section 4) included
- [ ] Dark canvas `#0A0A0B`, one green primary action per screen
- [ ] Bracket radii, glass chrome, `.jh-num` on figures
- [ ] lucide outline icons — no purple, no light backgrounds, no sharp corners
