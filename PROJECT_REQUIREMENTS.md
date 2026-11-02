# Project Requirements Document
# AUREL — Premium Chauffeur Booking Platform

## 1. Project Overview

We want to build a premium chauffeur booking platform called **AUREL**.

AUREL is a web-based chauffeur service that allows customers to book professional drivers and luxury vehicles for different transportation needs.

The platform may share some booking concepts with Uber, but it is NOT a standard ride-hailing application.

Our target customers are people who value comfort, reliability, privacy, punctuality, and premium service.

Customers should be able to book a chauffeur in advance, select a suitable vehicle, view estimated pricing, manage their reservations, and track the progress of their bookings.

The platform must also provide dedicated interfaces for chauffeurs and administrators to manage rides, drivers, vehicles, bookings, and operations.

**The objective is to deliver a fully functional web application with a premium, polished, and distinctive user experience.**

---

## 2. Brand Identity & Design Direction

### Brand Name
AUREL

### Brand Positioning
Premium chauffeur and private transportation service.

### Brand Personality
- Elegant
- Premium
- Minimal
- Professional
- Trustworthy
- Sophisticated

### Color Palette

Use the following colors as the primary design system:

| Color | Hex Code | Usage |
|---|---|---|
| Midnight Navy | `#0B1220` | Primary background |
| Deep Charcoal | `#151C2B` | Secondary surfaces |
| Warm Ivory | `#F5F1E8` | Light backgrounds |
| Champagne Gold | `#C6A66B` | Primary accent |
| Muted Slate | `#8792A2` | Secondary text |
| Pure White | `#FFFFFF` | Text and contrast |

Gold should be used carefully for important actions, highlights, and brand details. Do not make the entire interface gold.

### Typography

Use an elegant typography combination:

- Headings: A refined editorial serif font.
- Body: A clean modern sans-serif font.
- Buttons and labels: Clear, readable sans-serif typography.

Typography should create a premium editorial feel without sacrificing usability.

### Visual Direction

The design should communicate luxury through composition, typography, whitespace, photography, and detail.

Avoid:
- Generic SaaS dashboard layouts.
- Excessive rounded cards.
- Purple gradients and random gradient backgrounds.
- Glassmorphism everywhere.
- Unnecessary floating elements.
- Repeated three-card sections.
- Generic AI-generated landing page patterns.
- Excessive animations.
- Unnecessary visual decoration.

Use high-quality vehicle and chauffeur photography where appropriate.

Every major section should have its own intentional composition while maintaining a consistent design language.

The application must look excellent on desktop, tablet, and mobile.

---

## 3. User Roles

The platform must support three main user roles.

### A. Customer

Customers can:
- Create an account.
- Log in and manage their profile.
- Browse available vehicle categories.
- Create chauffeur bookings.
- View estimated prices.
- Make payments.
- View upcoming and previous bookings.
- Cancel bookings according to cancellation rules.
- Track booking status.
- View chauffeur and vehicle information after assignment.
- Receive booking notifications.
- Submit ratings and reviews after completed rides.

### B. Chauffeur

Chauffeurs have a dedicated dashboard where they can:
- Log in securely.
- View their assigned bookings.
- View passenger and pickup information.
- View trip details and scheduled times.
- Accept or reject assigned bookings, depending on dispatch rules.
- Update booking status.
- View navigation directions.
- View their booking history.
- Manage their availability.
- View their profile and assigned vehicle.

### C. Administrator

Administrators have full control over the platform.

They can:
- View overall business statistics.
- Manage customers.
- Manage chauffeurs.
- Add, edit, and deactivate chauffeurs.
- Manage vehicles and vehicle categories.
- View all bookings.
- Create and modify bookings.
- Assign chauffeurs and vehicles.
- Manage pricing.
- Manage service areas.
- Manage cancellations and refunds.
- View payments and transactions.
- Manage reviews.
- Configure booking and cancellation policies.

