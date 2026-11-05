import { Link } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { isArrival, resolveJourney, routeLabel, serviceLabels, whenLabel, type Draft } from "../../booking/model";
import { detailsComplete, journeyComplete } from "../../booking/validate";
import { formatDay, formatMoney } from "../../config/market";
import { getTier } from "../../config/tiers";
import { quoteFor } from "../../services/pricing";
import { Icon } from "../../components/Icon";
import { TierDrawing, tierLength, MAX_LENGTH } from "../../components/TierDrawing";

/** The running total once journey and tier are known. */
export function useRunningTotal(d: Draft): number | null {
  const tier = getTier(d.tier);
  if (!tier || !journeyComplete(d)) return null;
  return quoteFor(d, tier).total;
}

/** Completed steps folded into chips; each chip edits its step. */
export function SummaryChips() {
  const { draft } = useDraft();
  const j = resolveJourney(draft);
  const tier = getTier(draft.tier);
  const chips: { to: string; label: string; icon: "pin" | "clock" | "seat" | "edit" }[] = [];
  if (journeyComplete(draft)) {
    chips.push({ to: "/book/journey", label: routeLabel(j, draft), icon: "pin" });
    chips.push({ to: "/book/journey", label: whenLabel(j), icon: "clock" });
  }
  if (tier) {
    chips.push({
      to: "/book/vehicle",
      label: `${tier.name}, ${draft.passengers} ${draft.passengers === 1 ? "seat" : "seats"}, ${draft.bags} ${draft.bags === 1 ? "bag" : "bags"}`,
      icon: "seat",
    });
  }
  if (detailsComplete(draft)) chips.push({ to: "/book/details", label: draft.traveller.name, icon: "edit" });
  if (!chips.length) return null;
  return (
    <ul className="chips" aria-label="Completed steps">
      {chips.map((c) => (
        <li key={c.label + c.to}>
          <Link to={c.to} className="chip" aria-label={`Change: ${c.label}`}>
            <Icon name={c.icon} size={16} />
            <span className={c.icon === "clock" ? "tnum" : undefined}>{c.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Desktop sidebar: the journey rule with the running total. */
export function Summary() {
  const { draft } = useDraft();
  const j = resolveJourney(draft);
  const tier = getTier(draft.tier);
  const total = useRunningTotal(draft);
  const arrival = isArrival(draft);

  return (
    <div className="summary">
      <p className="t-label">
        {serviceLabels[draft.service]}
        {draft.service === "airport" ? (arrival ? ", arriving" : ", departing") : ""}
      </p>
      <ol className="jrule">
        <li className={j.pickup ? "jrule__stop is-now" : "jrule__stop is-empty"}>
          <span className="jrule__time tnum">
            {j.pickupTime || "Time to set"}
            {j.date ? <span className="muted">, {formatDay(j.date)}</span> : null}
          </span>
          <span className="jrule__place">{j.pickup?.label ?? "Pickup"}</span>
          {arrival && draft.flight ? (
            <span className="t-small muted tnum">
              {draft.flight.number} lands {draft.flight.scheduled}. Met {draft.meetAfter} min after.
            </span>
          ) : null}
        </li>
        {j.stops.map((s, i) => (
          <li key={`${s.id}${i}`} className="jrule__stop">
            <span className="t-small muted">Stop {i + 1}</span>
            <span className="jrule__place">{s.label}</span>
          </li>
        ))}
        {draft.service === "hourly" || draft.service === "fullday" ? (
          <li className={j.endTime ? "jrule__stop" : "jrule__stop is-empty"}>
            <span className="jrule__time tnum">{j.endTime ? `Until ${j.endTime}` : "End time"}</span>
            <span className="jrule__place">
              {j.dropoff?.label ?? `${j.durationHours} hours, ending where you started`}
            </span>
          </li>
        ) : (
          <li className={j.dropoff ? "jrule__stop" : "jrule__stop is-empty"}>
            <span className="t-small muted">Drop-off</span>
            <span className="jrule__place">{j.dropoff?.label ?? "Destination"}</span>
          </li>
        )}
      </ol>
      {tier ? (
        <div className="summary__tier">
          <span style={{ ["--len" as string]: tierLength(tier.id) / MAX_LENGTH }} className="summary__draw">
            <TierDrawing tier={tier.id} passengers={draft.passengers} bags={draft.bags} />
          </span>
          <span>
            <span className="jrule__place">{tier.name}</span>
            <br />
            <span className="t-small muted tnum">
              {draft.passengers} {draft.passengers === 1 ? "passenger" : "passengers"}, {draft.bags} {draft.bags === 1 ? "bag" : "bags"}
            </span>
          </span>
        </div>
      ) : null}
      <SummaryChips />
      <div className="summary__total" aria-live="polite">
        <span className="t-label">{total !== null ? "Fixed price" : "Price"}</span>
        {total !== null ? (
          <>
            <span className="summary__amount t-input-xl">{formatMoney(total)}</span>
            <span className="t-small muted">All-in, VAT included. This is the price you pay.</span>
          </>
        ) : (
          <span className="t-small muted">Shown when you choose a vehicle. Nothing is charged until you confirm.</span>
        )}
      </div>
    </div>
  );
}
