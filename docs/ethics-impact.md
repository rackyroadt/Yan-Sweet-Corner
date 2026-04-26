# Ethics & Impact — Yan Sweet Corner

This document maps out who is affected by the Yan Sweet Corner project, what ethical risks the project faces, and how we plan to handle them. It is reviewed at the start of each sprint.


## Project Context

Yan Sweet Corner is a small, home-based Filipino dessert business operating from Cagayan de Oro, Philippines. The website lets customers browse available products and contact the owner directly via Facebook Messenger or phone to reserve. The owner uses a private admin dashboard to update prices and stock levels.

This is a **micro-business technology product** — small scale, single owner, primarily a contact channel rather than an e-commerce platform.



## Stakeholders

These are the people and groups affected by — or who can affect — this project.

### Primary Stakeholders

| Stakeholder | Interest in the project |
|-------------|-------------------------|
| **The owner (Jiane Rackyle Sarting)** | Operates the business, manages inventory, handles orders, depends on the site for marketing |
| **Customers** | Browse desserts, check stock, order via Messenger/phone, expect accurate prices and availability |
| **The instructor & academic peers** | Evaluate the project as a coursework deliverable |

### Secondary Stakeholders

| Stakeholder | Interest in the project |
|-------------|-------------------------|
| **Suppliers (markets, ingredient sources)** | Indirectly affected by demand patterns visible through the site |
| **Family members helping with deliveries** | Coordinate with stock levels shown on the site |
| **Local competitors** | Can see prices, learn from the digital approach |
| **Future developers / collaborators** | Inherit the codebase, depend on its quality and documentation |
| **Anthropic / OpenAI / other AI tools used in development** | Tools whose output is incorporated into the codebase (full attribution in `docs/ip-and-attribution.md`) |



## Ethical Risks

Each risk is rated for likelihood (L), impact (I), and given a mitigation plan.

### E-01 — Misleading stock or price information
- **Risk:** Customers see "5 left" or a price that the owner forgot to update. They message expecting that, only to find it's wrong. Trust erodes.
- **Likelihood:** Medium (admin must remember to update)
- **Impact:** Medium (lost sale, mild reputational damage)
- **Mitigation:**
  - Admin dashboard makes updating fast (one tap per product)
  - "Last updated" timestamp planned for v0.7
  - Clear language: "Reserve via Messenger" so customers know it's not an instant guarantee

### E-02 — Customer privacy when contacting via Messenger
- **Risk:** Customers reaching out are sharing identity, location, and purchase intent with both the owner and Meta (Facebook). They may not realize how visible this is.
- **Likelihood:** Low (people already use Messenger broadly)
- **Impact:** Low to Medium (depends on customer's privacy expectations)
- **Mitigation:**
  - Clear contact disclosure on the site
  - `docs/privacy-note.md` explains what data we receive and don't store
  - Offer phone as an alternative contact (less data tracking)

### E-03 — Accessibility for users with disabilities
- **Risk:** Customers with visual impairments, motor difficulties, or older devices may not be able to use the site.
- **Likelihood:** Medium (most micro-business sites overlook this)
- **Impact:** Medium (excludes potential customers from the service)
- **Mitigation:**
  - Use semantic HTML and `alt` text on every product image (already in place)
  - Maintain WCAG-AA color contrast (already in place)
  - Mobile responsiveness ensures large touch targets and readable text
  - Add keyboard navigation testing in a future sprint
  - `prefers-reduced-motion` already respected in CSS animations

### E-04 — Price-shopping by competitors
- **Risk:** Local competitors can monitor our prices and undercut. The site is public.
- **Likelihood:** Medium
- **Impact:** Low (this is a normal market dynamic, not unique to digital)
- **Mitigation:** Treat as an accepted reality of public business listings, not a privacy issue.

### E-05 — Reliance on a single platform (Facebook)
- **Risk:** The "Reserve via Messenger" funnel assumes customers have Facebook accounts. If Meta changes policies or a customer doesn't use Facebook, they lose access to ordering.
- **Likelihood:** Low (Facebook usage in PH is very high)
- **Impact:** Medium (excludes some customers)
- **Mitigation:**
  - Provide phone number as alternative contact (already done in footer)
  - Future: Add SMS/email contact options

### E-06 — Inappropriate use of AI-generated content
- **Risk:** Code, docs, or images produced with AI assistance might inadvertently include biased, inaccurate, or non-original content.
- **Likelihood:** Low (project is small, AI usage is limited to scaffolding)
- **Impact:** Medium (academic integrity concerns)
- **Mitigation:**
  - All AI usage disclosed in `docs/ip-and-attribution.md`
  - Owner reviews and tests every line of generated code
  - Photos used are original (taken by the owner), not AI-generated

### E-07 — Data loss for the admin
- **Risk:** Admin enters new stock values, then accidentally clears browser data — all the work is gone. (Tracked as DEBT-01 in `docs/tech-debt.md`.)
- **Likelihood:** Medium (until v0.7 / cloud DB)
- **Impact:** Low (admin can re-enter; no customer-facing impact)
- **Mitigation:**
  - In-app banner explains data is temporary in MVP
  - Cloud persistence planned for Step 13 / v1.0



## Positive Impact

Not all impact is a risk — some is genuinely beneficial.

- **Owner empowerment:** A self-managed digital storefront, no developer needed to update prices
- **Local economy:** Supports a home-based Filipino food business with low-cost technology
- **Educational outcome:** Codebase serves as a real-world portfolio piece for the developer
- **Customer convenience:** Browse before buying; no in-store visit required
- **Contributing to open source:** MIT-licensed code can help other small businesses launch similar sites



## How We Decide When Ethics Conflicts with Business Goals

Default rule: **the customer's wellbeing comes first**. If a product feature would deceive customers (e.g., showing fake "Low Stock" badges to push purchases), we don't ship it — even if it might increase short-term sales.

This decision is owned by the project manager and revisited any time a new feature is proposed.