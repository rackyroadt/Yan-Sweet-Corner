Performance Report — Yan Sweet Corner

This document records performance optimizations applied to the site, including before-and-after measurements.

Optimization 1 — Lazy Image Loading (DEBT-05)

Commits:

d013b9f — baseline (eager loading)
23ccca3 — optimized (lazy loading)
Problem

The site displays 9 product cards with high-resolution images. Initially, all images were loaded on page load—even those below the fold—resulting in unnecessary bandwidth usage and slower initial rendering.

Image Weights
| Product          | File Size   |
| ---------------- | ----------- |
| Mango Float      | 1,171 kB    |
| Cookies          | 755 kB      |
| Puto             | 586 kB      |
| Strawberry Float | 547 kB      |
| Blueberry Float  | 542 kB      |
| Polvoron         | 531 kB      |
| Crinkles         | 443 kB      |
| Kutsinta         | 310 kB      |
| Leche Flan       | 110 kB      |
| **Total**        | **~5.0 MB** |

Solution

Added native HTML attributes to <img> in ProductCard.jsx:
<img
  src={product.image}
  alt={product.name}
  className="card__image"
  loading="lazy"
  decoding="async"
/>

Behavior:

loading="lazy" → defers loading of offscreen images
decoding="async" → prevents image decoding from blocking rendering

No additional libraries or configuration required.

Results

Testing method: Chrome DevTools → Network tab (cache disabled) on production deployment.
| Metric                            | Before  | After                  |
| --------------------------------- | ------- | ---------------------- |
| Images loaded on initial view     | 9       | 2–4                    |
| Initial transfer size             | ~5.0 MB | ~1.5–2.5 MB            |
| Data reduction                    | —       | **50–70%**             |
| Load completion (fast connection) | 776 ms  | Reduced proportionally |

User Impact
Fast connections: Slight improvement in responsiveness
Slow/mobile networks: Faster initial render and interactivity
Metered data users: ~2–3 MB saved per visit (if not fully scrolled)
Tradeoffs
Images load on scroll (minor, usually unnoticeable delay)
Supported in all modern browsers (no fallback required)
Future Optimizations

Tracked in docs/tech-debt.md.

Optimization 2 — Image Compression

Issue:
Images exceed required display size (~300–400 px), leading to unnecessary file weight.

Proposed Fix:
Convert to WebP and resize to display dimensions.

Expected Impact:
~50–70% reduction (~2 MB total savings)

Status: Deferred (requires build pipeline or tooling)

Optimization 3 — Responsive Images (srcset)

Issue:
Same image size served to all devices.

Proposed Fix:
Provide multiple resolutions using srcset.

Expected Impact:
30–50% additional savings on mobile

Status: Deferred (requires multi-size asset generation)

Methodology

Measurements were taken from the live production deployment (not localhost) to reflect real-world performance:

CDN delivery behavior included
HTTP/2 prioritization accurately represented
Results are externally verifiable

Test Conditions:

Chrome DevTools (Network tab)
Cache disabled
First-load simulation