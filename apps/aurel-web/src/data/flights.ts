/**
 * EXAMPLE DATA. Mock flight schedule for the flight lookup. A real build calls
 * a flight data provider. BA117 lands early, matching Chapter 01 on the home
 * page. Any number not listed returns "not found".
 */
export type FlightStatus = "scheduled" | "landed-early" | "delayed" | "on-time";

export interface Flight {
  number: string;
  airline: string;
  origin: string;
  originCode: string;
  /** Arrival place id in src/data/places.ts (terminal). */
  arrivalPlaceId: string;
  scheduled: string;
  estimated: string;
  status: FlightStatus;
}

export const flights: Flight[] = [
  { number: "BA117", airline: "British Airways", origin: "New York JFK", originCode: "JFK", arrivalPlaceId: "lhr-t5", scheduled: "07:35", estimated: "07:23", status: "landed-early" },
  { number: "BA283", airline: "British Airways", origin: "Los Angeles", originCode: "LAX", arrivalPlaceId: "lhr-t5", scheduled: "11:10", estimated: "11:10", status: "on-time" },
  { number: "VS4", airline: "Virgin Atlantic", origin: "New York JFK", originCode: "JFK", arrivalPlaceId: "lhr-t3", scheduled: "06:15", estimated: "06:50", status: "delayed" },
  { number: "EK15", airline: "Emirates", origin: "Dubai", originCode: "DXB", arrivalPlaceId: "lgw-n", scheduled: "12:35", estimated: "12:35", status: "on-time" },
  { number: "AF1680", airline: "Air France", origin: "Paris CDG", originCode: "CDG", arrivalPlaceId: "lcy", scheduled: "09:05", estimated: "09:05", status: "scheduled" },
  { number: "SQ322", airline: "Singapore Airlines", origin: "Singapore", originCode: "SIN", arrivalPlaceId: "lhr-t2", scheduled: "06:25", estimated: "06:25", status: "on-time" },
];

export function normaliseFlightNumber(input: string): string {
  return input.replace(/\s+/g, "").toUpperCase();
}
