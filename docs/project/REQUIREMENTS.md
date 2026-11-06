# Requirements

Owner: requirements-analyst. Source: BRIEF.md, DECISIONS.md (D-1 to D-5).

Scope (D-1): this project is the public marketing website for the pharmacy
overstock marketplace. The marketplace features in the proposal (F01 to F16)
are what the site explains and sells. The site does not implement them.

## Roles

These are visitor types for the marketing site. The marketplace's own roles
(pharmacy owner, staff, administrator) appear on the site only as content.

| Role | Description |
|---|---|
| Seller pharmacy | Owner or manager of a licensed pharmacy with "excess or soon-to-expire stock they want to move". Needs to know how listing works, what it costs, what can't be listed, and how to apply. |
| Buyer pharmacy | Owner or buyer at a licensed pharmacy "looking for lower-cost inventory". Needs to know how search and price comparison work, how orders and problems are handled, and how to apply. |
| Dual-role pharmacy | A pharmacy that wants to both sell and buy. Needs to know that "a single pharmacy can act as both buyer and seller from the same account". |
| Trust evaluator | Pharmacy staff, compliance lead, IT contact or owner checking whether the platform is safe to join. Needs verification process, security measures, what data is and isn't stored, exclusions, legal pages and a contact route. |
| Returning member | A verified pharmacy user looking for the way into the marketplace app. Needs a visible Sign in route. |

Not a role: patients and the general public. The marketplace is B2B for
licensed pharmacies only (R-010).

## Page inventory

The brief names no pages. The Apply and Sign in routes come from the
Orchestrator's scope brief; every other page is inferred from the content the
brief asks the site to carry. All rows marked `assumption` may be merged or
split by design as long as every requirement below stays covered and
reachable.

| Page | Purpose | Requirement IDs | Source |
|---|---|---|---|
| Home | What the marketplace is, who it's for, the seller and buyer value, trust summary, Apply | R-006 to R-010, R-020 | assumption |
| How it works (selling) | Seller journey from verification to shipped order | R-011, R-012, R-014 | assumption |
| How it works (buying) | Buyer journey from search to delivery confirmation | R-011, R-013, R-014 | assumption |
| Trust and security | Verification, security measures, data stored and not stored, exclusions, oversight | R-017 to R-023 | assumption |
| Fees | That a platform fee applies, amount pending | R-024 | assumption |
| FAQ | Short answers to the questions above | R-026 | assumption |
| Apply | Verification application form (client-side only) | R-027 to R-030 | Orchestrator scope |
| Sign in | Route for returning members (placeholder until the app exists) | R-003 | Orchestrator scope |
| Contact | How to reach the platform team | R-031 | assumption |
| Terms of use, Privacy policy, Dispute and return policy | Legal pages, placeholders until the client supplies text | R-032 | brief: Client Responsibilities |
| Not found (404) | Recovery for broken links | R-005 | assumption |

## Requirements

Source is `brief: <section>` for what the client proposal says, `owner:` for
the owner's instruction or answers in BRIEF.md, `decision: D-n` for
DECISIONS.md, or `assumption` where the analyst inferred it. No `proposed`
items exist yet (product-decisions.md is empty).

Priority is `must`, `should` or `could`. Type is `functional`,
`non-functional`, `content`, `integration` or `constraint`.

"Main pages" means Home, both How it works pages, Trust and security, Fees,
FAQ and Apply.

### Structure and navigation

### R-001 Site pages and navigation

- Type: functional
- Priority: must
- Source: owner: "Public marketing site"; assumption for the page list
- Description: The site has the pages in the page inventory (or a merged
  arrangement that keeps every requirement reachable). Every page shares a
  primary navigation that reaches all main pages, and a footer.
- Acceptance criteria:
  - [ ] Given any page at 1440 px, when a tester uses only the primary navigation, then every main page is reachable in one click.
  - [ ] Given any page at 390 px, when the tester opens the navigation (menu control if collapsed), then every main page is reachable within two activations.
  - [ ] Given any page, when the tester follows every internal link, then none returns a 404 or a blank page.
  - [ ] Given the current page, when the tester inspects the navigation, then the current page's link is marked with `aria-current="page"`.

### R-002 Apply call to action on every page

- Type: functional
- Priority: must
- Source: owner scope brief (route to Apply); brief: Project Overview "Only verified pharmacies can register, list or buy"
- Description: Every page except Apply itself offers a visible link to the
  Apply page.
- Acceptance criteria:
  - [ ] Given any page other than Apply, at 390, 834 and 1440 px, when the page first loads, then an Apply link is visible without scrolling or is reachable from the open navigation menu.
  - [ ] Given any page other than Apply, when the tester activates the Apply link, then the Apply page loads.

### R-003 Sign in route

- Type: functional
- Priority: must
- Source: owner scope brief (route to Sign in); assumption for placeholder behaviour
- Description: The navigation has a Sign in link. Until the marketplace app
  exists, it leads to a page that says sign-in happens in the marketplace app,
  that the app is not available from this site yet, and links to Apply and
  Contact. The site has no login form.
- Acceptance criteria:
  - [ ] Given any page, when the tester looks at the primary navigation (expanded on 390 px), then a link named "Sign in" is present.
  - [ ] Given the Sign in link, when activated, then the resulting page contains no password field and states that sign-in is not available from this site yet.
  - [ ] Given the Sign in page, when the tester reads it, then it links to Apply and to Contact.

### R-004 Footer

- Type: functional
- Priority: must
- Source: brief: Client Responsibilities "Define the platform fee, return and dispute policy, and terms of use"; assumption
- Description: Every page has a footer with links to Terms of use, Privacy
  policy, Dispute and return policy, Contact, Apply and Sign in, plus the
  brand name placeholder.
- Acceptance criteria:
  - [ ] Given any page, when the tester scrolls to the end, then the footer contains links to Terms of use, Privacy policy, Dispute and return policy, Contact, Apply and Sign in.
  - [ ] Given each footer link, when activated, then a page loads (no 404).

### R-005 Not found page

- Type: functional
- Priority: could
- Source: assumption
- Description: Unknown URLs show a page with the site navigation and links
  to Home and Apply.
- Acceptance criteria:
  - [ ] Given the deployed or locally served site, when the tester requests `/does-not-exist`, then a page with the primary navigation and links to Home and Apply is shown.

### What the marketplace is

### R-006 Core proposition on Home

