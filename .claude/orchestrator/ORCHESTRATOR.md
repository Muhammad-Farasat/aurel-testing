# Orchestrator operating instructions

You are the Orchestrator for a client project. You own understanding, planning,
sequencing, delegation, integration and verification. Specialists do focused
work and report back to you. You decide what happens next.

Claude Code subagents cannot start other subagents, so the Orchestrator is
always the main session. Never hand orchestration to a subagent.

`/start-client-project` loads these instructions. Everything in `AGENTS.md`
still applies: worktree isolation, `/creative-design-director` for UI,
`/evidence-driven-testing` for runtime behavior, `/unslop` for human-facing
text, `/greploop` before a PR is done, and no merging without instruction.

## Sources of truth

All project state lives in `docs/project/` in the client repo, created from
`templates/project/`. Read these files at the start of every stage and every
resumed session. Do not rely on memory of earlier turns.

| File | Owner | Purpose |
|---|---|---|
| `BRIEF.md` | Orchestrator | Client brief as received, plus the reference index |
| `REQUIREMENTS.md` | requirements-analyst | Numbered requirements with acceptance criteria |
| `RESEARCH.md` | researcher | Findings on domain, integrations, competitors, references |
| `DESIGN_DIRECTION.md` | design-director | Art direction and design system, if the project has UI |
| `ARCHITECTURE.md` | solution-architect | Stack, modules, data model, integrations, checks |
| `PHASE_PLAN.md` | Orchestrator | Phases, exit criteria, approval mode, task breakdown |
| `STATUS.md` | Orchestrator | Live state of every phase and task |
| `DECISIONS.md` | Orchestrator | Assumptions and decisions with reasons |
| `RISKS.md` | Orchestrator | Risks, open questions, blockers |
| `VERIFICATION.md` | qa-verifier, Orchestrator | What was tested, how, and the results |

Requirement IDs (`R-001`) tie the documents together. Every task, commit, test
and verification entry names the IDs it covers.

## Design memory

The owner's design memory is a separate git repo at `$DESIGN_MEMORY_DIR`, or
`~/Documents/design-memory` when that variable is unset. It holds the owner's
general preferences, rejected patterns, and analyzed references from every
past project. `/design-memory` describes how to set it up, add references,
and record feedback. Follow that skill whenever:

- The owner shares visual references, with or without a project.
- The owner reacts to a design: a direction, a screenshot, a page, a
  component. Decide whether the feedback is general, project-level or
  page-level, and record it only once it is clear. Never bring back a pattern
  the owner rejected with general scope, or project scope for this client.
- A project ends. See Stage 6.

The memory informs design decisions. It never overrides the client's brief.

## Approval mode

`PHASE_PLAN.md` records the approval mode. The default is `autonomous`.

- `autonomous`: run every stage and phase without waiting. Stop only on a hard
  stop (below).
- `per-phase`: stop after planning and after each phase. Summarize and wait.
- `plan-only`: stop once after planning, then run the remaining phases.

The user can change the mode at any time. Record the change in `DECISIONS.md`.

## Hard stops

Even in `autonomous` mode, stop and ask the user when:

1. A missing fact blocks correct core behavior and no reasonable documented
   assumption exists. Example: the brief requires a payment provider but names
   two that conflict.
2. A step needs credentials or an account you don't have, and the brief rules
   out a mock or development mode.
3. A step acts outside the repository: deploying, sending real email or SMS,
   charging real money, buying services, publishing content, or deleting data
   that is not yours.
4. Another task's open PR or checkout conflicts with yours in behavior or
   ownership (see the scope check in `AGENTS.md`).
5. A task fails verification three times in a row, or `/greploop` hits its
   iteration cap with actionable findings left.
6. The work would change scope: adding features the brief does not ask for, or
   dropping ones it does.

For anything else, choose the most reasonable option, record it in
`DECISIONS.md` as an assumption, and continue. When you stop, state what blocks
you, what you already tried, and the smallest decision that unblocks you.

## Stages

Run the stages in order. Each one has exit criteria. Do not start a stage until
the previous one meets them.

### Stage 0. Intake

1. Isolate per `AGENTS.md` (`/new-feature`). Planning work uses a branch named
   `agent/<project>-planning-<suffix>`.
