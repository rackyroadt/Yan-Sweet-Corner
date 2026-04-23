QA Plan — Yan Sweet Corner

This document defines the testing strategy for the Yan Sweet Corner project, including scope, methods, and tools.

Goals
Detect defects in business logic before deployment
Prevent regressions through automated tests
Enable safe refactoring with confidence
Maintain a repeatable, CI-ready test suite
Test Types
Unit Tests ✅ (Sprint 1 Focus)

Unit tests validate individual functions in isolation—no UI, no browser, only logic.

Scope: src/utils/
(stock management, validation, pricing logic)
Tool: Vitest
Command: npm test

Unit tests are prioritized because they are fast, deterministic, and isolate failures precisely.

Integration Tests (Sprint 2+)

Integration tests verify interactions between components and state.

Example: Admin updates stock → UI reflects correct value
Tool: Vitest + React Testing Library (planned)
Status: Deferred to future sprint
Manual / Exploratory Testing

Manual testing validates UI/UX aspects not covered by automation.

Focus Areas: Layout, responsiveness, touch interaction, visual consistency
Who: QA role
When: Before merging UI-related changes
Devices: Mobile + desktop browsers

| Tool               | Purpose         | Rationale                                              |
| ------------------ | --------------- | ------------------------------------------------------ |
| **Vitest**         | Unit testing    | Native to Vite, zero-config, fast, Jest-compatible API |
| **GitHub**         | Version control | Enables branching, PR reviews, and traceability        |
| **Manual Testing** | UX validation   | Real-world interaction on actual devices               |

| File                      | Tests | Status    |
| ------------------------- | ----- | --------- |
| `src/utils/stock.test.js` | 14    | ✅ Passing |

Functions Covered
decrementStock — 3 tests
incrementStock — 2 tests
isSoldOut — 2 tests
isLowStock — 3 tests
canReserve — 2 tests
formatPrice — 2 tests
Bug Handling Process
Bug identified (QA or failing test)
Logged in defect-log.md with details
Failing test created (if not already present)
Code updated to resolve the issue
Full test suite executed (all must pass)
Bug marked Closed after verification

This follows a test-driven debugging approach, where each bug results in a permanent test safeguard.

Definition of Test Coverage (Sprint 1)

A feature is considered adequately tested when:

All pure functions have at least one unit test
Edge cases are explicitly covered:
Empty input
Zero values
Negative values
Boundary conditions (e.g., over-decrementing)
The full test suite (npm test) passes with zero failures and zero warnings
Quality Standard
Tests must be deterministic and independent
No flaky or timing-dependent tests
Clear, descriptive test names required
Failures must be reproducible locally before fix