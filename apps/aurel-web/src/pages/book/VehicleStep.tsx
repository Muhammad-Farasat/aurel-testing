import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { journeyComplete } from "../../booking/validate";
import { fitReason, tiers, MAX_BAGS, MAX_PARTY, type TierId } from "../../config/tiers";
import { formatMoney } from "../../config/market";
import { quoteAll, type Quote } from "../../services/pricing";
import { Stepper } from "../../components/form/Stepper";
import { Vehicle } from "../../components/Vehicle";
import { Icon } from "../../components/Icon";
import { ErrorSummary } from "../../components/booking/ErrorSummary";
import { StepBar, StepHead, useReturnTo } from "../../components/booking/StepParts";
import { useRunningTotal } from "./Summary";

export function VehicleStep() {
  const { draft, update } = useDraft();
  const navigate = useNavigate();
  const ret = useReturnTo();
  const [quotes, setQuotes] = useState<Record<TierId, Quote> | null>(null);
  const [error, setError] = useState(false);
  const [openBreakdown, setOpenBreakdown] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = useRunningTotal(draft);

  // Re-quote when anything that changes the price changes.
  const priceKey = JSON.stringify([draft.service, draft.direction, draft.fromId, draft.toId, draft.airportId, draft.stops, draft.time, draft.hours, draft.dayLength, draft.endElsewhere, draft.flight?.scheduled, draft.landingManual, draft.meetAfter, draft.addOns]);
  useEffect(() => {
    let live = true;
    setQuotes(null);
    void quoteAll(draft).then((q) => live && setQuotes(q));
    return () => {
      live = false;
    };
  }, [priceKey]);

  // A tier that no longer fits the party is deselected.
  useEffect(() => {
    const t = tiers.find((x) => x.id === draft.tier);
    if (t && fitReason(t, draft.passengers, draft.bags)) update({ tier: null });
  }, [draft.passengers, draft.bags, draft.tier, update]);

  if (!journeyComplete(draft)) return <Navigate to="/book/journey" replace />;

  const selected = tiers.find((t) => t.id === draft.tier);
  const selectable = (id: TierId) => {
    const t = tiers.find((x) => x.id === id)!;
    return !fitReason(t, draft.passengers, draft.bags) && (quotes ? quotes[id].available : true);
  };

  const choose = (id: TierId) => {
    if (!selectable(id)) return;
    update({ tier: id });
    setError(false);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in moves) {
      e.preventDefault();
      const next = (i + moves[e.key]! + tiers.length) % tiers.length;
      rowRefs.current[next]?.focus();
    } else if (e.key === " " || e.key === "Enter") {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      choose(tiers[i]!.id);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    navigate(ret ? "/book/review" : "/book/details");
  };

  const focusIndex = Math.max(0, tiers.findIndex((t) => t.id === draft.tier));

  return (
    <form className="step" onSubmit={onSubmit} noValidate>
      <StepHead n={2} title="Vehicle" />
      <ErrorSummary ref={summaryRef} visible={error} errors={{ "tier-0": "Choose a vehicle." }} />

      <section className="step__section" aria-labelledby="party-title">
        <h2 className="t-step" id="party-title">
          Who's travelling, and what are you bringing?
        </h2>
        <div className="party">
          <Stepper id="passengers" label="Passengers" value={draft.passengers} min={1} max={MAX_PARTY} onChange={(n) => update({ passengers: n })} />
          <Stepper id="bags" label="Bags" value={draft.bags} min={0} max={MAX_BAGS} onChange={(n) => update({ bags: n })} helper="Large suitcases. Hand luggage fits anyway." />
        </div>
      </section>

      <section className="step__section" aria-labelledby="tiers-title">
        <h2 className="t-step" id="tiers-title">
          Choose a vehicle
        </h2>
        <p className="visually-hidden" aria-live="polite">
          {quotes ? "Prices ready." : "Calculating prices."}
        </p>
        <div className="tiers" role="radiogroup" aria-labelledby="tiers-title">
          {tiers.map((t, i) => {
            const reason = fitReason(t, draft.passengers, draft.bags);
            const q = quotes?.[t.id];
            const unavailable = q && !q.available ? q.unavailableReason : undefined;
            const blocked = Boolean(reason || unavailable);
            const isSel = draft.tier === t.id;
            return (
              <div
                key={t.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                id={`tier-${i}`}
                className={`tier tier--${t.id}`}
                role="radio"
                aria-checked={isSel}
                aria-disabled={blocked || undefined}
                aria-describedby={`tier-${t.id}-desc`}
                tabIndex={i === focusIndex ? 0 : -1}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".tier__more")) return;
                  choose(t.id);
                }}
                onKeyDown={(e) => onKey(e, i)}
              >
                <div className="tier__draw" aria-hidden="true">
                  <Vehicle tier={t.id} sizes="(min-width: 600px) 240px, 80vw" decorative />
                </div>
                <div className="tier__info" id={`tier-${t.id}-desc`}>
                  <span className="tier__name">{t.name}</span>
                  <span className="t-small muted">{t.similar}</span>
                  <span className="tier__caps t-small tnum">
                    <span className="tier__cap">
                      <Icon name="seat" size={16} /> Seats {t.seats}
                    </span>
                    <span className="tier__cap">
                      <Icon name="bag" size={16} /> Bags {t.bags}
                    </span>
                  </span>
                  <span className="t-small">{t.summary}</span>
                  {reason ? <span className="tier__reason t-small">{reason}</span> : null}
                  {!reason && unavailable ? (
                    <>
                      <span className="tier__reason t-small">{unavailable}</span>
                      <span className="t-small tier__suggest">{q?.suggestion}</span>
                    </>
                  ) : null}
                </div>
                <div className="tier__price">
                  <span className="tier__amount">
                    {q ? formatMoney(q.total) : <span className="shimmer" aria-hidden="true" />}
                  </span>
                  <span className="t-small muted">{q ? "Fixed price" : "Calculating"}</span>
                </div>
                {isSel && q ? (
                  <div className="tier__more">
                    <p className="t-label">What's included</p>
                    <ul className="tier__included t-small">
                      {t.included.map((x) => (
                        <li key={x}>
                          <Icon name="check" size={16} /> {x}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <button
                        type="button"
                        className="disclosure t-small"
                        aria-expanded={openBreakdown}
                        aria-controls={`breakdown-${t.id}`}
                        onClick={() => setOpenBreakdown((o) => !o)}
                      >
                        See breakdown <Icon name="chevron" size={16} />
                      </button>
                      {openBreakdown ? <Breakdown id={`breakdown-${t.id}`} quote={q} /> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="t-small muted">Cars are shown as types. The exact model can vary by city.</p>
      </section>

      <StepBar
        label={ret ? "Back to review" : selected ? `Continue with ${selected.name}` : "Continue"}
        total={total}
        hint="Choose a vehicle"
        shortLabel={ret ? "Back to review" : "Continue"}
      />
    </form>
  );
}

export function Breakdown({ id, quote }: { id?: string; quote: Quote }) {
  return (
    <div className="breakdown" id={id}>
      {quote.lines.map((l) => (
        <div className="breakdown__row" key={l.label}>
          <span>{l.label}</span>
          <span>{l.amount === 0 ? "Included" : formatMoney(l.amount)}</span>
        </div>
      ))}
      <div className="breakdown__row">
        <span className="muted">Includes VAT</span>
        <span className="muted">{formatMoney(quote.vat, true)}</span>
      </div>
      <div className="breakdown__row breakdown__row--total">
        <span>Total</span>
        <span>{formatMoney(quote.total)}</span>
      </div>
    </div>
  );
}
