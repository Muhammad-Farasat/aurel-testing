# Design direction

Owner: design-director, following `/creative-design-director` and the design
memory. Written 2026-11-07. Direction only: nothing here is implemented.

Every major decision has a reason that cites a requirement (`R-001`), a
research finding (`UP-1`, competitor-analysis.md), a reference (`REF-001`),
or a preference or rejection (`P-001`, `RJ-001`).

Working evidence for this document is under `.artifacts/design/`:

- `rejected/concept-a/` and `rejected/concept-b/`: the two rejected concepts
  rendered at 390, 834 and 1440 (capture script, 2026-11-07).
- `type-specimen/shot/1440.png`: five candidate display faces against
  Atkinson Hyperlegible Next and Mono, rendered from the self-hosted TTFs.
- `sketch/shot/{390,834,1440}.png`: a rough sketch of the chosen direction
  (nav, hero split, shelf rail with clip-on labels, dark problem chapter,
  saffron closing band, placeholder chip). Coloured blocks stand in for the
  generated images. It checks palette, type and proportion. It is not a
  build.

## Client and audience

- Client identity: an unnamed client launching a verified-only B2B
  marketplace where licensed pharmacies sell surplus and short-dated stock to
  other licensed pharmacies. Pre-launch, no brand assets, no proof yet
  (BRIEF.md, D-2, R-033). It wants to be seen as safe, careful and fair
  between peers, not as a discount shop (R-051, K-1).
- Audience: owners, buyers and managers of independent pharmacies, plus
  compliance or IT people checking whether it is safe to join (Roles in
  REQUIREMENTS.md). They read on a desktop in the back office and on a phone
  between customers. They are busy, wary of offers that sound too good
  (UP-1, UP-2), and want facts: who checks licences, what can be listed,
  what it costs, what happens when an order goes wrong (UP-5, UP-6).
- Primary conversion: Apply for verification (R-002, R-027). Secondary:
  understand selling or buying well enough to apply; find Sign in (R-003).
- Brand traits from the brief: trust built in from the start, verified-only,
  security-first, selling surplus made simple (brief Conclusion), framed as
  moving surplus between licensed pharmacies, not as cheap restocking
  (R-051).
- Explicit dos: made-for-the-brand imagery, not stock and not mainly UI
  (R-036, D-5); every main page reachable from a primary navigation (R-001);
  Apply visible on every page (R-002); WCAG 2.2 AA (R-041); reduced motion
  (R-042); LCP under 3 s (R-043); self-hosted fonts and no third-party
  requests (D-7, R-044); clearly marked placeholders (R-034, R-035).
- Explicit don'ts: no invented proof, numbers, logos or badges (R-033); no
  regulatory or compliance claims (R-022); no review times, fee amounts or
  payout timing (R-011, R-024, R-015); no future features (R-037); no
  competitor names (R-038); no readable brand names, real packaging, readable
  documents or people posing as customers in images (R-036); not editorial
  black on beige (RJ-009, P-031); not white, navy and cobalt SaaS (RJ-010,
  P-033); not UI as the main imagery (P-032).

## Design memory applied

Memory read on 2026-11-07 from
`C:\Users\Muhammad Farasat\Documents\design-memory`, commit `098b0de`.
Files read: MY-DESIGN-PREFERENCES.md, approved-and-rejected-designs.md,
visual-principles.md, layout-preferences.md, typography-preferences.md,
interaction-preferences.md, product-principles.md, references/INDEX.md.
No client references were filed for this project (INDEX.md has none tagged
pharmacy or B2B marketplace), so the references below are the owner's
general ones plus the category captures in `.artifacts/research/`.

Client requirements beat owner preferences. Owner rejections beat my
defaults.

### Strong and moderate preferences

| ID | Preference | Decision | Reason |
|---|---|---|---|
| P-006 (strong) | Chaptered, pinned scroll story by default | adapts | The memory itself excludes B2B marketplaces from the default, and RJ-009 rejected the editorial story here. Keep chapters (each section its own scene, ground colour changes between some of them) but pin only once on the whole site: "How a trade moves" on Home. |
| P-014 (strong) | Scroll drives the story; motion explains the product | adapts | Motion explains one thing: stock moving from one shelf to another, and the steps of a trade. It stays light (reveals, one sticky step sequence), with no scrubbed scenes. Busy pharmacy staff came to read facts (RJ-009 "pin less"). |
| P-018 (strong) | Serif display only by intent, rarely | applies | No serif anywhere. Display is Familjen Grotesk. |
| P-001 | One display face, one quiet text face | applies | Familjen Grotesk for display; Atkinson Hyperlegible Next for text. Atkinson Hyperlegible Mono is the same superfamily, used only for the small label layer (P-023), so it is a style of the text voice, not a third voice. |
| P-002 | Extreme scale jump | conflicts | RJ-009 and the B2B audience. Display tops out at 60px on Home, about 4.2vw at 1440. Middle sizes exist because pages carry real reading. |
| P-003 | Display leading at or below 0.9 | conflicts | Only applies with P-002. Display leading is 1.04 to 1.1 (P-028). |
| P-017 | Display face belongs to the business | applies | Familjen Grotesk: compact, sturdy and a little warm, with a single-storey `a` and a distinctive `g`. It reads like a confident shelf label, not a fintech dashboard (Geist in concept B) and not a poster (Archivo condensed in concept A). See Typography. |
| P-007 | One message per viewport | adapts | Each section says one thing and has one action at most, but sections must hold the facts in R-012 to R-021. Long lists live in tables and ledgers, not in more viewports. |
| P-010 | No conventional nav bar | adapts, and conflicts in part with R-001 | R-001 requires a primary navigation reaching every main page in one click at 1440. The memory's own reading is "no heavy nav bar". Resolution: a floating capsule, not a full-width bar. See Navigation. |
| P-011 | Quiet interface colour, loud content colour | applies | The interface is aubergine ink on rose milk. Loud colour comes from the generated still lifes and one saffron action colour. |
| P-012 | Made-for-the-brand imagery | applies | Nine generated still lifes in one art direction (Image plan). Also required by R-036 and the owner's RJ-010 reason "no imagery". |
| P-013 | Hover feedback in 150 to 330 ms | applies | Buttons 180 ms, links 150 ms, label tags 240 ms. |
| P-015 | Type that reveals itself | adapts | Only the h1 on each page reveals (word rise, once, on load). No scroll-filled body copy: it would slow reading for this audience. |
| P-016 | Strong ease-out curves | applies | `cubic-bezier(0.16, 1, 0.3, 1)` for reveals, from REF-003. |

### Candidates that matter here

| ID | Preference | Decision | Reason |
|---|---|---|---|
| P-008 | Ground colour marks the chapter | adapts | Three grounds (rose milk, aubergine, saffron) mark different kinds of section: content, a turning point, the action. No wipes or sliding sheets. |
| P-009 | Designed ending | adapts | Home ends on a saffron Apply scene; every page ends on an aubergine footer with a moderate wordmark. Not a giant wordmark (RJ-009). |
| P-019 | Subject breaks the type | doesn't apply | Headlines here run longer than four words and must stay fully legible. |
| P-020 | Hero object persists across scenes | doesn't apply | One sticky panel on Home is enough motion for this audience. |
| P-021 | Colour from one source object | adapts | The palette comes from the still-life set (aubergine plywood, saffron paper, blush wall, terracotta plinth), so images and interface share colours. |
| P-022 | One expanded item instead of equal cards | applies | "When an order goes wrong" (R-050) and the FAQ groups use one open item with the rest collapsed. |
| P-023 | Small labels pinned to big things | applies, as the signature | Clip-on shelf labels carrying brief facts sit on the rail under each hero image. |
| P-024 | Section order follows the visitor's questions | applies | Home: what is it, why it matters, what each side gets, how a trade works, what is kept, apply. |
| P-026 | One accent kept for action | applies | Saffron fills only Apply buttons and the Home closing band. |
| P-027 | Role-named tokens | applies | All tokens below are named by role. |
| P-028 | Line height falls as size rises | applies | Body 1.55, headings 1.1 to 1.2, display 1.04. |
| P-029 | Main action in thumb reach | applies | Full-width Apply in the hero on phones, then a floating Apply pill near the bottom once the hero button scrolls away. |
| P-030 | Progress in multi-step flows | doesn't apply | Apply is one short form on one page. |
| P-031 | Avoid black on beige | applies | Ink is aubergine; the ground is a pink-leaning milk (hue about 15 degrees, not the yellow 35 to 45 of beige); large aubergine and saffron fields carry the page. Checked against the concept A capture. |
| P-032 | UI fragments are not enough imagery | applies | Product UI appears only as small supporting label cards and two illustrative tables. Every main page except FAQ has a generated image. |
| P-033 | Avoid white, navy, cobalt | applies | No blue anywhere in the interface. |
| P-004, P-005, P-025 | Uppercase display, staircase lines, distortion entrance | don't apply | Calm, factual brand; sentence case; no effects on headings that must be read. |
| PP-001, PP-002 | Message first; feature, benefit, headline | apply | The section maps follow the visitor's questions and the requirement list; visuals come last. |
| PP-003 | No scarcity or countdown pressure | applies | No urgency devices anywhere. |

### Rejections checked and avoided

All active rejections with scope `general`, plus the project rejection
RJ-010, checked against this direction on 2026-11-07.