- Type: content
- Priority: must
- Source: brief: title and Project Overview "A secure, verified-only web marketplace where pharmacies list, discover and buy surplus medication from each other"; Conclusion
- Description: Home states, near the top, that this is a secure,
  verified-only marketplace where licensed pharmacies sell surplus
  medication to other verified pharmacies. It states the problem from the
  Conclusion: surplus stock is costly to hold and wasteful to discard, while
  other pharmacies pay more than they need to restock the same products.
- Acceptance criteria:
  - [ ] Given Home at 390 px and 1440 px, when the page loads, then the first viewport text says the marketplace is for licensed or verified pharmacies and is about surplus or overstock medication.
  - [ ] Given Home, when the tester reads the page, then it contains a statement of the problem (surplus is costly to hold or wasteful to discard, and other pharmacies overpay to restock).

### R-007 Seller value

- Type: content
- Priority: must
- Source: brief: Project Overview "Instead of writing off unused stock, a pharmacy lists it at a price it chooses"; Target Users (Seller Pharmacies)
- Description: The site tells sellers they can list overstock and
  near-surplus stock at a price they choose and recover value that would
  otherwise be written off.
- Acceptance criteria:
  - [ ] Given Home and the selling page, when the tester reads them, then both say that sellers set their own price.
  - [ ] Given the selling page, when the tester reads it, then it says sellers recover value from stock they would otherwise write off or discard.

### R-008 Buyer value

- Type: content
- Priority: must
- Source: brief: Project Overview "Other pharmacies browse, compare prices and buy directly, saving money on inventory"; Target Users (Buyer Pharmacies)
- Description: The site tells buyers they can browse, compare prices across
  sellers and buy directly from other verified pharmacies to cut inventory
  cost. It makes no savings figure claims (R-033).
- Acceptance criteria:
  - [ ] Given Home and the buying page, when the tester reads them, then both say buyers can compare prices across sellers and buy directly from other verified pharmacies.
  - [ ] Given Home and the buying page, when the tester searches the text, then no percentage or currency amount is claimed as a saving.

### R-009 One account for buying and selling

- Type: content
- Priority: must
- Source: brief: Project Overview "A single pharmacy can act as both buyer and seller from the same account"
- Description: The site states that one pharmacy account can both buy and
  sell.
- Acceptance criteria:
  - [ ] Given Home or the FAQ, when the tester reads it, then a sentence states that one pharmacy account can both buy and sell.

### R-010 Licensed pharmacies only, not the public

- Type: content
- Priority: must
- Source: brief: Project Overview "licensed pharmacies can sell ... to other verified pharmacies"; Project Objective "Restricts access to verified, licensed pharmacies only, with admin approval before any trading"
- Description: The site states that only licensed pharmacies that pass
  verification can list or buy, and that the marketplace does not sell to
  patients or the public.
- Acceptance criteria:
  - [ ] Given Home, when the tester reads it, then it states that only verified, licensed pharmacies can list or buy.
  - [ ] Given the FAQ, when the tester reads it, then one answer states that patients and members of the public cannot buy on the marketplace.
  - [ ] Given any page, when the tester looks for consumer purchase paths (product prices, "buy now", cart), then none exist.

### How the marketplace works

### R-011 Verification process explained

- Type: content
- Priority: must
- Source: brief: Accounts, Verification & Security; F01, F02; Definition of Done "Verification"; Key Challenges "Trust and verification"
- Description: The site explains verification in order: the pharmacy
  registers with its licence number, business details and licence documents;
  a platform administrator reviews the application; the pharmacy is approved
  or rejected and told by email; no listing, searching or buying happens
  before approval. It does not promise a review time (Q-11) and does not name
  licence check sources (client to provide).
- Acceptance criteria:
  - [ ] Given the Trust and security page or a How it works page, when the tester reads the verification section, then it names these steps in order: register with licence number and business details, upload licence documents, administrator review, approval or rejection by email.
  - [ ] Given the same section, when the tester reads it, then it states that unverified pharmacies cannot list, search or buy.
  - [ ] Given any page, when the tester searches for a review turnaround ("hours", "days", "within"), then no verification time is promised unless Q-11 is answered.

### R-012 Selling workflow explained

- Type: content
- Priority: must
- Source: brief: Listings & Inventory; F05, F06; Orders & Payments (seller steps); Project Objective "list overstock quickly, one item at a time or in bulk by CSV upload"
- Description: The selling page explains: creating a listing with drug name,
  strength, form, quantity, lot number, expiry date, condition, price and
  photos; bulk upload by CSV with validation and a report of invalid rows;
  editing, pausing or removing listings; automatic hiding of expired items; a
  minimum remaining shelf-life rule set by the platform; confirming orders,
  adding shipping details and a tracking number.
- Acceptance criteria:
  - [ ] Given the selling page, when the tester reads it, then it lists all nine listing fields: drug name, strength, form, quantity, lot number, expiry date, condition, price, photos.
  - [ ] Given the selling page, when the tester reads it, then it says listings can be added one at a time or in bulk by CSV, and that invalid CSV rows are reported.
  - [ ] Given the selling page, when the tester reads it, then it says expired items are hidden automatically and a minimum remaining shelf life applies.
  - [ ] Given the selling page, when the tester reads it, then it says sellers confirm orders and enter shipping details and a tracking number.
  - [ ] Given the selling page, when the tester reads it, then it does not state a specific minimum shelf-life value (the administrator configures it).

### R-013 Buying workflow explained

- Type: content
- Priority: must
- Source: brief: Search & Discovery; F07, F08; Project Objective "Lets buyers search, filter and compare prices across sellers"
- Description: The buying page explains search by drug name, strength, form
  and manufacturer; filters for price, expiry date, quantity and seller
  location; a price comparison view of all sellers of the same product side
  by side; saved searches with email alerts when a wanted item is listed.
- Acceptance criteria:
  - [ ] Given the buying page, when the tester reads it, then it names the four search fields (drug name, strength, form, manufacturer) and the four filters (price, expiry date, quantity, seller location).
  - [ ] Given the buying page, when the tester reads it, then it describes side-by-side price comparison across sellers of the same product.
  - [ ] Given the buying page, when the tester reads it, then it mentions saved searches and email alerts.

### R-014 Order cycle explained

- Type: content
- Priority: must
- Source: brief: Orders & Payments; F09, F11; Project Objective "Handles the full order cycle from checkout to delivery confirmation"
- Description: The site explains the order cycle: cart and checkout for one
  or more items from one seller; seller confirms and ships with tracking;
  buyer confirms delivery; buyer can report an issue with photos; invoices
  and order history for both sides.
