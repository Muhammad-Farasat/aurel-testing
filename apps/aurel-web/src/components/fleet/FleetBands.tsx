import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { fitReason, tiers, type TierId } from "../../config/tiers";
import { CabinPlan } from "../Vehicle";
import { Icon } from "../Icon";
import "./fleet-bands.css";

/**
 * The fleet as one open tier and three closed rows (P-022, RJ-002), beside
 * one large cabin plan of the open tier. The party fills the seats and the
 * boot, so "does it fit" is seen, not read. Rows are native buttons with
 * aria-expanded.
 */
export function FleetBands({
  party,
  initial,
  headingLevel = 3,
}: {
  party?: { passengers: number; bags: number };
  initial?: TierId;
  headingLevel?: 2 | 3;
}) {
  const firstFit = party ? tiers.find((t) => !fitReason(t, party.passengers, party.bags)) : undefined;
  const [open, setOpen] = useState<TierId>(initial ?? firstFit?.id ?? "business");
  const { update } = useDraft();
  const navigate = useNavigate();
  const uid = useId();
  const H = headingLevel === 2 ? "h2" : "h3";
  const tier = tiers.find((t) => t.id === open)!;
  const pax = party ? Math.min(party.passengers, tier.seats) : 0;
  const bags = party ? Math.min(party.bags, tier.bags) : 0;

  return (
    <div className="fleetc">
      <figure className="fleetc__stage" aria-live="polite">
        <CabinPlan tier={tier.id} passengers={pax} bags={bags} key={tier.id} className="fleetc__plan" />
        <figcaption className="fleetc__cap t-small tnum">
          <span>{tier.name}</span>
          <span className="muted">
            {party ? `${pax} of ${tier.seats} seats, ${bags} of ${tier.bags} bag spaces` : `${tier.seats} seats, ${tier.bags} bags`}
          </span>
        </figcaption>
      </figure>
      <ol className="fleetc__list">
        {tiers.map((t, i) => {
          const isOpen = t.id === open;
          const reason = party ? fitReason(t, party.passengers, party.bags) : null;
          return (
            <li key={t.id} className={["fleetc__row", isOpen ? "is-open" : "", reason ? "is-out" : ""].join(" ")}>
              <H className="fleetc__head">
                <button
                  type="button"
                  id={`${uid}-btn-${t.id}`}
                  className="fleetc__btn"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-panel-${t.id}`}
                  onClick={() => setOpen(t.id)}
                >
                  <span className="fleetc__n tnum" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="fleetc__name">{t.name}</span>
                  <span className="fleetc__fit t-small tnum">
                    {reason ? "Too small for your party" : `${t.seats} seats, ${t.bags} bags`}
                  </span>
                </button>
              </H>
              <div
                id={`${uid}-panel-${t.id}`}
                className="fleetc__panel"
                role="region"
                aria-labelledby={`${uid}-btn-${t.id}`}
                hidden={!isOpen}
              >
                <p className="fleetc__summary">{t.summary}</p>
                <p className="t-small muted">
                  {t.similar}. Suited to: {t.suitedTo}
                </p>
                <ul className="fleetc__incl t-small" aria-label="Included">
                  {t.included.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {reason ? (
                  <p className="t-small fleetc__reason" role="status">
                    <Icon name="error" size={18} /> {reason}
                  </p>
                ) : null}
                <button
                  type="button"
                  className="btn btn--secondary fleetc__book"
                  disabled={Boolean(reason)}
                  onClick={() => {
                    update({ tier: t.id });
                    navigate("/book/journey", { state: { from: window.location.pathname } });
                  }}
                >
                  <span className="btn__label">Book {t.name}</span>
                  <Icon name="arrow" size={20} className="btn__arrow" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
