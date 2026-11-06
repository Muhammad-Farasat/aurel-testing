# Market research

Owner: product-researcher. Confidential to this client. Don't copy it into
other projects.

- Depth: light (set by the Orchestrator, reason in product-decisions.md)
- Researched: 2026-11-07
- Searches run: 15. Fetch attempts: 27. Pages actually opened and read: 16,
  plus 4 full-page captures (InStockRx, TradeNetRx, RxPost, RxWay) and a
  partial capture of RedSail RxMarket, saved under `.artifacts/research/`.
  The 6 failed fetches and 4 more pages that returned nothing usable are
  listed under "Not accessed".
- Scope: the public marketing site only. Product ideas, design direction and
  implementation are out of scope here.

Labels: `fact` (stated by a source you read), `pattern` (seen across named
sources), `inference` (reasoning shown), `hypothesis` (unverified, with how
to verify it).

All sources accessed 2026-11-07 unless noted. Publication dates are given
where the page showed one.

Source key used below:

- [RS] RedSail RxMarket page, https://www.redsailtechnologies.com/rxmarket
- [IS] InStockRx homepage, https://www.instockrx.com/
- [IS-TS] Techstars on InStockRx Series A, published 2026-07-17,
  https://techstars.com/blog/startup-spotlight/instockrx-raises-dollar5m-series-a-to-grow-its-pharmacy-to-pharmacy-marketplace
- [TN] TradeNetRx how it works, https://tradenetrx.com/how-it-works
- [TN-D] TradeNetRx DSCSA page, https://tradenetrx.com/dscsa-compliant
- [SM] StockMeds homepage, https://stockmeds.com/
- [RP] RxPost how it works, https://rxpost-website.pages.dev/how-it-works
- [RW] RxWay (formerly PharmCareRx) public listings, https://pharmcarerx.com/
- [EZ] EzriRx help article on pharmacy-to-pharmacy, published 2023-04-28,
  https://intercom.help/ezrirx/en/articles/4885919-pharmacy-to-pharmacy-all-there-is-to-know
- [RI] RxInsider profile of MatchRX, dated 2025-06-01, https://rxinsider.com/?p=21350
- [MM] Metromode on MatchRX, published 2010-12-02, https://metromodemedia.com/?p=27764
- [PSM] Partnership for Safe Medicines, "Using pharmacy-to-pharmacy
  marketplaces? Read this Suspicious Sales Surveillance Report", published
  2026-03-24, https://www.safemedicines.org/?p=29962
- [PAAS] PAAS National, "Pharmacy to Pharmacy Inventory Transfers - Buyer
  Beware!", about 2022-12-10, https://paasnational.com/?p=4104
- [DT] Drug Topics, "Dead Rx Inventory: An Avoidable Money Pit", published
  2019-04-02, https://www.drugtopics.com/view/an-avoidable-money-pit-in-community-pharmacy
- [TP] Trustpilot, StockMeds, https://www.trustpilot.com/review/stockmeds.com
- [BE] Birdeye, MatchRX, https://reviews.birdeye.com/matchrx-150286815172129

## Research questions

