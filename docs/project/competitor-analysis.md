# Competitor analysis

Owner: product-researcher. Confidential to this client.

Researched 2026-11-07 at light depth, for the public marketing site. Source
keys ([RS], [IS] and so on) are defined in `market-research.md`. All
screenshots are under `.artifacts/research/<name>/` (1440.png, 834.png,
390.png, styles.json). "Main journey" below means the public-site journey to
sign-up, because the apps sit behind login.

## Landscape

| Product | Type | Serves | Pricing (public) | Link | Accessed |
|---|---|---|---|---|---|
| MatchRX | direct (pharmacy-to-pharmacy, independents) | 7,200+ independent pharmacies in 35 states (claimed, [RI]) | not public on anything read. "Free to post" appears only in search summaries (hypothesis). | https://www.matchrx.com/ (403) | 2026-11-07 |
| RedSail RxMarket (formerly Trxade, then PrimeRx Market) | indirect (wholesaler and supplier aggregator, not pharmacy-to-pharmacy) | 13,500+ "buying community" (claimed) | free to buyers. Suppliers pay a "small transaction fee". | https://www.redsailtechnologies.com/rxmarket | 2026-11-07 |
| InStockRx | direct (pharmacy-to-pharmacy, brand drugs) | 1,900+ pharmacies (own site); 1,600+ (Techstars, July 2026) | $0 to join and buy. 10% seller fee only when a listing sells. | https://www.instockrx.com/ | 2026-11-07 |
| RxPost | direct (pharmacy-to-pharmacy plus inventory tool) | 700+ independent pharmacies (claimed) | free account, no setup fee. Fee details on a separate pricing page (not opened). | https://rxpost-website.pages.dev/ | 2026-11-07 |
| TradeNetRx | direct (pharmacy-to-pharmacy, independents) | independents. No numbers given. | not stated | https://tradenetrx.com/ | 2026-11-07 |
| StockMeds | direct (pharmacy-to-pharmacy) | licensed pharmacies. No numbers given. | not stated | https://stockmeds.com/ | 2026-11-07 |
| RxWay (formerly PharmCareRx) | direct (pharmacy-to-pharmacy) | licensed pharmacies | not stated. Item prices hidden until login. | https://pharmcarerx.com/ | 2026-11-07 |
| EzriRx, pharmacy-to-pharmacy tab (with RPh2RPh) | direct feature inside a wholesale marketplace | EzriRx buyers in select states, same-state trades only | 10% seller fee. Shipping fee set by the platform. | [EZ] (2023-04-28) | 2026-11-07 |
| Indirect: wholesaler returns and reverse distributors | indirect | every pharmacy | restocking fees reportedly 10 to 20% or more (hypothesis, from search summaries) | n/a | 2026-11-07 |
| Indirect: phone calls and informal trades between nearby pharmacies, or writing stock off | indirect | every pharmacy | n/a | [PSM] mentions sales arranged informally "through online groups" | 2026-11-07 |

## Per competitor

### MatchRX

- What it offers: pharmacy-to-pharmacy trading of non-controlled, non-expired
  prescription drugs. Sellers list by "Scan the Square" (2D barcode). Buyers
  search by name or NDC and compare price, quantity and expiry. The seller
  confirms, prints a prepaid label and ships. Over 2 million transactions
  claimed. (`fact` per [RI], a third-party profile dated 2025-06-01.) It
  launched in 2010 as an "eBay for independent pharmacists" (`fact`, [MM]).
- Main journey: not seen. The site returns 403.
- Public claims: "secure, online marketplace", "compliant, practical
  solution", 7,200+ pharmacies, 35 states ([RI]). Its own pages reportedly
  frame trades around a "specific patient need", say posting is free, and
  warn that failing to confirm orders within 2 business days can bring
  cancellation fees or suspension (`hypothesis`, from search summaries only.
  Verify by opening matchrx.com/how-it-works in a normal browser).
- Proof: scale numbers and longevity ("more than a decade") ([RI]). Its own
  testimonials, such as one pharmacy moving close to $50K of obsolete stock,
  appear only in search summaries (`hypothesis`).
- CTAs: not seen.
- Strengths: longest track record and the largest claimed independent network
  (`fact`, [RI]).
- Weaknesses and complaints: no independent reviews readable. Birdeye shows
  4.8 from 121 reviews but rendered none (`fact`, [BE]). Its fee is not public
  in any source read.
- Evidence: `.artifacts/research/matchrx-home.html` (the 403 response body).
- Not inspected: the whole site (403), and the app (login).

### RedSail RxMarket (formerly Trxade, then PrimeRx Market)

