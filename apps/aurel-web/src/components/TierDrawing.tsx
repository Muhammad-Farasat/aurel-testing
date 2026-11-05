/**
 * Technical side elevations of the four tier shapes, drawn to scale with one
 * another (units: centimetres, ground at y = 0). Generic body shapes, not a
 * specific model, which is honest while the fleet is not final (Brief §6).
 * Seats and bags are drawn inside as marks; marks for the party fill in ink.
 */
import type { TierId } from "../config/tiers";
import { getTier } from "../config/tiers";
import "./TierDrawing.css";

type Pt = [number, number];

interface Shape {
  length: number;
  body: Pt[];
  windows: Pt[];
  pillars: number[];
  wheels: { x: number; r: number }[];
  cabin: [number, number];
  cabinY: number;
  boot: [number, number];
  bootY: number;
}

const H = 210;

const shapes: Record<TierId, Shape> = {
  business: {
    length: 495,
    body: [[5, 30], [0, 55], [10, 72], [125, 86], [200, 140], [330, 142], [410, 100], [485, 95], [495, 60], [488, 30]],
    windows: [[140, 92], [205, 134], [325, 136], [395, 98]],
    pillars: [265],
    wheels: [{ x: 95, r: 33 }, { x: 390, r: 33 }],
    cabin: [175, 360],
    cabinY: 52,
    boot: [408, 478],
    bootY: 72,
  },
  first: {
    length: 525,
    body: [[5, 30], [0, 56], [10, 74], [140, 88], [215, 144], [355, 146], [440, 102], [515, 97], [525, 60], [518, 30]],
    windows: [[155, 94], [220, 138], [350, 140], [425, 100]],
    pillars: [285],
    wheels: [{ x: 100, r: 34 }, { x: 418, r: 34 }],
    cabin: [190, 390],
    cabinY: 54,
    boot: [440, 508],
    bootY: 74,
  },
  suv: {
    length: 505,
    body: [[5, 38], [0, 65], [10, 92], [110, 105], [170, 175], [460, 178], [495, 155], [500, 65], [492, 38]],
    windows: [[125, 110], [178, 168], [455, 170], [485, 145], [485, 110]],
    pillars: [270, 380],
    wheels: [{ x: 100, r: 38 }, { x: 400, r: 38 }],
    cabin: [160, 400],
    cabinY: 64,
    boot: [418, 488],
    bootY: 82,
  },
  van: {
    length: 530,
    body: [[5, 36], [0, 62], [15, 100], [75, 115], [135, 190], [520, 193], [530, 180], [530, 36]],
    windows: [[90, 120], [142, 182], [515, 184], [518, 125]],
    pillars: [200, 330, 440],
    wheels: [{ x: 95, r: 35 }, { x: 425, r: 35 }],
    cabin: [150, 440],
    cabinY: 66,
    boot: [458, 524],
    bootY: 72,
  },
};

export const tierLength = (id: TierId) => shapes[id].length;
export const MAX_LENGTH = Math.max(...Object.values(shapes).map((s) => s.length));

const y = (v: number) => H - v;
const poly = (pts: Pt[]) => pts.map(([px, py]) => `${px},${y(py)}`).join(" ");

/** Body outline with wheel arches cut into the sill. */
function bodyPath(s: Shape): string {
  const sill = s.body[0]![1];
  const pts = s.body;
  let d = `M${pts[0]![0]},${y(pts[0]![1])}`;
  for (const [px, py] of pts.slice(1)) d += ` L${px},${y(py)}`;
  // Back along the sill, rear to front, arching over each wheel.
  const arches = [...s.wheels].sort((a, b) => b.x - a.x);
  for (const w of arches) {
    const r = w.r + 8;
    d += ` L${w.x + r},${y(sill)} A${r},${r} 0 0 0 ${w.x - r},${y(sill)}`;
  }
  return `${d} Z`;
}

function SeatMark({ x, yv, filled }: { x: number; yv: number; filled: boolean }) {
  // An L: seat back and cushion, 18 cm wide.
  return (
    <path
      className={filled ? "tier-draw__mark is-filled" : "tier-draw__mark"}
      d={`M${x},${y(yv + 34)} L${x},${y(yv)} L${x + 22},${y(yv)} L${x + 22},${y(yv + 8)} L${x + 6},${y(yv + 8)} L${x + 6},${y(yv + 34)} Z`}
    />
  );
}

export function TierDrawing({
  tier,
  passengers = 0,
  bags = 0,
  title,
  className,
}: {
  tier: TierId;
  passengers?: number;
  bags?: number;
  title?: string;
  className?: string;
}) {
  const s = shapes[tier];
  const t = getTier(tier)!;
  const seatXs = Array.from({ length: t.seats }, (_, i) => {
    const [a, b] = s.cabin;
    const step = t.seats > 1 ? (b - a - 22) / (t.seats - 1) : 0;
    return a + i * step;
  });
  const perRow = Math.max(1, Math.floor((s.boot[1] - s.boot[0]) / 20));
  const bagRects = Array.from({ length: t.bags }, (_, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    return { x: s.boot[0] + col * 20, yv: s.bootY + row * 22 };
  });
  return (
    <svg
      className={["tier-draw", className].filter(Boolean).join(" ")}
      viewBox={`-4 -4 ${s.length + 8} ${H + 8}`}
      role="img"
      aria-label={title ?? `${t.name}: side view, seats ${t.seats}, bags ${t.bags}`}
      style={{ aspectRatio: `${s.length + 8} / ${H + 8}` }}
    >
      <path className="tier-draw__body" d={bodyPath(s)} />
      <polygon className="tier-draw__line" points={poly(s.windows)} />
      {s.pillars.map((px) => (
        <line
          key={px}
          className="tier-draw__line"
          x1={px}
          x2={px}
          y1={y(s.windows[0]![1])}
          y2={y(Math.max(...s.windows.map((w) => w[1])) - 2)}
        />
      ))}
      {s.wheels.map((w) => (
        <g key={w.x}>
          <circle className="tier-draw__wheel" cx={w.x} cy={y(w.r)} r={w.r} />
          <circle className="tier-draw__line" cx={w.x} cy={y(w.r)} r={w.r * 0.55} />
        </g>
      ))}
      {seatXs.map((sx, i) => (
        <SeatMark key={`s${i}`} x={sx} yv={s.cabinY} filled={i < passengers} />
      ))}
      {bagRects.map((b, i) => (
        <rect
          key={`b${i}`}
          className={i < bags ? "tier-draw__mark is-filled" : "tier-draw__mark"}
          x={b.x}
          y={y(b.yv + 18)}
          width={15}
          height={18}
        />
      ))}
    </svg>
  );
}
