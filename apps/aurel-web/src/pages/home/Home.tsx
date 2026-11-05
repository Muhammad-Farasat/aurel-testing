import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingScene } from "../../components/booking/BookingScene";
import { FleetBands } from "../../components/fleet/FleetBands";
import { Footer } from "../../components/frame/Footer";
import { BoardName, NameBoard } from "../../components/NameBoard";
import { Vehicle } from "../../components/Vehicle";
import { Icon } from "../../components/Icon";
import { ButtonLink } from "../../components/Button";
import { morning, sampleBoardName, tagline } from "../../config/copy";
import { useInView } from "../../hooks";
import { Hero, quickServices, useStartBooking } from "./Hero";
import "./home.css";

/**
 * Home, "Standing By". Section order answers the visitor's questions in turn
 * (P-024): what is this (the car), can I book (the panel), which car (the
 * fleet), what happens at the airport, what else can I book, can my company
 * use it, and a sign-off.
 */
export function Home() {
  useEffect(() => {
    document.title = "AUREL. Travel, Considered.";
  }, []);
  return (
    <div className="home">
      <Hero />
      <BookingScene label="Book a journey" headingLevel={2} />
      <FleetScene />
      <Landed />
      <Services />
      <Business />
      <Ending />
      <Footer />
    </div>
  );
}

function FleetScene() {
  return (
    <section className="hfleet" data-ground="light" aria-labelledby="hfleet-title">
      <div className="wrap">
        <div className="hfleet__head">
          <p className="t-label hfleet__kicker">The fleet</p>
          <h2 id="hfleet-title" className="t-display hfleet__title">
            Four cars.
            <br />
            Pick by what you carry.
          </h2>
        </div>
        <FleetBands />
        <p className="t-small hfleet__note">
          Pictures are placeholders until the fleet is photographed. Vehicles vary by city.{" "}
          <Link to="/fleet">Compare all four</Link>
        </p>
      </div>
    </section>
  );
}

/** Airport chapter: one number carries the scene. EXAMPLE DATA from copy.ts. */
function Landed() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const steps = [
    { t: morning[0].time, label: "Flight checked" },
    { t: "07:23", label: "Landed early" },
    { t: "07:40", label: "In arrivals" },
    { t: "07:53", label: "You meet" },
  ];
  return (
    <section className="landed on-dark" data-ground="dark" aria-labelledby="landed-title">
      <div className={inView ? "wrap landed__inner is-in" : "wrap landed__inner"} ref={ref}>
        <p className="t-label landed__kicker">Airport arrivals, an example morning</p>
        <h2 id="landed-title" className="landed__title">
          <span className="visually-hidden">Your pickup moved from 08:05 to 07:53.</span>
          <span className="landed__was tnum" aria-hidden="true">
            08:05
          </span>
          <span className="landed__now tnum" aria-hidden="true">
            07:53
          </span>
        </h2>
        <div className="landed__board" aria-hidden="true">
          <NameBoard>
            <BoardName name={sampleBoardName} />
          </NameBoard>
        </div>
        <div className="landed__copy">
          <p className="landed__lede">{morning[1].title}</p>
          <p className="landed__line">{morning[1].line}</p>
          <ol className="landed__steps" aria-label="The morning">
            {steps.map((s, i) => (
              <li key={s.t} className={i === 3 ? "pill" : "pill landed__step"} style={{ ["--i" as string]: i }}>
                <span className="tnum">{s.t}</span> {s.label}
              </li>
            ))}
          </ol>
          <Link to="/airport-transfers" className="btn btn--text landed__link">
            <span className="btn__label">How airport transfers work</span>
            <Icon name="arrow" size={20} className="btn__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Four services as four big words, each with a small tag pinned to it (P-023). */
function Services() {
  const start = useStartBooking();
  return (
    <section className="hsvc" data-ground="light" aria-labelledby="hsvc-title">
      <div className="wrap">
        <div className="hsvc__head">
          <h2 id="hsvc-title" className="t-label">
            Four ways to book
          </h2>
          <p className="t-small hsvc__hint">Choose one to start. Everything you enter is kept as you go.</p>
        </div>
        <ul className="hsvc__list">
          {quickServices.map((s, i) => (
            <li key={s.id} style={{ ["--i" as string]: i }}>
              <button type="button" className="hsvc__row" onClick={() => start(s.id)}>
                <span className="hsvc__n tnum" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="hsvc__word">{s.label}</span>
                <span className="pill pill--ink hsvc__tag">{s.tag}</span>
                <span className="hsvc__go" aria-hidden="true">
                  <Icon name="arrow" size={24} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section className="hbiz" data-ground="light" aria-labelledby="hbiz-title">
      <div className="wrap hbiz__inner">
        <h2 id="hbiz-title" className="t-display hbiz__title">
          Booking for
          <br />
          someone else?
        </h2>
        <div className="hbiz__copy">
          <p>
            Business accounts book for colleagues and guests, keep cost centres on every journey and get one invoice a
            month.
          </p>
          <ul className="hbiz__pills" aria-label="Business accounts include">
            <li className="pill">Booking for others</li>
            <li className="pill">Cost centres</li>
            <li className="pill">Monthly billing</li>
          </ul>
          <ButtonLink to="/business" variant="secondary" arrow>
            Accounts for business
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** The sign-off: the wordmark set as big as the page allows, the car in front of it (P-009, P-019). */
function Ending() {
  return (
    <section className="ending" data-ground="light" data-hide-action aria-labelledby="ending-title">
      <div className="wrap ending__inner">
        <p className="ending__tag t-label">{tagline}</p>
        <h2 id="ending-title" className="ending__mark" aria-label="AUREL">
          AUREL
        </h2>
        <div className="ending__car">
          <Vehicle tier="business" sizes="(min-width: 834px) 70vw, 110vw" decorative />
        </div>
        <div className="ending__actions">
          <ButtonLink to="/book/journey" variant="primary" arrow>
            Book a journey
          </ButtonLink>
          <Link to="/fleet" className="btn btn--text">
            <span className="btn__label">See the fleet</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
