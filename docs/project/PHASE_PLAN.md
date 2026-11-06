# Phase plan

Owner: Orchestrator.

- Approval mode: plan-only (owner, 2026-11-07)
- Project branch prefix: agent/pharmacy
- PR strategy: one PR per phase, stacked on the previous phase branch.
  Phase 1 branches from `agent/pharmacy-planning-1107a`, so the planning docs
  sit underneath the code.

Approval modes are `autonomous`, `per-phase` and `plan-only`. See
`.claude/orchestrator/ORCHESTRATOR.md`.

Site-wide requirements (navigation, accessibility, responsive, network,
no-JS) are owned by Phase 1 but rechecked by the e2e suite in every later
phase, because each new page joins the route registry the tests read.

## Phase 1: Foundation and imagery

- Goal: an Astro site in `pharmacy/site/` with the Second Shelf design
  system, the shared layout (floating nav, Apply, footer, placeholder
  component), every check command from ARCHITECTURE.md runnable, a 404 page,
  and the nine accepted images in the repo. Pages exist as stubs so nav and
  link checks have real targets.
- Requirements: R-001, R-002, R-003, R-004, R-005, R-034, R-035, R-036,
  R-039, R-040, R-041, R-042, R-044, R-045, R-046, R-047, R-048
- Depends on: planning PR
- Branch: agent/pharmacy-p1-foundation-1107a

| Task | Specialist | Requirements | Depends on | Done when |
|---|---|---|---|---|
| T-1.1 Scaffold Astro project, fonts, client-facts and routes registries, check scripts and Playwright projects | solution-architect | R-034, R-035, R-039, R-044, R-045, R-046, R-048 | - | `npm ci`, `lint`, `typecheck`, `test:unit`, `build`, `check:links`, `check:content` pass; `test:e2e` runs against stub pages |
| T-1.2 Design tokens, base styles, nav, Apply variants, footer, placeholder chip and block, shelf rail and labels, SiteImage, 404 and Sign in pages | frontend-engineer | R-001 to R-005, R-040, R-041, R-042, R-047 | T-1.1 | `@nav`, `@a11y`, `@screens`, `@motion`, `nojs` pass on stubs; screenshots at 390/834/1440 |
| T-1.3 Generate IMG-01 to IMG-09 with ChatGPT in the owner's Chrome, from the prompts in DESIGN_DIRECTION.md | Orchestrator | R-036 | - (parallel with T-1.1) | Nine PNGs saved under `.artifacts/pharmacy/images/raw/` with the prompt used |
| T-1.4 Review images at 200% against the R-036 checklist; reject and regenerate as needed; add accepted ones to `src/assets/images/` and the manifest | design-director | R-036 | T-1.2, T-1.3 | Every image row in DESIGN_DIRECTION.md marked Accepted; byte budgets pass in `check:content` |

Exit criteria:

- [ ] All checks in ARCHITECTURE.md pass, except `check:lighthouse` (Phase 3) and `check:launch` (expected to fail until the client answers)
- [ ] qa-verifier marks every requirement in this phase `verified`
- [ ] UI checked at 390px, 834px and 1440px by design-director in review mode
- [ ] PR open and `/greploop` finished (Greptile isn't installed on this repo; report that rather than loop)

## Phase 2: Marketing pages

- Goal: Home, Selling, Buying, Trust and security, Fees and FAQ built to
  the page maps in DESIGN_DIRECTION.md, with sourced copy run through
  `/unslop` and the content rules.
- Requirements: R-006 to R-026, R-033, R-037, R-038, R-049 to R-054
- Depends on: Phase 1
- Branch: agent/pharmacy-p2-pages-1107a

| Task | Specialist | Requirements | Depends on | Done when |
|---|---|---|---|---|
| T-2.1 Home (H1 to end, including the one sticky "How a trade moves" section) | frontend-engineer | R-006 to R-010, R-020 (summary), R-033 | Phase 1 | Page matches its section map; checks pass; screenshots at three widths |
| T-2.2 Selling and Buying pages, including "Can I list this?" and "When an order goes wrong" | frontend-engineer | R-012, R-013, R-014, R-016, R-023, R-050, R-053 | Phase 1 (parallel with T-2.1, own worktree and port) | As above |
| T-2.3 Trust and security, Fees and FAQ pages | frontend-engineer | R-011, R-015, R-017 to R-019, R-021, R-022, R-024 to R-026, R-037, R-038, R-049, R-051, R-052, R-054 | Phase 1 (parallel) | As above; every security statement traces to a BRIEF.md line (R-019) |
| T-2.4 Content review: sources, banned terms, legal neutrality (K-1), placeholders | qa-verifier | all Phase 2 IDs | T-2.1 to T-2.3 | `check:content` passes; written trace of R-019 statements |

Exit criteria:

- [ ] All checks pass (except Lighthouse and the launch gate)
- [ ] qa-verifier marks every Phase 2 requirement `verified`
- [ ] design-director review at 390/834/1440 against DESIGN_DIRECTION.md with screenshot files
- [ ] PR open and `/greploop` finished or reported unavailable

## Phase 3: Apply, utility pages and handover

- Goal: Apply (a form that validates and sends nothing), Contact, the three
  legal placeholder pages, performance tuning to the LCP budget, the README,
  and a full verification pass over R-001 to R-055.
- Requirements: R-027 to R-032, R-043, R-055
- Depends on: Phase 2
- Branch: agent/pharmacy-p3-apply-1107a

| Task | Specialist | Requirements | Depends on | Done when |
|---|---|---|---|---|
| T-3.1 Apply page with "Before you apply", form, validation, error summary, confirmation | frontend-engineer | R-027 to R-030, R-055 | Phase 2 | `@apply` passes; no request carries entered values |
| T-3.2 Contact and legal placeholder pages | frontend-engineer | R-031, R-032 | Phase 2 (parallel) | Pages built; links pass |
| T-3.3 Performance pass and README (setup, placeholders, checks, deployment notes) | frontend-engineer | R-043 | T-3.1, T-3.2 | `check:lighthouse` passes mobile and desktop on every main page |
| T-3.4 Security review of the Apply form and headers guidance | security-reviewer | R-029, R-044, R-045 | T-3.1 | No open critical or high findings |
| T-3.5 Final verification of R-001 to R-055 | qa-verifier | all | T-3.1 to T-3.4 | VERIFICATION.md lists every ID with a status and evidence |

Exit criteria:

- [ ] All checks in ARCHITECTURE.md pass, including Lighthouse; `check:launch` fails only on client placeholders, and that is documented
- [ ] qa-verifier marks every requirement `verified`, or `partially verified` with the reason
- [ ] security-reviewer has no open critical or high findings
- [ ] design-director review at 390/834/1440 with screenshot files
- [ ] PR open and `/greploop` finished or reported unavailable

## Out of scope

| Requirement | Reason | Logged in DECISIONS.md |
|---|---|---|
| Marketplace app features F01 to F16 | The site explains them; it does not implement them | D-1 |
| IDEA-9, IDEA-10 | Waiting for the owner (product-decisions.md) | PD table |
| IDEA-3 question flow, IDEA-6 fee calculator, IDEA-8 | High-value enhancements after the MVP; structure left open | PD-5, PD-6, PD-8 |
| Deployment, domain, hosting | Client-owned (brief); hard stop 3 | D-1 |
