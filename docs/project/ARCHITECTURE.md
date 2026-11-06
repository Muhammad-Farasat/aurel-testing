# Architecture

Owner: solution-architect. Written 2026-11-07 for the public marketing site
(D-1). Planning only: nothing below is scaffolded yet. Package versions are
the newest releases that were at least two weeks old on 2026-11-07, checked
with `npm view`.

## Summary

A static, multi-page site built with Astro and shipped as plain HTML and CSS
with a few small first-party scripts. It has no server, database, accounts,
cookies or third-party requests. Every piece of content that waits on the
client lives in one registry file and renders with one marker. Generated PNG
images become responsive AVIF and WebP at build time. The client deploys the
`dist/` folder to a static host they own.

## Environment found on the build machine

Checked on 2026-11-07, Windows 10 Pro 10.0.19045.

| Tool | Version | Notes |
|---|---|---|
| Node.js | v24.6.0 (nvm4w, `C:\nvm4w\nodejs`) | Meets Astro 7's `node >=22.23.4` |
| npm | 11.5.1 | pnpm is not installed; use npm |
| Python | 3.14.3 (`python`, `py`) | Not needed by the site. `pytest` is not installed for this interpreter |
| ffmpeg / ffprobe | 8.1.2 (gyan.dev full build, WinGet) | Not needed by the site |
| git | 2.52.0.windows.1 | |
| Google Chrome | 156.0.8078.80 | Lighthouse uses it through `chrome-launcher` |
| Microsoft Edge | 156.0.4314.58 | Optional cross-browser spot check (R-047) |
| Playwright browsers | `chromium-1243`, `chromium-1248`, headless shells, `ffmpeg-1011`, `ffmpeg-1013` in `%LOCALAPPDATA%\ms-playwright` | Not confirmed to match `@playwright/test` 1.64.1. Run `npx playwright install chromium` after `npm ci` |
| Lighthouse CLI | not installed globally | Installed as a dev dependency instead |
| vercel CLI | 54.6.1 (global) | Not used. Deployment belongs to the client |

## Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| Site framework | Astro (static output) | 7.4.2 | Builds plain HTML per page with zero client JS by default, so text and navigation render without JS (R-048) and LCP stays low (R-043). Built-in image pipeline (`<Picture>`, sharp) and local fonts API cover R-043 and D-7 without plugins. Islands let IDEA-3 and IDEA-6 add interactivity later on one page without changing the rest. |
| Language | TypeScript | 6.0.3 | Types the content registry so a missing or misspelled placeholder key fails the check. Pinned to 6.0.x because `@astrojs/check` 0.9.12 accepts `^5 \|\| ^6` and `typescript-eslint` 8.72.0 accepts `<6.1.0`. TypeScript 7.0.2 is newer but neither tool supports it yet. |
| Type and template check | `@astrojs/check` | 0.9.12 | Runs `astro check` over `.astro` and `.ts` files. |
| Image processing | sharp (Astro's default image service) | 0.35.5 | Astro 7.4.2 depends on `sharp ^0.35.4`. Converts the ChatGPT PNGs to AVIF and WebP at several widths at build time. |
| Fonts | Astro Fonts API, `fontProviders.local()` | built into Astro 7.4.2 | Self-hosted WOFF2 files (D-7, R-044). Astro emits preload links and metric-matched fallback fonts, which limits layout shift (R-043 CLS). The design director picks the family; its licence must allow self-hosting. |
| Client scripts | Plain TypeScript in Astro `<script>` tags | n/a | Only three behaviours need JS: the collapsed mobile menu, FAQ disclosure, and Apply validation. Each is a few kilobytes. No UI framework runtime ships. |
| Unit tests | Vitest | 4.1.12 | Tests the pure modules in `src/lib/` and the content registries. Accepts Vite 8, which Astro 7.4.2 uses. |
| End-to-end tests | `@playwright/test` | 1.64.1 | Screenshots at 390, 834 and 1440, console errors, horizontal scroll, network and cookie capture, no-JS rendering, keyboard checks. |
| Accessibility scan | `@axe-core/playwright` | 4.14.0 | Runs axe-core inside the Playwright pages (R-041). |
| Link check | linkinator | 8.1.0 | Crawls `dist/` through its own static server and fails on any broken internal link (R-001, R-004). |
| Performance | lighthouse | 13.5.0 | Mobile and desktop presets for LCP and CLS (R-043). Requires Node `>=22.19`. |
| Lint | ESLint, eslint-plugin-astro, typescript-eslint | 10.13.0, 3.2.1, 8.72.0 | Lints `.astro` and `.ts`. `eslint-plugin-jsx-a11y` 6.10.2 is left out because its peer range stops at ESLint 9; axe covers accessibility instead. |
| Format | Prettier, prettier-plugin-astro | 3.9.10, 1.1.2 | `prettier --check` runs as part of lint. |
| Node types | `@types/node` | 26.6.5 | For the check scripts. |
| Hosting | Any static host the client owns | n/a | Out of our scope (Non-goals). See Deployment. |

### Why Astro, and not plain HTML or a React site

The proposal names React for the future marketplace app (BRIEF.md line 105).
That app is out of scope (D-1). The marketing site has different needs: fast
first paint, readable without JS, no runtime requests, and a lot of prose.

| Option | Fit | Verdict |
|---|---|---|
| Plain static HTML and CSS | Fastest possible output. But the header, footer, nav and shared statements would be copied across 13 pages, and each placeholder would need edits in many files, which breaks the one-file placeholder rule (R-034). Image resizing would need a separate script. | Rejected |
| React single-page app or Next.js | Ships a React runtime on every page for mostly static text. A client-rendered SPA fails R-048. Next.js static export works but brings more framework than the site needs, and its image optimiser expects a server. | Rejected |
| Astro, static output, no UI framework | Components and layouts for sharing, plain HTML output, build-time images and fonts, typed content. Can add React islands later with `npx astro add react` if a future island needs it. | Chosen |

Code that should outlive the marketing site, such as the Apply field
definitions and validation rules, sits in framework-free TypeScript under
`src/lib/` so the React app can import or copy it later.

React is not installed in Phase 1. If IDEA-3 or IDEA-6 is built later and is
complex enough to want React, add `@astrojs/react` (7.1.1 at the time of
writing, peer `react ^19`) and hydrate only that island with `client:visible`.
Record that in DECISIONS.md, because it adds a runtime to one page.

## Where the project lives

`pharmacy/site/` in the factory repo. The factory keeps client work in a
top-level folder per client, and `pharmacy/` already exists in the main
checkout (untracked, holding `requirements.docx`). The site is a separate npm
project with its own `package.json` and lockfile, so it does not touch the
factory's Python tooling.

Two notes for the Orchestrator:

- `docs/project/` stays at the repo root, as the Orchestrator template
  expects. If a second client project starts in this repo, those files will
  collide. Moving them under `pharmacy/docs/` would fix it; that is the
  Orchestrator's call.
- `pharmacy/requirements.docx` is untracked on main. Whether to commit it is
  the Orchestrator's call; the site does not read it.

## Layout and boundaries

```
pharmacy/site/
  package.json, package-lock.json
  astro.config.mjs          static output, fonts, image settings
  tsconfig.json             extends astro/tsconfigs/strict
  eslint.config.js
  .prettierrc.json, .prettierignore
  vitest.config.ts          uses getViteConfig from astro/config
  playwright.config.ts      projects w390, w834, w1440, nojs
  linkinator.config.json    keeps link-check flags out of npm scripts (Windows quoting)
  README.md                 how to run, replace a placeholder, add an image, deploy
  public/
    favicon.svg             placeholder mark (R-035)
    robots.txt
  src/
    pages/                  one file per route; composes sections, holds page copy
      index.astro           /
      selling.astro         /selling/
      buying.astro          /buying/
      trust.astro           /trust/
      fees.astro            /fees/
      faq.astro             /faq/
      apply.astro           /apply/
      sign-in.astro         /sign-in/
      contact.astro         /contact/
      legal/[slug].astro    /legal/terms/, /legal/privacy/, /legal/disputes/
      404.astro             /404.html
    layouts/
      BaseLayout.astro      <html lang>, title, description, skip link, header, main, footer
    components/
      site/                 Header, PrimaryNav, Footer, ApplyCta, SkipLink, BrandMark
      content/              Fact, Placeholder, Statement, SiteImage, Steps, Disclosure
      sections/             page sections designed per DESIGN_DIRECTION.md, grouped by page
      islands/              empty in Phase 1; reserved for IDEA-3 and IDEA-6
    content/                all content data; no markup
      client-facts.ts       the placeholder registry (every client-dependent value)
      statements.ts         facts repeated across pages, each with its BRIEF.md source
      routes.ts             every route: path, nav label, title, description, flags
      faq.ts                FAQ questions and answers (R-026)
      images.ts             image manifest: source, alt, role, priority, review record
      legal/terms.md, privacy.md, disputes.md
      rules/content-rules.json   banned terms, spelling, allowed origins
    content.config.ts       `legal` collection (glob loader, zod schema)
    lib/                    framework-free logic, unit-tested
      placeholders.ts       resolve a fact, list pending facts
      routes.ts             nav and footer lists built from content/routes.ts
      apply/fields.ts       Apply field definitions (labels, types, autocomplete, required)
      apply/validate.ts     pure validation: values in, errors out
      apply/controller.ts   DOM wiring for Apply: no network, no storage
      enhance/menu.ts       mobile menu disclosure
      enhance/disclosure.ts FAQ disclosure
    styles/
      tokens.css            design tokens from DESIGN_DIRECTION.md
      global.css            reset, base type, focus styles, reduced-motion rules
    assets/
      images/<page>/*.png   approved ChatGPT source images (processed at build)
      fonts/*.woff2         self-hosted font files
  scripts/
    check-content.mjs       banned terms, spelling, http://, titles, lang, budgets, placeholder inventory
    lighthouse.mjs          LCP and CLS for main pages, mobile and desktop
    check-launch.mjs        fails while launch-gating placeholders are pending
  tests/
    unit/                   *.test.ts for src/lib and src/content
    e2e/                    *.spec.ts, tagged @screens @a11y @nav @network @apply @motion
```

Boundaries:

- UI (`src/pages`, `src/components`): markup, page copy and layout. Pages
  may import components, `src/content/*` and `src/lib/*`. Components never
  hold a client-dependent value as a literal; they read it through `<Fact>`.
- Content (`src/content`): data only. Nothing here imports from
  `src/components`. The modules export typed objects that the pages, the
  content check and the unit tests all read.
- Logic (`src/lib`): the service layer for this site. Validation, placeholder
  resolution and nav building live here as plain functions with explicit
  inputs and outputs, so Vitest can test them without a browser and the
  future app can reuse them. `apply/controller.ts` and `enhance/*` are the
  only modules that touch the DOM, and they hold no rules of their own.
- Islands (`src/components/islands`): future interactive widgets. Each reads
  its data from `src/content` and its logic from `src/lib`, and must sit on
  top of a useful static fallback (the static table for IDEA-3, the static
  worked example for IDEA-6) so R-048 still holds.
- Integrations: none. See Integrations.

### Rule for where copy lives

1. A value the client must supply or confirm goes in `client-facts.ts`.
2. A factual statement used on more than one page, or one that must trace to
   a brief line (exclusions, payments, data stored, verification steps,
   order stages, security measures), goes in `statements.ts` with its source.
3. Everything else, the page-specific marketing copy, lives in the page or
   section file where it appears.

Rule 2 keeps R-015, R-019, R-020 and R-021 (exclusions on three pages)
consistent: change the statement once and every page follows.

## Content and placeholder model

This takes the place of the template's data model. The site has no database.

### Placeholder registry: `src/content/client-facts.ts`

Every value waiting on the client is one entry. Replacing a placeholder is a
one-entry change in this file.

```ts
export const facts = {
  brandName: pending({
    label: "Brand name",
    question: "Q-1",
    working: "<working name chosen in design>",
  }),
  feeAmount: pending({ label: "Platform fee amount", question: "Q-3" }),
  sellerPayoutTiming: pending({ label: "Seller payout timing", question: "Q-3" }),
  // once answered: feeAmount: supplied({ value: "...", decision: "D-12" }),
} satisfies Record<string, Fact>;
```

- `pending({ label, question, working? })` renders as a placeholder.
  `working` is the stand-in text for places that can't carry markup. Only the
  brand name uses it, in `<title>` and the meta description.
- `supplied({ value, decision })` renders the value. `decision` must name
  the DECISIONS.md entry that records the client's answer (R-031, R-033).
- `<Fact key="feeAmount" />` renders a supplied value as text, or a pending
  one through `<Placeholder>`. The `key` prop is typed as
  `keyof typeof facts`, so a wrong key fails `astro check`.

Planned entries (the design and copy phases may add more):

| Key | Question | Requirements |
|---|---|---|
| `brandName`, `logo` | Q-1 | R-034, R-035 |
| `serviceRegions` | Q-2 | R-026 |
| `feeAmount`, `feePayer`, `feeTiming`, `sellerPayoutTiming` | Q-3 | R-015, R-024, R-052, R-054 |
| `feeExampleOrderValue`, `feeExampleFee`, `feeExampleSellerReceives` | Q-3 | R-054 |
| `legalTerms`, `legalPrivacy`, `legalDisputes` | Q-4 | R-025, R-032 |
| `disputeOutcomes` (refund, return or credit per case) | Q-4 | R-050 |
| `tracingRecords` (supply-chain record keeping) | Q-4, K-1 | R-052 |
| `legalPosition` (the platform's legal model) | Q-4, K-1 | R-051 |
| `securityDetailLevel` | Q-5 | R-019 (switches between plain and named measures) |
| `launchStatus`, `applyHandoffUrl`, `signInUrl` | Q-6 | R-003, R-029 |
| `verificationReviewTime`, `rejectionGrounds` | Q-8 | R-011, R-030, R-049 |
| `contactEmail`, `contactPhone`, `contactAddress` | Q-9 | R-031 |
| `paymentProviderName` | Q-10 | R-015 |
| `minimumShelfLife` | admin setting | R-012, R-053 |

### Placeholder markup (R-034)

`<Placeholder>` renders one element:

```html
<span class="placeholder" data-placeholder="feeAmount" data-question="Q-3">
  Pending from client: platform fee amount
</span>
```

- Machine marker: the `data-placeholder` attribute. The content check counts
  it per page and writes the inventory to
  `.artifacts/pharmacy/qa/placeholders.json`.
- Visible marker: the `.placeholder` class. The design director picks its
  look. The text always names the missing content.
- Block placeholders (legal page bodies) use the same component with
  `as="div"`.
- Placeholder text never contains a currency symbol, a percentage or a
  digit, so it can't trip R-024 or R-033.

### Legal pages

`src/content/legal/{terms,privacy,disputes}.md` with frontmatter `title`,
`description` and `status: pending | supplied`. While `pending`, the page
renders its heading and a block `<Placeholder>` and ignores the body. When
the client supplies text, it is pasted into the body and `status` becomes
`supplied`. One file per policy.

### Route registry: `src/content/routes.ts`

Each route has `path`, `navLabel`, `title`, `description`, `inMainNav`,
`inFooter` and `requirements`. `BaseLayout` takes the route key, so every
page's title and description come from one file (R-046), and the nav and
footer are built from the same list (R-001, R-004). A unit test asserts that
titles are unique and every main page is in the nav. If Q-6 makes the app
live, `signInUrl` and `applyHandoffUrl` in `client-facts.ts` point Sign in
and Apply at the app without touching pages.

### Content rules: `src/content/rules/content-rules.json`

Lists each banned term with the requirement it enforces (R-008, R-011,
R-015, R-019, R-022, R-024, R-033, R-037, R-038, R-051, R-052), the spelling
rule (R-039: "licence" until Q-2), and approved third-party origins (empty;
R-044). An `allow` list per term holds reviewed exceptions with page, quoted
context and reason, for false positives such as a feature word inside a
"not available" sentence. When the client approves a term (for example Q-10
naming the payment provider), its entry is removed and DECISIONS.md records
why.

## Image pipeline

Source: PNGs generated in ChatGPT (D-5), reviewed by the design director
against R-036 and K-4 before they enter the repo.

1. Save the approved PNG at full resolution to
   `src/assets/images/<page>/<slug>.png`. Aim for a longest side of about
   twice the largest rendered width where ChatGPT allows. Do not upscale.
2. Add an entry to `src/content/images.ts`:
   `{ id, src, alt, decorative, priority, sizes, widths, reviewedBy,
   reviewedOn, prompt }`. `alt` is required unless `decorative: true`, which
   renders `alt=""` (R-036). `prompt` records the generation prompt.
3. Pages render images only through `<SiteImage id="home-hero" />`, which
   wraps Astro's `<Picture>`:
   - `formats: ['avif', 'webp']`, with a JPEG fallback, or PNG when the
     image needs transparency.
   - `widths` from the manifest (default `[390, 640, 834, 1080, 1440, 2000]`,
     capped at the source width) and a `sizes` attribute that matches the
     layout.
   - `width` and `height` always set, so the browser reserves space (CLS
     under 0.1, R-043).
   - `priority: true` for the one LCP image per page: `loading="eager"`,
     `fetchpriority="high"`. Everything else is `loading="lazy"` and
     `decoding="async"`.
4. Astro writes hashed files to `dist/_astro/`. All are same-origin (R-044).
5. Budgets in `scripts/check-content.mjs`: no emitted image file over
   250 KB, and no page's eager images over 300 KB in total. Lighthouse is
   the final judge of LCP.

The PNG sources are committed. If the repo grows too large, Git LFS is the
next step, but about twenty images do not need it.

## Fonts

WOFF2 files in `src/assets/fonts/`, declared in `astro.config.mjs` under
`fonts` with `provider: fontProviders.local()`. The layout renders Astro's
`<Font cssVariable="..." preload />` for the body and display families only.
Subset to Latin if the licence allows, and load only the weights in
DESIGN_DIRECTION.md. No request leaves the site's origin (D-7, R-044).

## Client scripts

All are first-party modules bundled by Astro. None calls the network, sets a
cookie or uses web storage.

| Script | Without JS | With JS | Requirements |
|---|---|---|---|
| `enhance/menu.ts` | All nav links render as a visible list that wraps on small screens | At narrow widths the list collapses behind a button with `aria-expanded` and `aria-controls`; Escape closes it and returns focus | R-001, R-041, R-048 |
| `enhance/disclosure.ts` | Every FAQ answer is visible under its question heading | Each question becomes a `<button aria-expanded>` inside its heading; Enter and Space toggle | R-026, R-048 |
| `apply/controller.ts` | The form shows a notice that the preview needs JavaScript, and submit is disabled | Validates on submit, shows an error summary and inline errors, then the confirmation | R-028, R-029, R-030 |

A one-line first-party inline script in `<head>` swaps a `no-js` class on
`<html>` to `js` before first paint, so the collapsed menu never flashes
open. The FAQ uses the button pattern rather than `<details>` because R-026
asks for `aria-expanded`.

### Apply form: how it sends and stores nothing (R-029)

- Inputs have `id` and `autocomplete` (WCAG 1.3.5) but no `name`
  attribute, and the form has `method="dialog"`. Even if the script fails, a
  native submit has no named fields to serialise and does not navigate.
- `controller.ts` calls `event.preventDefault()`, runs `validate(values)`
  from `apply/validate.ts`, and renders the result. ESLint
  `no-restricted-globals` and `no-restricted-properties` rules ban `fetch`,
  `XMLHttpRequest`, `navigator.sendBeacon`, `document.cookie`,
  `localStorage`, `sessionStorage` and `indexedDB` across `src/`.
- Browser autofill memory is the browser's own feature, not site storage,
  and sits outside R-029. Tell the client.
- When Q-6 brings a submission endpoint, that change needs a new decision,
  a security review, and an update to R-029.

## Data model

None. The site stores no data and has no database. The content model above
is build-time only.

Operations that need transactions: none.

## Auth and authorization

None. No accounts, sessions, login form or roles on this site (R-003,
Non-goals). Sign in is a static page. The first admin account belongs to the
future marketplace app.

## Integrations

None at runtime: no analytics, font CDN, maps, chat, form service or embed
(R-044, Q-13). Adding one needs a DECISIONS.md entry and its origin in
`content-rules.json`.

- Live mode: n/a
- Mock or dev mode: n/a. The Apply form is the nearest thing to a mock: it
  validates locally and shows a marked "not sent yet" notice (R-029).
- Switch: `facts.launchStatus` and `facts.applyHandoffUrl` in
  `client-facts.ts`, once Q-6 is answered.
- Environment variables: none. The build reads no secrets. `ARTIFACTS_DIR`
  only moves test evidence.

## Errors, validation, logging

- Build-time: the fact and route registries are typed; zod validates
  legal-page frontmatter; `astro check` fails on a wrong fact key or missing
  prop. `SiteImage` throws during the build if an image id is unknown or a
  non-decorative image has no alt text.
- Apply validation: field rules live in `apply/fields.ts` (all required
  except phone, email format, intent one of Sell, Buy, Both). `validate()`
  returns `{ field, message }[]`. The controller writes an error summary at
  the top with links to each field, moves focus to it, sets `aria-invalid`
  and `aria-describedby` on each bad field, and clears an error once the
  field is fixed and resubmitted (R-028). On success it hides the form and
  moves focus to the confirmation heading (R-030).
- Runtime errors: no logging service (R-044). The e2e suite fails on any
  console error or uncaught page error.
- 404: Astro emits `dist/404.html`, which common static hosts serve for
  unknown paths (R-005).

## Deployment

We do not deploy. Hosting, domain and DNS are client costs and client
accounts (BRIEF.md "Not included"; Non-goals). The handover is the
`pharmacy/site/` source plus a README section the client's developer can
follow.

- Output: `npm run build` writes `pharmacy/site/dist/`, a folder of static
  files. Any static host the client owns can serve it: Netlify, Cloudflare
  Pages, Vercel (static), GitHub Pages, or object storage behind a CDN.
- Build settings: Node 22.23.4 or newer, install `npm ci`, build
  `npm run build`, publish directory `dist`, base directory `pharmacy/site`.
- Required host settings:
  - HTTPS only, with HTTP redirecting to HTTPS (R-045).
  - Serve `404.html` for unknown paths with status 404 (R-005).
  - Directory-style URLs (`/trust/` serves `/trust/index.html`), which is
    Astro's default `build.format: 'directory'`.
- Recommended response headers, set by the client on their host:
  `Content-Security-Policy` of `default-src 'self'; img-src 'self' data:;
  script-src 'self' 'sha256-<hash of the no-js swap script>'; style-src
  'self' 'unsafe-inline'; form-action 'none'; frame-ancestors 'none'`, plus
  `Strict-Transport-Security`, `Referrer-Policy: no-referrer`,
  `X-Content-Type-Options: nosniff`, and a `Permissions-Policy` that denies
  camera, microphone and geolocation. The README gives a `_headers` example
  for Netlify and Cloudflare Pages; it does not go in `public/` because the
  host is unknown.
- `site` in `astro.config.mjs` stays unset until the client has a domain.
  Canonical links and a sitemap come then.
- Before going public, `npm run check:launch` must pass. It fails while any
  placeholder for Q-1, Q-3, Q-4, Q-5 or Q-6 is still pending (D-6).

## Checks

All commands run from `pharmacy/site/` in PowerShell or Git Bash on Windows.
npm runs scripts through `cmd.exe` on Windows, so the scripts use `&&` and no
single quotes, and flags with regexes live in config files. Evidence goes to
`<repo root>/.artifacts/pharmacy/`, which the root `.gitignore` ignores.
`ARTIFACTS_DIR` overrides the location.

Order for a full pass: install, lint, typecheck, unit, build, then the checks
that read or serve `dist/`.

Once Phase 1 makes these runnable, add them to AGENTS.md as a `pharmacy/site`
subsection of "Checks in this repo", so the factory's own pytest checks stay
listed.

| Check | Command | What it proves | When |
|---|---|---|---|
| Install | `npm ci` then `npx playwright install chromium` | Locked dependencies and the browser that matches `@playwright/test` | fresh checkout |
| Lint and format | `npm run lint` (`eslint . && prettier --check .`) | Code style; network and storage APIs banned in `src/` | every task |
| Typecheck | `npm run typecheck` (`astro check`) | Types in `.astro` and `.ts`, valid fact keys and image ids | every task |
| Unit tests | `npm run test:unit` (`vitest run`) | Apply validation rules; placeholder helpers; unique titles; nav covers main pages | every task |
| Build | `npm run build` (`astro build`) | Static output in `dist/`, images and fonts processed | every task |
| Link check | `npm run check:links` (`linkinator dist --config linkinator.config.json`) | No broken internal links on any page, footer included (R-001, R-004) | every phase |
| Content check | `npm run check:content` (`node scripts/check-content.mjs`) | Banned terms (R-008, R-011, R-015, R-019, R-022, R-024, R-033, R-037, R-038, R-051, R-052); one spelling of licence and `lang` on `<html>` (R-039); no `http://` URLs (R-045); unique title and a description on every page (R-046); image byte budgets; placeholder inventory in `.artifacts/pharmacy/qa/placeholders.json` (R-034) | every phase |
| End-to-end, all | `npm run test:e2e` (`playwright test`) | Everything in the rows below. Starts `astro preview --port 4322` itself, so run `npm run build` first | every phase |
| Screens | `npm run test:e2e -- --grep @screens` | Full-page screenshots of every page at 390, 834 and 1440 in `.artifacts/pharmacy/screens/<width>/<page>.png`; fails on console errors, page errors, or `scrollWidth` above the viewport width; also checks 320 px reflow (R-040) | every phase |
| Accessibility | `npm run test:e2e -- --grep @a11y` | axe-core with tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`: no serious or critical violations; one `h1`; no skipped heading levels; landmarks; skip link is the first Tab stop (R-041); FAQ toggles by keyboard (R-026) | every phase |
| Navigation | `npm run test:e2e -- --grep @nav` | Main pages one click away at 1440 and two at 390; `aria-current="page"`; Apply link on every page but Apply; Sign in page has no password field; same brand string in header, footer and title; `/does-not-exist` shows the 404 page (R-001 to R-005, R-035) | every phase |
| Network and cookies | `npm run test:e2e -- --grep @network` | Records every request from load to network idle on every page; fails on any origin other than `http://localhost:4322` or one listed in `content-rules.json`; fails if `context.cookies()` is not empty (R-044) | every phase |
| No JS | `npm run test:e2e -- --project=nojs` | With `javaScriptEnabled: false`, each main page shows its `h1`, body text and every nav link (R-048) | every phase |
| Apply | `npm run test:e2e -- --grep @apply` | Nine labelled fields and no file input; empty submit shows the summary and moves focus to it; bad email gets `aria-invalid`; a valid submit sends no request carrying any entered value and leaves cookies, localStorage, sessionStorage and IndexedDB empty; confirmation heading gets focus (R-027 to R-030) | every phase |
| Reduced motion | `npm run test:e2e -- --grep @motion` | With `reducedMotion: 'reduce'`, no element has a running animation or a transition longer than 0.01 s after load and scroll (R-042) | every phase |
| Lighthouse | `npm run check:lighthouse` (`node scripts/lighthouse.mjs`) | Starts `astro preview` on port 4323, runs Lighthouse with the default mobile preset and with `--preset=desktop` on each main page, fails if LCP is 3.0 s or more or CLS is 0.1 or more, saves JSON reports to `.artifacts/pharmacy/lighthouse/` (R-043). Needs `npm run build` first | every phase and before handover |
| All fast checks | `npm run check` | lint, typecheck, unit, build, links, content and e2e in sequence | before a PR |
| Launch gate | `npm run check:launch` (`node scripts/check-launch.mjs`) | Fails while a launch-gating placeholder is pending (D-6). Expected to fail during the build; it is for the client | before going public |
| Whitespace | `git diff --check` | Repo-wide rule from AGENTS.md | every task |

Notes on the checks:

- Lighthouse finds Chrome through `chrome-launcher`; Chrome 156 is installed
  here. On a machine without Chrome, set `CHROME_PATH` to Playwright's
  Chromium. Local results use Lighthouse's simulated throttling, which is
  what R-043 asks for.
- Playwright projects: `w390` (390 x 844), `w834` (834 x 1112), `w1440`
  (1440 x 900), all Chromium, plus `nojs` (1440, JS off). Tests read the page
  list from `src/content/routes.ts`, so a new page is covered automatically.
- `test:e2e` uses port 4322 with `strictPort` and
  `reuseExistingServer: false`, so it never trusts another agent's server.
- The content check reads visible text only. It drops `<script>`, `<style>`
  and attributes, and skips reviewed `allow` exceptions. Some R-037 terms,
  such as "offer", are common words; reviewed false positives go in the
  `allow` list with a reason rather than out of the rule.
- Still manual: 200% zoom and target size (R-041), contrast of the
  placeholder style, image review (R-036), line-by-line source comparison
  (R-019), Firefox and Safari (R-047), and comparing the visible placeholder
  count with the inventory (R-034).

## Requirement map

Routes: `/` Home, `/selling/`, `/buying/`, `/trust/`, `/fees/`, `/faq/`,
`/apply/`, `/sign-in/`, `/contact/`, `/legal/terms/`, `/legal/privacy/`,
`/legal/disputes/`, and `404.html`. Design may move a section to another
page if it updates this map. Paths are under `pharmacy/site/`.

| Requirement | Module or file | Verified by |
|---|---|---|
| R-001 | `src/content/routes.ts`, `src/lib/routes.ts`, `src/components/site/PrimaryNav.astro`, `src/lib/enhance/menu.ts` | @nav, link check |
| R-002 | `src/components/site/ApplyCta.astro`, `src/layouts/BaseLayout.astro` | @nav |
| R-003 | `src/pages/sign-in.astro`, `facts.signInUrl` | @nav |
| R-004 | `src/components/site/Footer.astro`, `src/content/routes.ts` | @nav, link check |
| R-005 | `src/pages/404.astro` | @nav |
| R-006 | `src/pages/index.astro` (hero and problem sections) | read-through |
| R-007 | `src/pages/index.astro`, `src/pages/selling.astro` | read-through |
| R-008 | `src/pages/index.astro`, `src/pages/buying.astro`; savings figures banned in `content-rules.json` | content check |
| R-009 | `statements.ts` `oneAccount`, used on Home and in `faq.ts` | read-through |
| R-010 | `statements.ts` `licensedOnly`, used on Home and in `faq.ts` | read-through |
| R-011 | `statements.ts` `verificationSteps`; `src/pages/trust.astro`; `facts.verificationReviewTime` | content check (time words), read-through |
| R-012 | `src/pages/selling.astro`; `statements.ts` `listingFields`; `facts.minimumShelfLife` | read-through |
| R-013 | `src/pages/buying.astro` | read-through |
| R-014 | `statements.ts` `orderStages`; `src/pages/buying.astro`, `src/pages/selling.astro` | read-through |
| R-015 | `statements.ts` `payments`; `facts.paymentProviderName`, `facts.sellerPayoutTiming` | content check |
| R-016 | `src/pages/buying.astro` or `faq.ts` | read-through |
| R-017 | `src/pages/trust.astro`, `faq.ts` | read-through |
| R-018 | `statements.ts` `oversight`; `src/pages/trust.astro` | read-through |
| R-019 | `statements.ts` `securityMeasures`, each with a BRIEF.md source; `facts.securityDetailLevel` | content check, manual source comparison |
| R-020 | `statements.ts` `dataStored`, `dataNotStored`; Home and `src/pages/trust.astro` | read-through |
| R-021 | `statements.ts` `exclusions`, used on selling, FAQ and trust | read-through on three pages |
| R-022 | `content-rules.json`; `statements.ts` `legalPosition` | content check |
| R-023 | `src/pages/trust.astro` or `src/pages/selling.astro` | read-through |
| R-024 | `src/pages/fees.astro`; `facts.feeAmount` | content check |
| R-025 | `faq.ts`; `src/content/legal/disputes.md` | read-through |
| R-026 | `src/content/faq.ts`, `src/pages/faq.astro`, `src/lib/enhance/disclosure.ts` | @a11y, read-through |
| R-027 | `src/lib/apply/fields.ts`, `src/pages/apply.astro` | @apply |
| R-028 | `src/lib/apply/validate.ts`, `src/lib/apply/controller.ts` | unit tests, @apply |
| R-029 | `src/lib/apply/controller.ts` (no `name`, `method="dialog"`, lint ban) | @apply, @network |
| R-030 | `src/pages/apply.astro` confirmation; `statements.ts` `verificationSteps` | @apply |
| R-031 | `src/pages/contact.astro`; `facts.contactEmail`, `contactPhone`, `contactAddress` | read-through, placeholder inventory |
| R-032 | `src/content/legal/*.md`, `src/pages/legal/[slug].astro` | link check, read-through |
| R-033 | `content-rules.json`; review fields in `src/content/images.ts` | content check, manual image review |
| R-034 | `src/content/client-facts.ts`, `src/components/content/Placeholder.astro`, `Fact.astro` | placeholder inventory, manual count |
| R-035 | `facts.brandName`; `BrandMark.astro`; title in `BaseLayout.astro` | @nav |
| R-036 | `src/content/images.ts`, `src/components/content/SiteImage.astro` | @a11y (alt), manual review |
| R-037 | `content-rules.json` | content check |
| R-038 | `content-rules.json` | content check |
| R-039 | `lang` in `BaseLayout.astro`; spelling rule in `content-rules.json` | content check |
| R-040 | `src/styles/*`, section components | @screens |
| R-041 | `BaseLayout.astro`, `SkipLink.astro`, focus styles in `global.css`, all components | @a11y, @nav, manual zoom and target checks |
| R-042 | Reduced-motion rules in `global.css`; any animation in sections | @motion |
| R-043 | `SiteImage.astro`, fonts config, no framework runtime | Lighthouse |
| R-044 | No third-party code; self-hosted fonts; origins in `content-rules.json` | @network |
| R-045 | Relative URLs throughout; host HTTPS redirect (client) | content check; the deployed check is the client's |
| R-046 | `src/content/routes.ts`, `BaseLayout.astro` | unit test, content check |
| R-047 | Standard HTML, CSS and ES2022 only | manual check in Firefox, Safari, Edge |
| R-048 | Static HTML output; `no-js` fallbacks in `menu.ts`, `disclosure.ts` | `--project=nojs` |
| R-049 | `statements.ts` `verificationSteps`; `src/pages/trust.astro`; `facts.rejectionGrounds` | read-through |
| R-050 | "When an order goes wrong" in `src/pages/trust.astro`; `facts.disputeOutcomes` | read-through |
| R-051 | `statements.ts` `legalPosition`; `src/pages/trust.astro`; "restock" and "replenish" in `content-rules.json` | content check |
| R-052 | "One order, end to end" in `src/pages/fees.astro`; `facts.tracingRecords`, `facts.sellerPayoutTiming` | content check ("DSCSA", "held until") |
| R-053 | "Can I list this?" table in `src/pages/selling.astro`; future island in `src/components/islands/` | read-through |
| R-054 | Worked example in `src/pages/fees.astro`; `facts.feeExample*`; future calculator island | read-through, content check |
| R-055 | "Before you apply" list in `src/pages/apply.astro` | read-through |
