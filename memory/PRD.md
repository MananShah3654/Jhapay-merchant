# JhaPay – Merchant POS App (PRD)

## Original problem statement (user)
Design and build a premium fintech merchant POS / Tap-to-Pay app called **JhaPay** for SMB merchants (cafes, retail, salons, pharmacies). The brief asked for a Square-familiar, Apple-elegant feel.

After v1 (light theme), the user pivoted: "use jhapay.com green colour" and "make it also in dark theme which Square is using". v2 implements a Square-style **dark theme** with the JhaPay brand neon green **#00F5A0**.

## User personas
- **Merchant owner** (Maya, JhaX Inc.) — needs to charge customers fast, see sales/insights, manage devices.
- **Front-counter employee** — uses Key In keypad and Catalog tap-to-add.

## Core requirements (static)
- Mobile-first (440px phone frame on desktop)
- Dark theme (#0A0A0B / #16161A surfaces)
- JhaPay brand green #00F5A0 as the only accent
- Rounded everything (cards 24px, buttons 18px, bottom nav 34px)
- Glassmorphism on TopBar + BottomNav + Bottom sheets
- 5-tab bottom navigation: Home, Activity, Devices, Alerts, More
- AI assistant (Claude Sonnet 4.5 via EMERGENT_LLM_KEY)
- Mocked payments / mock merchant data

## Architecture
- **Frontend**: React 19 + React Router 7 + Tailwind. Phone-frame container. Sticky `TopBar` (JhaPay logo + Tap-to-Pay indicator + profile). Floating `BottomNav` (zIndex 10001 to clear Emergent badge). Floating `AIAssistant` orb + bottom sheet.
- **Backend**: FastAPI. Single feature endpoint `POST /api/ai/chat` using `emergentintegrations.llm.chat.LlmChat` with Anthropic `claude-sonnet-4-5-20250929`. Mock merchant context baked into system message so AI grounds replies on the same numbers the UI shows.
- **Storage**: MongoDB only used by legacy `/api/status` (kept). Chat is stateless per-request right now.

## What's been implemented (2026-02-27)
- v1 (light theme) – initial build (HomePage dashboard, Collect keypad, Orders, Activity, More, Success). Verified by testing agent.
- v2 redesign (dark + jhapay.com green) – complete rewrite of design system + page restructure
  - `index.css` – dark design tokens, Apple-soft shadows-for-dark, orb pulse, confetti, shimmer
  - `TopBar.jsx` – persistent header with JhaPay wordmark, live "Tap to Pay" pill, profile
  - `BottomNav.jsx` – 5 tabs (Home/Activity/Devices/Alerts/More) with active green pill, badge counts, z-index above Emergent badge
  - `HomePage.jsx` – combined POS + dashboard: segmented Key In / Catalog / Quick List, keypad math, sticky Charge bar
  - `ActivityPage.jsx` – stat cards (Total Collected / Transactions / Avg Ticket), filter chips, transaction rows with real card-brand logos, expandable receipts
  - `DevicesPage.jsx` – 3 device cards (iPhone 15 Pro, JhaPay Reader needing firmware update, Kitchen Printer offline)
  - `AlertsPage.jsx` – 5 typed notifications with mark-all-read
  - `MorePage.jsx` – iOS-style colored icon grid in 4 groups + RED Sign Out destructive button
  - `SuccessPage.jsx` – dark gradient success screen, confetti, share/done CTAs
  - `AIAssistant.jsx` – floating green orb (z-index 10000), dark bottom sheet, suggestion chips, calls real Claude Sonnet 4.5

## Test results
- Backend pytest 5/5 ✅
- Frontend 67/69 (97%) ✅ — both bottom nav z-index issue and Sign Out red-text issue fixed in iteration 2

## Backlog / Prioritized
### P0 (none — MVP demo complete)

### P1
- Wire `charge` → backend transaction store (currently fully mocked)
- Real Stripe Tap-to-Pay integration (test mode)
- Auth (Emergent Google login or JWT)
- Orders page (was in v1, removed in v2 restructure — can live under More → Orders)

### P2
- Customers + Inventory (only stub tiles in More right now)
- Reports with interactive charts (Recharts)
- AI streaming via `/api/ai/chat/stream` SSE endpoint (already implemented backend, UI not wired)
- Dark/light mode toggle
- Push notification onboarding for Alerts

## Next tasks
1. Drop in Stripe / Tap-to-Pay real flow
2. Persist transactions to MongoDB
3. Build out Customers, Inventory, Reports modules
4. Wire streaming AI
