# Cost-Benefit Analysis — Yan Sweet Corner

**Prepared by:** Jiane Rackyle Sarting (Owner & Developer)
**Reporting period:** Project inception → May 2, 2026
**Currency:** Philippine peso (₱)
**Use case:** Real home-based dessert business in Cagayan de Oro

This document evaluates whether the time and money spent building Yan Sweet Corner is justified by the value it delivers — both for the business owner and as an academic project.

---

## 1. Development Cost

### Hours invested

This is the honest accounting — every hour from idea to v1.0, including learning, planning, photography, content writing, debugging, and the late-night sessions chasing weird bugs:

| Activity | Hours |
|----------|-------|
| Learning React, Vite, Vitest, GitHub Actions, Vercel, Supabase from scratch | 25 |
| Sprint planning, backlog, risk register, role definitions (Steps 1–2) | 6 |
| Initial scaffolding, Vite setup, first features, tests (Step 3) | 8 |
| Product catalog, hero, branding, photography of all 9 desserts, content writing (Step 4) | 12 |
| Vercel deployment, support and deployment plans (Steps 5–6) | 5 |
| Tech debt review, performance optimization, lazy loading (Step 7) | 4 |
| CI/CD setup, GitHub Actions, smoke tests, debugging pipeline issues (Step 8) | 5 |
| Admin login, security, validation, env vars, debugging the auth flow (Step 9) | 9 |
| Ethics, IP, privacy documentation (Step 10) | 3 |
| KPIs, metrics report, analytics integration, logging (Step 11) | 4 |
| Cost-benefit analysis (Step 12) | 2 |
| Cloud integration with Supabase, real-time sync, debugging the file-corruption issue (Step 13) | 8 |
| Documentation across all steps (21 markdown files) | 4 |
| **Total** | **~85 hours** |

### Cost in money terms

In the Philippines, a junior front-end / full-stack developer rate is roughly:

- **Student/intern rate:** ₱150–₱250 per hour
- **Junior professional rate:** ₱400–₱600 per hour

We'll use ₱200/hr as a reasonable student rate.

| Item | Calculation | Cost (₱) |
|------|-------------|----------|
| Developer time (85 hrs × ₱200/hr) | | **₱17,000** |
| Domain (currently free `.vercel.app`) | n/a | ₱0 |
| Hosting (Vercel Hobby plan) | Free tier | ₱0 |
| Cloud database (Supabase Free tier) | Free tier | ₱0 |
| GitHub (public repo) | Free tier | ₱0 |
| Design tools | Used free Figma + native CSS | ₱0 |
| Photography | Used owner's own phone camera | ₱0 |
| AI tools | Free chat tier | ₱0 |
| **Total development cost** | | **₱17,000** |

If valued at junior professional rates (₱500/hr), this same effort would have cost ₱42,500 in market labor terms. The student-rate figure is what's actually at stake.

A meaningful chunk of those 85 hours was **learning**, not just building — that knowledge transfers to every future project. The next site I build will take far less time because the toolchain is already familiar.

---

## 2. Operational Cost (Yearly)

Once deployed, what does it cost to keep running?

| Item | Cost per year (₱) | Notes |
|------|-------------------|-------|
| Vercel Hobby (hosting) | 0 | Free for personal projects under traffic limits |
| Supabase Free tier (database) | 0 | 500MB DB, 50k monthly users — far above what we need |
| GitHub (public repo) | 0 | Free |
| Custom domain (optional, if added later) | ~₱600 | E.g., yansweetcorner.com — currently using free vercel.app |
| Email service (optional, if added later) | 0 | Currently using Facebook Messenger and personal phone |
| Maintenance time (monthly KPI review, occasional updates) | 12 hrs/year × ₱200/hr = ₱2,400 | Owner's own time |
| **Total annual operating cost** | **₱2,400** (or **₱3,000** with custom domain) | |

This is **dramatically lower** than the cost of:
- Hiring a developer to build a Shopify or WooCommerce site (~₱30,000–₱80,000 setup + ₱2,000+/month subscription)
- Paying monthly for Wix/Squarespace (~₱300–₱700 per month = ₱3,600–₱8,400 per year)
- Maintaining a paper-based system (printing menus, manual stock counts, missed orders due to miscommunication)

---

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

These are real benefits that don't show up directly in pesos, but matter — and given the high learning hours, several of these are genuinely substantial.

### For the business
- **Always-on storefront:** Customers can browse at midnight, no need to wait for owner to be online
- **Professional credibility:** Having a website signals legitimacy, which builds trust with new customers
- **Inventory awareness:** Real-time stock display reduces "do you have X today?" messages
- **Ease of menu updates:** Change a price in 3 seconds, vs. reprinting paper menus
- **Mobile-first experience:** Customers can browse on the bus, on a break — anywhere
- **Foundation for growth:** Adding new products, photos, promotions takes minutes

### For the owner as a developer (HUGE intangible value)
- **~25 hours of structured learning** in production technologies (React, Vite, Vitest, GitHub Actions, Supabase, Vercel) that directly transfer to internships, freelance work, or full-time roles. The same knowledge taught through a paid bootcamp would cost ₱15,000–₱40,000.
- **Real-world portfolio piece:** Strong evidence of full-stack capability for future job applications. Most CS graduates can't show a deployed, cloud-integrated product with this level of documentation.
- **Hands-on practice with industry-standard tools:** Used by real engineering teams.
- **Documented engineering process:** 13 steps of professional artifacts (specs, risk registers, KPIs, security checklists) demonstrate process maturity, not just code.
- **Confidence in shipping:** End-to-end ownership of a deployed product is one of the most valuable skills a software graduate can demonstrate.

