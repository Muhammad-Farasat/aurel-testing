# Product decisions

Owner: Orchestrator. One entry per decision about product scope: research
depth, idea classification, scope changes. Never delete an entry. Mark it
superseded instead.

Classes:

- `MVP`: essential for the first useful release
- `high-value enhancement`: worth building soon after the MVP
- `future opportunity`: interesting, not needed now
- `rejected`: low value, too complex, unsupported, or out of scope

Decided by `Orchestrator` for low-risk calls, or `owner` when the decision
changes business direction, budget or agreed scope.

## Research depth

- Depth: light
- Why: a marketing site for a familiar product type (B2B pharmacy
  marketplace, comparable to MatchRX and Trxade). The product scope is fixed
  by the proposal. The open questions are about what convinces pharmacies to
  apply and how competitors present themselves, not about what to build.

Research questions (each could change the site's content or structure):

1. What do pharmacy owners and buyers worry about before joining an
   overstock or secondary-market platform (counterfeits, DSCSA/pedigree,
   payment risk, fees, returns, short-dated stock)? Which of these must the
   site answer up front?
2. How do MatchRX, Trxade/RedSail RxMarket, PharmaBid-style and other
   pharmacy-to-pharmacy marketplaces present themselves publicly: pages,
   claims, proof, calls to action, what they hide behind login?
3. What do reviews and forums say users dislike about those platforms
   (fees, slow verification, shipping, disputes)? Which gaps can honest
   copy on our site address?
4. What visual language does the category use, so the site can avoid
   looking like it (cold SaaS blue, stock pharmacists, pill clip art)?

## Decisions

| ID | Date | Idea | Class | Decided by | Why | Requirement IDs | Status |
|---|---|---|---|---|---|---|---|
| PD-1 | 2026-11-07 | IDEA-2 | MVP | Orchestrator | Verification is claimed but never shown by competitors (OP-2, OP-5); scores 5/4/5/5; static content | R-049 | active |
| PD-2 | 2026-11-07 | IDEA-1 | MVP | Orchestrator | No competitor page explains disputes (7 of 7, OP-1); scores 4/5/4/5 | R-050 | active |
| PD-3 | 2026-11-07 | IDEA-5 | MVP | Orchestrator | Handles K-1 without making a legal claim; scores 4/4/4/5 | R-051 | active |
| PD-4 | 2026-11-07 | IDEA-4 | MVP | Orchestrator | Paperwork and payment worries (UP-3, UP-6); scores 4/3/4/5 | R-052 | active |
| PD-5 | 2026-11-07 | IDEA-3 (static table) | MVP | Orchestrator | Small, from brief facts; scores 4/3/5/4. The interactive question flow is a high-value enhancement | R-053 | active |
| PD-6 | 2026-11-07 | IDEA-6 (static structure) | MVP | Orchestrator | Most competitors hide fees (UP-5); scores 4/3/4/4. The calculator waits for Q-3 and is a high-value enhancement | R-054 | active |
| PD-7 | 2026-11-07 | IDEA-7 | MVP | Orchestrator | Cheap, and reduces failed applications; scores 4/3/5/4 | R-055 | active |
| PD-8 | 2026-11-07 | IDEA-8 | high-value enhancement | Orchestrator | Specific process in place of missing proof. The design direction may use it as the thread for imagery | none | active |
| PD-9 | 2026-11-07 | IDEA-11, IDEA-12 | future opportunity | Orchestrator | Weak evidence (an assumption; one vendor source). IDEA-12 implies lawfulness (K-1) | none | active |
| PD-10 | 2026-11-07 | IDEA-13, IDEA-14, IDEA-15 | rejected | Orchestrator | Need app data, invented numbers or a third-party service (hard stop 6, R-033, R-044) | none | active |

## Rejected ideas

Kept so they aren't proposed again without new evidence.

| Idea | Why rejected | What would change the decision |
|---|---|---|
| IDEA-13 Public sample inventory | Needs app data, invents listings, contradicts verified-only | The app exists and the client wants a public teaser |
| IDEA-14 Buyer savings calculator | No honest inputs; leans on restocking framing (K-1) | Real price data and a legal model that allows it |
| IDEA-15 Chat assistant | Third-party service (hard stop 6, R-044); risks generated legal answers | Client approves a provider and a reviewed answer set |

## Waiting for the owner

| Idea | What it changes | Options | Recommendation |
|---|---|---|---|
| IDEA-9 Report a suspect listing route | Commits the client to an operating policy with brand-protection teams | (a) add a page and contact route, (b) leave out | (b) for now: a promise the client hasn't made would do harm. Ask the client. |
| IDEA-10 Public settled/pending ledger | Sets the client's public stance before launch | (a) add if the site launches before the marketplace, (b) leave out | Decide after Q-6 (launch status) |

## Roadmap after MVP

| Order | Idea | Class | Depends on |
|---|---|---|---|
