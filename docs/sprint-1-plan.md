Sprint 1 Plan — Sweet Treats

Sprint Duration: 1 week (tentative)
Sprint Goal:
Deliver a working MVP where customers can browse products with photos and stock counts, and the admin can log in to update stock levels.

| ID    | Story                   | Priority | Points |
| ----- | ----------------------- | -------- | ------ |
| US-01 | Browse Products         | High     | 3      |
| US-02 | View Stock Availability | High     | 2      |
| US-03 | Reserve via Messenger   | High     | 2      |
| US-04 | Admin Login             | High     | 3      |
| US-05 | Update Stock (Admin)    | High     | 3      |

Total Story Points: 13

Rationale

These five stories form the minimum viable product. Together, they allow:

Customers to browse and evaluate products
Customers to take action (reserve via Messenger)
The admin to keep stock data accurate

Removing any one of these would break a core workflow.

Deferred to Sprint 2+
US-06 — Admin Logout
US-07 — Mark Product Unavailable
US-08 — Edit Price
US-11 — Low Stock Warning
US-09 — Product Descriptions
US-10 — Mobile Optimization Improvements
US-12 — Contact and Business Info
Definition of Done

A user story is considered Done when:

Code is merged into the dev branch via Pull Request
At least one unit test exists for logic-related features
Feature is tested on both mobile and desktop viewports
Code has been reviewed by at least one other person
Acceptance criteria are fully met
Known Risks
Simplified Authentication
Admin login will use hardcoded credentials for this sprint. Proper security (password hashing, validation) will be added later.
Impact: Low for MVP, but not production-ready.

No Backend / Data Persistence
Stock data will be stored using browser localStorage instead of a database.
Impact:

Data is device-specific (not shared across devices)
Data can be lost if browser storage is cleared
Not suitable for real multi-user use

This is an intentional tradeoff to reduce complexity for the MVP and will be addressed in a later sprint.