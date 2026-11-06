# Idea backlog

Owner: innovation-strategist proposes. The Orchestrator classifies in
product-decisions.md.

Scores are the strategist's judgment from 1 to 5, with reasons. They are not
market measurements. Each idea keeps the evidence label of the research
behind it (`fact`, `pattern`, `inference`, `hypothesis`) so a reader can tell
a fact-backed idea from a guess.

Ground rules applied to every idea:

- Scope is the static marketing site (D-1). Anything that needs the app, a
  backend, a paid service or a third-party integration is marked **hard
  stop 6** (new integration, cost or scope).
- No regulatory claims (R-022) and no invented proof (R-033). Ideas that
  touch legality say how the copy stays neutral until the client's legal
  advisor decides (K-1).
- No copying a competitor's wording, named concepts or layout
  (competitor-analysis.md "What not to copy").

## Summary

| ID | Idea | Opportunity | User value | Differentiation | Feasibility | Strategic relevance | Suggested class | Final class |
|---|---|---|---|---|---|---|---|---|
| IDEA-1 | "When an order goes wrong" scenarios | OP-1 | 4 | 5 | 4 | 5 | MVP | |
| IDEA-2 | Verification, shown step by step | OP-2, OP-5 | 5 | 4 | 5 | 5 | MVP | |
| IDEA-3 | "Can I list this?" boundary explainer | OP-5, OP-3 | 4 | 3 | 5 | 4 | MVP (static); enhancement (interactive) | |
| IDEA-4 | Anatomy of one order: money and records | OP-4, OP-7 | 4 | 3 | 4 | 5 | MVP | |
| IDEA-5 | "Where the legal question stands" section | OP-3 | 4 | 4 | 4 | 5 | MVP | |
| IDEA-6 | Fee explainer with a worked-example slot | OP-6 | 4 | 3 | 4 | 4 | MVP (structure); enhancement (calculator) | |
| IDEA-7 | "Before you apply" readiness list | OP-9 | 4 | 3 | 5 | 4 | MVP | |
| IDEA-8 | One illustrative listing followed end to end | OP-8, OP-1, OP-4 | 4 | 4 | 4 | 4 | high-value enhancement | |
| IDEA-9 | Report a suspect listing: route for brand-protection teams | OP-5 | 3 | 5 | 4 | 4 | high-value enhancement (owner) | |
| IDEA-10 | Public "settled and pending" ledger | OP-10, OP-8 | 3 | 5 | 5 | 3 | high-value enhancement (owner) | |
| IDEA-11 | Print-ready trust brief for the person who signs off | OP-11 | 3 | 3 | 5 | 3 | future opportunity | |
| IDEA-12 | "Where surplus goes today" comparison for sellers | OP-12 | 3 | 3 | 3 | 3 | future opportunity | |
| IDEA-13 | Public sample inventory preview | OP-8 | 3 | 1 | 1 | 2 | rejected | |
| IDEA-14 | Buyer savings calculator | OP-6 | 2 | 1 | 2 | 1 | rejected | |
| IDEA-15 | Chat assistant for trust questions | OP-2 | 2 | 1 | 1 | 1 | rejected | |

## Ideas

### IDEA-1 "When an order goes wrong" scenarios

- Direction: differentiation, missing capability
- Problem: buyers and sellers can't tell who handles a short, damaged, wrong
  or near-expiry delivery, and no competitor page says (OP-1).
- Target user: buyer pharmacy first, seller pharmacy second.
- Proposed solution: a section (on the buying page or its own page linked
  from the Dispute and return policy page) with four short scenarios: fewer
  units than ordered, damaged in transit, different lot or expiry than
  listed, item never arrives. Each scenario shows the mechanisms the brief
  does define: the buyer withholds delivery confirmation, reports the issue
  with photos, the order's listing record (lot, expiry, condition) is the
  reference, an administrator manages the dispute, the audit log keeps the
  history. The outcome line in each scenario (refund, return, who pays
  shipping) is a marked placeholder until the client's dispute and return
  policy exists (Q-4, R-025).
- Evidence or reasoning: G-1 absent on 7 of 7 competitor pages (`pattern`);
  UP-6 (`inference`, no user complaint found); brief Key Challenges and F11.
- Differentiation: the only public answer to this question in the set read.
- User value: the buyer's main post-verification worry gets a concrete
  answer; the seller sees the rules apply to both sides.
