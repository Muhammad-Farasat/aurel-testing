import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingScene } from "../components/booking/BookingScene";
import { BoardName, NameBoard } from "../components/NameBoard";
import { Vehicle } from "../components/Vehicle";
import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import { useInView } from "../hooks";
import { sampleBoardName } from "../config/copy";
import { serviceRules } from "../config/serviceRules";
import { formatMoney } from "../config/market";
import "./pages.css";

/** EXAMPLE DATA: one arrival, BA117, the same morning as Chapter 01. */
const timetable = [
  { time: "Day before, 19:00", event: "Chauffeur and car confirmed", what: "Name, car and plate arrive by text." },
  { time: "04:20", event: "BA117 leaves New York", what: "We start following the flight from take-off." },
  { time: "06:40", event: "Before the car leaves", what: "Your chauffeur sets off for the landing time, not the booked time." },
  { time: "07:23", event: "Landed twelve minutes early", what: "The pickup moves with it.", moved: { from: "08:05", to: "07:53" } },
  { time: "07:40", event: "In the arrivals hall", what: "Holding the board with your name, before you clear passport control." },
  { time: "07:53", event: "You meet", what: "Bags to the car. Water in the door." },
  { time: "08:53", event: "Waiting included until", what: `${serviceRules.airportWaitingIncluded} minutes after the meeting time, at no extra cost.` },
];

const questions = [
  {
    q: "What if my flight is late?",
    a: "The pickup moves with the landing time. You don't need to call us, and there's no charge for the delay.",
  },
  {
    q: "How long will the chauffeur wait?",
    a: `${serviceRules.airportWaitingIncluded} minutes from the meeting time are included. If you need longer, add extra waiting when you book or call us on the day.`,
  },
  {
    q: "What does waiting cost after that?",
    a: `Extra waiting is charged in 15-minute steps. Extra 30 minutes booked ahead costs ${formatMoney(30)} (example price).`,
  },
  {
    q: "Where do we meet?",
    a: "In the arrivals hall, at the meeting point for your terminal. Your chauffeur's name and mobile number arrive by text the evening before.",
  },
];

export function AirportTransfers() {
  const [rowsRef, rowsIn] = useInView<HTMLOListElement>({ threshold: 0.3 });
  useEffect(() => {
    document.title = "Airport transfers. AUREL";
  }, []);
  return (
    <div className="svc">
      {/* Poster: the SUV, the one with room for bags, crosses the word (P-019). */}
      <section className="ap-hero" data-ground="light" data-hide-action aria-labelledby="ap-title">
        <div className="wrap ap-hero__inner">
          <p className="t-label ap-hero__kicker">Airport transfers</p>
          <h1 id="ap-title" className="t-poster ap-hero__title">
            Arrivals
          </h1>
          <div className="ap-hero__car">
            <Vehicle tier="suv" priority sizes="(min-width: 834px) 70vw, 120vw" decorative />
            <div className="ap-hero__board" aria-hidden="true">
              <NameBoard>
                <BoardName name={sampleBoardName} />
              </NameBoard>
            </div>
          </div>
          <div className="ap-hero__foot">
            <p className="ap-hero__lede">
              Met in the arrivals hall with your name on a board. The pickup follows your flight, early or late.
            </p>
            <ul className="ap-hero__pills" aria-label="Included with arrivals">
              <li className="pill">Flight tracked</li>
              <li className="pill">Meet-and-greet</li>
              <li className="pill tnum">{serviceRules.airportWaitingIncluded} min waiting included</li>
            </ul>
            <a href="#booking" className="btn btn--primary ap-hero__cta">
              <span className="btn__label">Book an airport transfer</span>
              <Icon name="arrow" size={20} className="btn__arrow" />
            </a>
          </div>
        </div>
      </section>

      <BookingScene preset="airport" label="Airport transfers" headingLevel={2} />

      <section className="svc-tt" data-ground="light" aria-labelledby="tt-title">
        <div className="wrap">
          <div className="svc-tt__head">
            <p className="t-label muted">The arrival, as a timetable</p>
            <h2 id="tt-title" className="t-display">
              Landing to door.
            </h2>
          </div>
          <ol className={rowsIn ? "tt is-in" : "tt"} ref={rowsRef}>
            <li className="tt__row tt__row--head" aria-hidden="true">
              <span className="t-label">Time</span>
              <span className="t-label">What happens</span>
              <span className="t-label">What AUREL does</span>
            </li>
            {timetable.map((r, i) => (
              <li key={r.time} className={r.moved ? "tt__row is-moved" : "tt__row"} style={{ ["--i" as string]: i }}>
                <span className="tt__time tnum">{r.time}</span>
                <span className="tt__event">{r.event}</span>
                <span className="tt__what">
                  {r.what}
                  {r.moved ? (
                    <span className="tt__move tnum">
                      <span className="visually-hidden">Pickup moved from {r.moved.from} to {r.moved.to}.</span>
                      <span aria-hidden="true" className="tt__move-pills">
                        <s className="pill">{r.moved.from}</s> <span className="tt__arrow">→</span>{" "}
                        <strong className="pill pill--ink">{r.moved.to}</strong>
                      </span>
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="t-small muted svc-tt__note">Example arrival. Times depend on your flight.</p>
        </div>
      </section>

      <section className="svc-qa" data-ground="light" aria-labelledby="qa-title">
        <div className="wrap">
          <h2 id="qa-title" className="t-title svc-qa__title">
            Delays and waiting
          </h2>
          <dl className="svc-qa__list">
            {questions.map((x) => (
              <div key={x.q} className="svc-qa__item">
                <dt className="t-step">{x.q}</dt>
                <dd className="muted">{x.a}</dd>
              </div>
            ))}
          </dl>
          <p className="t-small muted svc-qa__board-note">
            The board can show a company name, or initials if you'd rather not be announced. You set it when you book.
          </p>
        </div>
      </section>

      <section className="svc-close on-dark" data-ground="dark" aria-labelledby="close-title">
        <div className="wrap svc-close__inner">
          <h2 id="close-title" className="t-display">
            Landing soon?
          </h2>
          <div className="svc-close__actions">
            <ButtonLink to="/book/journey" variant="primary" arrow>
              Book an airport transfer
            </ButtonLink>
            <Link to="/help" className="btn btn--text">
              <span className="btn__label">Questions about airports</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