- Acceptance criteria:
  - [ ] Given a How it works page, when the tester reads the order section, then it shows these stages in order: checkout, seller confirmation, shipping with tracking, delivery confirmation.
  - [ ] Given the same section, when the tester reads it, then it says a cart holds items from a single seller per checkout.
  - [ ] Given the same section or the FAQ, when the tester reads it, then it says buyers can report an issue with photos, and that both sides get invoices and order history.

### R-015 Payments explained

- Type: content
- Priority: must
- Source: brief: Orders & Payments "Payments through a third-party payment provider; card and bank details are never stored on our servers"; F10; Key Challenges "Payments"
- Description: The site says payments go through a third-party payment
  provider and that card and bank details are never stored on the platform's
  servers. It does not name a provider (Q-10) and does not state payout
  timing (to be confirmed per the brief).
- Acceptance criteria:
  - [ ] Given the buying page, Trust and security page or FAQ, when the tester reads it, then it states payments go through a third-party payment provider and card and bank details are never stored on the platform's servers.
  - [ ] Given any page, when the tester searches for "Stripe" and for payout timing ("paid within", "payout in"), then neither appears unless Q-10 is answered.

### R-016 Communication features explained

- Type: content
- Priority: should
- Source: brief: Communication & Notifications; F12, F13
- Description: The site mentions email notifications for new orders, status
  changes, approvals and alerts; an in-app notification centre; and optional
  buyer-seller messaging tied to a listing or order.
- Acceptance criteria:
  - [ ] Given a How it works page or the FAQ, when the tester reads it, then it mentions email notifications, an in-app notification centre, and messaging tied to a specific listing or order.

### R-017 Accounts and roles explained

- Type: content
- Priority: should
- Source: brief: Accounts, Verification & Security (secure login, optional two-factor, roles for owner, staff and administrator); F03, F04
- Description: The site says members sign in with email and password, can
  turn on two-factor authentication, and that a pharmacy can have owner and
  staff roles with different access.
- Acceptance criteria:
  - [ ] Given the Trust and security page or FAQ, when the tester reads it, then it mentions optional two-factor authentication and separate owner and staff roles.

### Trust, security and data

### R-018 Platform oversight explained

- Type: content
- Priority: must
- Source: brief: Project Overview "Every account is reviewed by a platform administrator before it gets access, and every action is recorded in an audit log"; Admin Console; F14, F15
- Description: The Trust and security page says administrators review every
  account, moderate listings, manage disputes, and that key actions are
  recorded in an audit log that can't be altered.
- Acceptance criteria:
  - [ ] Given the Trust and security page, when the tester reads it, then it mentions account review by administrators, listing moderation, dispute handling and an audit log of key actions.

### R-019 Security measures, sourced from the proposal

- Type: content
- Priority: must
- Source: brief: Security Measures; Technical Architecture "File storage"; F16; Conclusion
- Description: The Trust and security page lists security measures, each
  traceable to the proposal. Default wording level (Q-5): HTTPS for all
  traffic; encryption at rest for the database, backups and stored documents;
  extra encryption for the most sensitive fields such as licence numbers and
  tax IDs; passwords never stored in readable form; role-based access and
  strict separation of each pharmacy's data; protection against common web
  attacks and rate limiting; audit logging of logins, approvals, listing and
  order changes; licence documents in private storage reached only through
  expiring links. Implementation names (AES-256, Argon2, bcrypt, SQL
  injection, XSS, CSRF, managed secrets store) are held back until the client
  approves them under Q-5.
- Acceptance criteria:
  - [ ] Given the Trust and security page, when the tester compares each security statement with the Security Measures and File storage text in BRIEF.md, then every statement has a matching source line.
  - [ ] Given the whole site, when the tester searches for "HIPAA", "SOC 2", "ISO 27001", "GDPR compliant", "certified", "audited by", "bank-grade" and "military-grade", then none appear.
  - [ ] Given the whole site, when the tester searches for "AES-256", "Argon2" and "bcrypt", then none appear unless DECISIONS.md records the client's approval under Q-5.

### R-020 Data the platform stores and does not store

- Type: content
- Priority: must
- Source: brief: Project Overview "The platform does not handle patient records. It stores only business data about pharmacies, listings and orders"; Orders & Payments; Conclusion "avoids storing payment card data or patient information altogether"
- Description: The site states plainly what is stored (business data about
  pharmacies, listings and orders, licence documents, contact details) and
  what is not (patient records, card and bank details). Home carries a short
  version; the Trust and security page carries the full one.
- Acceptance criteria:
  - [ ] Given the Trust and security page, when the tester reads it, then it has a "stored" list naming pharmacy business data, listings, orders, licence documents and contact details, and a "not stored" list naming patient records and card and bank details.
  - [ ] Given Home, when the tester reads it, then it states the platform holds no patient records and no card data.

### R-021 Product exclusions

- Type: content
- Priority: must
- Source: brief: Key Challenges "Controlled substances and cold-chain products are excluded from this release unless the client confirms they are permitted and provides the rules"
- Description: The site states that controlled substances and cold-chain
  (refrigerated) products cannot be listed or bought. The statement appears
  on the selling page and the FAQ, and on the Trust and security page.
- Acceptance criteria:
  - [ ] Given the selling page, the FAQ and the Trust and security page, when the tester reads each, then each states that controlled substances and cold-chain products are not accepted.
  - [ ] Given the whole site, when the tester searches, then no text implies controlled substances or cold-chain products are allowed.

### R-022 No regulatory claims

- Type: constraint
- Priority: must
- Source: brief: Key Challenges "Regulatory compliance ... The client is responsible for confirming licensing, drug supply chain and any state or national requirements with a qualified legal advisor"; Client Responsibilities
- Description: The site makes no claim that the platform complies with,
  is approved by, or is registered under any law, regulator or licensing
  body. It does not name a regulator or a supply-chain law (for example a
  drug supply chain security act) until the client supplies approved
  wording.
- Acceptance criteria:
  - [ ] Given the whole site, when the tester searches for "compliant", "compliance", "approved by", "regulated by", "licensed by", "accredited", "FDA", "DSCSA", "NABP", "MHRA", "GPhC" and "DEA", then none appear as a claim about the platform.
  - [ ] Given any legal or regulatory topic on the site, when the tester reads it, then it is a marked placeholder (R-034) or says requirements vary by region.

### R-023 Listing quality safeguards