- What it offers: price comparison and purchasing across many licensed
  wholesalers and suppliers. Each order goes as a purchase order to the
  supplier, which ships and invoices. No pharmacy-to-pharmacy selling is
  mentioned. Search by product name or NDC. ADD and non-ADD supplier filter.
  Built into the PrimeRx pharmacy system (`fact`, [RS]).
- Main journey: sign up in 3 steps: (1) registration form, (2) e-sign the
  application (labelled "Standard Supplier Application", which looks like a
  copy mistake on a buyer page), (3) fax or email the DEA and state licence.
  The form asks for pharmacy system, DEA or HIN, locations and state. The fax
  step is the visible friction (`fact`, [RS] and the screenshot).
- Public claims: "The Leading Pharmacy Marketplace", "Free to join", "Up to
  90% cost savings", "520+ hours saved annually", "13,500+ buying community",
  "one in three independent pharmacies" (`fact`, [RS]).
- Proof: 6 supplier logos, 5 location-tagged pharmacist testimonials, NABP
  verification of ADD suppliers, a 9-question FAQ (`fact`, [RS]). The
  "Real stories" video block rendered as an empty grey panel in the capture.
- CTAs: "Sign up" (repeated), "Schedule a demo", "RxMarket login", "Become a
  Supplier".
- Strengths: scale, a free buyer model, a clear revenue explanation in the FAQ.
- Weaknesses: the "Up to 90%" claim is unqualified. Community figures
  disagree (13,500 here, 16,000 elsewhere on the site). Onboarding needs fax
  or email (`fact`, [RS]). trxade.com now redirects through primerx.io into a
  login-only app titled "RedSail RxMarket" (`fact`, observed).
- Evidence: `.artifacts/research/redsail-rxmarket/1440.png`.
- Not inspected: the app, and narrower widths (the capture crashed).

### InStockRx

- What it offers: pharmacy-to-pharmacy trading of brand drugs. Buy at the
  listed price or post cash or evergreen offers. List by NDC, 2D barcode
  scan, batch scan or CSV. Chat with the selling pharmacy before buying. Each
  listing shows the seller and its state licence. Buyer blacklist. DSCSA
  transaction information and statements, with 7-year retention. Certified
  listings backed by a wholesaler invoice or EPCIS file. Trading-partner
  groups. Concierge support (`fact`, [IS], [IS-TS]).
- Main journey: "Join free" or "See how it works". Licence and DEA are
  checked before the first trade. A separate "See how we verify pharmacies"
  page exists (not opened).
- Public claims: "Buy and sell brand medication with verified pharmacies you
  can talk to first." 1,900+ pharmacies. "$32M+ saved" against NADAC, with a
  footnote that NADAC is not a negotiated price. Same-day shipping for most
  orders. Surplus sold in about 8 days (`fact`, [IS]).
- Proof: GS1 US Solution Partner badge. Sample invoice and transaction
  statement. Illustrative chats that are explicitly labelled as not real
  testimonials. A worked fee example ($328.20 sale, $32.82 fee) (`fact`,
  [IS]). Named favourably by PSM for working with brand-protection teams
  (`fact`, [PSM]).
- CTAs: "Join free", "See how it works", "Start buying", "Start selling",
  "Talk to our team", "Open the live feed", a phone number.
- Strengths: the most honest and specific public page in the set. The fee,
  the benchmark caveat, the verification and the records are all public.
- Weaknesses: no dispute or return process on the page (`fact`, [IS]). Its
  pharmacy count differs between its site and the July 2026 article. Brand
  drugs only.
- Evidence: `.artifacts/research/instockrx/`.
- Not inspected: the verification page, the app.

### RxPost

- What it offers: pharmacy-to-pharmacy marketplace plus inventory tool.
  Manual, spreadsheet or pharmacy-system listing. Shortage alerts. Offers and
  counter-offers. Automatic licence checks on every counterparty. Checks the
  specific patient need rule and state transfer limits before a sale. T3 with
  every order. ACH payouts (`fact`, [RP]).
- Main journey: 4 steps, "From sign-up to paid": verify licence, list or
  find, transact, ship and get paid.
- Public claims: "Stock smarter. Pay less for meds, earn more on surplus."
  21.8% average discount against WAC. $12.3K+ average savings in 30 days.
  $80.8K+ average cash from surplus in 60 days. 700+ pharmacies (`fact`,
  [RP]).
- Proof: stat chips. No testimonials or badges seen. Stock photography
  credited to Pexels.
- CTAs: "Create free account", "Book a demo", "Talk to a specialist".
- Strengths: the only site read that says it checks the patient-need rule and
  state limits in the product.
