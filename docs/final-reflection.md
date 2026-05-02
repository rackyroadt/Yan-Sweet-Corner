# Final Reflection — Yan Sweet Corner

**Author:** Jiane Rackyle Sarting
**Date:** May 2, 2026
**Project version:** v1.0
**Course:** Software Implementation and Management

This document is my honest reflection on building Yan Sweet Corner across all 13 steps of the SIM curriculum. It's not a marketing piece — it's a developer's notebook of what I actually learned.

---

## What Worked Well

### 1. Branch-based workflow saved me multiple times
Every step lived on its own feature branch. When something broke (and things broke), `main` was always safe. I never had to panic-revert a deployed bug. The discipline felt slow at first ("just push to main") but every PR caught at least one issue I would have shipped.

### 2. Real CI from Step 8 onwards
GitHub Actions running on every PR meant I couldn't accidentally break the build. The first time CI caught a `package-lock.json` sync issue, I realized this is what professional engineering teams actually rely on — not heroic late-night debugging.

### 3. Documenting tech debt, not hiding it
`docs/tech-debt.md` ended up with five entries — none of them are bugs, they're conscious shortcuts I took to ship. Documenting them with intent ("we'll fix DEBT-05 with image optimization in v1.0 follow-up") feels much more professional than pretending they don't exist.

### 4. Iterating security in the right order
Following the curriculum's order — build the product first (Steps 1-7), then add auth and validation (Step 9) — turned out to be exactly right. Trying to add auth in Step 1 would have meant debugging auth bugs while the product wasn't even running. By Step 9 the product was solid, so security work had clear focus.

### 5. The capstone (Step 13) was worth the work
Adding Supabase felt scary — a whole new technology, env vars, real-time subscriptions, all in one step. But it brought everything together: now my admin actually does what an admin should do, and the public site updates in real-time across devices. It went from "school project demo" to "real tool I'd use."

---

## What Was Hard

### 1. Learning while building
Of the ~85 hours I put in, easily 25 of those were spent learning — React, Vite, Vitest, GitHub Actions, Supabase, Vercel, Git workflows, all new to me. Building the project WAS the learning. There were nights where one tutorial led to another, then to documentation, then to Stack Overflow, then back to the code, before finally something clicked. Slow at first, faster later.

### 2. Coordinating my own time
Without a teammate, every conversation was internal. I had to wear PM, frontend, backend, and QA hats simultaneously, sometimes within the same hour. The team-roles document was useful for tracking which "hat" I was wearing for each task.

### 3. The CSS/markdown auto-link bug
At one point during Step 13, my terminal kept converting `e.target` and `p.id` into markdown auto-links (`[e.target](http://e.target)`), corrupting my JavaScript. Took an hour to figure out the workaround was renaming variables to single words and writing files via PowerShell here-strings. A real-world frustrating bug that taught me to recognize tooling failure modes.

### 4. Lighthouse Mobile failure
Mobile Lighthouse audits failed twice — first with a timeout, then with NO_FCP. Initial reaction was "must be a Lighthouse bug." Actual cause was 5MB of unoptimized images. Honest debugging led to DEBT-05 and a clear action item.

### 5. Vercel routing for SPA
The admin route worked locally but returned 404 on Vercel. Required adding `vercel.json` with rewrite rules. Common gotcha I'd never have known about without hitting it.

### 6. Multiple late nights
The compressed timeline meant some 2 AM sessions. The decision to actually stop and rest before pushing through Step 8 turned out to be correct — when I came back fresh, the work moved faster than if I'd pushed through tired.

---

## What I'd Do Differently

### 1. Add automated visual testing earlier
I caught the CSS class-name mismatch (`.product-card` vs `.card`) only after deploying. A Playwright e2e test would have caught it instantly. Worth the upfront investment.

### 2. Image optimization in Step 4, not Step 13
I knew images would be heavy from day one. I should have set up `sharp` or pre-optimized to WebP before committing the originals. The Lighthouse mobile failure was avoidable.

### 3. Use Supabase Auth from the start
I built custom env-var auth in Step 9, then switched to a Supabase backend in Step 13. Knowing what I know now, I'd have used Supabase Auth from the beginning — it's free, supports password reset, magic links, social login, and would scale to multiple staff users.