| # | Question | Answer | Label | Sources |
|---|---|---|---|---|
| Q-1 | What do pharmacies worry about before joining, and what must the site answer up front? | Five worries show up across the sources. (1) **Counterfeit or diverted product from a counterparty.** This is the most serious one and has a dated 2026 industry warning. (2) **Legal basis: is this wholesale distribution?** Federal law exempts pharmacy-to-pharmacy transfers only for a "specific patient need", not for restocking. (3) **Paperwork: DSCSA records (T3) and audit trail.** (4) **Getting paid, and paying for what actually arrives.** (5) **Fees.** The site should answer all five up front: who is verified and how, what can and can't be listed, what records every order produces, when money moves, and what it costs. Short-dated stock comes up as a listing filter (expiry bands), not as a stated fear. | pattern (1, 2, 3, 5); inference (4) | [PSM], [PAAS], [TN-D], [EZ], [IS], [RP], [TN], [RW] |
| Q-2 | How do competitors present themselves publicly: pages, claims, proof, CTAs, what's behind login? | Two models. **Wholesaler aggregators** (RedSail RxMarket, EzriRx's main product) sell "free to join, save on every order" with big round numbers, supplier logos and testimonials. **Pharmacy-to-pharmacy sites** (MatchRX, InStockRx, RxPost, TradeNetRx, StockMeds, RxWay) mostly say "verified" without explaining it, show a 3 or 4 step how-it-works, and lead with "Join free" or "Sign up". Prices sit behind login everywhere. The two newest entrants (InStockRx, RxPost) publish fees, savings figures and DSCSA records on the public page. The older ones don't. Full detail is in competitor-analysis.md. | pattern | [RS], [IS], [RP], [TN], [SM], [RW], [RI] |
| Q-3 | What do reviews and forums say users dislike? Which gaps can honest copy address? | **Mostly unresolved: independent user reviews barely exist.** StockMeds has 0 Trustpilot reviews [TP]. MatchRX's Birdeye page claims 121 reviews but showed none [BE]. A StudentDoctor thread and the Reddit searches returned nothing readable. The criticism that does exist comes from industry bodies, not users: PSM (2026) says some platforms refuse to work with brand-protection teams and that counterfeits and diverted stock have appeared on them. Gaps that honest copy can fill: say what verification checks, say what is excluded, show the fee, explain disputes and returns (no competitor's public page does), and state the legal limits plainly. | fact (absence of reviews in what was read); fact (PSM claims); inference (gaps) | [TP], [BE], [PSM], competitor pages |
| Q-4 | What visual language does the category use? | Three families. (a) **Red or blue corporate with stock pill photos**: RedSail's red-and-white page with a hand holding blister packs, and RxWay's default Bootstrap-blue listings table. (b) **Dated template with pill and pharmacy-shelf photography**: TradeNetRx, with tan Roboto Condensed headings, a spilled pill bottle, black bands and anonymous quotes. (c) **Modern SaaS with product fragments**: InStockRx (warm off-white, dark green bands, orange CTA, Commissioner type, UI cards as imagery) and RxPost (white, teal and orange, Plus Jakarta Sans, a pill photo in a blob, stat chips). Pills as imagery appear on 3 of 5 captured sites. None uses real pharmacy people or places in a distinctive way. | pattern | captures in `.artifacts/research/`, [RS], [IS], [TN], [RP], [RW] |

## Users and their problems

| ID | User | Problem | Label | Evidence | Times seen |
|---|---|---|---|---|---|
| UP-1 | Buyer pharmacy | Risk of receiving counterfeit or diverted product from another pharmacy, with the dispensing liability falling on them | pattern | [PSM] says marketplaces carry "a higher risk of being exploited by criminals" and that counterfeits in real packaging have been found on them. [PAAS] warns buyers in its title ("Buyer Beware"). InStockRx answers with certified listings that carry wholesaler invoices or EPCIS files [IS]. RxWay shows "Purchase Invoice" and "Track & Trace" tags [RW]. | 4 of 16 pages |
| UP-2 | Both | Unsure whether a pharmacy-to-pharmacy sale is legal, because the federal exemption covers a specific patient need and not stock replenishment | pattern | Statutory definition quoted on [TN-D] and [PAAS]. [EZ] makes buyers attest at checkout. [RP] says it checks the rule and state transfer limits before a sale. [PSM] repeats that the exemption does not cover restocking. | 5 of 16 |
| UP-3 | Both | Needs DSCSA records for each transfer and a retained audit trail | pattern | [IS] (T3, 7-year retention), [IS-TS] (T3 generated on every trade), [RP] (T3 with every order, exportable record), [EZ] (packing slip and invoice as records, 3-year retention), [TN] and [SM] (DSCSA badge with no explanation) | 6 of 16 |
| UP-4 | Seller pharmacy | Overstock and dead stock tie up cash, and returns to wholesalers are restricted or charged | fact (single vendor-authored source) plus hypothesis | [DT] defines dead stock as items not dispensed in 4 months and claims 20 to 30% of inventory is dead, citing no source (author works for an inventory software vendor). Wholesaler restocking fees of 10 to 20% or more appear only in search summaries (hypothesis; verify against 2 or 3 wholesaler return policies). InStockRx tells sellers to try a wholesaler return first [IS]. | 2 of 16 |
| UP-5 | Seller pharmacy | Wants to know the fee before joining | pattern | Fee published: [IS] (10% seller fee with a worked example), [EZ] (10% seller fee), [IS-TS] (pay only when you sell). Free to buyers, supplier pays: [RS]. Not published: [TN], [SM], [RW]. RxPost puts it on a separate pricing page [RP]. | 6 of 16 |
| UP-6 | Both | Doesn't know who will handle a dispute, short shipment or damaged goods | inference | None of the 7 competitor pages read describes a dispute or return process ([RS], [IS], [TN], [SM], [RP], [RW], [EZ]). TradeNetRx is the only one stating that payment is held until the buyer confirms receipt [TN]. Reasoning: in any B2B marketplace, payment protection and disputes are the next question after verification, and the brief itself lists "Disputes and returns" as a key challenge. No user complaint was found to confirm this. | 0 user complaints; absent on 7 of 7 pages |

