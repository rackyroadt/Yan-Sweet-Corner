This document visualizes how code flows from a developer's laptop to the live production site, and explains what each stage does.

---

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   DEVELOPER                                                             │
│   ┌──────────┐      ┌─────────────┐      ┌────────────────┐             │
│   │ git push │─────▶│   GitHub    │─────▶│  Pull Request  │             │
│   └──────────┘      │   Remote    │      │    Opened      │             │
│                     └─────────────┘      └────────┬───────┘             │
│                                                   │                     │
└───────────────────────────────────────────────────┼─────────────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   CONTINUOUS INTEGRATION (GitHub Actions — .github/workflows/ci.yml)    │
│                                                                         │
│   ┌──────────┐   ┌──────────┐   ┌─────────────┐   ┌──────────────┐      │
│   │ Checkout │──▶│  Setup   │──▶│  Install    │──▶│  Run Vitest  │      │
│   │   code   │   │ Node 20  │   │ Dependencies│   │  unit tests  │      │
│   └──────────┘   └──────────┘   └─────────────┘   └──────┬───────┘      │
│                                                          │              │
│   ┌──────────────────────┐   ┌──────────────────────────▼─────┐         │
│   │  Smoke: dist/ and    │◀──│  Smoke: `npm run build`        │         │
│   │  dist/index.html     │   │  (production bundle succeeds)  │         │
│   │  exist               │   └────────────────────────────────┘         │
│   └──────────┬───────────┘                                              │
│              │                                                          │
│              ▼                                                          │
│   ┌──────────────────────┐                                              │
│   │   GREEN ✅ / RED ❌   │──── Status posted back to the PR            │
│   └──────────────────────┘                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                                    │
                                        (if green)  │
                                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   REVIEW & MERGE                                                        │
│                                                                         │
│   ┌───────────────┐      ┌──────────────┐      ┌──────────────┐         │
│   │   Reviewer    │─────▶│    Merge     │─────▶│    main      │         │
│   │   approves    │      │     PR       │      │   updated    │         │
│   └───────────────┘      └──────────────┘      └──────┬───────┘         │
│                                                       │                 │
└───────────────────────────────────────────────────────┼─────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   CONTINUOUS DEPLOYMENT (Vercel — auto-detected from main push)         │
│                                                                         │
│   ┌────────────────┐     ┌─────────────────┐     ┌───────────────┐      │
│   │  Vercel pulls  │────▶│  npm install    │────▶│  npm run      │      │
│   │  latest main   │     │  in CI env      │     │  build        │      │
│   └────────────────┘     └─────────────────┘     └───────┬───────┘      │
│                                                          │              │
│   ┌─────────────────────────┐     ┌─────────────────────▼──────────┐    │
│   │   yan-sweet-corner      │◀────│  Publish dist/ to global CDN   │    │
│   │   .vercel.app (LIVE)    │     │  across Vercel edge network    │    │
│   └─────────────────────────┘     └────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Pipeline Stages Explained

### Stage 1 — Developer Push

A developer commits locally and pushes to a feature branch on GitHub. This is the moment automation takes over.

---

### Stage 2 — Pull Request Triggers CI

When a PR is opened against `main` (or a commit is pushed directly to `main` or `dev`), the CI workflow defined in `.github/workflows/ci.yml` runs automatically.

---

### Stage 3 — GitHub Actions CI

The workflow runs six sequential steps on a fresh Ubuntu virtual machine:

| Step | Command | What it does |
|------|---------|--------------|
| 1. Checkout code | *(git)* | Pulls the exact commit being tested |
| 2. Setup Node.js 20 | *(actions/setup-node)* | Installs a clean Node runtime with npm cache |
| 3. Install dependencies | `npm install` | Pulls every package in `package.json` |
| 4. Run unit tests | `npm test -- --run` | Runs all 14 Vitest tests — all must pass |
| 5. Smoke test — build | `npm run build` | Must produce a `dist/` folder without errors |
| 6. Smoke test — artifacts | *(shell check)* | Verifies `dist/` and `dist/index.html` exist |

If any step fails, the workflow stops and posts a red ❌ to the PR. If all steps pass, a green ✅ is posted. PRs cannot be merged while CI is failing (enforced via branch protection).

---

### Stage 4 — Review & Merge

Once CI is green, a reviewer approves and merges the PR. Merging updates the `main` branch.

---

### Stage 5 — Vercel Auto-Deploy

Vercel watches the `main` branch. The moment a new commit lands, it:

1. Pulls the latest code
2. Runs `npm install` in its own environment
3. Runs `npm run build`
4. Publishes the resulting `dist/` folder to its global CDN

The live site at `https://yan-sweet-corner.vercel.app` updates within ~90 seconds — completely hands-off.

---

### Stage 6 — Rollback (if needed)

If a bad deployment reaches production, it can be rolled back via the Vercel dashboard in under a minute — no rebuild required.

> See [`docs/deployment-plan.md`](./deployment-plan.md) for the full rollback procedure.

---

## What This Pipeline Protects Against

| Benefit | How it works |
|---------|-------------|
| Broken tests never merge | CI blocks any PR where Vitest fails |
| Broken builds never deploy | CI blocks any PR where `npm run build` fails |
| No manual deployments | Vercel auto-deploys on every `main` push |
| Every deploy is traceable | Commit hash links directly to a production build |
| Fast rollback | Previous deployments are kept and promotable in one click |

---

## Files Involved

| File | Role |
|------|------|
| `.github/workflows/ci.yml` | CI workflow definition |
| `package.json` | Provides the `test` and `build` scripts that CI calls |
| Vercel dashboard | Configured via OAuth — no in-repo config needed |
| [`docs/deployment-plan.md`](./deployment-plan.md) | Human-readable deployment and rollback procedures |