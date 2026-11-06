import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { BookingScene } from "../../components/booking/BookingScene";
import { FleetBands } from "../../components/fleet/FleetBands";
import { Footer } from "../../components/frame/Footer";
import { Icon } from "../../components/Icon";
import { ButtonLink } from "../../components/Button";
import { Stepper } from "../../components/form/Stepper";
import { useDraft } from "../../booking/DraftContext";
import { MAX_BAGS, MAX_PARTY, fitReason, tiers } from "../../config/tiers";
import { serviceRules } from "../../config/serviceRules";
import { range, useInView, useReducedMotion, useScrollProgress } from "../../hooks";
import { Hero, useStartBooking } from "./Hero";
import type { Service } from "../../booking/model";
import "./home.css";

/**
 * Home, "Soft Close". The door shuts on the noise, then each scene answers
 * the next question a visitor has (P-024, PP-001): can I book, which car fits
 * us, what happens when I land, what else can I ask for, can my company use
 * it, and a sign-off that opens the door again.
 */
export function Home() {
  useEffect(() => {
    document.title = "AUREL. Travel, Considered.";
  }, []);
  return (
    <div className="home">
      <Hero />
      <BookingScene
        label="Book a journey"
        headingLevel={2}
        aside={
          <ol className="steps-preview" aria-label="Four steps">
            {["Journey", "Vehicle", "Details", "Review and pay"].map((s, i) => (
              <li key={s}>
                <span className="tnum">{i + 1}</span> {s}
              </li>
            ))}
            <li className="steps-preview__note t-small">Prices appear with the cars. Nothing is charged until step 4.</li>
          </ol>
        }
      />
      <Cabins />
      <Arrivals />
      <Requests />
      <Business />
      <Ending />
      <Footer />
    </div>
  );
}

/** Which car fits us? The fleet drawn as cabins from above; set your party and watch the seats fill. */
function Cabins() {
  const { draft, update } = useDraft();
  const fits = tiers.filter((t) => !fitReason(t, draft.passengers, draft.bags)).length;
  return (
    <section className="cabins" aria-labelledby="cabins-title">
      <div className="wrap">
        <div className="cabins__head">
          <h2 id="cabins-title" className="t-display cabins__title">
            The cabin, <em>from above.</em>
          </h2>
          <div className="cabins__party">
            <p className="cabins__lede">Four cars, told apart by what they carry. Tell us who's coming.</p>
            <div className="cabins__steppers">
              <Stepper id="home-pax" label="Passengers" value={draft.passengers} min={1} max={MAX_PARTY} onChange={(n) => update({ passengers: n })} />
              <Stepper id="home-bags" label="Bags" value={draft.bags} min={0} max={MAX_BAGS} onChange={(n) => update({ bags: n })} />
            </div>
            <p className="cabins__fits t-small tnum" aria-live="polite">
              {fits} of 4 cars fit
            </p>
          </div>
        </div>
        <FleetBands party={{ passengers: draft.passengers, bags: draft.bags }} />
        <p className="t-small muted cabins__note">
          Drawings are schematic; vehicles vary by city. <Link to="/fleet">Compare all four</Link>
        </p>
      </div>
    </section>
  );
}

/** What happens when I land? Four doorways, one inside the next; scroll walks you through them. EXAMPLE wording. */
const thresholds = [
  { at: "Take-off", line: "We follow your flight from the moment it leaves." },
  { at: "Landing", line: "Early or late, the pickup moves with the landing time." },
  { at: "Arrivals hall", line: "Your chauffeur is waiting with your name before you clear passport control." },
  { at: "The kerb", line: `Bags to the car. ${serviceRules.airportWaitingIncluded} minutes of waiting are included.` },
];

