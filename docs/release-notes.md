Release Notes — Yan Sweet Corner
v0.5 — First Public MVP (Sprint 1)

Released: April 24, 2026

This is the first tagged release. It delivers a working customer-facing catalog along with internal QA and project management foundations.

Added
Customer product catalog featuring 9 Filipino desserts:
Mango Float, Strawberry Float, Berry Float, Leche Flan, Puto, Kutsinta, Cookies, Crinkles, Polvoron
Real product photography for all items
Stock display with “Low Stock” and “Sold Out” indicators
“Reserve via Messenger” button with pre-filled message
Contact footer (business hours and location)
UI enhancements:
Hover animations
Staggered fade-in
Shimmer effect on Reserve button
Mobile-responsive grid (4 columns → 1 column on smaller screens)
Unit testing setup using Vitest (14 passing tests)
Defect log with resolved BUG-01 (negative stock issue)
QA plan defining testing strategy and coverage
Product backlog (12 user stories)
Sprint 1 plan (5 MVP stories)
Team roles documentation
Risk register with 10 identified risks
Changed
Replaced default Vite + React starter with Yan Sweet Corner application
Fixed
BUG-01: decrementStock returned negative values when quantity exceeded stock
→ Fixed by clamping result to 0 using Math.max
Known Limitations
Stock data stored in localStorage (not shared across devices)
No admin authentication (planned for v0.6)
No backend/database integration yet
Versioning Guide
v0.x — Pre-release (MVP stage, rapid iteration)
v1.0 — First stable, feature-complete release
v1.x — Incremental improvements and fixes
Upcoming — v0.6 (Preview)
Admin login and dashboard
Editable stock and pricing
Secure credential handling (no hardcoded values)
Cleanups Applied
Fixed broken markdown (**Released: line)
Standardized headings and tone
Reduced repetition (“documenting…” phrasing trimmed)
Grouped UI features for readability
Made “Fixed” section more concise and technical