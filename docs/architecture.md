# Architecture — Yan Sweet Corner

**Version:** 1.0
**Date:** May 2, 2026
**Live URL:** https://yan-sweet-corner.vercel.app

This document describes how Yan Sweet Corner is architected — the components, the data flow, and why each piece exists.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                            CUSTOMERS                                 │
│                       (any device, browser)                          │
│                                                                      │
└─────────────────────────────────┬────────────────────────────────────┘
                                  │ HTTPS (read only)
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│              VERCEL CDN (yan-sweet-corner.vercel.app)                │
│                                                                      │
│   ┌──────────────────┐         ┌─────────────────────────────────┐   │
│   │   Public site    │         │   Admin dashboard /admin        │   │
│   │   (read DB)      │         │   (read + write DB)             │   │
│   └────────┬─────────┘         └────────────┬────────────────────┘   │
│            │                                │                        │
└────────────┼────────────────────────────────┼────────────────────────┘
             │                                │
             │  Supabase JS SDK               │  Supabase JS SDK
             │  (HTTPS + WebSocket)           │  (HTTPS + WebSocket)
             ▼                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│              SUPABASE (Singapore region, free tier)                  │
│                                                                      │
│   ┌────────────────────────┐    ┌────────────────────────────────┐   │
│   │   Postgres Database    │    │   Realtime Pub/Sub             │   │
│   │   - products table     │◀──▶│   - broadcasts UPDATE events   │   │
│   │   - 9 rows seeded      │    │   - powers live sync           │   │
│   └────────────────────────┘    └────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │ Manage from anywhere via /admin
                                  │
                       ┌──────────┴──────────┐
                       │  Owner (Jiane)      │
                       │  Phone or laptop    │
                       └─────────────────────┘
```

---

## Component Breakdown

### Frontend (React + Vite)

The browser-facing app, split into two routes:

**Public site (`/`)**
- Renders the product catalog for customers
- Reads data from Supabase on mount via `fetchProducts()`
- Subscribes to real-time changes — when admin updates anything, the public site re-fetches automatically (no manual refresh)
- Falls back to a static product list (`src/data/products.js`) if Supabase is unreachable

**Admin dashboard (`/admin`)**
- Auth-protected route guarded by `useAuth` hook
- Login validates against credentials in env vars (constant-time compare)
- Stock and price changes go directly to Supabase via `updateProductInDb()`
- Shows "Saved to cloud" / error badges for clear feedback
- Logs each admin action to console for debugging

**Shared utilities**
- `src/utils/stock.js` — pure functions for stock math + price/stock validation
- `src/utils/auth.js` — credential verification helpers
- `src/lib/supabase.js` — the only place the Supabase client is created
- `src/lib/productImages.js` — maps product IDs to bundled image assets

### Backend (Supabase)

We don't host a custom backend. Supabase provides:

- **Postgres database** for storing products
- **Auto-generated REST API** for `SELECT`, `INSERT`, `UPDATE`, `DELETE` operations
- **Real-time subscriptions** via WebSocket — pushes `INSERT`/`UPDATE`/`DELETE` events to subscribed clients within ~1 second
- **Row-Level Security (RLS)** policies — currently `Public read access` and `Public update access` for the products table

This is a fully managed Backend-as-a-Service. We didn't write a single line of server code.

### Hosting (Vercel)

- **Edge CDN** serves the React bundle globally
- **Auto-deploys** on every push to `main`
- **Preview deployments** on every PR for safe testing
- **Environment variables** injected at build time (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_USERNAME`, `VITE_ADMIN_PASSWORD`)
- **HTTPS** by default

---

## Data Flow Examples

### Flow 1: Customer views a product

```
Customer opens https://yan-sweet-corner.vercel.app/
   ↓
Vercel CDN serves the React bundle (cached, ~50ms)
   ↓
React mounts <PublicSite /> → useEffect fires
   ↓
fetchProducts() → Supabase REST API → SELECT * FROM products ORDER BY id
   ↓
9 product rows return
   ↓
React re-renders <ProductCard /> grid with current prices and stocks
   ↓
subscribeToProductChanges() opens a WebSocket to Supabase Realtime
```

