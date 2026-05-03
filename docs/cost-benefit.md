**Prepared by:** Jiane Rackyle Sarting (Owner & Developer)
**Reporting period:** Project inception → May 3, 2026
**Currency:** Philippine peso (₱)
**Use case:** Real home-based dessert business in Cagayan de Oro

This document evaluates whether the time and money spent building Yan Sweet Corner is justified by the value it delivers — both for the business owner and as an academic project.

---

## 1. Development Cost

### Hours Invested

Honest accounting of every hour from idea to v1.1, including learning, planning, photography, content writing, debugging, and late-night sessions chasing weird bugs.

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
| Phase 3 — Supabase Storage, image upload UI, RLS policies, DB backfill | 7 |
| Documentation across all steps (21 markdown files) | 4 |
| **Total** | **~102 hours** |

### Cost in Money Terms

A junior front-end / full-stack developer rate in the Philippines:

| Rate type | Range |
|-----------|-------|
| Student / intern rate | ₱150–₱250 per hour |
| Junior professional rate | ₱400–₱600 per hour |

Using **₱200/hr** as the student rate:

| Item | Cost (₱) |
|------|----------|
| Developer time (102 hrs × ₱200/hr) | ₱20,400 |
| Domain (currently free `.vercel.app`) | ₱0 |
| Hosting (Vercel Hobby plan) | ₱0 |
| Cloud database (Supabase Free tier) | ₱0 |
| Cloud storage (Supabase Storage Free tier) | ₱0 |
| GitHub (public repo) | ₱0 |
| Design tools (free Figma + native CSS) | ₱0 |
| Photography (owner's phone camera) | ₱0 |
| AI tools (free chat tier) | ₱0 |
| **Total development cost** | **₱20,400** |

> If valued at junior professional rates (₱500/hr), the same effort would cost ₱51,000 in market labor terms. A meaningful share of those 102 hours was learning — that knowledge transfers to every future project. The next site built will take far less time because the toolchain is already familiar.

---

## 2. Operational Cost (Yearly)

| Item | Cost per year (₱) | Notes |
|------|-------------------|-------|
| Vercel Hobby (hosting) | ₱0 | Free for personal projects under traffic limits |
| Supabase Free tier (database + storage) | ₱0 | 500MB DB, 1GB storage, 50k monthly users — well above current needs |
| GitHub (public repo) | ₱0 | Free |
| Custom domain *(optional, future)* | ~₱600 | e.g., `yansweetcorner.com` — currently using free `.vercel.app` |
| Maintenance time (monthly KPI review, occasional updates) | ₱2,400 | 12 hrs/year × ₱200/hr |
| **Total annual operating cost** | **₱2,400** (or **₱3,000** with custom domain) | |

This is dramatically lower than the alternatives:

| Alternative | Estimated Cost |
|-------------|---------------|
| Shopify / WooCommerce (setup + subscription) | ₱30,000–₱80,000 setup + ₱2,000+/month |
| Wix / Squarespace subscription | ₱3,600–₱8,400/year |
| Paper-based system (printing, missed orders, manual counts) | Non-trivial time cost |

---

## 3. Tangible Benefits

### Direct Revenue Assumptions

Modeled on ~10–20 orders/week at a conservative average of ₱100/order.

| Scenario | Orders/week | Avg ₱/order | Revenue/year |
|----------|-------------|-------------|--------------|
| Low | 5 | ₱100 | ₱26,000 |
| Expected | 15 | ₱100 | ₱78,000 |
| High | 30 | ₱100 | ₱156,000 |

The incremental portion attributable to the website (vs. word of mouth alone) is conservatively estimated at **30–50%**.

### Direct Savings

| Saving | Yearly value (₱) | Notes |
|--------|------------------|-------|
| No printed menu reprints | ~₱500 | Update once on the site instead of reprinting flyers |
| No paid Shopify/Wix subscription | ~₱4,000 | Avoided by building our own |
| Faster order intake (fewer back-and-forth questions) | ~₱1,500 | Owner's time saved per order |
| Photo updates without developer help | ~₱500 | Admin can now upload photos directly |
| **Estimated direct savings/year** | **~₱6,500** | |

### Tangible Benefit Total (Expected Scenario)

Incremental revenue (40% × ₱78,000) + savings = **₱31,200 + ₱6,500 = ₱37,700/year**

---

## 4. Intangible Benefits

### For the Business

- **Always-on storefront** — Customers can browse at midnight without waiting for the owner to be online
- **Professional credibility** — Having a website signals legitimacy and builds trust with new customers
- **Inventory awareness** — Real-time stock display reduces "do you have X today?" messages
- **Ease of updates** — Change a price or photo in seconds vs. reprinting paper menus
- **Mobile-first experience** — Customers can browse anywhere, anytime
- **Foundation for growth** — Adding new products, photos, or promotions takes minutes

### For the Owner as a Developer

- ~25 hours of structured learning in production technologies (React, Vite, Vitest, GitHub Actions, Supabase, Vercel) that transfer directly to internships, freelance work, or full-time roles — equivalent paid bootcamp value: ₱15,000–₱40,000
- Real-world portfolio piece demonstrating full-stack capability
- Hands-on practice with industry-standard tools used by real engineering teams
- 13 steps of professional artifacts demonstrating process maturity, not just code output
- End-to-end ownership of a deployed product — one of the most valuable skills a software graduate can demonstrate

### For Customers

- Easier price discovery — no need to message and wait for a reply
- Better experience for shy customers — browse silently before committing to a chat
- Visual access to products — photos help customers decide what they want
- Accessibility — Lighthouse 97/100 means visually-impaired customers can use it via screen reader

### For the Academic Course

- Comprehensive deliverable touching every step of the SIM curriculum
- Demonstrates honest engineering — real bugs, real tech debt, real performance issues documented and tracked, not hidden

---

## 5. Return on Investment (ROI)

**Formula:** `ROI = (Total Benefits − Total Costs) ÷ Total Costs × 100%`

### Year 1 — Expected Scenario (Financial Only)

| Item | Amount (₱) |
|------|------------|
| Development cost | ₱20,400 |
| Operating cost (year 1) | ₱2,400 |
| **Total cost (year 1)** | **₱22,800** |
| Tangible benefits (incremental revenue + savings) | ₱37,700 |
| **Net benefit (year 1)** | **+₱14,900** |
| **ROI (year 1, financial only)** | **+65%** |

### Year 1 — Including Learning Value

| Item | Amount (₱) |
|------|------------|
| Equivalent paid bootcamp value (conservative) | ₱15,000 |
| Adjusted year-1 benefits | ₱52,700 |
| **Adjusted year-1 ROI** | **+131%** |

### Year 2 Onwards

| Item | Amount (₱) |
|------|------------|
| Operating cost | ₱2,400 |
| Tangible benefits | ₱37,700 |
| **Net benefit/year** | **+₱35,300** |
| **ROI per year** | **+1,470%** |

### Conservative Scenario (5 orders/wk, 30% website attribution)

| Item | Amount (₱) |
|------|------------|
| Year 1 incremental revenue (₱26,000 × 30%) | ₱7,800 |
| Plus direct savings | ₱6,500 |
| Year 1 financial benefits | ₱14,300 |
| Year 1 total cost | ₱22,800 |
| **Net financial benefit (year 1)** | **−₱8,500** |
| With learning value (+₱15,000) | **+₱6,500** — still profitable |

### Break-Even Analysis

| Scenario | Break-even point |
|----------|-----------------|
| Expected (15 orders/wk) | Within ~7–8 months |
| Low (5 orders/wk) | Year 1 doesn't break even on financials alone; year 2 does |
| When learning value is included | Already broken even by Phase 3 |

---

## 6. Risks That Could Erode Benefits

| # | Risk | Mitigation |
|---|------|------------|
| 1 | **Low traffic** — if customers don't discover the site, revenue gain is zero | Promote via Facebook page, word of mouth, QR code on packaging |
| 2 | **Stale content** — outdated stock or prices frustrate customers | Admin dashboard makes updates fast; build the habit |
| 3 | **Mobile performance** — large images cause drop-off on slow connections | Image optimization scheduled for v1.2 |
| 4 | **Single-platform reliance** — heavy dependence on Facebook Messenger | Phone number offered as an alternative contact method |
| 5 | **Competitor copycat** — public site exposes offerings | Treat as natural market dynamic; differentiate through quality and brand |

---

## 7. Recommendation

**Proceed and operate the site as currently planned.**

Year 1 financial ROI is **+65%** in the expected scenario, growing to **+1,470%** in steady state. When learning value is factored in, year-1 ROI exceeds **+131%**. Operating cost is negligible (~₱200/month), removing any ongoing financial pressure. The opportunity cost of not having a digital storefront in 2026 is rising.

### Short-Term Actions (Next 30 Days)

1. Deploy image optimizations to fix mobile performance
2. Print QR codes linking to `yan-sweet-corner.vercel.app` and place them on packaging or local flyers
3. Run a 30-day post-deployment review using Vercel Analytics to validate revenue and traffic assumptions
4. Decide whether to invest in a custom `.com` domain (~₱600/yr) once analytics confirm traction

### Long-Term Considerations (Next 12 Months)

1. Drop the legacy `image` column from the products table (v1.2)
2. Add order-tracking once volume justifies it
3. Re-run cost-benefit analysis at the 6-month mark with real revenue data
4. Migrate admin to Supabase Auth so multiple staff can manage the shop

---

## Summary

> For ~₱20,400 in development time and ₱2,400/year to operate, the project is projected to return ~₱37,700/year in tangible business benefits, plus ₱15,000+ in equivalent learning value — a **65% ROI in year 1** (financial only), **131% when education is counted**, growing to over **1,000% in year 2**.
>
> It's a good investment, both as a business asset and as an academic and career-development deliverable.

---

**Document version:** 1.2 (revised May 3, 2026 — updated to reflect v1.1 Phase 3 completion, hours updated to ~102)
**Next review:** November 2026 (6-month real-data check)