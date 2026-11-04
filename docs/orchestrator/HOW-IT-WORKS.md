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
| Repo workflow | `AGENTS.md` and its skills | Isolation, design, testing, PRs, Greptile |

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
      |
  1 Understand .... requirements-analyst -> REQUIREMENTS.md
      |
  2 Research ...... researcher -> RESEARCH.md
      |             design-director -> DESIGN_DIRECTION.md   (in parallel)
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