### Flow 2: Admin decreases stock

```
Admin clicks -1 on Mango Float at /admin
   ↓
handleStockChange('mango-float', -1) →
   decrementStock(20, 1) → returns 19
   ↓
updateProductInDb('mango-float', { stock: 19 })
   ↓
Supabase: UPDATE products SET stock=19, updated_at=now() WHERE id='mango-float'
   ↓
Postgres updates the row → emits UPDATE event to Realtime
   ↓
All subscribed clients (admin's own page + every customer with the public site open)
   receive the event → re-fetch products → re-render with the new value
   ↓
Within ~1 second, every browser shows "19 left" without manual refresh
```

### Flow 3: Failure — Supabase unreachable

```
fetchProducts() throws an error
   ↓
React catches it in the useEffect → sets usingFallback = true
   ↓
Public site continues to render with the static PRODUCTS array from src/data/products.js
   ↓
Footer shows the notice "showing cached menu — live data temporarily unavailable"
```

This resilience pattern means the site doesn't go fully down even if Supabase has an outage.

---

## Why These Choices

**Why React + Vite?**
Modern, fast, well-documented. Vite's dev server is incredibly fast (Hot Module Replacement under 100ms), and Vite produces small, optimized production bundles. React is the most widely adopted UI library, making future hires easy.

**Why Supabase over Firebase or a custom backend?**
- **Postgres > Firestore** — proper SQL means we can query relationally if we ever add orders/customers tables
- **Free tier is generous** — 500MB database, 50k monthly users, far more than this business will need
- **No server to manage** — no cloud bills for an idle backend
- **Real-time built in** — would require lots of code to build ourselves
- **Open source** — can self-host later if desired

**Why Vercel over alternatives like Netlify or AWS?**
- Best-in-class GitHub integration (PR previews, commit-level deployments)
- Generous free tier
- Excellent CDN performance
- First-party support for Vite

**Why this admin auth approach (env-vars + sessionStorage) instead of full OAuth?**
For a single-owner micro-business, full OAuth is overkill. Constant-time string compare against env vars is sufficient when:
- Credentials never reach Git (`.env` gitignored)
- Only one admin user exists
- Public site is read-mostly with no destructive actions for unauthed users

If we ever scale to multiple staff users, we'd switch to Supabase Auth (built-in, free).

---

## Security Architecture

| Layer | Protection |
|-------|------------|
| Transport | HTTPS only (Vercel default) |
| Credentials | Stored in env vars, gitignored, never in code |
| Database | Row-Level Security with explicit policies |
| Database keys | Public anon key only on client; service_role key never exposed |
| Login | Constant-time compare prevents timing attacks |
| Input | Validation on stock, price, login fields |
| XSS | React auto-escapes; no `dangerouslySetInnerHTML` |
| Dependencies | `npm audit` runs in CI on every push |

See `docs/security-checklist.md` for full details.

---

## Performance

| Asset | Size | Optimization |
|-------|------|--------------|
| JS bundle (gzipped) | ~120 KB | Vite tree-shaking, minification |
| CSS bundle (gzipped) | ~3 KB | Single file, minified |
| Product images | ~5 MB total | Lazy-loaded, but still need WebP conversion (DEBT-05) |
| Initial paint (desktop) | ~1.2s | Lighthouse Performance: 88 |
| Initial paint (mobile) | ~3.5s | Currently fails Lighthouse — image optimization in progress |
| Real-time message latency | ~500 ms — 1.5 s | Supabase WebSocket from Singapore |

---

## What's Not in v1.0 (Planned)

These are explicitly known limits, tracked in `docs/tech-debt.md`:

- **DEBT-04** — No React Error Boundary (a crash in any component blanks the page)
- **DEBT-05** — Images need WebP conversion + responsive `srcset` (mobile performance)
- **Image hosting** — Images are bundled with the site; eventually move to Supabase Storage so admin can upload new product photos through the dashboard
- **Order tracking** — When customers actually buy, no record is made yet (still uses Messenger)
- **SEO** — Add og:image, sitemap, structured data for Google
