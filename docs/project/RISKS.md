# Risks and open questions

Owner: Orchestrator.

## Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| K-1 | Headline copy ("save money on inventory", "lower-cost inventory") describes restocking, but the federal pharmacy-to-pharmacy exemption covers a specific patient need, not restocking (market-research.md, UP-2). Copy could misstate the legal basis. | medium | high | Copy stays neutral on legality (R-022): frame as moving surplus stock between verified, licensed pharmacies; no claim that any sale is lawful. Client's legal advisor picks the model (patient-need attestation or full DSCSA records per trade) before launch. | client | open |
| K-2 | MatchRX could not be inspected (403 to browser and fetch). Its facts come from third-party profiles and search summaries (hypotheses). | high | low | Site doesn't mention or copy MatchRX (R-038); competitor analysis relies on 6 other platforms. | Orchestrator | open |
| K-3 | No independent user reviews exist in the category; user pain points come from watchdogs and competitor pages. | high | medium | Treat UP-x as risk themes; client interviews with a few pharmacies would confirm them. | client | open |
| K-4 | Generated imagery could look like stock or show readable real drug brands. | medium | medium | R-036 rules; design director reviews every image before use. | design-director | open |

## Open questions for the client

| ID | Question | Asked | Current assumption | Answer |
|---|---|---|---|---|
| Q-1 | <question> | <date or "not yet"> | <D-n> | <answer, or blank> |

## Unreadable references

| Reference | Problem |
|---|---|
| matchrx.com | 403 to browser user agent and fetch tool, 2026-11-06 and 2026-11-07 |
| StudentDoctor thread, bipc.com DSCSA article, NC pharmacy board FAQ | 403 (see market-research.md) |

## Credentials needed

| Service | Variables | Mock available? | Status |
|---|---|---|---|
| <service> | <names> | <yes or no> | <missing, provided> |
