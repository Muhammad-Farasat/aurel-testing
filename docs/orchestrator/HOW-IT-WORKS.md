# How the Orchestrator system works

You hand a brief to your main Claude Code session. It becomes the Orchestrator
and runs the project in stages, handing focused work to specialist subagents
and checking what comes back. Project state lives in files, so the work can
pause and resume across sessions.

## Parts

| Part | Location | Role |
|---|---|---|
| Orchestrator instructions | `.claude/orchestrator/ORCHESTRATOR.md` | The manual the main session follows |
| Start skill | `.claude/skills/start-client-project/` | Loads the manual, sets up or resumes a project |
| Specialists | `.claude/agents/*.md` | Subagent definitions, one job each |
| Doc templates | `templates/project/` | Copied to `docs/project/` for each project |
| Design memory skill | `.claude/skills/design-memory/` | Sets up the memory, files references, records design feedback |
| Design memory scaffold | `templates/design-memory/` | Copied once to the memory repo, which lives outside every project |
| Repo workflow | `AGENTS.md` and its skills | Isolation, design, testing, PRs, Greptile |

## Design memory

The factory keeps a long-term record of your design taste in its own git
repo, `~/Documents/design-memory` (or `$DESIGN_MEMORY_DIR`). It sits outside
every client project, so what one project learns reaches the next.

```
references you share --> design-researcher --> references/REF-NNN/ (evidence + analysis)
your feedback -------> Orchestrator routes it:
                         general ---------> preference files, rejections
                         this project ----> DESIGN_DIRECTION.md feedback log
                         one page/part ---> page plan + fix task
new project ---------> design-director reads memory, sorts preferences into
                       applies / adapts / conflicts / doesn't apply,
                       compares 2-3 directions, checks rejections
project ends --------> repeated candidates promoted, final design recorded
```

Preferences gain strength with evidence: `tentative`, then `moderate`, then
`strong`. One offhand remark doesn't become a rule. A remark that could be
general but has only come up once is recorded as a candidate. A rejection is
never deleted. It only gets superseded by a later approval.

The memory shapes decisions without fixing a house style. The client's brief
always wins, and the design director has to show how each preference applies
to the new client, or why it doesn't.

## Product research and ideas

The factory doesn't just build the brief. In Stage 2 it researches the
market, maps opportunities, and generates ideas that could make the product
better. Then it keeps only the ones that earn a place.

- **Depth scales with uncertainty.** A fixed spec gets no market research. A
  new product in a new market gets deep research. The Orchestrator records
  its choice and the reason.
- **Evidence is labeled.** Every finding is a `fact`, `pattern`,
  `inference` or `hypothesis`, with sources and dates. Pages that couldn't
  be opened are listed, never described.
- **Ideas need a problem.** Each idea traces to a user problem or gap,
  covers 13 evaluation fields, and has four 1 to 5 scores with reasons.
  Generic additions such as chatbots, dashboards or notifications with no
  named problem get rejected.
- **Four classes.** `MVP`, `high-value enhancement`, `future opportunity`
  or `rejected`. Rejected ideas stay on record with the reason.
- **You decide the big ones.** The Orchestrator decides low-risk ideas
  itself. Anything that changes business direction, budget or agreed scope
  waits for you, without holding up the rest.
- **Confidential by default.** Each client's research stays in its project.
  Only general lessons with no client details go to `product-principles.md`
  in your memory repo.

## Why the Orchestrator is the main session

Claude Code subagents cannot start other subagents. If the Orchestrator were a
subagent, it could not delegate. So the main session takes the Orchestrator
role, and every specialist is one level below it. This also means you can
watch it, interrupt it, and change its mode at any time.

## Stages

```
Brief + references
      |
  0 Intake ........ worktree, docs/project/, BRIEF.md
      |             design-researcher -> design memory references
      |
  1 Understand .... requirements-analyst -> REQUIREMENTS.md
      |
  2 Research ...... depth: none / light / standard / deep
      |             product-researcher -> market-research, competitor-analysis
      |             researcher -> RESEARCH.md (integrations, tech)
      |             innovation-strategist -> opportunity-map, idea-backlog
      |             Orchestrator -> product-decisions (MVP / later / rejected)
      |             design-director -> DESIGN_DIRECTION.md (reads design memory)
      |
  3 Plan .......... solution-architect -> ARCHITECTURE.md
      |             Orchestrator -> PHASE_PLAN.md
      |
  4 Organize ...... STATUS.md, AGENTS.md checks, planning PR
      |
  5 Execute ....... for each phase:
      |               branch -> delegate -> integrate -> verify -> PR + greploop
      |
  6 Deliver ....... full QA pass, VERIFICATION.md, README, final report
```

Each stage has exit criteria in ORCHESTRATOR.md. The Orchestrator doesn't move
on until they pass.

## Delegation

Every delegation uses the same brief format: goal, requirement IDs with
acceptance criteria, working directory, files to read, constraints, out of
scope, and what "done" means. Specialists start with no memory of the
conversation, so the brief has to carry everything they need.

Every specialist replies in a fixed report format: files changed, requirement
IDs covered, checks run with real output, and what it could not verify. The
Orchestrator treats the report as a claim. It reads the diff and reruns a check
before it marks the task done.

Verifiers (`qa-verifier`, `security-reviewer`) get the requirements and the
code, not the engineer's conclusions. That keeps their judgment independent.

## Isolation

`AGENTS.md` requires one worktree per agent and never building on `main`.

- Planning runs on `agent/<project>-planning-<suffix>`.
- Each phase gets a branch stacked on the previous phase:
  `agent/<project>-p<N>-<slug>-<suffix>`. Each phase opens its own PR whose
  base is the previous phase branch, so phases can be reviewed one at a time
  without merging.
- Specialists that edit code get a sub-worktree branched from the phase
  branch. The Orchestrator merges it back after review.
- Read-only specialists work in the phase checkout and write only docs and
  `.artifacts/` evidence.

## Phase states

```
planned -> in_progress -> verifying -> done
                 ^             |
                 +-- fix ------+        (3 failed attempts -> blocked)
```

`blocked` is a hard stop: the Orchestrator reports to you and waits.

## Approval modes

Set in `docs/project/PHASE_PLAN.md`. The default for this repo is
`autonomous`.

| Mode | Stops for approval |
|---|---|
| `autonomous` | Only on hard stops |
| `plan-only` | Once, after planning, then on hard stops |
| `per-phase` | After planning, after every phase, and on hard stops |

Hard stops apply in every mode. They cover blocking ambiguity, missing
credentials with no mock allowed, actions outside the repo (deploying, real
email, real payments, deleting data), conflicts with other tasks, three failed
attempts, a Greptile cap with open findings, and scope changes. The full list
is in ORCHESTRATOR.md.

For everything else, the Orchestrator picks the most reasonable option, logs
it in `DECISIONS.md`, and keeps going. Read that file to see what it assumed.

## Resuming

All state lives in `docs/project/`. Start a new session, run
`/start-client-project`, and it reads `STATUS.md` and continues from the
recorded stage and task.

## What stays the same

The existing `AGENTS.md` workflow still governs every edit: `/new-feature`,
`/creative-design-director`, `/code-structure`, `/evidence-driven-testing`,
`/unslop`, `/before-and-after` and `/greploop`. The Orchestrator never merges
a PR unless you tell it to.
