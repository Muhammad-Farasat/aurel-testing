# Design direction

Owner: design-director, following `/creative-design-director` and the design
memory. Skip this file for projects without a UI and note that in
DECISIONS.md.

Every major decision has a reason that cites a requirement (`R-001`), a
reference (`REF-001`), or a preference or rejection (`P-001`, `RJ-001`).

Scope for this pass: frontend design strategy only. No code, no backend, no
prototypes. REQUIREMENTS.md and RESEARCH.md are still empty templates, so
decisions cite brief sections (`Brief §5` and so on) in place of requirement
IDs. When requirements are numbered, the requirements-analyst should map them
back to the sections below.

Status: draft for owner review, 2026-11-05.

---

## Client and audience

- **Client identity.** AUREL is a pre-booked private chauffeur service:
  point-to-point transfers, airport transfers, hourly hire and full-day hire,
  across four vehicle tiers (Brief §1, §5, §6). It competes on a better-managed
  journey, not on price (Brief §7). It wants to be seen as sophisticated,
  confident, professional, elegant, dependable, understated and
  customer-focused (Brief §10).
- **Audience** (Brief §4):
  - Executive individuals booking for themselves, often on a phone between
    meetings or in a desk session the day before.
  - Corporate buyers (executive assistants, travel managers) booking for other
    people, mostly on desktop during office hours, who care about billing,
    duty of care and repeat bookings.
  - Frequent travellers whose main use is the airport run, booking on a phone,
    often the night before or at the departure gate.
  - Affluent individuals, families and event customers booking less often,
    with more passengers and luggage, and more need for reassurance.
  - Hotels, travel agencies and hospitality providers booking for guests,
    on desktop, often several journeys at a time.
- **Primary task.** Reserve a journey: choose a service, enter journey details,
  choose a vehicle, see the price, confirm (Brief §9 steps 3 and 4). Second
  tasks: check and change a booking (Prepare), see the chauffeur and vehicle
  before the trip, open a business account.
- **Brand traits from the brief.** Reliability, comfort, professionalism,
  convenience, personalisation (Brief §3). Personality: sophisticated,
  confident, professional, elegant, dependable, understated, customer-focused
  (Brief §10). Tagline: "AUREL. Travel, Considered." Philosophy: "The journey
  should feel as carefully considered as the destination." (Brief §1)
- **Brief's explicit dos and don'ts** (Brief §10, §7, §12):
  - Do communicate premium quality through service standards, not by claiming
    to be luxurious.
  - Do speak with confidence and clarity.
  - Do make pricing and what is being booked clear before confirmation
    ("Transparent Reservations", Brief §7).
  - Don't use luxury clichés, exaggerated promises, aggressive marketing, or
    language that makes the company sound inaccessible.
  - Don't present future opportunities (Brief §11) as launch commitments.
  - Launch market, fleet ownership, pricing and policies are not final
    (Brief §12), so every number on the site is a placeholder until the owner
    supplies it.

---

## Design memory applied

Memory read on 2026-11-05 from
`C:/Users/Muhammad Farasat/Documents/design-memory`, commit `4304fca`.

Owner taste comes from REF-001, REF-002, REF-003 and the owner's answers on
2026-11-04. REF-004 to REF-007 are a category scan for this project and carry
no taste evidence. They are used only for what to avoid and for booking
patterns.

The rule used throughout: client requirements beat owner preferences, and
owner rejections beat my defaults. The memory's own carve-out applies here:
"Task-first screens (booking steps, checkout, search results, dashboards)
keep the type, color and hover craft but drop the pinned scroll story."

| ID | Preference or rejection | Decision | Reason |
|---|---|---|---|
| P-006 (strong) | Chaptered, pinned scroll story by default | **adapts** | The home page and service pages keep a chaptered story, but it starts *after* the booking scene, never before it. Booking is the primary task (Brief §9), so the first scene is the booking itself. `/book`, booking details and the account area have no pinned story (memory carve-out). |
| P-014 (strong) | Scroll drives the story, and motion explains the product | **applies** | The story's motion demonstrates service standards, which is exactly what the brief asks for (Brief §10). Chapter 01 scrubs an airport pickup minute by minute: the flight lands early and the pickup moves with it. Motion explains flight tracking; no copy has to claim it. |
| P-018 (strong) | Serif display only by intent, and rarely | **applies** | No serif anywhere. The category already owns the luxury serif (REF-004 PP Fragment, REF-007 Cormorant), so a serif would also make AUREL look like its competitors. |
| P-001 | One display face, one quiet text face | **applies** | One superfamily used in two widths: Extended for display, Standard width for text. Width, not a second family, separates statement from information (same split-in-one-family idea REF-003 shows). |
| P-002 | Extreme scale jump, no middle sizes | **adapts** | Kept on story scenes (display about 8vw against 16px body). Dropped on booking, account and legal screens, where a middle step (22 to 48px) is needed for step titles and the oversized input. The memory lists booking steps as an exception. Sizes are smaller than REF-002's 16vw because the brand is understated (Brief §10). |
| P-003 | Display leading at or below 0.9 | **applies** | 0.9 on display sizes, slight negative tracking. Extended letters make tight leading read as one calm block. |
| P-017 | The display face belongs to the business | **applies** | Display face chosen for its transport-signage character and its match to the arrivals name board, the one object every airport customer sees (Brief §5B meet-and-greet). See Typography. |
| P-007 | One message per viewport | **applies on story scenes, not on task screens** | Story scenes each carry one idea. The memory excludes comparison tables and forms, so the tier comparison and booking steps are dense on purpose. |
| P-010 | No conventional nav bar | **adapts** | No link bar. Wordmark top left; "Sign in" and "Index" top right; one persistent booking action at the bottom. The Index is a full-screen page index, so corporate, fleet, services and account stay one click away (Brief §4 corporate buyers). The account area keeps a side index, because the memory says P-010 doesn't apply to app interfaces. |
| P-011 | Quiet interface color, one signal accent | **applies** | Paper and ink, plus one accent (Aurel amber) for the commit action and the "now" marker on timelines. Story chapters change ground by time of day (see P-008), which is ground color, not interface color. |
| P-012 | Made-for-the-brand imagery | **adapts** | AUREL has no photography yet (Brief §12: fleet not final). Launch imagery is type, technical elevation drawings of the four tiers, live route and timeline graphics, and a small set of rendered objects. A commissioned shoot follows (shot list below). RJ-004's own fallback says: fewer images, stronger type. |
| P-013 | Hover feedback in 150 to 330ms | **applies** | 160ms hover, 90ms press, instant focus ring. |
| P-015 | Type that reveals itself | **applies, limited** | Only the timestamps in Chapter 01 and the ending line reveal on scroll. Booking labels and prices never animate their text: they must read at once. |
| P-016 | Strong ease-out curves | **applies** | Two curves only: `--ease-out` cubic-bezier(0.22, 1, 0.36, 1) for UI and reveals, `--ease-scene` cubic-bezier(0.16, 1, 0.3, 1) for scene and ground transitions. Both are standard named curves (ease-out-quint and ease-out-expo), not copied signatures. |
| P-004 (tentative) | Uppercase display for loud brands | **doesn't apply** | AUREL is understated (Brief §10). Display is sentence case. Uppercase is kept for the wordmark and the name board, where real arrivals boards use it. |
| P-005 (tentative) | Staircase line offsets | **doesn't apply** | It's REF-001 and REF-003's rhythm device. The timeline's tabular alignment is AUREL's rhythm instead. |
| P-008 (tentative) | Ground color marks each chapter | **adapts** | Grounds change by time of day across the story (dawn, day, dusk, night). The change carries meaning: AUREL runs at any hour. |
| P-009 (tentative) | A designed ending | **applies** | The home page ends on a night ground with the wordmark, the tagline and the booking question repeated. Not "download the app" (category cliché). |
| Theme | No default ("Both") | **decided: light** | Booking happens on paper-light grounds; dark is used only for story chapters set at night. Reasons: (1) dark plus a black car is the category's default luxury signal (REF-006 black, REF-005 photos of black cars), (2) corporate buyers and assistants work in daytime office settings, (3) long forms and price breakdowns read better on light grounds, (4) the time-of-day story needs a light baseline so dusk and night chapters stand out. |
| Button shape | No default ("Depends on overall website") | **decided: square, radius 0** | AUREL's objects are rectangles: the arrivals name board, the itinerary sheet, the receipt, the boarding pass. Square corners read precise and managed (Brief §3 professionalism). Pills belong to Blacklane's booking (REF-004), so square also separates AUREL from the closest competitor. |
| RJ-001 to RJ-008 | General rejections | **applies, all** | Checked one by one below. |

