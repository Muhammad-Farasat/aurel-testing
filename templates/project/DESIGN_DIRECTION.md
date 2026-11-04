# Design direction

Owner: design-director, following `/creative-design-director` and the design
memory. Skip this file for projects without a UI and note that in
DECISIONS.md.

Every major decision has a reason that cites a requirement (`R-001`), a
reference (`REF-001`), or a preference or rejection (`P-001`, `RJ-001`).

## Client and audience

- Client identity: <who they are, what they sell, how they want to be seen>
- Audience: <who uses it, on what devices, in what situation>
- Primary task or conversion: <what users must be able to do>
- Brand traits from the brief: <list>
- Brief's explicit dos and don'ts: <list>

## Design memory applied

Memory read on <YYYY-MM-DD> from <memory path>, commit <sha>.

| ID | Preference or rejection | Decision | Reason |
|---|---|---|---|
| <P-001> | <one line> | <applies, adapts, conflicts, doesn't apply> | <why, for this client> |

Rejections checked and avoided:

- [ ] <RJ-001> <pattern>: <where the direction could have used it, and what
      it does instead>

## References

| ID | Reference | Source | What to take | What not to copy |
|---|---|---|---|---|
| <REF-001> | <title> | <client brief, owner, memory> | <principle> | <signature elements> |

## Directions compared

### A. <name>

- Concept: <one or two sentences>
- Type: <pairing>
- Color: <approach>
- Layout: <idea>
- Motion: <idea>
- References: <REF IDs>

<Repeat for B, and C if there is one.>

| Criterion | A | B | C |
|---|---|---|---|
| Fit with audience and brand | <1-5> | | |
| Brief requirements, accessibility, primary task | | | |
| Owner's applicable preferences | | | |
| Distinct from competitors and past projects | | | |
| Buildable in stack and time | | | |
| Total | | | |

Chosen: <A, B or C>. Why: <reasons, citing the scores and evidence>.

## Concept

<Two or three sentences on the chosen creative idea and why it fits this
audience.>

## Design system

### Typography

| Role | Family | Weights | Sizes (mobile / desktop) | Reason |
|---|---|---|---|---|
| Display | <font> | <weights> | <sizes> | <citation> |
| Body | <font> | <weights> | <sizes> | <citation> |
| UI labels | <font> | <weights> | <sizes> | <citation> |

### Color tokens

| Token | Value | Use | Reason |
|---|---|---|---|
| `--color-<name>` | `#000000` | <where it goes> | <citation> |

Contrast checks: <pairs checked and their ratios>

### Layout principles

- Spacing scale: <values>
- Grid: <columns and gutters per breakpoint>
- Radius and borders: <rules>
- Section rhythm: <how sections vary while staying consistent>

### Imagery

- Sources: <real photography, licensed stock, generated, client assets>
- Rules: <crop, color treatment, what never to use>

### Interaction patterns

- <navigation, hover, focus, forms, feedback states, with reasons>

### Animation direction

- <what moves, duration, easing, and what never moves, with reasons>

### Responsive strategy

- <what changes at 390px, 834px and 1440px, and what stays fixed>

## Page and screen plans

### <Page name> (R-001, R-002)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| <section> | <why it exists> | <layout idea> | <how it changes> | <citation> |

## Feedback log

The owner's feedback on this project. General feedback is also recorded in
the design memory.

| Date | Feedback (quoted) | Scope | Recorded as | Action |
|---|---|---|---|---|
| <date> | "<words>" | <general, project, page> | <P-, RJ-, AP- ID, or "project only"> | <change made> |

## Visual QA log

| Round | Date | Page | Width | Screenshot | Scores (hier/type/comp/space/brand/resp/inter/anim/orig) | Issues | Status |
|---|---|---|---|---|---|---|---|
| <1> | <date> | <page> | <390, 834, 1440> | `.artifacts/visual/<phase>/<round>/<file>` | <scores> | <issues> | <open, fixed> |
