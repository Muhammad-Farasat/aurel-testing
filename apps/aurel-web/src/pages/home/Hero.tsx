import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import type { Service } from "../../booking/model";
import { Icon } from "../../components/Icon";
import { formatMoney, market } from "../../config/market";
import { serviceRules } from "../../config/serviceRules";
import { range, useReducedMotion, useScrollProgress } from "../../hooks";

/** Quick starts: each opens /book with that service set. */
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

/**
 * The outside: what booking a car often sounds like (Brief §2, the problems
 * AUREL answers). Illustrative lines written for this page; no brand named.
 * Each one is answered on the inside of the door. DRAFT COPY.
 */
const pairs = [
  { noise: "Driver cancelled. Finding you another…", answer: "Your chauffeur's name, the evening before." },
  { noise: "Fares are higher than usual right now", answer: "One fixed price, shown before you confirm." },
  { noise: "Where are you? I'm at the other entrance.", answer: "Waiting in arrivals, holding your name." },
  { noise: "No cars available nearby", answer: "Booked ahead, so the car is already yours." },
] as const;

const minutes = [4, 6, 9, 12, 15];

/**
 * Soft Close. The first screen is a car door, seen from inside, left open
 * onto the street. Outside: the noise of ordinary booking, loud and loose on
 * kerb grey. Inside, on the door: AUREL, quiet, with the way to book.
 * Scrolling swings the door shut over the noise; past the catch the latch
 * takes over and pulls it home slowly, the way a soft-close door does, and
 * the seal lights. The problems reappear on the inside, struck and answered.
 * Scroll only moves the door; text never scrubs.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, !reduce);
  const start = useStartBooking();
  const navigate = useNavigate();
  const [latched, setLatched] = useState(false);
  const [tick, setTick] = useState(0);

  // The latch: past the catch the door finishes on its own; scroll back to reopen.
  useEffect(() => {
    if (reduce) return;
    if (!latched && p >= 0.56) setLatched(true);
    else if (latched && p < 0.4) setLatched(false);
  }, [p, latched, reduce]);

  const closed = reduce || latched;

  // Tell the top frame to re-read the ground under it once the door settles.
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("aurel:ground")), 1000);
    return () => clearTimeout(id);
  }, [closed]);

  // Outside keeps talking until the door shuts.
  useEffect(() => {
    if (closed) return;
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, [closed]);

  // Door travel: scroll brings it to the catch (86%), the latch does the rest.
  const d = closed ? 1 : 0.86 * range(p, 0.03, 0.56);
  const style = { ["--d" as string]: d.toFixed(4) } as CSSProperties;
  const mins = minutes[tick % minutes.length]!;

  const closeDoor = () => {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + span * 0.64, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={["sc", closed ? "is-closed" : "", reduce ? "is-static" : ""].filter(Boolean).join(" ")}
      style={style}
      data-hide-action
      aria-labelledby="hero-title"
    >
      <div className="sc__stage">
        {/* Outside. Decorative: the same lines are read, struck, on the door. */}
        <div className="sc__out on-light" data-ground="kerb" aria-hidden="true">
          <p className="sc__side t-label">Outside</p>
          <p className="sc__n sc__n--mins tnum">
            <span className="sc__mins" key={mins}>
              {mins}
            </span>
            <span className="sc__mins-unit">min away</span>
          </p>
          <p className="sc__n sc__n--toast">{pairs[0].noise}</p>
          <p className="sc__n sc__n--fare">
            <span className="tnum sc__fare">
              {formatMoney(38)}–{formatMoney(71)}
            </span>
            <span className="sc__n-small">{pairs[1].noise}</span>
          </p>
          <p className="sc__n sc__n--where">{pairs[2].noise}</p>
          <p className="sc__n sc__n--none">
            {pairs[3].noise}
            <span className="sc__dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
          <p className="sc__n sc__n--call tnum">Missed call (3)</p>
        </div>

        {/* The door. It carries the answers on its inner face. */}
        <div className="sc__door" data-ground="dark">
          <span className="sc__seal" aria-hidden="true" />
          <div className="sc__answers">
            <p className="sc__side t-label">Inside</p>
            <ul className="sc__list" aria-label="What AUREL does instead">
              {pairs.map((x, i) => (
                <li key={x.answer} style={{ ["--i" as string]: i }}>
                  <s className="sc__was t-small">
                    <span className="visually-hidden">Instead of: </span>
                    {x.noise}
                  </s>
                  <span className="sc__ans">{x.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AUREL itself: on the part of the door that is always shut. It never moves. */}
        <div className="sc__in">
          <p className="sc__kicker t-label">Pre-booked private chauffeurs, {market.city}</p>
          <h1 id="hero-title" className="sc__title t-poster">
            <span className="visually-hidden">AUREL. </span>
            Travel, <em>considered.</em>
          </h1>
          <p className="sc__lede">
            Transfers, airports, by the hour or the whole day. A named chauffeur, a car chosen for your party, and one
            price before you confirm.
          </p>
          <div className="sc__actions">
            <button
              type="button"
              className="btn btn--primary sc__book"
              onClick={() => navigate("/book/journey", { state: { from: "/" } })}
            >
              <span className="btn__label">Book a journey</span>
              <Icon name="arrow" size={20} className="btn__arrow" />
            </button>
            <ul className="sc__quick" aria-label="Or start with a service">
              {quickServices.map((s) => (
                <li key={s.id}>
                  <button type="button" className="sc__quick-btn" onClick={() => start(s.id)}>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The ambient strip: it draws across once the door has latched. */}
        <span className="sc__strip" aria-hidden="true" />

        {!reduce ? (
          <button
            type="button"
            className={closed ? "sc__cue is-done" : "sc__cue"}
            onClick={closeDoor}
            tabIndex={closed ? -1 : 0}
            aria-hidden={closed ? true : undefined}
          >
            <span>Close the door</span>
            <Icon name="chevron" size={18} />
          </button>
        ) : null}
      </div>
    </section>
  );
}
