This document explains how the Yan Sweet Corner website is deployed, how to roll back a bad deployment, and how to verify the live site is working after a release.

---

## Platform

**Vercel** — https://vercel.com

Vercel was chosen over alternatives (Netlify, GitHub Pages, Render) for the following reasons:

- Native Vite support with zero configuration
- Automatic deployments on every push to `main`
- Free hobby tier — no credit card required
- Instant rollbacks through the dashboard
- Global CDN for fast load times in the Philippines

---

## Deployment Strategy

| Branch | Deploys To | Purpose |
|--------|-----------|---------|
| `main` | Production URL (`yan-sweet-corner.vercel.app`) | Live site customers see |
| `dev` | Auto-generated preview URL | Internal integration testing |
| `feature/*` | Preview URL per PR | Isolated testing of new features |

---

## First-Time Setup

1. Create a Vercel account via GitHub OAuth at [vercel.com/signup](https://vercel.com/signup)
2. Click **Add New → Project**
3. Import the `Yan-Sweet-Corner` repository
4. Accept the auto-detected settings:

   | Setting | Value |
   |---------|-------|
   | Framework | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Set the production branch to `main`
6. Click **Deploy** and wait ~2 minutes for the initial build
7. Note the production URL — this is the link shared with customers

---

## Routine Deployment

After initial setup, all deployments are automatic:

1. Merge a pull request into `main`
2. Vercel detects the push and starts a new build
3. Build completes in ~60–90 seconds
4. Production URL is updated with the new version

No manual steps are needed for routine deployments.

---

## Rollback Procedure

If a deployment breaks the live site, rolling back takes under one minute.

**Option A — Vercel Dashboard (recommended):**

1. Open the Vercel dashboard for the project
2. Click the **Deployments** tab
3. Find the last known good deployment (green checkmark, matching commit message)
4. Click the three-dot menu (**⋯**) next to it
5. Click **Promote to Production**

The live site reverts within seconds — no rebuild required.

**Option B — Git revert:**

```bash
git revert HEAD
git push
```

This creates a new commit that undoes the last change and triggers a fresh Vercel build.

---

## Verification Checklist

Run this after every production deployment:

- [ ] Homepage loads at the production URL
- [ ] All 9 product images display correctly
- [ ] Prices and stock counts reflect the latest values
- [ ] **Reserve via Messenger** button opens `m.me/rackyroadt`
- [ ] Hover animations work as expected
- [ ] Site is responsive on mobile (browser DevTools or a real device)
- [ ] No console errors (F12 → Console tab)

> If any check fails, follow the rollback procedure above before investigating further.

---

## Monitoring

For this project's scale, monitoring is intentionally lightweight:

| Method | Details |
|--------|---------|
| Vercel dashboard | Build success/failure notifications on every deploy |
| Browser DevTools | Manual performance spot-checks after releases |
| UptimeRobot *(planned)* | Automated downtime alerts — free tier, future iteration |

---

## Cost

| Item | Cost |
|------|------|
| Vercel Hobby plan | ₱0 / month |
| Custom domain *(optional, future)* | ~₱600 / year |
| **Total** | **Free for current scale** |

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/changelog.md`](./changelog.md) | Release history and version notes |
| [`docs/security-checklist.md`](./security-checklist.md) | Environment variable handling and incident response |
| [`docs/tech-debt.md`](./tech-debt.md) | Known gaps including monitoring improvements |