---
name: jhapay-design
description: JhaPay merchant app design system — a premium dark fintech look (neon-mint #00F5A0 on near-black #0A0A0B, glassmorphism, highly rounded, Apple-grade motion). Use this whenever building, editing, or reviewing any UI under frontend/ (pages, components, chrome, shadcn overrides) so colors, radii, glass, motion, and data-testid conventions stay consistent. Read design-system.md for the full token + pattern reference before writing styles.
---

# JhaPay Design System

The shipped JhaPay app is a **premium dark fintech** interface. Honor it on every
UI change. The authoritative source is [frontend/src/index.css](../../../frontend/src/index.css)
(CSS variables + `jh-*` utility classes); this skill distills it.

> ⚠️ Ignore [design_guidelines.json](../../../design_guidelines.json) when it
> conflicts — it's an older *light* concept the app never shipped. `index.css`
> and [design-system.md](design-system.md) are the truth.

## When to use

Building or editing anything visual in `frontend/` — a new page or card, tweaking
the bottom nav / AI orb / sheets, restyling a shadcn component, or reviewing a diff
for visual consistency. If you're writing a color, radius, shadow, or animation,
check here first.

## How to use

1. **Read [design-system.md](design-system.md)** — the complete reference (color
   tokens, typography, radii, glass, shadows, motion, icons, layout, component
   patterns, testability, do/don't). Don't guess values; copy them.
2. Prefer existing tokens and classes over inventing new ones:
   - Colors → `--jh-*` variables / the exact hex in the token table.
   - Radius → bracket values (`rounded-[24px]`, `rounded-t-[32px]`, …).
   - Surfaces/chrome → `.jh-glass`, `.jh-glass-strong`, `.jh-shadow-card`, `.jh-shadow-float`.
   - Motion → `.jh-press`, `.jh-fade-in`, `.jh-stagger`, `.jh-sheet-in`, etc.
   - Money/metrics → wrap in `.jh-num`.
3. Add a kebab-case `data-testid` to every interactive and key informational element.

## Quick reference (full detail in design-system.md)

| | Value |
|---|---|
| Primary green | `#00F5A0` → `#00D78A` (gradient `180deg`) |
| Canvas / card / input | `#0A0A0B` / `#16161A` / `#1F1F24` |
| Text / secondary | `#FAFAFA` / `#A3A3AC` |
| Status | success `#16A34A`, warning `#F59E0B`, danger `#EF4444` |
| Radius | cards `24px`, sheet `32px`, nav `34px`, button `18px`, round for FAB/orb |
| Chrome | glassmorphism (`jh-glass-strong`), floating, deep dark shadows |
| Icons | `lucide-react`, outline, `#A3A3AC` |
| Font | SF Pro Display / Geist stack, `tracking-tight`, `.jh-num` for figures |
| Forbidden | purple, light backgrounds, sharp corners, Material, dense tables |

## Maintaining this skill's asset file

`design-system.md` is the "asset" — a single reference doc this `SKILL.md` points
to so the skill description stays short while the detail lives separately. To keep
it trustworthy:

- **Derive from code, never invent.** Every token must trace to `index.css`
  (`:root` variables, `@layer base` HSL tokens) or a real component
  (`PhoneFrame.jsx`, `BottomNav.jsx`, `AIAssistant.jsx`). When you change a token
  or pattern in code, update the matching row in `design-system.md` in the same change.
- **One concern per section** (colors, type, radii, glass, motion, …) with a
  table or a copy-pasteable JSX snippet — optimized for an agent to scan and lift.
- **Record conflicts explicitly.** Where two sources disagree (e.g. the stale
  `design_guidelines.json`), state which one wins and why, so nobody re-introduces
  the wrong values.
- **Link to source files** with relative paths so a reader can jump to ground truth.
- Keep `SKILL.md` lean (this file): identity, when/how to use, a quick-reference
  table, and a pointer. Push exhaustive detail into the asset.

To add another asset later (e.g. `motion.md`, `screens.md`), drop it in this
folder and link it from the "How to use" list above with a one-line description of
when to read it.