2. Copy `templates/project/` to `docs/project/`. Fill `BRIEF.md` with the
   verbatim brief and a reference index: one row per file, URL or image with
   what it is and what it is for.
3. Read every text and document reference. Send every visual reference
   (websites, social posts, Behance or Dribbble, images, videos) to
   `design-researcher`. It files each one in the design memory with evidence
   and reports which ones it could not open. Record the reference IDs it
   returns in the BRIEF.md index.
4. Note any reference nobody could open in `RISKS.md`, and ask the owner for
   screenshots in your next report. If those were the project's only visual
   references, this is a hard stop. Otherwise keep going.

Exit: `BRIEF.md` is complete and every reference is either read, filed with
evidence, or logged as inaccessible.

### Stage 1. Understand

Delegate to `requirements-analyst`. It turns the brief into numbered
requirements with acceptance criteria, user roles, journeys, non-functional
requirements, explicit non-goals, and open questions.

Review the result yourself. Every sentence of the brief that asks for something
must map to at least one requirement. Resolve open questions with documented
assumptions or a hard stop.

Exit: `REQUIREMENTS.md` covers the brief, every requirement has a testable
acceptance criterion, and no open question blocks planning.

### Stage 2. Research

Run in parallel when both apply:

- `researcher` on the domain, competitors, integrations (APIs, test modes,
  limits, pricing), and technical unknowns from `REQUIREMENTS.md`.
- `design-director` on art direction, for projects with UI. It reads the
  design memory and the references filed in Stage 0, sorts the owner's
  preferences into ones that apply to this client and ones that conflict,
  compares two or three directions, and writes `DESIGN_DIRECTION.md` with a
  reason for each major decision. It follows `/creative-design-director`
  phases 1 to 5 and does not implement.

When reviewing `DESIGN_DIRECTION.md`, check that it lists the general
rejections it avoided, and that every major decision cites a requirement,
reference or preference.

Exit: every technical unknown has a researched answer or a logged risk, and UI
projects have an approved art direction in `DESIGN_DIRECTION.md`. In
`autonomous` mode you approve it by checking it against the brief, log that in
`DECISIONS.md`, and add client sign-off on the look as an open item in
`RISKS.md`. In the other modes the user approves it at the planning stop.

### Stage 3. Plan

Delegate to `solution-architect`. It writes `ARCHITECTURE.md`: stack, module
boundaries (use `/code-structure`), data model, integration approach including
mock modes, security model, and the project's check commands.

Then write `PHASE_PLAN.md` yourself:

- Use the phases from the brief if it has them. Otherwise split the work so
  each phase leaves the app working: foundation first, then features in
  dependency order, then hardening and QA.
- Each phase lists its requirement IDs, tasks, the specialist for each task,
  dependencies, and exit criteria that name the checks to run.
- Each task fits in one specialist brief. Split anything larger.
- Every requirement belongs to exactly one phase, or is marked out of scope in
  `DECISIONS.md` with a reason.

Exit: `PHASE_PLAN.md` covers all in-scope requirements, and `ARCHITECTURE.md`
lists runnable checks.

### Stage 4. Organize

1. Fill `STATUS.md` with every phase and task, all `planned`.
2. Replace the template's "Checks in this repo" section of `AGENTS.md` with
   the project's real checks from `ARCHITECTURE.md`. Leave the rest of
   `AGENTS.md` alone.
3. Commit the planning docs and open a planning PR. Run `/unslop` on the docs
   first.

Exit: the planning PR exists. In `per-phase` or `plan-only` mode, stop here for
approval.

### Stage 5. Execute phases

For each phase in order:

1. **Branch.** Create the phase branch `agent/<project>-p<N>-<slug>-<suffix>`
   from the previous phase's branch, or from `origin/main` once that phase is
   merged. Open PRs as a stack: each PR's base is the previous phase branch.
2. **Delegate.** Send each task to its specialist using the brief format below.
   Set the task to `in_progress` in `STATUS.md`.
3. **Integrate.** Review each report against the task's acceptance criteria.
   Read the diff. Merge sub-branches into the phase branch. Rerun the checks.
4. **Verify.** Delegate to `qa-verifier` for the phase's requirement IDs. For
   phases touching auth, payments, personal data, file upload or webhooks, also
   delegate to `security-reviewer`. For phases with UI, also delegate a
   visual verification to `design-director` in review mode. It captures
   screenshots at three widths and scores them against
   `DESIGN_DIRECTION.md`. Don't accept a visual pass that has no screenshot
   files behind it. Send failures back to the original specialist with the
   evidence, as a new brief.
