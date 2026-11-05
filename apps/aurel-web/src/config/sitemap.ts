/**
 * The Index groups (DESIGN_DIRECTION.md, Global frame) and the pages that are
 * not built yet. Each unbuilt page renders the "in preparation" page with the
 * sections its page plan lists, so no Index link ends in a 404.
 */
export interface IndexLink {
  to: string;
  label: string;
  line: string;
}

export const indexGroups: { title: string; links: IndexLink[] }[] = [
  {
    title: "Book",
    links: [
      { to: "/book/journey", label: "Book a journey", line: "Four steps, fixed price before you confirm." },
      { to: "/manage", label: "Manage a booking", line: "Find it with your reference and email." },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/airport-transfers", label: "Airport transfers", line: "Met at arrivals; the pickup follows your flight." },
      { to: "/transfers", label: "Transfers", line: "From one door to another, at the time you set." },
      { to: "/hourly", label: "Hourly", line: "A chauffeur for as many hours as you need." },
      { to: "/full-day", label: "Full day", line: "One car and one chauffeur for the whole day." },
    ],
  },
  {
    title: "AUREL",
    links: [
      { to: "/fleet", label: "Fleet", line: "Four cars, chosen by what you're carrying." },
      { to: "/standards", label: "Standards", line: "What we hold ourselves to, written down." },
      { to: "/business", label: "For business", line: "Accounts, monthly billing, booking for others." },
      { to: "/partners", label: "Hotels and agencies", line: "Guest transport, billed to you." },
    ],
  },
  {
    title: "Help",
    links: [
      { to: "/help", label: "Help", line: "Answers about booking, airports and changes." },
      { to: "/contact", label: "Contact", line: "Reach a person by phone or message." },
      { to: "/sign-in", label: "Sign in", line: "Saved places, travellers and receipts." },
    ],
  },
];

export const legalLinks: IndexLink[] = [
  { to: "/legal/terms", label: "Terms", line: "" },
  { to: "/legal/booking-conditions", label: "Booking conditions", line: "" },
  { to: "/legal/privacy", label: "Privacy", line: "" },
  { to: "/legal/cookies", label: "Cookies", line: "" },
];

export interface PlannedPage {
  path: string;
  title: string;
  purpose: string;
  sections: string[];
  /** Booking service to preset when the page links into the panel. */
  service?: "transfer" | "airport" | "hourly" | "fullday";
}

