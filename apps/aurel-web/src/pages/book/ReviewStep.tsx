import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { isArrival, resolveJourney, serviceLabels } from "../../booking/model";
import { detailsComplete, fieldId, journeyComplete, type Errors } from "../../booking/validate";
import { formatLongDay, formatMoney } from "../../config/market";
import { getTier } from "../../config/tiers";
import { terms } from "../../config/copy";
import { quoteFor } from "../../services/pricing";
import { createBooking, PaymentDeclined } from "../../services/bookings";
import { useOnline } from "../../hooks";
import { TextField } from "../../components/form/Field";
import { Vehicle } from "../../components/Vehicle";
import { Icon } from "../../components/Icon";
import { ErrorSummary } from "../../components/booking/ErrorSummary";
import { StepBar, StepHead } from "../../components/booking/StepParts";
import { Breakdown } from "./VehicleStep";

interface Card {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

function validateCard(c: Card): Errors {
  const e: Errors = {};
  if (!c.cardName.trim()) e[fieldId("card-name")] = "Enter the name on the card.";
  if (c.cardNumber.replace(/\D/g, "").length < 12) e[fieldId("card-number")] = "Enter the card number.";
  if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(c.expiry.trim())) e[fieldId("card-expiry")] = "Enter the expiry as MM/YY.";
  if (!/^\d{3,4}$/.test(c.cvc.trim())) e[fieldId("card-cvc")] = "Enter the 3 or 4 digit security code.";
  return e;
}

