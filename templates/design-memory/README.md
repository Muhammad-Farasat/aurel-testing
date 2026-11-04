# Design memory

This repo holds what the factory has learned about the owner's design taste:
general preferences, rejected patterns, and analyzed references. Every client
project reads it before setting a design direction and writes back what it
learns. It is not tied to any one client.

The factory finds this repo at `$DESIGN_MEMORY_DIR`, or at
`~/Documents/design-memory` when that variable is unset.

## Files

| File | Holds |
|---|---|
| `MY-DESIGN-PREFERENCES.md` | The summary: strongest preferences and dislikes, and candidates waiting for more evidence |
| `visual-principles.md` | Color, contrast, imagery, density, ornament |
| `typography-preferences.md` | Type families, pairings, scale, weight, measure |
| `layout-preferences.md` | Composition, grids, spacing, section rhythm, navigation |
| `interaction-preferences.md` | Hover, transitions, scroll behavior, animation, feedback |
| `approved-and-rejected-designs.md` | Concrete decisions the owner approved or rejected, with the reason |
| `references/INDEX.md` | One row per analyzed reference, with tags for search |
| `references/<id>/README.md` | One analyzed reference with its evidence |

## Rules for anyone editing this repo

1. **Evidence or nothing.** Every preference cites where it came from: owner
   feedback (quoted, dated, with the project) or reference IDs. No preference
   comes from an agent's own taste.
2. **Strength is earned.** A preference starts as `tentative`. It becomes
   `moderate` after the owner states it as general, or after it shows up in
   two projects. It becomes `strong` when the owner says it as a rule ("never",
   "always") or confirms it a third time.
3. **Rejections stay.** Never delete a rejection. If the owner later approves
   the pattern, add the approval, mark the rejection superseded, and keep both.
4. **Provenance stays.** Keep the original URL, platform, creator as shown
   publicly, and the date you looked. Never rewrite where something came from.
5. **No private data.** Do not store credentials, cookies, session tokens,
   private messages, follower lists, or personal details beyond the public
   creator name or handle. Screenshots of other people's work are for private
   study. Do not publish them.
6. **Honest evidence.** A reference counts as inspected only when it has a
   screenshot, measured values, or frames on disk. A URL alone is not
   evidence. Record anything you could not open as `inaccessible`.
7. **Commit each change** with a message that names what changed and why, for
   example `prefs: P-014 tentative, avoid heavy card grids (project acme)`.
