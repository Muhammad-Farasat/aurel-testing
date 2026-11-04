# Phase plan

Owner: Orchestrator.

- Approval mode: autonomous
- Project branch prefix: agent/<project>
- PR strategy: one PR per phase, stacked on the previous phase branch

Approval modes are `autonomous`, `per-phase` and `plan-only`. See
`.claude/orchestrator/ORCHESTRATOR.md`.

## Phase 1: <name>

- Goal: <what works at the end of this phase>
- Requirements: R-001, R-002
- Depends on: <nothing, or a phase>
- Branch: agent/<project>-p1-<slug>-<suffix>

| Task | Specialist | Requirements | Depends on | Done when |
|---|---|---|---|---|
| T-1.1 <name> | <agent> | R-001 | - | <check and expected result> |

Exit criteria:

- [ ] All checks in ARCHITECTURE.md pass
- [ ] qa-verifier marks every requirement in this phase `verified` or `mocked`
- [ ] security-reviewer has no open critical or high findings (if this phase
      touches auth, payments, personal data, uploads or webhooks)
- [ ] UI pages checked at 390px, 834px and 1440px (if this phase has UI)
- [ ] PR open and `/greploop` finished

<Repeat for each phase.>

## Out of scope

| Requirement | Reason | Logged in DECISIONS.md |
|---|---|---|
| <R-0xx> | <reason> | <D-n> |