export function ReviewStep() {
  const { draft, reset } = useDraft();
  const navigate = useNavigate();
  const online = useOnline();
  const [card, setCard] = useState<Card>({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState(false);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [declined, setDeclined] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const declinedRef = useRef<HTMLDivElement>(null);
  // Set once the booking exists, so clearing the draft doesn't trip the step guards.
  const booked = useRef(false);

  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(t);
  }, [busy]);

  if (booked.current) return null;
  if (!journeyComplete(draft)) return <Navigate to="/book/journey" replace />;
  const tier = getTier(draft.tier);
  if (!tier) return <Navigate to="/book/vehicle" replace />;
  if (!detailsComplete(draft)) return <Navigate to="/book/details" replace />;

  const quote = quoteFor(draft, tier);
  const j = resolveJourney(draft);
  const arrival = isArrival(draft);

  const setField = (k: keyof Card, v: string) => {
    const next = { ...card, [k]: v };
    setCard(next);
    if (Object.keys(errors).length) {
      const all = validateCard(next);
      setErrors((prev) => Object.fromEntries(Object.keys(prev).filter((x) => all[x]).map((x) => [x, all[x]!])));
    }
  };
  const blurField = (id: string) => {
    const msg = validateCard(card)[id];
    setErrors((prev) => {
      const { [id]: _old, ...rest } = prev;
      return msg ? { ...rest, [id]: msg } : rest;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy || !online) return;
    const all = validateCard(card);
    setErrors(all);
    if (Object.keys(all).length) {
      setSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSummary(false);
    setDeclined(false);
    setBusy(true);
    try {
      const booking = await createBooking(draft, { method: "card", ...card });
      booked.current = true;
      navigate(`/booking/${booking.ref}`, { replace: true, state: { justBooked: true } });
      reset();
    } catch (err) {
      setBusy(false);
      setSlow(false);
      if (err instanceof PaymentDeclined) {
        setDeclined(true);
        requestAnimationFrame(() => declinedRef.current?.focus());
      }
    }
  };

  const change = (step: string) => `/book/${step}?return=review`;

  return (
    <form className="step" onSubmit={onSubmit} noValidate>
      <StepHead n={4} title="Review and pay" />
      <ErrorSummary ref={summaryRef} errors={summary ? errors : {}} visible={summary} />

      <section className="step__section" aria-labelledby="itin-title">
        <h2 className="t-step" id="itin-title">
          Itinerary
        </h2>
        <p className="t-small muted">
          {serviceLabels[draft.service]}
          {draft.service === "airport" ? (arrival ? ", arriving" : ", departing") : ""}, {formatLongDay(j.date)}
        </p>
        <div className="itinerary">
          <ol className="jrule">
            <li className="jrule__stop is-now">
              <div className="itinerary__row">
                <span>
                  <span className="jrule__time tnum">{j.pickupTime}</span> <span className="jrule__place">{j.pickup?.label}</span>
                  {arrival && draft.flight ? (
                    <span className="t-small muted tnum" style={{ display: "block" }}>
                      Flight {draft.flight.number} lands {draft.flight.scheduled}. Met {draft.meetAfter} minutes after. The pickup follows the flight.
                    </span>
                  ) : null}
                </span>
                <Link className="change" to={change("journey")} aria-label="Change pickup">
                  Change
                </Link>
              </div>
            </li>
            {j.stops.map((s, i) => (
              <li className="jrule__stop" key={`${s.id}${i}`}>
                <div className="itinerary__row">
                  <span>
                    <span className="t-small muted">Stop {i + 1} </span>
                    <span className="jrule__place">{s.label}</span>
                  </span>
                  <Link className="change" to={change("journey")} aria-label={`Change stop ${i + 1}`}>
                    Change
                  </Link>
                </div>
              </li>
            ))}
            <li className="jrule__stop">
              <div className="itinerary__row">
                <span>
                  {j.endTime ? <span className="jrule__time tnum">Until {j.endTime} </span> : null}
                  <span className="jrule__place">{j.dropoff?.label ?? "Ending where you started"}</span>
                </span>
                <Link className="change" to={change("journey")} aria-label="Change drop-off">
                  Change
                </Link>
              </div>
            </li>
          </ol>
          <div>
            <Vehicle tier={tier.id} sizes="200px" decorative />
            <div className="itinerary__row" style={{ marginTop: 8 }}>
              <span>
                <span className="jrule__place">{tier.name}</span>
                <span className="t-small muted tnum" style={{ display: "block" }}>
                  {draft.passengers} {draft.passengers === 1 ? "passenger" : "passengers"}, {draft.bags} {draft.bags === 1 ? "bag" : "bags"}
                </span>
              </span>
              <Link className="change" to={change("vehicle")} aria-label="Change vehicle">
                Change
              </Link>
            </div>
          </div>
        </div>
        <div className="itinerary__row">
          <span className="t-small">
            <strong>{draft.traveller.name}</strong>, <span className="tnum">{draft.traveller.phone}</span>, {draft.traveller.email}
            {draft.who === "someone" ? <span className="muted"> (booked by {draft.booker.name})</span> : null}
          </span>
          <Link className="change" to={change("details")} aria-label="Change traveller details">
            Change
          </Link>
        </div>
      </section>

      <section className="step__section" aria-labelledby="price-title">
        <h2 className="t-step" id="price-title">
          Price
        </h2>
        <Breakdown quote={quote} />
        <div className="review-total">
          <span className="review-total__amount t-input-xl">{formatMoney(quote.total)}</span>
          <span>This is the price you pay.</span>
        </div>
      </section>

      <section className="step__section" aria-labelledby="terms-title">
        <h2 className="t-step" id="terms-title">
          Terms, in plain words
        </h2>
        <ul className="terms">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Link to="/legal/booking-conditions" className="t-small">
          Full booking conditions
        </Link>
      </section>

      <fieldset className="step__section">
        <legend className="t-step">Payment</legend>
        {declined ? (
          <div className="alert" ref={declinedRef} tabIndex={-1} role="alert">
            <Icon name="error" />
            <span>
              Your bank declined the payment. Nothing was charged and your booking details are kept. Try another card,
              or call your bank.
            </span>
          </div>
        ) : null}
        <p className="payment-note">
          Example payment form: no card is charged in this preview. A number ending 0002 shows a declined payment.
        </p>
        <div className="payment">
          <TextField id={fieldId("card-name")} label="Name on card" autoComplete="cc-name" value={card.cardName} onChange={(e) => setField("cardName", e.target.value)} onBlur={() => blurField(fieldId("card-name"))} error={errors[fieldId("card-name")]} />
          <TextField id={fieldId("card-number")} label="Card number" autoComplete="cc-number" inputMode="numeric" className="tnum" value={card.cardNumber} onChange={(e) => setField("cardNumber", e.target.value)} onBlur={() => blurField(fieldId("card-number"))} error={errors[fieldId("card-number")]} />
          <TextField id={fieldId("card-expiry")} label="Expiry (MM/YY)" autoComplete="cc-exp" inputMode="numeric" className="tnum" value={card.expiry} onChange={(e) => setField("expiry", e.target.value)} onBlur={() => blurField(fieldId("card-expiry"))} error={errors[fieldId("card-expiry")]} />
          <TextField id={fieldId("card-cvc")} label="Security code" autoComplete="cc-csc" inputMode="numeric" className="tnum" value={card.cvc} onChange={(e) => setField("cvc", e.target.value)} onBlur={() => blurField(fieldId("card-cvc"))} error={errors[fieldId("card-cvc")]} />
        </div>
        <p className="t-small muted">You can create an account after confirming. It's not needed to book.</p>
      </fieldset>

      {!online ? (
        <p className="panel__offline t-small" role="status">
          <Icon name="error" size={18} /> You're offline. Your booking is saved on this device.
        </p>
      ) : null}
      <StepBar label={busy ? "Confirming" : `Confirm and pay ${formatMoney(quote.total)}`} total={quote.total} busy={busy} disabled={!online} />
      {slow ? (
        <p className="slow-note t-small" role="status">
          Still confirming with your bank. Please keep this page open.
        </p>
      ) : null}
    </form>
  );
}
