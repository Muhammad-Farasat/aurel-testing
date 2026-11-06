import type { CSSProperties } from "react";
import { getTier, type TierId } from "../config/tiers";

/**
 * The cabin, from above. Concept C ("Soft Close") draws every car from the
 * inside: a top-down seat plan with the chauffeur's seat, the passenger seats
 * and the bag spaces. It is drawn in code from `tiers.ts`, so it changes when
 * the fleet data changes. No photographs, no renders, no brand shapes.
 *
 * Lengths are roughly to scale between tiers (about 1 unit per centimetre);
 * seat layouts are schematic, not a specific model's. Front points right;
 * the chauffeur sits on the right-hand side of the car (UK placeholder market).
 */
interface Plan {
  length: number;
  width: number;
  /** Fractions of length where the glass cabin starts (rear) and ends (windscreen). */
  cabin: [number, number];
  /** Passenger seats per row, front to back, after the chauffeur's row. */
  rows: number[];
  /** Bag columns in the boot. */
  bagCols: number;
}

const plans: Record<TierId, Plan> = {
  business: { length: 495, width: 188, cabin: [0.25, 0.7], rows: [3], bagCols: 1 },
  first: { length: 530, width: 192, cabin: [0.25, 0.71], rows: [3], bagCols: 1 },
  suv: { length: 500, width: 200, cabin: [0.16, 0.72], rows: [3, 2], bagCols: 2 },
  van: { length: 537, width: 200, cabin: [0.06, 0.78], rows: [2, 2, 3], bagCols: 2 },
};

const VB_W = 600;
const VB_H = 240;
const SEAT_D = 46; // seat depth along the car
const ROW_STEP = 64;

export function CabinPlan({
  tier,
  passengers = 0,
  bags = 0,
  className,
  style,
  decorative = false,
}: {
  tier: TierId;
  passengers?: number;
  bags?: number;
  className?: string;
  style?: CSSProperties;
  decorative?: boolean;
}) {
  const t = getTier(tier);
  const p = plans[tier];
  const x0 = (VB_W - p.length) / 2;
  const x1 = x0 + p.length;
  const y0 = (VB_H - p.width) / 2;
  const y1 = y0 + p.width;
  const rf = 74; // nose radius
  const rr = 40; // tail radius
  const body = `M ${x0 + rr} ${y0} H ${x1 - rf} Q ${x1} ${y0} ${x1} ${y0 + rf} V ${y1 - rf} Q ${x1} ${y1} ${x1 - rf} ${y1} H ${x0 + rr} Q ${x0} ${y1} ${x0} ${y1 - rr} V ${y0 + rr} Q ${x0} ${y0} ${x0 + rr} ${y0} Z`;

  const cabinX0 = x0 + p.length * p.cabin[0];
  const cabinX1 = x0 + p.length * p.cabin[1];
  const inset = 14;
  const innerY0 = y0 + inset;
  const innerH = p.width - inset * 2;

  // Seat rows, front (chauffeur) first.
  const frontX = cabinX1 - SEAT_D - 18;
  const allRows = [2, ...p.rows];
  const seats: { x: number; y: number; w: number; h: number; kind: "chauffeur" | "front" | "pax"; n?: number }[] = [];
  allRows.forEach((count, r) => {
    const x = frontX - r * ROW_STEP;
    const gap = 8;
    const h = (innerH - gap * (count + 1)) / count;
    for (let i = 0; i < count; i++) {
      const y = innerY0 + gap + i * (h + gap);
      if (r === 0) seats.push({ x, y, w: SEAT_D, h, kind: i === 1 ? "chauffeur" : "front" });
      else seats.push({ x, y, w: SEAT_D, h, kind: "pax" });
    }
  });
  // Number passenger seats from the rear row forward: the rear is where guests sit.
  const pax = seats.filter((s) => s.kind === "pax").sort((a, b) => a.x - b.x || a.y - b.y);
  pax.forEach((s, i) => (s.n = i));

  // Bag spaces behind the last row.
  const lastRowX = frontX - (allRows.length - 1) * ROW_STEP;
  const bootX0 = x0 + 18;
  const bootX1 = Math.min(lastRowX - 10, p.rows.length > 1 ? lastRowX - 10 : cabinX0 + 10);
  const total = t?.bags ?? 0;
  const perCol = Math.ceil(total / p.bagCols);
  const bagGap = 6;
  const bagW = Math.min(30, (bootX1 - bootX0 - bagGap * (p.bagCols - 1)) / p.bagCols);
  const bagH = Math.min(40, (innerH - bagGap * (perCol + 1)) / perCol);
  const bagSlots = Array.from({ length: total }, (_, i) => {
    const col = Math.floor(i / perCol);
    const row = i % perCol;
    const colH = Math.min(perCol, total - col * perCol);
    const top = innerY0 + (innerH - (colH * bagH + (colH - 1) * bagGap)) / 2;
    return { x: bootX1 - (col + 1) * bagW - col * bagGap, y: top + row * (bagH + bagGap), n: i };
  });

  const label = t
    ? `${t.name}, the cabin from above: the chauffeur in front, ${t.seats} passenger seats, room for ${t.bags} bags. Schematic drawing.`
    : "";

  return (
    <svg
      className={["cabin", className ?? ""].filter(Boolean).join(" ")}
      style={style}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      data-tier={tier}
    >
      <path className="cabin__body" d={body} />
      <rect
        className="cabin__glass"
        x={cabinX0}
        y={y0 + 6}
        width={cabinX1 - cabinX0}
        height={p.width - 12}
        rx={22}
      />
      <line className="cabin__screen" x1={cabinX1} y1={y0 + 18} x2={cabinX1} y2={y1 - 18} />
      {/* Mirrors */}
      <rect className="cabin__body" x={cabinX1 - 30} y={y0 - 12} width={22} height={12} rx={4} />
      <rect className="cabin__body" x={cabinX1 - 30} y={y1} width={22} height={12} rx={4} />
      {seats.map((s, i) => {
        const filled = s.kind === "pax" && s.n !== undefined && s.n < passengers;
        return (
          <g
            key={i}
            className={["cabin__seat", `is-${s.kind}`, filled ? "is-taken" : ""].join(" ")}
            style={{ ["--i" as string]: s.n ?? 0 }}
          >
            <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={9} />
            <rect className="cabin__back" x={s.x - 2} y={s.y + 3} width={9} height={s.h - 6} rx={4} />
            {s.kind === "chauffeur" ? (
              <rect className="cabin__wheel" x={s.x + s.w + 6} y={s.y + s.h * 0.15} width={6} height={s.h * 0.7} rx={3} />
            ) : null}
          </g>
        );
      })}
      {bagSlots.map((b) => (
        <rect
          key={b.n}
          className={["cabin__bag", b.n < bags ? "is-taken" : ""].join(" ")}
          x={b.x}
          y={b.y}
          width={bagW}
          height={bagH}
          rx={4}
          style={{ ["--i" as string]: b.n }}
        />
      ))}
    </svg>
  );
}

/**
 * Kept for the booking components: any place that showed a car picture now
 * shows that tier's cabin plan.
 */
export function Vehicle({
  tier,
  className,
  style,
  decorative = false,
  passengers,
  bags,
}: {
  tier: TierId;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  decorative?: boolean;
  passengers?: number;
  bags?: number;
}) {
  return (
    <CabinPlan
      tier={tier}
      className={["vehicle", className ?? ""].filter(Boolean).join(" ")}
      style={style}
      decorative={decorative}
      passengers={passengers}
      bags={bags}
    />
  );
}
