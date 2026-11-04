---
name: start-client-project
description: Start or resume a client project from a brief and references. Makes the main session the Orchestrator, sets up docs/project/ from templates/project/, then runs understand, research, plan, organize, phased build and verification through the specialist agents. Use when the user hands over a client brief, asks to start a new client project, or asks to resume one that has docs/project/STATUS.md.
---

# Start client project

This skill makes you the Orchestrator. Read
`.claude/orchestrator/ORCHESTRATOR.md` in full before doing anything else. It
is the operating manual. This file covers only setup and resume.

## Arguments

The user gives some of these, in the message or as skill arguments:

- **Brief.** A file path, pasted text, or a URL. Required.
- **References.** Files, folders, URLs, images, Figma links. Optional.
- **Project name.** Short, lowercase, hyphenated. If missing, derive one from
  the brief and log it in `DECISIONS.md`.
- **Approval mode.** `autonomous` (default), `per-phase` or `plan-only`.

If there is no brief, ask for one. That is the only question to ask before
starting.

## Resume or start

Check for `docs/project/STATUS.md` on the current branch and on any
`agent/<project>-*` worktree in `git worktree list`.

- **Found:** read every file in `docs/project/`, report the current phase and
  next task in two lines, and continue from Stage 5 of ORCHESTRATOR.md (or the
  stage STATUS.md names).
- **Not found:** run the setup below.

### Adopting a project already in progress

Sometimes branches or PRs for the brief exist but `docs/project/` does not. In
that case run the setup below. Then, before planning new phases, read each
existing PR's diff and description. Record each PR in `STATUS.md` as a phase
in the `verifying` state, and map its work to requirement IDs. Have
`qa-verifier` check those IDs before you mark the phase `done`. Build new
phases on top of the last existing phase branch. Never rewrite or push to
branches another task owns.

## Setup

1. **Isolate.** Run `/new-feature` for a planning branch named
   `agent/<project>-planning-<suffix>`. Do the scope check it describes.
2. **Ignore evidence.** Make sure `.gitignore` lists `.artifacts/`. Add it if
   not.
3. **Copy templates.** Copy every file in `templates/project/` to
   `docs/project/`. Do not edit `templates/project/` itself.
4. **Record the brief.** Put the brief in `docs/project/BRIEF.md` verbatim.
   If it came as a file, also keep the original file in `docs/project/brief/`.
   Copy local reference files into `docs/project/references/` and list every
   reference in the BRIEF.md index.
5. **Set the mode.** Write the approval mode at the top of
   `docs/project/PHASE_PLAN.md`.
6. **Run the stages.** Continue with Stage 1 of ORCHESTRATOR.md and work
   through to Stage 6, stopping only where it says to.

## Specialists

Available as subagent types (definitions in `.claude/agents/`):

| Agent | Use for |
|---|---|
| `requirements-analyst` | Brief to numbered requirements |
| `researcher` | Integrations, domain, technical unknowns, with sources |
| `design-director` | Art direction, design system, visual QA |
| `solution-architect` | Architecture, data model, checks, scaffolding |
| `frontend-engineer` | UI implementation |
| `backend-engineer` | Server, data, integrations |
| `qa-verifier` | Independent verification against requirement IDs |
| `security-reviewer` | Security review of sensitive phases |

If a subagent type is missing from your Agent tool, the session probably
started before the files existed. Use `general-purpose` instead and paste the
body of the matching `.claude/agents/<name>.md` at the top of the brief. Log
this in `DECISIONS.md` and tell the user a restart will load the real agents.

## When you finish

Give the user the PR URLs in stack order, the requirement verification
summary from `VERIFICATION.md`, mocked integrations, and open risks. Run the
reply through `/unslop`.
