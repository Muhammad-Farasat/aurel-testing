# Design direction

Owner: design-director, following `/creative-design-director` and the design
memory.

Every major decision has a reason that cites a brief section (`Brief §5`), a
reference (`REF-008`), or a preference or rejection (`P-020`, `RJ-002`).

**This branch holds concept B, "Standing By".** The first concept, "Kept
Time", is built on branch `agent/aurel-frontend-design-1104a` and its
direction document lives there. This concept was made because the owner
said Kept Time reads too quiet and pointed at REF-008 (ayzz.thedesigner) as
the model for "how to make your website pop". The two are compared at the
end of [Directions compared](#directions-compared).

Status: built for owner review, 2026-11-06. Frontend only; services are
mocks.

---

## Client and audience

Unchanged from Kept Time, summarised here so this file stands alone.

- **Client.** AUREL, a pre-booked private chauffeur service: point-to-point
  transfers, airport transfers, hourly and full-day hire, four vehicle tiers
  (Brief §1, §5, §6). It competes on a better-managed journey, not on price
  (Brief §7).
- **Audience** (Brief §4): executives booking for themselves, corporate
  buyers and assistants booking for others, frequent airport travellers,
  families and event customers, hotels and agencies.
- **Primary task.** Reserve a journey: service, journey details, vehicle,
  price, confirm (Brief §9 steps 3 and 4).
- **Personality** (Brief §10): sophisticated, confident, professional,
  elegant, dependable, understated, customer-focused.
- **Brief's dos and don'ts** (Brief §10, §7, §12): premium shown through
  service standards, not claimed; clear about price before confirmation; no
  luxury clichés, no exaggerated promises, no aggressive marketing; future
  plans are not launch commitments; every number is a placeholder until the
  owner supplies it.

**The tension this concept resolves.** The owner wants a site that pops
(AP-004). The brief wants understated (Brief §10). Standing By makes the
scale loud and keeps the voice and colour quiet: one huge car and one huge
word per screen, plain sentences, a palette taken from a dark green car on a
stone floor. Nothing shouts "luxury"; the composition does the work.

---

## Concept

**Standing By.** A chauffeur's job is mostly waiting: the car is at the kerb
before you are. So the car stands still on screen and the page changes around
it. It crosses the opening headline, the camera moves in on the rear seat
with small labels pinned to it, then pulls back while the first standard
("There first.") takes the stage. Every colour on the site comes from that
one car and the studio floor it stands on. Below it, each section answers
the next question a visitor has, each with one loud thing: the booking
question, one expanded car with a big index numeral, one moved pickup time,
four service words, one question for businesses, and the wordmark with the
car parked across it.

### Signature devices

1. **The car that stays.** One vehicle element through the first three
   scenes, moved only by transform (P-020). It crosses the type in the hero
   (P-019), zooms to the rear door for detail, then pulls back with spec
   pills around it (P-023). The same device closes the page: the car parked
   across the AUREL wordmark (P-009).
2. **One expanded band.** The fleet is four colour bands; one is open, with
   the car crossing a big index numeral 01 to 04 and arrows to step through
   (P-022). Each band's ground is a tint taken from the car (P-021).
3. **Pinned pills.** Small rounded labels stuck to big things: spec pills on
   the car, tag pills on the service words, the moved time as a pill pair on
   the airport timetable (P-023).

### What changed from Kept Time

| | Kept Time | Standing By |
|---|---|---|
| Hero subject | The booking question set as the headline | The car, crossing a split headline |
| First scene | The booking panel | The car and four quick-start pills; the panel is the second scene |
| Display type | Archivo Expanded, sentence case | Barlow Condensed, capitals |
| Colour | Paper, ink, one amber accent | Car paint green, studio stone, chrome, leather, tail-lamp red as the only signal |
| Shape | Square, radius 0 | Pills and soft panels |
| Navigation | No bar; wordmark, Sign in, Index | Small pill bar: three links, Menu, Book |
| Story motion | Scroll scrubs a clock; grounds follow the hour | Scroll moves the car: cross, zoom, pull back |
| Fleet | Four elevation line drawings to scale | Four studio renders, one expanded band |
| Imagery | Type and line drawings, no cars | Placeholder car renders carry the concept |
| Signature | Name board, journey rule | The car that stays, the expanded band, pinned pills |

Kept from Kept Time: the sitemap, every journey, the whole booking flow and
its rules, the booking-details states, the name board as a functional
airport feature, all copy that was already concrete, and every service,
config and data file.

---

## Design memory applied

Memory read on 2026-11-05 from
`C:/Users/Muhammad Farasat/Documents/design-memory`: MY-DESIGN-PREFERENCES.md
(including "What makes a design pop"), the topic files it points to,
approved-and-rejected-designs.md, REF-008's README and the images listed under
References, and the REF-001 to REF-003 entries. REF-004 to REF-007 are the
chauffeur category scan and carry no taste; they are used for what to avoid.

Rule used throughout: the client's brief beats owner preferences, and owner
rejections beat my defaults. The memory's own carve-out holds: booking steps
keep the type, colour and hover craft but drop the pinned story.

| ID | Preference or rejection | Decision | Reason |
|---|---|---|---|
| P-006 (strong) | Chaptered, pinned story | **adapts** | Only the first three scenes pin (one car, three moments, about 3.3 viewports). The rest of the home page is unpinned scenes with their own compositions. Booking, booking details and the account area have no story. |
| P-014 (strong) | Scroll drives the story; motion explains the product | **applies** | Scroll moves the car: in to the rear seat (what you sit in), out to the standards (what surrounds the ride). The motion is the product tour. |
| P-018 (strong) | Serif only by intent, rarely | **applies** | No serif. Owner default for this concept. |
| P-001 | One display face, one text face | **applies** | Barlow Condensed and Barlow, one superfamily. |
| P-002 | Extreme scale jump | **applies** | Poster type at 15 to 30vw against 16px text and 13px labels. Booking steps keep a middle step for titles (memory carve-out). |
| P-003 | Display leading at or below 0.9 | **applies** | 0.78 to 0.9. |
| P-004 (candidate) | Uppercase display for loud brands | **adapts** | Capitals for display, because condensed capitals give the poster scale REF-008 relies on. The voice stays plain and the palette quiet, so it reads confident, not loud (Brief §10). Text stays sentence case. |
| P-005 (candidate) | Staircase line offsets | **adapts** | The hero splits one line corner to corner ("TRAVEL," top left, "CONSIDERED." bottom right) around the car, the diagonal version REF-008 shows (p03, p14). |
| P-007 | One message per viewport | **applies** | Each scene has one loud thing (see Composition plan). Task screens are exempt. |
| P-008 (candidate) | Ground colour per chapter | **applies** | Stone, chrome (detail zoom), paint green (airport), leather (business), stone (ending). Fleet bands carry their own grounds. |
| P-009 (candidate) | A designed ending | **applies** | The AUREL wordmark at 33vw in leather brown with the car parked across it, then one Book action. |
| P-010 | No conventional nav bar | **adapts, open** | A small pill bar: three links (Airports, Fleet, Business), Menu, Book. Most REF-008 website concepts keep one (p05, p10, p11, p14). It's the open tension the memory names; owner default given for this concept. The bar hides on scroll down and the menu is a full-screen sheet. |
| P-011 | Quiet interface, loud content colour | **applies** | Interface is paint and stone. The car and the chapter grounds carry colour. |
| P-012 | Made-for-the-brand imagery | **adapts** | AI-generated placeholder renders of generic cars in AUREL's paint (see Imagery), until the fleet is shot. |
| P-013 | Hover 150 to 330ms | **applies** | 180ms colour, 330ms word shift on the service rows. |
| P-015 | Type that reveals itself | **adapts** | Text never scrubs. Frames swap with a 420 to 520ms fade, and pills arrive staggered by 70ms. |
| P-016 | Strong ease-out | **applies** | Same two curves as Kept Time (ease-out-quint, ease-out-expo). |
| P-017 | Display face belongs to the business | **applies** | Barlow was drawn from road signs and number plates (California public infrastructure). AUREL is a road business; the face is the lettering of the street the car waits on. |
| P-019 (candidate) | The subject breaks the type | **applies** | Car across "TRAVEL, / CONSIDERED.", across the fleet numeral, across "ARRIVALS", across the ending wordmark. The name board crosses the airport time "07:53". |
| P-020 (candidate) | Hero object stays across scenes | **applies** | One car element for scenes 1 to 3; only its transform changes. |
| P-021 (candidate) | Colour from the product | **applies** | Every token is sampled from or tinted from the car render: paint #17241F, studio floor #E5DFD4, chrome, cabin leather, tail lamp. |
| P-022 (candidate) | One expanded item, not equal cards | **applies** | Fleet bands on home and /fleet; the vehicle step's selected tier also expands with its own ground. |
| P-023 (candidate) | Small labels on big things | **applies** | Spec pills on the zoomed car, note pills around the pulled-back car, tag pills on the service words, timeline pills on the airport chapter. |
| P-024 (candidate) | Section order follows the visitor's questions | **applies** | What is this, can I book, which car, what happens at the airport, what else, can my company use it, sign-off. Order is the home page order. |
| P-025 (candidate) | Entrance resolves from distortion | **doesn't apply** | One post only, and a distortion effect on a car photo would read as a gimmick for an understated brand (Brief §10). |
| REF-008 p05 | Quiet text still passes contrast | **applies** | Every text pair is checked below; the quietest text colour on a light ground is 5.10:1. |
| Theme | "Both", no default | **decided: light, with dark and leather chapters** | The car is dark green; it reads best on a light stone floor, as it was lit. Booking forms stay light (Brief §9). Dark is used for the airport chapter and the menu, where there is no car to lose. |
| Button shape | "Depends on overall website" | **decided: pill** | Round like the tyre and the wheel hub; the primary button ends in a round "hub" holding the arrow. Pills also carry the REF-008 label language. Kept Time chose square partly to differ from Blacklane's pills (REF-004); here the pill is paired with condensed capitals and a dark green fill, which Blacklane doesn't use, so the shape alone doesn't make it look like Blacklane. |
| RJ-001 to RJ-008 | General rejections | **applies, all** | Checked one by one below. |

### Rejections checked and avoided

- [x] **RJ-001 Centered hero on a gradient.** The hero is a flat stone floor
      with a split, corner-to-corner headline and a car across it. Nothing is
      centred and there is no gradient.
- [x] **RJ-002 Rows of identical feature cards.** Fleet: one expanded band,
      three collapsed. Services: four big words, not cards. Vehicle step:
      rows, the chosen one expanded with its own ground.
- [x] **RJ-003 Icon grids.** None. Functional icons only inside controls.
- [x] **RJ-004 Stock photography.** None. The car renders are generated for
      AUREL in one paint, angle and light, with no people, and labelled as
      placeholders.
- [x] **RJ-005 Logo strips.** None.
- [x] **RJ-006 Every section on one template.** Each scene has its own
      composition (see Composition plan); no two consecutive scenes share a
      layout or ground.
- [x] **RJ-007 Colour spread evenly.** One interface colour (paint) plus one
      signal (tail-lamp red, used only for the live dot and the "now" marker).
      Chapter grounds change one section at a time.
- [x] **RJ-008 Default serif.** No serif.

### Category clichés checked (REF-004 to REF-007)

- [x] Chauffeur-and-black-car photo hero with a dark overlay: not used. The
      car is green, on a light floor, with no chauffeur, no overlay and no
      city.
- [x] Booking bar docked on a photo hero: not used. Four quick-start pills
      in the hero; the full panel is its own scene.
- [x] Abstract promise headlines ("Your chauffeur awaits"): not used. The
      headlines are the brand's own tagline, a standard ("There first."), a
      time, and plain questions.
- [x] Serif as luxury, navy, black and gold, black and yellow: not used.
- [x] Logo strip, Trustpilot badge, stat row: not used.
- [x] "Download the app" close: not used.
- [x] Hand-off to a different-looking booking app: the same panel and system
      on home, service pages and /book.

---

## References

Research limits: no new gallery browsing in this pass. REF-008 was filed by
the design-researcher on 2026-11-05 from reel frames, so nothing about its
motion timing is measured. I read REF-008's README in full and looked at
these images myself: `p11-DDHfjS_AB8l-frames-a.jpg`,
`p11-DDHfjS_AB8l-crop-c-transition.jpg`, `p07-DdB_MI1iSCa-frames-b-final.jpg`,
`p14-Dd1ym5LKbOJ-frames-b.jpg`, `p10-DeH-dYUgpHB-slide7.png`,
`p03-DeUeBaQiYEl-frames-b.jpg`, `p02-DehfGFNituy-frames-a.jpg`,
`p05-DeEsRh5nQQf-frames-b.jpg`, `p13-DfGx1ouiXWa-frames.jpg`.

| ID | What I took | What I did not copy |
|---|---|---|
| REF-008 p11 | The object stays while the page changes; zoom to detail, pull back with annotation pills | The shoe, orbit ring, swoosh, colourway sequence, "Quality that speaks." |
| REF-008 p03, p14 | Headline split corner to corner around the subject; subject in front of the type | "TAPE / CURE", "RIDE / DIE", the red, the italic |
| REF-008 p07 | One expanded band, collapsed siblings, big index numeral, arrows | Its purple/blue/yellow/orange bands, circle photo, flower motif |
| REF-008 p10 | Tag pills stuck on headline words; one hue with pale tints of itself; small pill top bar | Two26's orange, "Aa" face, characters, copy |
| REF-008 p13 | A palette drawn from one object | The fruit palettes |
| REF-008 p02 | One product, plain floor, generous empty space | The suitcase and poster copy |
| REF-008 p05 | Check contrast on the quiet text | The pizza site |
| REF-001 to 003 | Chaptered scenes, frame that stays, designed ending, one signal colour | Their faces, colours, motifs |
| REF-004 to 007 | What the category does, so AUREL can avoid it; booking patterns (kept from Kept Time) | Every identity element |

---

## Directions compared

Kept Time is direction A and is built on its own branch. For this pass I
developed three new candidates that answer "make it pop", then compared the
winner with Kept Time.

### B1. Standing By (chosen, built here)

Described above. The car stays; the page changes around it.

### B2. Kerbside Signs

- **Concept.** The site as street signage: every section is a giant road
  sign in condensed capitals (arrival bays, pickup points), with the booking
  panel as a sign you fill in.
- **Type.** Barlow Condensed throughout. **Colour.** Sign green and white.
- **Layout.** Full-bleed sign panels with arrows.
- **Motion.** Signs flip like a departures board.
- **Why not.** Pops, but it's a costume: it looks like infrastructure, not a
  premium service, and green-and-white signage is public transport's
  language. No hero object, so P-019 to P-023 don't land.

### B3. Colourway

- **Concept.** p11 taken literally: the car on a full-colour ground that
  changes per tier (deep red, ochre, teal, plum) as you scroll.
- **Type.** A heavy grotesk. **Colour.** One saturated ground per tier.
- **Why not.** Loudest of the three, but saturated colour per tier is the
  "colour spread evenly" problem (RJ-007) and reads as consumer retail, not
  understated (Brief §10). Standing By keeps the idea (a ground per tier)
  with tints taken from the car.

### Scores (1 to 5)

| Criterion | A. Kept Time (other branch) | B1. Standing By | B2. Kerbside Signs | B3. Colourway |
|---|---|---|---|---|
| Fit with audience and brand | 5 | 4: confident and still plain-spoken; capitals and scale are louder than the brief's "understated" | 2 | 2 |
| Brief requirements, accessibility, primary task | 5: booking is the first scene | 4: booking one click from the hero (four quick starts, Book in the bar) and the second scene | 3 | 3 |
| Owner's applicable preferences, including REF-008 "pop" | 3: quiet; few REF-008 rules apply | 5: P-019 to P-024 all applied, plus P-006, P-009, P-014 | 3 | 4 |
| Distinctiveness (category and past work) | 5 | 4: no chauffeur site uses a single car as a moving object across a split headline; a car photo is still the category's subject | 4 | 3 |
| Buildable in stack and time | 4 | 4: needs one scroll stage and placeholder renders, both built | 4 | 3 |
| **Total** | **22** | **21** | **16** | **15** |

Kept Time's score here is re-scored against the owner's new feedback ("too
quiet"), so its preference score drops from 4 to 3 compared with its own
document.

**Recommendation.** The two concepts score within a point, for opposite
reasons. Kept Time fits the brief's "understated" more closely; Standing By
is the one that pops the way the owner asked. Given the owner's direct
feedback, I'd take Standing By forward, and borrow two things back from Kept
Time if the owner wants it calmer: the booking question as the first scene
(swap scenes 1 and 4), and sentence-case display.

---

## Website structure, journeys and booking flow

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

Implemented in `apps/aurel-web/src/styles/tokens.css` and `base.css`. Token
names from Kept Time are kept so the booking components carry over; their
values and roles are this concept's.

### Typography

**Display: Barlow Condensed** 600 and 700, capitals, leading 0.78 to 0.9.
**Text: Barlow** 400, 500 and 600. Both by Jeremy Tribby, SIL Open Font
License, self-hosted through `@fontsource/barlow` and
`@fontsource/barlow-condensed` 5.3.0. Barlow is drawn from California's
public infrastructure: highway signs and licence plates. AUREL's car waits
at a kerb under those signs; the face is that street's lettering (P-017).
Condensed widths let one word fill the screen at poster size, which is
the scale REF-008's posters use (P-002).

Rejected: Archivo Expanded (Kept Time's face; this concept must be
different), Anton and Oswald (common poster defaults), Bebas Neue (generic,
caps only, no text weights), any serif (RJ-008, P-018), Geist, abcFavorit,
Steagal (competitors' faces, REF-004 to REF-006).

| Token | Family | 390 | 1440 | Leading | Use |
|---|---|---|---|---|---|
| `--type-poster` | Condensed 700 caps | 68px | 240px | 0.82 | Hero lines, FLEET, ARRIVALS, the ending wordmark (larger, own clamp) |
| `--type-display` | Condensed 700 caps | 52px | 144px | 0.86 | Section statements: FOUR CARS, THERE FIRST, BOOKING FOR SOMEONE ELSE? |
| `--type-title` | Condensed 700 caps | 36px | 80px | 0.9 | Booking question in the panel, Q&A title |
| `--type-input-xl` | Condensed 600 | 21px (phone) to 24px | 36px | 1.1 | The panel's first field |
| step title | Condensed 700 caps | 36px | 56px | 0.9 | Booking step titles |
| `--type-step` | Barlow 600 | 22px | 28px | 1.2 | Sub-titles in steps and cards |
| `--type-body` | Barlow 400 | 16px | 16px | 1.55 | All reading text and inputs |
| `--type-small` | Barlow 400 | 14px | 14px | 1.45 | Helpers, pills, captions |
| `--type-label` | Barlow 600 caps | 13px | 13px | 1.3 | Field labels and corner labels, tracking 0.06em |

Tabular figures on every time, date, price and reference.

### Colour tokens

Every value is taken from the car render or the floor it was lit on
(P-021): paint sampled at #19241F to #1B2521 on the body, floor #DFD9CD,
tail lamp #391210 in shadow.

| Token | Value | Source | Use |
|---|---|---|---|
| `--color-paper` (stone) | `#E5DFD4` | Studio floor | Page ground |
| `--color-paper-raised` | `#F2EEE7` | Floor, lit | Panels, menus, pills |
| `--color-chrome` | `#D6D8D2` | Window trim | Zoom scene ground, First Class band, Q&A, car card |
| `--color-tan` | `#D9C3A6` | Cabin leather, pale | Luxury SUV band |
| `--color-sage` | `#C7CFC4` | Paint, tinted | Luxury Van band |
| `--color-leather` | `#B8875A` | Cabin leather | Business chapter ground |
| `--color-leather-deep` | `#8B5B34` | Leather in shadow | Ending wordmark (large text only) |
| `--color-ink` / `--color-night` / `--color-aurel` | `#17241F` | Paint | Text, primary action fill, dark chapters, menu, footer |
| `--color-aurel-hover` | `#2A3A33` | Paint highlight | Hover on paint fills |
| `--color-ink-2` | `#424E48` | Paint, lifted | Secondary text |
| `--color-ink-3` | `#6C7771` | Glass | Disabled text only |
| `--color-field` | `#6C7771` | Glass | Input borders at rest |
| `--color-rule` | `#C9C2B5` | Floor shadow | Hairlines, decorative only |
| `--color-on-dark` / `-2` | `#E5DFD4` / `#A9B3AD` | Floor, chrome | Text on paint |
| `--color-lamp` / `-on-dark` | `#9B2C22` / `#F08A7E` | Tail lamp | The only signal: live dot, "now" marker, current step |
| `--color-error` | `#A3271C` | Status | Errors, always with icon and words |
| `--color-success` | `#2E6A3F` | Status | Confirmed states |

Contrast (WCAG 2.x, computed 2026-11-05):

| Pair | Ratio | Result |
|---|---|---|
| ink on stone / raised / chrome / tan / sage | 12.10 / 13.88 / 11.17 / 9.40 / 10.05 | AAA |
| ink on leather (business chapter) | 5.08 | AA |
| ink-2 on stone / raised / chrome / tan / sage | 6.56 / 7.52 / 6.05 / 5.10 / 5.45 | AA |
| ink-2 on input fill `#FBF9F6` | 8.27 | AAA |
| field on stone / raised / input | 3.51 / 4.02 / 4.43 | AA non-text |
| on-dark on paint / on-dark-2 on paint | 12.10 / 7.44 | AAA |
| raised label on paint button | 13.88 | AAA |
| lamp on stone / raised | 5.70 / 6.54 | AA |
| lamp-on-dark on paint | 6.60 | AA |
| error on stone / raised / input | 5.53 / 6.34 / 6.98 | AA |
| success on raised | 5.59 | AA |
| leather-deep on stone (wordmark, 128px and up) | 4.35 | AA large text |
| rule on stone | 1.33 | Decorative only |

No text on leather uses ink-2; pills on leather use a raised fill (10.6:1).

### Shape, space and layout

- Radius: pills (999px) for buttons, labels, segment tracks and the menu
  button; 20px panels; 12px fields and dropdowns; round stepper and arrow
  buttons. The primary button ends in a round "hub" holding the arrow.
- Spacing scale and the 4, 8 and 12-column grid are unchanged from Kept
  Time (4px base; 16, 40 and 64px margins).
- Elevation: one shadow, `0 10px 30px rgb(23 36 31 / .16)`, for the
  persistent action, menus and pills over the car.

### Imagery

**Used now: AI-generated placeholder renders.** Four side views, one per
tier (saloon, long-wheelbase saloon, large SUV, seven-seat van), made with
Figma's `generate_image` (model gpt-image-2.5-flare) on 2026-11-05 in the
file "AUREL vehicle placeholders (AI-generated)". Same prompt frame for all
four: exact side profile facing left, camera at wheel height, deep bottle
green metallic paint, dark tinted glass, no badges, no plates, no people,
on a flat stone floor lit by a large softbox. They were cut out with a
small script that keeps the floor shadow as soft alpha, and saved as
transparent WebP at native width (about 1400px) and 800px, 30 to 75KB each,
in `apps/aurel-web/public/vehicles/`.

Why: the concept needs the car to carry the page, and line drawings or CSS
cars could not hold a full-screen zoom. Option (a) in the brief was
available, so I used it.

How they are labelled: `src/components/Vehicle.tsx` header comment, a
`data-placeholder="ai-generated"` attribute on every image, alt text ending
"Placeholder image." where the image is not decorative, captions on the zoom
scene and fleet bands, and the fleet note "Pictures are placeholders until
the fleet is photographed."

Limits to tell the owner: the shapes resemble real models (an S-Class-like
saloon, a V-Class-like van) even without badges; the green paint is a
proposal for a fleet colour, not a known fact; renders must be replaced by
photography before launch. The "or similar" model names in `tiers.ts` are
still placeholders.

**Future shoot** (replaces the renders, same layout): each tier side-on at
wheel height, lens and height matched across all four, on a stone-coloured
floor or seamless, soft overhead light, the fleet's real paint. Then the
Kept Time shot list for chauffeurs and arrivals.

**Never:** stock photos (RJ-004), chauffeur-opening-the-door poses, cars
blurred past hotels, skyline at dusk, people in renders.

---

## Composition plan

### Home (P-024 order)

| # | Visitor's question | One loud thing | Composition | Ground |
|---|---|---|---|---|
| 1 | What is this? | The car across "TRAVEL, / CONSIDERED." | Split headline corner to corner; car crosses the second line. Top right: one sentence and four quick-start pills (Transfer, Airport, Hourly, Full day, each with a tag). Corner labels: "Pre-booked private chauffeurs", city clock with the lamp dot. | Stone |
| 2 | What's it like inside? | The rear door and wheel at 2.35x | Car zooms to the rear seat; four spec pills pinned right (from `tiers.ts`); chapter label "01 / Where you sit"; placeholder caption. | Chrome |
| 3 | Will they be there? | "THERE FIRST." | Car pulls back to the left at 0.6x; four note pills bottom right; one sentence and a link bottom left. | Stone |
| 4 | Can I book now? | The booking question | The booking panel on a raised card, columns 1 to 8; city clock and facts on 10 to 12. | Stone, raised card |
| 5 | Which car? | One car across its big numeral | "FOUR CARS. / PICK BY WHAT YOU CARRY." then four bands, one open. | Stone, band grounds |
| 6 | What happens at the airport? | "07:53" | Struck "08:05" above a huge "07:53"; the name board crosses the time; timeline pills and a link. | Paint |
| 7 | What else can I book? | Four service words | TRANSFER, AIRPORT, HOURLY, FULL DAY at display size with tilted tag pills; each row starts a booking with that service. | Stone |
| 8 | Can my company use it? | "BOOKING FOR SOMEONE ELSE?" | Question left, three pills and a link right. | Leather |
| 9 | Sign-off | AUREL wordmark | Wordmark at 33vw in leather brown, the saloon parked across it, Book and Fleet. Then the footer. | Stone, then paint |

### Airport transfers

| Section | Composition |
|---|---|
| Poster | "ARRIVALS" at poster size; the SUV (room for bags) crosses the word's foot; the name board pinned at the car's front, tilted; one sentence, three pills, Book. |
| Booking | The panel preset to Airport. |
| Timetable | "LANDING TO DOOR." then seven rounded rows; the "landed early" row is paint with the moved time as a struck pill and a filled pill. |
| Delays and waiting | Four questions in two columns on chrome; a note on what the board can show. |
| Close | "LANDING SOON?" on paint, Book and Help. |

### Fleet

| Section | Composition |
|---|---|
| Head | "FLEET" at 28vw; beside it one sentence, the passengers and bags steppers, and an "N of 4 cars fit" pill. |
| Bands | The four bands with the party applied: cars that can't take it are struck out, their Book button disabled with the reason written; the first car that fits opens. |
| Compare | The full table on raised ground. |

### Booking steps, booking details, in-preparation pages

Same layouts as Kept Time (see Booking flow), restyled: condensed step
titles, pill segment tracks, soft fields, rows with the selected vehicle
expanded on its tier ground, the running summary on a raised card with the
car on chrome, the reference at up to 176px on the booking page, the car card
on chrome. In-preparation pages get a paint "In preparation" pill and the
title at display size.

---

## Interaction patterns

Changes from Kept Time only; everything else in Booking flow holds.

- **Top bar:** wordmark, three pill links with the current page filled,
  Menu, Book. Hides on scroll down, returns on scroll up, flips colours over
  dark grounds. Below 834px the three links move into the menu.
- **Menu:** full-screen sheet on paint, condensed link labels, focus goes to
  the first link, Esc and Close return focus to Menu (verified by keyboard).
- **Quick starts (hero) and service rows:** buttons that set the service in
  the draft and open /book/journey.
- **Fleet bands:** each band head is a button with `aria-expanded` and
  `aria-controls`; arrows move to the previous or next car and move focus to
  its head.
- **Hover:** 180ms colour; service words shift 16px right and the arrow
  disc fills and turns 45 degrees (330ms); primary arrow hub nudges 4px.
  Every hover has a visible rest state (filled pill, border, underline).
- **Focus:** 2px ring, 2px offset, paint on light and stone on dark,
  instant.
- **Booking panel:** the first field is a large pill input in the display
  face; the panel no longer sits inside a name board.

## Animation direction

| What | How | Why |
|---|---|---|
| Hero car | Scroll-linked transform only (translate and scale), eased with a cubic out per segment: hold to 15%, zoom 15 to 42%, hold, pull back 56 to 80% | P-014, P-020; the reader sets the pace; no scroll hijack |
| Hero frames | Phase swaps (A under 14%, B to 60%, C after), 420ms out and 520ms in with a 120ms delay; pills staggered 70ms | Text reads at once, never mid-scrub |
| Hero ground | Stone to chrome in the zoom, 700ms | Marks the close-up |
| Fleet band | Panel fades up 12px (420ms); numeral rolls up 40% (560ms); car slides in 8% (640ms) | The p07 rolling index, in AUREL's terms |
| Airport chapter | Name board settles from 24px below and rotates into place when 35% in view | One entrance, once |
| Timetable | Rows fade up, staggered 60ms; moved time drops in after 700ms | Shows the moved pickup |
| Menu | Clip-path reveal from the top (420ms) | |
| Booking steps | Unchanged from Kept Time | |

**Reduced motion:** the hero does not pin; frame A shows statically with the
car in place; frames B and C are not shown (their facts appear in the fleet
bands and the airport chapter). No band, numeral, car, board or row
animations; step change becomes a 120ms fade. Verified at 1440 and 390 and
through a full airport booking at 390 with `prefers-reduced-motion: reduce`.

## Responsive strategy

| | 1440 | 834 | 390 |
|---|---|---|---|
| Hero | Split headline corner to corner; car centred across line two; quick starts top right | Lines stacked left; car 118vw cropped off the right edge between them; quick starts at the bottom | Same as 834 with the car at 170vw |
| Zoom and pull-back | Car at 2.35x, pills right; pull-back left at 0.6x | Car 1.6x; pills and text at the bottom | Same |
| Top bar | Wordmark, three pills, Menu, Book | Same | Wordmark, Menu, Book |
| Fleet bands | Car and numeral on 8 columns, info on 4 | Stacked | Stacked; car 118% wide, capacity hidden in the head |
| Airport poster | Car under the word, board at its front | Same | Car overlaps less; board at its foot |
| Booking | Unchanged from Kept Time (sticky summary at 1440, bottom bar below 1100) | | |

Touch targets are 48px or more except the 40px pill links in the top bar
(each has 8px or more of space around it).

---

## Open questions for the owner

New for this concept:

1. **Standing By or Kept Time?** Or Standing By with Kept Time's calmer
   opening (booking question first, sentence-case display)?
2. **Top bar.** This concept uses a small pill bar (three links, Menu,
   Book). Your earlier answer was "website doesn't need one" (P-010). Keep
   the bar, or go back to wordmark, Menu and one floating Book?
3. **Capitals.** Display type is in capitals for poster scale. Too loud for
   AUREL, or right?
4. **Theme and colour.** Light stone with paint-green and leather chapters,
   colours taken from a dark green car. Is a green fleet plausible, or should
   the palette follow the real fleet colour once known?
5. **Buttons.** Pills with a round arrow hub. Keep?
6. **Imagery.** The cars are AI-generated placeholders. Approve them for
   review builds only, and is a fleet shoot planned (side-on, matched
   angle, stone floor)?

Still open from Kept Time (unchanged): tier names (Business Class and First
Class are Blacklane's names), launch market, fonts budget (now moot unless a
licensed face is wanted; Barlow is free), pricing model, service rules,
public standards, guest booking and business sign-up, wordmark, live
tracking.

---

## Feedback log

| Date | Feedback (quoted) | Scope | Recorded as | Action |
|---|---|---|---|---|
| 2026-11-05 | Kept Time reads too quiet; REF-008 as the model for "how to make your website pop" | project | AP-004, REF-008 (already filed) | This concept |