export const plannedPages: PlannedPage[] = [
  {
    path: "/transfers",
    title: "Transfers",
    purpose: "Point-to-point journeys: from one door to another at the time you set.",
    service: "transfer",
    sections: [
      "The booking panel, preset to Transfer",
      "The route: one long line from A to B with three short notes along it",
      "Common journeys (meetings, hotels, appointments) as links into the panel",
    ],
  },
  {
    path: "/hourly",
    title: "Hourly",
    purpose: "A chauffeur and car for a set number of hours, with stops as you need them.",
    service: "hourly",
    sections: [
      "The booking panel, preset to Hourly with the hours stepper",
      "A bracket of hours that extends from 2 to 6 as you scroll, with sample stops",
      "What an hour includes: waiting between stops, extensions on the day",
    ],
  },
  {
    path: "/full-day",
    title: "Full day",
    purpose: "One chauffeur and one car for a whole day.",
    service: "fullday",
    sections: [
      "The booking panel, preset to Full day",
      "A day, planned: a rail from morning to night with example plans",
      "Breaks and hours: chauffeur breaks, overtime and overnight, in plain words",
    ],
  },
  {
    path: "/business",
    title: "For business",
    purpose: "Accounts for companies: monthly billing, cost centres and booking for others.",
    sections: [
      "What an account does, with the application form beside it",
      "Assurance facts beside the form (owner-supplied, shown only when real)",
      "The monthly statement, shown large",
      "Booking for others in three steps",
      "Recurring journeys on a week calendar",
    ],
  },
  {
    path: "/business/apply",
    title: "Open a business account",
    purpose: "The account application: company, contact and expected journeys.",
    sections: ["Company details", "Main contact", "Monthly journeys estimate", "Billing preferences"],
  },
  {
    path: "/partners",
    title: "Hotels and agencies",
    purpose: "Guest transport for hotels, travel agencies and hospitality providers.",
    sections: [
      "What guest transport looks like, with a Talk to us form",
      "The hand-off: the guest's itinerary card with the partner's name",
      "How partner billing works, in plain words",
    ],
  },
  {
    path: "/standards",
    title: "Standards",
    purpose: "Who AUREL is and the standards it holds itself to.",
    sections: [
      "The philosophy, on its own",
      "The five principles, each with the concrete standards behind it",
      "How chauffeurs are chosen and trained",
      "How vehicles are maintained and presented",
    ],
  },
  {
    path: "/help",
    title: "Help",
    purpose: "Answers to booking questions, and a route to a person.",
    sections: [
      "A search field",
      "Topics: booking, airports, changes and cancellations, payment, business accounts, safety",
      "Questions within each topic, with a contact block after each",
    ],
  },
  {
    path: "/contact",
    title: "Contact",
    purpose: "Phone, email and hours, then a message form.",
    sections: ["Phone, email and hours at title size", "A message form: topic, booking reference, message"],
  },
  {
    path: "/manage",
    title: "Manage a booking",
    purpose: "Find a booking with its reference and email; no account needed.",
    sections: ["Reference and email form", "Then the booking details page"],
  },
  {
    path: "/sign-in",
    title: "Sign in",
    purpose: "Sign in for saved places, travellers, cards and receipts.",
    sections: ["Email and password, or a sign-in link by email", "Links to create an account or reset a password"],
  },
  { path: "/sign-up", title: "Create an account", purpose: "An account for repeat bookings.", sections: ["Name, email, password", "Optional: business account"] },
  { path: "/reset", title: "Reset your password", purpose: "Get a reset link by email.", sections: ["Email field", "Confirmation message"] },
  {
    path: "/account",
    title: "Account",
    purpose: "Upcoming journeys first, then everything saved.",
    sections: [
      "Upcoming journeys on a shared journey rule, with Book a journey",
      "Side index: journeys, travellers, places, payment, receipts, company, settings",
    ],
  },
  { path: "/account/journeys", title: "Journeys", purpose: "Upcoming and past journeys.", sections: ["Upcoming on the journey rule", "Past journeys with Book again"] },
  { path: "/account/passengers", title: "Travellers", purpose: "Saved travellers, for people who book for others.", sections: ["Traveller list", "Add a traveller"] },
  { path: "/account/places", title: "Places", purpose: "Saved places offered in the booking panel.", sections: ["Saved places", "Places you use are offered here after your first booking"] },
  { path: "/account/payment", title: "Payment", purpose: "Saved cards.", sections: ["Cards", "Add a card"] },
  { path: "/account/receipts", title: "Receipts", purpose: "Receipts and invoices.", sections: ["Receipts by month", "Invoices for business accounts"] },
  { path: "/account/company", title: "Company", purpose: "Company admin for business accounts.", sections: ["People and roles", "Cost centres", "Billing details and invoices"] },
  { path: "/account/settings", title: "Settings", purpose: "Profile, notifications and security.", sections: ["Profile", "Notifications", "Security"] },
  { path: "/legal/terms", title: "Terms of service", purpose: "The terms for using AUREL.", sections: ["Contents list", "Terms, in a 68-character reading measure"] },
  {
    path: "/legal/booking-conditions",
    title: "Booking conditions",
    purpose: "Booking, cancellation and waiting-time terms.",
    sections: ["Cancellation window", "Waiting time and extra waiting", "Changes", "Payment"],
  },
  { path: "/legal/privacy", title: "Privacy notice", purpose: "How AUREL handles personal data.", sections: ["What we collect", "Why", "Your rights"] },
  { path: "/legal/cookies", title: "Cookies", purpose: "Which cookies the site uses.", sections: ["Cookie list", "Your choices"] },
];
