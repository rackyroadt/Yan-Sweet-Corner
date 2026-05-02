Technical Debt Log — Yan Sweet Corner

This document tracks known technical debt—code that works but requires improvement for long-term maintainability.

Each item includes:

Severity — impact on the system (Low / Medium / High)
Effort — estimated fix time (S: <1 hr, M: few hours, L: 1+ day)
Status — Open / In Progress / Fixed
Debt Log
DEBT-01 — Stock persistence limited to localStorage
Severity: High
Effort: L
Status: Open

Description:
Stock updates are stored only in the browser:

Changes do not sync across devices
Clearing browser data removes all stock values
Customers see default values instead of real-time data

Proposed Fix:
Replace localStorage with a cloud database (e.g., Supabase or Firebase Firestore).

Deferred Because:
Out of scope for Sprint 1; planned for v0.7–v0.8.

DEBT-02 — Hardcoded contact information
Severity: Medium
Effort: S
Status: Open

Description:
The CONTACT object is defined in src/data/products.js. Any update requires code changes and redeployment.

Proposed Fix:
Move contact data to environment variables (.env) or an admin-editable configuration. Ideally integrate into the v0.6 admin dashboard.

DEBT-03 — No design system / inconsistent styling
Severity: Low
Effort: M
Status: Open

Description:
Styles are defined inline and in App.css without a structured design system. This may lead to duplication as the app scales.

Proposed Fix:
Adopt a design system:

Tailwind (with custom config), or
CSS Modules with centralized design tokens

Note:
Low priority due to small current scope.

DEBT-04 — Missing error boundaries and loading states
Severity: Medium
Effort: S
Status: Open

Description:
Unhandled errors can crash the entire app. There are no loading states for images or async UI.

Proposed Fix:

Add a React error boundary wrapper
Implement skeleton loaders or basic loading indicators
DEBT-05 — Inefficient image loading
Severity: Medium
Effort: S
Status: Fixed (Sprint 1)

Description:
All images load immediately, increasing initial load time. Some images are oversized.

Fix Implemented:

Added loading="lazy"
Added decoding="async"

Impact:
Improved initial render performance and reduced unnecessary network usage.

Priorities
DEBT-05 — Completed (Sprint 1)
DEBT-02 — Target: v0.6 (with admin features)
DEBT-04 — Target: v0.6 (stability improvement)
DEBT-01 — Target: v0.7+ (post-MVP scaling)
DEBT-03 — Target: v1.0+ (if complexity increases)
Maintenance Process
New debt is logged when shortcuts or compromises are introduced
Reviewed at the start of each sprint
At least one item is resolved per sprint (“tech debt tax”)
All items remain in the log after resolution for traceability
Cleanups Applied
Standardized headings and status format
Removed repetition (“this means…”) and tightened descriptions
Made “Proposed Fix” sections consistent
Clarified priority reasoning
Normalized tone across all entries

## DEBT-06 — Admin can't upload new product photos

**Discovered:** May 2, 2026 (post-v1.0)
**Severity:** Low — feature gap, not a bug
**Location:** Admin dashboard, all product rows

**Description:**
Product photos are currently bundled with the React app at build time (`src/assets/products/`). Changing a photo requires editing code, committing, pushing, redeploying. The admin can edit prices and stock through the UI but not photos.

**Impact:**
Owner can't refresh photos seasonally or for new product variants without developer help.

**Plan:**
v1.1 will add Supabase Storage integration:
- "Upload Photo" button per product in admin
- File uploads to a Supabase Storage bucket
- Public URL saved back to the products table
- Public site reads `image_url` from DB instead of bundled imports

Estimated effort: 3-4 hours.
