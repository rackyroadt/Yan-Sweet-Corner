# Metrics Report — Yan Sweet Corner (April 2026)

**Reporting period:** Project inception → April 27, 2026
**Version under review:** v0.9 (post-Step 10 merge, including admin dashboard at `/admin`)
**Live URL:** https://yan-sweet-corner.vercel.app

This report analyzes real measurements collected from the live site and CI pipeline, compares them against the targets set in `docs/kpis.md`, and proposes specific improvements.

---

## Summary

| KPI | Target | Measured | Status |
|-----|--------|----------|--------|
| Performance (desktop) | ≥ 90 | **88** | 🟡 Close |
| Performance (mobile) | ≥ 80 | **Failed (timeout)** | 🔴 Action needed |
| Accessibility | ≥ 95 | **97** | 🟢 Pass |
| Best Practices | ≥ 95 | **100** | 🟢 Pass |
| SEO | ≥ 90 | **83** | 🟡 Close |
| CI build success | ≥ 95% | **~100%** | 🟢 Pass |
| Vulnerabilities | 0 critical | **0** | 🟢 Pass |
| Visitor data | Collecting | Just installed | ⚪ Too early |

**Overall:** Project is in good shape. Two areas need attention: mobile performance (driven by image weight) and SEO meta tags.

---

## Detailed Findings

### 1. Lighthouse Audit (April 27, 2026)

Run from Chrome DevTools, Desktop mode, default throttling, against the live production site.

| Category | Score | Color |
|----------|-------|-------|
| Performance | 88 | 🟡 Yellow |
| Accessibility | 97 | 🟢 Green |
| Best Practices | 100 | 🟢 Green |
| SEO | 83 | 🟡 Yellow |

Screenshot: `Screenshots/Step11-LighthouseLive.png`

#### Mobile run

Two attempts at Mobile-mode audit failed:
1. First attempt: "Page loaded too slowly to finish within the time limit"
2. Second attempt: "The page did not paint any content (NO_FCP)"

Both errors are consistent with **DEBT-05** in `docs/tech-debt.md`: total page weight is approximately 5 MB, dominated by 9 product photos at full resolution. On mobile network simulation, Lighthouse's timer expires before paint completes.

This is a **real performance issue**, not a Lighthouse bug.

### 2. CI Pipeline (GitHub Actions)

Reviewed the last 10 workflow runs on `main`:

| Metric | Value |
|--------|-------|
| Total runs | 10 |
| Green ✅ | 10 |
| Red ❌ | 0 |
| Average duration | ~1 minute 20 seconds |
| Tests run per CI | 16 |
| Tests passing per CI | 16 |

The single failure earlier in Step 8 was a `package-lock.json` sync issue resolved by switching from `npm ci` to `npm install`. No real test failures have occurred.

### 3. Dependency Security

Last `npm audit` run: April 25, 2026 (during Step 9).

```
found 0 vulnerabilities
```

Among 165 packages scanned (including all transitive dependencies), zero are known to be vulnerable.

### 4. Vercel Analytics

Installed in this PR (Step 11) via `@vercel/analytics`. Currently no user data — baseline collection begins now.

A follow-up review is scheduled for May 27, 2026 (30 days post-install).

---

## What's Working

1. **Best Practices = 100.** The site uses HTTPS, no console errors in production, no deprecated APIs, secure cookies (sessionStorage only), passive event listeners. Clean engineering.
2. **Accessibility = 97.** Semantic HTML, alt text on every image, sufficient color contrast, logical heading hierarchy, keyboard-navigable forms. Only minor improvements possible.
3. **CI is reliable.** Every push to main is auto-tested and auto-deployed. No manual deploy steps. Fast feedback on broken changes.
4. **Security is clean.** Zero vulnerabilities, environment variables properly isolated, login uses constant-time compare, no secrets in the repo.

---

## What Needs Improvement (Recommendations)

### Priority 1 — Image Optimization (addresses KPI-1 mobile)

