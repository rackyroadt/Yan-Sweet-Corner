# Phase 3 — Resume notes

**Last worked on:** May 2, 2026
**Branch:** feature/v1.1-product-management

## ✅ Done so far
- Stage A: Supabase Storage bucket `product-images` created (public, with 4 policies)
- B1: Added `image_url` column to products table
- B2: Uploaded 9 photos to bucket + backfilled image_url for all 9 products
- Added Mango Float as a real product (was missing)

All SQL captured in `docs/migrations/phase3-storage-setup.sql`.

## ⏭️ Still to do

### B3a — Public site refactor (~20 min)
- Update `src/components/ProductCard.jsx` to use `product.image_url` from DB
  instead of looking up bundled images via `src/utils/productImages.js`
- Keep `placeholder.svg` as fallback if `image_url` is null
- Test locally that all 9 products still show photos

### B3b — Admin upload UI (~45 min)
- Add "Upload Photo" button per product in `AdminDashboard.jsx`
- File picker → upload to Supabase Storage → update products.image_url
- Show new photo immediately in admin thumbnail

### Final
- Test everything end-to-end locally
- Push to live (Vercel)
- Open PR, merge to main, tag v1.1
- Update CHANGELOG, release-notes, tech-debt

## ⚠️ Known tech debt (deal with after Phase 3)
- Products table still has legacy `image` column alongside new `image_url`.
  Drop it in v1.2 once nothing references it.