- Type: content
- Priority: should
- Source: brief: Key Challenges "Listing quality: Accurate expiry dates, lot numbers and conditions are essential. Required fields and validation will reduce bad listings"
- Description: The Trust and security page (or selling page) says listings
  require expiry date, lot number and condition, are validated, and expired
  items are hidden automatically.
- Acceptance criteria:
  - [ ] Given the Trust and security page or the selling page, when the tester reads it, then it states that expiry date, lot number and condition are required on every listing and that expired items are hidden.

### R-024 Platform fee

- Type: content
- Priority: must
- Source: brief: Orders & Payments "Platform fee recorded on every order"; Key Challenges "Payments"; Client Responsibilities "Define the platform fee"
- Description: The site says a platform fee applies to each order. It states
  no amount, percentage, payer or free period until the client defines the
  fee (Q-3). The pending detail is a marked placeholder.
- Acceptance criteria:
  - [ ] Given the Fees page (or the section that replaces it), when the tester reads it, then it says a platform fee applies to each order and shows a marked placeholder for the amount.
  - [ ] Given the whole site, when the tester searches for "%", "free", "no fee" and currency symbols, then no fee amount or free offer is stated.

### R-025 Disputes and returns

- Type: content
- Priority: should
- Source: brief: Key Challenges "A clear dispute process and return policy must be defined by the client before launch"; Orders & Payments (issue reporting)
- Description: The site says buyers can report an issue on an order and
  administrators manage disputes. The return and dispute policy itself is a
  marked placeholder page until the client supplies it.
- Acceptance criteria:
  - [ ] Given the FAQ or a How it works page, when the tester reads it, then it says order issues can be reported and administrators handle disputes, and links to the Dispute and return policy page.
  - [ ] Given the Dispute and return policy page, when the tester opens it, then its body is a marked placeholder and states no refund, return window or outcome.

### R-026 FAQ

- Type: content
- Priority: should
- Source: assumption, built from brief sections cited in each answer
- Description: An FAQ answers at least: who can join; can one account buy and
  sell; how verification works; what it costs; can controlled substances or
  cold-chain products be listed; is patient data stored; is card data stored;
  what happens if an order has a problem; which regions are served. Answers
  that the brief can't support (cost, regions) are marked placeholders.
- Acceptance criteria:
  - [ ] Given the FAQ, when the tester reads it, then each of the nine questions above has an answer.
  - [ ] Given each answer, when the tester compares it with BRIEF.md, then its facts match the brief or it is a marked placeholder.
  - [ ] Given the FAQ uses expand/collapse, when operated by keyboard, then each question toggles with Enter and Space and exposes its state with `aria-expanded`.

### Apply and contact

### R-027 Apply form

- Type: functional
- Priority: must
- Source: brief: Accounts "Pharmacy registration with licence number, business details and document upload"; F01; owner scope brief (route to Apply); assumption for field list
- Description: The Apply page has a form for starting verification with
  these fields: pharmacy legal name, licence number, licensing state or
  region, business address, contact name, contact role, work email, phone,
  and intent (sell, buy, or both). It does not collect licence documents;
  it says documents are uploaded in the marketplace during registration. It
  does not collect patient data, card data or bank details.
- Acceptance criteria:
  - [ ] Given the Apply page, when the tester inspects the form, then it has the nine fields listed above, each with a visible programmatic label.
  - [ ] Given the Apply page, when the tester inspects the form, then it contains no `input type="file"` and no fields for card, bank or patient details.
  - [ ] Given the intent field, when the tester inspects it, then "Sell", "Buy" and "Both" are the options.
  - [ ] Given the Apply page, when the tester reads it, then it says licence documents are uploaded later in the marketplace registration.

### R-028 Apply form validation

- Type: functional
- Priority: must
- Source: assumption; WCAG 2.2 AA (R-041)
- Description: The form validates in the browser: all fields required except
  phone (assumption), email format checked, errors shown next to each field
  and in a summary at the top that moves focus on submit.
- Acceptance criteria:
  - [ ] Given an empty form, when the tester submits, then a summary lists every error, focus moves to the summary, and each error links to its field.
  - [ ] Given an invalid email such as `name@`, when the tester submits, then the email field shows an error tied to it with `aria-describedby` and has `aria-invalid="true"`.
  - [ ] Given a field with an error, when the tester corrects it and resubmits, then that error disappears.

### R-029 Apply form sends and stores nothing

- Type: constraint
- Priority: must
- Source: owner: "Public marketing site" (no app or backend); brief: Data protection (licence numbers are among the most sensitive fields); assumption
- Description: Until a submission endpoint is agreed (Q-6), the form makes no
  network request with its data and stores nothing in cookies, localStorage,
  sessionStorage or IndexedDB. The page says, near the form, that this is a
  preview and the application is not yet sent.
- Acceptance criteria:
  - [ ] Given browser dev tools with the network log open, when the tester submits a valid form, then no request carries the form data.
  - [ ] Given a valid submission, when the tester inspects cookies, localStorage, sessionStorage and IndexedDB, then none holds any entered value.
  - [ ] Given the Apply page, when the tester reads the area around the form, then a marked notice says applications are not sent yet.

### R-030 Apply confirmation and next steps

- Type: content
- Priority: must
- Source: brief: Accounts, Verification & Security; Definition of Done "Verification"
- Description: After a valid submission, the page shows what happens next:
  documents are uploaded in the marketplace, an administrator reviews the
  application, the pharmacy is told the result by email, and trading starts
  only after approval. No review time is promised.
- Acceptance criteria:
  - [ ] Given a valid submission, when the confirmation appears, then it lists the next steps in that order and focus moves to the confirmation heading.
  - [ ] Given the confirmation, when the tester reads it, then it states no review time.

### R-031 Contact route

- Type: content
- Priority: should
- Source: brief: Client Responsibilities "Provide branding assets, logo and any content for the site"; assumption
- Description: A Contact page gives a way to reach the platform team. Until
  the client supplies details (Q-9), the email, phone and address are marked
  placeholders. No contact form sends data (same rule as R-029).
- Acceptance criteria:
  - [ ] Given the Contact page, when the tester reads it, then each contact detail is real client-supplied data recorded in DECISIONS.md or a marked placeholder.
  - [ ] Given any contact form, when submitted, then no request carries its data.

### R-032 Legal pages