**Problem:** ~5 MB of full-resolution JPEG/PNG images is too heavy for mobile.

**Recommendation:**
- Convert all product images to **WebP format** (typically 30-50% smaller than JPEG with similar quality)
- Use **responsive `srcset`** to serve smaller images to small screens (e.g., 600px wide for phones, 1200px wide for desktop)
- Compress images more aggressively — for thumbnails on the catalog page, 80-100 KB each is plenty

**Expected impact:** Mobile Lighthouse score should improve from "fail" → 70+. Total page weight should drop from ~5 MB to under 1 MB.

**Effort:** ~2 hours. Tools: `sharp` (Node) or just convert manually using https://squoosh.app

### Priority 2 — SEO Meta Tags (addresses score 83 → 95+)

**Problem:** The site is missing standard SEO metadata that helps Google understand what the page is about.

**Recommendation:** Add to `index.html` `<head>`:
```html
<meta name="description" content="Homemade Filipino desserts in Cagayan de Oro. Mango Float, Leche Flan, Puto, Kutsinta and more, made fresh daily. Order via Facebook or call." />
<meta property="og:title" content="Yan Sweet Corner — Homemade Filipino Desserts" />
<meta property="og:description" content="Mango Float, Leche Flan, Puto and more. Made fresh daily in CDO." />
<meta property="og:image" content="https://yan-sweet-corner.vercel.app/og-image.jpg" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://yan-sweet-corner.vercel.app/" />
```

Also add a `robots.txt` and `sitemap.xml` (Vercel can auto-generate these).

**Expected impact:** SEO score 83 → 95+. Better preview cards when shared on Facebook/Messenger. Better Google ranking over time.

**Effort:** 30 minutes.

### Priority 3 — Persistence Layer (addresses DEBT-01)

**Problem:** Admin price/stock changes reset on page reload because there's no backend.

**Recommendation:** Add Supabase or Firebase as a free cloud database in **Step 13** (already planned).

**Expected impact:** Real persistence across devices, real-time sync between admin and public site, foundation for future features (orders, customer accounts, history).

**Effort:** 2-4 hours, scoped for the capstone step.

### Priority 4 — Error Boundary (addresses DEBT-04)

**Problem:** A single JavaScript error in any component can crash the entire React app, leaving the user with a blank screen.

**Recommendation:** Add a React Error Boundary component around `<App />` that displays a friendly fallback ("Something went wrong, please refresh").

**Expected impact:** Crashes become recoverable. Lighthouse score unaffected, but user experience much better when something goes wrong.

**Effort:** 30 minutes.


## Trends to Watch (Next Review)

1. **Visitor count growth.** Are we attracting more visitors over time?
2. **Bounce rate.** Are visitors engaging or leaving immediately? High bounce rate could mean confusing UX or wrong audience.
3. **Mobile vs desktop split.** If 80%+ of visitors are mobile (likely), mobile performance becomes critical.
4. **Most-viewed products.** Useful for stocking decisions.
5. **Time of day patterns.** When do orders cluster? Adjust posting/preparation accordingly.


## Action Items Generated by This Report

| ID | Action | Owner | Target Date |
|----|--------|-------|-------------|
| MR-1 | Compress and convert all product images to WebP | FE | Before v1.0 |
| MR-2 | Add SEO meta tags and og:image | FE | Before v1.0 |
| MR-3 | Re-run Lighthouse mobile after image optimization | QA | After MR-1 |
| MR-4 | First Vercel Analytics review (30 days post-install) | PM | May 27, 2026 |
| MR-5 | Add Error Boundary component | FE | Backlog (DEBT-04) |
| MR-6 | Cloud DB migration | FE/BE | Step 13 / v1.0 |

These will be added to `docs/tech-debt.md` and `docs/backlog.md` as appropriate.


**Report compiled by:** Jiane Rackyle Sarting (Yan Sweet Corner)
**Date:** April 27, 2026
**Next review:** May 27, 2026