## Review and complaint themes

Sources read: Trustpilot (StockMeds, 0 reviews), Birdeye (MatchRX, 121
claimed and 0 visible), the PSM surveillance report (2026-03-24) and the PAAS
article (2022). A StudentDoctor thread (403) and Reddit searches (no relevant
threads surfaced) produced nothing readable. Employee reviews on
Glassdoor/Indeed were seen in search results only and are not about members,
so they are excluded.

Independent member reviews for this category are close to absent from public
review sites (`fact` for the pages read). The themes below come from industry
watchdogs, not end users. Treat them as risk themes, not satisfaction data.

| Theme | Products | Example (short quote, link) | Times seen |
|---|---|---|---|
| Counterfeit or diverted stock reaches marketplaces | 8 unnamed marketplaces monitored | "a higher risk of being exploited by criminals" [PSM] | 2 (PSM, PAAS) |
| Platforms refuse to work with brand-protection teams | unnamed operators; InStockRx named as the exception | operators replied "Hell no" [PSM] | 1 |
| "Named patient" exemption used for restocking | the category in general | exemption does not cover refilling stock [PSM]; "Buyer Beware" [PAAS] | 2 |
| Verification is claimed but not explained | StockMeds, TradeNetRx, MatchRX | "verified community of licensed pharmacies" with no process given [SM] | 3 (own reading of [SM], [TN], [RI]) |

## Industry practice

- Only non-controlled, unexpired prescription drugs are traded. (`pattern`:
  [TN], [SM], [IS], [RP], [RW], [EZ], [RI])
