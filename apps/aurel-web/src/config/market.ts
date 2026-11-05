/**
 * EXAMPLE DATA. The launch market is an open question for the owner
 * (DESIGN_DIRECTION.md, Open question 2). London and GBP are placeholders.
 * Changing market means editing this file and src/data/places.ts.
 */
export const market = {
  city: "London",
  locale: "en-GB",
  timeZone: "Europe/London",
  currency: "GBP",
  /** Placeholder number from Ofcom's range reserved for drama and examples. */
  phone: "020 7946 0000",
  phoneHref: "tel:+442079460000",
  vatRate: 0.2,
} as const;

const money = new Intl.NumberFormat(market.locale, {
  style: "currency",
  currency: market.currency,
  maximumFractionDigits: 0,
});

const moneyPence = new Intl.NumberFormat(market.locale, {
  style: "currency",
  currency: market.currency,
  minimumFractionDigits: 2,
});

export function formatMoney(amount: number, pence = false): string {
  return pence ? moneyPence.format(amount) : money.format(Math.round(amount));
}

export function parseIsoDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "Thu 12 Dec" from an ISO date (YYYY-MM-DD). */
export function formatDay(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat(market.locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatLongDay(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat(market.locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Current time in the market, as HH:MM. */
export function marketClock(now = new Date()): string {
  return new Intl.DateTimeFormat(market.locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: market.timeZone,
  }).format(now);
}

export function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = ((((h ?? 0) * 60 + (m ?? 0) + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function minutesOf(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}