### 4. Smaller, more frequent commits
Some of my commits bundled a lot of changes (`feat(security): admin login, input validation, dependency audit (Step 9)` was 9 files). Smaller commits would make `git log` more useful and rollback more granular.

### 5. Front-load learning before coding
A few hours of dedicated tutorial time on each new tool BEFORE jumping into building would have saved me debugging time later. Several issues came from incomplete understanding of how Vite handles env vars, how React's StrictMode double-invokes effects, and how Supabase's real-time channels work. Would have been faster to learn-then-build instead of learn-while-building.

---

## Surprising Lessons

### 1. Documentation made me a better developer
I expected the docs/ folder to be a checkbox exercise. Instead, writing `docs/architecture.md` forced me to actually understand my own data flow. Writing `docs/risk-register.md` made me think about what could go wrong before it did. The act of documenting changed the engineering, not just recorded it.

### 2. The cost-benefit analysis was eye-opening
I'd never put a peso value on my own development time before. Realizing that 85 hours at student rates is ₱17,000, and that even a low-traffic version of this site could break even within months, made the project feel less like homework and more like a small startup.

### 3. AI tools changed how I learn
Using Claude as a coding assistant was disclosed in `docs/ip-and-attribution.md`. What surprised me wasn't that AI generated code — it was that I had to read every line, understand it, debug it, and own it. The AI wrote first drafts; I shipped final products. The skill being trained wasn't typing speed, it was judgment.

### 4. Real users (even theoretical ones) raise the bar
The moment I imagined a real customer trying to order a Mango Float at 9 PM on a slow connection, the priorities became obvious: stock accuracy, mobile performance, accessibility, contact options. None of those were optional anymore.

### 5. Learning compounds
Around hour 50, things suddenly clicked. The same kinds of issues that took me hours in week 1 took minutes in week 3. By Step 13, I was confidently combining technologies (React + Supabase + WebSockets + Vercel env vars) that would have been completely overwhelming in Step 3. That compounding curve is the most valuable thing I take away from this project.

---

## What's Next for Yan Sweet Corner

This project ships at v1.0, but it's not "done." Concrete next steps in priority order:

1. **Image optimization** (DEBT-05) — convert to WebP, fix mobile Lighthouse score
2. **SEO meta tags** — og:image, sitemap.xml, structured data for Google
3. **Supabase Storage migration** — let admin upload product photos through the dashboard
4. **Order tracking feature** — light-touch CRM for managing customer messages
5. **Analytics review** at the 30-day mark to validate cost-benefit assumptions
6. **Custom domain** if traction warrants — `yansweetcorner.com` (~₱600/yr)
7. **Migrate to Supabase Auth** for multi-user admin access

---

## Final Numbers

| Metric | Value |
|--------|-------|
| Total steps completed | 13/13 ✅ |
| Total hours invested | ~85 (including ~25 hours of learning) |
| Lines of source code | ~1,500 (excluding tests, docs) |
| Lines of documentation | ~3,500 across 21 files |
| Unit tests written | 16, all passing |
| Pull requests merged | 18 |
| Production deployments | 30+ |
| Known bugs at v1.0 | 0 |
| Known tech debts at v1.0 | 5 (all documented) |
| Vulnerabilities | 0 |
| New technologies learned | 7 (React, Vite, Vitest, GitHub Actions, Supabase, Vercel, advanced Git) |

---

## Closing

I built a working product, deployed it to the internet, gave it real cloud-backed persistence, and documented every engineering decision that went into it. More importantly, I learned that professional software isn't about writing impressive code — it's about making safe, deliberate choices and being honest about the trade-offs.

The 85 hours weren't just "writing a website." They were 85 hours of becoming a developer who can ship things.

The site is at https://yan-sweet-corner.vercel.app. The code is at https://github.com/rackyroadt/Yan-Sweet-Corner. The MIT license means anyone can use it as a starting point for their own micro-business storefront. That's the part I'm most proud of.

Yan Sweet Corner v1.0. Shipped.

— Jiane Rackyle Sarting, May 2, 2026