- Business value: fewer pre-sale support questions; a credible reason to
  prefer this platform that costs nothing to run.
- Technical feasibility: static content. Optional disclosure widget for each
  scenario, already a pattern in R-026.
- Implementation complexity: small. The work is copy.
- Dependencies: R-014, R-025, R-032, R-034; client dispute policy (Q-4) for
  the outcome lines.
- Risks: if outcomes stay placeholders at launch the section looks
  half-finished; copy could slip into promising a refund (R-025 forbids it).
  Words like "return" must not imply a wholesaler return (market-research
  "Returns and resale are different things").
- MVP version: four scenarios, mechanism text from the brief, outcome as a
  placeholder.
- How to validate: show the scenarios to 3 to 5 pharmacy buyers (K-3 asks
  for client interviews anyway) and ask what they'd still want to know
  before ordering; the count of follow-up questions should drop against a
  version without the section.
- Scores:
  - User value 4: answers the next question after "is this safe", but the
    outcome lines are pending.
  - Differentiation 5: no competitor page read does this (G-1).
  - Feasibility 4: copy only; the policy dependency is the client's.
  - Strategic relevance 5: the brief names disputes as a launch condition.
- Suggested class: MVP, because R-025 already requires the topic and this is
  the cheapest form that makes it useful.
- Changes business direction, budget or scope? no

### IDEA-2 Verification, shown step by step

- Direction: differentiation
- Problem: every competitor says "verified" and almost none says what that
  means (OP-2). Buyers worried about counterfeits (OP-5) need to know who is
  on the other side.
