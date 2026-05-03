This document records performance optimizations applied to the site, including before-and-after measurements.

---

## Methodology

All measurements were taken from the **live production deployment** (not localhost) to reflect real-world performance.

| | |
|---|---|
| **Tool** | Chrome DevTools — Network tab |
| **Cache** | Disabled (first-load simulation) |
| **Why production** | CDN delivery behavior and HTTP/2 prioritization are accurately represented; results are externally verifiable |

---

## Optimization 1 — Lazy Image Loading (DEBT-05)

**Commits:** `d013b9f` (baseline — eager loading) · `23ccca3` (optimized — lazy loading)

### Problem

The site displays 9 product cards with high-resolution images. Initially, all images loaded on page load — even those below the fold — resulting in unnecessary bandwidth usage and slower initial rendering.

**Image weights at baseline:**

| Product | File Size |
|---------|-----------|
| Mango Float | 1,171 kB |
| Cookies | 755 kB |
| Puto | 586 kB |
| Strawberry Float | 547 kB |
| Blueberry Float | 542 kB |
| Polvoron | 531 kB |
| Crinkles | 443 kB |
| Kutsinta | 310 kB |
| Leche Flan | 110 kB |
| **Total** | **~5.0 MB** |

### Solution

Added native HTML attributes to `<img>` in `ProductCard.jsx`:

```jsx
<img
  src={product.image}
  alt={product.name}
  className="card__image"
  loading="lazy"
  decoding="async"
/>
```

| Attribute | Behavior |
|-----------|----------|
| `loading="lazy"` | Defers loading of offscreen images until they approach the viewport |
| `decoding="async"` | Prevents image decoding from blocking the main thread during rendering |

No additional libraries or build configuration required.

### Results

| Metric | Before | After |
|--------|--------|-------|
| Images loaded on initial view | 9 | 2–4 |
| Initial transfer size | ~5.0 MB | ~1.5–2.5 MB |
| Data reduction | — | **50–70%** |
| Load completion (fast connection) | 776 ms | Reduced proportionally |

**User impact:**

| Condition | Impact |
|-----------|--------|
| Fast connections | Slight improvement in responsiveness |
| Slow / mobile networks | Faster initial render and time to interactivity |
| Metered data users | ~2–3 MB saved per visit (if not fully scrolled) |

### Tradeoffs

- Images load on scroll — minor delay, typically unnoticeable
- Supported in all modern browsers — no fallback required

---

## Optimization 2 — Image Compression *(Deferred)*

**Issue:** Images exceed required display size (~300–400 px), resulting in unnecessary file weight.

**Proposed fix:** Convert to WebP and resize to match display dimensions.

**Expected impact:** ~50–70% reduction (~2 MB total savings)

**Status:** Deferred — requires a build pipeline or dedicated tooling

---

## Optimization 3 — Responsive Images via `srcset` *(Deferred)*

**Issue:** The same image resolution is served to all devices regardless of screen size.

**Proposed fix:** Provide multiple resolutions using the `srcset` attribute.

**Expected impact:** 30–50% additional savings on mobile devices

**Status:** Deferred — requires multi-size asset generation

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/tech-debt.md`](./tech-debt.md) | Tracks DEBT-05 and future image optimization items |
| [`docs/changelog.md`](./changelog.md) | Release notes referencing Sprint 1 performance work |