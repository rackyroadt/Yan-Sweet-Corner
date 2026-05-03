This register identifies and tracks risks that may impact the success of the Yan Sweet Corner project. Each risk is assessed, assigned an owner, and paired with a mitigation strategy.

---

## Scoring Methodology

| Factor | Scale |
|--------|-------|
| **Likelihood (L)** | 1 (Very Unlikely) → 5 (Very Likely) |
| **Impact (I)** | 1 (Negligible) → 5 (Project-Threatening) |
| **Risk Score** | L × I (max: 25) |

**Severity Levels:**
🟢 Low: 1–6 · 🟡 Medium: 7–12 · 🔴 High: 13–25

**Role Key:**
`PM` = Project Manager · `FE` = Frontend Dev · `BE` = Backend/State Dev · `QA` = Tester

---

## Risk Summary Matrix

| ID | Risk | L | I | Score | Severity | Owner |
|----|------|---|---|-------|----------|-------|
| R-01 | Tight deadline (Steps 1–7 overnight) | 5 | 4 | 20 | 🔴 High | PM |
| R-02 | Hardcoded admin credentials | 3 | 4 | 12 | 🟡 Medium | BE |
| R-03 | `localStorage` data loss | 4 | 3 | 12 | 🟡 Medium | BE |
| R-04 | Merge conflicts | 4 | 2 | 8 | 🟡 Medium | PM |
| R-05 | Low-quality or missing product photos | 3 | 3 | 9 | 🟡 Medium | FE |
| R-06 | Deployment failure | 4 | 3 | 12 | 🟡 Medium | BE |
| R-07 | Insufficient test coverage | 3 | 3 | 9 | 🟡 Medium | QA |
| R-08 | Scope creep | 4 | 3 | 12 | 🟡 Medium | PM |
| R-09 | Team member unavailable | 3 | 4 | 12 | 🟡 Medium | PM |
| R-10 | npm dependency vulnerability | 3 | 2 | 6 | 🟢 Low | BE |
| R-11 | Admin credentials leaked via Git or screenshot | 2 | 5 | 10 | 🟡 Medium | BE |
| R-12 | Brute-force attack on admin login | 3 | 4 | 12 | 🟡 Medium | BE |
| R-13 | Vulnerable npm dependency introduced over time | 4 | 3 | 12 | 🟡 Medium | BE |

---

## Detailed Risks & Mitigations

### R-01 — Tight Deadline

**Score:** 20 — 🔴 High

Completing Steps 1–7 overnight creates significant delivery risk due to limited time.

**Mitigation:**
- Restrict scope to MVP (no cart, checkout, or real backend)
- Use AI tools for documentation and boilerplate
- Defer non-essential polish until after Step 7
- Work in focused intervals (45 min work / 5 min break)

---

### R-02 — Hardcoded Admin Credentials

**Score:** 12 — 🟡 Medium

Storing credentials in source code exposes them if the repository is public.

**Mitigation:**
- Use environment variables from the start
- Add `.env` to `.gitignore`
- Hash credentials in Step 9 (Software Security)
- Log as technical debt

---

### R-03 — `localStorage` Data Loss

**Score:** 12 — 🟡 Medium

Data stored in the browser may be lost due to clearing storage, device changes, or private browsing.

**Mitigation:**
- Document limitations in README
- Provide JSON export/import backup feature
- Plan migration to a real backend (e.g., Supabase/Firebase)

---

### R-04 — Merge Conflicts

**Score:** 8 — 🟡 Medium

Conflicting changes across branches may delay integration.

**Mitigation:**
- Keep pull requests small and focused
- Sync with `main` before development and before PR submission
- Assign clear file ownership per developer

---

### R-05 — Product Photos

**Score:** 9 — 🟡 Medium

Missing or inconsistent images reduce UI quality.

**Mitigation:**
- Use placeholders during development
- Standardize image specs (1:1 ratio, ≥ 800×800 px, JPG/WebP)
- Schedule a short photo session with a consistent setup

---

### R-06 — Deployment Failure

**Score:** 12 — 🟡 Medium

Initial deployment may fail due to configuration issues.

**Mitigation:**
- Use Vercel for simplified deployment
- Deploy early to surface issues before deadline
- Maintain a deployment checklist

---

### R-07 — Insufficient Test Coverage

**Score:** 9 — 🟡 Medium

Lack of tests increases the risk of undetected bugs reaching production.

**Mitigation:**
- Write tests alongside feature development
- Focus on core logic: stock handling, validation, login
- Require `npm test` to pass before PR approval

---

### R-08 — Scope Creep

**Score:** 12 — 🟡 Medium

Additional features requested mid-sprint may disrupt MVP delivery.

**Mitigation:**
- Defer new ideas to the backlog
- PM controls all scope decisions
- Lock Sprint 1 scope in the sprint planning document

---

### R-09 — Team Availability

**Score:** 12 — 🟡 Medium

Unexpected absence can leave critical tasks uncovered.

**Mitigation:**
- Maintain up-to-date documentation at all times
- Share knowledge through pairing
- Commit work frequently to preserve continuity

---

### R-10 — Dependency Vulnerabilities

**Score:** 6 — 🟢 Low

Third-party packages may introduce security risks over time.

**Mitigation:**
- Run `npm audit` during the security phase
- Pin dependency versions in `package.json`
- Use well-maintained, widely-adopted libraries only

---

### R-11 — Admin Credentials Leaked

**Score:** 10 — 🟡 Medium

The admin username and password live in `.env`. If accidentally committed, screenshotted in a tutorial, or pasted into a chat, an attacker gains full admin access to the dashboard.

**Mitigation:**
- `.env` listed in `.gitignore` — verified via `git status` after every change
- `.env.example` (planned) for onboarding without exposing real values
- 90-day rotation policy for the admin password
- Incident response procedure documented in `docs/security-checklist.md`

---

### R-12 — Brute-Force Attack on Admin Login

**Score:** 12 — 🟡 Medium

The `/admin` route is publicly accessible. An attacker could script repeated login attempts using common passwords.

**Mitigation:**
- Generic `"Invalid username or password"` error — does not reveal which field is wrong
- 500ms artificial delay per login attempt slows brute-force scripts significantly
- Strong password policy (mixed case, numbers, year suffix)
- **Planned:** Server-side rate limiting (max 5 attempts per IP per 15 min) when backend is added in Step 13

---

### R-13 — Vulnerable npm Dependency Introduced Over Time

**Score:** 12 — 🟡 Medium

A new vulnerability could be discovered in any of the 165+ npm dependencies. Without monitoring, the deployed site could quietly become exploitable.

**Mitigation:**
- `npm audit` baseline established (0 vulnerabilities at v0.9 release)
- `npm audit` runs on every CI pipeline execution (`.github/workflows/ci.yml`)
- Dependabot enabled on the GitHub repo (planned)
- Major versions pinned in `package.json` to limit surprise updates

---

## Review Cadence

This register is reviewed at the start of each sprint and updated as new risks emerge. Closed risks remain documented for traceability.

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/security-checklist.md`](./security-checklist.md) | Security controls, known limitations, and incident response |
| [`docs/tech-debt.md`](./tech-debt.md) | Technical debt items including auth hardening |
| [`docs/defect-log.md`](./defect-log.md) | Defect tracking and resolution history |