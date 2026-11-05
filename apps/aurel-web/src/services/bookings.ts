/**
 * Mock booking service. Bookings are kept in localStorage so /booking/:ref works
 * after a reload. A real build replaces this with the booking API.
 */
import { getTier, tiers, type TierId } from "../config/tiers";
import { newDraft, type Draft } from "../booking/model";
import { readJson, writeJson } from "../booking/storage";
import { quoteFor, type Quote } from "./pricing";
import { wait } from "./latency";
import { toIsoDate } from "../config/market";

const KEY = "aurel.bookings.v1";

export type BookingStatus = "reserved" | "cancelled";

export interface Booking {
  ref: string;
  createdAt: number;
  draft: Draft;
  tier: TierId;
  quote: Quote;
  status: BookingStatus;
  cancelledAt?: number;
  feedback?: { score: number; note: string };
}

export interface PaymentInput {
  method: "card";
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export class PaymentDeclined extends Error {
  constructor() {
    super("declined");
  }
}

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function newRef(): string {
  let s = "";
  for (let i = 0; i < 5; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return `AUR-${s}`;
}

function all(): Record<string, Booking> {
  return readJson<Record<string, Booking>>(KEY) ?? {};
}

function save(b: Booking) {
  writeJson(KEY, { ...all(), [b.ref]: b });
}

/** Example card ending 0002 is declined, so the declined state can be seen. */
export async function createBooking(draft: Draft, payment: PaymentInput): Promise<Booking> {
  await wait(1200, 1800);
  if (payment.cardNumber.replace(/\D/g, "").endsWith("0002")) throw new PaymentDeclined();
  const tier = getTier(draft.tier) ?? tiers[0]!;
  const booking: Booking = {
    ref: newRef(),
    createdAt: Date.now(),
    draft,
    tier: tier.id,
    quote: quoteFor(draft, tier),
    status: "reserved",
  };
  save(booking);
  return booking;
}

export const DEMO_REF = "AUR-7KQ4M";

/** EXAMPLE booking so /booking/AUR-7KQ4M always shows something. */
function demoBooking(): Booking {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const draft: Draft = {
    ...newDraft("airport"),
    direction: "arriving",
    airportId: "lhr-t5",
    toId: "savoy",
    date: toIsoDate(tomorrow),
    flightNumber: "BA117",
    flight: {
      number: "BA117",
      airline: "British Airways",
      origin: "New York JFK",
      originCode: "JFK",
      arrivalPlaceId: "lhr-t5",
      scheduled: "07:35",
      estimated: "07:23",
      status: "landed-early",
    },
    flightState: "found",
    meetAfter: 30,
    passengers: 2,
    bags: 2,
    tier: "first",
    traveller: { name: "Eleanor Hartley", phone: "07700 900123", email: "e.hartley@example.com" },
    boardName: "MS E. HARTLEY",
  };
  const tier = getTier("first")!;
  return { ref: DEMO_REF, createdAt: Date.now() - 3600_000, draft, tier: "first", quote: quoteFor(draft, tier), status: "reserved" };
}

export async function getBooking(ref: string): Promise<Booking | null> {
  await wait(250, 450);
  const r = ref.toUpperCase();
  return all()[r] ?? (r === DEMO_REF ? demoBooking() : null);
}

export async function cancelBooking(b: Booking): Promise<Booking> {
  await wait(600, 900);
  const next: Booking = { ...b, status: "cancelled", cancelledAt: Date.now() };
  save(next);
  return next;
}

export async function sendFeedback(b: Booking, score: number, note: string): Promise<Booking> {
  await wait(400, 600);
  const next: Booking = { ...b, feedback: { score, note } };
  save(next);
  return next;
}