function Arrivals() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, !reduce);
  const t = reduce ? 3 : Math.min(3, Math.floor(range(p, 0.08, 0.92) * 4));
  const z = reduce ? 0 : range(p, 0.05, 0.95);
  return (
    <section
      ref={ref}
      className={reduce ? "arr is-static" : "arr"}
      style={{ ["--z" as string]: z.toFixed(4) } as CSSProperties}
      aria-labelledby="arr-title"
    >
      <div className="arr__stage">
        <div className="arr__frames" aria-hidden="true">
          {thresholds.map((x, i) => (
            <span
              key={x.at}
              className={["arr__frame", i < t ? "is-passed" : "", i === t ? "is-now" : ""].join(" ")}
              style={{ ["--s" as string]: Math.pow(0.7, i).toFixed(3) }}
            >
              <span className="arr__frame-label t-label">{x.at}</span>
            </span>
          ))}
        </div>
        <div className="arr__copy wrap">
          <p className="t-label arr__kicker">Airport arrivals</p>
          <h2 id="arr-title" className="t-display arr__title">
            Four doors <em>to the car.</em>
          </h2>
          <ol className="arr__list">
            {thresholds.map((x, i) => (
              <li key={x.at} className={i === t ? "is-now" : i < t ? "is-done" : ""} aria-current={i === t ? "step" : undefined}>
                <span className="arr__at t-label tnum">
                  0{i + 1} {x.at}
                </span>
                <span className="arr__line">{x.line}</span>
              </li>
            ))}
          </ol>
          <Link to="/airport-transfers" className="btn btn--text arr__link">
            <span className="btn__label">How airport transfers work</span>
            <Icon name="arrow" size={20} className="btn__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** What else can I ask for? The four services, said the way a passenger would say them. */
const requests: { id: Service; say: [string, string]; label: string; tag: string }[] = [
  { id: "transfer", say: ["Take me", "there."], label: "Transfer", tag: "A to B, any time" },
  { id: "airport", say: ["Meet me", "off the plane."], label: "Airport", tag: "Flight tracked" },
  { id: "hourly", say: ["Stay with me", "this afternoon."], label: "Hourly", tag: `From ${serviceRules.hourlyMinHours} hours` },
  { id: "fullday", say: ["Keep the car", "all day."], label: "Full day", tag: `${serviceRules.fullDayLengths.join(" or ")} hours` },
];

function Requests() {
  const start = useStartBooking();
  const [ref, inView] = useInView<HTMLUListElement>({ threshold: 0.2 });
  return (
    <section className="req" aria-labelledby="req-title">
      <div className="wrap">
        <h2 id="req-title" className="t-label req__kicker">
          Four ways to book. Choose one to start.
        </h2>
        <ul className={inView ? "req__list is-in" : "req__list"} ref={ref}>
          {requests.map((r, i) => (
            <li key={r.id} style={{ ["--i" as string]: i }}>
              <button type="button" className="req__row" onClick={() => start(r.id)}>
                <span className="req__say">
                  {r.say[0]} <em>{r.say[1]}</em>
                </span>
                <span className="req__meta">
                  <span className="req__label">{r.label}</span>
                  <span className="t-small muted">{r.tag}</span>
                </span>
                <span className="req__go" aria-hidden="true">
                  <Icon name="arrow" size={22} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Can my company use it? The one scene on the kerb: the outside world, at work. */
function Business() {
  return (
    <section className="biz on-light" data-ground="kerb" aria-labelledby="biz-title">
      <div className="wrap biz__inner">
        <h2 id="biz-title" className="t-display biz__title">
          Booking for <em>someone else?</em>
        </h2>
        <div className="biz__slip" aria-label="How a business booking reads">
          <dl>
            <div>
              <dt className="t-label">Booked by</dt>
              <dd>You, or your assistant</dd>
            </div>
            <div>
              <dt className="t-label">Travelling</dt>
              <dd>A colleague, a client, a guest</dd>
            </div>
            <div>
              <dt className="t-label">Cost centre</dt>
              <dd>On every journey</dd>
            </div>
            <div>
              <dt className="t-label">Billed</dt>
              <dd>One invoice a month</dd>
            </div>
          </dl>
          <ButtonLink to="/business" variant="secondary" arrow>
            Accounts for business
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** The sign-off: the door opens again, a slit of kerb light, and the one promise. */
function Ending() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const p = useScrollProgress(ref, !reduce);
  const o = reduce ? 1 : range(p, 0.1, 0.75);
  return (
    <section
      ref={ref}
      className={reduce ? "end is-static" : "end"}
      style={{ ["--o" as string]: o.toFixed(4) } as CSSProperties}
      data-hide-action
      aria-labelledby="end-title"
    >
      <div className="end__stage">
        <div className="end__gap on-light" data-ground="kerb" aria-hidden="true" />
        <div className="end__copy wrap">
          <h2 id="end-title" className="t-poster end__title">
            We'll be <em>outside.</em>
          </h2>
          <div className="end__actions">
            <ButtonLink to="/book/journey" variant="primary" arrow>
              Book a journey
            </ButtonLink>
            <Link to="/fleet" className="btn btn--text">
              <span className="btn__label">See the fleet</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
