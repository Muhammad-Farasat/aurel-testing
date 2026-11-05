import { flights, normaliseFlightNumber, type Flight } from "../data/flights";
import { wait } from "./latency";

export type FlightLookup = { found: true; flight: Flight } | { found: false };

/** Mock flight lookup. A real build calls a flight data provider. */
export async function lookupFlight(number: string): Promise<FlightLookup> {
  await wait(600, 900);
  const n = normaliseFlightNumber(number);
  const flight = flights.find((f) => f.number === n);
  return flight ? { found: true, flight } : { found: false };
}
