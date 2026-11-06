# Design direction

Owner: design-director, following `/creative-design-director` and the design
memory.

Every major decision has a reason that cites a brief section (`Brief §5`), a
reference (`REF-008`), or a preference or rejection (`P-020`, `RJ-002`).

**This branch holds concept C, "Soft Close".** Two earlier concepts exist,
each on its own branch with its own copy of this document:

- **A, "Kept Time"**: branch `agent/aurel-frontend-design-1104a`
  (paper, ink, rust; Archivo Expanded; the booking question first; a clock
  scrubbed by scroll; name board and journey rule).
- **B, "Standing By"**: branch `agent/aurel-concept-pop-1105a`, commit
  675576a (stone, paint green, tail-lamp red; Barlow Condensed capitals; one
  car render that stays across three scenes; pills).

C was made because the owner asked for "one extra ordinary concept of
landing page. It should be entirely unique. You can use another color theme.
Also focus on Hero section it should be realy creative." The three are
compared in [C against A and B](#c-against-a-and-b).

Status: built for owner review, 2026-11-06. Frontend only; services are
mocks. Brief §10 (understated, no luxury clichés) binds this concept as it
did the others.

---

## Client and audience

Unchanged from A and B, summarised so this file stands alone.

- **Client.** AUREL, a pre-booked private chauffeur service: point-to-point
  transfers, airport transfers, hourly and full-day hire, four vehicle tiers
  (Brief §1, §5, §6). It competes on a better-managed journey, not on price
  (Brief §7), and sets itself against "conventional ride-hailing services"
  (Brief §1).
- **Audience** (Brief §4): executives, corporate buyers and assistants
  booking for others, frequent airport travellers, families and event
  customers, hotels and agencies.
- **Primary task.** Reserve a journey (Brief §9 steps 3 and 4).
- **Personality** (Brief §10): sophisticated, confident, professional,
  elegant, dependable, understated, customer-focused.
- **Dos and don'ts** (Brief §10, §7): premium shown through service
  standards, not claimed; clear price before confirmation; no luxury
  clichés, no exaggerated promises, no aggressive marketing.

**The problem list is the brief's own.** Brief §2 names what goes wrong with
ordinary transport: unreliable pickup times, inexperienced drivers,
difficulty arranging in advance, unclear pricing, poor communication. A and
B both opened on AUREL's own world. C opens on that problem, then shuts it
out (PP-001: message first, the visitor's problem before the features).

---

## Concept

**Soft Close.** On a good car, the door doesn't slam. You push it most of the
way and the latch pulls it home, slowly, and the street goes quiet. That is
the whole service in one movement: AUREL takes the last part off your hands,
and the noise of ordinary travel stays outside.

The name works three ways, and all three are in the brief:

1. **The motion.** The hero is a door that swings shut over the noise; past
   the catch, the latch finishes the close by itself (P-014, P-020: the
   object stays and the page changes around it).
2. **The tone.** Quiet, low-volume type, a night palette, nothing shouted
   (Brief §10).
3. **The selling.** A soft close is the opposite of a hard close: no
   countdowns, no scarcity, no pressure (PP-003). The only "outside" pressure
   on the page is the noise the door shuts out.

The rest of the site is drawn **from the inside of the car**: the fleet is
shown as cabin plans seen from above, the airport scene walks you through
four doorways to the kerb, and the ending opens the door again: "We'll be
outside."

### Signature devices

1. **The door.** A full-screen panel with a visible thickness at its leading
   edge and a soft shadow cast on the street. It carries AUREL on its fixed
   part and the answers on its moving part.
2. **The ambient strip.** One thin ice-blue line, the light strip in a door
   card. It draws across the bottom of the hero once the door latches and
   marks progress in the booking steps. It is the same colour as the one
   action, so the accent means "go" or "done" and nothing else (P-026).
3. **The cabin plan.** Each tier drawn in code from above: the chauffeur's
   seat, the passenger seats, the bag spaces. Seats and bags fill as you set
   your party. It replaces every car picture on the site.
4. **Outside and inside.** Two grounds only: the cabin (plum-black) and the
   kerb (concrete grey). The kerb appears three times: the noise in the
   hero, the business scene, and the slit of light in the ending.

---

## Hero ideas explored

The owner asked for the hero first. Four ideas, scored 1 to 5 on: the
visitor understands AUREL and can book at once (task), only AUREL could own
it (ownable), brief tone (tone), it works at 390, by keyboard and under
reduced motion (robust), and it is buildable in the stack without heavy
assets (build).

| | Task | Ownable | Tone | Robust | Build | Total |
|---|---|---|---|---|---|---|
| **H1. Soft Close** (built) | 5 | 5 | 4 | 5 | 4 | **23** |
| H2. Headlights | 4 | 3 | 3 | 3 | 3 | 16 |
| H3. Route drawn by the booking | 5 | 2 | 4 | 4 | 3 | 18 |
| H4. The power window | 4 | 4 | 4 | 4 | 4 | 20 |

- **H1. Soft Close.** The first screen is a car door left open onto the
  street. Outside, on kerb grey: the noise of ordinary booking, set loud and
  loose ("6 min away" ticking up, a cancelled driver, a fare range struck
  through, "Where are you?", "No cars available nearby"). Inside, on the
  door: "Travel, considered.", one sentence, Book, and four quick starts.
  Scrolling swings the door shut; past the catch it latches and pulls home
  on its own; the strip lights; the four problems reappear on the inside,
  struck, each with its answer. Tone loses a point because it shows the
  category's problems: the lines are generic and name nobody, but the owner
  should confirm it doesn't read as knocking competitors (Open question 2).
- **H2. Headlights.** A dark page; two beams light the headline word by
  word. Rejected: headlight beams on black are the car-advert cliché the
  brief warns against, and text revealed by light fails under reduced motion
  unless it is simply shown.
- **H3. Route drawn by the booking.** Type "from" and "to" in the hero and a
  line draws between them on an abstract map. Rejected: it is the
  ride-hailing app's own picture (map, line, pin), the thing AUREL sets
  itself against, and A already led with the booking question.
- **H4. The power window.** The same outside/inside idea told by a window
  rising. Close second; kept as the fallback. The door won because a door
  closing is the moment a chauffeured journey begins, and "soft close" gives
  the concept its name and its no-pressure stance.

### How the hero moves (verified in frames)

Captured in `round-3/home/` at 1440, 834 and 390:
`*-hero-t0300`, `-t1800`, `-p15`, `-p30`, `-p45`, `-p52`, `-latch-0060ms`
to `-latch-1800ms`.

- **On load** nothing blocks reading: the headline, sentence and Book are
  on screen in the first frame (`1440-hero-t0300.png`). Outside, the minute
  count changes every 1.4s (4, 6, 9, 12, 15: `t0300` shows 4, `t1800` shows
  6), the dots after "No cars available nearby" blink, and the cancelled
  toast shakes once every 2.8s (CSS, not frame-checked beyond the stills).
- **Scroll** moves only the door, by transform. On desktop it slides from
  the right over the left 44vw; below 900px it rises from the bottom over
  the top 44svh (50svh at tablet). Scroll carries it to 86% of the way
  (`p15` to `p52` show the gap narrowing).
- **The latch.** At 56% of the hero's scroll the door is let go: it
  finishes the last 14% over 900ms on `cubic-bezier(0.3, 0, 0.1, 1)`, so it
  arrives slowly (`latch-0060ms` still shows a sliver of street;
  `latch-0300ms` is shut). The outside stops talking (timers and CSS
  animations paused).
- **After the latch** the "Inside" label and the four struck problems with
  their answers arrive one by one, 600ms each, starting 500ms after the
  latch and 110ms apart (`latch-0600ms` shows the last answer still faint;
  `latch-1000ms` all in). The strip draws across the bottom from the right
  over 1.1s, after a 450ms delay.
- **Back up**: below 40% the latch lets go and the door follows scroll
  again.
- **Close the door** (a button, bottom right on desktop, bottom left on
  phones) scrolls to the latch point for people who would rather click.
- **Reduced motion** (`rm-*-hero-t1800.png`): no pin and no outside. The
  door is drawn already shut with every answer and its struck problem
  showing, the strip already drawn. The idea still reads in one still
  frame: what you leave outside, what you get inside.
- **Keyboard**: skip link, wordmark, Menu, Book, then "Book a journey" is
  the fifth Tab stop on every width (logged by `flow.mjs`). Focus ring 2px
  ice-blue with 2px offset (`round-3/flow/hourly-834-0-hero-focus.png`).

---

## Design memory applied

Memory read on 2026-11-06 from
`C:/Users/Muhammad Farasat/Documents/design-memory`: MY-DESIGN-PREFERENCES.md,
the four topic files, approved-and-rejected-designs.md, product-principles.md,
references/INDEX.md, the README of REF-009, and these images, which I looked
at: REF-008 `p14-Dd1ym5LKbOJ-frames-b.jpg`, REF-001 `timer-1536.jpg`,
REF-002 `hero-1440.png`, REF-003 `hero-1440.png`. REF-004 to REF-007 were used
only as the category-cliché list carried in A's and B's documents.

Client beats owner; owner rejections beat my defaults; the memory's own
carve-out holds (booking steps keep the craft, drop the story).

| ID | Preference or rejection | Decision | Reason |
|---|---|---|---|
| P-006 (strong) | Chaptered, pinned story | **applies** | Three pinned scenes (door, four doors, ending), each short; the others scroll normally. Booking and account pages have no story. |
| P-014 (strong) | Scroll drives the story; motion explains | **applies** | The door closing is the product: the problems shut out, the answers inside. The four doors walk the airport arrival. |
| P-018 (strong) | Serif only by intent | **applies** | No serif. |
| P-001 | One display face, one text face | **adapts** | One family (Hanken Grotesk) in two voices: Light 300 display with italics, Regular to SemiBold text. The two voices come from weight, as REF-003 does inside Inter Tight. |
| P-002 | Extreme scale jump | **applies** | Hero headline at 130px (1440) and 53px (390) against 16 to 17px text. |
| P-003 | Display leading at or below 0.9 | **applies** | 0.9 to 0.95 on display; title steps 1.08 (P-028). |
| P-004 (candidate) | Uppercase for loud brands | **doesn't apply, on purpose** | C is the quiet concept; sentence case, light weight. B already took capitals. |
| P-005 (candidate) | Staircase offsets | **adapts** | The four requests step right by 7vw a row; "outside." is indented under "We'll be". |
| P-007 | One message per viewport | **applies** | See Composition plan: one loud thing per scene. |
| P-008 (candidate) | Ground marks the chapter | **adapts** | Only two grounds, inside and outside, so a ground change means "outside" every time: hero noise, business, ending. Arrivals sits on the darker footwell. |
| P-009 (candidate) | Designed ending | **applies** | "We'll be outside." crossing a slit of kerb light that opens with scroll. Not a wordmark: A and B both ended on the wordmark. |
| P-010 | No conventional nav bar | **applies** | Wordmark, Menu, one quiet Book. B's pill links are gone. |
| P-011 / P-026 | Quiet interface, one accent kept for action | **applies** | Ice blue appears only on the main action, focus, the persistent action, step progress and the hero strip. Status colours carry words and icons. |
| P-012 | Made-for-the-brand imagery | **adapts** | No photographs or renders: cabin plans drawn in code from the fleet data. They are true to the data and need no shoot to be honest. |
| P-013 | Hover 150 to 330ms | **applies** | 180ms colour; request rows shift 12px and the arrow disc fills and turns 45 degrees (330ms). |
| P-015 | Type that reveals itself | **adapts** | Text never scrubs. The answers arrive in sequence after the latch; requests fade up 80ms apart. |
| P-016 | Strong ease-out | **applies** | ease-out-quint and ease-out-expo, plus the latch curve. |
| P-017 | Display face belongs to the business | **applies** | See Typography: a light voice is the volume inside a shut car. |
| P-019 (candidate) | Subject breaks the type | **adapts** | The door crosses the noise; the ending's light slit crosses "We'll be outside." There is no product photo to put in front of type. |
| P-020 (candidate) | Hero object stays | **applies** | The door stays on screen through the hero; only its transform changes. |
| P-021 (candidate) | Colour from one source object | **applies** | The rear cabin at night: leather, headliner, ambient strip, and the kerb seen through the door. |
| P-022 (candidate) | One expanded item | **applies** | Fleet: one tier open beside its large cabin plan, three closed rows. |
| P-023 (candidate) | Small labels on big things | **adapts** | Small labels on the doorways ("Take-off", "Arrivals hall"), "Outside" and "Inside". No pills on display type: B owns that look. |
| P-024 (candidate) | Order follows the visitor's questions | **applies** | Order below. |
| P-025 (candidate) | Distortion entrance | **doesn't apply** | One post only; a gimmick for this brand. |
| P-027 (candidate) | Tokens by role | **applies** | `--bg-base`, `--bg-elevated`, `--bg-field`, `--bg-sunk`, `--fg-primary`, `--fg-secondary`, `--border-field`, `--border-subtle`, `--accent`, `--on-accent`; `.on-light` switches roles to the kerb. Old names stay as aliases for the booking code. |
| P-028 (candidate) | Line height falls as size rises | **applies** | 1.55 body, 1.2 sub-titles, 1.08 titles, 0.9 display. |
| P-029 (candidate) | Main action in thumb reach | **applies** | At 390 the hero Book is a full-width pill in the lower half; the persistent action is a full-width pill at the bottom. |
| P-030 (candidate) | Progress in multi-step flows | **applies** | "Step N of 4" and four ticks, the current tick in the accent; a four-step preview beside the home booking panel. |
| PP-001 | Message first | **applies** | The hero states the visitor's problem, then the answer. |
| PP-002 | Feature, benefit, headline | **applies** | Answers are benefits ("One fixed price, shown before you confirm."), not features. |
| PP-003 | No scarcity or countdown | **applies** | No timer or scarcity anywhere. The ticking minutes are shown as the problem, outside the door. |
| Theme | "Both" | **decided: dark (night)** | A and B are light. Chauffeur work is early mornings and late nights: the 5am airport run, the drive home after an event. The cabin at night is when the service is felt. |
| Button shape | "Depends" | **decided: pill** | Soft like a door seal. Hairline secondary, one filled accent. |
| RJ-001 to RJ-008 | General rejections | **applies, all** | Checked below. |

### Rejections checked and avoided

- [x] **RJ-001 Centered hero on a gradient.** Split, asymmetric door scene;
      no gradient behind content (the only gradient is the 12px door edge).
- [x] **RJ-002 Rows of identical cards.** Fleet is one open row beside a
      plan; services are four sentences; the business scene is one slip.
- [x] **RJ-003 Icon grids.** None. Icons only inside controls.
- [x] **RJ-004 Stock photography.** No photographs at all.
- [x] **RJ-005 Logo strips.** None.
- [x] **RJ-006 One template.** Seven scenes, seven compositions (below).
- [x] **RJ-007 Colour spread evenly.** Two grounds and one accent.
- [x] **RJ-008 Default serif.** None.

No `project`-scope rejections exist for AUREL in the memory.

### Category and brief clichés checked

- [x] No gold on black: the accent is ice blue, the light is pale grey.
- [x] No city skyline at dusk, no light trails, no blurred hotel fronts.
- [x] No chauffeur holding a door: the door is shown from inside, with no
      people. "We'll be outside." says it in words.
- [x] No serif as premium, no navy, no black and yellow.
- [x] No luxury words: "luxury" appears only in two tier names from the
      brief (open question carried from A).
- [x] No "Download the app", no stat row, no Trustpilot badge.

---

## References

Research limits: no new gallery browsing in this pass (no new references
were filed for C). Ideas taken, not copied:

| ID | What I took | What I did not copy |
|---|---|---|
| REF-003 premotio | One family in two voices; light display weight; a calm page with one moving device | Its 3D poster ring, its glass pill nav |
| REF-002 Carnilove | A loud ground change used rarely; a designed ending | Its condensed capitals, wine and cream |
| REF-001 Grail | Pinned scenes; the one floating action; corner labels | Its serif, its countdown (PP-003) |
| REF-008 p03, p14 | An object crossing the type (the light slit across the ending title) | "RIDE / DIE", the red, the italic poster caps |
| REF-008 p07 | One open item and a big index | Colour bands (B used them) |
| REF-009 | Role tokens, 60-30-10, line height by size, thumb reach, progress | Its scarcity advice, its SaaS look |
| REF-004 to 007 | The clichés above, to avoid | Every identity element |

---

## Directions compared

For C I developed three candidates, all dark-led and all different from A
and B.

### C1. Soft Close (chosen, built here)

Described above.

### C2. Night Shift

- **Concept.** The site keeps the hours AUREL works: 04:30 airport runs,
  23:40 pickups after dinner. Each scene is one hour of a chauffeur's night.
- **Type.** A monospaced or tabular face. **Colour.** Navy to black.
- **Why not.** Time as the organising idea is A's concept, and "07:53" was
  already B's airport scene. Navy is Carey's (REF-007).

### C3. Seat Map

- **Concept.** The whole site as cabin plans: you book by filling seats.
- **Type.** A grotesk. **Colour.** Pale blueprint.
- **Why not.** Strong for the fleet, too narrow for a hero: it says "which
  car", not "why AUREL". It survives inside C1 as the fleet device.

### Scores (1 to 5)

| Criterion | C1 Soft Close | C2 Night Shift | C3 Seat Map |
|---|---|---|---|
| Fit with audience and brand | 4 | 4 | 3 |
| Brief, accessibility, primary task | 5 | 4 | 4 |
| Owner's preferences | 5 | 3 | 3 |
| Distinctiveness (category, A, B) | 5 | 2 | 4 |
| Buildable | 4 | 4 | 4 |
| **Total** | **23** | **17** | **18** |

### C against A and B

| | A. Kept Time | B. Standing By | C. Soft Close |
|---|---|---|---|
| Central idea | Minutes as material | The car that stays | The door that shuts out the noise |
| Hero | The booking question as headline | Car across "TRAVEL, / CONSIDERED." | A door closing over the brief's problems |
| Theme | Light paper | Light stone | Dark cabin, with kerb grey |
| Accent | Rust amber | Tail-lamp red (signal), paint green (action) | Ice blue, action only |
| Type | Archivo Expanded, sentence case | Barlow Condensed capitals | Hanken Grotesk Light, sentence case, italics |
| Shape | Square | Pills, soft panels | Pills, hairlines, small radius |
| Vehicles | Elevation line drawings | AI placeholder renders | Cabin plans from above, in code |
| Ending | Wordmark on night | Car across the wordmark | "We'll be outside." across a slit of light |

| Criterion (1 to 5) | A | B | C |
|---|---|---|---|
| Fit with audience and brand (Brief §10) | 5 | 4 | 4 |
| Brief, accessibility, primary task | 5 | 4 | 5 |
| Owner's preferences, including "pop" | 3 | 5 | 4 |
| Distinctiveness | 5 | 4 | 5 |
| Buildable | 4 | 4 | 4 |
| Hero alone (the owner's ask) | 3 | 4 | 5 |
| **Total** | **25** | **25** | **27** |

C's preference score is a 4, not a 5: it is deliberately quieter than B
(no capitals, no product render), so it pops by idea and contrast rather
than by scale. Its brand-fit score is a 4 because it shows the category's
problems on the first screen (Open question 2).

---

## Website structure, journeys and booking flow

Concept C changes none of this: same sitemap, journeys, booking flow, rules
and states. The text below is carried from A and B; where it names a
concept-specific look (amber, lamp red, pills, the journey rule's markers),
read the C equivalents in Design system and Interaction patterns.

**Unchanged from Kept Time** in content and rules: the same sitemap, the
same journeys per audience, the same four-step booking flow with its
errors, loading and empty states, and the same booking-details states. The
build reuses `src/services`, `src/data`, `src/config`, the draft state and
the route structure as they were. Only presentation changes, and those are
marked in the text below and listed under Interaction patterns. Wherever the
text says "journey rule", read the running summary card; the rule is still
drawn, with round markers and the lamp-red "now" dot.

### Website structure

### Sitemap

```
/                               Home: booking scene, then the story
/book                           Booking flow (steps are URL states)
  /book/journey                 1 Journey
  /book/vehicle                 2 Vehicle
  /book/details                 3 Details
  /book/review                  4 Review and pay
/booking/[ref]                  Booking details: confirmation, Prepare, Travel, Complete
/manage                         Find a booking (reference + email), no account needed

/airport-transfers              Service: airport
/transfers                      Service: point to point
/hourly                         Service: hourly chauffeur
/full-day                       Service: full-day chauffeur

/fleet                          The four tiers, compared
/business                       Corporate accounts
/business/apply                 Open a business account
/partners                       Hotels, travel agencies, hospitality
/standards                      About AUREL and its service standards
/help                           Help topics, questions, contact
/contact                        Contact details and a message form

/account                        Account home (upcoming journeys)
  /account/journeys             Upcoming and past
  /account/passengers           Saved travellers (for people who book for others)
  /account/places               Saved places
  /account/payment              Cards
  /account/receipts             Receipts and invoices
  /account/company/...          Company admin: people, cost centres, billing (business accounts)
  /account/settings             Profile, notifications, security
/sign-in, /sign-up, /reset      Auth

/legal/terms                    Terms of service
/legal/booking-conditions       Booking, cancellation and waiting-time terms
/legal/privacy                  Privacy notice
/legal/cookies                  Cookies
```

Out of scope here: chauffeur and admin interfaces (Brief §12 mentions them;
they are apps, not website pages), city pages (launch market not known,
Brief §12), careers.

### Page list and purpose

| Page | Purpose | Main audience | Journey stage (Brief §9) |
|---|---|---|---|
| Home | Start a booking in the first scene; then show how AUREL runs a journey | All | Discover, Explore, Reserve |
| Service pages (4) | Explain one service by its shape in time; book it with the panel preset | All, by need | Explore, Reserve |
| Fleet | Compare tiers by what they carry and include | Families, events, buyers | Explore |
| Book (4 steps) | Reserve and pay | All | Reserve, Confirm |
| Booking details | Confirmation, chauffeur assignment, live status, receipt, feedback | All | Confirm, Prepare, Travel, Complete |
| Manage | Find a booking without an account | Guests, assistants | Prepare |
| Business | Make the case for an account and start one | Corporate buyers | Discover, Explore |
| Partners | Guest transport for hotels and agencies | Hospitality | Discover, Explore |
| Standards | Who AUREL is and the standards it holds itself to | Executives, buyers, families | Explore |
| Help, Contact | Answer questions; reach a person | All | Any |
| Account | Repeat bookings, travellers, receipts, company admin | Frequent travellers, buyers, partners | Prepare, Complete |
| Legal | Terms, booking conditions, privacy | All | Confirm |

### Global frame

Changed in this concept (see Interaction patterns):

- **Top bar:** AUREL wordmark (typeset placeholder) left; three pill links
  (Airports, Fleet, Business) centred; Menu and a Book pill right. Below
  834px, only wordmark, Menu and Book.
- **Menu** (was "Index"): the same four groups and links, as a full-screen
  sheet on the paint ground with condensed labels. Sign in lives here.
- **Persistent action:** a paint pill at the bottom, shown when no booking
  panel, hero or ending is in view; with a draft it reads "Continue:" and the
  route. Hidden on /book, booking pages and the account area.
- **Footer:** compact index on the paint ground on every page except the
  booking steps.

---

### Customer journeys

### Journeys per audience, mapped to the brief's seven stages

| Stage (Brief §9) | Executive individual | Corporate buyer (assistant, travel manager) | Frequent traveller | Family or event customer | Hotel or agency |
|---|---|---|---|---|---|
| 1 Discover | Referral or search; lands on home; the booking question is the first thing read | Lands on `/business` from search or a sales link | Lands on home or `/airport-transfers` | Search for wedding or family transfer; lands on `/full-day` or home | Lands on `/partners` from a sales contact |
| 2 Explore | Skips the story; maybe Fleet | Reads account benefits, assurance facts beside the form, booking-for-others; may open Standards | Usually skips; checks the airport chapter once | Reads the story, Fleet (seats and bags), Standards | Reads how guest bookings, billing and the guest's experience work |
| 3 Reserve | Home booking panel, 4 steps, books for self | Signs in to company account; books for a saved traveller; picks cost centre | Signed in; saved places and flight number make it about 60 seconds; repeat a past journey from Account | Full-day or Hourly; sets passengers and bags first; tier filter shows what fits; adds occasion notes | Books for a guest, name on board = guest name, bills to partner account |
| 4 Confirm | Review shows itinerary and fixed total; card | Review shows cost centre, approver if the owner adds one; invoice billing | One-tap confirm with saved card | Review shows what's included and cancellation terms in plain words | Confirms; sends the guest the itinerary link |
| 5 Prepare | Email and SMS; booking page shows status | Gets a copy; traveller gets the itinerary | Status moves to "Chauffeur assigned" with name and vehicle | Can change time or add a stop | Sees all guest bookings in Account |
| 6 Travel | Booking page tracks the chauffeur's arrival (if the platform supports it) | Optional notification on pickup and drop-off | Flight tracked; pickup moves with landing time | Live status on the booking page | Optional notifications |
| 7 Complete | Receipt; one-question feedback | Monthly invoice in Account receipts | Receipt; "Book the return" | Receipt; feedback | Partner statement |

### Design consequences

- The story never blocks booking: every page that sells a service carries
  the same booking panel in its first scene (executives and frequent
  travellers skip everything else).
- Booking for someone else is a first-level choice on the Details step, not a
  buried option (buyers, partners, families).
- Passengers and luggage come before tier, so the vehicle step shows only what
  fits (families, events).
- Saved places, saved travellers, flight number memory and "Book again" make
  repeat airport runs short (frequent travellers).
- Corporate assurance facts live beside the business form and on the Review
  step for business accounts, never as a stat row on the home page.

---

### Booking flow

One component, `BookingPanel`, used in the home booking scene, each service
page's first scene and `/book`. It grows in place (REF-004). Each step has its
own URL so the browser back button and reloads work. The draft is saved
locally as the user types, so a lost connection or an accidental close loses
nothing.

### Step 0: Entry (home and service pages)

- **Service switch:** four square segments, "Transfer", "Airport",
  "Hourly", "Full day". The headline above changes with the choice:
  - Transfer: "Where should we collect you?"
  - Airport: "Arriving, or catching a flight?"
  - Hourly: "Where do we start, and for how long?"
  - Full day: "Which day do you need a chauffeur?"
- **First field** is a large pill input in the display face
  (`--type-input-xl`). Typing opens autocomplete. Results are labelled
  "Airport", "Hotel" or "Address" (REF-007). Choosing a result grows the panel
  downward to show the rest of step 1. Nothing else on the page moves.

### Step 1: Journey

Fields by service. Only relevant fields appear (REF-004).

| Service | Fields, in order | Notes |
|---|---|---|
| Transfer | From, To, Date, Time, "Add a stop" (link) | "Add a stop" is an add-on (Brief §8); each stop adds a row with a remove control. |
| Airport, arriving | Arriving / Departing choice first (REF-006); Airport and terminal; Flight number; Destination; Date | Pickup time is not asked: it's set from the flight's scheduled landing plus a waiting buffer the user can change ("Meet me 30 min after landing"). If the flight is found, show airline, origin and scheduled time for confirmation. |
| Airport, departing | Pickup address; Airport and terminal; Flight time; Date | AUREL suggests a pickup time from the flight time (buffer rules TBD by owner), editable. |
| Hourly | Start address; Date; Start time; Duration (stepper, hours) | One toggle "End somewhere else" adds a drop-off field (REF-004 lesson: one control switches drop-off and duration). Minimum hours TBD by owner. |
| Full day | Start address; Date; Start time; Day length (choice: values TBD, for example 8 or 10 hours); "Rough plan" text (optional) | The plan field is free text; the chauffeur and operations see it. |

Primary action: "See vehicles" (paint pill). Date pickers: a custom accessible
calendar grid on desktop and tablet; native date and time inputs on phones,
which are faster and more reliable there.

### Step 2: Vehicle

- **Party first:** passengers and bags as two steppers at the top
  (defaults 1 and 1).
- **Tier comparison, one glance** (REF-004, REF-006): four rows on desktop,
  each a technical side elevation drawing of the tier to scale, the tier
  name, "or similar" model line (owner-supplied), seats and bags as drawn
  marks inside the drawing plus numbers, a one-line inclusion summary, and the
  all-in price in tabular figures. Rows that can't fit the party are dimmed
  with the reason written out ("Seats 3. You have 5 passengers.") and stay
  focusable so screen readers hear why.
- **Details on demand:** "What's included" expands inline under the
  selected row: waiting time, meet-and-greet (airport), water, and so on, as
  the owner confirms them.
- **Price states:** "Fixed price" with a "See breakdown" disclosure (base
  fare, included waiting, add-ons, taxes). Never a range on this step
  unless the owner's pricing model needs one (Open question 4).
- Primary action: "Continue with First Class" (label carries the tier).

Nothing about the traveller or payment is asked here (REF-006 friction).

### Step 3: Details

- **Who is travelling:** "Me" / "Someone else". Signed-in business users
  get "A saved traveller" with search.
- **Traveller:** name, mobile, email (for someone else, the booker's details
  are kept separately for confirmation copies).
- **Name board preview** (airport arrivals only): the name board with the
  traveller's name in uppercase Extended; editable ("Use a company name" or
  initials for privacy). Meet-and-greet is on by default if the owner
  includes it, or shown as an add-on with its price.
- **Add-ons** (Brief §8): extra waiting time, additional stop (if not set),
  special occasion arrangements, child seats if offered, as a short list of
  checkboxes with prices. Not cards.
- **Note for the chauffeur:** optional text, 280 characters.
- **Business account:** cost centre, reference or PO, as the owner's account
  model needs.
- Primary action: "Review booking".

### Step 4: Review and pay

- **Itinerary:** the journey rule, top to bottom: pickup time and place,
  stops, drop-off or end time, with the tier drawing small beside it. Each
  part has "Change", which jumps to the right step and returns here.
- **Price:** the breakdown open by default, total in large tabular figures,
  and the words "This is the price you pay" if the owner's model is fixed
  price (Brief §7 transparent reservations).
- **Terms in plain words:** cancellation window, waiting-time policy, and a
  link to booking conditions. Text from the owner.
- **Payment:** saved card, new card, or "Bill to account" for business
  accounts. Account creation is optional and offered after confirmation, not
  before.
- Primary action: "Confirm and pay £X" (amount in the label).

### Step 5: Confirmation, then booking details

`/booking/[ref]` is both the confirmation page and the page the customer
returns to through Prepare, Travel and Complete.

- **Top:** status line ("Reserved") and the reference in tabular Extended.
- **Itinerary:** the journey rule with the lamp-red now-marker.
- **What happens next** as dated items on the same rule: "Chauffeur and
  vehicle confirmed by [time TBD]", "Flight tracked from departure",
  "Chauffeur at arrivals from 07:40". This is the Prepare stage made visible.
- **Actions:** Add to calendar, Share itinerary (sends the traveller a link),
  Change, Cancel (with the cancellation terms in the confirmation dialog).
- **States over time:**
  1. Reserved
  2. Chauffeur assigned: name, photo (when the owner supplies photos), vehicle
     model and colour, plate, contact through AUREL
  3. On the way (live position only if the platform supports it; otherwise a
     time)
  4. Arrived, waiting (waiting time counts down on the rule)
  5. In progress
  6. Completed: receipt download, "Book the return", one-question feedback
     (a five-step scale plus an optional note)
- **Cancelled** and **Changed** show as entries on the rule with the time
  they happened.

### Errors

- Validate on leaving a field and on submit, never on each keystroke.
  Messages sit under the field in `--color-error` with an error icon and
  plain text, and the field gets a 2px error border. On submit, focus moves
  to an error summary at the top of the step that links to each field.
- Address typed but not chosen from suggestions: "Choose an address from
  the list so the chauffeur finds the exact spot." (REF-007 helper idea).
- Flight not found: "We couldn't find that flight. Check the number, or
  continue and enter the landing time yourself."
- Too soon: "We need [X hours] notice for this journey. For something sooner,
  call [number]." (lead time TBD by owner).
- Outside the service area: "We don't cover this route yet." plus a request
  form, never a dead end.
- Tier unavailable at that time: the row says so and the panel suggests the
  nearest available time or tier.
- Payment declined: everything stays filled; message above the payment
  block; focus moves there.
- Connection lost: a quiet line at the top of the panel: "You're offline.
  Your booking is saved on this device." Continue is disabled until the
  connection returns.

### Loading

- Prices: rows keep their final size; prices show a 1px shimmer bar where the
  figure will appear and "Calculating" in text for screen readers
  (`aria-live="polite"`). No spinner over the panel, no layout shift.
- Autocomplete: results list opens at once with "Searching" in the first
  row.
- Confirm and pay: the button keeps its size, its label changes to
  "Confirming", and it disables. If it takes more than 8 seconds, a line
  under it says what is happening.

### Empty states

- Account, no journeys yet: one line "No journeys booked yet." and the
  booking question as a link into the panel. No illustration.
- Saved places or travellers empty: one line that explains what saving does
  and where it happens ("Places you use are offered here after your first
  booking.").
- Receipts empty, Help search with no results: one line plus the contact
  route.

---

## Design system

Implemented in `apps/aurel-web/src/styles/tokens.css` and `base.css`.

### Typography

**Hanken Grotesk** (Alfredo Marco Pradil, SIL Open Font License), variable
weight with a true italic, self-hosted through
`@fontsource-variable/hanken-grotesk` 5.3.0. Barlow is removed.

- **Display: Light 300**, sentence case, tracking -0.04em, often with the
  last words in Light Italic ("Travel, *considered.*"). Why it belongs to
  AUREL (P-017): the concept is the inside of a shut car, where people
  lower their voice. A light weight is low volume; the italic marks the
  word that moves. It is the opposite of B's condensed capitals and of the
  category's serifs, and it keeps the brief's "understated" literally.
- **Text: Regular 400 to SemiBold 600.** Open shapes that stay clear at
  14px as light text on a dark ground.
- **Outside voice:** the noise in the hero is set in the same family at
  ExtraBold 800, tight, and loose on the page: the same family made loud,
  so the shift from outside to inside is heard in the type.
- Rejected: Archivo Expanded (A), Barlow (B), any serif (RJ-008), Geist,
  abcFavorit, Steagal, Cormorant (competitors, REF-004 to 007), Inter and
  Space Grotesk (defaults), Söhne.

| Style | Weight | 390 | 1440 | Leading | Use |
|---|---|---|---|---|---|
| Hero title | 300 / 300 italic | 52px | 130px (`min(9vw, 9.75rem)`) | 0.92 | "Travel, considered." |
| `--type-poster` | 300 | 52px | 160px | 0.9 | Ending, airport and fleet page titles |
| `--type-display` | 300 | 40px | 100px | 0.95 | Scene titles |
| `--type-title` | 300 | 30px | 56px | 1.08 | Request sentences, Q&A title |
| Step title | 300 | 36px | 56px | 1.0 | Booking step titles |
| `--type-step` | 600 | 20px | 24px | 1.2 | Sub-titles in steps |
| Answers | 300 | 18px | 28px | 1.2 | Hero answers on the door |
| `--type-body` | 400 | 16px | 16px | 1.55 | Reading text, inputs |
| `--type-small` | 400 | 14px | 14px | 1.45 | Helpers, captions |
| `--type-label` | 500 caps | 13px | 13px | 1.3 | Labels, tracking 0.08em |

Tabular figures on every time, price and reference.

### Colour tokens

Taken from one place (P-021): the rear cabin at night, door shut, and the
kerb seen through it.

| Token | Value | Source | Use |
|---|---|---|---|
| `--bg-base` | `#141118` | Plum-black leather | Page ground, the door |
| `--bg-elevated` | `#1E1A23` | Door card | Panels, sheets, cabin body |
| `--bg-field` | `#26212C` | Seat facing | Inputs, segment tracks |
| `--bg-sunk` | `#0D0B10` | Footwell | Footer, menu, arrivals scene |
| `--fg-primary` | `#ECE6DD` | Headliner | Text, selected fills |
| `--fg-secondary` | `#B3AAB3` | Headliner in shadow | Secondary text |
| `--fg-disabled` | `#7D7480` | | Disabled only |
| `--border-field` | `#8A8290` | Trim | Control borders |
| `--border-subtle` | `#3A3340` | Seams | Hairlines, decorative |
| `--accent` | `#9EC3F0` | Ambient strip | Main action, focus, progress, the hero strip |
| `--on-accent` | `#141118` | | Label on the accent |
| `--error` / `--success` | `#FF9B8F` / `#8FD6A6` | Status | Always with words and an icon |
| `--kerb` | `#D8D5CF` | Concrete outside | `.on-light` ground |
| `--kerb-ink` / `-2` | `#141118` / `#4E4752` | | Text on the kerb |
| `--kerb-accent` | `#24508A` | Accent for daylight | Action on the kerb |

Split (P-026): about 60% cabin ground, 30% headliner text and drawings,
under 10% accent. No scene has more than one accent fill in view (the
persistent action is hidden over the hero, booking panel and ending).

Contrast (WCAG 2.x, computed 2026-11-06):

| Pair | Ratio | Result |
|---|---|---|
| fg-primary on base / elevated / field / sunk | 15.07 / 13.79 / 12.67 / 15.79 | AAA |
| fg-primary on the door edge `#2C2632` | 11.84 | AAA |
| fg-secondary on base / elevated / field / sunk | 8.30 / 7.59 / 6.97 / 8.69 | AAA / AA |
| fg-disabled on base | 4.17 | Disabled only |
| border-field on base / elevated / field | 5.05 / 4.63 / 4.25 | Non-text, 3:1 met |
| on-accent on accent / accent-hover | 10.26 / 12.54 | AAA |
| accent on base / elevated / field / sunk (focus, progress) | 10.26 / 9.39 / 8.62 / 10.74 | AAA |
| error on base / elevated / field | 9.20 / 8.42 / 7.74 | AAA |
| success on base / field | 10.98 / 9.23 | AAA |
| kerb-ink on kerb / kerb raised / kerb field | 12.77 / 14.61 / 16.58 | AAA |
| kerb-ink-2 on kerb / raised / field | 6.11 / 6.99 / 7.93 | AA |
| headliner on kerb-accent / its hover (kerb buttons) | 6.54 / 8.80 | AA |
| kerb-accent on kerb (link) | 5.54 | AA |
| kerb error / success on kerb field | 6.50 / 5.73 | AA |
| kerb border `#6E6573` on kerb field | 4.94 | Non-text |
| Name board text on the board (`#141118` / `#4E4752` on `#F3F1ED`) | 16.58 / 7.93 | AAA |
| Ending title by `difference` blend: `#141117` on kerb, `#D8D5C5` on base | 12.78 / 12.68 | AAA |
| border-subtle on base | 1.54 | Decorative only |

### Shape, space and layout

- Pills for buttons and quick starts; 8px panels; 6px fields; 4px name
  board. Hairlines carry structure; fills are rare.
- 4px spacing scale and the 4, 8 and 12-column grid kept from A (16, 40 and
  64px margins).
- One shadow, `0 18px 40px rgb(0 0 0 / .45)`, for floating things; the
  door casts its own soft shadow on the street.

### Imagery

**No photographs, no renders, no AI images.** Figma credits used: none.
B's green car renders are deleted from this branch (`public/vehicles/`).

Every vehicle is a **cabin plan** drawn in SVG by
`src/components/Vehicle.tsx` from `tiers.ts`: body outline, glass, mirrors,
the chauffeur's seat and wheel (right-hand side, UK placeholder market), a
dashed empty front seat, passenger seats in rows (saloons 3; SUV 3 + 2; van
2 + 2 + 3) and bag spaces in the boot. Lengths are roughly to scale between
tiers; seat layouts are schematic, and the alt text says so. Seats fill in
headliner white from the rear row forward as the party grows; bags fill
the same way, 40ms apart.

---

## Composition plan

### Home (P-024 order)

| # | Visitor's question | One loud thing | Composition | Ground |
|---|---|---|---|---|
| 1 | What is this, and why not just a ride app? | The door closing | Door scene (see Hero). Closed: answers left, AUREL right (desktop); answers top, AUREL bottom (phone). | Kerb, then cabin |
| 2 | Can I book now? | The booking question | Booking panel on 8 columns; beside it the city clock and a four-step preview with "Prices appear with the cars. Nothing is charged until step 4." | Cabin |
| 3 | Which car fits us? | The cabin plan | "The cabin, *from above.*" and party steppers; one large plan (7 columns, sticky) beside four tier rows, one open. | Cabin |
| 4 | What happens when I land? | Four doorways | Pinned. Four nested door frames on the right; scroll walks you through them toward the last, which is filled with kerb daylight. Left: "Four doors *to the car.*" and four steps; the current one gets an accent rule. | Footwell |
| 5 | What else can I ask for? | Four spoken requests | "Take me *there.*", "Meet me *off the plane.*", "Stay with me *this afternoon.*", "Keep the car *all day.*", stepped right 7vw a row; each row starts a booking with that service. | Cabin |
| 6 | Can my company use it? | "Booking for *someone else?*" | Question left; a booking slip right: Booked by, Travelling, Cost centre, Billed. | Kerb |
| 7 | Sign-off | "We'll be *outside.*" | Pinned. A slit of kerb light opens to 38vw as you scroll; the title crosses it and inverts where it does. Book and See the fleet. Then the footer. | Cabin, kerb slit |

### Airport transfers

Poster "Arrivals, *met.*" with the SUV cabin plan (two passengers, three
bags) and a caption; the panel preset to Airport; the timetable with the
moved row marked by an accent edge; delays and waiting; a kerb-ground close
"Landing soon?".

### Fleet

"Fleet, *from above.*", party steppers and an "N of 4 cars fit" tag; the
same plan-and-rows component as home; the comparison table.

### Booking steps, booking details, in-preparation pages

Layouts unchanged from A and B, restyled through the tokens: light step
titles in sentence case, the current progress tick in the accent, dark
fields with hairline borders, selected options inverted to headliner on
cabin, cabin plans in the vehicle step, summary, review and booking page.
The name board stays a white card (it is the real board's colour).

---

## Interaction patterns

- **Top frame:** wordmark, Menu, Book (hairline). Hides on scroll down,
  returns on scroll up. It samples the ground at both ends, so over the
  hero's split the wordmark goes dark on the kerb while Menu and Book stay
  light on the door. It re-reads after the latch, which moves the ground
  without a scroll.
- **Close the door:** a button that scrolls to the latch point.
- **Quick starts and requests:** buttons that set the service and open
  /book/journey.
- **Fleet rows:** native buttons with `aria-expanded`; the plan's caption
  is a polite live region ("2 of 5 seats, 3 of 5 bag spaces").
- **Persistent action:** accent pill, full width at the bottom on phones,
  bottom right from 900px; hidden over the hero, booking panels and ending.
- **Hover:** 180ms colour; requests shift 12px and the arrow disc fills
  with the accent and turns 45 degrees (330ms).
- **Focus:** 2px accent ring with 2px offset on dark; headliner-dark ring on
  the kerb.

## Animation direction

| What | How | Why |
|---|---|---|
| Hero door | Transform only; scroll to 86%, then a 900ms latch on `cubic-bezier(0.3, 0, 0.1, 1)` | The soft close; P-014, P-020 |
| Hero outside | Minutes tick every 1.4s (420ms rise), dots blink, toast shakes every 2.8s; all stop when the door shuts | Noise outside, quiet inside |
| Hero answers | 600ms fade and 10px rise, 110ms apart, from 500ms after the latch | Answers arrive once it is quiet |
| Hero strip | `scaleX` 0 to 1 from the right, 1.1s, 450ms delay | The light comes on |
| Four doors | One `scale()` on the frame group, 1 to 2.95 across the pinned scroll; current step swaps by quarter | Walking through to the kerb |
| Requests | Fade up 16px, 80ms apart, once in view | |
| Fleet | New plan slides in 16px (420ms); seats and bags fill 40ms apart | Shows the party fitting |
| Ending | The light slit widens with scroll (2px to 38vw) | The door opens again |
| Pages | View-transition fade up 24px (480ms) | |

**Reduced motion:** no pins. The hero is drawn shut with answers showing;
the four doors are static with every step listed; the ending slit is fully
open; no ticking, blinking or fading. Verified at 1440, 834 and 390
(`round-3/home/rm-*`), and through a full transfer booking at 390
(`round-2/flow/transfer-390-*`).

## Responsive strategy

| | 1440 | 834 | 390 |
|---|---|---|---|
| Hero | Door slides from the right over the left 44vw; noise scattered left; AUREL bottom right; answers left when shut | Door rises from below over the top 50svh; title on one line at about 100px; answers 32px | Door rises over the top 44svh; title on two lines; full-width Book in thumb reach; answers 18px |
| Booking scene | Panel 8 columns, aside 4 | Stacked | Stacked |
| Cabins | Plan 7 columns (sticky), rows 5 | Plan above rows | Plan above rows, full-width Book per tier |
| Four doors | Frames in the right 62%, copy left | Frames in the top half, copy below on a fade | Same; only the current step's sentence shows |
| Requests | Stepped 7vw per row | No step; meta under the sentence | Same |
| Ending | Slit from 46%, title crosses it | Slit from 50% | Same |

---

## Open questions for the owner

New for this concept:

1. **A, B or C?** Or C's hero with another concept's later scenes.
2. **The outside noise.** The first screen shows generic ride-booking
   problems ("Driver cancelled", "Fares are higher than usual"). No brand is
   named, but it sets AUREL against ride apps from the first second, as
   Brief §1 does. Comfortable, or should the outside be quieter (only the
   ticking minutes)?
3. **Dark theme.** Night-led, with the booking flow dark too. Keep the
   booking flow dark, or switch it to the kerb (light) for long forms?
4. **Ice blue.** The one accent. Is a cool accent right for AUREL, or
   should it come from the real fleet's interior lighting once known?
5. **Cabin plans instead of photos.** Is a drawn fleet enough for
   launch, or should the plans sit beside photographs later?
6. **The latch.** The door finishes closing on its own past the catch. Does
   that feel like care, or like the page taking over?

Still open from A and B: tier names (Business Class and First Class are
Blacklane's), launch market, pricing model, service rules, public
standards, wordmark, live tracking.

---

## Feedback log

| Date | Feedback (quoted) | Scope | Recorded as | Action |
|---|---|---|---|---|
| 2026-11-05 | Kept Time reads too quiet; REF-008 as the model for "how to make your website pop" | project | AP-004, REF-008 | Concept B |
| 2026-11-06 | "Now create one extra ordinary concept of landing page. It should be entirely unique. You can use another color theme. Also focus on Hero section it should be realy creative." | project | not yet filed | This concept |

## Visual QA log

Evidence under `.artifacts/visual/aurel-concept-hero/` (ignored by git):
`round-1/`, `round-2/`, `round-3/`, and `scripts/` (`home.mjs`: hero frames
and a viewport walk; `flow.mjs`: keyboard booking from the home hero;
`shoot.mjs`: page captures; `sheet.py`: contact sheets). Every run read the
browser console: no errors or warnings on any page or flow. Horizontal
overflow measured on every capture: 0px.

Scores 1 to 5: hierarchy / composition / type / colour / responsive, then
"is the hero extraordinary".

| Round | Page | 1440 | 834 | 390 | Hero | Issues found, then fixed |
|---|---|---|---|---|---|---|
| 1 | Home | 4/4/5/4/4 | responsive 3 | responsive 3 | 4 | Menu and Book invisible over the door (frame read one point); selected service segment invisible (light on light); floating action covering centred text on desktop; ending title didn't cross the light; mobile noise lines overlapping; tablet hero half empty; phone arrival copy under the floating action |
| 2 | Home | 5/4/5/5/4 | 4 | 4 | 5 | Answers appeared as one block; last noise line hidden behind the door on phones |
| 2 | /book (airport, 1440, keyboard) | 4/4/3/4/4 | | | | Step titles and tier names still in bold capitals from B; booking reference bold |
| 2 | /airport-transfers, /fleet, /business | 4/4/4/5/4 | 4 | 4 | | None blocking |
| 3 | Home | 5/5/5/5/4 | 4 | 4 | 5 | Open: at 390 the ending's Book button sits half on the light slit |
| 3 | Home, reduced motion | 5/4/5/5/4 | 4 | 4 | 4 | None |
| 3 | /book (hourly, 834, keyboard) | 4/4/4/5/4 | | | | None |

Keyboard runs: airport at 1440 (round 2), transfer at 390 with reduced
motion (round 2), hourly at 834 (round 3). Each starts on the home page,
Tabs to the hero's "Book a journey" (fifth stop), and completes the booking
by keyboard, including the empty-submit error summary (focus moves to it)
and a declined card. Date (on phones) and time are set with Playwright's
`fill` on the native inputs.
