import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingScene } from "../components/booking/BookingScene";
import { NameBoard } from "../components/NameBoard";
import { ButtonLink } from "../components/Button";
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
      <BookingScene preset="airport" label="Airport transfers" />

      <section className="svc-tt" data-ground="light" aria-labelledby="tt-title">
        <div className="wrap">
          <div className="svc-tt__head">
            <p className="t-label muted">The arrival, as a timetable</p>
            <h2 id="tt-title" className="t-title">
              From landing to your door, one arrival at a time.
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
                      <span aria-hidden="true">
                        <s>{r.moved.from}</s> <span className="tt__arrow">→</span> <strong>{r.moved.to}</strong>
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

      <section className="svc-board" data-ground="light" aria-labelledby="board-h">
        <div className="wrap grid">
          <div className="svc-board__board">
            <NameBoard size="lg">
              <span className="t-title svc-board__name">{sampleBoardName.toUpperCase()}</span>
            </NameBoard>
          </div>
          <div className="svc-board__copy">
            <h2 id="board-h" className="t-step">
              The name board
            </h2>
            <p className="measure">
              Your chauffeur waits in the arrivals hall holding a board with your name, or the name you choose: a
              company name, or initials if you'd rather not be announced. You'll see the board when you book, and
              again on your booking page.
            </p>
            <p className="t-small muted">
              Meet-and-greet is included with airport arrivals.
            </p>
          </div>
        </div>
      </section>

      <section className="svc-qa" data-ground="light" aria-labelledby="qa-title">
        <div className="wrap grid">
          <h2 id="qa-title" className="t-label svc-qa__title">
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
        </div>
      </section>

      <section className="svc-close on-dark" data-ground="dark" aria-labelledby="close-title">
        <div className="wrap svc-close__inner">
          <h2 id="close-title" className="t-title">
            Landing soon?
          </h2>
          <div className="svc-close__actions">
            <ButtonLink to="/book/journey" variant="secondary" arrow>
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
