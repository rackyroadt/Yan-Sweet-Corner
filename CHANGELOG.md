All notable changes to Yan Sweet Corner are documented in this file.

This project follows:
- [Keep a Changelog](https://keepachangelog.com)
- [Semantic Versioning](https://semver.org)

Unlike release-notes.md (which summarizes released versions), this file tracks both released changes and unreleased work in progress.

[Unreleased]
Planned
- Admin authentication with hashed password (Step 9)
- Technical debt review and refactoring (Step 7)

[1.1.0] — 2026-05-03
Added
- Supabase Storage bucket `product-images` with public access and 4 RLS policies
- `image_url` column on products table
- 9 product photos uploaded to Supabase Storage and backfilled into DB
- Mango Float added as a product (was previously missing)
- Upload Photo button per product in Admin Dashboard — uploads to Supabase Storage and updates DB immediately
- `placeholder.svg` fallback for products with no `image_url`

Changed
- `ProductCard.jsx` now reads images from `product.image_url` (DB) instead of bundled local assets
- `AdminDashboard.jsx` thumbnail now reads from `product.image_url`

Removed
- `src/lib/productImages.js` — static image lookup utility no longer needed
- Bundled product images from `src/assets/products/` (except `placeholder.svg`)

Known Tech Debt
- Legacy `image` column still exists on products table alongside `image_url` — to be dropped in v1.2

[0.5.0] — 2026-04-24
Added
- Customer product catalog with 9 Filipino desserts
- Product photography for all items
- Stock display with "Low Stock" and "Sold Out" indicators
- "Reserve via Messenger" button (m.me link)
- Contact footer (business hours and location)
- UI enhancements:
  - Hover animations
  - Staggered fade-in
  - Shimmer button effect
  - Mobile-responsive grid layout
- Unit testing setup with Vitest (14 passing tests)
- Defect log with resolved BUG-01
- QA plan defining testing strategy
- Product backlog (12 user stories)
- Sprint 1 plan (5 MVP stories)
- Team roles documentation
- Risk register (10 identified risks with mitigation)
- Release notes document

Changed
- Replaced default Vite starter with Yan Sweet Corner application

Fixed
- `decrementStock` no longer returns negative values (BUG-01)

[0.1.0] — 2026-04-23
Added
- Initial project setup
- Core planning documents:
  - Product backlog
  - Sprint plan
  - Team roles
  - Risk register