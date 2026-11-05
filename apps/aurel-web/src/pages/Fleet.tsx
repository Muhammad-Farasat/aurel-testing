import { useEffect } from "react";
import { useDraft } from "../booking/DraftContext";
import { fitReason, tiers, MAX_BAGS, MAX_PARTY } from "../config/tiers";
import { formatMoney } from "../config/market";
import { Stepper } from "../components/form/Stepper";
import { TierDrawing, tierLength, MAX_LENGTH } from "../components/TierDrawing";
import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import "./pages.css";

/** All the features any tier lists, for the comparison table. */
const features = Array.from(new Set(tiers.flatMap((t) => t.included)));

export function Fleet() {
  const { draft, update } = useDraft();
  useEffect(() => {
    document.title = "Fleet. AUREL";
  }, []);
  return (
    <div className="fleet">
      <section className="fleet__head" data-ground="light" aria-labelledby="fleet-title">
        <div className="wrap grid">
          <div className="fleet__title-wrap">
            <p className="t-label muted">Fleet</p>
            <h1 id="fleet-title" className="t-title">
              Four cars, chosen by what you're carrying.
            </h1>
          </div>
          <div className="fleet__counter" aria-label="Your party">
            <Stepper id="fleet-pax" label="Passengers" value={draft.passengers} min={1} max={MAX_PARTY} onChange={(n) => update({ passengers: n })} />
            <Stepper id="fleet-bags" label="Bags" value={draft.bags} min={0} max={MAX_BAGS} onChange={(n) => update({ bags: n })} />
            <p className="t-small muted" aria-live="polite">
              {tiers.filter((t) => !fitReason(t, draft.passengers, draft.bags)).length} of 4 cars fit your party.
            </p>
          </div>
        </div>
      </section>

      {tiers.map((t, i) => {
        const reason = fitReason(t, draft.passengers, draft.bags);
        return (
          <section
            key={t.id}
            className={["fleet__tier", i % 2 ? "is-flipped" : "", reason ? "is-out" : ""].join(" ")}
            data-ground="light"
            aria-labelledby={`tier-h-${t.id}`}
          >
            <div className="wrap grid fleet__tier-grid">
              <div className="fleet__drawing" style={{ ["--len" as string]: tierLength(t.id) / MAX_LENGTH }}>
                <TierDrawing tier={t.id} passengers={reason ? 0 : draft.passengers} bags={reason ? 0 : draft.bags} />
                <span className="fleet__ground" aria-hidden="true" />
                <span className="t-label muted fleet__scale tnum">Drawn to scale, {(tierLength(t.id) / 100).toFixed(2)} m</span>
              </div>
              <div className="fleet__info">
                <p className="t-label muted tnum">0{i + 1}</p>
                <h2 id={`tier-h-${t.id}`} className="fleet__name">
                  {t.name}
                </h2>
                <p className="muted">{t.similar}</p>
                <dl className="fleet__spec tnum">
                  <div>
                    <dt className="t-label">Seats</dt>
                    <dd>{t.seats}</dd>
                  </div>
                  <div>
                    <dt className="t-label">Bags</dt>
                    <dd>{t.bags}</dd>
                  </div>
                </dl>
                <p>{t.summary}</p>
                <p className="t-small muted">Suited to: {t.suitedTo}</p>
                {reason ? (
                  <p className="t-small fleet__reason" role="status">
                    {reason}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <section className="fleet__compare" data-ground="light" aria-labelledby="compare-title">
        <div className="wrap">
          <h2 id="compare-title" className="t-step">
            Compare at once
          </h2>
          <div className="compare" tabIndex={0} role="region" aria-labelledby="compare-title">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Feature</span>
                  </th>
                  {tiers.map((t) => (
                    <th scope="col" key={t.id}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Seats</th>
                  {tiers.map((t) => (
                    <td key={t.id} className="tnum">
                      {t.seats}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Bags</th>
                  {tiers.map((t) => (
                    <td key={t.id} className="tnum">
                      {t.bags}
                    </td>
                  ))}
                </tr>
                {features.map((f) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    {tiers.map((t) => (
                      <td key={t.id}>
                        {t.included.includes(f) ? (
                          <Icon name="check" size={20} title="Included" />
                        ) : (
                          <span className="muted" aria-label="Not included">
                            –
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Hourly, from (example)</th>
                  {tiers.map((t) => (
                    <td key={t.id} className="tnum">
                      {formatMoney(t.rate.perHour)} an hour
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="t-small muted fleet__note">
            Vehicles vary by city. The model you get is the one named or one of the same class. Prices are examples.
          </p>
          <ButtonLink to="/book/journey" variant="secondary" arrow>
            Book a journey
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
