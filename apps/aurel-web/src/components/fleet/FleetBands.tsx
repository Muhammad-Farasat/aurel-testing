import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { fitReason, tiers, type TierId } from "../../config/tiers";
import { Vehicle } from "../Vehicle";
import { Icon } from "../Icon";
import "./fleet-bands.css";

/**
 * The fleet as one expanded tier and three collapsed bands (P-022, RJ-002).
 * Each band carries its own ground, taken from the car (P-021). The open band
 * sets the car across a big index numeral (P-019). Native buttons with
 * aria-expanded; the arrows step to the next band.
 */
export function FleetBands({
  party,
  initial = "first",
  headingLevel = 3,
}: {
  party?: { passengers: number; bags: number };
  initial?: TierId;
  headingLevel?: 2 | 3;
}) {
  const [open, setOpen] = useState<TierId>(initial);
  const { update } = useDraft();
  const navigate = useNavigate();
  const uid = useId();
  const H = headingLevel === 2 ? "h2" : "h3";
  const index = tiers.findIndex((t) => t.id === open);

  const step = (d: number) => {
    const next = tiers[(index + d + tiers.length) % tiers.length]!;
    setOpen(next.id);
    requestAnimationFrame(() => document.getElementById(`${uid}-btn-${next.id}`)?.focus());
  };

  return (
    <ol className="bands">
      {tiers.map((t, i) => {
        const isOpen = t.id === open;
        const reason = party ? fitReason(t, party.passengers, party.bags) : null;
        const n = String(i + 1).padStart(2, "0");
        return (
          <li key={t.id} className={["band", `band--${t.id}`, isOpen ? "is-open" : "", reason ? "is-out" : ""].join(" ")}>
            <H className="band__head">
              <button
                type="button"
                id={`${uid}-btn-${t.id}`}
                className="band__btn"
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${t.id}`}
                onClick={() => setOpen(t.id)}
              >
                <span className="band__n tnum">{n}</span>
                <span className="band__name">{t.name}</span>
                <span className="band__cap t-small tnum">
                  {t.seats} seats, {t.bags} bags
                </span>
                <span className="band__plus" aria-hidden="true">
                  <Icon name={isOpen ? "minus" : "plus"} size={18} />
                </span>
              </button>
            </H>
            <div id={`${uid}-panel-${t.id}`} className="band__panel" role="region" aria-labelledby={`${uid}-btn-${t.id}`} hidden={!isOpen}>
              <div className="band__stage">
                <span className="band__numeral tnum" aria-hidden="true" key={t.id}>
                  {n}
                </span>
                <Vehicle tier={t.id} className="band__car" sizes="(min-width: 1100px) 62vw, 100vw" decorative />
              </div>
              <div className="band__info">
                <p className="band__similar t-small">{t.similar}. Placeholder image.</p>
                <p className="band__summary">{t.summary}</p>
                <ul className="band__pills" aria-label="Included">
                  {t.included.map((f) => (
                    <li key={f} className="pill">
                      <span className="pill__dot" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="t-small band__suited">Suited to: {t.suitedTo}</p>
                {reason ? (
                  <p className="t-small band__reason" role="status">
                    <Icon name="error" size={18} /> {reason}
                  </p>
                ) : null}
                <div className="band__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    disabled={Boolean(reason)}
                    onClick={() => {
                      update({ tier: t.id });
                      navigate("/book/journey", { state: { from: window.location.pathname } });
                    }}
                  >
                    <span className="btn__label">Book {t.name}</span>
                    <Icon name="arrow" size={20} className="btn__arrow" />
                  </button>
                  <span className="band__arrows">
                    <button type="button" className="band__arrow" onClick={() => step(-1)} aria-label="Previous car">
                      <Icon name="arrow-left" size={20} />
                    </button>
                    <button type="button" className="band__arrow" onClick={() => step(1)} aria-label="Next car">
                      <Icon name="arrow" size={20} />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
