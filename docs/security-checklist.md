# Security Checklist — Yan Sweet Corner

This document tracks all security measures applied to the Yan Sweet Corner project, plus known limitations and planned improvements.

---

## Threat Model

Before listing controls, here's what we're defending against:

| Threat | Likelihood | Impact |
|--------|-----------|--------|
| Unauthorized stock/price tampering | Medium — admin route is publicly accessible | High — wrong inventory loses sales and trust |
| Credential theft via repo leak | Low — `.env` is gitignored | Critical — full admin access if exposed |
| Cross-site scripting (XSS) via product names | Low — React escapes by default | Medium — could steal admin sessions |
| Brute force on admin login | Medium — login is public-facing | Medium — admin password is single layer |
| Vulnerable npm dependency | Low — small dependency tree | Variable |
| Stock data manipulation by customer | None — customers have no write path | N/A |

---

## Controls In Place

### ✅ 1. Input Validation (Multiple Locations)

| Location | What's validated |
|----------|------------------|
| `src/utils/stock.js` — `decrementStock`, `incrementStock` | Throws `TypeError` for non-numbers, `RangeError` for negatives |
| `src/utils/stock.js` — `validatePrice` | Rejects non-numbers, negatives, prices > ₱100,000 |
| `src/utils/auth.js` — `validateLoginInput` | Rejects empty fields, type-checks strings, enforces max lengths (50 chars username, 100 chars password) |
| `src/components/AdminDashboard.jsx` — price field | Re-validates on save; alerts user and resets to safe value if invalid |

### ✅ 2. Admin Authentication

- Login form at `/admin` route
- Public site (`/`) has zero login surface — customers never see auth at all
- Failed logins show generic "Invalid username or password" (doesn't leak whether the username exists)
- 500ms artificial delay on login attempts to discourage brute force scripts
- Login state stored in `sessionStorage` (cleared on browser close)

### ✅ 3. Constant-Time Credential Comparison

`auth.js` uses a custom `constantTimeEqual` function. This prevents **timing attacks** where an attacker measures response times to deduce password characters one at a time.

A naive `if (a === b)` short-circuits on the first mismatch, leaking length info. Our version always loops the full length:
```js
let mismatch = 0;
for (let i = 0; i < strA.length; i++) {
  mismatch |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
}
return mismatch === 0;
```

### ✅ 4. Sensitive Values Protected

- Admin credentials live in `.env` (project root)
- `.env` is listed in `.gitignore` — never committed to GitHub
- `.env.example` (planned) will document the schema for new developers without exposing real values
- Vite's `VITE_*` prefix means only explicitly-named variables are exposed to the client

### ✅ 5. Dependency Audit Run

Result of `npm audit` (latest run, captured in `Screenshots/Step9-NpmAudit.png`):
```
found 0 vulnerabilities
```

The full dependency tree (165+ packages) was scanned against the GitHub Advisory Database. No known CVEs.

We re-run audits as part of CI in the future via `npm audit --audit-level=moderate`.

### ✅ 6. Default React XSS Protection

React automatically escapes user-supplied strings in JSX. Our product names, descriptions, and prices are all rendered through `{}` interpolation, which is escaped. No `dangerouslySetInnerHTML` is used anywhere in the codebase.

### ✅ 7. HTTPS in Production

The live site at `https://yan-sweet-corner.vercel.app` is served only over HTTPS (Vercel's default). All traffic between browser and CDN is encrypted.

---

## Known Limitations & Planned Improvements

These are honest gaps, tracked here and in `docs/tech-debt.md`:

### ⚠️ Plain-text password in `.env` (not bcrypt)

The current implementation compares plain text. In a tighter production setup, we'd:
- Hash the password with bcrypt (cost factor 12+)
- Use server-side verification (current is client-side)
- Add a per-user salt

The plain-text approach is acceptable here because:
- `.env` never reaches Git or the deployed bundle
- Only one admin exists (the owner)
- Public site can't trigger admin actions even with the password

### ⚠️ No rate limiting on login attempts

Currently any number of failed logins per minute is allowed. A determined attacker could try thousands of passwords. Mitigation planned: cap to 5 attempts per IP per 15 minutes (requires backend).

### ⚠️ Admin auth is client-side only

The login check happens in the browser. A skilled attacker could bypass it by editing the JavaScript bundle in DevTools. This is acceptable because:
- There's no real backend to compromise — admin actions only modify in-memory state
- Stock/price changes don't persist across sessions yet (DEBT-01)
- A real backend with server-side auth is planned for Step 13 (cloud integration)

### ⚠️ No CSRF tokens

Not relevant yet because there's no backend endpoint to attack. Will be added when Supabase/Firebase backend is introduced in Step 13.

### ⚠️ No content security policy (CSP) header

Vercel's default headers are reasonable, but we could tighten further. Tracked as future work.

---

## Recurring Practices

| Practice | Frequency | Owner |
|----------|-----------|-------|
| Run `npm audit` | Every PR (via CI) and weekly | All developers |
| Review `.env` not committed | Every commit (via `.gitignore`) | All developers |
| Rotate admin password | Every 90 days | Owner |
| Review this document | Every sprint planning meeting | PM |

---

## Incident Response

If admin credentials are ever exposed (committed to Git, screenshot shared, etc.):
1. **Immediately** change the password in `.env` and Vercel environment variables
2. Force redeploy via `git commit --allow-empty -m "force redeploy" && git push`
3. Audit Git history for the leaked credential and use `git filter-repo` to scrub if necessary
4. Add note to `docs/defect-log.md` for future prevention

---

## Related Documents

- `docs/risk-register.md` — broader project risks including security
- `docs/tech-debt.md` — DEBT items related to security (auth hardening)
- `docs/qa-plan.md` — testing strategy that includes auth tests