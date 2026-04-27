# Key Performance Indicators (KPIs) — Yan Sweet Corner

This document defines the 5 KPIs we use to measure whether the Yan Sweet Corner project is succeeding. Each KPI has a clear definition, a target, how it's measured, and why it matters.

KPIs are reviewed monthly by the project owner.


## Why These 5

A small dessert business website has both **business goals** (do customers find me, do they reach out?) and **technical goals** (does the site work well, does new code ship safely?). We picked KPIs that cover both sides.

---

## KPI-1 — Page Load Performance

**What it measures:** How fast the site loads on a typical desktop visit.

**Target:** Lighthouse Performance score ≥ 90/100 by v1.0
**Stretch target:** ≥ 80/100 on mobile by v1.0

**How we measure:** Run Lighthouse audit (Chrome DevTools) on `https://yan-sweet-corner.vercel.app` weekly.

**Current value:** 88/100 desktop, mobile fails due to image payload (see metrics-report.md)

**Why this matters:** Customers leave slow sites. Google ranks fast sites higher. A score under 50 would directly cost us potential orders.


## KPI-2 — Accessibility Compliance

**What it measures:** How usable the site is for people with disabilities (screen readers, keyboard-only users, low vision).

**Target:** Lighthouse Accessibility score ≥ 95/100 maintained across all releases

**How we measure:** Lighthouse Accessibility audit + occasional manual keyboard navigation testing.

**Current value:** 97/100 ✅

**Why this matters:** Around 15% of the global population has some form of disability. Excluding them is both ethically wrong and bad for business. Also: Filipino law (RA 7277, the Magna Carta for Disabled Persons) supports digital accessibility.


## KPI-3 — CI Build Success Rate

**What it measures:** What percentage of code pushes pass the automated test pipeline.

**Target:** ≥ 95% of pushes pass CI on the first try

**How we measure:** GitHub Actions dashboard — count of green ✅ runs / total runs over the last 30 days.

**Current value:** ~100% (recent runs all green; one early failure during Step 8 setup was a config issue, not a real bug)

**Why this matters:** A high CI pass rate means our tests catch problems early and the code we deploy is stable. A low rate means tests are flaky or developers ignore them — both expensive over time.


## KPI-4 — Visitor Engagement

**What it measures:** How many people visit the public site and how many actually look at products vs. bouncing immediately.

**Target:**
- ≥ 50 unique visitors per week by month 3 of operation
- Bounce rate < 60%

**How we measure:** Vercel Web Analytics dashboard (installed in v0.9, Step 11).

**Current value:** Just installed — baseline data collecting now. First report due 30 days after install.

**Why this matters:** Without visitors, there are no orders. Tracking helps us know which marketing efforts (Facebook posts, word of mouth) actually drive traffic.


## KPI-5 — Security Posture

**What it measures:** Number of known vulnerabilities in the production build at any time.

**Target:** 0 critical or high-severity vulnerabilities at all times

**How we measure:** `npm audit` run in CI on every push, plus manual check before each release.

**Current value:** 0 vulnerabilities (verified in Step 9, screenshot at `Screenshots/Step9-NpmAudit.png`)

**Why this matters:** A vulnerable site can be hijacked, defaced, or used to harm visitors. For a small business, even one security incident can destroy customer trust permanently.


## Summary Table

| ID | KPI | Target | Current | Status |
|----|-----|--------|---------|--------|
| KPI-1 | Page Load Performance | ≥ 90 desktop, ≥ 80 mobile | 88 desktop, mobile fails | 🟡 Near target on desktop, action needed for mobile |
| KPI-2 | Accessibility Compliance | ≥ 95/100 | 97/100 | 🟢 Meeting target |
| KPI-3 | CI Build Success Rate | ≥ 95% | ~100% | 🟢 Meeting target |
| KPI-4 | Visitor Engagement | ≥ 50/week, bounce < 60% | Baseline collecting | ⚪ Too early |
| KPI-5 | Security Posture | 0 critical/high vulnerabilities | 0 | 🟢 Meeting target |



## Review Cadence

- **Weekly:** KPI-1, KPI-3, KPI-5 (quick automated checks)
- **Monthly:** All KPIs reviewed in writing (`docs/metrics-report.md`)
- **Per release:** Full audit before tagging a new version

If any KPI drops below target for two consecutive checks, an action item is created and tracked in `docs/tech-debt.md`.