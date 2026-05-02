# DevOps Practices — Yan Sweet Corner

**Version:** 1.0
**Date:** May 2, 2026

This document describes the DevOps practices applied throughout the Yan Sweet Corner project. These practices are what turn a "school project" into a real, professionally-run system.

---

## Source Control

### Git + GitHub
All code lives in a single GitHub repository: https://github.com/rackyroadt/Yan-Sweet-Corner

### Branching Strategy
- **`main`** — always deployable. Anything merged here is auto-deployed to production.
- **`feature/*`** branches — every new feature/fix lives on its own branch (e.g., `feature/security-basics`, `feature/cloud-integration`)
- **`fix/*`** branches — for bug fixes between releases (e.g., `fix/spa-routing`)

### Pull Request Workflow
Every change to `main` goes through a PR:

1. Branch from `main`
2. Make changes + commit with descriptive messages (`feat:`, `fix:`, `docs:`, `chore:`)
3. Push branch to GitHub
4. Open PR with a checklist describing what changed
5. CI runs automatically — must pass before merge
6. Merge → branch deleted → Vercel auto-deploys

This sounds simple, but it's the practice that prevents broken code from reaching production.

### Commit Message Conventions
We use Conventional Commits style:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `chore:` — maintenance, refactoring, dependency updates
- `ci:` — CI configuration changes
- `perf:` — performance improvements

Example: `feat(security): admin login, input validation, dependency audit (Step 9)`

---

## Continuous Integration (CI)

### GitHub Actions
Defined in `.github/workflows/ci.yml`. Triggers on:
- Every push to `main` or `dev`
- Every PR targeting `main`

### Pipeline Stages
1. **Checkout** code from the commit being tested
2. **Setup Node.js 20** with npm cache
3. **Install dependencies** (`npm install`)
4. **Run unit tests** (`npm test -- --run`) — 16 Vitest tests must all pass
5. **Build smoke test** (`npm run build`) — production bundle must compile
6. **Verify build output** — `dist/` and `dist/index.html` must exist

If any step fails, the PR can't be merged (status check is "required" for `main`).

### Recent Pipeline Stats (last 30 days)
- Total runs: ~20+
- Pass rate: ~100%
- Average duration: ~80 seconds

---

## Continuous Deployment (CD)

### Vercel
Vercel watches the GitHub repo and deploys automatically:

| Trigger | Result |
|---------|--------|
| Push to `main` | Production deploy at `https://yan-sweet-corner.vercel.app` |
| Open PR | Preview deploy at unique `*-git-feature-*.vercel.app` URL |
| New PR commit | Preview re-deploys |

### Deploy Workflow
```
git push origin main
   ↓
GitHub fires webhook to Vercel
   ↓
Vercel checks out the commit, runs `npm install` then `npm run build`
   ↓
Built `dist/` is published to global CDN
   ↓
Live within ~90 seconds, no manual steps
```

### Preview Deployments
Critical practice: every PR gets its own URL. This means we can:
- Test cloud-integrated changes against real Vercel infrastructure before merging
- Share a working version with reviewers without deploying to production
- Verify env vars are loaded correctly in the deployed environment

### Rollback
If a bad change reaches production:
1. Open Vercel dashboard → Deployments
2. Click the previous good deployment → "Promote to Production"
3. Live in ~30 seconds, no rebuild needed

This is documented in `docs/deployment-plan.md`.

---

## Environment Management

### Three Environments
- **Local development** — `npm run dev` on owner's laptop, uses `.env`
- **Preview** (Vercel) — auto-deployed from PR branches, uses Vercel env vars
- **Production** (Vercel) — auto-deployed from `main`, same Vercel env vars

### Environment Variables
| Variable | Purpose | Where set |
|----------|---------|-----------|
| `VITE_ADMIN_USERNAME` | Admin login username | Local `.env` + Vercel |
| `VITE_ADMIN_PASSWORD` | Admin login password | Local `.env` + Vercel |
| `VITE_SUPABASE_URL` | Supabase project URL | Local `.env` + Vercel |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable key | Local `.env` + Vercel |

### Secrets Hygiene
- `.env` is in `.gitignore` and was never committed
- Vercel env vars are marked "Sensitive" — values not visible in the dashboard once saved
- Anon Supabase key is intentionally publishable (designed for client-side use)
- The `service_role` Supabase key (full DB access) is never exposed to the browser

---

## Testing Strategy