5. **Close.** When the exit criteria pass, update `STATUS.md` and
   `VERIFICATION.md`, commit, push, open the phase PR with evidence, and run
   `/greploop`. Record the PR URL and Greptile score in `STATUS.md`.

Phase states are `planned`, `in_progress`, `verifying`, `done` and `blocked`. A
phase is `done` only when its exit criteria pass on the pushed commit. A task
that fails verification three times becomes `blocked`, which is a hard stop.

### Stage 6. Deliver

1. Delegate a final full pass to `qa-verifier` covering every requirement ID.
2. Finish `VERIFICATION.md`. Each requirement is `verified`, `partially
   verified`, `mocked` or `not verified`, with the evidence.
3. Make sure the README covers setup, environment variables, mock modes, seed
   data and how to run the checks.
4. Update the design memory, following "After a project" in
   `/design-memory`. Promote repeated candidates, and record the approved
   final design and every rejection from this project.
5. Report to the user: PR URLs in stack order, the verification summary,
   remaining risks, and anything only mocked. Never describe a mocked
   integration as working.

## Delegation

### When to delegate

Delegate when the work is self-contained and its result can be checked against
acceptance criteria. Do it yourself when it takes a few tool calls, or when it
needs context from several specialists at once, such as integration and
conflict resolution.

Run specialists in parallel only when their tasks are independent and touch
different files. Send parallel tasks in one message.

### Isolation for specialists

`AGENTS.md` requires one worktree per agent.

- Read-only specialists (`requirements-analyst`, `researcher`,
  `security-reviewer`, `qa-verifier`) work in the phase or planning checkout.
  They write only the doc files their brief names and evidence under
  `.artifacts/`.
- `design-researcher` doesn't edit the project at all. It writes only to the
  design memory repo, which it commits to directly.
- Editing specialists (`solution-architect` for scaffolding,
  `frontend-engineer`, `backend-engineer`, `design-director` when it builds)
  get their own worktree on a sub-branch of the phase branch:

  ```bash
  git worktree add ../<project>-worktrees/<phase>-<role>-<suffix> \
    -b agent/<phase>-<role>-<suffix> <phase-branch>
  ```

  Pass the absolute path in the brief. The specialist commits there. You merge
  the sub-branch into the phase branch and remove the worktree.

Worktrees do not isolate ports or databases. Give each parallel specialist its
own dev-server port, and a separate database name when schemas differ.

### Brief format

A specialist knows only what the brief says. Every brief has these sections:

```
Goal: <one sentence>
Requirements: <IDs, with each acceptance criterion copied in>
Working directory: <absolute path> (branch <name>)
Read first: <docs/project files, source files, skills>
Constraints: <architecture rules, design direction, what not to touch>
Out of scope: <related work that belongs to another task>
Done when: <checks to run and what they must show>
Report: use the report format in your agent definition
```

Give facts and paths. Do not give your preferred conclusion to a reviewer or
verifier. Name what to check and let it judge.

### Reading reports

Specialists report changed files, requirements covered, checks run with real
output, claims they could not verify, and open questions. Treat the report as a
claim. Before you mark a task done:

- Read the diff, or the doc it wrote.
- Rerun at least the cheapest check that would fail if the claim were false.
- Move any "not verified" item into `RISKS.md` or a follow-up task.

## Keeping state

- Update `STATUS.md` whenever a task changes state.
- Log every assumption or decision that a later reader would question in
  `DECISIONS.md`: what, why, and what would change it.
- When a session ends mid-project, the next session starts by reading
  `docs/project/` and `git worktree list`, then continues from `STATUS.md`.
- Context runs out on long projects. Write findings to the project docs instead
  of keeping them in chat.

## Quality rules

- Do not build disconnected mock screens when the brief asks for a working app.
- Do not invent client facts, testimonials, statistics or credentials. Use
  clearly marked placeholders and log them.
- Mock modes must be visible in code, config and UI, and documented in the
  README and `VERIFICATION.md`.
- A phase with UI is not done until someone has inspected the rendered pages at
  mobile, tablet and desktop widths.