---

## 4. Customer-Facing Website

Build a premium public-facing website with the following pages.

### 4.1 Homepage

The homepage should immediately communicate the brand's premium positioning.

Include:

- A distinctive hero section with high-quality chauffeur or luxury vehicle imagery.
- A clear headline communicating the service.
- A primary CTA: "Book a Chauffeur".
- A booking form or booking entry point.
- An introduction to the service.
- Available service categories.
- Featured vehicle selection.
- Why choose AUREL.
- A clear explanation of the booking process.
- Customer testimonials.
- A final booking CTA.
- A premium footer with navigation and contact information.

Do not force every section into the same layout. Give each section a different visual treatment.

### 4.2 Services Page

Show the different types of chauffeur services offered.

The initial service categories should be:

**Point-to-Point Transfer**
- Travel from one pickup location to one destination.
- Suitable for business meetings, events, and personal travel.

**Airport Transfer**
- Airport pickup or drop-off.
- Flight number and airline details.
- Flight arrival time.
- Optional meet-and-greet service.
- Additional waiting-time information.

**Hourly Chauffeur**
- Hire a chauffeur for a selected number of hours.
- Customer specifies the starting location and duration.

**Full-Day Chauffeur**
- Reserve a chauffeur and vehicle for an entire day.
- Suitable for business trips, events, and personal travel.

Each service should have its own description, pricing rules, and booking flow.

### 4.3 Fleet Page

Display available vehicles in different categories.

Initial categories:

- Business Class
- First Class
- Luxury SUV
- Luxury Van

Each vehicle should display:
- Vehicle image.
- Vehicle name and model.
- Passenger capacity.
- Luggage capacity.
- Vehicle category.
- Key amenities.
- Starting price or pricing information.

Administrators must be able to add, update, and remove vehicles.

Use realistic vehicle imagery. Do not use random placeholder images or repeat the same image for every vehicle.

### 4.4 About Page

Explain the AUREL brand, its service philosophy, commitment to punctuality, and customer experience.

### 4.5 Contact Page

Include:
- Contact form.
- Email address.
- Phone number.
- Business address.
- Support information.

Contact details should be configurable through the admin dashboard.

---

## 5. Booking System

This is the core functionality of the application.

The booking process should be simple, clear, and reliable.

### Step 1: Select Service

Customer chooses one of the following:
- Point-to-Point
- Airport Transfer
- Hourly Chauffeur
- Full-Day Chauffeur

### Step 2: Enter Journey Details

Collect the relevant information:

- Pickup location.
- Destination, where applicable.
- Pickup date.
- Pickup time.
- Number of passengers.
- Number of luggage items.
- Additional requirements.

For airport bookings, also collect:
- Flight number.
- Airline.
- Arrival or departure details.
- Meet-and-greet preference.

For hourly and full-day bookings, collect the required duration.

### Step 3: Select Vehicle

Display available vehicles based on passenger and luggage capacity.

Customers should be able to compare vehicle options and select one.

Unavailable vehicles must not be presented as available.

### Step 4: Price Calculation

Display an estimated price based on:
- Service type.
- Distance.
- Duration.
- Vehicle category.
- Additional services.
- Applicable taxes and fees.

Pricing rules must be configurable by administrators.

Clearly display the price breakdown before confirmation.

### Step 5: Customer Information

Collect:
- Customer name.
- Email.
- Phone number.
- Special instructions.

Allow logged-in customers to use their saved profile information.

### Step 6: Payment

Integrate a payment provider using its test environment.

The system should support:
- Secure checkout.
- Payment confirmation.
- Failed payment handling.
- Payment status tracking.
- Booking confirmation after successful payment.
- Refund handling through the admin workflow.

Do not store card details directly.

### Step 7: Booking Confirmation

