/**
 * Mock price quotes. EXAMPLE pricing model: a fixed all-in price from a simple
 * formula (distance or hours times the tier's rate, plus fees). The real model
 * is an open question for the owner (DESIGN_DIRECTION.md, Open question 4).
 */
import { market, minutesOf } from "../config/market";
import { addOns, pricingRules, serviceRules } from "../config/serviceRules";
import { tiers, type Tier, type TierId } from "../config/tiers";
import type { Place } from "../data/places";
import { isArrival, resolveJourney, type Draft } from "../booking/model";
import { wait } from "./latency";

export interface PriceLine {
  label: string;
  amount: number;
}

export interface Quote {
  tier: TierId;
  available: boolean;
  unavailableReason?: string;
  suggestion?: string;
  lines: PriceLine[];
  total: number;
  vat: number;
}

function haversineKm(a: Place, b: Place): number {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function roadKm(points: Place[]): number {
  let km = 0;
  for (let i = 1; i < points.length; i++) km += haversineKm(points[i - 1]!, points[i]!);
  return km * pricingRules.roadFactor;
}

/** Rough drive time in minutes; used to suggest departure pickups. */
export function driveMinutes(points: Place[]): number {
  return Math.round(roadKm(points) / 0.6 + 10);
}

const roundUp = (n: number) => Math.ceil(n / pricingRules.roundTo) * pricingRules.roundTo;

export function quoteFor(d: Draft, tier: Tier): Quote {
  const j = resolveJourney(d);
  const lines: PriceLine[] = [];
  if (d.service === "hourly" || d.service === "fullday") {
    const hours = j.durationHours ?? 0;
    const factor = d.service === "fullday" ? pricingRules.fullDayFactor : 1;
    lines.push({ label: `${hours} hours with chauffeur`, amount: roundUp(tier.rate.perHour * hours * factor) });
  } else {
    const pts = [j.pickup, ...j.stops, j.dropoff].filter((p): p is Place => Boolean(p));
    const km = roadKm(pts);
    lines.push({ label: `Journey, about ${Math.max(1, Math.round(km))} km`, amount: roundUp(tier.rate.base + tier.rate.perKm * km) });
  }
  const waiting = isArrival(d) ? serviceRules.airportWaitingIncluded : serviceRules.standardWaitingIncluded;
  if (d.service !== "hourly" && d.service !== "fullday") {
    lines.push({ label: `${waiting} minutes of waiting`, amount: 0 });
  }
  if (isArrival(d)) lines.push({ label: "Airport parking and meet-and-greet", amount: pricingRules.airportArrivalFee });
  if (j.stops.length) lines.push({ label: `${j.stops.length} extra stop${j.stops.length > 1 ? "s" : ""}`, amount: j.stops.length * pricingRules.perStop });
  for (const id of d.addOns) {
    const a = addOns.find((x) => x.id === id);
    if (a) lines.push({ label: a.label, amount: a.price });
  }
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const vat = total - total / (1 + market.vatRate);

  let available = true;
  let unavailableReason: string | undefined;
  let suggestion: string | undefined;
  if (tier.id === "van" && j.pickupTime && minutesOf(j.pickupTime) < serviceRules.vanEarliestHour * 60) {
    available = false;
    unavailableReason = `Not available before 0${serviceRules.vanEarliestHour}:00.`;
    suggestion = `Choose a pickup from 0${serviceRules.vanEarliestHour}:00, or the Luxury SUV for up to 5.`;
  }
  return { tier: tier.id, available, unavailableReason, suggestion, lines, total, vat };
}

/** All four tiers, with mock latency. */
export async function quoteAll(d: Draft): Promise<Record<TierId, Quote>> {
  await wait(500, 900);
  return Object.fromEntries(tiers.map((t) => [t.id, quoteFor(d, t)])) as Record<TierId, Quote>;
}
