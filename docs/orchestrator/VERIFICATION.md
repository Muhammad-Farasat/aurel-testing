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

## Design memory (2026-11-04)

### Static checks

The validator now also checks both skills and their `.agents` mirrors, the
`design-researcher` agent, all ten scaffold files in `templates/design-memory/`,
every memory file name the skill and agents mention, and that memory
reference IDs use `REF-` so they can't collide with requirement `R-` IDs.
Result on the branch: `0 failures`. `node --check` passes on the capture
script.

On copies with planted faults, it reported each one:

| Planted fault | Reported |
|---|---|
| Deleted `layout-preferences.md` from the scaffold | yes |
| Reference template using `R-000` | yes, after fixing a shell escape that had first hidden it |
| Changed `.agents` mirror of `/design-memory` | yes |
| `design-researcher` renamed in the start skill | yes |
| `qa-verifier` naming `approved-rejected.md`, which doesn't exist | yes |

### Live intake and feedback test

A headless `claude -p` session ran `/design-memory` in a sandbox project, with
`DESIGN_MEMORY_DIR` pointed at a throwaway memory repo. The input was three
references and two pieces of feedback:

| Input | What it did | Correct? |
|---|---|---|
| `https://linear.app` with "I like how restrained the typography is" | Filed REF-001 as `inaccessible`, because browser tools weren't available in that session. Kept the comment and did not turn "restrained" into a preference without measurements. | yes |
| An Instagram post URL that doesn't exist | Filed REF-002 as `inaccessible`, described nothing, and asked for a file or a corrected link | yes |
| `refs/flow-demo.mp4`, actually an ffmpeg test pattern | Extracted all 60 frames, viewed them, and saw it was a test pattern with no menu. Filed REF-003 as `partial` with frames, a hash and ffprobe data, drew no design conclusions, and asked for the real recording. | yes |
| "I never want stacked grids of identical rounded cards..." | Recorded RJ-001 and P-001 at general scope, strength `strong` because of "never", quoting the owner | yes |
| "This feels too empty." | Recorded nothing. Asked what "this" was and offered two concrete readings. | yes |

It made two commits in the memory repo and none in the project. It cost $2.29
and took about 10 minutes.

### Browser path, tested in an interactive session

Headless `claude -p` sessions don't load the Claude in Chrome tools, so I
tested the browser path in this session on `https://linear.app`:

- `javascript_tool` read the computed styles. The h1 is Inter Variable, 64px,
  weight 510, letter spacing -1.408px. Body text is 15px on `rgb(8, 9, 10)`.
- The first screenshot showed a nearly black hero because the entrance
  animation hadn't run yet. After a 3 second wait, the hero rendered.
- `resize_window` to 1440 and then to 390 left the page at `innerWidth`
  1536, with a pixel ratio of 1.25. On this machine, Chrome can't produce
  responsive screenshots.

From those findings I added `capture-reference.mjs`, a Playwright script
that runs through the existing `run-playwright.sh` helper. On linear.app it
produced full-page screenshots at `innerWidth` 1440, 834 and 390, with the h1
scaling 64, 56 and 38px, plus `styles.json`. I opened the 390px capture to
confirm it had rendered. The agents now use the script for exact widths and
Chrome for interactions, and they check `innerWidth` before trusting a
width.

The headless test also showed the researcher picking a memory folder by
itself when it couldn't read `$DESIGN_MEMORY_DIR`. It now has to read the
variable explicitly, and stops if it can't.

### Not tested for design memory

- A full project run where the design director reads a populated memory,
  sorts preferences, compares directions and writes `DESIGN_DIRECTION.md`.
- Visual verification rounds on a real app built by the factory.
- Instagram, Behance or Dribbble content seen through a logged-in Chrome
  session.
- `gif_creator` recordings of interactions.
- A `design-researcher` subagent running the new capture script. I ran the
  script directly.

## Not tested

- Stages 4 to 6: the planning PR, building phases, sub-worktree merges,
  `qa-verifier` and `security-reviewer` runs, `/greploop` on phase PRs, and
  final delivery. These need a real remote and a real app. Their instructions
  were reviewed but not executed.
- Resume from STATUS.md in a new session.
- Adopting an in-progress project with existing phase PRs.
- `per-phase` and `plan-only` approval modes.
- Behavior with interactive permission prompts instead of the allowlist above.
- The installed skill-creator validator, which `AGENTS.md` notes does not
  recognize every frontmatter field. The script above checked frontmatter
  instead.
