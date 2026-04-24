Deployment Plan — Yan Sweet Corner
This document explains how the Yan Sweet Corner website is deployed, how to roll back a bad deployment, and how we verify the live site is working.

Platform
Vercel — https://vercel.com
Vercel was chosen over alternatives (Netlify, GitHub Pages, Render) for these reasons:

Native Vite support with zero configuration
Automatic deployments on every push to main
Free hobby tier (no credit card required)
Instant rollbacks through the dashboard
Global CDN so the site loads quickly in the Philippines


Deployment Strategy
| Branch      | Deploys to                                     | Purpose                          |
|-------------|------------------------------------------------|----------------------------------|
| `main`      | Production URL (`yan-sweet-corner.vercel.app`) | Live site customers see          |
| `dev`       | Preview URL (auto-generated)                   | Internal integration testing     |
| `feature/*` | Preview URL per PR                             | Isolated testing of new features |

Deployment Steps (First-Time Setup)

Create a Vercel account via GitHub OAuth (vercel.com/signup)
Click Add New → Project
Import the Yan-Sweet-Corner repository
Accept auto-detected settings:

Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install


Set production branch to main
Click Deploy
Wait ~2 minutes for the initial build
Note the production URL — this is what we share with customers


Deployment Steps (Routine)
After initial setup, deployment is automatic:

Merge a pull request into main
Vercel detects the push and starts a new build
Build completes in ~60–90 seconds
Production URL is updated with the new version

No manual steps are needed for routine deployments.

Rollback Procedure
If a deployment breaks the site, rolling back takes under one minute.

Open the Vercel dashboard for the project
Click the Deployments tab
Find the last known good deployment (look for the green checkmark and matching commit message)
Click the three-dot menu (⋯) next to it
Click Promote to Production
The live site reverts within seconds — no build required

Alternative rollback via Git:
git revert HEAD
git push
This creates a new commit that undoes the last change and triggers a fresh Vercel deploy.

Verification Checklist
After every production deploy, verify:

 Homepage loads at the production URL
 All 9 product images display correctly
 Prices and stock counts show the latest values
 The "Reserve via Messenger" button opens m.me/rackyroadt
 Hover animations still work
 The site is responsive on mobile (test with browser dev tools or a real phone)
 No console errors in the browser (F12 → Console tab)

If any check fails, follow the rollback procedure above.

Monitoring
For this project's scale, monitoring is intentionally lightweight:

Vercel dashboard provides build success/failure notifications
Browser DevTools used for manual performance spot-checks
UptimeRobot (free) can be added in a future iteration for automated downtime alerts


Cost
| Item                             | Cost                       |
|----------------------------------|----------------------------|
| Vercel Hobby plan                | ₱0/month                   |
| Custom domain (optional, future) | ~₱600/year                 |
| Total                            | **Free** for current scale |