import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fitReason, tiers, MAX_PARTY } from "../../config/tiers";
import { useMediaQuery, useReducedMotion, useScrollProgress } from "../../hooks";
import { ChapterFrame } from "../../components/story/Story";
import { TierDrawing, tierLength, MAX_LENGTH } from "../../components/TierDrawing";
import { Stepper } from "../../components/form/Stepper";

/**
 * Chapter 03: what each car carries. The party count steps from 1/1 to 7/7 as
 * you scroll; tiers that no longer fit fade and say why. Phones get the same
 * idea with steppers you set yourself; reduced motion gets the full table.
 */
export function Capacity() {
  const reduce = useReducedMotion();
  const isPhone = useMediaQuery("(max-width: 599px)");
  if (reduce) return <CapacityTable />;
  return isPhone ? <CapacityPhone /> : <CapacityScrubbed />;
}

function TierLine({ passengers, bags }: { passengers: number; bags: number }) {
  return (
    <div className="cap__line">
      {tiers.map((t) => {
        const reason = fitReason(t, passengers, bags);
        return (
          <figure
            key={t.id}
            className={reason ? "cap__tier is-out" : "cap__tier"}
            style={{ ["--len" as string]: tierLength(t.id) / MAX_LENGTH }}
          >
            <div className="cap__drawing">
              <TierDrawing tier={t.id} passengers={reason ? 0 : passengers} bags={reason ? 0 : bags} />
            </div>
            <figcaption>
              <span className="cap__name">{t.name}</span>
              <span className="t-small muted tnum">
                Seats {t.seats}, bags {t.bags}
              </span>
              <span className="cap__reason t-small" aria-live="polite">
                {reason ?? " "}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function CapacityScrubbed() {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);
  const n = Math.min(MAX_PARTY, 1 + Math.floor(p * MAX_PARTY * 0.999));
  return (
    <section ref={ref} className="cap cap--pinned" data-ground="light" aria-labelledby="cap-title">
      <div className="cap__pin">
        <ChapterFrame label="03 Fleet" />
        <div className="wrap cap__inner">
          <div className="cap__head">
            <p className="cap__counter" aria-live="polite">
              <span className="cap__count">
                <span className="t-display tnum">{n}</span>
                <span className="t-label">{n === 1 ? "Passenger" : "Passengers"}</span>
              </span>
              <span className="cap__count">
                <span className="t-display tnum">{n}</span>
                <span className="t-label">{n === 1 ? "Bag" : "Bags"}</span>
              </span>
            </p>
            <div className="cap__intro">
              <h2 id="cap-title" className="cap__title">
                What each car carries
              </h2>
              <p className="muted">Scroll to add passengers and bags. Cars that can't carry them step back and say why.</p>
            </div>
          </div>
          <TierLine passengers={n} bags={n} />
          <Link className="btn btn--text cap__more" to="/fleet" viewTransition>
            <span className="btn__label">Compare the four cars</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CapacityPhone() {
  const [pax, setPax] = useState(1);
  const [bags, setBags] = useState(1);
  return (
    <section className="cap cap--phone" data-ground="light" aria-labelledby="cap-title">
      <ChapterFrame label="03 Fleet" />
      <div className="wrap">
        <h2 id="cap-title" className="cap__title">
          What each car carries
        </h2>
      </div>
      <div className="cap__sticky wrap">
        <Stepper id="cap-pax" label="Passengers" value={pax} min={1} max={MAX_PARTY} onChange={setPax} />
        <Stepper id="cap-bags" label="Bags" value={bags} min={0} max={MAX_PARTY} onChange={setBags} />
      </div>
      <div className="cap__snap" tabIndex={0} aria-label="The four cars, scroll sideways">
        <TierLine passengers={pax} bags={bags} />
      </div>
      <div className="wrap">
        <Link className="btn btn--text cap__more" to="/fleet" viewTransition>
          <span className="btn__label">Compare the four cars</span>
        </Link>
      </div>
    </section>
  );
}

function CapacityTable() {
  return (
    <section className="cap cap--static" data-ground="light" aria-labelledby="cap-title">
      <ChapterFrame label="03 Fleet" />
      <div className="wrap">
        <h2 id="cap-title" className="cap__title">
          What each car carries
        </h2>
        <table className="cap__table">
          <thead>
            <tr>
              <th scope="col" className="t-label">Car</th>
              <th scope="col" className="t-label">Seats</th>
              <th scope="col" className="t-label">Bags</th>
              <th scope="col" className="t-label">Suited to</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((t) => (
              <tr key={t.id}>
                <th scope="row">
                  <span className="cap__table-draw" style={{ ["--len" as string]: tierLength(t.id) / MAX_LENGTH }}>
                    <TierDrawing tier={t.id} />
                  </span>
                  {t.name}
                </th>
                <td className="tnum">{t.seats}</td>
                <td className="tnum">{t.bags}</td>
                <td className="muted">{t.suitedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
