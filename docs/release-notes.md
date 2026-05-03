All notable releases are documented here in reverse chronological order.

---

## v1.1 — Product Image Management (Phase 3)

**Released:** May 3, 2026

This release moves product images from bundled local assets into Supabase Storage, enabling admins to upload and update product photos directly from the dashboard.

### Added

- Supabase Storage bucket `product-images` with public access and 4 RLS policies
- `image_url` column on the `products` table
- 9 product photos uploaded to Supabase Storage and backfilled into the DB
- Mango Float added as a product (was previously missing from the catalog)
- **Upload Photo** button per product in the Admin Dashboard
- `placeholder.svg` fallback for products with no `image_url`

### Changed

- `ProductCard.jsx` now reads images from `product.image_url` (DB) instead of bundled local assets
- `AdminDashboard.jsx` thumbnail now reads from `product.image_url`

### Removed

- `src/lib/productImages.js` — static image lookup utility no longer needed
- Bundled product images from `src/assets/products/` (except `placeholder.svg`)

### Known Limitations

- Legacy `image` column still exists on the `products` table alongside `image_url` — to be dropped in v1.2

---

## v0.5 — First Public MVP (Sprint 1)

**Released:** April 24, 2026

This is the first tagged release. It delivers a working customer-facing catalog along with internal QA and project management foundations.

### Added

- Customer product catalog featuring 9 Filipino desserts:
  `Mango Float` `Strawberry Float` `Berry Float` `Leche Flan` `Puto` `Kutsinta` `Cookies` `Crinkles` `Polvoron`
- Real product photography for all catalog items
- Stock display with **Low Stock** and **Sold Out** indicators
- **Reserve via Messenger** button with a pre-filled message
- Contact footer showing business hours and location
- UI enhancements:
  - Hover animations
  - Staggered fade-in on load
  - Shimmer effect on the Reserve button
  - Mobile-responsive grid (4 columns → 1 column on smaller screens)
- Unit testing setup using Vitest (14 passing tests)
- Defect log with resolved BUG-01 (negative stock issue)
- QA plan defining testing strategy and coverage targets
- Product backlog (12 user stories)
- Sprint 1 plan (5 MVP stories)
- Team roles documentation
- Risk register with 10 identified risks

### Changed

- Replaced default Vite + React starter with the Yan Sweet Corner application

### Fixed

- **BUG-01:** `decrementStock` returned negative values when quantity exceeded available stock
  → Fixed by clamping the result to `0` using `Math.max`

### Known Limitations

- Stock data stored in `localStorage` — not shared across devices
- No admin authentication (planned for v0.6)
- No backend or database integration yet

---

## Versioning Guide

| Range | Stage | Description |
|-------|-------|-------------|
| `v0.x` | Pre-release | MVP stage, rapid iteration |
| `v1.0` | Stable | First feature-complete release |
| `v1.x` | Incremental | Improvements and fixes on stable base |