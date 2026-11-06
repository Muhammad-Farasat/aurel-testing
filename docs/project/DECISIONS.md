# Decisions

Owner: Orchestrator. Log every assumption or choice a later reader might
question. Never delete an entry. Mark it superseded instead.

| ID | Date | Decision | Why | Would change if | Status |
|---|---|---|---|---|---|
| D-1 | 2026-11-07 | Scope is the public marketing website for the marketplace, not the marketplace app. Features F01 to F16 are content the site explains, not things it implements. | Owner chose "Public marketing site" when asked | Owner asks for the app or its screens | active |
| D-2 | 2026-11-07 | Project name `pharmacy`; brand name stays a working placeholder until the client supplies one. | The brief names no brand; client provides branding (Client Responsibilities) | Client supplies a name and logo | active |
| D-3 | 2026-11-07 | Start a new direction. Do not reuse concept A or B code or look; their research tables may be reused as sources. | Concept A rejected (RJ-009), concept B rejected (RJ-010) | Owner reverses either rejection | active |
| D-4 | 2026-11-07 | Approval mode plan-only: stop once after planning with requirements, design direction and phase plan. | Owner's answer | Owner changes the mode | active |
| D-5 | 2026-11-07 | Imagery may be generated with ChatGPT in the owner's Chrome. Generated images are illustrative and must not pose as real pharmacies, people or customers. | Owner offered it; RJ-004 bans stock photos; quality rule bans invented credentials | Client supplies photography | active |
| D-6 | 2026-11-07 | Stage 1 accepted: REQUIREMENTS.md R-001 to R-048. Open questions Q-1 to Q-13 proceed on their documented defaults; Q-1, Q-3 to Q-6 must be settled by the client before the site goes public. | Every default is reversible content; none blocks building | Client answers a question | active |
| D-7 | 2026-11-07 | Fonts are self-hosted (no Google Fonts or other CDN at runtime). | R-044 allows only the site's own origin unless approved here | Owner approves a font CDN | active |
| D-8 | 2026-11-07 | Light product research started in parallel with Stage 1. | It reads only BRIEF.md, so it does not depend on the requirements | n/a | active |
| D-9 | 2026-11-07 | Stack: Astro 7.4.2 static output, no UI framework, TypeScript 6.0.3, in `pharmacy/site/` as its own npm project. | Zero client JS by default (R-043, R-048), shared layout keeps placeholders in one place (R-034), build-time images and fonts (D-7); React would ship runtime for static text | Client requires React for the marketing site | active |
| D-10 | 2026-11-07 | All client-dependent values live in `src/content/client-facts.ts` as `pending()`/`supplied()`; `npm run check:launch` fails while Q-1, Q-3 to Q-6 are pending. | One-file swap per placeholder (R-034); stops a public launch with placeholders (D-6) | n/a | active |
| D-11 | 2026-11-07 | Apply form inputs carry no `name`, form uses `method="dialog"`, and lint bans network and storage APIs in `src/`. | R-029 sends and stores nothing, even if the script fails | Client provides a submission endpoint | active |
| D-12 | 2026-11-07 | Project docs stay in `docs/project/` at the repo root as the Orchestrator expects. | Only one active client project in this repo's docs today | A second client project starts in this repo: move docs to `<client>/docs/` | active |
| D-13 | 2026-11-07 | Design direction "Second Shelf" (aubergine, saffron, rose milk; Familjen Grotesk and Atkinson Hyperlegible Next; generated still lifes of plain cartons with clip-on shelf labels) checked against the brief and RJ-001 to RJ-010. Owner sign-off pending at the plan-only stop. | Answers all three concept B reasons without returning to concept A; scored 22/25 against two alternatives | Owner rejects it at the planning stop: fall back to direction B (Scale Model Exchange) or a new round | active |
| D-14 | 2026-11-07 | AGENTS.md "Checks in this repo" gets a `pharmacy/site` subsection in Phase 1, once the commands exist, instead of replacing the factory's pytest checks. | AGENTS.md here governs the whole factory repo; replacing it would drop the factory's own checks | Pharmacy moves to its own repo | active |
| D-15 | 2026-11-07 | "Second Shelf" is both the direction name and the working brand placeholder, held in one constant. | No brand supplied (Q-1) | Client supplies a brand | active |
