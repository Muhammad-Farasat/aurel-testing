/**
 * EXAMPLE DATA. Service rules are an open question for the owner
 * (DESIGN_DIRECTION.md, Open question 5). Every number below is a placeholder
 * used by the booking flow, Chapter 01 and the airport page.
 */
export const serviceRules = {
  /** Minimum notice before pickup, in hours. */
  minNoticeHours: 3,
  /** Default "meet me N minutes after landing" for arrivals. */
  meetAfterLandingDefault: 30,
  meetAfterLandingOptions: [15, 30, 45, 60],
  /** Waiting included after the meeting time at airports, in minutes. */
  airportWaitingIncluded: 60,
  /** Waiting included at other pickups, in minutes. */
  standardWaitingIncluded: 15,
  /** Departing: be at the airport this long before the flight, in minutes. */
  departureCheckInBuffer: 120,
  hourlyMinHours: 2,
  hourlyMaxHours: 12,
  fullDayLengths: [8, 10] as const,
  /** Free cancellation up to N hours before pickup. */
  freeCancellationHours: 24,
  /** Chauffeur and vehicle confirmed this many hours before pickup. */
  assignmentHoursBefore: 12,
  /** Luxury Van is not available before this hour (mock availability rule). */
  vanEarliestHour: 6,
  noteMaxLength: 280,
} as const;

export type FullDayLength = (typeof serviceRules.fullDayLengths)[number];

/** Add-ons (Brief §8). Prices are placeholders, GBP. */
export const addOns = [
  { id: "extraWaiting", label: "Extra 30 minutes of waiting", price: 30 },
  { id: "childSeat", label: "Child seat", price: 12 },
  { id: "occasion", label: "Special occasion arrangements", price: 45 },
] as const;

export type AddOnId = (typeof addOns)[number]["id"];

export const pricingRules = {
  /** Airport parking and meet-and-greet, added to airport arrivals. */
  airportArrivalFee: 18,
  perStop: 15,
  /** Road distance is about this factor times straight-line distance. */
  roadFactor: 1.32,
  /** Full-day hours are charged at this share of the hourly rate. */
  fullDayFactor: 0.88,
  /** Fares are rounded up to this step. */
  roundTo: 5,
} as const;