- Weaknesses: averages are given without a base or method. Disputes and
  returns are not addressed. Several homepage sections rendered blank in the
  headless capture, probably scroll-triggered animation (`inference`; seen in
  the screenshot, cause not confirmed).
- Evidence: `.artifacts/research/rxpost/`.
- Not inspected: the pricing page, the app.

### TradeNetRx

- What it offers: pharmacy-to-pharmacy trading of non-controlled, in-date
  drugs, plus OTC and supplements. Payment held "in trust" until the buyer
  confirms receipt. FedEx shipping (`fact`, [TN]).
- Main journey: 4 steps: the seller lists, the buyer orders, the seller
  confirms and ships with a signed packing slip, and the seller is paid after
  delivery.
- Public claims: "Pharmacy Marketplace", "reduce drug waste", "acquire
  unavailable drugs". No numbers.
- Proof: a "DSCSA compliant" badge linking to a page that quotes the statute
  and the 2017 draft guidance. NCPA and FedEx logos. Three anonymous
  testimonials ("Anonymous Seller, New York, NY") (`fact`, [TN], [TN-D], the
  screenshot).
- CTAs: "Sign up", "Sign in", "Register here", "Join our trusted
  marketplace".
- Strengths: the only site that states payment is held until receipt. Its
  DSCSA page cites primary law.
- Weaknesses: verification is called "thorough" with no detail. No fee. No
  disputes. Anonymous testimonials weaken trust. The "DSCSA compliant" badge
  looks self-awarded (`inference`: no issuer is named).
- Evidence: `.artifacts/research/tradenetrx/`.

### StockMeds

- What it offers: a pharmacy-to-pharmacy marketplace for FDA-approved,
  non-controlled prescription drugs. An NDC lookup. Shipping and packing
  guideline pages (`fact`, [SM]).
- Main journey: "Join Now" leads to a portal at my.stockmeds.com.
- Public claims: "Empowering Pharmacies to Trade Medications with
  Confidence", "verified community of licensed pharmacies". No numbers.
- Proof: first-name testimonials (Priya, Jane, Chris). NCPA corporate member,
  DSCSA, FedEx and Stripe badges. A blog dated 2025 to 2026 (`fact`, [SM]).
  Trustpilot has 0 reviews (`fact`, [TP]).
- CTAs: "Join Now", "Login", "Contact Us", "NDC Lookup", newsletter.
- Weaknesses: verification, fees, payment flow and disputes are all
  unexplained on the homepage.
- Evidence: text through WebFetch only. The screenshot timed out.

### RxWay (formerly PharmCareRx)

- What it offers: a public listings table of real items (NDC, lot, expiry,
  packaging, full or partial, star rating, % off WAC). Filters for expiry
  (>1, >3, >6 months), wholesaler certification and documents. "Wanted Meds"
  requests. A timed cart hold (`fact`, [RW]).
- Main journey: browse publicly, then "Log in to view price & Add to cart".
- Proof: listing badges ("Purchase Invoice", "Track & Trace", "Best deal"),
  5.0 seller ratings.
- CTAs: "Login", "Register", "Post Listing".
- Strengths: shows real inventory before login, which is the strongest
  "this is real" signal in the set.
- Weaknesses: no explanation page on the homepage. Default Bootstrap styling.
  Mostly 5.0 ratings give little signal.
- Evidence: `.artifacts/research/rxway/`.

### EzriRx pharmacy-to-pharmacy (RPh2RPh)

- What it offers: a third marketplace tab inside EzriRx. ACH only. A UPS
  label from the platform. Same-business-day shipping required. One-at-a-time
  listing (bulk upload off). Minimum discounts (generics 25% off AWP, brands
  8% off WAC). No resale of bought items. The buyer attests at checkout that
  the purchase meets a DSCSA exemption. Same-state trades only, in select
  states. Not VAWD accredited (`fact`, [EZ], 2023).
- Strengths: the clearest written rules of any source read.
- Weaknesses: help-centre only, dated 2023, and contradicts itself on payout
  timing (`fact`, [EZ]).

## Feature and experience comparison

Public-site claims only.

