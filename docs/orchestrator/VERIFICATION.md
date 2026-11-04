# Verification report

What was tested on the Orchestrator system before it shipped, and what was
not. Date: 2026-11-04. Claude Code 2.1.310 on Windows 10.

## Static checks

A script read every new file and checked:

- Each agent's `name` matches its filename, the description is present and
  under 1024 characters, every listed tool is a real tool name, and the body
  has a Report section.
- The skill's frontmatter is valid and `.agents/skills/start-client-project/`
  matches `.claude/skills/start-client-project/` byte for byte.
- SKILL.md and ORCHESTRATOR.md mention all eight agents and no undefined ones.
- The sources-of-truth table in ORCHESTRATOR.md lists exactly the ten files in
  `templates/project/`.
- Every `/skill` reference resolves to a skill in `.claude/skills/`.
- Every local link in `AGENTS.md` and `docs/orchestrator/`, and every
  backticked `.claude/`, `templates/` or `docs/orchestrator/` path, exists.
- No em dashes, en dashes or curly quotes in the new prose.

Result on the branch: `0 failures`. `git diff --check`: clean.

To confirm the script catches problems, I ran it on a copy with four planted
faults: a renamed agent, a deleted template, a broken link in AGENTS.md, and
a changed skill mirror. It reported 8 failures covering all four and exited 1.

## Live dry run

I copied the system into a fresh git repo in a temp directory and ran a
headless session:

```
claude -p "/start-client-project  Brief: briefs/harbor.md ..." \
  --permission-mode acceptEdits --max-turns 120 \
  --allowedTools "Read,Write,Edit,Glob,Grep,Agent,Skill,WebSearch,WebFetch,Bash(git:*),Bash(mkdir:*),Bash(cp:*),Bash(ls:*)"
```

The brief was a 12-line fictional bakery ordering site. The prompt limited the
run to Stages 0 to 3, replaced `/new-feature` with a local branch (the sandbox
had no remote), and capped each agent at 6 web lookups.

Observed from the session's event log and the files on disk:

| Check | Result |
|---|---|
| Session loaded all 8 agents and the skill | yes, listed in the init event |
| Planning branch created | `agent/harbor-bakery-planning-dry1` |
| `.artifacts/` added to `.gitignore` | yes |
| All 10 templates copied to `docs/project/`, `templates/` untouched | yes |
| Brief stored verbatim and original kept in `docs/project/brief/` | yes |
| Stage 1 delegated to `requirements-analyst` | yes, 23 requirements, all brief sentences mapped |
| Stage 2 ran `researcher` and `design-director` in parallel | yes |
| Stage 3 delegated to `solution-architect` | yes, ARCHITECTURE.md with a Checks table |
| PHASE_PLAN.md covers every requirement | 23 of 23 IDs appear |
| Approval mode recorded | `autonomous` |
| Assumptions logged | 12 entries in DECISIONS.md |
| STATUS.md names the stage and next action | yes |
| Stopped at the end of Stage 3 | yes, nothing committed or pushed |
| `general-purpose` fallback needed | no |

Wall time was about 16 minutes across the session's turns. Reported cost was
$6.07 for Stages 0 to 3 on a small brief. A real brief with full research
will cost more.

### Change made from the dry run

In autonomous mode the Orchestrator approved the art direction itself, since
the Stage 2 exit criteria said "approved" without saying by whom. That's
reasonable, but it wasn't written down. ORCHESTRATOR.md now says the
Orchestrator approves against the brief in autonomous mode, logs it, and lists
client sign-off as an open risk.

The design director's contrast-check script could not run because the dry run
did not allow `python`. That is a limit of the sandbox permissions, not the
system.

## Not tested

- Stages 4 to 6: the planning PR, building phases, sub-worktree merges,
  `qa-verifier` and `security-reviewer` runs, `/greploop` on phase PRs, and
  final delivery. These need a real remote and a real app. Their instructions
  were reviewed but not executed.
- Resume from STATUS.md in a new session.
- Adopting an in-progress project such as AUREL PRs #1 and #2.
- `per-phase` and `plan-only` approval modes.
- Behavior with interactive permission prompts instead of the allowlist above.
- The installed skill-creator validator, which `AGENTS.md` notes does not
  recognize every frontmatter field. The script above checked frontmatter
  instead.
