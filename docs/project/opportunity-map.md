# Opportunity map

Owner: innovation-strategist. Each opportunity is a problem or gap worth
solving. Ideas in idea-backlog.md trace back to these.

Depth: light (product-decisions.md). Scope: the public marketing site (D-1).
Every opportunity below is something the site can answer with content,
page structure, a client-side explainer or the Apply flow. Research IDs
(UP-n, G-n, Q-n) and labels come from market-research.md and
competitor-analysis.md. Independent user reviews barely exist in this
category (K-3), so most evidence is from competitor pages and industry
watchdogs, not from pharmacies themselves.

| ID | Opportunity | Who it affects | Evidence (IDs from research) | Strength | Covered by brief? |
|---|---|---|---|---|---|
| OP-1 | Nobody explains what happens when an order arrives short, damaged, wrong or near expiry: who decides, what evidence counts, what the buyer and seller each do | Buyer, seller | G-1 (absent on 7 of 7 competitor pages, `pattern`); UP-6 (`inference`, 0 user complaints found); brief Key Challenges names "Disputes and returns" | moderate | partly: R-014, R-025 (mechanism yes, policy is a placeholder) |
| OP-2 | Verification is claimed but not shown: what is checked, by whom, what blocks an applicant, how long it takes | Trust evaluator, buyer | G-2 (`pattern`); "verification claimed but not explained" theme on [SM], [TN], [RI]; UP-1 (`pattern`) | strong | partly: R-011 (steps yes, criteria and time are client inputs) |
| OP-3 | Pharmacies are unsure whether a pharmacy-to-pharmacy sale is lawful, because the federal exemption covers a specific patient need, not restocking. The site can't settle this but can stop hiding it. | Both, trust evaluator | UP-2 (`pattern`, 5 of 16 pages); G-3 (`pattern`); K-1 | strong (that the worry exists); the answer is the legal advisor's | partly: R-022 forbids claims; nothing tells the visitor where the question stands |
| OP-4 | Pharmacies need to know what records each trade produces and keeps | Both, trust evaluator | UP-3 (`pattern`, 6 of 16 pages); newer entrants compete on paperwork (Trends, `pattern`) | strong | partly: R-014 mentions invoices and order history; R-018 the audit log; tracing-law records are blocked by R-022 until legal advice |
| OP-5 | Buyers fear counterfeit or diverted product reaching them through another pharmacy | Buyer, trust evaluator | UP-1 (`pattern`); G-4 (`pattern`); [PSM] 2026 report (`fact` that PSM says so); PSM favours platforms that work with brand-protection teams | strong | partly: R-011, R-021, R-023 (safeguards exist, nothing frames them against this fear) |
| OP-6 | Sellers want the fee before joining; most competitors hide it | Seller | UP-5 (`pattern`, 6 of 16) | strong | partly: R-024 (fee exists, amount pending Q-3) |
| OP-7 | Money flow is unclear: when the buyer is charged, what delivery confirmation does, when the seller is paid | Both | Q-1 worry (4) (`inference`); only TradeNetRx states payment is held until receipt ([TN], `fact`) | moderate | partly: R-015 (provider, no card storage); payout timing pending |
| OP-8 | Category proof is inflated, anonymous or unsourced, and this client is pre-launch with no proof at all | Trust evaluator | G-5 (`inference`); G-6 (`fact` for pages read); R-033 | moderate | yes as a constraint (R-033); no positive replacement for proof |
| OP-9 | Applying is friction-heavy elsewhere (fax or email licences) and applicants don't know what to have ready | Applicant (seller, buyer) | RedSail sign-up needs fax or email of DEA and state licence ([RS], `fact`); R-027 defers documents to the app | moderate | partly: R-027, R-030 |
| OP-10 | The site may be read before the marketplace is live; "Apply" and pending placeholders could read as overpromise or as an unfinished site | All visitors | Q-6 and R-034 (`inference`); many launch-gating placeholders (Q-1, Q-3 to Q-6) | moderate | partly: R-029 notice, R-034 markers |
| OP-11 | The person who reads the site (a buyer or tech) is often not the person who signs off (owner, compliance lead) | Trust evaluator | Requirements journey "Trust evaluator" step 7 (`assumption`); no research source | weak | partly: R-002 |
| OP-12 | Sellers weigh this against write-off, wholesaler returns and informal trades | Seller | UP-4 (`fact` from one vendor-authored source plus `hypothesis` on restocking fees); indirect competitors row ([PSM] mentions informal online groups) | weak | partly: R-006, R-007 |

Strength: `strong` is backed by facts or patterns from several sources,
`moderate` by one good source or a sound inference, and `weak` by a
hypothesis only.

## Directions explored

| Direction | Opportunities | Ideas | Skipped? Why |
|---|---|---|---|
| Differentiation | OP-1, OP-2, OP-5 | IDEA-1, IDEA-2, IDEA-9 | not skipped. The category's gaps are explanation gaps, which a marketing site can close cheaply. |
| User experience | OP-6, OP-9, OP-11 | IDEA-6, IDEA-7, IDEA-11 | not skipped |
| Workflow | OP-9 (client's admin staff get fewer incomplete applications) | IDEA-7 | partly skipped: staff workflow lives in the app (D-1) |
| Missing capabilities | OP-1, OP-3, OP-4, OP-7 | IDEA-1, IDEA-4, IDEA-5 | not skipped |
| Creative concepts | OP-8, OP-10 | IDEA-8, IDEA-10 | not skipped |
| Technical opportunities | OP-2, OP-8 | IDEA-13, IDEA-14, IDEA-15 (all suggested rejections); IDEA-3 and IDEA-11 use client-side code only | mostly skipped: a static site with no backend (D-1) and no third-party requests (R-044). Every external service hits hard stop 6. |