- Target user: trust evaluator, buyer.
- Proposed solution: extend R-011 from a list of steps into a "what we
  check, what blocks you" view. Columns: what the applicant provides
  (licence number, business details, licence documents); who looks at it (a
  platform administrator, a person, not an automatic pass); what the
  applicant can't do meanwhile (list, search, buy); what ends in rejection
  (placeholder: client's verification policy); how long (placeholder, Q-8);
  what is re-checked later (placeholder). The licence check sources stay
  unnamed until the client supplies them.
- Evidence or reasoning: G-2 (`pattern`); "verification is claimed but not
  explained" on [SM], [TN], [RI] (own reading, `pattern`); UP-1
  (`pattern`).
- Differentiation: competitors give one line or a fax instruction; this
  shows the criteria and the gaps openly.
- User value: the evaluator can judge the safeguard instead of trusting a
  word.
- Business value: verification is the brief's "main safeguard"; showing it
  is the core trust argument for a pre-launch site with no proof.
- Technical feasibility: static content.
- Implementation complexity: small.
- Dependencies: R-011, R-034; client verification policy and sources
  (brief, Client Responsibilities). A live licence lookup on the Apply form
  would need a third-party data source: **hard stop 6**, and it belongs to
  the app's registration, not this site.
- Risks: placeholders for criteria and time could read as vague; the copy
  must not imply checks the client hasn't committed to (R-033).
- MVP version: the provide / reviewer / blocked-until / rejected-if /
  how-long view, with the last three as placeholders where the policy is
  missing.
- How to validate: ask a pharmacy owner to explain back, after reading, what
  the platform checks. If they can, the section works.
- Scores:
  - User value 5: the first question every trust evaluator asks.
  - Differentiation 4: InStockRx has a separate verification page (not
    opened), so the gap may be smaller than it looks.
  - Feasibility 5: copy and layout only.
  - Strategic relevance 5: the brief is "built around trust".
- Suggested class: MVP, because it is R-011 done properly at no extra cost.
- Changes business direction, budget or scope? no

### IDEA-3 "Can I list this?" boundary explainer

- Direction: user experience
- Problem: sellers don't know what's accepted, and buyers worried about
  counterfeit or unsafe stock (OP-5) want to see the boundary drawn.
- Target user: seller, trust evaluator.
- Proposed solution: one place that sorts product situations into
  "accepted", "not accepted" and "accepted with conditions", using only
  brief facts: controlled substances and cold-chain products not accepted
  (R-021); expired items hidden automatically; a minimum remaining shelf
  life applies (value set by the platform, not stated, R-012); expiry date,
  lot number and condition required (R-023). Static table by default. An
  enhancement is a client-side question flow ("Is it a controlled
  substance? Does it need refrigeration? Does it have a lot number and
  expiry date?") that ends in the same three answers. No data is sent or
  stored (same rule as R-029).
- Evidence or reasoning: UP-1, G-4 (`pattern`); industry practice
  "only non-controlled, unexpired" (`pattern`).
- Differentiation: competitors state exclusions in a line; few show the
  conditions. Moderate.
- User value: a seller knows before applying whether their surplus
  qualifies.
- Business value: fewer bad listings and fewer applications from pharmacies
  with nothing eligible.
- Technical feasibility: static table, or a few lines of client-side logic
  with no network calls.
- Implementation complexity: small (table), small to medium (question flow
  with accessible focus handling, R-041).
- Dependencies: R-012, R-021, R-023; Q-7 if exclusions change.
- Risks: legality. The flow must not answer "is this sale legal"; it answers
  only "does the platform accept this listing". Copy stays neutral (K-1):
  no line says an accepted item may lawfully be sold. Must not state a
  shelf-life number.
- MVP version: the static three-column table on the selling page.
- How to validate: give 3 sellers 5 sample situations; they sort them
  correctly after reading.
- Scores:
  - User value 4: removes a real pre-apply uncertainty for sellers.
  - Differentiation 3: exclusions are common; the conditions view is less
    so.
  - Feasibility 5: static first.
  - Strategic relevance 4: supports the listing-quality challenge in the
    brief.
- Suggested class: MVP for the static table, high-value enhancement for
  the question flow.
- Changes business direction, budget or scope? no

### IDEA-4 Anatomy of one order: money and records

- Direction: missing capability
- Problem: pharmacies want to know what paperwork each trade leaves behind
  (OP-4) and when money moves (OP-7).
- Target user: both sides, trust evaluator.
- Proposed solution: an annotated timeline of a single order, marked
  "illustrative", with two rails. Records rail: listing record (lot,
  expiry, condition), invoice, tracking number, delivery confirmation,
  order history for both sides, audit log entries. Money rail: buyer pays
  through a third-party provider (no card or bank details stored), platform
  fee recorded on the order, seller payout (timing placeholder, Q-3).
  Tracing-law records for the client's region are one marked placeholder:
  "records required by law in your region: wording pending legal advice".
- Evidence or reasoning: UP-3 (`pattern`, 6 of 16); Trends, paperwork as the
  newer entrants' battleground (`pattern`); Q-1 worry (4) (`inference`).
- Differentiation: moderate. Two entrants show sample documents; this shows
  the whole order's trail and the money in one view, without copying their
  sample invoice device.
- User value: the evaluator sees what they could hand an inspector or
  accountant.
- Business value: answers the paperwork question without claiming
  compliance.
- Technical feasibility: static content and illustration.
- Implementation complexity: small to medium (the illustration).
- Dependencies: R-014, R-015, R-018, R-024; Q-3 (payout), Q-10 (provider
  name), legal advice (K-1).
- Risks: R-022 forbids naming DSCSA or claiming tracing compliance; the
  placeholder must not imply the records satisfy any law. The copy must not
  say payment is held until delivery: the brief doesn't say so (only a
  competitor does).
- MVP version: the records rail and money rail as a static annotated list
  on the How it works pages.
- How to validate: an evaluator lists, from the page alone, what records an
  order produces.
- Scores:
  - User value 4: paperwork is a top-three worry (UP-3).
  - Differentiation 3: competitors already compete here.
  - Feasibility 4: easy content, but placeholders limit it until Q-3 and
    legal advice land.
  - Strategic relevance 5: R-014 and R-015 already require most of this.
- Suggested class: MVP, because it is how R-014 and R-015 should be
  presented.
- Changes business direction, budget or scope? no

### IDEA-5 "Where the legal question stands" section

- Direction: missing capability
- Problem: pharmacies worry whether a pharmacy-to-pharmacy sale is lawful
  (OP-3). R-022 rightly blocks any claim, which leaves the visitor with
  silence on their biggest question.
- Target user: trust evaluator, both sides.
- Proposed solution: a short, plain section on the Trust and security page
  and an FAQ entry that says only what is safe now: resale of medication
  between pharmacies is regulated; rules vary by region; the platform's
  approach is being set with a legal advisor; this page will state it
  before trading opens. Structured slots wait for the advisor's model
  (patient-need attestation or full records per trade, market-research
  "Copy risk"). A copy rule for the whole site travels with it: frame the
  offer as "moving surplus stock between verified, licensed pharmacies",
  not as cheaper restocking (K-1 mitigation).
- Evidence or reasoning: UP-2 (`pattern`, 5 of 16); G-3 (`pattern`); K-1.
- Differentiation: competitors either badge themselves "compliant" or say
  nothing. An honest "here's where this stands" is unusual.
- User value: the evaluator learns the platform knows the issue exists and
  isn't papering over it.
- Business value: protects the client from the headline-copy risk in K-1.
- Technical feasibility: static content.
- Implementation complexity: small.
- Dependencies: R-022, R-034, Q-2, Q-4; client legal advisor.
- Risks: the client may not want to say anything about legality before
  advice; even "rules vary by region" needs their sign-off. Any wording
  here is a placeholder for the advisor, not drafted legal text (R-032).
- MVP version: the four neutral sentences above, marked for client and
  advisor approval, plus the site-wide framing rule.
- How to validate: the client's legal advisor approves or rewrites the
  wording; a tester's search for the R-022 terms finds nothing.
- Scores:
  - User value 4: addresses the most serious worry, though only by saying
    it is open.
  - Differentiation 4: honest about the open question where others badge.
  - Feasibility 4: trivial to build; approval is the dependency.
  - Strategic relevance 5: directly mitigates K-1, rated high impact.
- Suggested class: MVP, because the framing rule is needed anyway and the
  section costs little.
- Changes business direction, budget or scope? no, but the wording needs
  the client's legal advisor before launch.

### IDEA-6 Fee explainer with a worked-example slot

- Direction: user experience
- Problem: sellers want the fee before joining and most competitors hide it
  (OP-6).
- Target user: seller.
- Proposed solution: the Fees page answers four questions, each a marked
  placeholder until Q-3: how much, who pays, when it is charged, what costs
  are not ours (payment provider fees, shipping). It includes a worked
  example with blank values that fill in when the fee is known. After Q-3,
  an enhancement is a client-side "enter a sale price, see the fee and your
  payout" field with no network calls.
- Evidence or reasoning: UP-5 (`pattern`, 6 of 16).
- Differentiation: moderate. One entrant publishes a worked example; most
  don't. The point here is to answer the four questions, not to copy that
  example's format.
- User value: sellers can do the maths before applying.
- Business value: transparent pricing is the clearest edge over the
  incumbents that hide it.
- Technical feasibility: static now; tiny client-side calculator later.
- Implementation complexity: small.
- Dependencies: R-024, Q-3, Q-2 (currency).
- Risks: shipping a calculator with a placeholder fee is useless; R-024
  forbids any amount or "free" claim until Q-3.
- MVP version: the four questions as placeholders, plus the blank worked
  example.
- How to validate: once the fee is set, sellers answer "what would you net
  on a sale of X" correctly from the page.
- Scores:
  - User value 4: fee is a deciding question for sellers.
  - Differentiation 3: one competitor already does it well.
  - Feasibility 4: depends on Q-3 for any real value.
  - Strategic relevance 4: Q-3 is launch-gating anyway.
- Suggested class: MVP for the structure, high-value enhancement for the
  calculator after Q-3.
- Changes business direction, budget or scope? no

### IDEA-7 "Before you apply" readiness list

- Direction: user experience, workflow
- Problem: applicants elsewhere hit friction (fax or email of licences) and
  don't know what they'll need (OP-9). Incomplete applications cost the
  client's admin staff time.
- Target user: applicant (seller, buyer, both); the client's verification
  staff indirectly.
- Proposed solution: above the Apply form, a short list of what to have
  ready: licence number and licensing region, business address, a contact
  who can answer the review, and the licence documents that will be
  uploaded later in the marketplace. Followed by the steps after
  submission (R-030), so the applicant sees the whole path before typing.
  Progress shown if the form is split (P-030).
- Evidence or reasoning: [RS] fax or email step (`fact`); R-027, R-030.
- Differentiation: moderate; a small courtesy competitors skip.
- User value: no abandoned form halfway through for a missing number.
- Business value: more complete applications.
- Technical feasibility: static content.
- Implementation complexity: small.
- Dependencies: R-027 to R-030; Q-11 if fields change.
- Risks: almost none. Must not promise a review time (Q-8).
- MVP version: the list and the next steps on the Apply page.
- How to validate: once submissions are real (Q-6), the share of
  applications missing a licence number or region.
- Scores:
  - User value 4: removes the most common form failure.
  - Differentiation 3: modest.
  - Feasibility 5: copy only.
  - Strategic relevance 4: Apply is the site's single conversion.
- Suggested class: MVP, because it is nearly free and serves the only
  conversion.
- Changes business direction, budget or scope? no

### IDEA-8 One illustrative listing followed end to end

- Direction: creative concept
- Problem: a pre-launch site has no proof (OP-8). The category fills that
  gap with inflated or anonymous claims (G-5). Specific process can stand in
  for proof, but split across pages it reads like a feature list.
- Target user: all visitors, especially the dual-role pharmacy (R-009).
- Proposed solution: one fictional, clearly labelled listing (generic drug
  description, no real brand, R-036) travels through the whole story:
  listed by a seller with its lot and expiry; found and compared by a buyer;
  ordered, shipped with tracking; confirmed on delivery, or put through
  IDEA-1's issue path; leaving IDEA-4's records behind. The same item
  carries both How it works pages, and shows that one pharmacy can sit on
  either side. Labelled "illustrative, not a real order".
- Evidence or reasoning: G-5 (`inference`); R-033; ties OP-1 and OP-4
  together. It also fits the owner's taste for a hero object that stays on
  screen (P-020, candidate) though design decides the form.
- Differentiation: competitors show 3 or 4 generic steps or UI cards
  (`pattern`). A single object's journey is more concrete. Must not copy
  InStockRx's illustrative chats or live-feed device.
- User value: the process becomes easy to follow and remember.
- Business value: gives the site a spine and something distinctive to
  design around, without any invented number.
- Technical feasibility: static content and illustration; motion optional
  and subject to R-042.
- Implementation complexity: medium (imagery and continuity across pages).
- Dependencies: IDEA-1, IDEA-4; R-036 imagery rules; design direction.
- Risks: a fictional listing could be mistaken for real inventory or a real
  price; avoid showing a price, or mark it clearly as an example.
- MVP version: the same item named in each How it works step, text only.
- How to validate: visitors retell the order cycle in the right order after
  one read.
- Scores:
  - User value 4: clearer process than a step list.
  - Differentiation 4: concrete where the category is generic.
  - Feasibility 4: needs imagery work, no services.
  - Strategic relevance 4: replaces proof the client doesn't have.
- Suggested class: high-value enhancement, because it is a structure choice
  the design phase should weigh rather than a requirement.
- Changes business direction, budget or scope? no

### IDEA-9 Report a suspect listing: route for brand-protection teams

- Direction: differentiation
- Problem: buyers fear counterfeit and diverted stock (OP-5), and the 2026
  watchdog report criticises platforms that refuse to work with
  manufacturers' brand-protection teams.
- Target user: trust evaluator, buyer; manufacturers' brand-protection
  teams as a second audience.
- Proposed solution: a short public page stating how anyone can report a
  suspect listing or seller, and a contact for brand-protection and
  manufacturer teams. The contact is a placeholder (Q-9); the commitment
  ("we work with brand-protection teams", any response promise) appears
  only if the client adopts it as policy.
- Evidence or reasoning: [PSM] 2026-03-24 (`fact` that PSM says so); UP-1,
  G-4 (`pattern`).
- Differentiation: strong. Only one competitor is named as cooperating, and
  none read publishes a route on its marketing site.
- User value: buyers see a visible way bad stock gets caught.
- Business value: positions the client well with the watchdog and
  manufacturers.
- Technical feasibility: a static page with a mailto or placeholder; no form
  that sends data (R-031 rule).
- Implementation complexity: small.
- Dependencies: client policy decision; Q-9 contact; R-018 (moderation).
- Risks: publishing a cooperation promise the client won't keep; copy must
  not claim the platform is counterfeit-free (market-research "Copy risk").
- MVP version: "Report a concern" page with a placeholder contact and no
  commitments beyond what R-018 already says.
- How to validate: the client agrees to the policy; a check with one
  brand-protection contact on whether the page is what they'd look for.
- Scores:
  - User value 3: reassuring, but buyers act on it rarely.
  - Differentiation 5: unique in the set read.
  - Feasibility 4: trivial to build, needs a policy.
  - Strategic relevance 4: speaks directly to the category's 2026 risk.
- Suggested class: high-value enhancement, because it needs a client policy
  decision first.
- Changes business direction, budget or scope? yes: it commits the client
  to an operating policy (handling reports, working with manufacturers).
  Owner and client decide.

### IDEA-10 Public "settled and pending" ledger

- Direction: creative concept
- Problem: the site may be public before the marketplace is live (OP-10),
  with many placeholders (fee, review time, regions, dispute policy, legal
  model). Scattered, they look unfinished; hidden, they look evasive. The
  category already suffers from inflated claims (OP-8).
- Target user: trust evaluator.
- Proposed solution: one page (or Trust section) listing what is settled
  (verification required, exclusions, no patient or card data) and what is
  still being decided, each pending item with a plain status line. Every
  R-034 placeholder links to its ledger row. Items move to "settled" as the
  client answers Q-1 to Q-11.
- Evidence or reasoning: Q-6, R-034 (`inference`); G-5 (`inference`).
- Differentiation: strong; no competitor publishes what it hasn't decided.
- User value: the evaluator sees exactly what's known.
- Business value: turns a pre-launch weakness into an honesty signal; also
  a working checklist for the client.
- Technical feasibility: static content.
- Implementation complexity: small.
- Dependencies: R-034, Q-6; client willingness.
- Risks: the client may not want undecided policy on show; it could
  invite "come back later". Must not show internal reasoning or dates the
  client hasn't agreed.
- MVP version: a "Before trading opens" FAQ entry listing the pending items.
- How to validate: client sign-off; evaluators rate the site more credible
  with it than without (small interview check).
- Scores:
  - User value 3: useful to evaluators, not to most visitors.
  - Differentiation 5: unusual in any B2B category.
  - Feasibility 5: copy only.
  - Strategic relevance 3: only matters if the site launches before the
    marketplace (Q-6).
- Suggested class: high-value enhancement, conditional on Q-6.
- Changes business direction, budget or scope? yes: it sets the client's
  public pre-launch posture. Owner and client decide.

### IDEA-11 Print-ready trust brief for the person who signs off

- Direction: user experience
- Problem: the person reading the site may not be the person who approves
  joining (OP-11).
- Target user: trust evaluator passing it to an owner or compliance lead.
- Proposed solution: a print stylesheet for the Trust and security page so
  it prints as a clean one- or two-page brief with the site URL and the
  placeholders visible. No PDF service and no generated download.
- Evidence or reasoning: requirements journey step 7 (`assumption`); no
  research source. Weak.
- Differentiation: modest.
- User value: an easy hand-off inside the pharmacy.
- Business value: small.
- Technical feasibility: CSS only.
- Implementation complexity: small.
- Dependencies: R-018 to R-021.
- Risks: printed copies of placeholder content circulate; mark the date
  printed.
- MVP version: a print stylesheet, no extra UI.
- How to validate: print it and check it reads on its own.
- Scores:
  - User value 3: plausible, unproven.
  - Differentiation 3: rare but minor.
  - Feasibility 5: CSS only.
  - Strategic relevance 3: supports the trust journey at the edges.
- Suggested class: future opportunity, because the evidence is an
  assumption; cheap to add later if interviews confirm the hand-off.
- Changes business direction, budget or scope? no

### IDEA-12 "Where surplus goes today" comparison for sellers

- Direction: differentiation
- Problem: sellers weigh listing against write-off, wholesaler returns and
  informal trades (OP-12).
- Target user: seller.
- Proposed solution: a qualitative table on the selling page: write off,
  return to the wholesaler, sell informally to a nearby pharmacy, list here.
  Rows: who the buyer is checked by, what record exists, who sets the price.
  No numbers.
- Evidence or reasoning: UP-4 (`fact` from one vendor-authored source and
  `hypothesis` on restocking fees); [PSM] on informal online groups
  (`fact`). Weak.
- Differentiation: modest.
- User value: frames the decision sellers actually face.
- Business value: sharper seller pitch.
- Technical feasibility: static content.
- Implementation complexity: small.
- Dependencies: verification of UP-4 (2 or 3 wholesaler return policies);
  legal advice (K-1).
- Risks: legality. Contrasting "informal" trades with this platform implies
  this platform's trades are lawful; that crosses R-022. Calling listings
  "returns" is wrong (market-research). Stating wholesaler fees rests on a
  hypothesis. Copy would have to stay on facts the brief supports (verified
  counterparty, recorded order) until the advisor approves more.
- MVP version: none until UP-4 is verified and the advisor has spoken.
- How to validate: seller interviews on how they handle surplus today.
- Scores:
  - User value 3: relevant, but the framing is risky.
  - Differentiation 3: competitors hint at this, none tabulate it.
  - Feasibility 3: blocked by verification and legal review, not by build.
  - Strategic relevance 3: nice for sellers, not a launch need.
- Suggested class: future opportunity, because the evidence is weak and the
  legal framing isn't settled.
- Changes business direction, budget or scope? no

### IDEA-13 Public sample inventory preview

- Direction: technical opportunity
- Problem: a site with no proof (OP-8); one competitor shows real
  inventory before login.
- Target user: buyer.
- Proposed solution: a browsable listings preview on the marketing site.
- Evidence or reasoning: [RW] (`fact`); G-5.
- Differentiation: none; it copies RxWay's main device.
- User value: some, if the data were real.
- Business value: low pre-launch: there are no listings.
- Technical feasibility: needs the marketplace's data and an API. **Hard
  stop 6.** A fake catalogue would break R-033.
- Implementation complexity: large.
- Dependencies: the app; a non-goal in REQUIREMENTS.md.
- Risks: invented inventory; listings outside verification contradict the
  brief ("Only verified pharmacies can ... list or buy").
- MVP version: none.
- How to validate: n/a.
- Scores:
  - User value 3: real stock is persuasive, when it exists.
  - Differentiation 1: a competitor's device.
  - Feasibility 1: needs the app and a backend.
  - Strategic relevance 2: conflicts with the verified-only model.
- Suggested class: rejected, because it needs the app, copies a competitor
  and has no real data. Would change if the marketplace is live and the
  client wants a public catalogue.
- Changes business direction, budget or scope? yes (hard stop 6) if pursued.

### IDEA-14 Buyer savings calculator

- Direction: user experience
- Problem: buyers want to know what they'd save (OP-6 side).
- Target user: buyer.
- Proposed solution: enter monthly spend, see an estimated saving.
- Evidence or reasoning: competitor savings figures (`pattern`), which
  G-5 criticises as unsourced.
- Differentiation: none; the category already does this badly.
- User value: low; any number would be made up.
- Business value: negative risk.
- Technical feasibility: trivial code, no honest inputs.
- Implementation complexity: small.
- Dependencies: none available.
- Risks: invents savings (R-008, R-033); leans on restocking framing that
  K-1 flags.
- MVP version: none.
- How to validate: n/a.
- Scores:
  - User value 2: a number nobody can trust.
  - Differentiation 1: a category cliché.
  - Feasibility 2: the code is easy, the inputs don't exist.
  - Strategic relevance 1: breaks two must-level requirements.
- Suggested class: rejected. Would change only with real, sourced
  marketplace price data and legal sign-off on the framing.
- Changes business direction, budget or scope? no

### IDEA-15 Chat assistant for trust questions

- Direction: technical opportunity
- Problem: evaluators have many trust questions (OP-2).
- Target user: trust evaluator.
- Proposed solution: an AI or live chat widget.
- Evidence or reasoning: none specific. No research shows visitors asking
  questions in real time; the gap is unpublished answers, which IDEA-1,
  IDEA-2 and IDEA-5 fix by publishing them.
- Differentiation: none.
- User value: low next to a page that answers the question.
- Business value: low; adds cost and a legal-answer risk.
- Technical feasibility: third-party script and service. **Hard stop 6**,
  and R-044 bans unapproved third-party requests.
- Implementation complexity: medium.
- Dependencies: a paid service.
- Risks: a generated answer about legality or verification breaks R-022
  and R-033.
- MVP version: none.
- How to validate: n/a.
- Scores:
  - User value 2: the static answers do the job.
  - Differentiation 1: generic pattern.
  - Feasibility 1: needs a service, blocked by R-044.
  - Strategic relevance 1: adds risk on the most sensitive topics.
- Suggested class: rejected. Would change if post-launch support logs show
  question volume a published FAQ can't absorb.
- Changes business direction, budget or scope? yes (hard stop 6) if pursued.
