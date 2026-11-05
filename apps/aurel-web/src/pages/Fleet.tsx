import { useEffect } from "react";
import { useDraft } from "../booking/DraftContext";
import { fitReason, tiers, MAX_BAGS, MAX_PARTY } from "../config/tiers";
import { formatMoney } from "../config/market";
import { Stepper } from "../components/form/Stepper";
import { FleetBands } from "../components/fleet/FleetBands";
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
  const fits = tiers.filter((t) => !fitReason(t, draft.passengers, draft.bags)).length;
  const firstFit = tiers.find((t) => !fitReason(t, draft.passengers, draft.bags));
  return (
    <div className="fleet">
      <section className="fleet__head" data-ground="light" aria-labelledby="fleet-title">
        <div className="wrap fleet__head-inner">
          <h1 id="fleet-title" className="t-poster fleet__title">
            Fleet
          </h1>
          <p className="fleet__lede">
            Four cars, chosen by what you're carrying. Set your party and the cars that can't take it are struck out.
          </p>
          <div className="fleet__counter" aria-label="Your party">
            <Stepper id="fleet-pax" label="Passengers" value={draft.passengers} min={1} max={MAX_PARTY} onChange={(n) => update({ passengers: n })} />
            <Stepper id="fleet-bags" label="Bags" value={draft.bags} min={0} max={MAX_BAGS} onChange={(n) => update({ bags: n })} />
            <p className="pill pill--ink fleet__fits tnum" aria-live="polite">
              {fits} of 4 cars fit
            </p>
          </div>
        </div>
      </section>

      <section className="fleet__bands" data-ground="light" aria-label="The four cars">
        <div className="wrap">
          <FleetBands party={{ passengers: draft.passengers, bags: draft.bags }} initial={firstFit?.id ?? "van"} headingLevel={2} key={firstFit?.id ?? "none"} />
        </div>
      </section>

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