- Type: content
- Priority: must
- Source: brief: Client Responsibilities "Define the platform fee, return and dispute policy, and terms of use"; "Obtain legal advice ... on what must be disclosed to users"
- Description: Terms of use, Privacy policy, and Dispute and return policy
  pages exist and are linked from the footer. Their bodies are marked
  placeholders until the client supplies text. No legal text is drafted by
  the team.
- Acceptance criteria:
  - [ ] Given each of the three legal pages, when the tester opens it, then it has a heading naming the policy and a marked placeholder saying the text is to be supplied by the client.
  - [ ] Given each legal page, when the tester reads it, then it contains no drafted legal terms.

### Content rules

### R-033 No invented proof

- Type: constraint
- Priority: must
- Source: decision: D-5 ("must not pose as real pharmacies, people or customers"); brief: Key Challenges (no regulatory claims); assumption (the marketplace has not launched)
- Description: The site contains no testimonials, quotes attributed to
  people or pharmacies, customer or partner logos, member counts, listing
  counts, savings figures, transaction volumes, ratings, awards, press
  mentions, certifications or credentials unless the client supplies them
  and DECISIONS.md records it. It does not present the brief's scale goal
  ("thousands of pharmacies") as a fact about current use.
- Acceptance criteria:
  - [ ] Given every page, when the tester reads it, then no quotation is attributed to a named or described customer.
  - [ ] Given every page, when the tester checks every number on it, then each is either a fact from BRIEF.md (for example nine listing fields) or a marked placeholder; none is a usage, savings or customer statistic.
  - [ ] Given every page, when the tester checks images, then none is a third-party company logo, seal, badge or certification mark.

### R-034 Placeholders clearly marked

- Type: constraint
- Priority: must
- Source: decision: D-2; brief: Client Responsibilities "Provide branding assets, logo and any content for the site"; assumption
- Description: Every piece of content waiting on the client (brand name,
  logo, fee, contact details, legal text, regions, review time) uses one
  consistent visible marker and one consistent machine-findable marker, so a
  tester can list every placeholder. The design phase picks the marker's
  look.
- Acceptance criteria:
  - [ ] Given the built site, when the tester searches the source for the agreed machine-findable marker, then the count equals the number of visible placeholders found by reading every page.
  - [ ] Given any placeholder, when the tester reads it, then it says what content is missing.

### R-035 Brand name placeholder

- Type: constraint
- Priority: must
- Source: decision: D-2; brief: Client Responsibilities (branding)
- Description: The brand name is a working placeholder used identically
  across pages, page titles and the footer. No logo mark is presented as the
  client's final logo.
- Acceptance criteria:
  - [ ] Given every page, when the tester compares the brand name in the header, footer and `<title>`, then it is the same string on every page.
  - [ ] Given the header, when the tester inspects the brand mark, then it is marked as a placeholder (R-034).

### R-036 Imagery rules

- Type: constraint
- Priority: must
- Source: owner: "if you need assets then you can open my chrome and open chatgpt to generate images"; owner rejection of concept B "Too much UI, no imagery"; decision: D-5
- Description: The site uses made-for-the-brand imagery, not stock photos and
  not mainly interface mockups. Generated images are illustrative: they must
  not show identifiable real pharmacies, real brand-name drug packaging,
  readable licence documents, or people presented as customers. Every
  meaningful image has alt text; decorative images have empty alt.
- Acceptance criteria:
  - [ ] Given Home at 1440 px, when the tester looks at the page, then at least one image that is not an interface screenshot or mockup appears.
  - [ ] Given every image, when the tester inspects it, then it shows no readable real brand name of a drug, pharmacy or company, and no readable licence or document text.
  - [ ] Given every image, when the tester inspects the `alt` attribute, then meaningful images have descriptive alt text and decorative images have `alt=""`.
  - [ ] Given any image showing a person, when the tester reads nearby text, then the person is not presented as a named customer or member.

### R-037 Future features not presented as available

- Type: constraint
- Priority: must
- Source: brief: Future Enhancements; Scope Alignment Summary ("Not in scope")
- Description: The site does not present native iOS or Android apps,
  pharmacy system integrations, automatic listing sync, shipping label
  generation, carrier rate comparison, offers or negotiation, advanced
  analytics or price trends, demand forecasting, or wholesaler accounts as
  available. Default: the site does not mention them.
- Acceptance criteria:
  - [ ] Given the whole site, when the tester searches for "app store", "iOS", "Android", "integration", "sync", "shipping label", "negotiat", "offer", "forecast", "analytics" and "wholesaler", then none describes a current feature.

### R-038 No competitor mention

- Type: constraint
- Priority: should
- Source: assumption (the brief names MatchRX as internal inspiration only)
- Description: The site does not name MatchRX or any other competitor.
- Acceptance criteria:
  - [ ] Given the whole site, when the tester searches for "MatchRX", then there are no matches.

### R-039 Consistent language and spelling

- Type: content
- Priority: should
- Source: brief (uses "licence", "fulfil"); assumption
- Description: Pages are in English with `lang` set. One spelling variant is
  used throughout. Default: follow the brief's spelling ("licence") until Q-2
  settles the region.
- Acceptance criteria:
  - [ ] Given every page, when the tester inspects `<html>`, then it has a `lang` attribute starting with `en`.
  - [ ] Given the whole site, when the tester searches for "license" and "licence", then only one spelling appears in visible text.

### Non-functional

### R-040 Responsive layout

- Type: non-functional
- Priority: must
- Source: brief: Technical Architecture "responsive for desktop, tablet and mobile browsers"; Orchestrator scope brief (390, 834, 1440)
- Description: Every page works at 390, 834 and 1440 px wide with no
  horizontal scroll and no clipped or overlapping text.
- Acceptance criteria:
  - [ ] Given every page at 390, 834 and 1440 px, when the tester checks `document.documentElement.scrollWidth`, then it is no larger than the viewport width.
  - [ ] Given every page at those widths, when the tester looks at a full-page screenshot, then no text is clipped, overlapping or hidden behind other elements.
  - [ ] Given every page at 320 px wide (WCAG reflow), when the tester scrolls vertically, then all content is reachable without horizontal scrolling.

### R-041 Accessibility WCAG 2.2 AA