After successful booking:
- Generate a unique booking reference.
- Display booking details.
- Show payment status.
- Show the scheduled pickup time.
- Send a confirmation notification.
- Add the booking to the customer's dashboard.

---

## 6. Maps & Location Integration

Integrate Google Maps for location-related functionality.

Required functionality:

- Pickup location autocomplete.
- Destination autocomplete.
- Map preview.
- Route visualization.
- Distance calculation.
- Estimated travel duration.
- Directions for assigned chauffeurs.

Use Google Maps APIs where appropriate.

API keys must be stored in environment variables.

If API credentials are unavailable during development, provide a clearly separated demo or mock mode. Do not pretend that a mock map or estimated route is a live Google Maps integration.

---

## 7. Customer Dashboard

Create a dedicated customer dashboard.

### Dashboard Overview

Display:
- Welcome message.
- Upcoming booking.
- Recent booking activity.
- Total completed rides.
- Account information.

### My Bookings

Customers should be able to:
- View all bookings.
- Filter bookings by status.
- View booking details.
- Cancel eligible bookings.
- View payment information.
- Review completed rides.

### Booking Details

Show:
- Booking reference.
- Service type.
- Pickup and destination.
- Date and time.
- Selected vehicle.
- Assigned chauffeur.
- Payment status.
- Booking status.
- Price breakdown.

### Profile Settings

Allow customers to update:
- Name.
- Email.
- Phone number.
- Password.
- Saved personal information.

---

## 8. Chauffeur Dashboard

Create a separate chauffeur interface.

### Overview

Display:
- Today's assignments.
- Upcoming bookings.
- Completed bookings.
- Current availability.

### Assigned Bookings

Each booking should display:
- Customer details.
- Pickup location.
- Destination.
- Pickup date and time.
- Vehicle information.
- Special instructions.

### Booking Status Management

Chauffeurs should be able to update the assigned booking through the following statuses:

1. Assigned
2. Accepted
3. En Route to Pickup
4. Arrived at Pickup
5. Passenger On Board
6. Completed

Chauffeurs should not be able to modify unrelated bookings or access administrative functionality.

---

## 9. Admin Dashboard

Build a functional administration panel.

### Overview

Display useful business metrics:
- Total bookings.
- Revenue.
- Completed bookings.
- Pending bookings.
- Active chauffeurs.
- Available vehicles.
- Recent activity.

Use meaningful charts and statistics.

### Booking Management

Administrators can:
- View all bookings.
- Search by booking reference.
- Filter by date, status, service type, and customer.
- View booking details.
- Assign or change chauffeurs.
- Assign or change vehicles.
- Update booking status.
- Cancel bookings.
- Process eligible refunds.

### Chauffeur Management

Administrators can:
- Add chauffeurs.
- Edit chauffeur information.
- Upload profile pictures.
- Manage chauffeur availability.
- Activate or deactivate accounts.
- View assigned bookings.
- View booking history.

### Fleet Management

Administrators can:
- Add vehicles.
- Edit vehicle information.
- Upload vehicle images.
- Set passenger capacity.
- Set luggage capacity.
- Set vehicle category.
- Manage vehicle availability.
- Activate or deactivate vehicles.

### Pricing Management

Administrators can configure:
- Base fares.
- Per-kilometer rates.
- Hourly rates.
- Full-day rates.
- Vehicle category multipliers.
- Airport transfer fees.
- Waiting charges.
- Additional service charges.
- Taxes.

Changes to pricing should affect future quotes without unexpectedly changing already confirmed bookings.

### Service Area Management

Administrators can configure supported service locations and operational coverage.

---

## 10. Booking Assignment & Availability Logic

The system must prevent conflicting assignments.

Important rules:

- A chauffeur cannot be assigned to overlapping bookings.
- A vehicle cannot be assigned to overlapping bookings.
- Only active and eligible chauffeurs can receive assignments.
- Only active and available vehicles can be assigned.
- A chauffeur must be assigned to only one vehicle at a time.
- A vehicle must not be assigned to multiple chauffeurs simultaneously.
- Booking assignments must be validated on the server.
- Concurrent booking attempts must not create duplicate assignments.