- [x] RJ-001 Centered hero on a gradient: every hero is an asymmetric split
      or a typographic block with an image; no gradients anywhere (the
      sketch's diagonal blocks are image stand-ins only).
- [x] RJ-002 Rows of identical feature cards: the two-sides section is a
      diptych on two different grounds; steps are a sticky sequence;
      scenarios are an accordion with one open item; security measures are
      a spec-sheet list. No card grids.
- [x] RJ-003 Icon grids: icons appear only as functional glyphs (arrow,
      check, cross, alert, menu, plus, minus). None stands in for an idea.
- [x] RJ-004 Stock photography: all imagery is generated for this brand in
      one art direction, with no people (D-5, R-036).
- [x] RJ-005 Logo strips: none. There are no partners or customers (R-033).
- [x] RJ-006 Every section on one template: each section in the page plans
      has its own composition, and the plans say how it differs from its
      neighbours.
- [x] RJ-007 Colour spread evenly: saffron is action only; terracotta and
      blush live only inside images; clay red means error or "not accepted"
      only.
- [x] RJ-008 Default serif as the premium shortcut: no serif.
- [x] RJ-009 Big editorial type on every site: display max 60px, sentence
      case, normal leading, one light pinned section on the whole site.
- [x] RJ-010 (project) SaaS-plain, UI-only, cold: warm palette with no blue,
      generated still lifes as the main imagery, UI only as small supporting
      label cards.
- [x] P-031 and P-033 (candidates raised on this project): not black on
      beige, not white, navy and cobalt.

## References

No live gallery browsing (Awwwards, Godly, SiteInspire, Land-book) was done
in this run. The references are the owner's filed references in the design
memory, the competitor captures the product-researcher made on 2026-11-07,
and the two rejected concepts, which I rendered. I make no claim about sites
I did not open.

| ID | Reference | Source | What to take | What not to copy |
|---|---|---|---|---|
| REF-002 | Carnilove by Ashfall | memory, owner-approved (AP-002) | Staged product scenes on coloured sets as the main imagery; two grounds plus one accent | Condensed uppercase poster type; pinned chapter story |
| REF-003 | premotio | memory, owner-approved (AP-003) | Calm chrome with loud content; ease-out curve; active-item list; reduced-motion handling | Scroll-scrubbed WebGL scenes |
| REF-008 | ayzz.thedesigner | memory, owner-approved (AP-004) | Annotation pills on a big subject (P-023); one expanded item (P-022); colour from one object (P-021); minimal top bar with one CTA pill | Diagonal split headlines, loud uppercase styles |
| REF-009 | Web Design Mastery sample | memory, owner-supplied | 60-30-10 colour (P-026), role tokens (P-027), line height by size (P-028), thumb zone (P-029) | Its stock SaaS look and urgency tactics |
| REF-001 | Grail | memory, owner-approved (AP-001) | Floating CTA pill on mobile; quick, specific hover | Giant serif, theatrical tone |
| Category | InStockRx, RxPost, RedSail RxMarket, TradeNetRx, RxWay | `.artifacts/research/*/1440.png`, competitor-analysis.md "Visual language" | What the category already looks like, so the site stands apart: orange CTA on light (2 of 5), pills and bottles as heroes (3 of 5), teal blob with stat chips (RxPost), cream with dark green bands (InStockRx), saturated red (RedSail) | All of those palettes and devices; any numbers or badges |
| Rejected A | Concept A, `pharmacy-landing-1106a` | `.artifacts/design/rejected/concept-a/` | Nothing visual. Its idea of labelling stock survives as small facts on images, not as poster cartons | Huge condensed type (216px h1 at 1440), black on bone, carton illustrations as the hero |
| Rejected B | Concept B, `pharmacy-landing-b-1106b` | `.artifacts/design/rejected/concept-b/` | Its honest product facts and research table (D-3 allows sources) | White, navy, cobalt, Geist, tables as the imagery, the blurred-price device |

## Directions compared

### A. Second Shelf (chosen)

- Concept: surplus stock gets a second shelf. Sunlit, staged still lifes of
  plain unbranded cartons, parcels and shelves on coloured paper sets show
  stock moving from one pharmacy's shelf to another's. Small clip-on shelf
  labels carry the facts (verified seller, price set by the seller, expiry
  required). Warm and calm, precise where it matters.
- Type: Familjen Grotesk 600 display; Atkinson Hyperlegible Next text;
  Atkinson Hyperlegible Mono for labels.
- Colour: aubergine ink and dark chapters, rose-milk ground, saffron action,
  terracotta and blush inside images only.
- Layout: asymmetric splits that alternate sides, one dark chapter per page,
  a shelf rail under each hero image, tables and ledgers for facts.
- Motion: hero image unmasks up from the rail, labels clip on, one sticky
  step sequence on Home, otherwise short fade-ups.
- References: REF-002 (staged product sets), REF-008 (labels, one expanded
  item), REF-003 (calm chrome, easing), REF-009 (colour and type craft).

### B. Scale Model Exchange

- Concept: the trade as an architectural scale model. Matte card-and-clay
  dioramas of two pharmacy back rooms joined by a route, a review desk, a
  parcel on its way. The site reads like an exhibition of a precise model.
- Type: Gabarito display (rounded geometric) with Atkinson Hyperlegible Next.
- Colour: terracotta, sage and chalk model card with an aubergine ink.
- Layout: wide diorama panels with numbered callouts; a horizontal route
  diagram as the spine of Home.
- Motion: slow camera-like pans across dioramas on scroll.
- References: REF-001 (made characters and sets), REF-002 (staged scenes).

### C. Dispensary Ledger

- Concept: the paperwork of a careful trade. Two-colour risograph-style
  prints of tags, delivery notes, stamps and ledgers in marigold and
  oxblood on paper.
- Type: Schibsted Grotesk with Atkinson Hyperlegible Mono.
- Colour: marigold, oxblood, paper white.
- Layout: ledger lines, stamped section numbers, receipt-like modules.
- Motion: stamps press in, ledger lines draw.
- References: REF-009 (craft), rejected concept A (as a warning).

| Criterion | A Second Shelf | B Scale Model | C Dispensary Ledger |
|---|---|---|---|
| Fit with audience and brand | 5: warm and calm without losing precision; reads as a careful trade between peers | 3: charming, but a toy-model tone undercuts the trust evaluator | 3: paperwork suits compliance but feels bureaucratic |
| Brief requirements, accessibility, primary task | 5: imagery with no text or people (R-036); labels are real HTML text; Apply always visible | 4: generated dioramas tend to sprout signage text that R-036 forbids | 3: R-036 bans readable documents, and paper ephemera invites them |
| Owner's applicable preferences | 4: P-012, P-011, P-023, P-026, P-031, P-032, P-033 met; the story is adapted, not dropped | 4: P-012 strong, but sage and chalk drift toward P-031 beige | 2: paper ground sits near P-031, and the look leans editorial (RJ-009) |
| Distinct from competitors and past projects | 4: no competitor uses staged still life or aubergine and saffron; still life is a known genre | 5: nobody in the category uses models | 3: TradeNetRx already uses tan and slab type |
| Buildable in stack and time | 4: nine generated stills in one sitting; plain CSS; one sticky section | 3: keeping nine dioramas consistent in ChatGPT is hard; pans cost performance (R-043) | 4: flat prints are easy, but every print needs a text check |
| Total | 22 | 19 | 15 |

Chosen: A. It is the only direction that answers all three of the owner's
concept B reasons (plain, no imagery, cold) without walking back into
concept A (editorial, black on beige). Its imagery is also the easiest to
keep consistent and free of text across nine generations, which is the main
practical risk (K-4). B is the fallback if the owner wants something more
playful. C stays only for the record.

## Concept

**Second Shelf.** Stock that one pharmacy won't use is still good stock; it
needs a second shelf. The site shows that move literally: sunlit still lifes
of plain, unbranded cartons and parcels on coloured paper sets, from a
crowded shelf to a waiting one. Under each hero image runs a shelf rail, the
strip a pharmacy shelf edge carries, and small clip-on labels on it hold the
facts a buyer checks first: verified seller, price set by the seller, expiry
required. Product UI appears only as small label cards that support a step,
never as the main picture.

- Mood: warm, calm, orderly, trustworthy among peers. Daylight in a tidy
  back room, not a lab and not a discount store.
- Distinctive signature: (1) the shelf rail with clip-on labels under hero
  images; (2) the aubergine and saffron palette with sunlit coloured-paper
  still lifes, which no captured competitor uses.
- Working brand name: **Second Shelf** (placeholder per D-2 and R-035,
  always shown with a "working name" tag). The concept does not depend on
  it; if the client's name differs, only the wordmark changes. The
  Orchestrator may swap the working name; it lives in one constant.

## Design system

### Typography

All three families are under the SIL Open Font License and self-hosted as
WOFF2 Latin subsets with `font-display: swap` and metric-matched fallbacks
(`size-adjust`, `ascent-override`) to keep CLS under 0.1 (D-7, R-043,
R-044). Source TTFs for the specimen came from the google/fonts repository
(`ofl/familjengrotesk`, `ofl/atkinsonhyperlegiblenext`,
`ofl/atkinsonhyperlegiblemono`). Preload only Familjen Grotesk and Atkinson
Next regular.

| Role | Family | Weights | Reason |
|---|---|---|---|
| Display (h1, h2, h3, wordmark) | Familjen Grotesk (variable 400 to 700) | 600 only | P-017: compact, sturdy, a little warm; reads like a shelf label in confident type. Compared in `.artifacts/design/type-specimen/shot/1440.png` with Schibsted Grotesk, Host Grotesk, Funnel Display and Gabarito: Host and Funnel looked like tech products, Gabarito too rounded and playful for a trust evaluator, Schibsted too newspaper (RJ-009). Not Geist (concept B) or Archivo (concept A). Not a serif (RJ-008, P-018). |
| Text (body, UI, buttons, forms) | Atkinson Hyperlegible Next (variable 200 to 800) | 400, 600, 700 | Designed by the Braille Institute for legibility, with distinct 1, I, l and 0, O. That matters for licence numbers, lot numbers and strengths on a pharmacy site, and supports R-041. |
| Labels and data | Atkinson Hyperlegible Mono | 500, 700 | Clip-on labels, field names, table status words and placeholder chips: the printed-label layer (P-023). Same family as the text face, so P-001 holds. |

Type scale. Fluid between 390 and 1440 with `clamp()`; the 834 values are
what the clamp produces.

| Token | 390 | 834 | 1440 | CSS | Line height | Tracking | Use |
|---|---|---|---|---|---|---|---|
| `display-l` | 38 | 47 | 60 | `clamp(2.375rem, 1.864rem + 2.095vw, 3.75rem)` | 1.04 | -0.015em | Home h1 |
| `display-m` | 34 | 42 | 52 | `clamp(2.125rem, 1.707rem + 1.714vw, 3.25rem)` | 1.06 | -0.015em | Subpage h1 |
| `heading-l` | 28 | 33 | 40 | `clamp(1.75rem, 1.471rem + 1.143vw, 2.5rem)` | 1.1 | -0.01em | h2 |
| `heading-m` | 21 | 23 | 26 | `clamp(1.312rem, 1.196rem + 0.476vw, 1.625rem)` | 1.2 | -0.005em | h3 |
| `heading-s` | 18 | 19 | 20 | Atkinson Next 700 | 1.3 | 0 | h4, table titles, accordion questions |
| `body-l` | 18 | 19 | 20 | `clamp(1.125rem, 1.079rem + 0.19vw, 1.25rem)` | 1.5 | 0 | Ledes |
| `body-m` | 17 | 17 | 18 | `clamp(1.062rem, 1.039rem + 0.095vw, 1.125rem)` | 1.55 | 0 | Body |
| `body-s` | 15 | 15 | 15 | fixed | 1.5 | 0 | Hints, captions, footer |
| `label` | 12 | 13 | 13 | Mono 500, uppercase | 1.3 | 0.06em | Eyebrows, label titles, table headers |
| `label-data` | 14 | 14 | 14 | Mono 500 | 1.4 | 0.01em | Label values, placeholder chips, table status |
| `button` | 16 | 16 | 16 | Atkinson Next 600 | 1 | 0 | Buttons |
| `wordmark` | 40 | 54 | 72 | `clamp(2.5rem, 1.757rem + 3.048vw, 4.5rem)` | 1 | -0.02em | Footer wordmark |

Rules: sentence case everywhere except `label`. Body measure about 66
characters (`max-width: 66ch`); ledes 34 to 44ch. Display uses weight 600
only. Table numerals use `font-variant-numeric: tabular-nums`. Text links
are underlined, 1px, `text-underline-offset: 0.2em`, thickening to 2px on
hover.

### Color tokens

Ratios computed with the WCAG 2.x relative-luminance formula on 2026-11-07.

| Token | Value | Use | Reason |
|---|---|---|---|
| `--color-bg-base` | `#FCF5F2` rose milk | Default page ground | Warm without being beige (P-031): pink-leaning, low chroma. Answers "Colors felt cold" (RJ-010). |
| `--color-bg-alt` | `#F5E4E0` blush mist | Alternate light sections, label fills, placeholder fills | A second light ground so sections can change without a hard edge. |
| `--color-bg-tint` | `#FBE3B0` saffron mist | At most one light section per page (Buying half of the diptych, the Selling track band) | Carries saffron warmth into content without using the action colour. |
| `--color-bg-dark` | `#34172F` aubergine | Dark chapters, footer | The one dark ground. A warm dark, not black or navy (P-031, P-033). |
| `--color-bg-dark-raised` | `#47213F` | Panels on dark grounds, mobile menu sheet | Separates layers on dark. |
| `--color-surface` | `#FFFFFF` | Form inputs and panel, receipt, label cards | Typed text needs the cleanest ground. |
| `--color-fg-primary` | `#34172F` | Text and icons on light grounds | Same aubergine as the dark ground: one ink across the site. |
| `--color-fg-secondary` | `#6E4A66` | Secondary text, hints, eyebrows on light | Passes AA for small text (REF-008 p05, REF-009). |
| `--color-fg-on-dark` | `#FCF5F2` | Text on aubergine | |
| `--color-fg-on-dark-secondary` | `#EBCFD0` | Secondary text on aubergine | |
| `--color-border-subtle` | `#EBCFD0` | Hairlines, dividers (decorative only) | Never the only boundary of a control. |
| `--color-border-control` | `#8C6A84` | Input, radio and checkbox borders | 3:1 or more against every light ground (WCAG 1.4.11). |
| `--color-rail` | `#34172F` | Shelf rail, table header rule, ledger rules | The signature rail is ink, so saffron stays reserved for action. |
| `--color-accent-action` | `#F2B23A` saffron | Apply buttons, the Home closing band, mobile floating Apply. Nothing else. | P-026, RJ-007. No captured competitor uses saffron (they use orange, teal, red, green). |
| `--color-accent-action-hover` | `#F7C35A` | Hover fill of saffron buttons | Lighter, keeps the ink label at 9.86:1. |
| `--color-status-error` | `#A8432C` clay red | Form errors, "Not accepted" in the R-053 table | One meaning: stop. |
| `--color-status-ok` | `#3F6B4E` sage | "Can be listed" in the R-053 table, form confirmation tick | One meaning: allowed. |
| `--color-focus` | `#34172F` on light, `#F2B23A` on dark | Focus ring | 2px solid, 2px offset. |

Content colours (inside images only, never interface fills): aubergine
`#34172F`, saffron `#F2B23A`, blush `#E9B8B0`, terracotta `#C4613F`, warm
off-white cartons. Every image prompt names them, so images and interface
share one palette (P-021).

Proportion per page: roughly 60% light grounds, 30% ink and images, 10%
saffron and aubergine fields (P-026).

Contrast checks (text needs 4.5:1, large text and UI parts 3:1):

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| fg-primary `#34172F` | bg-base `#FCF5F2` | 14.88 | AA, AAA |
| fg-primary | bg-alt `#F5E4E0` | 13.02 | AA, AAA |
| fg-primary | bg-tint `#FBE3B0` | 12.76 | AA, AAA |
| fg-primary | surface `#FFFFFF` | 16.04 | AA, AAA |
| fg-primary | saffron band `#F2B23A` | 8.56 | AA, AAA |
| fg-secondary `#6E4A66` | bg-base | 6.87 | AA |
| fg-secondary | bg-alt | 6.02 | AA |
| fg-secondary | bg-tint | 5.90 | AA |
| fg-secondary | surface | 7.41 | AA |
| fg-on-dark `#FCF5F2` | bg-dark `#34172F` | 14.88 | AA, AAA |
| fg-on-dark | bg-dark-raised `#47213F` | 12.51 | AA, AAA |
| fg-on-dark-secondary `#EBCFD0` | bg-dark | 10.97 | AA, AAA |
| fg-on-dark-secondary | bg-dark-raised | 9.23 | AA, AAA |
| Ink label on saffron button | `#F2B23A` | 8.56 | AA, AAA |
| Ink label on saffron hover | `#F7C35A` | 9.86 | AA, AAA |
| Saffron label on ink button (used on the saffron band) | `#34172F` | 8.56 | AA, AAA |
| Saffron button fill against bg-dark | | 8.56 | UI 3:1 met |
| Saffron button fill against bg-dark-raised | | 7.20 | UI 3:1 met |
| Saffron button fill against bg-base | | 1.74 | Fails 3:1 on its own, so saffron buttons on light grounds always carry a 1.5px ink border (14.88:1) |
| border-control `#8C6A84` | bg-base | 4.32 | UI 3:1 met |
| border-control | surface | 4.66 | UI 3:1 met |
| border-control | bg-alt | 3.78 | UI 3:1 met |
| status-error `#A8432C` | bg-base | 5.56 | AA |
| status-error | surface | 5.99 | AA |
| status-error | bg-alt | 4.87 | AA |
| status-ok `#3F6B4E` | bg-base | 5.69 | AA |
| status-ok | bg-alt | 4.98 | AA |
| Focus ring, ink | bg-base | 14.88 | 3:1 met |
| Focus ring, saffron | bg-dark | 8.56 | 3:1 met |

Forbidden pair: fg-secondary on saffron (3.95). On the saffron band all
text is fg-primary.

### Layout principles

- Breakpoints: `base` 0 to 599 (designed at 390), `md` 600 to 1023 (designed
  at 834), `lg` 1024 and up (designed at 1440). Also check 320 for reflow
  (R-040).
- Grid: 4 columns, 16px gutter, 16px side margin at base; 8 columns, 24px
  gutter, 32px margin at md; 12 columns, 24px gutter, 64px margin at lg.
  Content max width 1312px, centred above 1440. Hero images and full-bleed
  bands still bleed to the viewport edge.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 as
  `--space-1` to `--space-11`.
- Section padding: base 64 top and bottom, md 96, lg 128, varied on purpose:
  hero 72 top, quiet text sections 96 at lg, dark chapters 128 at lg, CTA
  rails 48.
- Radius: buttons, chips and the nav capsule are pills (999px): they read
  as tags and echo the label shape. Label tags 6px. Inputs, panels and
  receipts 8px. Contained images 4px. Images that bleed to an edge are
  square on that side. No large rounded cards.
- Borders: 1px `border-subtle` hairlines between rows; 1.5px ink borders on
  label tags and light-ground buttons; 2px `rail` rules on tables and
  ledgers; the shelf rail is 12px at lg, 10px at md, 8px at base.
- Shadows: two only, on the capsule nav after scroll and the mobile floating
  Apply: `0 8px 24px rgba(52, 23, 47, 0.12)`. Nothing else floats.
- Section rhythm: each page has a deliberate ground sequence (given in the
  page plans), and splits alternate sides. No two adjacent sections share
  both ground and composition.

### Imagery

- Source: nine images generated with ChatGPT image generation in the
  owner's Chrome (D-5), one art direction for all. No stock (RJ-004).
  Concept A and B code and art are not reused (D-3).
- Style: photorealistic studio still life on seamless matte coloured paper
  and painted plywood; palette limited to the content colours above; one
  hard, warm late-afternoon sun from the upper left with long clean shadows;
  plain unprinted cartons in warm off-white with one solid colour band;
  medium-format look with fine grain. No people, hands, pills, tablets,
  capsules, blister packs, pill bottles, syringes, medical crosses, text,
  numbers, logos, barcodes or symbols (R-036; competitor-analysis.md: pills
  and bottles in 3 of 5 heroes).
- Crop and treatment: no filters, overlays, duotones or gradients on images.
  Text never sits on top of an image. Hero images sit on the shelf rail.
  Each image has a focal point for `object-position` so every crop keeps the
  subject.
- Labels: facts are HTML text in clip-on labels, never baked into images.
- Delivery: AVIF with WebP fallback in `<picture>`, widths 640, 960, 1280,
  1536, explicit `width` and `height` to reserve space. The hero image is
  preloaded with `fetchpriority="high"`; all others use `loading="lazy"`.
  Target under 180 KB for the hero at 1536 AVIF (R-043).
- Review before use (K-4): zoom each image to 200%. Reject or retouch any
  stray glyph, pseudo-text, logo-like mark, pill or human part. Mark each
  accepted image in the Image plan table.

### Navigation (R-001, R-003, P-010)

R-001 needs every main page one click away at 1440 and within two
activations at 390. P-010, read as "no heavy nav bar", is met by making the
navigation a floating capsule instead of a full-width bar.

- lg: a pill-shaped capsule inset 48px from each viewport side, 64px tall,
  12px from the top, `position: sticky`. Contents: the wordmark (Familjen
  600, 20px) with its "working name" tag, then right-aligned links Selling,
  Buying, Trust and security, Fees, FAQ (Atkinson 15px, pill hit areas 8px
  by 12px padding), then "Sign in" as an underlined text link, then the
  small Apply button. At the top of a page the capsule is transparent with a
  1px `border-subtle` outline; after 80px of scroll it gains `bg-base` at
  92% opacity and the float shadow (240ms). No backdrop blur. Home is the
  wordmark link.
- Current page: `aria-current="page"` and a `bg-alt` pill behind the link.
  On the Apply page, the Apply button switches to an outline style with
  `aria-current="page"`.
- md: same capsule; the five links and Sign in collapse into a "Menu" pill
  button; Apply stays visible in the capsule (R-002 at 834).
- base: capsule 8px inset, 56px tall: wordmark, tag, and the "Menu" pill.
  No Apply in the header: Apply sits in the hero and then floats at the
  bottom (P-029).
- Menu sheet (md and base): a full-viewport `bg-dark-raised` sheet. Links
  at heading-m size, each row 56px tall; Sign in and Contact smaller below;
  a full-width saffron Apply at the bottom, in thumb reach. Opens with a
  240ms fade and 12px slide (fade only under reduced motion). Focus moves to
  the first link and stays inside the sheet; Esc and the Close button close
  it and return focus to Menu. `aria-expanded` and `aria-controls` on Menu.
  Every main page is two activations away at 390 (R-001).
- Skip link: first focusable element, "Skip to content", shown on focus as a
  saffron pill at top left (R-041).
- `scroll-padding-top: 96px` so focused or anchored content is never hidden
  under the capsule (WCAG 2.4.11).

### Apply call to action (R-002)

- Label: "Apply for verification" in page bodies, "Apply" in the capsule.
  Q-6 may change it to early-access wording, so keep the label in one
  constant.
- Primary on light grounds: saffron fill, 1.5px ink border, ink label, pill,
  52px tall at md and lg, 56px at base, 24px side padding, an 8px ink dot
  before the label (the clip of a label tag). Hover: fill to
  `accent-action-hover` and the dot slides 2px right, 180ms. Active: moves
  1px down.
- On dark grounds: same fill; the border is optional (the fill alone is
  8.56:1).
- On the saffron band: inverted, ink fill with saffron label and dot.
- Small (capsule): 44px tall, label "Apply".
- Mobile floating Apply (base only): full width minus 32px, 56px tall, fixed
  16px above the bottom plus the safe-area inset, with the float shadow. It
  appears when the hero Apply leaves the viewport (IntersectionObserver)
  and hides while the closing CTA or footer is in view, so two Apply buttons
  are never on screen together. Pages without a hero Apply (FAQ, Contact,
  legal pages, 404) show it from load. Not rendered on the Apply page. Add
  `scroll-padding-bottom: 96px` at base so it never covers a focused
  element. Without JavaScript it is shown from load (static position at the
  end of the header area), so R-002 holds.
- Result: every page except Apply shows an Apply link without scrolling at
  834 and 1440 (capsule) and at 390 (hero button or floating pill).

### Components

**Shelf rail and clip-on labels (signature).** A full-width ink strip under
a hero image (12, 10, 8px tall at lg, md, base). The labels are a `<ul>`
inside the `<figure>`, placed so they straddle the rail at lg and md
(translateY 50%). Each is a `bg-base` tag with a 1.5px ink border, 6px
radius, a 7px ring "punch hole" on the left, a `label` title (for example
"Seller") over a `label-data` value (for example "Verified pharmacy"). At
most three per image. At base they drop below the rail as a stacked,
left-aligned list. Label text must be a fact from REQUIREMENTS.md, with no
numbers (R-033).

**Placeholders (R-034, R-035).**
- Machine marker: every placeholder element carries
  `data-placeholder="<key>"`, for example `brand-name`, `fee-amount`,
  `fee-payer`, `fee-timing`, `payout-timing`, `payment-provider`,
  `review-time`, `rejection-grounds`, `shelf-life-minimum`,
  `dispute-outcome`, `tracing-records`, `regions`, `contact-email`,
  `contact-phone`, `contact-address`, `app-url`, `apply-endpoint`,
  `legal-terms`, `legal-privacy`, `legal-disputes`, `last-updated`. A
  tester counts `[data-placeholder]` and compares it with what they see.
- Inline chip: Atkinson Mono 14px, `bg-alt` fill, 1.5px dashed
  `fg-secondary` border, 4px radius, 2px by 8px padding. Text pattern:
  "Pending: <what is missing>, client to supply". On dark grounds:
  `bg-dark-raised` fill, dashed `fg-on-dark-secondary` border, on-dark text.
- Block (legal bodies and long pending content): a `bg-alt` panel with a
  diagonal hatch (`repeating-linear-gradient(135deg, rgba(52,23,47,.06) 0
  2px, transparent 2px 10px)`), 1.5px dashed `fg-secondary` border, 8px
  radius, a `label` title "Pending content", and one sentence saying what is
  missing and who supplies it.
- Brand name: the working name "Second Shelf" comes from one constant used
  in the header, footer and `<title>`. The header and footer wordmarks each
  carry a small "working name" tag (label style, dashed border) with
  `data-placeholder="brand-name"`.
- Placeholders never look like real data: no fake amounts, no example
  numbers.

**Buttons and links.** Primary as above. Secondary: underlined text link in
fg-primary, weight 600, with a 16px arrow that moves 3px right on hover
(150ms). Tertiary (inside tables and lists): plain underlined link. No ghost
outline buttons except the current-page Apply.

**Forms (Apply, R-027 to R-030).**
- Labels above fields, Atkinson 600, 17px. Phone shows "(optional)" in
  fg-secondary after its label.
- Inputs: 52px tall, `surface` fill, 1.5px `border-control`, 8px radius,
  16px padding, body-m text. Hover: border ink. Focus: 2px ink outline, 2px
  offset, border ink.
- Hints under labels in body-s fg-secondary, tied with `aria-describedby`.
- Intent (Sell, Buy, Both): a `fieldset` with `legend`; three radio options
  styled as 48px pills in a row (stacked at base). Checked: ink fill, milk
  text and a check glyph, so state is not shown by colour alone.
- Licensing state or region: a text input, not a select, until Q-2 settles
  the regions.
- Error state: 2px `status-error` border, `aria-invalid="true"`, message
  below the field with an alert glyph in status-error, tied with
  `aria-describedby`.
- Error summary: above the form, a `bg-base` panel with a 1.5px
  status-error border and a 6px status-error left bar, heading-s "Check
  these before you continue", and a list of links to each field. It has
  `tabindex="-1"` and takes focus on submit (R-028).
- Preview notice (R-029): above the form, a placeholder block titled
  "Preview: applications are not sent yet", `data-placeholder="apply-endpoint"`.
- Submit: primary button, full width at base, auto width at md and lg.
- Confirmation (R-030): the form panel is replaced in place by a `surface`
  panel with a sage check, h2 "Application ready to send" (focus moves to
  it), an ordered list of next steps (upload licence documents in the
  marketplace, administrator review, result by email, trading only after
  approval) and the same not-sent notice. No review time.
- No file inputs; no card, bank or patient fields (R-027). Nothing written
  to storage (R-029).

**Tables (R-053 and the illustrative tables).**
- A real `<table>` with `<caption>`, `<th scope="col">` and
  `<th scope="row">`. Header row in `label` style with a 2px rail rule
  under it. Rows: 1px border-subtle, 16px vertical padding, body-m.
- Status cells pair a glyph with a word, never colour alone: check and "Can
  be listed" (status-ok); cross and "Not accepted" (status-error); square
  and "Required" (ink); eye-off and "Hidden automatically" (ink).
- base: each row becomes a block, the row header as heading-s, then each
  cell preceded by its column name in `label` style from `data-label`. When
  CSS changes `display`, add explicit ARIA roles (`table`, `row`,
  `rowheader`, `columnheader`, `cell`) so Safari keeps the semantics. No
  horizontal scrolling (R-040).

**Accordion (FAQ, R-050).** A `<button aria-expanded aria-controls>` inside
a heading; a plus glyph that turns to minus; the panel opens with a 240ms
height and fade (instant under reduced motion). Enter and Space toggle
(R-026, native button). Rows separated by 1px border-subtle; the open item
gets a `bg-alt` fill and a 2px rail rule on its left edge (P-022). Several
items may be open at once. The first item in R-050 starts open.

**Track (order steps).** Horizontal at lg and md: 12px ink rings on a 2px
rail line, labels below in heading-s with one line of body-s. Vertical at
base with the line on the left. On dark grounds the line and rings use
fg-on-dark. A hollow ring marks a step done by the other party.

**Label card (supporting product UI).** A `surface` card, 8px radius, 1.5px
ink border, mono field names with blank value lines (2px border-subtle
lines where values would go), and an "Illustrative" badge in `label` style
at top right. Used in Home "How a trade moves" and Selling "Nine fields".
No sample values containing numbers (R-033).

**Ledger list.** Two columns under a 2px rail: `label` keys on the left,
body text on the right, 1px rows between. Used for Stored and Never stored,
security measures, verification steps and contact details.

**Receipt (Fees, R-054).** A 420px `surface` panel, 8px radius, zigzag top
edge (CSS mask), mono rows of key and placeholder chip, and a 2px rail
above the last row. Badge "Illustrative example".

**CTA rail (subpages).** A full-bleed `bg-alt` band with 48px vertical
padding and the shelf rail along its top edge. Left: a heading-m line
("Ready to start with verification?"). Right: the primary Apply button.
Home has its own closing scene instead.

**Footer (R-004, R-010).** `bg-dark` ground, 96px top padding at lg. Row 1:
the wordmark at `wordmark` size with its working-name tag, and one line:
"For licensed pharmacies only. Not for patients or the public." Row 2:
three link groups: Marketplace (Selling, Buying, Fees, FAQ); Trust (Trust
and security, Dispute and return policy, Terms of use, Privacy policy); Get
started (Apply, Sign in, Contact). Row 3: a copyright line using the brand
constant. Links in fg-on-dark, underlined on hover, at least 24px tall
(R-041).

**Icons.** One inline SVG set drawn for this site, 1.5px stroke, 20px box,
round caps: arrow, check, cross, square, eye-off, alert, plus, minus, menu,
close. Nothing decorative.

### Interaction patterns

- Hover: buttons 180ms fill change and dot nudge; links 150ms underline
  thickens; label tags lift 2px in 240ms on pointer devices only (`@media
  (hover: hover)`). Nothing is hover-only.
- Focus: 2px solid ring with 2px offset on every interactive element, ink
  on light and saffron on dark. Never removed, never hidden by the capsule
  or the floating Apply (scroll padding above).
- Targets: at least 44 by 44px for buttons and nav, 24px minimum for inline
  links (R-041).
- Forms validate on submit, then live per field once that field has shown
  an error (R-028).
- Accordions and the menu expose state with `aria-expanded`.
- No carousels, no autoplay, no dialogs other than the menu sheet.

### Animation direction

Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (P-016, REF-003);
`--ease-standard: cubic-bezier(0.2, 0, 0, 1)` for UI. Durations: 150, 180,
240, 320, 600, 700ms.

| What moves | How | Why |
|---|---|---|
| Hero image | Unmasks upward from the shelf rail: `clip-path: inset(100% 0 0 0)` to `inset(0)`, 700ms ease-out, once on load, starting with the h1 | Stock arrives on the shelf; the rail is the ground line. |
| Clip-on labels | Drop 8px and fade in, 320ms, 60ms stagger, after the image | They are clipped on, so the movement reads as labelling. |
| h1 | Words rise 0.4em and fade in, 600ms, 40ms stagger, once on load | P-015, limited to one line per page. |
| Section entrances | Fade and rise 16px, 600ms, once, when 20% visible | Gentle pacing; nothing replays on scroll back. |
| Home "How a trade moves" | The left label card stays sticky; as each step reaches the middle of the viewport, the card crossfades to that step's state (320ms) and the step's ordinal fills with ink | The one pinned moment on the site (P-006 adapted, RJ-009). |
| Capsule nav | Fill and shadow fade in after 80px of scroll, 240ms | Separates nav from content only when needed. |
| Menu sheet | 240ms fade and 12px slide | Shows where it came from. |
| Accordion | 240ms height and fade | Ties the answer to its question. |
| Floating Apply (base) | Rises 16px and fades in, 240ms | Arrives as the hero button leaves. |

Never animated: body text, tables, form fields (error messages fade in over
150ms at most), the footer, images other than the hero. No parallax, no
scroll scrubbing, no scroll hijacking, no smooth-scroll library, no looping
motion (R-042: nothing runs over 5 seconds).

Reduced motion (`prefers-reduced-motion: reduce`): every entrance renders in
its final state; the hero image and labels appear without movement; the
sticky panel swaps states instantly; menu and accordion open instantly or
with a 150ms opacity fade; hover lifts are off. Without JavaScript all
content renders in its final state (R-048): entrance styles apply only after
a `js` class is set on `<html>`.

### Responsive strategy

| Concern | 390 (base) | 834 (md) | 1440 (lg) |
|---|---|---|---|
| Grid | 4 col, 16 gutter, 16 margin | 8 col, 24 gutter, 32 margin | 12 col, 24 gutter, 64 margin |
| Nav | Capsule with wordmark and Menu; sheet | Capsule with wordmark, Apply and Menu; sheet | Capsule with all links, Sign in and Apply |
| Apply | Full width in the hero; floating pill after it | In capsule and hero | In capsule and hero |
| Hero splits | Stack: copy first, then the image full-bleed, labels listed under the rail | Stack: copy across 6 of 8 cols, image full-bleed, labels straddle the rail | Side by side, image bleeding off the outer edge |
| Images | 4:3 or 3:2 crops at set focal points | 3:2 | As planned per section |
| Diptych | Halves stack, seam pill between | Halves stack | Halves side by side |
| Sticky elements | None, content inline | None | Home trade steps, FAQ index, Apply aside |
| Tables | Rows become blocks | Full table | Full table |
| Section padding | 64 | 96 | 96 to 128 |
| Type | Low end of each clamp | Middle | Top of each clamp |

Fixed at every width: palette, rail, labels, button shapes, section order.
Small widths never hide content; only the arrangement changes. At 320 and at
200% zoom everything reflows with no horizontal scroll (R-040, R-041).

## Page and screen plans

Copy below is draft direction for the content pass. Check it against R-019
to R-024, R-033 and R-051 and run it through `/unslop` before build. Every
number on a page is an ordinal or a marked placeholder (R-033).

### Home `/` (R-001, R-002, R-006 to R-010, R-020, R-036)

Ground sequence: base, dark, alt and tint diptych, base, alt, saffron, dark
footer.

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| H1 Hero | Say what it is and for whom in the first viewport | Asymmetric split. Copy in cols 1 to 5, bottom-aligned: eyebrow "For licensed pharmacies only"; h1 (display-l) "Your surplus stock, on another pharmacy's shelf."; lede "A verified-only marketplace where licensed pharmacies sell surplus medication to other verified pharmacies, at a price the seller sets."; primary Apply; secondary links "How selling works" and "How buying works". IMG-01 in cols 6 to 12 at 3:2, bleeding off the right edge, on the shelf rail with three labels: Seller / Verified pharmacy; Price / Set by the seller; Expiry / Required on every listing. | Copy, full-width Apply, links stacked; image full-bleed 4:3 (focal 40% 60%); labels listed under the rail | R-006, R-010, R-002, R-036; signature; RJ-001 avoided |
| H2 The problem | State the problem from the brief's Conclusion | Dark chapter, 128px padding. IMG-02 at 4:5 in cols 1 to 5; statement in cols 7 to 11, vertically centred: eyebrow "Why this exists"; h2 "One shelf holds stock it won't use. Another pays full price for the same product."; one paragraph: surplus is costly to hold and wasteful to discard. | Image 3:2 on top (focal 50% 40%), text below | R-006; R-051 ("restock" not used as a benefit); P-008 adapted |
| H3 Two sides, one account | Seller value, buyer value, one account | Full-bleed diptych. Left half on bg-alt: IMG-03 cropped 4:3 at the top, then label "Selling", h3 "Set your own price. Recover value from stock you'd otherwise write off.", link "How selling works". Right half on bg-tint: IMG-04 cropped 4:3, label "Buying", h3 "Compare sellers side by side and buy direct from verified pharmacies.", link "How buying works". A pill straddles the seam at mid-height: "One pharmacy account can buy and sell". | Halves stack; the pill sits centred between them | R-007, R-008, R-009; RJ-002 avoided (two grounds, not cards) |
| H4 How a trade moves | The flow from verification to delivery | The one sticky section. Left cols 1 to 5: a label card, sticky 120px from the top, that changes per step. Right cols 7 to 12: h2 "How a trade moves", then four steps about 60vh apart, each with an ordinal label ("Step 01" to "Step 04"), an h3 and two sentences: Apply and get verified (an administrator reviews; no trading before approval); List stock or search for it; Order and ship with tracking (email updates at each status change); Confirm delivery or report an issue. Card states: application "Under review"; blank listing label with field names; tracking line with three stops; delivery confirmed with a "Report an issue" link. Badge "Illustrative". | No sticky; each step is followed by its card inline at full width | R-011, R-014, R-016; P-032 (UI as support); P-006 adapted |
| H5 What we keep | Short data statement | bg-alt band. h2 in cols 1 to 6: "What the platform holds, and what it never does." Below, a two-column ledger: Stored (pharmacy business data, listings, orders, licence documents, contact details) and Never stored (patient records, card and bank details), the second column on a bg-dark-raised panel with on-dark text. Link "Trust and security". | Columns stack, Never stored second | R-020, R-010 |
| H6 Closing scene | Ask for the application | Full-bleed saffron band, 128px padding. h2 in cols 1 to 7: "Start with verification. Nobody trades before it." Cols 8 to 12, bottom-aligned: a three-item "Have ready" list (licence number, business details, licence documents for later upload) and the inverted ink Apply button. | Stacked; button full width; floating Apply hidden while this band is in view | R-002, R-055 echo, P-009 adapted, P-026 |

### Selling `/selling` (R-007, R-012, R-014, R-016, R-021, R-023, R-024, R-053)

Ground sequence: base, base, alt, base, tint, base, CTA rail, footer.

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| S1 Hero | Seller promise | Mirror of Home: IMG-03 in cols 1 to 7 at 3:2, bleeding off the left edge, on the rail; copy in cols 8 to 12. h1 (display-m) "Sell surplus stock at a price you set."; lede: recover value from stock you'd otherwise write off or discard; Apply. Labels: Listing / One at a time or by CSV; Price / Set by you; Expired items / Hidden automatically. | Copy first, then image (focal 55% 50%), labels below | R-007, R-012; alternates side from Home |
| S2 Nine fields | What a listing needs | Specimen layout: a large blank listing label card in cols 2 to 7 with the nine field names (drug name, strength, form, quantity, lot number, expiry date, condition, price, photos) and blank value lines. Cols 9 to 12: h2 "Every listing carries nine fields." and a paragraph: lot number, expiry date and condition are required and validated. | Heading first, then the card full width | R-012, R-023; RJ-002 avoided |
| S3 One at a time or a whole file | Bulk upload | bg-alt. Copy in cols 1 to 5: h2 "Or upload a CSV of listings."; invalid rows come back with the reason. Cols 7 to 12: an illustrative CSV table with field-name headers, grey bar cells and no values, and one row flagged in status-error with the cross glyph: "Rejected: expiry date missing". | Copy then table; table keeps three columns | R-012; P-032 |
| S4 Can I list this? | The rules table | Full-width table, caption "Can I list this?", columns What, Rule, Status. Rows: stock with every required field filled in (Can be listed); a listing missing lot number, expiry date or condition (Required; can't publish until complete); stock with less remaining shelf life than the platform minimum (Not accepted; minimum set by the administrator, `shelf-life-minimum` chip); items past their expiry date (Hidden automatically); controlled substances (Not accepted); cold-chain products (Not accepted). | Rows become blocks | R-053, R-012, R-021, R-023 |
| S5 After an order | Seller order steps | bg-tint band with a horizontal track of three stops: confirm the order, add shipping details, enter a tracking number; then a hollow fourth stop "Buyer confirms delivery". Under the track: one line on email notifications and the in-app notification centre, one on messaging tied to a listing or order. | Vertical track | R-012, R-014, R-016 |
| S6 Exclusions and fees | Two facts before applying | Two unequal columns. Left (cols 1 to 7): a note with a 1.5px status-error border: "Not accepted: controlled substances and cold-chain products." Right (cols 9 to 12): "A platform fee applies to each order", the `fee-amount` chip, a link to Fees. | Stacked | R-021, R-024 |
| S7 CTA rail | Apply | CTA rail | Same | R-002 |

### Buying `/buying` (R-008, R-013, R-014, R-015, R-016, R-025, R-050)

Ground sequence: base, base, alt, base, dark, base, base, CTA rail, footer.

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| B1 Hero | Buyer promise | Stacked, unlike the splits: h1 (display-m) "Compare sellers and buy direct from verified pharmacies." across cols 1 to 8; lede and Apply in cols 1 to 6, the link "How orders work" aligned right. Below, IMG-04 at full content width in a 21:9 crop on the rail, with labels: Search / Drug name, strength, form, manufacturer; Compare / Every seller side by side; Sellers / Verified pharmacies only. | Image 4:3 (focal 50% 55%) | R-008, R-013; a different hero shape from Home and Selling |
| B2 Search grammar | The four search fields and four filters | A sentence diagram: heading-l text with four outlined pill slots reading "[Drug name] [Strength] [Form] by [Manufacturer]"; under it smaller chips: "filter by price, expiry date, quantity, seller location". A short paragraph on saved searches and email alerts when a wanted item is listed. The slots are static text in a list, not inputs. | Slots wrap onto lines | R-013 |
| B3 Side by side | Price comparison | bg-alt. Copy in cols 1 to 4: h2 "Every seller of the same product, side by side." Cols 6 to 12: an illustrative comparison table with columns Seller, Expiry, Quantity, Location, Price; seller cells read "Verified seller"; every value cell is a grey bar of varied length. Caption: "Illustrative. Real listings and prices are visible only to verified pharmacies." | Rows become blocks | R-013, R-010, R-033 (no numbers) |
| B4 Staying informed | Notifications and messaging | Quiet text section: h2 in cols 1 to 6 and a three-row ledger: email notifications (new orders, status changes, approvals, alerts); in-app notification centre; messaging tied to a listing or order. | Same, stacked | R-016 |
| B5 The order cycle | Order stages | Dark chapter. h2 "From checkout to delivery." A track of four stops in on-dark colours: checkout (items from one seller per checkout); seller confirms; seller ships with tracking; you confirm delivery. Under it: invoices and order history for both sides. | Vertical track | R-014 |
| B6 When an order goes wrong | Four scenarios | IMG-05 in cols 1 to 5 at 3:2. Cols 7 to 12: h2, then an accordion of four cases with the first open: short shipment; damaged goods; wrong lot or expiry; never arrived. Each panel: who reports (the buyer, from the order); how (an issue report with photos); who reviews (a platform administrator); outcome (`dispute-outcome` chip). A link to the Dispute and return policy. | Image above, accordion below | R-050, R-025, P-022 |
| B7 Payments | Payment statement | One large statement in heading-l across cols 1 to 9: "Payments go through a third-party payment provider. Card and bank details are never stored on our servers." A small note with the `payment-provider` chip. | Same | R-015 |
| B8 CTA rail | Apply | CTA rail | Same | R-002 |

### Trust and security `/trust` (R-011, R-017 to R-023, R-049, R-051)

Ground sequence: base, base, alt, base, dark, base, base, alt, CTA rail,
footer.

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| T1 Hero | The trust promise | Typographic: h1 (display-m) "No pharmacy trades until a person checks its licence." in cols 1 to 7, with lede and Apply. IMG-06, square and smaller, in cols 9 to 12 on a short rail that spans only the image, with one label: Review / By a platform administrator. | Image after the copy, 1:1 at 80% width | R-011, R-018; quieter than the other heroes because this page is read closely |
| T2 Verification, step by step | The four items | A ledger of four rows with large ordinals (display-m, 01 to 04) on the left, `label` keys and body text: What you submit (licence number, business details, licence documents); Who reviews (a platform administrator); What's blocked until approval (listing, searching, buying), this row on bg-dark-raised with on-dark text; Grounds for rejection (`rejection-grounds` chip). Below: "Review time:" with the `review-time` chip, and that approval or rejection is sent by email. | Rows stack, ordinals above keys | R-049, R-011 |
| T3 Accounts and roles | Account protections | bg-alt, two columns of short text: sign in with email and password, with optional two-factor authentication; owner and staff roles with different access. | Stacked | R-017 |
| T4 How the platform is built | Security measures | Spec sheet: h2 in cols 1 to 4; cols 5 to 12 a ledger of the eight measures in R-019's wording, one line each. Footnote in body-s: "Taken from the platform's build specification." | Ledger full width | R-019, Q-5 default |
| T5 Stored and never stored | Full data statement | Dark chapter. Two columns: Stored (pharmacy business data, listings, orders, licence documents, contact details) and Never stored (patient records, card and bank details) set in heading-m with a cross glyph per item. | Stacked, Never stored first | R-020 |
| T6 What can be listed | Safeguards and exclusions | Two columns: listing safeguards (expiry date, lot number and condition required and validated; expired items hidden) and exclusions (controlled substances and cold-chain products not accepted, with the status-error cross). Link to the Selling table. | Stacked | R-023, R-021 |
| T7 Oversight | What administrators do | A horizontal strip of four mono "log lines" on a 2px rail, without timestamps: Account reviewed; Listing moderated; Dispute handled; Key actions written to an audit log that can't be altered. | Vertical list | R-018 |
| T8 The legal position | Neutral position | bg-alt bordered note in cols 2 to 9, body-l: resale of medication between pharmacies is regulated; rules vary by region; the platform's approach is being set with a legal advisor; it will be stated before trading opens. | Full width | R-051, R-022 |
| T9 CTA rail | Apply | CTA rail | Same | R-002 |

### Fees `/fees` (R-024, R-052, R-054)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| F1 Hero | The fee at a glance | h1 (display-m) "A platform fee is recorded on every order." in cols 1 to 7, the `fee-amount` chip set larger under it, and Apply. IMG-07 at 1:1 in cols 8 to 12 on a rail with one label: Fee / Recorded on every order. | Copy, then image | R-024 |
| F2 Fee facts | Who and when | A three-row ledger: what it is (a platform fee on each order); who it applies to (`fee-payer` chip); when it is charged (`fee-timing` chip). | Stacked rows | R-054 |
| F3 Worked example | The structure of a fee | bg-alt band. The receipt in cols 2 to 6, rows: order total, platform fee, seller receives, payout timing, each a placeholder chip; badge "Illustrative example". Cols 8 to 12: copy saying the example gets real numbers once the fee is set. | Receipt full width | R-054, R-033 |
| F4 One order, start to finish | Records and money flow | Two columns divided by a vertical 2px rail. Left: "Records it leaves" ledger (order confirmation; shipping and tracking; delivery confirmation; invoices for both parties; audit log entries; tracing records, `tracing-records` chip). Right: "How money moves" vertical track (buyer pays through the payment provider; platform fee recorded; seller payout, `payout-timing` chip). Badge "Illustrative". | Columns stack | R-052 |
| F5 CTA rail | Apply, plus FAQ | CTA rail with an extra link "Read the FAQ" | Same | R-002 |

### FAQ `/faq` (R-009, R-010, R-015, R-021, R-025, R-026)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Q1 Header | Intro | h1 (display-m) "Questions pharmacies ask before applying." in cols 1 to 8 with a one-line lede. No image: this page is for scanning. | Same | R-026 |
| Q2 Answers | Nine required questions plus related ones | Two columns: a sticky topic index in cols 1 to 3 (Joining; Buying and selling; Money; Safety and data; When something goes wrong) with `aria-current="true"` on the topic in view; accordion groups in cols 5 to 11, each under an h2. Required: who can join; can one account buy and sell; how verification works; what it costs (placeholder); can controlled substances or cold-chain products be listed; is patient data stored; is card data stored; what if an order has a problem; which regions are served (`regions` chip). Also: can patients or the public buy (no). | The index becomes a wrapping row of pill links above the groups | R-026, R-009, R-010, R-021, R-025, P-022 |
| Q3 CTA rail | Apply and Contact | CTA rail with a "Contact the team" link | Same | R-002, R-031 |

### Apply `/apply` (R-027 to R-030, R-055)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| A1 Aside | What to have ready | Cols 1 to 4, sticky at lg: h1 (display-m) "Apply for verification."; a lede; the "Before you apply" checklist (licence number; business details; licence documents, uploaded later in the marketplace); a short "What happens next" ordered list; IMG-08 at 2:3, full aside width, on a short rail. | Aside on top without the image; the image moves below the form at 4:3 (focal 50% 45%) | R-055, R-030 |
| A2 Form | Collect the nine fields | Cols 6 to 11 on a `surface` panel with 48px padding: preview notice, error summary slot, then fields: pharmacy legal name; licence number (hint: as shown on your licence); licensing state or region; business address (textarea, 3 rows); contact name and contact role side by side at lg; work email and phone (optional) side by side at lg; intent pills Sell, Buy, Both; submit. Autocomplete: `organization`, `name`, `organization-title`, `email`, `tel`, `street-address`. | Single column, full-width submit | R-027, R-028, R-029 |
| A3 Confirmation | Next steps | Replaces A2 in place (see Forms) | Same | R-030 |

No floating Apply and no CTA rail on this page. The footer still links to
Apply (R-004).

### Sign in `/sign-in` (R-003)

A quiet utility page on bg-base with no image. Cols 1 to 7: h1 (display-m)
"Sign in happens in the marketplace app." and body text saying the app is
not available from this site yet. Two actions: Apply (primary) and "Contact
the team" (secondary link). Cols 9 to 12: one label card "Marketplace app"
with the `app-url` chip. No password field. Stacked at base.

### Contact `/contact` (R-031)

h1 (display-m) "Talk to the team." in cols 1 to 7, with a lede on what to
get in touch about (applications, questions about selling or buying).
Below, a three-row ledger: Email, Phone, Address, each a placeholder chip
(`contact-email`, `contact-phone`, `contact-address`). No form. CTA rail.

### Terms of use, Privacy policy, Dispute and return policy (R-032, R-025)

One shared layout; repeating it across the three legal pages is fine
(RJ-006 is about sections within a page). A text column in cols 3 to 9 (max
68ch): h1 (display-m) with the policy name, a "Last updated" line with the
`last-updated` chip, then the hatched placeholder block: "Pending content:
the <policy name> is supplied by the client and their legal advisor." No
drafted terms. The Dispute and return policy page adds one sentence above
the block: buyers report order issues with photos and administrators handle
disputes. It states no outcome, window or refund. CTA rail below.

### Not found `/404` (R-005)

IMG-09 full-bleed (16:9 at lg, 3:2 below, focal 50% 60%) on the rail, then
h1 (display-m) "This shelf is empty." and two links: Home, and Apply as the
primary button. Capsule nav present.

## Image plan

One art direction for all nine images. ChatGPT image generation returns
1536x1024 (landscape), 1024x1536 (portrait) or 1024x1024 (square), so each
image is generated at one of those sizes and cropped with `object-position`.
Paste each prompt as one message. Use the same chat for all nine so ChatGPT
keeps the style. If an image comes back with any text, pills or a person,
reply: "Regenerate. Remove all text, symbols and markings; every surface
must be blank. No pills, bottles or people."

Save originals as `<id>-<slug>.png` (for example `img-01-two-shelves.png`)
in the image folder the architecture picks, then export AVIF and WebP at
640, 960, 1280 and 1536 wide.

| ID | Page and slot | Generate at | Displayed crops | Purpose | Alt text | Focal point | Accepted |
|---|---|---|---|---|---|---|---|
| IMG-01 | Home H1 hero | 1536x1024 | 3:2 at lg and md; 4:3 at base | Surplus moving from a full shelf to a waiting one | "Two shelves side by side: one crowded with identical sealed cartons, the other holding a few of the same cartons, newly moved across." | 40% 60% | |
| IMG-02 | Home H2 problem | 1024x1536 | 4:5 at lg; 3:2 at md and base | Stock that takes space and won't be used | "A tall shelf packed with more identical cartons than it can hold." | 50% 40% | |
| IMG-03 | Selling S1 hero; Home H3 left half | 1536x1024 | 3:2; 4:3 in the diptych | Packing surplus to ship | "Sealed cartons packed into a shipping box, with tape and blank labels beside it." | 55% 50% | |
| IMG-04 | Buying B1 hero; Home H3 right half | 1536x1024 | 21:9 at lg; 3:2 at md; 4:3 at base and in the diptych | The same product from different sellers, side by side | "Three identical cartons standing on three plinths of different heights, lined up for comparison." | 50% 55% | |
| IMG-05 | Buying B6 order problems | 1536x1024 | 3:2 | A damaged delivery and the photo evidence | "A delivered parcel with a crushed corner, next to an instant photo of the damage." | 45% 50% | |
| IMG-06 | Trust T1 hero | 1024x1024 | 1:1 | Careful human review | "A magnifying glass resting on a blank card in front of a box of blank index cards, beside a brass key." | 50% 50% | |
| IMG-07 | Fees F1 hero | 1024x1024 | 1:1 | A fee recorded on each order, balanced | "A brass balance scale weighing a sealed carton against a small stack of plain brass discs." | 50% 55% | |
| IMG-08 | Apply A1 aside | 1024x1536 | 2:3 at lg; 4:3 at base | A place waiting to be filled | "A row of cartons on a shelf with one empty space, lit by a patch of sunlight." | 50% 45% | |
| IMG-09 | 404 | 1536x1024 | 16:9 at lg; 3:2 at md and base | Nothing here, said gently | "An empty shelf with a single carton tipped on its side." | 50% 60% | |

The social share image is a 1200x630 crop of IMG-01; it needs no extra
generation. All nine images carry meaning and get alt text. Where IMG-03 and
IMG-04 appear a second time (the Home diptych), they keep the same alt text.

### Shared style block

Every prompt below already ends with this block. It is listed here so it can
be reused for any replacement image.

```
Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

### Prompts (ready to paste)

**IMG-01, Home hero, 1536x1024**

```
Create a landscape image, 1536x1024.

Scene: two simple open shelf units stand side by side against a soft blush pink wall, both made of deep aubergine painted plywood. The left shelf is crowded: its shelves are packed tight with rows of identical plain off-white cartons, each with a single saffron yellow band. The right shelf is mostly empty, holding only a few of the same cartons, neatly spaced, as if just moved across. The bottom of the frame is a clean, straight horizontal shelf edge running the full width. Camera at shelf height, straight on, far enough back that both units fit with calm space above them. Late-afternoon sun from the upper left throws long diagonal shadows across the wall and shelves.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-02, Home problem, 1024x1536**

```
Create a portrait image, 1024x1536.

Scene: a tall, narrow alcove shelf painted deep aubergine, set into a terracotta wall. Every shelf is overfilled from bottom to top with identical plain off-white cartons, each with a single terracotta band, stacked two deep and pressed against each other. One carton near the middle sticks out slightly from its row, as if there is no room left for it. Camera straight on at the height of the middle shelf. Late-afternoon sun from the upper left cuts a bright diagonal across the stacks and leaves the lower shelves in warm shadow. The mood is quiet and a little heavy: too much of one thing.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-03, Selling hero and Home diptych, 1536x1024**

```
Create a landscape image, 1536x1024.

Scene: seen from above at a 45-degree angle on a seamless saffron yellow paper surface. An open plain brown cardboard shipping box, lined with soft blush pink tissue paper, holds three plain off-white cartons with aubergine bands, placed neatly side by side. To the right of the box: a roll of plain aubergine packing tape, a blank white rectangular adhesive label, and a blank off-white card tag on a short piece of string. Generous empty saffron paper around the objects on the left side. Late-afternoon sun from the upper left casts long shadows of the box flaps and the tape roll across the paper.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-04, Buying hero and Home diptych, 1536x1024**

```
Create a landscape image, 1536x1024.

Scene: three identical plain off-white cartons with saffron yellow bands, each standing upright on its own simple rectangular plinth. The three plinths are lined up in a row with even gaps, against a soft blush pink seamless paper wall and floor. The plinths differ in height and colour: the left one is terracotta and medium height, the middle one is aubergine and tallest, the right one is warm off-white and shortest. The cartons are exactly the same; only the plinths differ. Camera straight on at the height of the middle carton, all three plinths fully in frame with calm space on both sides. Late-afternoon sun from the upper left throws three long parallel shadows to the right.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-05, Buying order problems, 1536x1024**

```
Create a landscape image, 1536x1024.

Scene: on a seamless soft blush pink paper surface, a closed plain brown cardboard parcel sealed with plain aubergine tape sits slightly left of centre. One top corner of the parcel is visibly crushed and the tape over it is torn. To its right lies a single instant-camera photo print with a white border, showing a close-up of that same crushed corner; the border is completely blank. Camera at a low three-quarter angle, close enough to see the texture of the crushed cardboard. Late-afternoon sun from the upper left rakes across the dent so its creases cast small sharp shadows.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-06, Trust hero, 1024x1024**

```
Create a square image, 1024x1024.

Scene: on a seamless deep aubergine paper surface, a small open wooden index-card box filled with blank off-white index cards standing upright. One blank card lies flat in front of the box, and a brass magnifying glass with a dark wooden handle rests on top of it; the lens shows only the blank card surface, magnified. To the right lies a single plain brass key. Camera from slightly above, about 30 degrees. Late-afternoon sun from the upper left makes the brass glow warm and casts long shadows of the box and key across the aubergine paper; a small saffron-coloured highlight sits on the lens rim.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-07, Fees hero, 1024x1024**

```
Create a square image, 1024x1024.

Scene: a simple, elegant brass balance scale with two shallow round pans stands on a seamless saffron yellow paper surface against a saffron wall. The left pan holds one plain off-white carton with an aubergine band. The right pan holds a small neat stack of plain, completely unmarked round brass discs. The scale is level and balanced. Camera straight on at the height of the pans, the scale centred with calm space around it. Late-afternoon sun from the upper left casts a long, crisp shadow of the scale onto the wall behind.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-08, Apply aside, 1024x1536**

```
Create a portrait image, 1024x1536.

Scene: a close view of a single deep aubergine painted plywood shelf against a soft blush pink wall. A row of plain off-white cartons with saffron yellow bands stands on the shelf, and in the middle of the row there is one empty gap exactly the width of a carton. Below the gap, on the front edge of the shelf, is a small blank saffron yellow shelf-edge label holder. A patch of warm late-afternoon sunlight from the upper left falls into the empty gap, so the empty space is the brightest part of the picture. Camera straight on at shelf height, the shelf in the lower third, calm blush wall above.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

**IMG-09, Not found, 1536x1024**

```
Create a landscape image, 1536x1024.

Scene: a wide, empty deep aubergine painted plywood shelf runs across a soft blush pink wall. The shelf is bare except for a single plain off-white carton with a terracotta band, lying tipped over on its side near the right third. Lots of calm empty space. Camera straight on at shelf height. Late-afternoon sun from the upper left casts a long diagonal shadow of the shelf on the wall and a small shadow from the fallen carton. The mood is gentle and a little wry, not sad.

Style: photorealistic studio still-life photograph, medium-format camera, 80mm lens, f/8, everything in crisp focus. The set is built from seamless matte coloured paper and painted plywood. Colour palette limited to deep aubergine (#34172F), saffron yellow (#F2B23A), soft blush pink (#E9B8B0), terracotta (#C4613F) and warm off-white. One hard, warm late-afternoon sunlight source from the upper left casting long, clean diagonal shadows, with soft fill so the shadows stay readable. Calm, orderly, tactile and precise. Cartons are plain, unprinted cardboard boxes in warm off-white, each with one solid colour band, simple rectangular shapes. Absolutely no text, letters, numbers, logos, barcodes, symbols, icons or pictograms on any surface: every box, label, tag and card is blank. No pills, tablets, capsules, blister packs, pill bottles, syringes or medical crosses. No people and no hands. Fine film grain. No vignette, no glow, no lens blur, no CGI gloss, no gradient backgrounds.
```

Generation order: IMG-01 first. If it looks right, continue in the same
chat. If it drifts toward a stock-photo look, add "styled like a
set-designed still life for a design magazine, not a stock photo" and
regenerate before going on.

## Anti-generic review

- Could the site belong to five unrelated companies with only the logo
  changed? No. The still lifes are about shelves, cartons, parcels and
  checking, and the labels carry this marketplace's rules. Swapped onto a
  fintech or SaaS tool, they would make no sense.
- Predictable AI landing structure? No centred gradient hero, no feature
  card row, no logo strip, no testimonial slider, no pricing cards.
- Memorable, ownable decisions: the shelf rail with clip-on labels, and the
  aubergine and saffron still-life palette.
- Current without chasing trends: no glassmorphism, blur, glow, blobs or
  bento grids.
- Risk to watch in build: the palette could read as cosmetics or food if
  the images come out glossy or over-styled. The prompts keep objects plain
  and pharmaceutical in shape (cartons, parcels, shelves), and the type and
  tables keep the B2B register.

## Feedback log

The owner's feedback on this project. General feedback is also recorded in
the design memory.

| Date | Feedback (quoted) | Scope | Recorded as | Action |
|---|---|---|---|---|
| 2026-11-06 | "Why did you create an editorial site with black n beige color?" / "Not every website should have a big editorial typography." | general | RJ-009, P-031 | Moderate display sizes, aubergine on rose milk, one light pinned section |
| 2026-11-07 | "Didn't like it": "Too plain / looks like SaaS", "Too much UI, no imagery", "Colors felt cold" | project | RJ-010, P-032, P-033 | Generated still lifes as the main imagery, UI only as support, warm palette with no blue |

## Visual QA log

No build exists yet. The direction sketch was rendered as a sanity check
only and is not scored.

| Round | Date | Page | Width | Screenshot | Scores | Issues | Status |
|---|---|---|---|---|---|---|---|
| sketch | 2026-11-07 | Direction sketch (not a site page) | 390, 834, 1440 | `.artifacts/design/sketch/shot/{390,834,1440}.png` | not scored | At 390 a fixed floating Apply shown from load sat next to the hero Apply; this became the rule that it appears only after the hero Apply leaves the viewport. The placeholder chip needed a dark-ground variant (added). | rules updated |
