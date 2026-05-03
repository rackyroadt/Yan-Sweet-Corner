> This document tracks known technical debt — code that works but requires improvement for long-term maintainability.

---

##  Project Background

**Yan Sweet Corner** started on **April 24, 2026** as a personal project. The original subject requirement was scrapped early in favor of something more meaningful — something connected to real life. The owner runs a small homemade dessert business, and the goal was to build a real, working site for it.

From planning to **v1.1**, this project took close to **100 hours** across about a month of on-and-off work. That includes learning Supabase from scratch, debugging RLS policies, figuring out how Vite handles assets, and going back and forth on design decisions. It wasn't always clean or fast, but every part of it was thought through.

---

##  Debt Summary

| ID | Description | Severity | Effort | Status |
|----|-------------|----------|--------|--------|
| [DEBT-01](#debt-01--stock-persistence-limited-to-localstorage) | Stock persistence limited to localStorage | 🔴 High | L | ✅ Fixed (v1.0) |
| [DEBT-02](#debt-02--hardcoded-contact-information) | Hardcoded contact information | 🟡 Medium | S | 🔵 Open |
| [DEBT-03](#debt-03--no-design-system--inconsistent-styling) | No design system / inconsistent styling | 🟢 Low | M | 🔵 Open |
| [DEBT-04](#debt-04--missing-error-boundaries-and-loading-states) | Missing error boundaries and loading states | 🟡 Medium | S | 🔵 Open |
| [DEBT-05](#debt-05--inefficient-image-loading) | Inefficient image loading | 🟡 Medium | S | ✅ Fixed (Sprint 1) |
| [DEBT-06](#debt-06--admin-couldnt-upload-new-product-photos) | Admin couldn't upload new product photos | 🟢 Low | M | ✅ Fixed (v1.1) |
| [DEBT-07](#debt-07--legacy-image-column-still-exists-on-products-table) | Legacy image column still exists on products table | 🟢 Low | S | 🔵 Open |

**Effort key:** `S` = < 1 hr · `M` = few hours · `L` = 1+ day

---

##  Debt Log

### DEBT-01 — Stock persistence limited to localStorage

| | |
|---|---|
| **Severity** | 🔴 High |
| **Effort** | L (1+ day) |
| **Status** | ✅ Fixed (v1.0 — Supabase integration) |

**Problem:**
Stock updates were stored only in the browser:
- Changes did not sync across devices
- Clearing browser data removed all stock values
- Customers saw default values instead of real-time data

**Fix Implemented:**
Replaced `localStorage` with Supabase (PostgreSQL). Stock is now cloud-backed and syncs in real time across all devices.

---

### DEBT-02 — Hardcoded contact information

| | |
|---|---|
| **Severity** | 🟡 Medium |
| **Effort** | S (< 1 hr) |
| **Status** | 🔵 Open |

**Problem:**
The `CONTACT` object is defined in `src/data/products.js`. Any update requires code changes and redeployment.

**Proposed Fix:**
Move contact data to environment variables (`.env`) or an admin-editable configuration. Ideally integrate into a future admin settings panel.

---

### DEBT-03 — No design system / inconsistent styling

| | |
|---|---|
| **Severity** | 🟢 Low |
| **Effort** | M (few hours) |
| **Status** | 🔵 Open |

**Problem:**
Styles are defined inline and in `App.css` without a structured design system. This may lead to duplication as the app scales.

**Proposed Fix:**
Adopt a design system:
- [Tailwind CSS](https://tailwindcss.com/) with custom config, or
- CSS Modules with centralized design tokens

> **Note:** Low priority due to small current scope.

---

### DEBT-04 — Missing error boundaries and loading states

| | |
|---|---|
| **Severity** | 🟡 Medium |
| **Effort** | S (< 1 hr) |
| **Status** | 🔵 Open |

**Problem:**
Unhandled errors can crash the entire app. There are no loading states for images or async UI.

**Proposed Fix:**
- Add a React error boundary wrapper
- Implement skeleton loaders or basic loading indicators

---

### DEBT-05 — Inefficient image loading

| | |
|---|---|
| **Severity** | 🟡 Medium |
| **Effort** | S (< 1 hr) |
| **Status** | ✅ Fixed (Sprint 1) |

**Problem:**
All images loaded immediately, increasing initial load time. Some images were oversized.

**Fix Implemented:**
- Added `loading="lazy"`
- Added `decoding="async"`

**Impact:**
Improved initial render performance and reduced unnecessary network usage.

---

### DEBT-06 — Admin couldn't upload new product photos

| | |
|---|---|
| **Severity** | 🟢 Low |
| **Effort** | M (few hours) |
| **Status** | ✅ Fixed (v1.1 — May 3, 2026) |

**Problem:**
Product photos were previously bundled with the React app at build time (`src/assets/products/`). Changing a photo required editing code, committing, pushing, and redeploying. The admin could edit prices and stock through the UI but not photos.

**Impact:**
Owner couldn't refresh photos seasonally or for new product variants without touching the codebase.

**Fix Implemented:**
- Created Supabase Storage bucket `product-images` with public access and RLS policies
- Added `image_url` column to `products` table
- Backfilled all 9 existing products with Supabase Storage URLs
- Added **Upload Photo** button per product in admin dashboard
- Public site now reads `image_url` from DB instead of bundled imports
- `placeholder.svg` fallback for products with no `image_url`

Also removed `src/lib/productImages.js` — the static lookup utility was no longer needed.

---

### DEBT-07 — Legacy image column still exists on products table

| | |
|---|---|
| **Severity** | 🟢 Low |
| **Effort** | S (< 1 hr) |
| **Status** | 🔵 Open — Target: v1.2 |

**Problem:**
The original `image` column (storing local paths like `/products/berry-float.jpeg`) still exists alongside the new `image_url` column. Nothing references it anymore but it adds noise to the schema.

**Proposed Fix:**
Drop the column in v1.2 once confirmed nothing depends on it.

```sql
ALTER TABLE products DROP COLUMN image;
```

---

##  Priorities

| Priority | ID | Notes |
|----------|----|-------|
| 1 | ~~DEBT-05~~ |  Fixed in Sprint 1 |
| 2 | ~~DEBT-01~~ |  Fixed in v1.0 |
| 3 | ~~DEBT-06~~ |  Fixed in v1.1 |
| 4 | DEBT-07 | 🔵 Target: v1.2 (schema cleanup) |
| 5 | DEBT-02 | 🔵 Target: future admin settings |
| 6 | DEBT-04 | 🔵 Target: next stability pass |
| 7 | DEBT-03 | 🔵 Target: v1.0+ if complexity increases |

---

##  Maintenance Process

- New debt is logged when shortcuts or compromises are introduced
- Reviewed at the start of each sprint
- At least one item is resolved per sprint (**"tech debt tax"**)
- All items remain in the log after resolution for traceability
