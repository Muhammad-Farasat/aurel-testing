/**
 * EXAMPLE DATA. Tier names are the brief's names (Brief §6). They are an open
 * question for the owner (DESIGN_DIRECTION.md, Open question 1): renaming a
 * tier is a one-line change to `name` below. Capacities, "or similar" models
 * and rates are placeholders until the fleet is final.
 */
export type TierId = "business" | "first" | "suv" | "van";

export interface Tier {
  id: TierId;
  name: string;
  /** Owner-supplied "or similar" line. Placeholder. */
  similar: string;
  seats: number;
  bags: number;
  /** One-line inclusion summary. Draft. */
  summary: string;
  suitedTo: string;
  included: string[];
  /** Mock pricing inputs, GBP. */
  rate: { base: number; perKm: number; perHour: number };
}

export const tiers: Tier[] = [
  {
    id: "business",
    name: "Business Class",
    similar: "Mercedes-Benz E-Class or similar",
    seats: 3,
    bags: 2,
    summary: "Everyday business travel, quiet and unhurried.",
    suitedTo: "Meetings, hotel transfers, one or two travellers.",
    included: ["Waiting time as set for your service", "Water and phone charging", "Wi-Fi where the car has it"],
    rate: { base: 45, perKm: 2.4, perHour: 65 },
  },
  {
    id: "first",
    name: "First Class",
    similar: "Mercedes-Benz S-Class or similar",
    seats: 3,
    bags: 2,
    summary: "More room in the rear. The higher-end saloon.",
    suitedTo: "Client visits, occasions, longer journeys.",
    included: [
      "Waiting time as set for your service",
      "Water and phone charging",
      "Rear climate control",
      "Wi-Fi where the car has it",
    ],
    rate: { base: 65, perKm: 3.4, perHour: 90 },
  },
  {
    id: "suv",
    name: "Luxury SUV",
    similar: "Range Rover or similar",
    seats: 5,
    bags: 5,
    summary: "Five seats and a large boot.",
    suitedTo: "Families, small groups, airport runs with luggage.",
    included: ["Waiting time as set for your service", "Water and phone charging", "Child seats on request"],
    rate: { base: 70, perKm: 3.6, perHour: 95 },
  },
  {
    id: "van",
    name: "Luxury Van",
    similar: "Mercedes-Benz V-Class or similar",
    seats: 7,
    bags: 7,
    summary: "Seven seats and room for everyone's bags.",
    suitedTo: "Groups, events, teams arriving together.",
    included: [
      "Waiting time as set for your service",
      "Water and phone charging",
      "Child seats on request",
      "Sliding doors on both sides",
    ],
    rate: { base: 80, perKm: 3.9, perHour: 105 },
  },
];

export function getTier(id: TierId | undefined | null): Tier | undefined {
  return tiers.find((t) => t.id === id);
}

export const MAX_PARTY = Math.max(...tiers.map((t) => t.seats));
export const MAX_BAGS = Math.max(...tiers.map((t) => t.bags));

/** Why a tier can't carry the party, or null when it fits. */
export function fitReason(tier: Tier, passengers: number, bags: number): string | null {
  if (passengers > tier.seats) {
    return `Seats ${tier.seats}. You have ${passengers} passengers.`;
  }
  if (bags > tier.bags) {
    return `Takes ${tier.bags} bags. You have ${bags}.`;
  }
  return null;
}