Administrators should be able to assign chauffeurs and vehicles manually.

For the initial version, automatic dispatch is not required. However, structure the system so automatic assignment can be added later.

---

## 11. Notifications

Implement a notification system for important booking events.

Customers should receive notifications when:
- A booking is confirmed.
- Payment succeeds or fails.
- A chauffeur is assigned.
- Booking details change.
- A booking is cancelled.
- A refund is processed.

Chauffeurs should receive notifications when:
- A booking is assigned.
- An assignment is changed.
- A booking is cancelled.

Support in-app notifications and email notifications.

If external email credentials are unavailable, use a development email provider or clearly marked mock implementation.

---

## 12. Authentication & Authorization

Implement secure authentication.

Requirements:
- Customer registration.
- Customer login.
- Chauffeur login.
- Admin login.
- Logout.
- Password hashing.
- Protected routes.
- Role-based access control.
- Server-side permission checks.
- Secure session management.

Users must only access the data and actions permitted by their role.

Do not rely only on hiding buttons or frontend route protection.

Provide a secure way to seed or create the initial administrator account. Never expose default admin credentials in production.

---

## 13. Technical Requirements

Use a modern, maintainable architecture.

Preferred technology stack:

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js server-side functionality or a properly separated backend architecture.
- TypeScript.
- REST APIs or well-defined server actions.

### Database
- PostgreSQL.
- Drizzle ORM.

### Integrations
- Google Maps API.
- Payment provider in test mode.
- Email notification provider.

### Other Requirements
- Reusable components.
- Clear separation of business logic and UI.
- Proper form validation.
- Centralized error handling.
- Environment variable management.
- Database migrations.
- Seed data for development.
- Loading, empty, success, and error states.
- Responsive layouts.
- Accessible forms and navigation.

Use SQL relationships and database constraints where appropriate.

Do not put the entire application into one giant component or one oversized backend file.

---

## 14. Data Model Expectations

Design a relational database that supports at least:

- Users
- Customer profiles
- Chauffeur profiles
- Vehicles
- Vehicle categories
- Bookings
- Booking assignments
- Payments
- Refunds
- Pricing rules
- Service areas
- Reviews
- Notifications

Use proper foreign keys, indexes, unique constraints, and timestamps.

Store booking prices and the relevant pricing breakdown as a snapshot when a booking is confirmed. Future pricing changes must not rewrite historical booking amounts.

Use appropriate database transactions for booking confirmation, payment updates, and assignment operations.

---

## 15. Security & Reliability

The application must follow basic production security practices.

Requirements:
- Validate all user input on the server.
- Enforce authorization on every protected operation.
- Prevent customers from accessing other customers' bookings.
- Prevent chauffeurs from accessing unrelated assignments.
- Protect sensitive environment variables.
- Handle payment webhooks securely and idempotently.
- Prevent duplicate payment processing.
- Avoid exposing sensitive user information.
- Use database transactions for critical operations.
- Handle unexpected errors gracefully.

Do not treat frontend validation as a security boundary.

---

## 16. UI/UX Expectations

The interface is one of the most important parts of this project.

Use the installed `/creative-design-director` skill before implementing the interface.

The design workflow must include:

1. Understand the product, target audience, and user journeys.
2. Research real design inspiration from relevant and unrelated industries.
3. Analyze visual references for layout, typography, interactions, imagery, and storytelling.
4. Establish a distinctive art direction for AUREL.
5. Create a consistent design system.
6. Design each major section with its own intentional composition.
7. Implement responsive layouts and meaningful interactions.
8. Inspect the actual rendered application and refine visual issues.

Do not simply copy a reference website or use a generic template.

