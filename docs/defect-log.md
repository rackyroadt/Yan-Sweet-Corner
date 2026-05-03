This document tracks all bugs discovered during development and testing.

Each entry includes the severity (impact on the user), status, and the version in which it was discovered and fixed.

---

## Summary

| ID | Description | Severity | Status | Version |
|----|-------------|----------|--------|---------|
| [BUG-01](#bug-01--decrementstock-returns-negative-values) | `decrementStock` returns negative values | 🔴 High | ✅ Fixed | v0.5 |
| [BUG-02](#bug-02--blueberry-float-image-missing-on-public-site) | Blueberry Float image missing on public site | 🟢 Low | ✅ Fixed | v1.1 |
| [BUG-03](#bug-03--upload-photo-button-returns-403-unauthorized) | Upload Photo button returns 403 Unauthorized | 🟡 Medium | ✅ Fixed | v1.1 |

---

## Bug Details

### BUG-01 — `decrementStock` returns negative values

| | |
|---|---|
| **Severity** | 🔴 High |
| **Status** | ✅ Fixed (v0.5) |
| **Discovered** | April 24, 2026 |

**Description:**
Calling `decrementStock()` with a quantity greater than available stock returned a negative number, causing the UI to display negative stock values.

**Steps to Reproduce:**
1. Set stock to `2`
2. Call `decrementStock(2, 5)`
3. Result: `-3`

**Fix Implemented:**
Clamped the result to `0` using `Math.max(0, stock - delta)`.

**Impact:**
No negative stock values are displayed to customers or admin.

---

### BUG-02 — Blueberry Float image missing on public site

| | |
|---|---|
| **Severity** | 🟢 Low |
| **Status** | ✅ Fixed (v1.1) |
| **Discovered** | May 3, 2026 |

**Description:**
After migrating product images from local assets to Supabase Storage, the Blueberry Float product card showed a broken image. All other 8 products displayed correctly.

**Root Cause:**
The `image_url` column for the `blueberry-float` row was `NULL` in the database — it was missed during the Phase 3 backfill of Supabase Storage URLs.

**Fix Implemented:**
Uploaded `berry-float.jpeg` to the `product-images` Supabase Storage bucket and manually set the `image_url` for the `blueberry-float` row via the Supabase Table Editor.

**Impact:**
All 9 products now display their photos correctly on the public site.

---

### BUG-03 — Upload Photo button returns 403 Unauthorized

| | |
|---|---|
| **Severity** | 🟡 Medium |
| **Status** | ✅ Fixed (v1.1) |
| **Discovered** | May 3, 2026 |

**Description:**
Clicking **Upload Photo** in the admin dashboard and selecting a file returned a `403 Unauthorized` error from Supabase Storage. The photo was not uploaded and the thumbnail did not update.

**Root Cause:**
The `product-images` Storage bucket was missing a `SELECT` policy. Supabase requires a `SELECT` policy alongside the `INSERT` policy to complete file uploads.

**Fix Implemented:**
Added a `SELECT` policy to the `product-images` bucket via the Supabase SQL Editor:

```sql
CREATE POLICY "Public select images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');
```

**Impact:**
Admins can now upload product photos directly from the dashboard. The thumbnail updates immediately after upload without requiring a page refresh.

---

## Maintenance Process

- Bugs are logged as soon as they are discovered
- Each bug is assigned a unique ID (`BUG-XX`) for traceability
- Resolved bugs remain in the log for historical reference
- Severity is assessed based on customer-facing impact

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/qa-plan.md`](./qa-plan.md) | Bug handling process and testing strategy |
| [`docs/tech-debt.md`](./tech-debt.md) | Known limitations and planned improvements |
| [`docs/changelog.md`](./changelog.md) | Release notes referencing fixed bugs |