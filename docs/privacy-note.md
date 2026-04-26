# Privacy Note — Yan Sweet Corner

This document explains what personal data the Yan Sweet Corner website handles, what we do with it, and what you control. Plain language, no legalese.



## TL;DR

- We **don't have user accounts** for customers
- We **don't track your browsing** with cookies or analytics
- We **don't sell your data** — we have nothing to sell
- The only personal data we ever see is what **you** send us when you message or call to place an order
- Our admin login uses credentials stored on Vercel; only the owner can log in


## What Data the Public Site Collects

### What we collect
**Nothing.** The public Yan Sweet Corner site (`https://yan-sweet-corner.vercel.app`) does not collect any personal data from visitors. There are:

- No sign-up forms
- No cookies for tracking
- No analytics scripts (Google Analytics, Facebook Pixel, etc.)
- No newsletter capture
- No "remember me" features

You browse like you would any printed menu — anonymously.

### What we observe (technically)
Like any website, when your browser fetches the page, the hosting provider (Vercel) sees:
- Your IP address (used to deliver the page)
- Your browser type
- The page you requested

This is standard web traffic and is not linked to your identity by us. Vercel may retain this in their own systems per their privacy policy.


## What Happens When You Reserve

When you click **"Message us on Facebook"** or **"Call or Text"**, you're being handed off to:

| Channel | What they see | What we see |
|---------|---------------|-------------|
| Facebook Messenger | Your Facebook profile (name, picture, anything public on your account) | The same |
| Phone (call/SMS) | Your phone number, the message content | The same |

These conversations are between you and the owner directly. Nothing is logged on our website. We do not export, share, or sell these conversations.

If you'd rather not use Facebook, the phone option is available — please use whichever you're comfortable with.

---

## What the Admin Dashboard Stores

The admin dashboard (at `/admin`, only accessible by the owner with credentials) currently stores:
- Product names, prices, stocks (the catalog itself)
- Login session state (in browser sessionStorage, expires when you close the tab)

It does **not** store:
- Customer messages or contact info
- Order history
- Any personally identifiable information

When persistent storage is added in a future version (v0.7+), the privacy note will be updated to reflect what is then stored.


## Cookies & Local Storage

| Type | Used? | Purpose |
|------|-------|---------|
| Tracking cookies | ❌ No | We don't track behavior |
| Analytics cookies | ❌ No | No analytics installed |
| Session storage (admin only) | ✅ Yes | Keeps the admin logged in across page refreshes; cleared when the tab closes |
| localStorage | ❌ Currently no | Planned for v0.7 to persist admin's stock changes locally |


## Third Parties Involved

These are the services the site touches. None of them receive customer data from us:

| Service | Role | What it sees |
|---------|------|--------------|
| **Vercel** | Hosting & deployment | Your IP and basic request info (standard web hosting) |
| **GitHub** | Source code repository | Nothing customer-related; only the project's code |
| **Facebook** | If you click the Messenger link | Whatever you share by messaging directly |



## Your Rights

Since we don't store any of your personal data, there's not much to exercise rights *against*. But:

- You can reach the owner via the contact info on the site to ask any question about data practices
- You can request that the owner delete a Messenger thread or phone conversation history on either side
- You can choose the phone option to avoid Facebook entirely


## When This Will Change

If we ever add:
- A sign-up form
- An order history feature
- Analytics tools
- Email marketing

…this document will be updated **before** that feature ships. We commit to data minimalism — collecting only what the feature genuinely needs.


## Questions?

Contact the owner (Jiane Rackyle Sarting) via the Facebook or phone links on the site footer.

**Last updated:** April 26, 2026