### Rejections checked and avoided

- [x] **RJ-001 Centered hero on a gradient.** Could have crept in as the
      category's darkened photo hero with a centered promise line (REF-007,
      REF-004). Instead the first scene is a left-aligned booking question on
      a flat paper ground, with the answer field set as large as the
      headline.
- [x] **RJ-002 Rows of identical feature cards.** Could have crept in at
      services (four cards) and fleet (four car cards). Instead services are
      a typographic index of four rows with a different time-shape glyph
      each, and the fleet is four drawings on one shared ground line, to
      scale.
- [x] **RJ-003 Icon grids.** Could have crept in as "why choose us" icons
      (REF-006 "What sets us apart"). Instead the standards are a numbered
      written list (Chapter 04). Functional icons (plane, pin, clock, seat,
      bag) appear only inside controls, never as a grid.
- [x] **RJ-004 Stock photography.** Could have crept in as a stock
      chauffeur-and-car hero, the category default. There is no photography
      at launch. Type, drawings, live graphics and a few renders of objects
      carry the site until the commissioned shoot.
- [x] **RJ-005 Logo strips as filler.** Could have crept in as client logos
      or a Trustpilot badge under the hero (REF-004, REF-006). None are used.
      Proof goes only where it supports a specific claim, and only when the
      owner supplies it (for example insurance cover beside the business
      account form).
- [x] **RJ-006 Every section on the same template.** Each scene and each
      service page has its own composition, listed per section in the page
      plans below.
- [x] **RJ-007 Color spread evenly.** One accent, used on at most one action
      per viewport and on the "now" marker. Status colors appear only in
      booking states and errors.
- [x] **RJ-008 Default serif as the premium shortcut.** No serif. The display
      face is an extended grotesk chosen for signage and the name board.

### Category clichés checked (from the REF-004 to REF-007 scan)

These are not owner rejections; they are what makes a chauffeur site look
like every other one.

- [x] Chauffeur-and-black-car hero photo with darkened overlay: not used.
- [x] Booking bar docked at the bottom of a photo hero: not used. The booking
      question is the headline.
