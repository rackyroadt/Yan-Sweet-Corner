# IP & Attribution — Yan Sweet Corner

This document records all third-party software, content, and tools used in building Yan Sweet Corner, along with their licenses. It also discloses AI assistance used during development.



## Project License

Yan Sweet Corner itself is released under the **MIT License** — see `LICENSE` at the project root.



## Original Content

The following are original works by the project owner (Jiane Rackyle Sarting):

| Asset | Type | Source |
|-------|------|--------|
| All product photographs | Image | Taken by the owner |
| All product names, descriptions, prices | Text | Owner's own content |
| Business name "Yan Sweet Corner" | Text | Owner's own brand |
| Logo / hero typography | Visual style | Custom CSS, no external font dependency |

These are not licensed to third parties without permission.



## Third-Party JavaScript Dependencies

All dependencies are listed in `package.json`. The major ones with their licenses:

| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| react | 19.x | MIT | Core UI framework |
| react-dom | 19.x | MIT | React DOM rendering |
| react-router-dom | 7.x | MIT | Client-side routing for `/admin` |
| bcryptjs | 3.x | MIT | Password hashing utilities (kept as dependency for future use) |
| vite | 8.x | MIT | Build tool and dev server |
| @vitejs/plugin-react | 5.x | MIT | React Fast Refresh integration with Vite |
| vitest | 4.x | MIT | Unit testing framework |
| eslint | 9.x | MIT | Code linting |
| @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh | various | MIT | ESLint configuration |

A full audit of all transitive dependencies (165+ packages) was run via `npm audit` and reported zero known vulnerabilities (see `Screenshots/Step9-NpmAudit.png`).

All listed packages are MIT licensed, which is fully compatible with the MIT license of this project.


## Hosting & Infrastructure

| Service | Role | Terms |
|---------|------|-------|
| Vercel | Site hosting, CI/CD, deployment | Hobby plan (free tier); subject to Vercel's Terms of Service |
| GitHub | Source code repository | Free public plan; subject to GitHub's Terms of Service |

These are services we *use* rather than software we redistribute, so their licenses don't propagate to our code.


## Fonts & Iconography

| Asset | Source | License |
|-------|--------|---------|
| System font stack (Segoe UI, Roboto, etc.) | Default OS fonts | OS-bundled, no separate license required |
| Emojis (🍰 📍 💬 etc.) | Unicode Standard / OS-rendered | Standard Unicode characters, no licensing needed |

No web fonts (Google Fonts, Adobe Fonts, etc.) are loaded.


## AI Tools Used in Development

The codebase was built with assistance from large language model AI tools, primarily for:

- Initial component scaffolding and file structure
- Documentation drafting (Markdown files in `docs/`)
- Debugging assistance and code review
- Generating boilerplate (CSS, test cases, configuration)

All AI-generated content was reviewed, tested, and verified by the human owner before being committed. The owner takes full responsibility for the correctness, security, and originality of the final code.

**Specific AI tools used:**
- Anthropic Claude (Sonnet 4.7) — primary coding assistant

This usage is disclosed for academic integrity. The architectural decisions, business logic intent, product specification, and business identity are all the owner's own.


## Borrowed Patterns & Inspiration

No code was copy-pasted from other open-source projects without attribution. Patterns commonly seen in the React community (custom hooks, component composition, controlled inputs, etc.) are general programming idioms and don't require attribution.


## What's NOT in This Project

To be explicit about what we *don't* use:

- ❌ No copyrighted images from the internet
- ❌ No paid template or theme purchased and resold
- ❌ No code copied from Stack Overflow without understanding
- ❌ No GPL-licensed dependencies (which would force this project to also be GPL)
- ❌ No proprietary fonts
- ❌ No tracking pixels or third-party analytics


## How to Update This Document

Whenever a new dependency is added (`npm install <something>`), the new package and its license should be added to the table above. Run `npm view <package> license` to check.

For AI tools, update the "AI Tools Used" section if you start using a different one.

**Last reviewed:** April 26, 2026