import { useRef, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import type { Service } from "../../booking/model";
import { Vehicle } from "../../components/Vehicle";
import { Icon } from "../../components/Icon";
import { getTier } from "../../config/tiers";
import { market } from "../../config/market";
import { serviceRules } from "../../config/serviceRules";
import { useClock, useMediaQuery, useReducedMotion, useScrollProgress, range } from "../../hooks";

const HERO_TIER = "first" as const;

/** Quick starts under the headline: each opens /book with that service set. */
export const quickServices: { id: Service; label: string; tag: string }[] = [
  { id: "transfer", label: "Transfer", tag: "A to B" },
  { id: "airport", label: "Airport", tag: "Flight tracked" },
  { id: "hourly", label: "Hourly", tag: `From ${serviceRules.hourlyMinHours} hours` },
  { id: "fullday", label: "Full day", tag: `${serviceRules.fullDayLengths.join(" or ")} hours` },
];

export function useStartBooking() {
  const { setService } = useDraft();
  const navigate = useNavigate();
  return (s: Service) => {
    setService(s);
    navigate("/book/journey", { state: { from: "/" } });
  };
}

/** Pinned around the car when it pulls back. Draft wording (copy.ts, Open question 6). */
const pullNotes = ["Flight tracked", "Waiting time included", "Named the evening before", "Price before you confirm"];

interface Pose {
  x: number; // vw
  y: number; // vh
  s: number;
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const mix = (a: Pose, b: Pose, t: number): Pose => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  s: a.s + (b.s - a.s) * t,
});

/**
 * Scenes 1 to 3: the car stays on screen while the page changes around it
 * (P-020). Hero: the car crosses the headline (P-019). Detail: the camera
 * moves in on the rear seat with small spec labels (P-023). Pull-back: the
 * car shrinks to one side and the first standard takes the stage.
 * Scroll only moves the car; the frames around it swap by phase.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const narrow = useMediaQuery("(max-width: 1099px)");
  const p = useScrollProgress(ref, !reduce);
  const clock = useClock();
  const start = useStartBooking();
  const tier = getTier(HERO_TIER)!;

  const phase = reduce ? "a" : p < 0.14 ? "a" : p < 0.6 ? "b" : "c";

  // Poses in viewport units, relative to the car's resting place.
  const A: Pose = { x: 0, y: 0, s: 1 };
  const B: Pose = narrow ? { x: -40, y: 4, s: 1.6 } : { x: -22, y: -4, s: 2.35 };
  const C: Pose = narrow ? { x: 0, y: 6, s: 0.86 } : { x: -21, y: -2, s: 0.6 };
  const pose = p < 0.42 ? mix(A, B, ease(range(p, 0.15, 0.42))) : mix(B, C, ease(range(p, 0.56, 0.8)));

  const carStyle: CSSProperties = reduce
    ? {}
    : { transform: `translate3d(${pose.x}vw, ${pose.y}vh, 0) scale(${pose.s})` };

  return (
    <section
      ref={ref}
      className={["hero", `is-${phase}`, reduce ? "is-static" : ""].join(" ")}
      data-ground="light"
      data-hide-action
      aria-labelledby="hero-title"
    >
      <div className="hero__stage">
        <h1 id="hero-title" className="hero__title t-poster">
          <span className="hero__line hero__line--a">Travel,</span>{" "}
          <span className="hero__line hero__line--b">Considered.</span>
        </h1>

        <div className="hero__car" style={carStyle}>
          <Vehicle tier={HERO_TIER} priority sizes="(min-width: 834px) 80vw, 150vw" decorative />
        </div>

        {/* Frame A: what this is, and the way in. */}
        <div className="hero__frame hero__frame--a">
          <p className="hero__kicker t-label">Pre-booked private chauffeurs</p>
          <p className="hero__clock t-label tnum" aria-label={`${market.city}, ${clock}`}>
            <span className="now-dot" aria-hidden="true" /> {market.city} {clock}
          </p>
          <div className="hero__start">
            <p className="hero__lede">
              Transfers, airports, hours or a whole day. A named chauffeur, a car chosen for your party, and the price
              before you confirm.
            </p>
            <ul className="hero__quick" aria-label="Start a booking">
              {quickServices.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="hero__quick-btn"
                    onClick={() => start(s.id)}
                    tabIndex={phase === "a" ? 0 : -1}
                  >
                    <span>{s.label}</span>
                    <span className="hero__quick-tag t-small">{s.tag}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Frame B: close on the rear seat. */}
        <div className="hero__frame hero__frame--b">
          <p className="hero__chapter t-label tnum">01 / Where you sit</p>
          <ul className="hero__specs" aria-label={`${tier.name} rear seat`}>
            {tier.included.slice(1).map((f, i) => (
              <li key={f} className="pill" style={{ ["--i" as string]: i }}>
                <span className="pill__dot" aria-hidden="true" />
                {f}
              </li>
            ))}
            <li className="pill pill--ink" style={{ ["--i" as string]: 3 }}>
              <span className="tnum">
                {tier.seats} seats, {tier.bags} bags
              </span>
            </li>
          </ul>
          <p className="hero__caption t-small">
            {tier.name}. {tier.similar}. Placeholder image.
          </p>
        </div>

        {/* Frame C: the car pulls back; the first standard takes the stage. */}
        <div className="hero__frame hero__frame--c">
          <h2 className="hero__there t-display">
            There
            <br />
            first.
          </h2>
          <ul className="hero__notes" aria-label="On every journey">
            {pullNotes.map((n, i) => (
              <li key={n} className="pill" style={{ ["--i" as string]: i }}>
                <span className="pill__dot" aria-hidden="true" />
                {n}
              </li>
            ))}
          </ul>
          <p className="hero__there-line">
            Your chauffeur is at arrivals before you are. You know their name, the car and the plate the evening before.
          </p>
          <Link to="/airport-transfers" className="btn btn--text hero__there-link" tabIndex={phase === "c" || reduce ? 0 : -1}>
            <span className="btn__label">How an airport pickup runs</span>
            <Icon name="arrow" size={20} className="btn__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
