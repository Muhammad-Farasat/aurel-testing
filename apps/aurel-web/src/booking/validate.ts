import { placeById } from "../data/places";
import { market, parseIsoDate, minutesOf } from "../config/market";
import { serviceRules } from "../config/serviceRules";
import { resolveJourney, type ComboKey, type Draft } from "./model";

/** Errors keyed by the DOM id of the field they belong to. */
export type Errors = Record<string, string>;

export const fieldId = (key: string) => `f-${key}`;

const CHOOSE = "Choose an address from the list so the chauffeur finds the exact spot.";
const NOT_COVERED = "We don't cover this route yet.";

function placeError(d: Draft, key: ComboKey, id: string | null, emptyMsg: string): string | null {
  if (id) {
    const p = placeById(id);
    if (p && p.covered === false) return NOT_COVERED;
    return null;
  }
  return (d.typed[key] ?? "").trim() ? CHOOSE : emptyMsg;
}

export function tooSoon(date: string, time: string, now = new Date()): boolean {
  const day = parseIsoDate(date);
  if (!day || !/^\d{2}:\d{2}$/.test(time)) return false;
  const t = new Date(day);
  t.setHours(0, minutesOf(time), 0, 0);
  return t.getTime() - now.getTime() < serviceRules.minNoticeHours * 3600_000;
}

export const tooSoonMessage = `We need ${serviceRules.minNoticeHours} hours' notice for this journey. For something sooner, call ${market.phone}.`;

export function validateJourney(d: Draft): Errors {
  const e: Errors = {};
  const set = (key: string, msg: string | null) => {
    if (msg) e[fieldId(key)] = msg;
  };

  if (d.service === "airport") {
    set("airport", placeError(d, "airport", d.airportId, "Choose the airport and terminal."));
    if (d.direction === "arriving") {
      if (!d.flightNumber.trim()) set("flight", "Enter the flight number, for example BA117.");
      else if (d.flightState === "not-found" && !/^\d{2}:\d{2}$/.test(d.landingManual)) {
        set("landing", "Enter the scheduled landing time.");
      } else if (d.flightState === "idle") {
        set("flight", "Look up the flight so we can track it.");
      }
      set("to", placeError(d, "to", d.toId, "Enter where you are going."));
    } else {
      set("from", placeError(d, "from", d.fromId, "Enter the pickup address."));
      if (!/^\d{2}:\d{2}$/.test(d.flightTime)) set("flighttime", "Enter your flight's departure time.");
    }
  } else {
    set("from", placeError(d, "from", d.fromId, "Enter the pickup address."));
    if (d.service === "transfer") set("to", placeError(d, "to", d.toId, "Enter the destination."));
    if (d.service === "hourly" && d.endElsewhere) set("to", placeError(d, "to", d.toId, "Enter where the booking ends."));
    d.stops.forEach((id, i) => set(`stop-${i}`, placeError(d, `stop-${i}`, id, "Choose the stop, or remove it.")));
  }

  if (!d.date) set("date", "Choose a date.");
  const needsTime = !(d.service === "airport" && d.direction === "arriving");
  if (needsTime && !/^\d{2}:\d{2}$/.test(d.time)) set("time", "Choose a pickup time.");

  const j = resolveJourney(d);
  if (d.date && j.pickupTime && tooSoon(d.date, j.pickupTime)) {
    set(needsTime ? "time" : "date", tooSoonMessage);
  }
  return e;
}

export function journeyComplete(d: Draft): boolean {
  return Object.keys(validateJourney(d)).length === 0;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePerson(prefix: string, p: { name: string; phone: string; email: string }): Errors {
  const e: Errors = {};
  if (!p.name.trim()) e[fieldId(`${prefix}-name`)] = "Enter a name.";
  if (p.phone.replace(/[^\d+]/g, "").length < 7) e[fieldId(`${prefix}-phone`)] = "Enter a mobile number we can text.";
  if (!EMAIL.test(p.email.trim())) e[fieldId(`${prefix}-email`)] = "Enter an email address, like name@example.com.";
  return e;
}

export function validateDetails(d: Draft): Errors {
  let e = validatePerson("traveller", d.traveller);
  if (d.who === "someone") e = { ...e, ...validatePerson("booker", d.booker) };
  if (d.note.length > serviceRules.noteMaxLength) e[fieldId("note")] = `Keep the note to ${serviceRules.noteMaxLength} characters.`;
  return e;
}

export function detailsComplete(d: Draft): boolean {
  return Object.keys(validateDetails(d)).length === 0;
}
