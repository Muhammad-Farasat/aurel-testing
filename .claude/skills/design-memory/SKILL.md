---
name: design-memory
description: Maintain the owner's persistent design memory across projects. Set up the memory repo, file new visual references (websites, Instagram, Behance, Dribbble, screenshots, videos) through the design-researcher, and turn design feedback ("I like this typography", "too many cards", "this feels empty") into general, project or page-level records. Use when the owner shares design references or reacts to a design, or asks what the factory knows about their taste.
---

# Design memory

The design memory is a separate git repo holding the owner's design
preferences, rejected patterns, and analyzed references. It outlives any one
client project. Its `README.md` sets the rules for editing it. Read that
first.

## Locate it

Use `$DESIGN_MEMORY_DIR` if it is set. Otherwise use
`~/Documents/design-memory`. If neither exists, run **Set up** below before
anything else.

## Set up

1. Copy `templates/design-memory/` from the factory repo to the memory path,
   including `references/` and `.gitignore`.
2. Run `git init -b main` there, then commit with the message
   `chore: start design memory`.
3. Tell the owner where it lives. A private GitHub remote makes it survive a
   lost machine, but create one only if the owner asks.

The memory repo is personal notes, not product code. Commit straight to its
`main`. The factory's worktree and PR rules don't apply there.

## Add references

When the owner shares references, with or without a client project:

1. Send them to the `design-researcher` subagent. Give it the URLs and file
   paths exactly as the owner gave them, any comment the owner made about
   each one, and the project name if there is one.
2. Read its report. For each reference marked `inaccessible` or `partial`,
   ask the owner for screenshots, exported images or a screen recording.
   Never describe content nobody could open.
3. If the owner commented on a reference ("love the type here"), treat the
   comment as feedback and route it as below, citing the reference ID.

## Record feedback

The owner's reactions are the most valuable input the memory gets. Handle
each one in three steps.

### 1. Decide the scope

| Scope | Signals | Where it goes |
|---|---|---|
| General | "I always", "I never", "I don't like X" with no project context, or the same reaction in two or more projects | Memory topic file, `MY-DESIGN-PREFERENCES.md`, and `approved-and-rejected-designs.md` for rejections |
| Project | Mentions this client, its brand or audience ("for this bakery", "this brand is too playful for this") | `docs/project/DESIGN_DIRECTION.md` feedback log and `docs/project/DECISIONS.md` |
| Page or component | Points at one thing ("this hero", "the booking form spacing") | The page plan in `DESIGN_DIRECTION.md` and a fix task in `STATUS.md` |

If the owner reacts to something on screen without saying what, identify the
element from the latest screenshot and name it in the record.

### 2. Decide whether it is clear enough

Feedback is clear when you can name the pattern concretely and say which way
the owner leans. "Too generic" about a page with a centered hero and three
cards is clear once you say which pattern makes it generic. A bare "I don't
like it" is not clear.

- **Clear, general:** add or update a preference. A first general statement
  is `moderate`. "Never" or "always" makes it `strong`.
- **Clear, but scope unsure:** record it at project scope, and add a
  `Candidates` row in `MY-DESIGN-PREFERENCES.md`. Promote it when it shows up
  in a second project, or when the owner confirms it.
- **Unclear:** ask one short question naming two concrete readings, for
  example "Too empty because of the large gaps between sections, or because
  the hero has no image?" Don't write a preference from a guess.

### 3. Write it

- Quote the owner's words, and note the date and the project.
- Rejections go in `approved-and-rejected-designs.md` with the reason. If the
  owner gave no reason, ask once. If there is still none, write "reason not
  given".
- When new feedback contradicts an old entry, don't delete the old one. Mark
  it superseded and point at the new one.
- Commit in the memory repo, naming the ID and scope, for example
  `prefs: RJ-004 general, no stacked card grids`.
- Tell the owner in one line what you recorded and at which scope, so they
  can correct it.

## Answer "what do you know about my taste?"

Summarize `MY-DESIGN-PREFERENCES.md`: strong preferences, strong dislikes,
and open candidates, each with its evidence count. Don't add opinions of your
own.

## After a project

At Stage 6 of the Orchestrator, review the project's design feedback log and
`DECISIONS.md`. Promote any candidate that has now shown up in two projects.
Then add the project's approved final design to
`approved-and-rejected-designs.md`, with its screenshots copied into the
memory, so later projects can see what worked. If the brief says the client's
work is confidential, record the decisions without images.