The customer-facing website, customer dashboard, chauffeur dashboard, and admin dashboard should feel like parts of the same brand, but their layouts should be designed around their different purposes.

Prioritize:
- Clear navigation.
- Strong visual hierarchy.
- Easy booking experience.
- Excellent typography.
- Thoughtful spacing.
- High-quality imagery.
- Consistent interaction patterns.
- Accessible contrast and controls.
- Responsive behavior.

Use subtle animations where they improve the experience. Avoid animations that slow down booking or make dashboards harder to use.

---

## 17. Testing Requirements

Test the actual application, not just whether the code compiles.

Cover at least these scenarios:

### Customer Tests
- Register and log in.
- Create a booking.
- Select different service types.
- Select an eligible vehicle.
- Receive a correct price estimate.
- Complete a test payment.
- View the confirmed booking.
- Cancel an eligible booking.
- Review a completed ride.

### Chauffeur Tests
- Log in as a chauffeur.
- View assigned bookings.
- Accept an assignment.
- Update trip statuses.
- Confirm that unrelated bookings are inaccessible.

### Admin Tests
- Log in as an administrator.
- Create and edit a vehicle.
- Create and edit a chauffeur.
- View bookings.
- Assign a chauffeur and vehicle.
- Update pricing.
- Verify that changes affect new quotes.

### Critical Business Logic Tests
- Prevent overlapping chauffeur assignments.
- Prevent overlapping vehicle assignments.
- Prevent unauthorized booking access.
- Prevent duplicate payment processing.
- Verify booking status transitions.
- Verify payment and refund states.
- Verify that confirmed booking prices remain unchanged after pricing updates.

Also test:
- Mobile responsiveness.
- Form validation.
- Empty states.
- Loading states.
- Error handling.
- Navigation.
- Browser console errors.

Capture screenshots of important pages and user flows during visual testing.

---

## 18. Development & Delivery Expectations

Build this as a real, working application, not a static prototype.

Development should happen in phases:

**Phase 1: Foundation**
- Project setup.
- Database schema.
- Authentication.
- Role-based access.
- Core design system.

**Phase 2: Public Website**
- Homepage.
- Services.
- Fleet.
- About.
- Contact.

**Phase 3: Booking Engine**
- Booking forms.
- Vehicle selection.
- Pricing.
- Location integration.
- Payment flow.

**Phase 4: Customer & Chauffeur Dashboards**
- Booking management.
- Chauffeur assignments.
- Trip status updates.
- Notifications.

**Phase 5: Admin Dashboard**
- Fleet management.
- Chauffeur management.
- Booking management.
- Pricing management.
- Business overview.

**Phase 6: Testing & Refinement**
- End-to-end tests.
- Business logic tests.
- Responsive testing.
- Visual QA.
- Bug fixing.

Do not skip phases or build everything as disconnected mock screens.

Use realistic seed data so the application can be tested immediately.

If an external integration requires credentials, document the required environment variables and provide a clearly identified development mode where appropriate. Never claim a third-party integration is fully working if it has only been mocked.

---

## 19. Definition of Done

The project is considered complete when:

- All three user roles can use their respective dashboards.
- Customers can complete the booking flow.
- Pricing is calculated using configurable rules.
- Vehicles and chauffeurs are assigned without scheduling conflicts.
- Payments work in the provider's test environment.
- Booking statuses update correctly.
- Notifications work through the configured or development provider.
- Admins can manage the platform's core data.
- The application uses persistent database records.
- Critical user journeys pass automated tests.
- The UI is responsive and visually polished.
- No major runtime errors remain.
- Setup and environment instructions are documented.

**Final expectation:** Deliver a premium, reliable chauffeur booking platform that feels like a real commercial product. The design should be distinctive enough to stand out, and the functionality should be complete enough to demonstrate a genuine end-to-end booking and operations workflow.

Do not sacrifice functionality for appearance, and do not sacrifice design quality just to finish faster.