- Type: non-functional
- Priority: must
- Source: Orchestrator scope brief; assumption
- Description: The site meets WCAG 2.2 level AA.
- Acceptance criteria:
  - [ ] Given every page, when the tester runs axe-core, then it reports no serious or critical violations.
  - [ ] Given every page, when the tester uses only the keyboard, then every link, button and form control is reachable in a logical order, has a visible focus indicator that isn't hidden by sticky content, and nothing traps focus.
  - [ ] Given every page, when the tester presses Tab once after load, then a "Skip to content" link appears and moves focus to the main content.
  - [ ] Given every page, when the tester inspects headings, then there is exactly one `h1` and heading levels don't skip.
  - [ ] Given every page, when the tester inspects landmarks, then `header`, `nav`, `main` and `footer` are present.
  - [ ] Given text and interface parts, when the tester measures contrast, then normal text is at least 4.5:1, large text at least 3:1, and controls and focus indicators at least 3:1.
  - [ ] Given every interactive target, when the tester measures it, then it is at least 24 by 24 CSS px or has the spacing WCAG 2.5.8 allows.
  - [ ] Given the browser zoomed to 200%, when the tester reads every page, then no content or function is lost.

### R-042 Reduced motion

- Type: non-functional
- Priority: must
- Source: Orchestrator scope brief; WCAG 2.2 (2.3.3 guidance, 2.2.2)
- Description: With `prefers-reduced-motion: reduce`, the site shows no
  non-essential animation, parallax or auto-playing motion. Any motion that
  lasts more than 5 seconds has a pause control in all modes.
- Acceptance criteria:
  - [ ] Given the browser set to reduced motion, when the tester loads and scrolls every page, then no element moves except in direct response to the tester's input (such as opening a menu), and those changes are instant or fades only.
  - [ ] Given any auto-playing motion longer than 5 seconds, when the tester looks for a control, then a pause or stop control exists.

### R-043 Page load under 3 seconds

- Type: non-functional
- Priority: must
- Source: brief: Definition of Done "Performance: main pages load in under 3 seconds under normal use"; assumption for how to measure
- Description: Main pages load in under 3 seconds. "Normal use" is measured
  as Lighthouse's default mobile and desktop presets against a production
  build served locally or from the host.
- Acceptance criteria:
  - [ ] Given each main page, when the tester runs Lighthouse with the mobile preset, then Largest Contentful Paint is under 3.0 s.
  - [ ] Given each main page, when the tester runs Lighthouse with the desktop preset, then Largest Contentful Paint is under 3.0 s.
  - [ ] Given each main page, when the tester runs Lighthouse, then Cumulative Layout Shift is under 0.1.

### R-044 No unapproved third-party requests

- Type: constraint
- Priority: must
- Source: brief: Client Responsibilities "Approve any plugin, API or paid tool before it is purchased"; Project Overview (small sensitive-data footprint)
- Description: The site loads no third-party scripts, analytics, trackers,
  chat widgets or embeds, and sets no cookies, unless DECISIONS.md lists the
  origin as approved.
- Acceptance criteria:
  - [ ] Given every page, when the tester records network requests from load to idle, then every request goes to the site's own origin or an origin listed as approved in DECISIONS.md.
  - [ ] Given every page, when the tester inspects cookies after load, then none are set.

### R-045 Secure delivery

- Type: non-functional
- Priority: should
- Source: brief: Security Measures "TLS (HTTPS) for all data in transit"
- Description: All links and asset URLs use HTTPS or are relative. When
  deployed, the site is served only over HTTPS. (Hosting is not in this
  scope; the deployed check applies if the site is deployed.)
- Acceptance criteria:
  - [ ] Given the built site, when the tester searches the output for `http://`, then no asset or link uses it (XML namespace strings excepted).
  - [ ] Given a deployed site, when the tester requests the `http://` URL, then it redirects to `https://`.

### R-046 Page titles and descriptions

- Type: non-functional
- Priority: should
- Source: assumption
- Description: Each page has a unique, descriptive `<title>` and meta
  description.
- Acceptance criteria:
  - [ ] Given every page, when the tester inspects the head, then `<title>` and `<meta name="description">` exist and no two pages share the same title.

### R-047 Browser support

- Type: non-functional
- Priority: should
- Source: assumption
- Description: The site works in the current versions of Chrome, Edge,
  Firefox and Safari (desktop and iOS).
- Acceptance criteria:
  - [ ] Given each listed browser, when the tester opens Home, Apply and the Trust and security page and submits the Apply form, then layout and validation behave as in Chrome.

### R-048 Content readable without JavaScript

- Type: non-functional
- Priority: could
- Source: assumption
- Description: Page text and navigation links render with JavaScript
  disabled. The Apply form may need JavaScript for validation.
- Acceptance criteria:
  - [ ] Given JavaScript disabled, when the tester loads each main page, then the headings, body text and navigation links are present.

### R-049 Verification shown step by step

- Type: content
- Priority: must
- Source: proposed (IDEA-2, PD-1)
- Description: The trust content shows the verification process as steps:
  what the applicant provides, who reviews it (a platform administrator),
  what the pharmacy cannot do until approved, and what leads to rejection.
  Review time and rejection grounds are marked placeholders until the client
  supplies its verification policy (Q-8).
- Acceptance criteria:
  - [ ] Given the trust content, when the tester reads it, then four items are present: what is submitted, who reviews, what is blocked before approval (listing, searching, buying), and the grounds for rejection.
  - [ ] Given the review time and rejection grounds, when the client has not supplied them, then they render as marked placeholders (R-034).

### R-050 "When an order goes wrong" scenarios

- Type: content
- Priority: must
- Source: proposed (IDEA-1, PD-2)
- Description: A section covers four cases: short shipment, damaged goods,
  wrong lot or expiry, never arrived. Each names the mechanism the brief
  defines (issue report with photos, admin dispute handling) and leaves the
  outcome as a placeholder until the client's dispute and return policy
  exists.
- Acceptance criteria:
  - [ ] Given the section, when the tester reads it, then all four cases appear, each naming who reports, how (issue report with photos) and who reviews.
  - [ ] Given outcomes (refund, return, credit), when the policy is missing, then they are marked placeholders and no outcome is promised.

### R-051 Neutral legal position and framing rule

- Type: content
- Priority: must
- Source: proposed (IDEA-5, PD-3); RISKS K-1
- Description: A short section says that resale of medication between
  pharmacies is regulated, rules vary by region, the platform's approach is
  being set with a legal advisor, and it will be stated before trading opens.
  Site-wide, the offer is framed as moving surplus stock between verified,
  licensed pharmacies, not as cheaper restocking.
- Acceptance criteria:
  - [ ] Given the section, when the tester reads it, then it contains those four statements and makes no claim that any sale is lawful.
  - [ ] Given every page, when the tester searches for "restock" and "replenish", then neither appears as a benefit claim.