### Unit Tests (Vitest)
16 tests in `src/utils/stock.test.js` covering:
- `decrementStock` — happy path, zero-clamping, type errors, range errors
- `incrementStock` — happy path, type errors, range errors
- `validatePrice` — valid prices, zero, negative, non-number, too-large
- `isSoldOut`, `isLowStock`, `canReserve` — all business logic states
- `formatPrice` — decimal formatting

These run automatically in CI.

### Smoke Tests
The CI workflow does a `npm run build` and verifies the output. This catches:
- Import errors
- Syntax errors
- Missing dependencies
- Production-only bundling issues

### Manual Testing
For UI changes, the developer manually verifies on:
1. `localhost:5173` (development)
2. The Vercel preview URL (PR-time validation)
3. The production URL after merge

---

## Monitoring & Observability

### Vercel Analytics
Installed via `@vercel/analytics`. Tracks:
- Page views
- Unique visitors
- Bounce rate
- Top pages

Reviewed monthly; first report due 30 days after install.

### Lighthouse Audits
Manual audit done at major milestones:
- Latest baseline: 88 Performance / 97 Accessibility / 100 Best Practices / 83 SEO (desktop)
- Mobile Performance: currently failing (DEBT-05 — image optimization needed)

### Console Logging
Admin actions emit structured log lines (`[admin-event]`) via the `logEvent` helper in `AdminDashboard.jsx`. Currently console-only; could be wired to a real logging service later (e.g., Logtail, Datadog).

### Error Handling
- Supabase failures fall back to static product data with a user-facing notice
- Failed admin saves show an error badge with the exact message
- All admin operations are wrapped in `try/catch`

---

## Documentation Practices

The project is documented across these files in `docs/`:

| Document | Purpose |
|----------|---------|
| `backlog.md` | User stories prioritized for future work |
| `sprint-1-plan.md` | Initial sprint plan |
| `team-roles.md` | Role definitions (PM, FE, BE, QA) |
| `risk-register.md` | All risks with mitigations |
| `qa-plan.md` | Testing strategy |
| `defect-log.md` | All discovered defects |
| `release-notes.md` | Per-version release notes |
| `deployment-plan.md` | How deployments work, including rollback |
| `support-plan.md` | How customer/owner issues are handled |
| `tech-debt.md` | Known shortcuts and improvement plan |
| `performance.md` | Performance baselines and improvements |
| `cicd-diagram.md` | Visual CI/CD pipeline reference |
| `security-checklist.md` | All security controls and limits |
| `ethics-impact.md` | Stakeholders, ethical risks, mitigations |
| `privacy-note.md` | What data we handle, what we don't |
| `ip-and-attribution.md` | All third-party software, AI tool disclosure |
| `kpis.md` | The 5 KPIs we track |
| `metrics-report.md` | Real measurement analysis with action items |
| `cost-benefit.md` | ROI analysis (+232% year 1) |
| `architecture.md` | High-level system design |
| `devops-practices.md` | This document |

This level of documentation is unusual for a solo project but required by the SIM curriculum — and it's professionally valuable.

---

## What's Different from a "Toy Project"

These are the practices that elevate this from a school exercise to something resembling a real production system:

1. **Branch-based development** — never coding directly on `main`
2. **PR reviews** — every change has a checklist and rationale
3. **Required CI** — broken code cannot reach production
4. **Auto-deployment** — humans don't run deploy commands manually
5. **Preview environments** — changes are tested in production-like infra before merging
6. **Real metrics** — Lighthouse and Vercel Analytics, not vibes
7. **Tracked tech debt** — every shortcut is logged with intent to fix
8. **Security checklist** — credentials, validation, audits are not optional
9. **Documented architecture** — anyone joining can understand the system
10. **Cost-benefit awareness** — knowing what time and money this saves and creates

---

## What's Next (Post-v1.0)

The roadmap for ongoing DevOps maturity:

1. **Add Dependabot** for automatic dependency updates
2. **Add Sentry or Logtail** for centralized error tracking
3. **Add a staging environment** that mirrors production for end-to-end QA
4. **Image optimization pipeline** (compress + serve WebP)
5. **Add e2e tests** with Playwright covering critical user flows (browse, login, edit)
6. **Move admin auth to Supabase Auth** so multiple staff can manage the shop
7. **Database migrations** version-controlled in the repo (currently changes are made via Supabase dashboard)

---

**Document version:** 1.0
**Last reviewed:** May 2, 2026
