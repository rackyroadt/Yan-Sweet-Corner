# Demo Script — Yan Sweet Corner v1.0

**Total runtime:** ~3 minutes
**Setup:** Two browser windows side-by-side. One showing `https://yan-sweet-corner.vercel.app/` (public site), the other showing `https://yan-sweet-corner.vercel.app/admin` (admin login). Phone optional but adds wow factor.

---

## Opening (15 seconds)

> "Hi, I'm Jiane Rackyle Sarting. Yan Sweet Corner is my home-based Filipino dessert business in Cagayan de Oro. This is the project I built across all 13 steps of the Software Implementation and Management course — a real, production-deployed e-commerce-style site that I actually use to manage my business."

Show the live URL in the browser address bar: `https://yan-sweet-corner.vercel.app`

---

## Part 1 — The Customer Experience (30 seconds)

Click into the public site:

> "Customers land here. They see all 9 desserts I make — Mango Float, Leche Flan, Puto, Kutsinta — with prices, descriptions, photos, and how many I have left in stock today. Notice the 'Low Stock' badge on Leche Flan — when I'm down to my last few, customers see that immediately."

Scroll to the bottom:

> "There's no checkout — for a small business, I want customers to message me directly so I can confirm pickup or delivery. Five contact options in the footer: Facebook Messenger, phone call, location, hours."

---

## Part 2 — The Admin Dashboard (45 seconds)

Switch to the admin window. Show the URL: `/admin`.

> "This is where I run the shop. It's a private route — customers never see it, there's no link from the public site, you only get here if you know the URL."

Show the login form:

> "Login uses a constant-time string comparison against credentials stored in environment variables, never in the source code. Failed logins delay 500ms to slow down brute force attempts."

Log in. Show the dashboard:

> "Now I can see all 9 products, edit prices, increment or decrement stock with these buttons. Every action logs an event to the console — I can see exactly what changed, when, and from where."

Click `+1` on a product. Show "Saved to cloud" badge:

> "Every change saves immediately to a Postgres database hosted on Supabase, in Singapore. Real cloud persistence."

---

## Part 3 — The Magic — Real-Time Sync (45 seconds) ⭐

Bring back the public site window. Make sure both are visible.

> "Now watch what happens when I update stock as the admin..."

In admin window, click `+1` on Mango Float.

Point at the public window:

> "Within about a second, the public site updates — without me refreshing it. That's a WebSocket subscription on the products table. Whenever the database changes, every connected browser gets the update. If a customer is browsing right now, they see new stock counts in real-time. If they're on their phone, the update goes there too."

Try a price edit:

> "Same with prices. Change here..." (admin) "...reflected here." (public)

Pause for impact.

---

## Part 4 — The Engineering Behind It (30 seconds)

Switch to the GitHub repo: `https://github.com/rackyroadt/Yan-Sweet-Corner`

> "Behind this is a fully automated DevOps pipeline. Every commit triggers GitHub Actions that runs 16 unit tests and a smoke build before any code can merge. Every PR gets its own preview deployment on Vercel so I can test in production-like infrastructure before going live."

Open the Actions tab briefly:

> "20+ CI runs, all green. I never deploy manually."

Open the docs folder:

> "And I documented everything — backlog, risk register, security checklist, ethics impact, KPIs, cost-benefit, architecture, DevOps practices. 21 markdown files of professional engineering artifacts."

---

## Part 5 — The Numbers (30 seconds)

> "By the numbers:
> - 13 of 13 steps complete
> - 9 products live in production
> - 16 unit tests, 100% passing
> - Lighthouse: 88 Performance, 97 Accessibility, 100 Best Practices, 83 SEO
> - 0 vulnerabilities in 165 dependencies
> - 85 hours invested — about 25 of those were learning new technologies
> - Year-1 ROI projected at +92% on financial benefits alone, +169% when learning value is included
> - Built on a free hosting tier, ₱0 monthly operating cost"

---

## Closing (15 seconds)

> "It's tagged v1.0, MIT-licensed, and live at yan-sweet-corner.vercel.app. The code is on GitHub at github.com/rackyroadt/Yan-Sweet-Corner. Thank you."

---

## Backup Q&A — Likely Questions

**"How does the real-time sync work?"**
> Supabase Realtime is a WebSocket service that watches the Postgres database. When the admin updates a row, Supabase emits a message to every browser subscribed to the `products` channel. The client re-fetches and re-renders. Total latency from button click to public site update: roughly 1 second.

**"Why Supabase and not Firebase?"**
> Postgres support is the main reason — proper relational queries when we add orders/customers tables later. Free tier is generous, and the JavaScript SDK is excellent.

**"What happens if Supabase goes down?"**
> The public site falls back to a static product list bundled with the app. A small notice in the footer informs customers we're showing cached menu data. The site stays usable, just not real-time.

**"Why not full e-commerce / checkout?"**
> Two reasons: simplicity and trust. The cost-benefit analysis showed checkout would add ~₱5,000+ in payment gateway costs, plus development time, for a business that's still validating product-market fit. Manual coordination via Messenger gives customers a personal experience and lets me handle special requests. If volume grows past ~30 orders a week, full checkout becomes worth it.

**"How long did this take?"**
> About 85 hours over 3 weeks, including roughly 25 hours of learning new technologies (React, Vite, Vitest, GitHub Actions, Supabase, Vercel). At student developer rates, the equivalent paid labor would be around ₱17,000.

**"Is this still working months from now?"**
> The DevOps pipeline keeps it self-maintaining — dependency updates are tracked via npm audit in CI, deploys are automated, monitoring is in place. As long as Vercel and Supabase keep their free tiers, this site stays live with no work from me.
