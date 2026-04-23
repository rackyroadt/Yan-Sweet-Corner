Risk Register — Yan Sweet Corner

This register identifies and tracks risks that may impact the success of the Yan Sweet Corner project. Each risk is assessed, assigned an owner, and paired with a mitigation strategy.

Scoring Methodology
Likelihood (L): 1 (Very Unlikely) → 5 (Very Likely)
Impact (I): 1 (Negligible) → 5 (Project-Threatening)
Risk Score: L × I (max: 25)
Severity Levels
🟢 Low: 1–6
🟡 Medium: 7–12
🔴 High: 13–25

Roles:
PM = Project Manager | FE = Frontend Dev | BE = Backend/State Dev | QA = Tester

| ID   | Risk                                 | L | I | Score | Severity  | Owner |
| ---- | ------------------------------------ | - | - | ----- | --------- | ----- |
| R-01 | Tight deadline (Steps 1–7 overnight) | 5 | 4 | 20    | 🔴 High   | PM    |
| R-02 | Hardcoded admin credentials          | 3 | 4 | 12    | 🟡 Medium | BE    |
| R-03 | `localStorage` data loss             | 4 | 3 | 12    | 🟡 Medium | BE    |
| R-04 | Merge conflicts                      | 4 | 2 | 8     | 🟡 Medium | PM    |
| R-05 | Low-quality/missing product photos   | 3 | 3 | 9     | 🟡 Medium | FE    |
| R-06 | Deployment failure                   | 4 | 3 | 12    | 🟡 Medium | BE    |
| R-07 | Insufficient test coverage           | 3 | 3 | 9     | 🟡 Medium | QA    |
| R-08 | Scope creep                          | 4 | 3 | 12    | 🟡 Medium | PM    |
| R-09 | Team member unavailable              | 3 | 4 | 12    | 🟡 Medium | PM    |
| R-10 | npm dependency vulnerability         | 3 | 2 | 6     | 🟢 Low    | BE    |


Detailed Risks & Mitigations
R-01 — Tight Deadline
Score: 20 — 🔴 High
Description: Completing Steps 1–7 overnight creates significant delivery risk due to limited time.
Mitigation:
Restrict scope to MVP (no cart, checkout, or real backend)
Use AI tools for documentation and boilerplate
Defer non-essential polish until after Step 7
Work in focused intervals (45 min work / 5 min break)
R-02 — Hardcoded Admin Credentials
Score: 12 — 🟡 Medium
Description: Storing credentials in source code exposes them if the repository is public.
Mitigation:
Use environment variables from the start
Add .env to .gitignore
Hash credentials in Step 9 (Software Security)
Log as technical debt
R-03 — localStorage Data Loss
Score: 12 — 🟡 Medium
Description: Data stored in the browser may be lost due to clearing storage, device changes, or private browsing.
Mitigation:
Document limitations in README
Provide JSON export/import backup feature
Plan migration to a real backend (e.g., Supabase/Firebase)
R-04 — Merge Conflicts
Score: 8 — 🟡 Medium
Description: Conflicting changes across branches may delay integration.
Mitigation:
Keep pull requests small and focused
Sync with main before development and PR submission
Assign clear file ownership
R-05 — Product Photos
Score: 9 — 🟡 Medium
Description: Missing or inconsistent images reduce UI quality.
Mitigation:
Use placeholders during development
Standardize image specs (1:1, ≥800×800 px, JPG/WebP)
Schedule a short photo session with consistent setup
R-06 — Deployment Failure
Score: 12 — 🟡 Medium
Description: Initial deployment may fail due to configuration issues.
Mitigation:
Use Vercel for simplified deployment
Deploy early to identify issues
Maintain a deployment checklist
R-07 — Insufficient Test Coverage
Score: 9 — 🟡 Medium
Description: Lack of tests increases risk of undetected bugs.
Mitigation:
Write tests alongside feature development
Focus on core logic (stock handling, validation, login)
Require npm test before PR approval
R-08 — Scope Creep
Score: 12 — 🟡 Medium
Description: Additional features may disrupt MVP delivery.
Mitigation:
Defer new ideas to backlog
PM controls scope decisions
Lock Sprint 1 scope in planning document
R-09 — Team Availability
Score: 12 — 🟡 Medium
Description: Unexpected absence can leave critical tasks uncovered.
Mitigation:
Maintain up-to-date documentation
Share knowledge through pairing
Commit work frequently for continuity
R-10 — Dependency Vulnerabilities
Score: 6 — 🟢 Low
Description: Third-party packages may introduce security risks.
Mitigation:
Run npm audit during security phase
Pin dependency versions
Use well-maintained libraries only
Review Cadence

This register is reviewed at the start of each sprint and updated as new risks emerge. Closed risks remain documented for traceability.