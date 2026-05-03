This document defines the testing strategy for the Yan Sweet Corner project, including scope, methods, and tools.

---

## Goals

- Detect defects in business logic before deployment
- Prevent regressions through automated tests
- Enable safe refactoring with confidence
- Maintain a repeatable, CI-ready test suite

---

## Test Types

### Unit Tests ✅ — Sprint 1 Focus

Unit tests validate individual functions in isolation — no UI, no browser, only logic.

| | |
|---|---|
| **Scope** | `src/utils/` — stock management, validation, pricing logic |
| **Tool** | Vitest |
| **Command** | `npm test` |

Unit tests are prioritized because they are fast, deterministic, and isolate failures precisely.

---

### Integration Tests — Sprint 2+

Integration tests verify interactions between components and state.

| | |
|---|---|
| **Example** | Admin updates stock → UI reflects the correct value |
| **Tool** | Vitest + React Testing Library (planned) |
| **Status** | Deferred to a future sprint |

---

### Manual / Exploratory Testing

Manual testing validates UI/UX aspects not covered by automation.

| | |
|---|---|
| **Focus Areas** | Layout, responsiveness, touch interaction, visual consistency |
| **Who** | QA role |
| **When** | Before merging any UI-related changes |
| **Devices** | Mobile and desktop browsers |

---

## Tooling

| Tool | Purpose | Rationale |
|------|---------|-----------|
| **Vitest** | Unit testing | Native to Vite, zero-config, fast, Jest-compatible API |
| **GitHub** | Version control | Enables branching, PR reviews, and traceability |
| **Manual Testing** | UX validation | Real-world interaction on actual devices |

---

## Test Coverage — Sprint 1

### Test Files

| File | Tests | Status |
|------|-------|--------|
| `src/utils/stock.test.js` | 14 | ✅ Passing |

### Functions Covered

| Function | Tests |
|----------|-------|
| `decrementStock` | 3 |
| `incrementStock` | 2 |
| `isSoldOut` | 2 |
| `isLowStock` | 3 |
| `canReserve` | 2 |
| `formatPrice` | 2 |

---

## Definition of Done — Testing

A feature is considered adequately tested when:

- All pure functions have at least one unit test
- Edge cases are explicitly covered:
  - Empty input
  - Zero values
  - Negative values
  - Boundary conditions (e.g., over-decrementing)
- The full test suite (`npm test`) passes with zero failures and zero warnings

---

## Bug Handling Process

This project follows a **test-driven debugging** approach — every bug results in a permanent test safeguard.

```
Bug Identified → Logged in defect-log.md → Failing Test Created → Code Fixed → Full Suite Passes → Closed
```

| Step | Action |
|------|--------|
| 1 | Bug identified by QA or a failing test |
| 2 | Logged in `defect-log.md` with reproduction steps |
| 3 | Failing test written (if not already present) |
| 4 | Code updated to resolve the issue |
| 5 | Full test suite executed — all must pass |
| 6 | Bug marked **Closed** after verification |

---

## Quality Standards

- Tests must be deterministic and fully independent of one another
- No flaky or timing-dependent tests
- Clear, descriptive test names are required
- Failures must be reproducible locally before a fix is submitted

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/defect-log.md`](./defect-log.md) | Bug tracking and resolution history |
| [`docs/sprint-1-plan.md`](./sprint-1-plan.md) | Sprint scope and Definition of Done |
| [`docs/tech-debt.md`](./tech-debt.md) | Known gaps including test coverage debt |