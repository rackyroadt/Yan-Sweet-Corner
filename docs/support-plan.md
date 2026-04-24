Support Plan — Yan Sweet Corner

This document defines how issues are reported, triaged, and resolved for the Yan Sweet Corner website.

Audience
Customers — report issues encountered while using the site
Business Owner — reports operational or stock-related issues
Development Team — manages intake, triage, and resolution


Isuue Reporting Channels
| Audience           | Channel                       | Required Information                                         |
| ------------------ | ----------------------------- | ------------------------------------------------------------ |
| Customers          | Facebook / Messenger          | Description, device/browser, screenshot (if available)       |
| Owner / Team       | GitHub Issues                 | Steps to reproduce, expected vs. actual behavior, screenshot |
| Urgent (site down) | Direct Messenger to developer | Mark as **URGENT** and describe impact                       |

GitHub Issue Requirements

All issues should include:

Description — What is happening
Steps to Reproduce — How to trigger the issue
Expected Behavior — What should happen
Actual Behavior — What actually happens
Environment — Device, browser, screen size

Severity Levels
| Severity     | Definition                       | Example                              |
| ------------ | -------------------------------- | ------------------------------------ |
| **Critical** | Site unavailable or data loss    | Site returns 500 error for all users |
| **High**     | Core feature unusable            | Reserve button not working           |
| **Medium**   | Partial or inconsistent behavior | Incorrect low-stock indicator        |
| **Low**      | Cosmetic or minor issue          | Typo in product description          |

Response Time Targets
| Severity | First Response   | Target Resolution    |
| -------- | ---------------- | -------------------- |
| Critical | ≤ 1 hour         | ≤ 4 hours (same day) |
| High     | ≤ 4 hours        | ≤ 1 business day     |
| Medium   | ≤ 1 business day | ≤ 1 week             |
| Low      | ≤ 1 week         | Next sprint or later |

Note: A “business day” reflects the operating schedule of a small, home-based business—not a 24/7 support team.

Issue Lifecycle
Reported — Issue submitted via GitHub or Messenger
Triaged — Severity assigned and owner identified
In Progress — Development work begins on a branch
In Review — Pull request opened and reviewed
Resolved — Fix merged and deployed
Verified — Reporter confirms resolution; issue closed

All issues with severity Medium and above must be logged in docs/defect-log.md for traceability.

Escalation Process

If no response is received within the defined timeframe:

Send a direct Messenger message to the developer
Re-tag the issue with escalated in GitHub
Known Limitations (Not Bugs)
Stock data is stored in localStorage (not shared across devices)
Orders are handled via Messenger (no in-app checkout)
Admin authentication not yet implemented (planned for v0.6)
Related Documents
docs/defect-log.md — Defect tracking and resolution history
docs/deployment-plan.md — Deployment and rollback procedures
docs/risk-register.md — Identified project risks and mitigations
Cleanups Applied
Kept all tables (but standardized wording inside them)
Shortened sentences without losing meaning
Made terminology consistent (“issue,” “resolution,” “behavior”)
Removed repetition and tightened structure
Clarified escalation and lifecycle steps