- [x] Abstract promise headlines ("Exceptional care", "Your chauffeur
      awaits"): not used. Headlines are questions or concrete facts.
- [x] Serif as luxury: not used.
- [x] Navy/blue, or black and yellow: not used. Paper, ink and one amber.
- [x] Equal card rows and icon grids: not used.
- [x] Logo strip, Trustpilot badge, stat row: not used. Corporate assurance
      facts appear beside the business form as owner-supplied text.
- [x] "Download the app" close: not used.
- [x] Conventional dropdown nav: not used.
- [x] Hand-off to a different-looking booking app (REF-006, REF-007): the
      booking panel is the same component on the home page, service pages and
      `/book`.
- [x] Repeated questions (REF-007): answers carry across every step and
      page. Nothing is asked twice.
- [x] Name and payment on the vehicle step (REF-006): the vehicle step asks
      only about people, bags and tier.
- [x] Modals or chat covering content (REF-006, REF-007): no arrival modal,
      no auto-opening chat. Help is a page.
- [x] No full-day option: full day is one of four first-level services.

---

## References

Research limits: I did not browse Awwwards, Godly or other galleries in this
pass. The category scan (REF-004 to REF-007) was filed by the
design-researcher on 2026-11-05. I read every entry in full and looked at
these images myself: REF-004 `booking-guided-dropoff-1440.png`,
`booking-vehicle-classes-1440.png`; REF-005 `hero-1440.png`; REF-006
`booking-vehicle-carousel-1440.png`; REF-007 `hero-booking-bar-1440.png`;
REF-001 `problem-1536-headline.jpg`; REF-002 `hero-1440.png`; REF-003
`library-1440.png`. Font facts were checked on the foundry pages on
2026-11-05 (grillitype.com, github.com/Omnibus-Type/Archivo).

| ID | Reference | Source | What to take | What not to copy |
|---|---|---|---|---|
| REF-001 | Grail | owner taste | Chapters with a constant frame and a different composition inside each; a floating action that hides where the real form appears; the oversized input with a hairline underline (Chapter 08) as the model for AUREL's booking question; short hover (150ms) and 500 to 780ms reveals. | PP Pangaia, lilac on black, crests, 3D characters, the brush wipe, the countdown, the drifting pill. |
| REF-002 | Carnilove by Ashfall | owner taste | Two grounds that swap per section plus one signal accent; one dominant line per viewport; a visual thread across chapters; a designed sign-off. | The condensed caps face, wine/cream/red, the red trail line with dots, the warped footer wordmark. |
| REF-003 | premotio | owner taste | The page demonstrates the product as you scroll; neutral chrome with content carrying the energy; the active-item list (pointer plus stepped opacity) as a model for the services index; reduced-motion support. | The card ring, the cycling bracket word, staircase copy, the tick ruler, the glass pill nav. |
| REF-004 | Blacklane | category scan | Booking panel that grows in place; flight field only for airport pickups; one control switching drop-off and duration; tier comparison with capacity and all-in price in one glance; completed inputs collapsing into editable chips. | PP Fragment serif statements, pastel card backgrounds, frosted captions, pill CTAs, its tier names (see Open questions). |
| REF-005 | Wheely | category scan | Chauffeurs shot as portraits in real places (for the future shoot); near-colorless interface when imagery is strong. | Stacked equal promo panels, no web booking, slab wordmark. |
| REF-006 | Addison Lee | category scan | Airport question (arriving or departing) before any address; running total pinned while comparing tiers. | Black and yellow, tracked caps, booking hand-off, name and payment on the vehicle step, auto-opening chat. |
| REF-007 | Carey | category scan | Autocomplete results labelled Airport or Address; a helper line for the one rule people break; assurance facts beside booking for corporate buyers. | Cormorant on navy, stat row, five dropdown nav, arrival modal, legacy hand-off. |

---

## Directions compared

### A. Kept Time (chosen)

- **Concept.** AUREL's premium is that time is kept. The site is built from
  the materials of a well-run journey: the arrivals name board, the itinerary,
  the timestamp. The first thing on screen is the first booking question, set
  as the headline. Below it, the story shows one journey minute by minute,
  so the standards prove themselves instead of being claimed.
- **Type.** One extended grotesk superfamily: Extended width for display,
  Standard width for text, tabular figures for every time and price.
- **Color.** Paper and ink. One amber accent ("Aurel", from aureus, the
  name's root) for the commit action and the "now" marker. Story grounds move
  through the day: dawn, day, dusk, night.
- **Layout.** Booking question as the opening scene; then pinned chapters on
  a strict 12-column grid with a hairline "journey rule" that carries
  timestamps down the page and later becomes the booking summary.
- **Motion.** Scroll scrubs the clock. Ground color follows the hour. The
  booking panel grows in place. Completed steps fold into the journey rule.
- **References.** REF-001 (oversized input, chapter frame), REF-002 (ground
  swaps, thread), REF-003 (page as demo, active list), REF-004 and REF-006
  (booking patterns).

### B. Cabin

- **Concept.** The site is the inside of the car at night: a dark,
  cinematic, material world (leather grain, stitched seams, cool glass, city
  light passing). Booking sits in a dark panel bottom left, like a console.
- **Type.** A light, narrow grotesk display (for example GT America
  Condensed Light) with a quiet text face.
- **Color.** Near-black cabin ground, warm interior highlights, one cool light
  accent.
- **Layout.** Full-bleed rendered interior scenes, pinned; the panel docked.
- **Motion.** Slow camera moves through rendered interiors tied to scroll;
  light sweeps across materials.
- **References.** REF-001 (dark theatre), REF-002 (product in a scene),
  REF-005 (imagery-first).

### C. House Rules

- **Concept.** The site as AUREL's standards manual: numbered rules, a strict
  Swiss grid, specification tables. Every page reads like a page of the
  operating handbook. Booking is a form sheet.
- **Type.** A neutral grotesk with a mono for numbers.
- **Color.** White, black, one red signal.
- **Layout.** Long numbered documents, tables, footnotes; little imagery.
- **Motion.** Almost none: underline hovers and section reveals.
- **References.** REF-003 (neutral chrome), REF-007 (assurance for buyers).

### Scores

| Criterion | A. Kept Time | B. Cabin | C. House Rules |
|---|---|---|---|
| Fit with audience and brand | 5: understated, concrete, works for executives and families alike; premium shown through standards (Brief §10) | 3: elegant but leans on "luxury" mood the brief warns against; feels distant to families and buyers | 4: dependable and clear; cold for occasion customers |
| Brief requirements, accessibility, primary task | 5: booking is the first scene; light grounds for forms; time and price are central (Brief §7, §9) | 3: dark booking panels and imagery-led pages make the task secondary; contrast harder on rendered grounds | 5: forms and tables first; excellent accessibility |
| Owner's applicable preferences | 4: story, motion that explains, type-led, one accent, designed ending; story adapted to sit after booking | 5: the most cinematic, closest to REF-001 and REF-002's feel | 2: drops the scroll story and motion craft the owner called "Default" |
| Distinct from competitors and past projects | 5: no category site leads with time or the name board; differs from all three owner refs (light, extended sans, no pills) | 2: dark car interior is close to the category's default image of luxury | 3: distinct in the category, but generic as a web style |
| Buildable in stack and time | 4: needs a careful scroll scene and a solid booking component; renders are few and small | 2: depends on high-end 3D renders or a shoot that doesn't exist yet | 5: simplest to build |
| **Total** | **23** | **15** | **19** |

**Chosen: A, Kept Time.** It scores highest on fit and the primary task, and
it's the only direction that turns the brief's instruction ("communicate
premium through service standards") into the visual system itself. B is the
owner's taste at its most literal, but it can't be built honestly before
AUREL has a fleet or photography, and it reads like the category. C would be
a safe fallback if the owner wants less motion, and much of it lives on
inside A as the Standards page.

Kept for the owner: if the owner prefers B's mood, the closest compromise is
A's structure with dusk and night chapters lengthened and the commissioned
shoot (below) pointed at interiors. If the owner prefers C, A's Standards
page and booking flow transfer unchanged.

---

## Concept

**Kept Time.** A good chauffeur service is measured in minutes: the chauffeur
is at arrivals before you are, the pickup moves when the flight lands early,
the price is fixed before you confirm. AUREL's site makes those minutes the
design material. The opening screen asks the first booking question in
display type. The story below scrubs one journey by the clock while the page
moves from dawn to night. Every booking ends as an itinerary on the same
hairline rule the story used, so the promise and the receipt look the same.

### Signature devices

1. **The name board.** A plain rectangle with a 2px ink border and uppercase
   Extended type, the board a chauffeur holds at arrivals. It frames the
   opening booking question, previews the meet-and-greet board in the airport
   flow ("This is the board your chauffeur will hold"; the traveller can edit
   the name), and returns on the confirmation page. It's a real feature for
   airport customers (Brief §5B), not decoration.
2. **The journey rule.** A 1px vertical (desktop) or horizontal (mobile) line
   with tabular timestamps and a small amber "now" marker. It structures
   Chapter 01, becomes the running summary in booking, and becomes the live
   status tracker on the booking-details page (Prepare and Travel stages,
   Brief §9).
3. **Grounds that keep the hour.** Story chapters move from dawn to night.
   Booking and account pages always sit on day paper.

---

## Website structure

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

- **Top left:** AUREL wordmark (text placeholder set in the display face;
  the owner supplies or commissions the real mark; no logo is invented here).
  Links home.
- **Top right:** "Sign in" (or the account holder's initials when signed in)
  and "Index". Text buttons, 48px tall targets. The frame scrolls away on
  story pages and returns on scroll up.
- **Index** (replaces the nav bar, P-010): a full-screen sheet on day paper,
  set like a departures board. Four groups in a 12-column grid:
  - Book: Book a journey, Manage a booking
  - Services: Airport transfers, Transfers, Hourly, Full day
  - AUREL: Fleet, Standards, For business, Hotels and agencies
  - Help: Help, Contact, Sign in or Account
  Large Extended links (40px desktop, 28px mobile), each with a one-line
  description in text size. Opens with a 420ms ground slide from the top;
  focus moves to the first link; Esc and the close button return focus to
  "Index".
- **Persistent action** (P-010): a square ink bar at the bottom center,
  shown once the booking scene leaves the viewport, hidden on `/book`,
  account pages and wherever the booking panel is visible. Label "Book a
  journey". When a draft exists, it reads "Continue: Heathrow T5 → The Savoy,
  Thu 07:40" with the amber now-dot. On home it scrolls back to the booking
  scene and focuses the next empty field; elsewhere it opens `/book` with the
  draft.
- **Footer** (every page except booking steps): on the home page this is the
  designed ending; elsewhere a compact index on night ground with the same
  four groups, legal links, contact line, and the tagline.

---

## Customer journeys

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

## Booking flow

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
- **First field** sits inside the name board at display-adjacent size
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

Primary action: "See vehicles" (amber). Date pickers: a custom accessible
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
- **Itinerary:** the journey rule with the amber now-marker.
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

### Typography

**Display face.** An extended grotesk with signage character. Extended
letters at large sizes read like the boards and signs a traveller follows
through an airport; they look calm and unhurried at size, and their width
keeps lines short, so a booking question fits on two lines. This ties the
face to the business (P-017): it's the face of the name board.

**Text face.** The Standard width of the same superfamily, with tabular
figures for every time, date, price and reference so columns align on the
journey rule.

| Candidate | Use | Licence and availability | Notes |
|---|---|---|---|
| **GT Standard** (Grilli Type), Extended Medium for display, Standard M Regular and Medium for text | Recommended | Commercial licence from grillitype.com; free trial fonts available for design work; web licence terms and price to confirm with the foundry before build. Six widths (Compressed to Expanded) plus Mono, seven weights. | One superfamily covers display and text by width, which is exactly P-001. Tabular figures not listed on the product page: confirm in the trial files. |
| **Archivo** (Omnibus-Type, Héctor Gatti), Expanded SemiBold display, normal width Regular text | Open-licence fallback | SIL Open Font License 1.1, on Google Fonts and GitHub. Nine weights, widths from Extra Condensed to Expanded, variable masters since v2.000. | Same width-as-voice system at no cost. Slightly more common on the web. Confirm `tnum` support in the font files. |
| Rejected: Geist | | | Blacklane's text face (REF-004). |
| Rejected: abcFavorit | | | Wheely's face (REF-005). |
| Rejected: Steagal, any wide-tracked caps | | | Addison Lee's identity (REF-006). |
| Rejected: Cormorant, PP Fragment, Playfair and other go-to serifs | | | RJ-008, and they are Carey's and Blacklane's display faces. |
| Rejected: Söhne | | | Strongly associated with a well-known AI product, which works against RJ-008's reason. |
| Rejected: Inter, Space Grotesk | | | Default web choices; nothing tied to AUREL. |

Type scale (16px root; fluid sizes use `clamp()` between 390 and 1440):

| Token | Family and weight | 390 | 834 | 1440 | Leading | Tracking | Use |
|---|---|---|---|---|---|---|---|
| `--type-display` | Extended Medium | 44px / 2.75rem | 72px / 4.5rem | 120px / 7.5rem | 0.9 | -0.02em | Story statements, booking question on home |
| `--type-title` | Extended Medium | 32px / 2rem | 48px / 3rem | 72px / 4.5rem | 0.95 | -0.015em | Page titles, chapter titles, ending wordmark line |
| `--type-input-xl` | Extended Regular | 24px / 1.5rem | 32px / 2rem | 40px / 2.5rem | 1.1 | -0.01em | The first booking field's value, the booking reference, totals |
| `--type-step` | Standard Medium | 20px / 1.25rem | 22px / 1.375rem | 24px / 1.5rem | 1.25 | 0 | Booking step titles, account section titles |
| `--type-body` | Standard Regular | 16px / 1rem | 16px | 16px | 1.55 | 0 | All reading text and inputs (16px stops iOS zoom on focus) |
| `--type-small` | Standard Regular | 14px / 0.875rem | 14px | 14px | 1.45 | 0 | Helper text, captions, price breakdown lines |
| `--type-label` | Standard Medium, uppercase | 12px / 0.75rem | 12px | 12px | 1.3 | 0.08em | Field labels, timestamps' captions, chapter corner labels |
| `--type-board` | Extended Medium, uppercase | 20px | 28px | 36px | 1.0 | 0.04em | Name board, wordmark placeholder |

Rules: one display weight. Sentence case for display. Body measure 60 to 72
characters. Tabular figures (`font-variant-numeric: tabular-nums`) on all
times, dates, prices and references. Story scenes use only `display`,
`body`, `small` and `label` (P-002); booking and account use the middle steps.

### Color tokens

| Token | Value | Use | Reason |
|---|---|---|---|
| `--color-paper` | `#F1EFEA` | Page ground (day) | Warm grey paper, not white: softer for long forms, distinct from Blacklane's warmer off-white and Wheely's white |
| `--color-paper-raised` | `#FAF9F7` | Booking panel, inputs, Index sheet | Lifts the task surface without shadow |
| `--color-dawn` | `#E3E1DA` | Story ground, dawn chapter | Time-of-day grounds (P-008 adapted) |
| `--color-dusk` | `#2A2C31` | Story ground, dusk chapter | Same |
| `--color-night` | `#0E1012` | Story ground, night chapter, footer | Same; also the designed ending (P-009) |
| `--color-ink` | `#16181B` | Text, primary borders, selected states, persistent action | One dark for everything that isn't the accent |
| `--color-ink-2` | `#565A61` | Secondary text, placeholders, helper text | Passes 4.5:1 on every light ground |
| `--color-ink-3` | `#6E727A` | Disabled text only | Fails 4.5:1 on paper (4.20), so it's never used for readable text |
| `--color-field` | `#86837C` | Input underlines and borders at rest | 3:1 or more for non-text UI (WCAG 1.4.11) |
| `--color-rule` | `#D3CFC6` | Hairline dividers, journey rule track | Decorative only; never the only cue for a control |
| `--color-on-dark` | `#F1EFEA` | Text on dusk and night | Same value as paper |
| `--color-on-dark-2` | `#BDBAB3` | Secondary text on dusk and night | |
| `--color-aurel` | `#A24E17` | Primary commit action fill, now-marker, active service segment underline | The single accent (P-011); burnt amber from the name's root (aureus), not metallic gold, and far from Addison Lee's yellow |
| `--color-aurel-on-dark` | `#E39B5F` | Accent on dusk and night | Same accent, lifted for dark grounds |
| `--color-error` | `#A3271C` | Error text, borders, icon | Status only |
| `--color-error-on-dark` | `#F08A7E` | Errors on dark grounds (rare) | |
| `--color-success` | `#2E6A3F` | "Confirmed", "Chauffeur assigned" status text | Status only |
| `--color-focus` | `#16181B` on light, `#F1EFEA` on dark | Focus ring, 2px with 2px offset | Instant and high contrast on every ground |

Contrast checks (WCAG 2.x relative luminance, computed 2026-11-05):

| Pair | Ratio | Result |
|---|---|---|
| ink on paper / raised / dawn | 15.48 / 16.91 / 13.59 | AAA |
| ink-2 on paper / raised / dawn | 6.03 / 6.59 / 5.30 | AA text |
| ink-3 on paper / raised | 4.20 / 4.59 | Disabled only |
| field on paper / raised | 3.29 / 3.60 | AA non-text |
| aurel on paper / raised (accent as text or marker) | 5.02 / 5.49 | AA text |
| white on aurel / paper on aurel (button label) | 5.77 / 5.02 | AA text |
| error on paper / raised | 6.38 / 6.97 | AA text |
| success on raised | 6.14 | AA text |
| on-dark on dusk / night | 12.16 / 16.59 | AAA |
| on-dark-2 on dusk / night | 7.21 / 9.84 | AAA |
| aurel-on-dark on dusk / night | 6.07 / 8.28 | AA text |
| error-on-dark on night | 7.85 | AA text |
| rule on paper | 1.35 | Decorative only, never carries meaning |

Accent budget (RJ-007): at most one amber action per viewport. The
persistent action is ink, not amber, so it never competes with the panel's
amber "Continue".

### Layout principles

- **Spacing scale** (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192px
  (`--space-1` to `--space-11`). Inside the booking panel, steps use 16 to 32;
  between story scenes, a full viewport or more.
- **Grid:**
  - 1440: 12 columns, 64px outer margins, 24px gutters, content max 1312px.
  - 834: 8 columns, 40px margins, 24px gutters.
  - 390: 4 columns, 20px margins, 16px gutters.
- **Radius and borders:** radius 0 everywhere. 1px hairlines for dividers;
  1px `--color-field` under inputs at rest, 2px ink when focused or selected;
  2px ink border for the name board. One elevation token only, for the
  persistent action and open menus: `0 8px 24px rgb(14 16 18 / 0.14)`.
- **Section rhythm:** story scenes each take one viewport or more and change
  composition every time (see page plans). Recurring elements that keep them
  one page: the corner frame (chapter label top left, the hour top right),
  the journey rule, the grid.

### Imagery

**At launch (no fleet photography):**

1. **Type.** The main image on most screens.
2. **Tier elevation drawings.** Orthographic side views of the four tier
   shapes (saloon, larger saloon, SUV, van), drawn as 1.5px ink lines on
   paper, to scale with one another, with seats and bags drawn inside as
   simple marks. They are generic body shapes, not a specific model, which
   is honest while the fleet is not final (Brief §6 "vary by location").
   Commission from an illustrator or draw in-house; one SVG per tier.
3. **Live graphics.** Route lines (from the map provider's geometry, drawn
   as a single ink line with pickup and drop-off marks), flight path arcs,
   the journey rule. They show the customer's own journey, so they are always
   true.
4. **Rendered objects, few and small.** A matte, studio-lit render family on
   paper-coloured backdrops: the name board in a hand, a folded itinerary
   card, a receipt, a closed umbrella in a door pocket. Uses: Standards page,
   Business page, the ending. Same light direction (upper left, soft), same
   paper backdrop, no cars, no people. Rendering a car would imply a fleet
   that doesn't exist yet.

**Never:** stock photography (RJ-004), darkened photo overlays, a black car
motion-blurred past a hotel (REF-007), the chauffeur-opening-a-door pose,
skyline-at-dusk clichés, icons standing in for ideas (RJ-003).

**Future commissioned shoot** (when fleet and chauffeurs exist). Art
direction: natural light at the hour of the chapter it serves, eye-level,
people shown at work rather than posed, no added grade beyond matching
paper-warm whites, no overlays. Each frame is planned for a scene.

| # | Shot | For | Notes |
|---|---|---|---|
| 1 | Chauffeur at arrivals holding the name board, seen from the passenger's walking position | Chapter 01 (07:55), Airport page | Real terminal or a convincing set; board text matches the site's name board |
| 2 | Chauffeur checking a flight on a phone by the parked car, early light | Chapter 01 (06:40) | Shows flight tracking as a human act |
| 3 | Rear cabin from the seat, door open, nothing on the seat but what AUREL provides | Fleet, Standards | Shows cleanliness standard without a person |
| 4 | Luggage being loaded, hands and bags only, the car's boot dimensions readable | Fleet (capacity), Family page sections | Proof of capacity |
| 5 | Portrait of each lead chauffeur in a real place they work (station forecourt, hotel porte-cochère) | Standards, booking details placeholder style | Wheely's lesson (REF-005), composed off-centre to match AUREL's grid |
| 6 | Each tier in clean side elevation, matching the drawings' angle | Fleet, Vehicle step | Allows photo and drawing to swap without layout change |
| 7 | Interior at night with city light through glass, no faces | Dusk and night chapters | The only "mood" image |
| 8 | A full-day sequence: the same car at four places through one day | Full-day page | Tells a day by its stops |
| 9 | A hotel concierge handing a guest's itinerary card to a chauffeur | Partners page | Shows the hand-off a partner cares about |
| 10 | Close detail: the dashboard clock showing the pickup time beside the itinerary card | Ending, Booking details | Ties to "Kept Time" |

### Iconography

A small functional set drawn for AUREL: plane arriving, plane departing,
pin, clock, seat, bag, stop, swap, edit, close, error, check. 24px grid, 1.5px
stroke, square caps and joins to match the radius-0 system. Used only inside
controls and status lines.

---

## Interaction patterns

- **Booking panel:** grows in place; completed steps fold into chips in the
  journey rule ("Heathrow T5 → The Savoy", "Thu 12 Dec, 07:40", "First
  Class, 2 seats, 2 bags"); clicking a chip edits that step. Enter submits a
  step; Tab order follows the visual order; every step title is a heading
  that gets focus on step change.
- **Service switch:** a radio group (arrow keys move between options). It
  keeps what's already entered where it still applies (pickup stays when
  switching from Transfer to Hourly).
- **Autocomplete:** ARIA combobox pattern; results labelled by type
  (Airport, Hotel, Address); first result highlighted; Enter chooses.
- **Steppers:** − and + buttons 48×48, the number readable and typeable.
- **Buttons:**
  - Primary (amber fill, paper label): one per view, commit actions only.
  - Secondary (2px ink border, ink label, transparent).
  - Text action (ink, underline grows from the left on hover).
  - All 48px tall minimum, label Standard Medium 16px, padding 0 24px,
    radius 0.
  - Hover: fill darkens 8% and the trailing arrow moves 4px right (160ms).
  - Press: translateY(1px) (90ms).
  - Disabled: `--color-ink-3` label on `--color-rule` fill, no hover.
- **Focus:** 2px solid ring, 2px offset, `--color-focus`, appears instantly
  (no transition). Never removed.
- **Inputs:** label above (12px uppercase), value 16px, 1px underline at
  rest, 2px ink on focus, 2px error on error. Helper text under in `ink-2`.
  The first booking input is the oversized variant inside the name board.
- **Forms everywhere:** labels always visible (no placeholder-as-label),
  `autocomplete` attributes set, errors announced.
- **Story chapters:** scroll only. No click-to-advance, no scroll hijack;
  the page scrolls at normal speed and scenes are pinned with scroll-linked
  progress.
- **Help:** no floating chat bubble. If a chat service is added later, it
  opens from Help or a "Talk to us" link and never on its own.

---

## Animation direction

### Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | Controls, panel growth, reveals |
| `--ease-scene` | cubic-bezier(0.16, 1, 0.3, 1) | Ground changes, page transitions, Index sheet |
| `--dur-press` | 90ms | Press |
| `--dur-hover` | 160ms | Hover color, underline, arrow nudge |
| `--dur-chip` | 240ms | Step folding into a chip |
| `--dur-step` | 320ms | Booking step change |
| `--dur-panel` | 420ms | Panel growth, Index open |
| `--dur-page` | 480ms | Page transition |
| `--dur-reveal` | 640ms | Story line reveals (time-based ones only) |

### Scroll story choreography (home)

All story motion is scroll-linked (scrubbed), so the reader sets the pace
(P-014). Scenes pin for the scroll length noted, at 1440.

| Scene | Pin length | What moves, tied to scroll | Why |
|---|---|---|---|
| 0 Booking question | none | Nothing on scroll. On load: the question appears at once (no intro sequence); the name board's border draws in once over 420ms. | Booking must be usable on the first frame. |
| 01 One morning, minute by minute | 300vh | The hour in the top-right corner counts 06:40 → 07:25 → 07:55 → 08:40 as the reader scrolls. The ground shifts dawn → day. A flight arc fills; at 07:25 the "landed" marker jumps 12 minutes early and the pickup marker on the journey rule slides to match. At 07:55 the name board slides into the frame. Each timestamp's line reveals word by word as its hour arrives (P-015). | Shows flight tracking and waiting time without claiming them. |
| 02 Four ways to book | 150vh | The active row pointer moves down the four services as you scroll; the time-shape glyph beside the active row draws itself (A→B line; plane-to-door; a bracket of hours; a day arc). | Teaches the four services as shapes in time (REF-003 active-list idea, reinterpreted). |
| 03 What each car carries | 200vh | A passengers and bags count steps from 1/1 up to 7/7 as you scroll; tiers that no longer fit fade to 30% and their reason text appears. | Explains tier choice by capacity, the question families actually have. |
| 04 The standard | 150vh, ground goes day → dusk | Numbered standards come in one per scroll step, each pushing the previous one up and dimming it. | Premium shown through standards (Brief §10). |
| 05 For organisations | none | The statement sheet mock fills its rows (journeys, cost centres, total) once as it enters (time-based, 640ms, staggered 60ms). | Shows monthly billing as a product, not a claim. |
| 06 Ending | none, ground night | The wordmark line reveals letter by letter once on entry (640ms, 30ms stagger). | Designed sign-off (P-009). |

### Transitions

- **Between marketing pages:** the next page's ground slides up from the
  bottom over the old page (`--dur-page`, `--ease-scene`), using the View
  Transitions API where supported and an instant swap where not. The
  persistent action stays in place across the swap.
- **Between booking steps:** the finished step's content folds into a chip
  that flies to the journey rule (`--dur-chip`), and the next step fades in
  with a 12px upward shift (`--dur-step`). Going back reverses it.
- **Panel growth:** height animates with `--dur-panel` and `--ease-out`;
  content inside fades in after 120ms.
- **Status changes on booking details:** the now-marker slides along the
  rule to the new state (`--dur-panel`); the status line crossfades.

### Hover and focus

Hover 160ms, press 90ms, focus instant. Hover feedback is always paired with
a non-hover equivalent (visible underline or border at rest) so touch users
lose nothing.

### Smooth scrolling

Native scroll by default. If the build adds a smooth-scroll library for the
story pages, keep lerp at 0.1 or above and turn it off on `/book`, booking
details, account pages and under reduced motion. Implementation is the
solution-architect's call.

### Reduced motion (`prefers-reduced-motion: reduce`)

- No pinning and no scrubbing. Each chapter becomes a normal stacked section
  showing its final state: Chapter 01 becomes a static list of the four
  timestamps with their lines and the finished flight arc; Chapter 03 shows
  the full capacity table.
- Ground colors still change between sections, as hard edges, not fades.
- Page transitions, chip flights and panel growth become instant, or a
  120ms opacity fade at most.
- Letter and word reveals are off; text is present at once.
- Hover color changes stay; movement (arrow nudge, press shift) is removed.

---

## Responsive strategy

Design widths: 1440 (desktop), 834 (tablet), 390 (mobile). Fluid type
between them. Touch targets at least 48×48px everywhere (above WCAG 2.5.8's
24px minimum); no two targets closer than 8px.

### Booking panel

| | 1440 | 834 | 390 |
|---|---|---|---|
| Home scene 0 | Question on columns 1 to 8, panel below it on 1 to 8; columns 9 to 12 hold one line of service facts and the hour | Question full width; panel full width | Question at 44px, 3 lines max; panel full width; service switch as four equal segments (87px each, labels 14px) |
| Steps 1 to 4 | Panel columns 1 to 8; journey rule summary sticky on 9 to 12 with the running total | Single column; summary collapses into a chip row at the top; running total and Continue in a sticky bottom bar (64px) | Each step fills the screen; chips scroll horizontally at the top; sticky bottom bar with total and Continue, above the safe-area inset |
| Tier comparison | Four rows, drawing left, data right | Four rows, drawing smaller | Four stacked rows; drawing above data; selected row expands |
| Date and time | Calendar grid inline | Calendar grid inline | Native date and time inputs |
| Autocomplete | Dropdown under the field | Dropdown | Full-screen search sheet with the field at the top |

### Story scenes

| Scene | 1440 | 834 | 390 |
|---|---|---|---|
| 01 Minute by minute | Hour huge at left (display), flight arc and journey rule at right, name board enters from right | Hour on top, graphic below, still pinned | Shorter pin (200vh); hour at top, one line, the graphic simplified to the rule only; name board full width |
| 02 Four ways | Four rows across columns 1 to 8, glyph at 9 to 12 | Rows full width, glyph inline at the row's right | Rows stacked, glyph above the active row's text; not pinned, each row reveals as it enters |
| 03 Capacity | Four drawings on one ground line, counter above | Two by two, counter above | One drawing at a time in a horizontal snap row; counter sticky at top |
| 04 Standard | One standard at display size, number at left | Same, title size | Title size, number above |
| 05 Organisations | Statement left 1 to 5, statement sheet 7 to 12 | Stacked, sheet below | Stacked; sheet shows three rows and a total |
| 06 Ending | Wordmark across all 12 columns | Same | Wordmark at full width, tagline below, booking link |

Frame and Index: at 390, "Sign in" moves into the Index; top right keeps
only "Index". The persistent action becomes a full-width bottom bar (56px plus
safe area) with 20px side margins.

---

## Page and screen plans

### Home (Brief §5, §7, §9, §10)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Scene 0, the booking question | Start a booking without reading anything | Day paper. Wordmark top left, Sign in and Index top right. Service switch, then the question in display type, left-aligned on columns 1 to 8, then the name board holding the oversized first field. Columns 9 to 12: one sentence ("Pre-booked chauffeurs for transfers, airports, hours or a whole day. Fixed price before you confirm.", to confirm with the owner) and the current hour in label type. No image. | Stacked; question 3 lines; panel full width; facts line under the panel | Booking is the primary task (Brief §9); REF-001's oversized field; avoids photo hero and docked bar clichés |
| 01 One morning, minute by minute | Show the standard of an airport pickup | Pinned. Corner label "01 Airport" and the hour top right. Left half: the hour in display. Right half: flight arc and journey rule. Ground dawn → day. | See Responsive | P-014; Brief §5B features shown, not listed |
| 02 Four ways to book | Explain the four services | Typographic index rows in Extended title size, pointer and glyph; each row links to its service page, with "Book this" setting the panel's service | Stacked rows | RJ-002 avoided; REF-003 list idea |
| 03 What each car carries | Explain the tiers | Four elevation drawings on one ground line, the counter above, names and one line each | Horizontal snap | Brief §6; RJ-002 avoided |
| 04 The standard | State the standards | Day to dusk. Numbered standards, one per step, display size, e.g. "Your chauffeur is at arrivals before you are." (all wording and values from the owner) | Title size | Brief §7, §10 |
| 05 For organisations | Bring corporate buyers to `/business` | Split: statement and one link left; a statement sheet mock right | Stacked | Brief §4, §8 |
| 06 Ending | Sign off and offer booking once more | Night ground. Wordmark across the grid, "Travel, Considered." under it, the booking question as a link, then the compact footer index and legal links | Same, stacked | P-009 |

### Airport transfers (Brief §5B)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Booking scene | Book an airport journey | Panel preset to Airport with the Arriving / Departing choice as the headline | Same as home | REF-006 airport-first |
| The arrival, as a timetable | What happens from landing to door | A full-width timetable: rows of time, event, what AUREL does; the row for "landed early" shows the pickup moving | Rows stack, time above text | Shows arrival coordination |
| The name board | Explain meet-and-greet | The name board at full title size with a sample name, and one paragraph on where the chauffeur waits | Board full width | Signature device 1 |
| Delays and waiting | Answer the anxious questions | Quiet two-column Q&A in text size (what if my flight is late, how long you wait, what it costs) | One column | Brief §2 unreliable pickups |
| Close | Book | Booking link and Help link on dusk ground | Same | |

### Point-to-point transfers (Brief §5A)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Booking scene | Book | Panel preset to Transfer | Same | |
| The route | Show what a transfer is | One long horizontal route line across the full width with A and B marks and three short notes along it (collected at the door, stops on request, price fixed when you book; wording TBD) | Line turns vertical | Distinct from the airport timetable |
| Common journeys | Help people picture use | A plain list of journey types from the brief (meetings, hotels, appointments) as text links into the panel with the service preset | List | Brief §5A, no cards |

### Hourly chauffeur (Brief §5C)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Booking scene | Book hours | Panel preset to Hourly, duration stepper visible | Same | |
| A bracket of hours | Explain how hours work | A large horizontal bar of hours; scrolling extends the bracket from 2h to 6h while three sample stops land on it | Vertical bar | Motion explains duration |
| What's included in an hour | Set expectations | Short definition list (waiting between stops, distance allowance if any, extensions on the day), owner wording | Same | Brief §7 transparency |

### Full-day chauffeur (Brief §5D)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Booking scene | Book a day | Panel preset to Full day | Same | Brief: full day was missing on competitor sites |
| A day, planned | Show a full day | A day rail from morning to night across the page with ground shifting dawn to night along it; example plans for a corporate visit, a wedding and a city day as three switchable rails (tabs) | Rail vertical; tabs as a segmented control | Brief §5D uses; distinct composition |
| Breaks and hours | Explain limits honestly | Quiet text: chauffeur breaks, overtime, overnight, owner wording | Same | Brief §10 no exaggeration |

### Fleet (Brief §6)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Title | Name the page | Title "Four cars, chosen by what you're carrying" (draft) and the party counter | Same | |
| Tier chapters (×4) | Each tier on its own | Drawing large across columns 1 to 8; columns 9 to 12: name, "or similar" models, seats, bags, included, suited to. The four chapters alternate drawing side so the page doesn't repeat one template | Drawing on top | RJ-006 |
| Comparison table | Compare at once | Dense table, all four tiers, rows for seats, bags, included features, from-price if the owner publishes one | Table scrolls horizontally with the first column fixed | P-007 exception for tables |
| Note | Honesty | "Vehicles vary by city" line (Brief §6) | Same | |

### For business (Brief §4, §8)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Opening | State what an account does | Title on columns 1 to 7; columns 8 to 12: the account application form start (company, name, work email, monthly journeys estimate) | Title, then form | Buyers want the action early |
| Assurance beside the form | Answer risk questions | A short list of owner-supplied facts beside the form (insurance cover, chauffeur vetting, support hours). Shown only when real; never as a stat row | Under the form | REF-007 lesson, RJ-005 respected |
| The monthly statement | Show billing and central management | A full statement sheet mock, large: journeys by person and cost centre, invoice total | Simplified sheet | Product shown, not claimed |
| Booking for others | Show the assistant's flow | Three-step strip using the real booking UI at small scale: saved traveller, cost centre, itinerary sent | Stacked | Brief §8 centralized travel management |
| Recurring journeys | Show repeat bookings | A week calendar with recurring pickups drawn on it | One day at a time | Brief §8 |
| Close | Apply or talk to someone | Form link and contact | Same | |

### Hotels and agencies (Brief §4, §11)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Opening | Explain guest transport | Statement plus "Talk to us" form start | Stacked | Brief §4 hospitality |
| The hand-off | What the guest experiences | The guest's itinerary card as a rendered object, with the name board and the partner's name on it | Same | |
| How billing works | Partner billing | Plain text, owner wording | Same | Brief §11: no future commitments as facts |

### Standards (about) (Brief §3, §7, §10)

| Section | Purpose | Composition | Mobile | Reason |
|---|---|---|---|---|
| Opening | State the philosophy | "The journey should feel as carefully considered as the destination." in title size, nothing else | Same | Brief §1 |
| The five principles | Reliability, comfort, professionalism, convenience, personalisation | Long numbered document in text size with title-size numbers, one principle per spread, each with the concrete standards that support it (owner-supplied) | Single column | Brief §3; C direction kept here |
| Chauffeurs | How chauffeurs are chosen and trained | Quiet text, portraits later (shot 5) | Same | Brief §7 |
| Vehicles | Maintenance and presentation standard | Text plus rendered object (cabin detail later) | Same | Brief §6 |

### Booking steps (`/book`) (Brief §9 steps 3, 4)

Layout described in Booking flow. Frame: wordmark, step indicator ("2 of 4
Vehicle" as text, plus four short ticks), Exit (returns to where the user
came from with the draft kept). No Index, no persistent action, no footer
beyond a single line of legal links.

### Booking details (`/booking/[ref]`) (Brief §9 steps 4 to 7)

| Area | Content | 1440 | 390 |
|---|---|---|---|
| Header | Status, reference, date | Full width | Same |
| Journey rule | Itinerary and live status | Columns 1 to 7 | Top, horizontal compressed rule with current state large |
| Chauffeur and vehicle | Assigned details, contact through AUREL | Columns 8 to 12 | Under the rule |
| Name board | Arrival board (airport) | Columns 8 to 12 | Under chauffeur |
| Actions | Calendar, share, change, cancel | Columns 8 to 12 | Sticky bottom bar with "Change" and a "More" menu |
| Receipt and feedback | After completion | Replaces actions | Same |

### Manage a booking (`/manage`)

One centred form: reference and email. Then the booking details page. Error:
"We couldn't find a booking with that reference and email."

### Account area (layout level)

- **1440:** left index column (columns 1 to 3): Journeys, Travellers, Places,
  Payment, Receipts, Company (business admins only), Settings, Sign out.
  Content on columns 4 to 12. "Book a journey" as the one amber action at the
  top of Journeys.
- **834:** index becomes a horizontal tab row under the title.
- **390:** index becomes a list page; each section is its own screen with a
  back link.
- **Journeys:** upcoming first, each as a row on a shared journey rule
  (date, time, route, tier, status), then past journeys with "Book again".
- **Company:** people (invite, role), cost centres, billing details and
  invoices; table layouts.

### Help and contact

- **Help:** title, a search field, topic index (Booking, Airports, Changes
  and cancellations, Payment and receipts, Business accounts, Safety and
  standards) as large text links, then questions in quiet accordions within
  each topic. A contact block at the end of every topic.
- **Contact:** phone, email and hours (owner-supplied) at title size, then a
  message form with topic, booking reference (optional), message.

### Legal

Reading layout: 68-character measure on columns 4 to 9, contents list sticky
on columns 1 to 3 at 1440 (collapsed into a disclosure at 834 and 390), last
updated date at the top, plain headings. Booking conditions link from the
Review step and open in the same tab with the booking draft kept.

---

## Open questions for the owner

Only the questions whose answers change the design.

1. **Tier names.** "Business Class" and "First Class" are Blacklane's exact
   tier names (REF-004). Keeping them makes AUREL's vehicle step read like
   Blacklane's. Not renamed here. Options if you want to change them:
   - Descriptive by vehicle: Saloon, Executive Saloon, SUV, Van.
   - By what the tier carries: Saloon, Saloon Plus, Seven-Seat, Group.
   - A short house series: AUREL One, AUREL Two, AUREL Space, AUREL Group.
   The layout works with any names up to about 18 characters.
2. **Launch city or market.** Sets currency, airports in autocomplete,
   date and unit formats, language, and whether city pages are needed.
3. **Fonts budget.** GT Standard (licensed, recommended) or Archivo (free)?
4. **Pricing model.** Fixed all-in price before confirmation, or estimates
   for hourly and full-day? This decides the "This is the price you pay"
   promise and the Vehicle step's price display.
5. **Service rules.** Minimum notice, included waiting time at airports,
   hourly minimum, full-day lengths, cancellation window. Chapter 01, the
   Airport page and the Review step are built on these numbers.
6. **The standards themselves.** The Standards page and Chapter 04 need real,
   specific commitments (for example "at arrivals 15 minutes before
   landing"). Which ones will AUREL commit to publicly?
7. **Accounts.** Can people book as guests (recommended), and can businesses
   open accounts themselves or only through a sales contact?
8. **Wordmark.** Is there a logo, or should one be commissioned? The site
   uses a typeset placeholder until then.
9. **Live tracking.** Will the platform show the chauffeur's live location?
   This changes the Travel stage on the booking details page.
10. **Imagery budget and timing.** Is a commissioned shoot planned, and is
    the illustrated elevation set approved as the launch fleet imagery?

---

## Feedback log

The owner's feedback on this project. General feedback is also recorded in
the design memory.

| Date | Feedback (quoted) | Scope | Recorded as | Action |
|---|---|---|---|---|
| | | | | |

## Visual QA log

No build exists yet; this pass is strategy only. No screenshots taken.

| Round | Date | Page | Width | Screenshot | Scores (hier/type/comp/space/brand/resp/inter/anim/orig) | Issues | Status |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
