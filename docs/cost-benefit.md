**Prepared by:** Jiane Rackyle Sarting (Owner & Developer)
**Reporting period:** Project inception → April 27, 2026
**Currency:** Philippine peso (₱)
**Use case:** Real home-based dessert business in Cagayan de Oro

This document evaluates whether the time and money spent building Yan Sweet Corner is justified by the value it delivers — both for the business owner and as an academic project.


## 1. Development Cost

### Hours invested

A conservative estimate of total hands-on time across all 13 steps of the implementation course:

| Activity | Hours |
|----------|-------|
| Sprint 1 planning, backlog, risk register (Steps 1–2) | 4 |
| Initial scaffolding, Vite setup, first features, tests (Step 3) | 6 |
| Product catalog, hero, branding, photography, content (Step 4) | 8 |
| Vercel deployment, support and deployment plans (Step 5–6) | 4 |
| Tech debt review, performance optimization (Step 7) | 4 |
| CI/CD with GitHub Actions, smoke tests (Step 8) | 4 |
| Admin login, security, validation, env vars (Step 9) | 8 |
| Ethics, IP, privacy documentation (Step 10) | 2 |
| KPIs, metrics report, analytics integration, logging (Step 11) | 3 |
| Cost-benefit analysis (Step 12) | 1 |
| **Total** | **~44 hours** |

### Cost in money terms

In the Philippines, a junior front-end / full-stack developer rate is roughly:

- **Student/intern rate:** ₱150–₱250 per hour
- **Junior professional rate:** ₱400–₱600 per hour

We'll use ₱200/hr as a reasonable student rate.

| Item | Calculation | Cost (₱) |
|------|-------------|----------|
| Developer time | 44 hrs × ₱200/hr | **₱8,800** |
| Domain (currently free `.vercel.app`) | n/a | ₱0 |
| Hosting (Vercel Hobby plan) | Free tier | ₱0 |
| GitHub (public repo) | Free tier | ₱0 |
| Design tools | Used free Figma + native CSS | ₱0 |
| Photography | Used owner's own phone camera | ₱0 |
| AI tools | Free chat tier | ₱0 |
| **Total development cost** | | **₱8,800** |

If valued at junior professional rates (₱500/hr), this same effort would have cost ₱22,000 in market labor terms. The student-rate figure is what's actually at stake.


## 2. Operational Cost (Yearly)

Once deployed, what does it cost to keep running?

| Item | Cost per year (₱) | Notes |
|------|-------------------|-------|
| Vercel Hobby (hosting) | 0 | Free for personal projects under traffic limits |
| GitHub (public repo) | 0 | Free |
| Custom domain (optional, if added later) | ~₱600 | E.g., yansweetcorner.com — currently using free vercel.app |
| Email service (optional, if added later) | 0 | Currently using Facebook Messenger and personal phone |
| Maintenance time (monthly KPI review, occasional updates) | 12 hrs/year × ₱200/hr = ₱2,400 | Owner's own time |
| **Total annual operating cost** | **₱2,400** (or **₱3,000** with custom domain) | |

This is **dramatically lower** than the cost of:
- Hiring a developer to build a Shopify or WooCommerce site (~₱30,000–₱80,000 setup + ₱2,000+/month subscription)
- Paying monthly for Wix/Squarespace (~₱300–₱700 per month = ₱3,600–₱8,400 per year)
- Maintaining a paper-based system (printing menus, manual stock counts, missed orders due to miscommunication)


## 3. Tangible Benefits

These are benefits we can measure in pesos.

### Direct revenue assumptions

For modeling purposes, using the user's stated expectation of ~10–20 orders/week. Average order is conservatively estimated at ₱100 (e.g., a few cups of mango float plus a couple of puto).

| Scenario | Orders/week | Avg ₱/order | Revenue/year |
|----------|-------------|-------------|--------------|
| Low (5 orders/wk) | 5 | ₱100 | 5 × 52 × ₱100 = **₱26,000/yr** |
| Expected (15 orders/wk) | 15 | ₱100 | 15 × 52 × ₱100 = **₱78,000/yr** |
| High (30 orders/wk) | 30 | ₱100 | 30 × 52 × ₱100 = **₱156,000/yr** |

Of this revenue, the **incremental portion attributable to the website** (vs. word of mouth alone) is conservatively estimated at 30–50%. People who would have ordered anyway via Facebook posts don't count as "website-driven."

### Direct savings

| Saving | Yearly value (₱) | Notes |
|--------|------------------|-------|
| No printed menu reprints | ~₱500 | Update once on the site instead of reprinting flyers |
| No paid Shopify/Wix subscription | ~₱4,000 | Avoided by building our own |
| Faster order intake (fewer back-and-forth questions) | Hard to quantify, ~₱1,500 | Owner's time saved per order |
| **Estimated direct savings/year** | **~₱6,000** | |

### Tangible benefit total (expected scenario)

Incremental revenue (40% × ₱78,000) + savings = **₱31,200 + ₱6,000 = ₱37,200/year**

---

## 4. Intangible Benefits

These are real benefits that don't show up directly in pesos, but matter.

### For the business
- **Always-on storefront:** Customers can browse at midnight, no need to wait for owner to be online
- **Professional credibility:** Having a website signals legitimacy, which builds trust with new customers
- **Inventory awareness:** Real-time stock display reduces "do you have X today?" messages
- **Ease of menu updates:** Change a price in 3 seconds, vs. reprinting paper menus
- **Mobile-first experience:** Customers can browse on the bus, on a break — anywhere
- **Foundation for growth:** Adding new products, photos, promotions takes minutes