### R-052 One order's records and money flow

- Type: content
- Priority: must
- Source: proposed (IDEA-4, PD-4)
- Description: One illustrative order shows the records it leaves
  (confirmation, shipping and tracking, delivery confirmation, invoices for
  both parties, audit log entries) and how money moves (buyer pays through
  the payment provider, platform fee recorded, seller payout timing as a
  placeholder). Tracing-law records are one marked placeholder. It does not
  say payment is held until delivery.
- Acceptance criteria:
  - [ ] Given the section, when the tester reads it, then both lists appear and the example is labelled as illustrative.
  - [ ] Given the text, when the tester searches for "DSCSA" and "held until", then neither appears.

### R-053 "Can I list this?" table

- Type: content
- Priority: must
- Source: proposed (IDEA-3, PD-5)
- Description: A static table of what can and cannot be listed, from the
  brief: required listing fields, the minimum shelf-life rule (value set by
  the admin, placeholder), automatic hiding of expired items, and the
  exclusion of controlled substances and cold-chain products.
- Acceptance criteria:
  - [ ] Given the table, when the tester reads it, then the exclusions, the shelf-life rule and the required fields all appear.

### R-054 Fee explainer structure

- Type: content
- Priority: must
- Source: proposed (IDEA-6, PD-6)
- Description: The fee content explains that a platform fee is recorded on
  every order, who it applies to and when it is charged, with a worked
  example whose numbers are marked placeholders until Q-3 is answered.
- Acceptance criteria:
  - [ ] Given the fee content, when the tester reads it, then a worked example is present and every amount in it is a marked placeholder.

### R-055 "Before you apply" list

- Type: content
- Priority: must
- Source: proposed (IDEA-7, PD-7)
- Description: The Apply page lists what the applicant needs ready (licence
  number, business details, licence documents for later upload), so the
  form isn't the first place they learn it.
- Acceptance criteria:
  - [ ] Given the Apply page, when the tester reads above the form, then the list of items to have ready appears.

## Journeys

### Seller pharmacy: decide to list surplus stock

1. Lands on Home and reads that this is a verified-only marketplace for licensed pharmacies to sell surplus medication (R-006, R-010).
2. Reads that sellers set their own price and recover value from stock they'd otherwise write off (R-007).
3. Opens How it works (selling) and sees listing fields, CSV bulk upload, shelf-life rule and shipping steps (R-001, R-012, R-014).
4. Checks what can't be listed: controlled substances and cold-chain products (R-021).
5. Checks the platform fee and sees the amount is pending (R-024).
6. Opens Apply, fills the form choosing "Sell", fixes any errors (R-002, R-027, R-028).
7. Sees the next steps: upload documents in the marketplace, admin review, email result (R-029, R-030).

### Buyer pharmacy: decide to buy lower-cost stock

1. Lands on Home and reads the buyer value (R-006, R-008).
2. Opens How it works (buying): search fields, filters, side-by-side price comparison, saved searches (R-013).
3. Reads the order cycle, delivery confirmation and issue reporting (R-014, R-025).
4. Reads that card and bank details are never stored (R-015, R-020).
5. Opens Apply, chooses "Buy", submits and reads next steps (R-027 to R-030).

### Dual-role pharmacy: one account for both

1. Reads on Home or the FAQ that one account can buy and sell (R-009, R-026).
2. Reads both How it works pages (R-012, R-013).
3. Applies choosing "Both" (R-027, R-030).

### Trust evaluator: check the platform is safe to join

1. Opens Trust and security from the navigation (R-001).
2. Reads how verification works and that unverified pharmacies can't trade (R-011).
3. Reads the security measures, each traceable to the proposal (R-019) and account protections (R-017).
4. Reads what data is stored and not stored: no patient records, no card data (R-020).
5. Reads exclusions and listing safeguards (R-021, R-023) and platform oversight (R-018).
6. Opens Terms, Privacy, and Dispute and return policy from the footer (R-004, R-032).
7. Contacts the team or shares the Apply link with the owner (R-031, R-002).

### Returning member: get into the marketplace

1. Selects Sign in in the navigation (R-003).
2. Reads that sign-in happens in the marketplace app and is not available from this site yet; follows Contact if needed (R-003, R-031).

## Non-goals

- The marketplace app and its screens: registration, login, dashboards,
  listings, CSV import, search, price comparison, cart, checkout, orders,
  notifications, messaging, admin console, audit log (F01 to F16). Owner:
  "Public marketing site (not the marketplace app, not app screens)"; D-1.
- Real authentication. No login form, password handling, two-factor or
  sessions (R-003).
- Real payments or any payment form.
- Real form submission, email sending or storage of applications. The Apply
  form validates in the browser only (R-029) until Q-6 is answered.
