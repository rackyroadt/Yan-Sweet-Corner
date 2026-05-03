**Project:** Home-based Filipino desserts business
**Products:** Mango Float, Strawberry Float, Berry Float, Leche Flan, Puto, Kutsinta, Cookies

**Goal:**
Build a simple website where customers can browse products, check stock, and reserve via Messenger. The admin can log in to manage stock, prices, and availability.

---

## Summary

| | |
|---|---|
| **Total User Stories** | 12 |
| **Total Story Points** | 24 |

| ID | Story | Priority | Points | Sprint |
|----|-------|----------|--------|--------|
| [US-01](#us-01--browse-products) | Browse Products | High | 3 | Sprint 1 |
| [US-02](#us-02--view-stock-availability) | View Stock Availability | High | 2 | Sprint 1 |
| [US-03](#us-03--reserve-via-messenger) | Reserve via Messenger | High | 2 | Sprint 1 |
| [US-04](#us-04--admin-login) | Admin Login | High | 3 | Sprint 1 |
| [US-05](#us-05--update-stock) | Update Stock | High | 3 | Sprint 1 |
| [US-06](#us-06--admin-logout) | Admin Logout | Medium | 1 | Sprint 2+ |
| [US-07](#us-07--mark-product-unavailable) | Mark Product Unavailable | Medium | 2 | Sprint 2+ |
| [US-08](#us-08--edit-price) | Edit Price | Medium | 2 | Sprint 2+ |
| [US-09](#us-09--product-descriptions) | Product Descriptions | Medium | 1 | Sprint 2+ |
| [US-10](#us-10--mobile-friendly-design) | Mobile-Friendly Design | High | 2 | Sprint 1 |
| [US-11](#us-11--low-stock-warning) | Low Stock Warning | Low | 2 | Sprint 2+ |
| [US-12](#us-12--contact-and-business-hours) | Contact and Business Hours | Medium | 1 | Sprint 2+ |

---

## User Stories

### US-01 — Browse Products

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 3 |

As a customer, I want to see all available desserts with photos, names, and descriptions so that I can decide what to order.

**Acceptance Criteria:**
- [ ] Homepage displays all products
- [ ] Each product shows image, name, description, and price
- [ ] Layout works on mobile and desktop

---

### US-02 — View Stock Availability

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 2 |

As a customer, I want to see how many units are available so I know if I can reserve.

**Acceptance Criteria:**
- [ ] Each product shows a stock count (e.g., "5 left")
- [ ] **Sold Out** badge appears when stock is 0
- [ ] Sold-out items are visually distinct from available ones

---

### US-03 — Reserve via Messenger

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 2 |

As a customer, I want a button to message the seller about a product.

**Acceptance Criteria:**
- [ ] Button opens Messenger with a pre-filled product name
- [ ] Button is disabled when the product is sold out
- [ ] Works on both mobile and desktop

---

### US-04 — Admin Login

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 3 |

As the admin, I want to log in securely to manage products.

**Acceptance Criteria:**
- [ ] Login form includes username and password fields
- [ ] Invalid credentials show an error message
- [ ] Valid login redirects to the dashboard
- [ ] Session persists until logout

---

### US-05 — Update Stock

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 3 |

As the admin, I want to update stock quantities for each product.

**Acceptance Criteria:**
- [ ] Dashboard lists all products with current stock
- [ ] Stock can be edited via input field or increment/decrement buttons
- [ ] Changes reflect immediately on the public site
- [ ] Stock cannot go below 0

---

### US-06 — Admin Logout

| | |
|---|---|
| **Priority** | Medium |
| **Story Points** | 1 |

As the admin, I want to log out securely when I'm done.

**Acceptance Criteria:**
- [ ] Logout button is visible on the dashboard
- [ ] Logout ends the session and redirects to the login page

---

### US-07 — Mark Product Unavailable

| | |
|---|---|
| **Priority** | Medium |
| **Story Points** | 2 |

As the admin, I want to hide products that are not available for the day.

**Acceptance Criteria:**
- [ ] Admin can toggle availability per product
- [ ] Unavailable items are hidden or clearly labeled on the public site

---

### US-08 — Edit Price

| | |
|---|---|
| **Priority** | Medium |
| **Story Points** | 2 |

As the admin, I want to update product prices without touching the codebase.

**Acceptance Criteria:**
- [ ] Price field is editable in the dashboard
- [ ] Price must be a positive number
- [ ] Changes reflect immediately on the public site

---

### US-09 — Product Descriptions

| | |
|---|---|
| **Priority** | Medium |
| **Story Points** | 1 |

As a customer, I want short product descriptions to help me decide what to order.

**Acceptance Criteria:**
- [ ] Each product displays a 1–2 sentence description
- [ ] Admin can edit descriptions from the dashboard

---

### US-10 — Mobile-Friendly Design

| | |
|---|---|
| **Priority** | High |
| **Story Points** | 2 |

As a customer, I want the site to work well on my phone.

**Acceptance Criteria:**
- [ ] No horizontal scrolling on any screen size
- [ ] Buttons are at least 44×44 px (touch-friendly)
- [ ] Images load quickly and scale properly

---

### US-11 — Low Stock Warning

| | |
|---|---|
| **Priority** | Low |
| **Story Points** | 2 |

As the admin, I want to see at a glance which products are running low.

**Acceptance Criteria:**
- [ ] Stock ≤ 3 displays a **Low Stock** badge
- [ ] Stock = 0 displays a **Sold Out** badge

---

### US-12 — Contact and Business Hours

| | |
|---|---|
| **Priority** | Medium |
| **Story Points** | 1 |

As a customer, I want to see contact details and operating hours without having to message the seller first.

**Acceptance Criteria:**
- [ ] Contact section displays Messenger link, phone number, and business hours

---

## Related Documents

| Document | Description |
|----------|-------------|
| [`docs/sprint-1-plan.md`](./sprint-1-plan.md) | Sprint 1 scope — US-01 through US-05 |
| [`docs/defect-log.md`](./defect-log.md) | Bugs discovered during story implementation |
| [`docs/qa-plan.md`](./qa-plan.md) | Testing strategy and acceptance criteria process |