### For the owner as a developer
- **Real-world portfolio piece:** Strong evidence of full-stack capability for future job applications
- **Hands-on practice with industry-standard tools:** React, Vite, Vitest, GitHub Actions, Vercel — all used by real engineering teams
- **Documented engineering process:** 13 steps of professional artifacts (specs, risk registers, KPIs, security checklists) demonstrate process maturity, not just code
- **Confidence in shipping:** End-to-end ownership of a deployed product is the most useful skill software graduates can demonstrate

### For customers
- **Easier to find prices:** No need to message and wait for a reply
- **Better experience for shy customers:** Browse silently before committing to a chat
- **Visual access to products:** Photos help customers decide what they want
- **Accessibility:** Lighthouse 97/100 means visually-impaired customers can use it via screen reader

### For the academic course
- **Comprehensive deliverable:** Touches every step of the SIM curriculum (planning, dev, ops, security, ethics, metrics, costs)
- **Demonstrates honest engineering:** Real bugs (BUG-01), real tech debt (DEBT-01–05), real performance issues (mobile Lighthouse failure) — documented and tracked, not hidden

---

## 5. Return on Investment (ROI)

ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%

### Year 1 (expected scenario)

| Item | Amount (₱) |
|------|------------|
| Development cost | 8,800 |
| Operating cost (year 1) | 2,400 |
| **Total cost (year 1)** | **11,200** |
| Tangible benefits (incremental revenue + savings) | 37,200 |
| **Net benefit (year 1)** | **+₱26,000** |
| **ROI (year 1)** | **+232%** |

### Year 2 onwards

After year 1, development cost is sunk. Only operating cost continues.

| Item | Amount (₱) |
|------|------------|
| Operating cost | 2,400 |
| Tangible benefits | 37,200 |
| **Net benefit/year** | **+₱34,800** |
| **ROI per year** | **+1,450%** |

### Conservative scenario (5 orders/wk + 30% website attribution)

Even in the lowest realistic scenario:
- Year 1 incremental revenue: ₱26,000 × 30% = ₱7,800
- Plus savings: ₱6,000 = **₱13,800 in year 1 benefits**
- Year 1 cost: ₱11,200
- **Net benefit: +₱2,600. Still profitable.**

### Break-even analysis

The project breaks even when cumulative benefits equal cumulative costs:

| Scenario | Break-even point |
|----------|------------------|
| Expected (15 orders/wk) | Within ~4 months |
| Low (5 orders/wk) | Within ~10 months |
| If only intangible benefits considered (no orders) | Already broken even via portfolio + course value |

---

## 6. Risks That Could Erode the Benefits

For honesty, these reduce expected ROI if they materialize:

1. **Low traffic.** If customers don't discover the site, revenue gain is zero. **Mitigation:** Promote via Facebook page, word of mouth, QR code on packaging.
2. **Stale content.** If the owner forgets to update stock/prices, customers get frustrated. **Mitigation:** Admin dashboard makes updates fast; automated reminders planned.
3. **Mobile performance issue.** Lighthouse mobile audit failed (DEBT-05). On slow connections, 5MB of images may cause customer drop-off. **Mitigation:** Image optimization scheduled before v1.0.
4. **Single-platform reliance.** Heavy use of Facebook Messenger means platform changes could disrupt orders. **Mitigation:** Phone is also offered as alternative contact method.
5. **Competitor copycat.** Public site means competitors can mimic offerings. **Mitigation:** Treat as natural market dynamic; differentiate through quality and brand.

---

## 7. Recommendation

**Proceed and operate the site as currently planned.**

The cost-benefit ratio is overwhelmingly favorable:

- **Year 1 ROI of +232%** in the expected scenario, with multi-year ROI exceeding 1,000% as the development cost amortizes.
- **Even in the worst realistic scenario** (low traffic), the project breaks even within a year while delivering significant intangible value (portfolio strength, learning, customer experience).
- **Operating cost is negligible** (~₱200/month), removing any ongoing financial pressure.
- **The opportunity cost of NOT having a digital storefront** in 2026 is rising — most customers under 40 expect to find local businesses online before buying.

### Short-term action items (next 30 days)

1. Deploy the image optimizations recommended in `docs/metrics-report.md` to fix mobile performance.
2. Print QR codes linking to `yan-sweet-corner.vercel.app` and put them on packaging or local flyers.
3. Run a 30-day post-deployment review using Vercel Analytics to validate revenue and traffic assumptions.
4. Decide whether to invest in a custom `.com` domain (~₱600/yr) once analytics confirm traction.

### Long-term considerations (next 12 months)

1. Add real cloud database persistence (planned in Step 13 / v1.0) so multi-device admin actually works for real operations.
2. Consider adding an order-tracking feature once volume justifies it.
3. Re-run cost-benefit analysis at the 6-month mark with real revenue data instead of estimates.

---

## Summary One-Liner

**For ₱8,800 in development time and ₱2,400/year to operate, the project is projected to return ₱37,200/year in benefits — a 232% ROI in year 1, growing to over 1,000% in year 2.**

It's a good investment, both as a business asset and as an academic deliverable.

---

**Document version:** 1.0
**Date:** May 2, 2026
**Next review:** November 2026 (6-month real-data check)