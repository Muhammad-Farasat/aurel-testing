import { placeById, type Place } from "../data/places";
import { addMinutes, formatDay } from "../config/market";
import { serviceRules, type AddOnId, type FullDayLength } from "../config/serviceRules";
import type { TierId } from "../config/tiers";
import type { Flight } from "../data/flights";

export type Service = "transfer" | "airport" | "hourly" | "fullday";
export type Direction = "arriving" | "departing";
export type ComboKey = "from" | "to" | "airport" | `stop-${number}`;

export interface Person {
  name: string;
  phone: string;
  email: string;
}

export interface Draft {
  version: 1;
  service: Service;
  direction: Direction;
  fromId: string | null;
  toId: string | null;
  airportId: string | null;
  stops: (string | null)[];
  /** Text typed into each place field, kept so an unchosen address can be flagged. */
  typed: Partial<Record<ComboKey, string>>;
  date: string;
  time: string;
  timeTouched: boolean;
  flightNumber: string;
  flight: Flight | null;
  flightState: "idle" | "found" | "not-found";
  landingManual: string;
  meetAfter: number;
  flightTime: string;
  hours: number;
  endElsewhere: boolean;
  dayLength: FullDayLength;
  plan: string;
  passengers: number;
  bags: number;
  tier: TierId | null;
  who: "me" | "someone";
  traveller: Person;
  booker: Person;
  boardName: string;
  addOns: AddOnId[];
  note: string;
  companyRef: string;
  updatedAt: number;
}

export const emptyPerson: Person = { name: "", phone: "", email: "" };

export function newDraft(service: Service = "transfer"): Draft {
  return {
    version: 1,
    service,
    direction: "arriving",
    fromId: null,
    toId: null,
    airportId: null,
    stops: [],
    typed: {},
    date: "",
    time: "",
    timeTouched: false,
    flightNumber: "",
    flight: null,
    flightState: "idle",
    landingManual: "",
    meetAfter: serviceRules.meetAfterLandingDefault,
    flightTime: "",
    hours: serviceRules.hourlyMinHours,
    endElsewhere: false,
    dayLength: serviceRules.fullDayLengths[0],
    plan: "",
    passengers: 1,
    bags: 1,
    tier: null,
    who: "me",
    traveller: { ...emptyPerson },
    booker: { ...emptyPerson },
    boardName: "",
    addOns: [],
    note: "",
    companyRef: "",
    updatedAt: 0,
  };
}

export const serviceLabels: Record<Service, string> = {
  transfer: "Transfer",
  airport: "Airport",
  hourly: "Hourly",
  fullday: "Full day",
};

export const serviceQuestions: Record<Service, string> = {
  transfer: "Where should we collect you?",
  airport: "Arriving, or catching a flight?",
  hourly: "Where do we start, and for how long?",
  fullday: "Which day do you need a chauffeur?",
};

export interface Journey {
  pickup?: Place;
  dropoff?: Place;
  stops: Place[];
  date: string;
  pickupTime: string;
  /** Hourly and full day: when the booking ends. */
  endTime?: string;
  durationHours?: number;
}

/** The pickup time for arrivals comes from the flight plus the meeting buffer. */
export function arrivalLanding(d: Draft): string {
  if (d.flight) return d.flight.scheduled;
  return d.landingManual;
}

export function resolveJourney(d: Draft): Journey {
  const stops = d.stops.map((id) => placeById(id)).filter((p): p is Place => Boolean(p));
  const from = placeById(d.fromId);
  const to = placeById(d.toId);
  const airport = placeById(d.airportId);
  switch (d.service) {
    case "transfer":
      return { pickup: from, dropoff: to, stops, date: d.date, pickupTime: d.time };
    case "airport": {
      if (d.direction === "arriving") {
        const landing = arrivalLanding(d);
        return {
          pickup: airport,
          dropoff: to,
          stops: [],
          date: d.date,
          pickupTime: landing ? addMinutes(landing, d.meetAfter) : "",
        };
      }
      return { pickup: from, dropoff: airport, stops: [], date: d.date, pickupTime: d.time };
    }
    case "hourly":
      return {
        pickup: from,
        dropoff: d.endElsewhere ? to : undefined,
        stops: [],
        date: d.date,
        pickupTime: d.time,
        endTime: d.time ? addMinutes(d.time, d.hours * 60) : undefined,
        durationHours: d.hours,
      };
    case "fullday":
      return {
        pickup: from,
        dropoff: undefined,
        stops: [],
        date: d.date,
        pickupTime: d.time,
        endTime: d.time ? addMinutes(d.time, d.dayLength * 60) : undefined,
        durationHours: d.dayLength,
      };
  }
}

/** "Heathrow T5 → The Savoy" */
export function routeLabel(j: Journey, d: Draft): string {
  const a = j.pickup?.short;
  if (!a) return "";
  if (j.dropoff) return `${a} → ${j.dropoff.short}`;
  if (d.service === "hourly") return `${a}, ${d.hours} hours`;
  if (d.service === "fullday") return `${a}, ${d.dayLength}-hour day`;
  return a;
}

/** "Thu 12 Dec, 07:40" */
export function whenLabel(j: Journey): string {
  const parts = [j.date ? formatDay(j.date) : "", j.pickupTime].filter(Boolean);
  return parts.join(", ");
}

/** True once the draft holds enough to be worth continuing. */
export function hasDraft(d: Draft): boolean {
  return Boolean(d.fromId || d.toId || d.airportId);
}

export function isArrival(d: Draft): boolean {
  return d.service === "airport" && d.direction === "arriving";
}