| Capability | MatchRX | RedSail RxMarket | InStockRx | RxPost | TradeNetRx | StockMeds | RxWay | This brief |
|---|---|---|---|---|---|---|---|---|
| Pharmacy-to-pharmacy | yes | no (suppliers) | yes | yes | yes | yes | yes | required |
| Verification explained publicly | no (not seen) | partial: DEA and state licence by fax or email | partial: licence and DEA before first trade, separate page | partial: automatic licence checks | no: "thorough" | no | no | required (admin review, licence upload) |
| Fee published | no | yes (buyer free) | yes, 10% with an example | partial (separate page) | no | no | no | required in app. Not decided for the site. |
| DSCSA records explained | not seen | no (separate product) | yes, T3 and 7 years | yes, T3 on every order | badge plus statute page | badge only | listing tags | not mentioned |
| Patient-need or state-limit handling | hypothesis: patient-need framing | n/a | not stated | yes, checked before sale | statute quoted | no | no | not mentioned (legal advisor) |
| Payment protection stated | not seen | n/a | no | no | yes, held until receipt | no | no | required (third-party provider) |
| Disputes and returns explained | not seen | no | no | no | no | no | no | required in app. Policy is the client's to define. |
| Real inventory visible before login | not seen | no | sample cards | no | no | no | yes | not mentioned |
| Numbers as proof | yes | yes, large and unqualified | yes, with caveats | yes, averages without a base | no | no | no | client has none yet (pre-launch) |
| Testimonials | not seen | 5, location-tagged | none (labelled illustrative) | none | 3 anonymous | 3 first-name | ratings | none yet |

## Gaps

What no competitor does well, with the evidence.

| ID | Gap | Evidence | Label |
|---|---|---|---|
| G-1 | No public page explains what happens when an order arrives wrong, short or damaged (disputes, returns, refunds) | absent on [RS], [IS], [RP], [TN], [SM], [RW], [EZ] | pattern (7 of 7) |
| G-2 | Verification is asserted, not shown. Nobody publishes what is checked, by whom, how long it takes, and what gets an applicant rejected. | [SM], [TN] give no detail. [IS] and [RP] give one line. [RS] relies on fax. | pattern |
| G-3 | Plain-language legal limits (what you may buy, why, what the paperwork is) are missing or buried. Only RxPost and EzriRx address patient need and state limits, and neither does it on a marketing page with full explanation. | [RP], [EZ], [TN-D]; absent on [IS], [SM], [RS] | pattern |
| G-4 | Counterfeit safeguards: only InStockRx shows source proof (certified listings with an invoice or EPCIS file). PSM says the category is exposed. | [IS], [RW] tags, [PSM] | pattern |
| G-5 | Proof without inflation: most proof is unqualified ("Up to 90%"), anonymous, or averages without a base. A pre-launch site has no numbers anyway, so it can win on specifics and process instead. | [RS], [TN], [RP]; counter-example [IS] footnote | inference |
| G-6 | Independent social proof is absent across the category (0 readable reviews) | [TP], [BE] | fact (for pages read) |

## Visual language of the category

For context only. Design direction belongs to another agent. The owner has
rejected both an editorial black-on-beige look and a cool white, navy and
cobalt SaaS look.

| Site | Palette (measured or seen) | Type | Imagery | Capture |
|---|---|---|---|---|
| RedSail RxMarket | saturated red, white, mid grey | thin all-caps headings | a hand holding blister packs, line icons, supplier logos | redsail-rxmarket/1440.png |
| TradeNetRx | white, black bands, tan (#CCAF9B headings) | Roboto Condensed and Roboto Slab | a spilled orange pill bottle, a pharmacy shelf photo, clip-art icons | tradenetrx/ |
| RxPost | white, pale teal sections, orange CTA, sage and amber headline accent | Plus Jakarta Sans and Inter | white pills in a teal blob, floating stat chips | rxpost/ |
| InStockRx | warm off-white and cream, dark green bands, orange CTA, ink #2A281E | Commissioner | product UI cards, sample invoices, chat bubbles | instockrx/ |
| RxWay | white, Bootstrap blue (#0D6EFD) buttons | Helvetica | packaging thumbnails in a data table | rxway/ |

- Pills, blister packs and pill bottles as hero imagery: 3 of 5 captured
  (RedSail, TradeNetRx, RxPost) (`pattern`).
- Orange CTA on a light background: 2 of 5, the two newest entrants (InStockRx,
  RxPost) (`pattern`, small sample).
- InStockRx's warm off-white with a dark band sits close to the rejected
  "editorial beige". RxWay and the generic SaaS look sit close to the rejected
  "cool blue" (`inference`).
- No site uses imagery of real independent pharmacies or their people in a
  specific, owned way. Photography is stock (RxPost credits Pexels) or product
  shots (`fact` for RxPost; `inference` for the rest, from the captures).

## What not to copy

- InStockRx's headline structure ("verified pharmacies you can talk to
  first"), its certified-listing concept and its live-feed naming are
  distinctive to it.
- MatchRX's "Scan the Square" name, and RedSail's "RxMarket" naming.
- Any competitor's numbers, testimonials or savings figures. The client is
  pre-launch and has none of its own yet.
- RedSail's red, InStockRx's green, cream and orange, and RxPost's teal and
  orange as a set.