- Licence document upload on the marketing site (R-027).
- Live product listings, prices, drug catalogue or search on the marketing
  site. A reader might expect a "browse stock" preview; the brief puts
  listings behind verification ("Only verified pharmacies can register, list
  or buy").
- Selling to patients or the public (R-010).
- Drafting legal text: terms, privacy, dispute and return policy, regulatory
  disclosures. Client Responsibilities assign these to the client and their
  legal advisor.
- Writing the verification policy or naming licence check sources (client to
  provide).
- Future Enhancements presented as features: mobile apps, integrations,
  shipping labels, negotiation, analytics, wholesalers (R-037).
- Hosting, domain purchase, email service and analytics setup. "Not
  included" and client costs in the brief.
- Proposal commercial terms (timeline, milestones, ownership, support,
  revisions). These describe the build engagement, not site content.
- Design direction, visual identity and tech stack. Left to the design and
  architecture phases. The owner's concept B feedback ("Too plain / looks
  like SaaS", "Colors felt cold") goes to design; only the imagery point is
  a requirement here (R-036).
- Reusing concept A or B code or look (D-3).

## Open questions

None is blocking for the build: each has a default. Q-1, Q-3, Q-4, Q-5 and
Q-6 must be settled before the site goes public.

| # | Question | Default assumption | Impact if wrong | Blocking? |
|---|---|---|---|---|
| Q-1 | What is the brand name, and is there a logo? | Working placeholder name, marked (D-2, R-035). | Every page title, header, footer and image composition changes; copy that uses the name needs a pass. | no (launch-gating) |
| Q-2 | Which country or region does the marketplace serve, and in what currency? | Region-neutral copy; no regulator, law or currency named; "licence" spelling as in the brief (R-039). | Spelling, regulatory wording, location filter wording, FAQ "which regions" answer, and any later fee display change. US launch would bring "license" spelling and US-specific disclosure questions. | no |
| Q-3 | What is the platform fee, who pays it, and when are sellers paid? | Site says a fee applies per order; amount and payout timing are placeholders (R-024, R-015). | Fees page and FAQ need rewriting; if there is no fee for a launch period, copy that implies a fee is wrong. | no (launch-gating) |
| Q-4 | Will the client supply Terms of use, Privacy policy, and Dispute and return policy, and any disclosures their legal advisor requires? | Placeholder pages linked from the footer (R-032). | Missing legal pages at launch; extra disclosures could need new sections or pages. | no (launch-gating) |
| Q-5 | May the proposal's security measures be published, at what detail, and in what tense given the platform isn't live? | Publish plain-language measures from the proposal without algorithm or attack names (R-019); describe them as how the platform is built. | If the client forbids publishing, the Trust page shrinks to verification and data-stored content; if they approve detail, add AES-256, Argon2 or bcrypt, and named attack protections. Claims about an unbuilt system could mislead if the build changes. | no (launch-gating) |
| Q-6 | Is the marketplace live, and where should applications and sign-ins go? Should the CTA be "Apply" or something like "Request early access"? | Not live. "Apply" CTA; form validates client-side and sends nothing (R-029); Sign in goes to a placeholder page (R-003). | If live, Apply should hand off to the app's registration URL and Sign in to the app's login URL; if pre-launch, "Apply" may overpromise and the copy needs a waitlist framing. | no (launch-gating) |
| Q-7 | Are controlled substances or cold-chain products allowed at launch? | Excluded, as the brief says (R-021). | Exclusion statements on three pages become wrong and new rules content is needed. | no |
| Q-8 | How long does verification review take? | No time stated (R-011, R-030). | A stated time would help conversion; omitting it is safe. | no |
| Q-9 | What contact details (email, phone, address) should the site show? | Marked placeholders (R-031). | Visitors can't reach anyone from the site. | no |
| Q-10 | May the site name the payment provider (the proposal says "Stripe (or equivalent)")? | Not named; "third-party payment provider" (R-015). | Naming a provider could build trust; naming the wrong one would be false. | no |
| Q-11 | Should the Apply form ask for anything else (for example NPI or tax ID, number of locations, pharmacy type)? | The nine fields in R-027. | Form fields change; tax IDs are listed in the brief as sensitive, so adding them raises the storage question in Q-6. | no |
| Q-12 | May the site mention MatchRX or compare itself with it? | No (R-038). | A comparison page might be wanted. | no |
| Q-13 | May the site use analytics or other third-party services? | None (R-044). | No traffic data until approved. | no |

## Coverage check

Mapping is by brief section and sentence group. Sentences about the build
engagement (cost, milestones, support) are marked not site-relevant rather
than forced into requirements.

| Brief source | Maps to |
|---|---|
| Owner: "Create a pharmacy website." | R-001 to R-048 (scope set by "Public marketing site") |
| Owner: "You can see docs in it's respective folder." | Content sourcing rules: R-019, R-022, R-026, R-033 |
| Owner: "Also read AGENTS.md" | Process instruction, not a site requirement (see unmapped) |
| Owner: "if you need assets ... chatgpt to generate images" | R-036; D-5 |
| Owner answer: Scope "Public marketing site" | D-1; Non-goals; R-001 |
| Owner answer: Concept B "Didn't like it", "Too plain / looks like SaaS", "Too much UI, no imagery", "Colors felt cold" | R-036 (imagery); rest is a design input (Non-goals) |
| Owner answer: Approval mode plan-only | Process, not a site requirement (see unmapped) |
| Title and tagline line | R-006, R-011 to R-016, R-018, R-019 |
| Project Overview (4 paragraphs) | R-006 to R-011, R-018, R-020 |
| Project Objective (7 bullets) | R-010, R-012, R-013, R-014, R-019; "grow to thousands of pharmacies" → R-033 (no scale claims) |
| Target Users | Roles; R-007, R-008, R-018 |
| Accounts, Verification & Security | R-011, R-017, R-019 |
| Listings & Inventory | R-012, R-023 |
| Search & Discovery | R-013 |
| Orders & Payments | R-014, R-015, R-024, R-025 |
| Communication & Notifications | R-016 |
| Admin Console | R-018 |
| Release Output | Non-goals (the app) |
| Future Enhancements | R-037; Non-goals |
| Technical Architecture | "responsive for desktop, tablet and mobile" → R-040; File storage → R-019; Payments → R-015, Q-10; rest is the app's stack (Non-goals) |
| Security Measures (8 bullets) | R-019, R-045; Q-5 |
| Key Challenges: Data protection | R-019, R-020, R-029 |
| Key Challenges: Regulatory compliance | R-021, R-022; Q-2, Q-7 |
| Key Challenges: Trust and verification | R-011; Non-goals (policy and sources) |
| Key Challenges: Listing quality | R-023 |
| Key Challenges: Disputes and returns | R-025, R-032 |
| Key Challenges: Payments | R-015, R-024; Q-3 |
| Timeline and Milestones | Not site-relevant (Non-goals: commercial terms) |
| Not Included | Non-goals (hosting, domain); R-044 |
| Terms, Ownership & Support | Not site-relevant (Non-goals: commercial terms) |
| Definition of Done: Performance | R-043 |
| Definition of Done: Verification, Access control, Payments, Data isolation, Security | Content only: R-011, R-015, R-019, R-020; the tests themselves belong to the app (Non-goals) |
| Definition of Done: Listings, Ordering | Content only: R-012, R-014 |
| Hosting & Deployment | Non-goals; R-045 if deployed |
| Client Responsibilities | R-022, R-024, R-031, R-032, R-034, R-035, R-044; Q-1 to Q-5 |
| Scope Alignment Summary (F01 to F16, future rows) | F01 → R-011, R-027; F02 → R-011; F03, F04 → R-017, R-019; F05, F06 → R-012; F07, F08 → R-013; F09, F11 → R-014; F10 → R-015; F12, F13 → R-016; F14, F15 → R-018; F16 → R-019; future rows → R-037 |
| Conclusion | R-006, R-019, R-020 |

- Brief sections mapped: all sections relevant to a marketing site, and
  every owner sentence, map to a requirement, a non-goal or a stated process
  note.
- Unmapped sentences: "Also read AGENTS.md" and "Approval mode: plan-only".
  Both are instructions for how the team works, not things the site does.
