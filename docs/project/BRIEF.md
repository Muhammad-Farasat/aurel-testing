# Brief

- Client: not named in the proposal (pharmacy overstock marketplace client)
- Project: pharmacy
- Received: 2026-10-21 (proposal date); handed over 2026-11-07
- Source: `pharmacy/requirements.docx`, copied to `docs/project/brief/requirements.docx`

## Owner's instruction for this run (2026-11-07)

"Create a pharmacy website. You can see docs in it's respective folder. Also
read AGENTS.md moreover, if you need assets then you can open my chrome and
open chatgpt to generate images."

Answers to the Orchestrator's scope questions, same day:

- Scope: "Public marketing site" (not the marketplace app, not app screens)
- Concept B (`agent/pharmacy-landing-b-1106b`): "Didn't like it". Reasons:
  "Too plain / looks like SaaS", "Too much UI, no imagery", "Colors felt cold"
- Approval mode: plan-only ("After planning")

## Brief as received

Text extracted from the .docx without edits. The table at the end lost its
cell layout in extraction; the original file has it.

```text
Project Proposal
Pharmacy Overstock Marketplace Platform
A secure, verified-only web marketplace where pharmacies list, discover and buy surplus medication from each other
Verified Pharmacy Onboarding • Overstock Listings • Search & Price Comparison • Orders & Payments • Admin Console • Security-First Architecture
Prepared October 21, 2026
Project Overview
This project will deliver a web-based B2B marketplace where licensed pharmacies can sell their overstock and
near-surplus medication to other verified pharmacies. Instead of writing off unused stock, a pharmacy lists it at a price it chooses. Other pharmacies browse, compare prices and buy directly, saving money on inventory while the seller recovers value that would otherwise be lost.
The platform is inspired by MatchRX and is built around trust. Only verified pharmacies can register, list or buy. Every account is reviewed by a platform administrator before it gets access, and every action is recorded in an audit log.
The platform serves three groups. Seller pharmacies list and manage their surplus stock and fulfil orders. Buyer pharmacies search, compare and purchase. Platform administrators verify pharmacies, moderate listings, manage disputes and view reports. A single pharmacy can act as both buyer and seller from the same account.
The platform does not handle patient records. It stores only business data about pharmacies, listings and orders, which keeps the sensitive-data footprint small and easier to protect.

Project Objective
The primary objective is to build a secure, scalable and easy-to-use marketplace that:
Restricts access to verified, licensed pharmacies only, with admin approval before any trading
Lets sellers list overstock quickly, one item at a time or in bulk by CSV upload
Lets buyers search, filter and compare prices across sellers
Handles the full order cycle from checkout to delivery confirmation
Protects all sensitive business and personal data with modern encryption and access control
Gives administrators full visibility and control through an audit-ready admin console
Is built on a foundation that can grow to thousands of pharmacies without redesign

Target Users
Seller Pharmacies
Licensed pharmacies with excess or soon-to-expire stock they want to move
Create listings, set prices, accept orders and mark shipments
Buyer Pharmacies
Licensed pharmacies looking for lower-cost inventory
Search listings, compare prices, place orders and confirm delivery
Platform Administrators
Company staff who verify pharmacy licences, approve or remove listings, handle disputes and monitor activity

Core Features (Release Scope)
All features below belong to a single release. Section 8 sets out the build order.
Accounts, Verification & Security
Pharmacy registration with licence number, business details and document upload
Admin review and approval workflow; no trading until a pharmacy is verified
Secure login with email and password, optional two-factor authentication, and session management
Role-based access for pharmacy owner, staff and administrator
Password hashing, rate limiting and account lockout against brute-force attempts
Listings & Inventory
Create listings with drug name, strength, form, quantity, lot number, expiry date, condition, price and photos
Bulk upload of listings by CSV with validation and error reporting
Edit, pause or remove listings; automatic hiding of expired items
Minimum remaining shelf-life rule configurable by the administrator
Search & Discovery
Search by drug name, strength, form and manufacturer
Filters for price, expiry date, quantity and seller location
Price comparison view showing all sellers of the same product side by side
Saved searches and email alerts when a wanted item is listed
Orders & Payments
Cart and checkout for one or more items from a seller
Seller order confirmation, shipping details and tracking number entry
Buyer delivery confirmation and a simple issue-reporting flow with photos
Payments through a third-party payment provider; card and bank details are never stored on our servers
Platform fee recorded on every order, with invoices and order history for both parties
Communication & Notifications
Email notifications for new orders, status changes, approvals and alerts
In-app notification centre
Optional buyer-seller messaging tied to a specific listing or order
Admin Console
Pharmacy verification queue with document review
Listing moderation, user management, order and dispute management
Configurable fees, categories and platform rules
Dashboard with registrations, listings, order volume and revenue
Immutable audit log of key actions
Release Output: A fully functional pharmacy overstock marketplace with verified onboarding, listings, search, ordering, payments and an admin console, deployed to production with security controls in place.

Future Enhancements
The following are outside this release and can be layered on once the core platform is live:
Native iOS and Android apps
Integration with pharmacy management and inventory systems for automatic listing sync
Automated shipping label generation and carrier rate comparison
Buyer-seller offers and negotiation tools
Advanced analytics, price trend reports and demand forecasting
Support for wholesalers and additional user types

Technical Architecture
Frontend: React web application, responsive for desktop, tablet and mobile browsers
Backend: Node.js (NestJS) or Python (FastAPI) REST API with background jobs for emails, alerts and expiry checks
Database: PostgreSQL for transactional data, with Redis for caching and queues
File storage: Private cloud object storage for licence documents and photos, accessed only through signed, expiring links
Payments: Stripe (or equivalent) so the platform never touches card data
Hosting: Cloud hosting with automated backups, monitoring and a staging environment
Security Measures
TLS (HTTPS) for all data in transit
AES-256 encryption at rest for the database, backups and stored documents
Field-level encryption for the most sensitive fields, such as licence numbers and tax IDs, using standard, vetted cryptography
Passwords hashed with a modern algorithm (Argon2 or bcrypt), never stored in readable form
Role-based access control and strict separation of each pharmacy's data
Protection against common attacks (SQL injection, XSS, CSRF) and API rate limiting
Audit logging of logins, approvals, listing and order changes
Secrets and keys held in a managed secrets store, not in code

Key Challenges & Considerations
Data protection: The platform will hold pharmacy business data, licence documents and contact details. Sensitive fields will be agreed with the client at the start of Milestone 1 and protected using industry-standard encryption, not custom or simplified ciphers.
Regulatory compliance: Resale of medication between pharmacies is regulated and rules vary by region. The client is responsible for confirming licensing, drug supply chain and any state or national requirements with a qualified legal advisor. Controlled substances and cold-chain products are excluded from this release unless the client confirms they are permitted and provides the rules.
Trust and verification: Admin review of licences is the main safeguard. The client should provide the verification policy and the sources used to check licences.
Listing quality: Accurate expiry dates, lot numbers and conditions are essential. Required fields and validation will reduce bad listings.
Disputes and returns: A clear dispute process and return policy must be defined by the client before launch.
Payments: Payment flow, platform fee and payout timing will be confirmed in week 1 so the correct provider setup is used.

Timeline and Milestones
Estimated Duration: 10 weeks. Timing is indicative.

Milestone
Timing
Deliverable

M1: UI/UX Design (Figma) - Part 1
Weeks 1-2
Final scope and sensitive-data list; user flows; Figma designs for registration and verification, seller dashboard and listing creation, and bulk upload

M2: UI/UX Design (Figma) - Part 2
Weeks 2-3
Figma designs for search and price comparison, cart and checkout, orders and delivery, notifications, messaging and the admin console; design approved before development

M3: Frontend Development
Weeks 3-7
React web app: registration, login, seller and buyer dashboards, listings, search and filters, price comparison, cart and checkout, order tracking, notifications and admin screens

M4: Backend Development
Weeks 3-8
Authentication and roles, verification workflow, listings and CSV import, search APIs, orders, payment integration, emails, admin APIs, audit log, encryption and security controls

M5: Testing
Weeks 8-9
Functional testing, security checks, role and access testing, payment test mode runs, bug fixing and performance checks

M6: Deployment
Week 10
Production setup, domain and SSL connection, database and backup configuration, monitoring, go-live support and handover

TOTAL
10 weeks


Frontend and backend work run in parallel once the Figma design is approved.

Nor Included
Domain name and its yearly renewal
Hosting and cloud services (servers, database, file storage, backups)
Plugins, paid APIs, subscriptions or third-party tools that may be needed during the project (for example email service, SMS, address or drug-data APIs, SSL if paid); any such purchase will be discussed with the client before buying
Payment processing fees charged by the payment provider
The amount above is the development cost only. All of these running costs are billed directly to the client by the respective providers.

Terms, Ownership & Support
Source Code Ownership
Full source code delivered to the client upon final payment
Client retains complete ownership of all code and design assets
No ongoing licensing fees or restrictions
Post-Launch Bug Fix Support
30 days of free bug fix support included after launch
Covers defects in delivered functionality
Feature additions or scope changes beyond the agreed specification are handled separately
Revisions During Development
Reasonable revision rounds are included at the end of each milestone
Feedback is reviewed and incorporated before the next milestone begins
Significant scope changes mid-milestone may affect timeline and cost and are discussed transparently before proceeding
Definition of Done
Access control: unverified pharmacies cannot list, search or buy in any test case
Verification: a registered pharmacy can be approved or rejected by an admin, and the user is notified by email
Listings: a seller can create a listing and upload a CSV of listings, with invalid rows reported clearly
Ordering: a buyer can complete an order from search to delivery confirmation without assistance
Payments: test payments complete successfully and no card data is stored on the platform
Data isolation: one pharmacy can never view another pharmacy's private data
Security: sensitive data is encrypted at rest, all traffic uses HTTPS, and no critical or high issues remain open after testing
Performance: main pages load in under 3 seconds under normal use
Hosting & Deployment
The platform is deployed to a reliable cloud provider chosen with the client, on an account owned by the client
Deployment assistance and handover are included in M6
Client Responsibilities
Confirm the list of sensitive data fields in week 1
Obtain legal advice on regulations for resale of medication between pharmacies, and on what must be disclosed to users
Provide the pharmacy verification policy and licence check sources
Define the platform fee, return and dispute policy, and terms of use
Provide branding assets, logo and any content for the site
Purchase the domain and hosting, and create accounts for the payment provider and email service, at the client's own cost
Approve any plugin, API or paid tool before it is purchased
Timely feedback and sign-off at each milestone to maintain the 10-week timeline

Scope Alignment Summary
The following table confirms how every requirement is addressed in this proposal. M1-M2 are design, M3 is frontend, M4 is backend, M5 is testing and M6 is deployment.

Feature / Requirement
Module
Milestone
Status
F01 Pharmacy registration and licence upload
Accounts
M1 / M3 / M4
Included
F02 Admin verification workflow
Accounts
M2 / M3 / M4
Included
F03 Secure login with optional two-factor
Security
M1 / M3 / M4
Included
F04 Role-based access and data isolation
Security
M4
Included
F05 Listing creation and management
Listings
M1 / M3 / M4
Included
F06 Bulk CSV upload
Listings
M1 / M3 / M4
Included
F07 Search and filters
Discovery
M2 / M3 / M4
Included
F08 Price comparison
Discovery
M2 / M3 / M4
Included
F09 Cart, checkout and orders
Orders
M2 / M3 / M4
Included
F10 Payment integration (third-party provider)
Orders
M4
Included
F11 Delivery confirmation and issue reporting
Orders
M2 / M3 / M4
Included
F12 Email and in-app notifications
Communication
M2 / M3 / M4
Included
F13 Buyer-seller messaging
Communication
M2 / M3 / M4
Included
F14 Admin console and reports
Administration
M2 / M3 / M4
Included
F15 Audit log
Administration
M4
Included
F16 Encryption at rest and in transit
Security
M4 / M6
Included
Domain, hosting, paid plugins and APIs
Infrastructure
Client
Separate cost
Mobile apps (iOS / Android)
Mobile
Not in scope
Future
Pharmacy software integrations
Integrations
Not in scope
Future
Shipping label automation
Logistics
Not in scope
Future

Conclusion
Pharmacies often carry surplus medication that is costly to hold and wasteful to discard, while other pharmacies are paying more than they need to restock the same products. This platform connects the two sides in a trusted, verified environment where selling surplus stock becomes simple and buying it becomes a smart way to cut costs.
Security and trust are built in from the start. Only verified pharmacies can participate, data is protected with standard encryption and strict access control, and the platform avoids storing payment card data or patient information altogether.
The milestone-based delivery keeps the 10-week project transparent and manageable, with a design-first approach so every screen is agreed before development begins.
We look forward to building this with you.
```

## References

| # | Reference | Type | What it is | Use it for | Read? |
|---|---|---|---|---|---|
| 1 | `docs/project/brief/requirements.docx` | doc | The client proposal | Content, product facts, scope | yes |
| 2 | MatchRX (matchrx.com) | site | Competitor the brief names as inspiration | Competitor analysis | not opened this run; returned 403 to the browser on 2026-11-06 |
| 3 | `agent/pharmacy-landing-1106a`, `pharmacy/landing/` | site (local) | Concept A, editorial landing page | What to avoid (RJ-009) | yes, via its DESIGN.md |
| 4 | `agent/pharmacy-landing-b-1106b`, `pharmacy/landing-b/` | site (local) | Concept B, product-led landing page | What to avoid (RJ-010); its research table is reusable | yes, via its DESIGN.md |
| 5 | ChatGPT image generation in the owner's Chrome | tool | Offered by the owner for assets | Made-for-the-brand imagery (P-012, P-032) | n/a |

## Client contacts and constraints

- Decision maker: not given
- Deadline: not given (the proposal's plan is 10 weeks for the full platform)
- Budget or hosting limits: hosting and domain are client costs
- Required stack: the proposal names React for the app frontend
- Branding: client to provide logo and assets; none supplied yet
