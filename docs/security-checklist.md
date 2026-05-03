This document tracks all security measures applied to the Yan Sweet Corner project, along with known limitations and planned improvements.

---

## Threat Model

| Threat | Likelihood | Impact |
|--------|------------|--------|
| Unauthorized stock/price tampering | Medium — admin route is publicly accessible | High — wrong inventory loses sales and trust |
| Credential theft via repo leak | Low — `.env` is gitignored | Critical — full admin access if exposed |
| XSS via product names | Low — React escapes by default | Medium — could steal admin sessions |
| Brute force on admin login | Medium — login is public-facing | Medium — admin password is single layer |
| Vulnerable npm dependency | Low — small dependency tree | Variable |
| Stock manipulation by customer | None — customers have no write path | N/A |

---

## Controls In Place

### ✅ 1. Input Validation

| Location | What's Validated |
|----------|-----------------|
| `src/utils/stock.js` — `decrementStock`, `incrementStock` | Throws `TypeError` for non-numbers, `RangeError` for negatives |
| `src/utils/stock.js` — `validatePrice` | Rejects non-numbers, negatives, and prices above ₱100,000 |
| `src/utils/auth.js` — `validateLoginInput` | Rejects empty fields, type-checks strings, enforces max lengths (50 chars username, 100 chars password) |
| `src/components/AdminDashboard.jsx` — price field | Re-validates on save; alerts user and resets to safe value if invalid |

---

### ✅ 2. Admin Authentication

- Login form at `/admin` route
- Public site (`/`) has zero login surface — customers never see auth at all
- Failed logins return a generic `"Invalid username or password"` message — does not reveal whether the username exists
- 500ms artificial delay on login attempts to discourage brute force scripts
- Login state stored in `sessionStorage` — cleared automatically on browser close

---

### ✅ 3. Constant-Time Credential Comparison

`auth.js` uses a custom `constantTimeEqual` function to prevent **timing attacks**, where an attacker measures response times to deduce password characters one at a time.

A naive `if (a === b)` short-circuits on the first mismatch, leaking length information. This implementation always iterates the full length:

```js
let mismatch = 0;
for (let i = 0; i < strA.length; i++) {
  mismatch |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
}
return mismatch === 0;
```

---

### ✅ 4. Sensitive Values Protected

- Admin credentials live in `.env` (project root)
- `.env` is listed in `.gitignore` — never committed to GitHub
- `.env.example` (planned) will document the variable schema for new developers without exposing real values
- Vite's `VITE_*` prefix ensures only explicitly-named variables are exposed to the client bundle

---

### ✅ 5. Dependency Audit

Result of `npm audit` (captured in `Screenshots/Step9-NpmAudit.png`):

```
found 0 vulnerabilities
```

The full dependency tree (165+ packages) was scanned against the GitHub Advisory Database. No known CVEs found. Future CI will re-run audits on every PR via `npm audit --audit-level=moderate`.

---

### ✅ 6. Default React XSS Protection

React automatically escapes user-supplied strings rendered through `{}` interpolation. Product names, descriptions, and prices all go through this path. `dangerouslySetInnerHTML` is not used anywhere in the codebase.

---

### ✅ 7. HTTPS in Production

The live site at `https://yan-sweet-corner.vercel.app` is served exclusively over HTTPS (Vercel's default). All traffic between the browser and CDN is encrypted in transit.

---

## Known Limitations & Planned Improvements

### ⚠️ Plain-text password in `.env` (not bcrypt)

Credential comparison currently operates on plain text. A hardened setup would:
- Hash the password with bcrypt (cost factor 12+)
- Move verification server-side
- Apply a per-user salt

This is acceptable for now because:
- `.env` never reaches Git or the deployed bundle
- Only one admin exists (the owner)
- The public site cannot trigger admin actions even if the password were known

---

### ⚠️ No rate limiting on login attempts

Any number of failed logins per minute is currently allowed. A determined attacker could attempt thousands of passwords.

**Planned fix:** Cap to 5 attempts per IP per 15 minutes — requires a backend.

---

### ⚠️ Admin auth is client-side only

The login check runs entirely in the browser. A skilled attacker could bypass it via DevTools. This is acceptable because:
- There is no backend to compromise — admin actions only modify in-memory state
- Stock and price changes do not persist across sessions yet (`DEBT-01`)
- Server-side auth is planned for v1.0 (Supabase integration)

---

### ⚠️ No CSRF tokens

Not applicable yet — there is no backend endpoint to attack. Will be introduced alongside the Supabase backend.

---

### ⚠️ No Content Security Policy (CSP) header

Vercel's default headers are reasonable, but a tighter CSP would reduce XSS exposure further. Tracked as future work.

---

## Recurring Practices

| Practice | Frequency | Owner |
|----------|-----------|-------|
| Run `npm audit` | Every PR and weekly | All developers |
| Verify `.env` not committed | Every commit (via `.gitignore`) | All developers |
| Rotate admin password | Every 90 days | Owner |
| Review this document | Every sprint planning meeting | PM |

---

## Incident Response

If admin credentials are ever exposed (committed to Git, shared in a screenshot, etc.):

1. **Immediately** change the password in `.env` and in Vercel environment variables
2. Force a redeploy: `git commit --allow-empty -m "force redeploy" && git push`
3. Audit Git history for the leaked value; use `git filter-repo` to scrub if necessary
4. Log the incident in `docs/defect-log.md` for future prevention

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/risk-register.md`](./risk-register.md) | Broader project risks including security |
| [`docs/tech-debt.md`](./tech-debt.md) | DEBT items related to auth hardening |
| [`docs/qa-plan.md`](./qa-plan.md) | Testing strategy including auth tests |