### For customers
- **Easier to find prices:** No need to message and wait for a reply
- **Better experience for shy customers:** Browse silently before committing to a chat
- **Visual access to products:** Photos help customers decide what they want
- **Accessibility:** Lighthouse 97/100 means visually-impaired customers can use it via screen reader

### For the academic course
- **Comprehensive deliverable:** Touches every step of the SIM curriculum (planning, dev, ops, security, ethics, metrics, costs)
- **Demonstrates honest engineering:** Real bugs, real tech debt, real performance issues — documented and tracked, not hidden

---

## 5. Return on Investment (ROI)

ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%

### Year 1 (expected scenario, financial only)

| Item | Amount (₱) |
|------|------------|
| Development cost | 17,000 |
| Operating cost (year 1) | 2,400 |
| **Total cost (year 1)** | **19,400** |
| Tangible benefits (incremental revenue + savings) | 37,200 |
| **Net benefit (year 1)** | **+₱17,800** |
| **ROI (year 1, financial only)** | **+92%** |

### Including the equivalent value of structured learning

If we count the ~25 hours of learning as "training" worth what equivalent education would have cost:
- Equivalent paid bootcamp value: ~₱15,000 (conservative)
- Adjusted year-1 benefits: ₱37,200 + ₱15,000 = **₱52,200**
- Adjusted year-1 ROI: **+169%**

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
- Plus savings: ₱6,000 = **₱13,800 in year 1 financial benefits**
- Year 1 cost: ₱19,400
- **Net financial benefit: −₱5,600 (financial-only loss in year 1)**
- BUT with learning value of ₱15,000: net **+₱9,400 — still profitable**

### Break-even analysis

The project breaks even when cumulative benefits equal cumulative costs:

| Scenario | Break-even point (financial only) |
|----------|------------------|
| Expected (15 orders/wk) | Within ~6-7 months |
| Low (5 orders/wk) | Year 1 doesn't break even on financial alone, but year 2 does (~3 months in) |
| When learning value is included | Already broken even by Step 13 |

---

## 6. Risks That Could Erode the Benefits

For honesty, these reduce expected ROI if they materialize:

1. **Low traffic.** If customers don't discover the site, revenue gain is zero. **Mitigation:** Promote via Facebook page, word of mouth, QR code on packaging.
2. **Stale content.** If the owner forgets to update stock/prices, customers get frustrated. **Mitigation:** Admin dashboard makes updates fast; automated reminders planned.
3. **Mobile performance issue.** Lighthouse mobile audit failed (DEBT-05). On slow connections, 5MB of images may cause customer drop-off. **Mitigation:** Image optimization scheduled before v1.0 follow-up.
4. **Single-platform reliance.** Heavy use of Facebook Messenger means platform changes could disrupt orders. **Mitigation:** Phone is also offered as alternative contact method.
5. **Competitor copycat.** Public site means competitors can mimic offerings. **Mitigation:** Treat as natural market dynamic; differentiate through quality and brand.

---

## 7. Recommendation

**Proceed and operate the site as currently planned.**

The cost-benefit ratio is favorable when accounting honestly for both the financial and educational return:

- **Year 1 financial ROI of +92%** in the expected scenario, growing to **+1,450% in steady state** as the development cost amortizes.
- **When learning value is factored in, year-1 ROI exceeds +169%** even in the expected scenario.
- **Operating cost is negligible** (~₱200/month), removing any ongoing financial pressure.
- **The opportunity cost of NOT having a digital storefront** in 2026 is rising — most customers under 40 expect to find local businesses online before buying.
- **The opportunity cost of NOT learning these technologies** would have cost the developer significantly in future job competitiveness.

### Short-term action items (next 30 days)

1. Deploy the image optimizations recommended in `docs/metrics-report.md` to fix mobile performance.
2. Print QR codes linking to `yan-sweet-corner.vercel.app` and put them on packaging or local flyers.
3. Run a 30-day post-deployment review using Vercel Analytics to validate revenue and traffic assumptions.
4. Decide whether to invest in a custom `.com` domain (~₱600/yr) once analytics confirm traction.

### Long-term considerations (next 12 months)

1. Add real cloud database persistence — DONE in Step 13. Now plan: order tracking layer.
2. Add order-tracking feature once volume justifies it.
3. Re-run cost-benefit analysis at the 6-month mark with real revenue data instead of estimates.
4. Migrate admin to Supabase Auth so multiple staff can manage the shop.

---

## Summary One-Liner

**For ~₱17,000 in development time and ₱2,400/year to operate, the project is projected to return ~₱37,200/year in tangible business benefits, plus ₱15,000+ in equivalent learning value — a 92% ROI in year 1 (financial only), 169% when education is counted, growing to over 1,000% in year 2.**

It's a good investment, both as a business asset and as an academic / career-development deliverable.

---

**Document version:** 1.1 (revised May 2, 2026 — corrected hours from 44 to 85 to reflect honest accounting including learning time)
**Date:** May 2, 2026
**Next review:** November 2026 (6-month real-data check)