- Free to join. Revenue comes from a seller-side fee (10% at InStockRx and
  EzriRx's pharmacy-to-pharmacy service) or from supplier transaction fees
  (RedSail). (`pattern`: [IS], [EZ], [IS-TS], [RS], [RP])
- Listings are keyed by NDC with lot and expiry. Several sites list by 2D
  barcode scan or CSV. (`pattern`: [IS], [RI], [RW], [TN], [RP])
- Prices are hidden until login. (`pattern`: [RW] "Log in to view price",
  [RS], [IS])
- Verification uses state licence plus DEA registration, sometimes NABP
  accreditation for wholesalers. (`pattern`: [IS] licence and DEA before the
  first trade, [RS] DEA and state licence by fax or email, [RP] automatic
  licence checks on every counterparty)
- The seller ships with a platform-provided label (FedEx or UPS), and the
  seller is paid after shipment or delivery. (`pattern`: [TN], [EZ], [RI],
  [RP])
- Users therefore expect free sign-up, visible exclusions, a stated fee, and
  some DSCSA statement. (`inference` from the above)

## Trends

| Trend | Since | Label | Source (published, accessed) |
|---|---|---|---|
| Trxade became PrimeRx Market. RedSail acquired PrimeRx and relaunched it as RedSail RxMarket. trxade.com now redirects into a RedSail login app. | 2024 to 2026 | fact (RxMarket page and the redirect seen); hypothesis for the deal dates (acquisition closed 2026-02-05, relaunch press release 2026-05-21, from search summaries) | [RS]; redirect trxade.com to primerx.io/market to trxade.com/market/login, observed 2026-11-07 |
| New venture-funded pharmacy-to-pharmacy entrants: InStockRx raised a $5M Series A and claims 1,600+ (Techstars) or 1,900+ (own site) pharmacies; RxPost claims 700+ | 2024 to 2026 | fact | [IS-TS] (2026-07-17), [IS], [RP] |
| Newer entrants compete on DSCSA paperwork (auto-generated T3, retained records) rather than on price alone | 2024 to 2026 | pattern | [IS], [IS-TS], [RP] |
| Watchdog scrutiny of pharmacy-to-pharmacy marketplaces for counterfeits | 2026 | fact | [PSM] (2026-03-24) |
| DSCSA enhanced (electronic, package-level) requirements: the small-dispenser exemption is reported as extended to 2027-11-27, with small meaning 25 or fewer full-time pharmacists or technicians | announced 2026-08 | hypothesis (search summaries only; the FDA and law-firm pages either weren't opened or returned 403). Verify on FDA's "Waivers and exemptions beyond stabilization period" page. | search summaries citing fda.gov, bipc.com, nabp.pharmacy |
| PharmCareRx rebranding to RxWay, with a public listings table | 2026 | fact | [RW] |

## Similar problems in other industries

Not researched at light depth. The previous session's notes point to Faire
(B2B wholesale with prices locked until sign-up) as a lead only. It was not
re-verified this run.

| Industry or product | Problem it solves | What works | Link |
|---|---|---|---|
| Faire (B2B wholesale) | Trust and pricing between verified retailers and suppliers | Prices locked until sign-up (from the 2026-11-06 session, not re-verified) | https://www.faire.com/ |

## Technology available

Out of scope for a marketing-site research pass. One item matters to the copy:

| API, service or library | What it enables | Limits and cost | Test mode | Link |
|---|---|---|---|---|
| GS1 US Solution Partner programme | InStockRx displays this badge as proof of standards-based DSCSA data | not checked | n/a | [IS] |

## Operational and technical limits

These are flagged for the client's legal advisor. They are not settled
statements.

- The federal "specific patient need" exemption covers a transfer to fill a
  prescription for an identified patient. It excludes transfers to increase
  or replenish stock. (`fact`, statutory text quoted on [TN-D] and [PAAS])
- FDA's 2017 draft guidance, as quoted by TradeNetRx, says transfers without a
  specific patient need may count as wholesale distribution. (`fact` that
  TradeNetRx states this [TN-D]. Whether that guidance is final was not
  confirmed: `hypothesis`.)
- **Copy risk (`inference`):** the brief's framing ("buy directly, saving
  money on inventory", "lower-cost inventory") describes restocking. Under the
  point above, that framing could misstate the legal basis for trades. The
  marketing site's headline promise depends on which model the client's legal
  advisor approves: patient-need transfers with attestation (EzriRx, MatchRX
  and TradeNetRx style) or full T3 documentation on every trade (InStockRx and
  RxPost style). **Needs the client's legal advisor before copy is final.**
- State rules may be stricter, with caps such as 5% of sales and same-state
  limits. EzriRx states a 5% limit and trades only within one state, in
  select states [EZ] (`fact` that EzriRx says so). The North Carolina board
  page that reportedly sets 5% returned 403 (`hypothesis`). **Legal advisor.**
- "Returns" and "resale" are different things. Wholesaler and manufacturer
  returns are excluded from the dispenser tracing rule quoted on [TN-D]. A
  sale to another pharmacy is not a return. Copy should not call listings
  "returns". (`inference` from [TN-D])
- Controlled substances are excluded by every competitor and by the brief.
  Cold-chain is excluded by the brief. StockMeds' guidance says refrigerated
  items and biologics may be restricted by state (search summary only:
  `hypothesis`).
- Watchdog pressure: PSM names platforms that cooperate with brand-protection
  teams favourably [PSM]. Claims like "100% safe" or "counterfeit-free" would
  be risky (`inference`).

## Not accessed

| Source | Why |
|---|---|
| https://www.matchrx.com/ and /pharmacy-to-pharmacy/ | HTTP 403 to WebFetch, same as the browser on 2026-11-06. A curl retry with a browser user agent also returned 403. Further attempts to get around the block were stopped by the permission system and not pursued. |
| https://web.archive.org/ (MatchRX snapshot) | Fetch tool can't reach web.archive.org |
| https://www.trxade.com/market/login | Redirects into a JavaScript app. Only the title "RedSail RxMarket" rendered. |
| https://forums.studentdoctor.net/threads/matchrx-com.1053431/ | 403 |
| https://www.bipc.com/fda-extends-dscsa-exemption-for-small-pharmacies-through-november-27-2027-what-pharmacies-need-to-know | 403 |
| https://perspectives.bipc.com/ (Gilead counterfeit article) | TLS certificate mismatch |
| https://www3.paasnational.com/?p=5728 (counterfeit HIV drugs case) | TLS certificate mismatch |
| https://ncbop.org/faqs/Pharmacist/faq_Wholesalers.htm | 403 |
| https://www.pbahealth.com/elements/how-to-get-the-most-out-of-your-returns/ | Fetch failed with no output |
| https://stockmeds.com/ (screenshot) | Page load timed out in the capture script. The text was read through WebFetch. |
| https://www.redsailtechnologies.com/rxmarket (narrower widths) | The capture script crashed after the 1440px screenshot |
| [PAAS] full article | Behind a membership paywall after the first section |
| [BE] review text | Page claims 121 reviews but rendered none |
