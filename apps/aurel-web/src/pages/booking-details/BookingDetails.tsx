import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { isArrival, newDraft, resolveJourney, serviceLabels, type Draft } from "../../booking/model";
import { addMinutes, formatLongDay, formatMoney, market, minutesOf, parseIsoDate } from "../../config/market";
import { getTier } from "../../config/tiers";
import { serviceRules } from "../../config/serviceRules";
import { terms } from "../../config/copy";
import { cancelBooking, getBooking, sendFeedback, DEMO_REF, type Booking } from "../../services/bookings";
import { driveMinutes } from "../../services/pricing";
import { useMediaQuery } from "../../hooks";
import { Button, ButtonLink } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { NameBoard, BoardName } from "../../components/NameBoard";
import { TierDrawing } from "../../components/TierDrawing";
import { Breakdown } from "../book/VehicleStep";
import "./details.css";

export const states = ["reserved", "assigned", "onway", "arrived", "inprogress", "completed"] as const;
export type LiveState = (typeof states)[number];

const stateLabels: Record<LiveState, string> = {
  reserved: "Reserved",
  assigned: "Chauffeur assigned",
  onway: "On the way",
  arrived: "Arrived, waiting",
  inprogress: "In progress",
  completed: "Completed",
};

/** EXAMPLE DATA: the assigned chauffeur and car shown in preview states. */
const exampleAssignment = {
  chauffeur: "Daniel Mensah",
  vehicle: "black, or similar to the tier",
  plate: "AU24 REL",
};

function icsFor(b: Booking): string {
  const j = resolveJourney(b.draft);
  const d = parseIsoDate(j.date);
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = (date: Date, hhmm: string) => {
    const m = minutesOf(hhmm);
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
  };
  const start = d && j.pickupTime ? stamp(d, j.pickupTime) : "";
  const end = d && j.pickupTime ? stamp(d, j.endTime ?? addMinutes(j.pickupTime, 60)) : "";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AUREL//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.ref}@aurel.example`,
    `DTSTART;TZID=${market.timeZone}:${start}`,
    `DTEND;TZID=${market.timeZone}:${end}`,
    `SUMMARY:AUREL ${b.ref}: ${j.pickup?.short ?? ""}${j.dropoff ? ` to ${j.dropoff.short}` : ""}`,
    `LOCATION:${j.pickup?.label ?? ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function returnDraft(d: Draft): Draft {
  const base = { ...newDraft(d.service), passengers: d.passengers, bags: d.bags, tier: d.tier, traveller: d.traveller, updatedAt: Date.now() };
  if (d.service === "airport") {
    return d.direction === "arriving"
      ? { ...base, direction: "departing", fromId: d.toId, airportId: d.airportId }
      : { ...base, direction: "arriving", airportId: d.airportId, toId: d.fromId };
  }
  if (d.service === "transfer") return { ...base, fromId: d.toId, toId: d.fromId };
  return { ...base, fromId: d.fromId };
}

export function BookingDetails() {
  const { ref = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const justBooked = Boolean((location.state as { justBooked?: boolean } | null)?.justBooked);
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let live = true;
    setBooking(undefined);
    void getBooking(ref).then((b) => live && setBooking(b));
    return () => {
      live = false;
    };
  }, [ref]);

  useEffect(() => {
    if (booking) {
      document.title = `${booking.ref}. AUREL booking`;
      if (justBooked) titleRef.current?.focus();
    }
  }, [booking, justBooked]);

  if (booking === undefined) {
    return (
      <div className="bd wrap" aria-busy="true">
        <p className="t-label bd__loading">Finding your booking</p>
      </div>
    );
  }
  if (booking === null) {
    return (
      <div className="bd wrap">
        <h1 className="t-title">We couldn't find a booking with that reference.</h1>
        <p className="bd__lead muted">
          Check the reference in your confirmation email, or find it with your email address.
        </p>
        <div className="bd__inline-actions">
          <ButtonLink to="/manage" variant="secondary" arrow>
            Manage a booking
          </ButtonLink>
          <ButtonLink to={`/booking/${DEMO_REF}`} variant="text">
            See an example booking
          </ButtonLink>
        </div>
      </div>
    );
  }

  const requested = params.get("state") as LiveState | null;
  const live: LiveState = requested && states.includes(requested) ? requested : "reserved";
  const showPreview = import.meta.env.DEV || params.has("preview") || booking.ref === DEMO_REF;

  return (
    <Details
      booking={booking}
      live={live}
      titleRef={titleRef}
      justBooked={justBooked}
      onUpdate={setBooking}
      preview={
        showPreview ? (
          <PreviewControl
            value={live}
            onChange={(s) => {
              const next = new URLSearchParams(params);
              if (s === "reserved") next.delete("state");
              else next.set("state", s);
              next.set("preview", "1");
              setParams(next, { replace: true });
            }}
          />
        ) : null
      }
    />
  );
}

function PreviewControl({ value, onChange }: { value: LiveState; onChange: (s: LiveState) => void }) {
  return (
    <div className="bd-preview">
      <label className="t-label" htmlFor="state-preview">
        Preview a later state (example data)
      </label>
      <select id="state-preview" className="input" value={value} onChange={(e) => onChange(e.target.value as LiveState)}>
        {states.map((s) => (
          <option key={s} value={s}>
            {stateLabels[s]}
          </option>
        ))}
      </select>
    </div>
  );
}

function Details({
  booking,
  live,
  titleRef,
  justBooked,
  onUpdate,
  preview,
}: {
  booking: Booking;
  live: LiveState;
  titleRef: RefObject<HTMLHeadingElement>;
  justBooked: boolean;
  onUpdate: (b: Booking) => void;
  preview: ReactNode;
}) {
  const d = booking.draft;
  const j = resolveJourney(d);
  const tier = getTier(booking.tier)!;
  const arrival = isArrival(d);
  const cancelled = booking.status === "cancelled";
  const stateIndex = states.indexOf(live);
  const assigned = !cancelled && stateIndex >= 1;
  const completed = !cancelled && live === "completed";
  const isPhone = useMediaQuery("(max-width: 599px)");
  const { replace } = useDraft();
  const navigate = useNavigate();
  const [shareNote, setShareNote] = useState("");
  const cancelRef = useRef<HTMLDialogElement>(null);
  const [cancelling, setCancelling] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const pickupPlace = j.pickup;
  const drive = j.pickup && j.dropoff ? driveMinutes([j.pickup, j.dropoff]) : null;
  const assignBy = j.pickupTime ? addMinutes(j.pickupTime, -serviceRules.assignmentHoursBefore * 60) : "";

  // The journey rule: what happens next, as dated items.
  type Item = { key: string; time: string; title: string; note?: string; state?: LiveState; day?: string };
  const dayOf = (date: Date) => new Intl.DateTimeFormat(market.locale, { weekday: "short", day: "numeric", month: "short" }).format(date);
  const pickupDay = parseIsoDate(j.date);
  const dayBefore = pickupDay ? new Date(pickupDay.getTime() - 86400000) : null;
  const items: Item[] = [
    { key: "reserved", day: dayOf(new Date(booking.createdAt)), time: new Date(booking.createdAt).toTimeString().slice(0, 5), title: "Reserved", note: `Reference ${booking.ref}. Confirmation sent to ${d.traveller.email}.`, state: "reserved" },
    {
      key: "assigned",
      day: dayBefore ? dayOf(dayBefore) : undefined,
      time: assignBy,
      title: assigned ? `Chauffeur assigned: ${exampleAssignment.chauffeur}` : `Chauffeur and car confirmed by ${assignBy}, the evening before`,
      note: assigned ? `${tier.similar.replace(" or similar", "")}, ${exampleAssignment.vehicle}. Plate ${exampleAssignment.plate}.` : undefined,
      state: "assigned",
    },
  ];
  if (arrival && d.flight) {
    items.push({ key: "flight", time: "", title: `Flight ${d.flight.number} tracked from departure`, note: `${d.flight.origin}, due ${d.flight.scheduled}. The pickup moves if the landing time does.` });
  }
  items.push(
    { key: "onway", day: pickupDay ? dayOf(pickupDay) : undefined, time: j.pickupTime ? addMinutes(j.pickupTime, -40) : "", title: "On the way", note: "Your chauffeur has left for the pickup.", state: "onway" },
    {
      key: "arrived",
      time: j.pickupTime,
      title: arrival ? `At arrivals, ${pickupPlace?.short}` : `At ${pickupPlace?.label}`,
      note: arrival ? "Holding the name board in the arrivals hall." : `Waiting outside. ${serviceRules.standardWaitingIncluded} minutes of waiting included.`,
      state: "arrived",
    },
    { key: "inprogress", time: "", title: "In progress", note: j.dropoff ? `To ${j.dropoff.label}${drive ? `, about ${drive} minutes` : ""}.` : `${j.durationHours} hours booked.`, state: "inprogress" },
    {
      key: "completed",
      time: j.endTime ?? (j.pickupTime && drive ? addMinutes(j.pickupTime, drive) : ""),
      title: j.dropoff ? `At ${j.dropoff.label}` : "Booking ends",
      state: "completed",
    },
  );
  if (cancelled) {
    items.push({ key: "cancelled", day: dayOf(new Date(booking.cancelledAt!)), time: new Date(booking.cancelledAt!).toTimeString().slice(0, 5), title: "Cancelled", note: "No charge within the free cancellation window." });
  }

  const nowIndex = cancelled ? items.length - 1 : items.findIndex((i) => i.state === live);

  const share = async () => {
    const url = `${window.location.origin}/booking/${booking.ref}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `AUREL ${booking.ref}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote("Link copied. Send it to the traveller.");
    } catch {
      setShareNote(url);
    }
  };

  const doCancel = async () => {
    setCancelling(true);
    const next = await cancelBooking(booking);
    setCancelling(false);
    cancelRef.current?.close();
    onUpdate(next);
  };

  const change = () => {
    replace(d);
    navigate("/book/journey", { state: { from: `/booking/${booking.ref}` } });
  };

  const bookReturn = () => {
    replace(returnDraft(d));
    navigate("/book/journey", { state: { from: `/booking/${booking.ref}` } });
  };

  const receipt = () =>
    download(
      `AUREL-${booking.ref}-receipt.txt`,
      [
        `AUREL receipt (example)`,
        `Reference: ${booking.ref}`,
        `${formatLongDay(j.date)}, ${j.pickupTime}`,
        `${j.pickup?.label ?? ""}${j.dropoff ? ` to ${j.dropoff.label}` : ""}`,
        `${tier.name}`,
        ...booking.quote.lines.map((l) => `${l.label}: ${l.amount ? formatMoney(l.amount) : "Included"}`),
        `Total: ${formatMoney(booking.quote.total)} (VAT included ${formatMoney(booking.quote.vat, true)})`,
        d.companyRef ? `Reference or PO: ${d.companyRef}` : "",
      ].join("\n"),
      "text/plain",
    );

  const statusLabel = cancelled ? "Cancelled" : stateLabels[live];
  const actions = (
    <>
      <Button variant="secondary" onClick={() => download(`AUREL-${booking.ref}.ics`, icsFor(booking), "text/calendar")}>
        <span className="seg-icon">
          <Icon name="calendar" size={20} /> Add to calendar
        </span>
      </Button>
      <Button variant="secondary" onClick={() => void share()}>
        <span className="seg-icon">
          <Icon name="share" size={20} /> Share itinerary
        </span>
      </Button>
      <Button variant="secondary" onClick={change}>
        <span className="seg-icon">
          <Icon name="edit" size={20} /> Change
        </span>
      </Button>
      <Button variant="text" onClick={() => cancelRef.current?.showModal()}>
        Cancel booking
      </Button>
    </>
  );

  return (
    <div className="bd">
      <header className="bd__head wrap">
        <p className={cancelled ? "bd__status is-cancelled" : stateIndex >= 1 ? "bd__status is-good" : "bd__status"} aria-live="polite">
          <span className="bd__status-mark" aria-hidden="true" />
          <span key={statusLabel} className="bd__status-text">
            {statusLabel}
          </span>
        </p>
        <h1 className="bd__ref" tabIndex={-1} ref={titleRef}>
          <span className="t-label muted">{justBooked ? "Booked. Your reference" : "Booking"}</span>
          <span className="t-input-xl tnum">{booking.ref}</span>
        </h1>
        <p className="bd__date">
          {serviceLabels[d.service]}
          {d.service === "airport" ? (arrival ? ", arriving" : ", departing") : ""}. {formatLongDay(j.date)}, <span className="tnum">{j.pickupTime}</span>
        </p>
        {preview}
      </header>

      {isPhone ? (
        <div className="wrap bd__hrule" aria-hidden="true">
          <div className="bd__hrule-track">
            {states.map((s, i) => (
              <span key={s} className={i < stateIndex ? "is-past" : i === stateIndex ? "is-now" : ""} />
            ))}
          </div>
          <p className="t-step">{statusLabel}</p>
        </div>
      ) : null}

      <div className="wrap grid bd__grid">
        <section className="bd__rule" aria-labelledby="rule-title">
          <h2 className="t-label" id="rule-title">
            What happens next
          </h2>
          <ol className="srule" style={{ ["--now" as string]: nowIndex }}>
            {items.map((it, i) => (
              <li
                key={it.key}
                className={["srule__item", i < nowIndex ? "is-past" : "", i === nowIndex ? "is-now" : "", it.key === "cancelled" ? "is-cancelled" : ""].join(" ")}
                aria-current={i === nowIndex ? "step" : undefined}
              >
                <span className="srule__time tnum">
                  {it.day && it.day !== items.slice(0, i).reverse().find((x) => x.day)?.day ? <span className="srule__day t-label">{it.day}</span> : null}
                  {it.time || " "}
                </span>
                <span className="srule__body">
                  <span className="srule__title">{it.title}</span>
                  {it.note ? <span className="t-small muted">{it.note}</span> : null}
                  {i === nowIndex && live === "arrived" && !cancelled ? <WaitingClock minutes={arrival ? serviceRules.airportWaitingIncluded : serviceRules.standardWaitingIncluded} /> : null}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="bd__side">
          <section className="bd__card" aria-labelledby="car-title">
            <h2 className="t-label" id="car-title">
              Chauffeur and car
            </h2>
            <div className="bd__car">
              <TierDrawing tier={tier.id} passengers={d.passengers} bags={d.bags} />
            </div>
            {assigned ? (
              <>
                <p className="t-step">{exampleAssignment.chauffeur}</p>
                <p className="t-small">
                  {tier.name}: {tier.similar.replace(" or similar", "")}, {exampleAssignment.vehicle}
                </p>
                <p className="t-small tnum">
                  Plate <strong>{exampleAssignment.plate}</strong> <span className="muted">(example)</span>
                </p>
                <a className="btn btn--secondary btn--block" href={market.phoneHref}>
                  <span className="btn__label">Contact your chauffeur through AUREL</span>
                </a>
              </>
            ) : (
              <>
                <p className="t-step">{tier.name}</p>
                <p className="t-small muted">
                  Your chauffeur's name, the car and its plate arrive by text by <span className="tnum">{assignBy}</span> the evening before.
                </p>
              </>
            )}
          </section>

          {arrival ? (
            <section className="bd__card" aria-labelledby="board-title">
              <h2 className="t-label" id="board-title">
                The board your chauffeur will hold
              </h2>
              <NameBoard>
                <BoardName name={d.boardName || d.traveller.name} />
              </NameBoard>
            </section>
          ) : null}

          {completed ? (
            <Completed booking={booking} onUpdate={onUpdate} onReceipt={receipt} onReturn={bookReturn} />
          ) : !cancelled ? (
            isPhone ? (
              <div className="bd__bar">
                <Button variant="ink" onClick={change}>
                  Change
                </Button>
                <div className="bd__more">
                  <Button variant="secondary" aria-expanded={moreOpen} aria-controls="bd-more" onClick={() => setMoreOpen((o) => !o)}>
                    More <Icon name="chevron" size={18} />
                  </Button>
                  {moreOpen ? (
                    <div className="bd__menu" id="bd-more">
                      {actions}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <section className="bd__card bd__actions" aria-label="Actions">
                {actions}
              </section>
            )
          ) : (
            <section className="bd__card">
              <p>This booking is cancelled. Nothing was charged.</p>
              <ButtonLink to="/book/journey" variant="secondary" arrow>
                Book a new journey
              </ButtonLink>
            </section>
          )}
          {shareNote ? (
            <p className="t-small" role="status">
              {shareNote}
            </p>
          ) : null}

          <section className="bd__card" aria-labelledby="price-title-bd">
            <h2 className="t-label" id="price-title-bd">
              Fixed price
            </h2>
            <Breakdown quote={booking.quote} />
          </section>
        </aside>
      </div>

      <dialog ref={cancelRef} className="confirm" aria-labelledby="cancel-title">
        <h2 id="cancel-title" className="t-step">
          Cancel {booking.ref}?
        </h2>
        <ul className="terms">
          {terms.slice(0, 1).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          Your pickup is {formatLongDay(j.date)} at <span className="tnum">{j.pickupTime}</span>. Cancelling now is free.
        </p>
        <div className="confirm__actions">
          <Button variant="secondary" onClick={() => cancelRef.current?.close()}>
            Keep booking
          </Button>
          <Button variant="ink" onClick={() => void doCancel()} disabled={cancelling}>
            {cancelling ? "Cancelling" : "Cancel booking"}
          </Button>
        </div>
      </dialog>
    </div>
  );
}

function WaitingClock({ minutes }: { minutes: number }) {
  const [left, setLeft] = useState(minutes * 60 - 47);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <span className="srule__wait">
      <span className="t-label">Waiting time left</span>
      <span className="t-input-xl tnum" role="timer" aria-label={`${Math.ceil(left / 60)} minutes of waiting left`}>
        {mm}:{ss}
      </span>
      <span className="t-small muted">of {minutes} minutes included</span>
    </span>
  );
}

function Completed({
  booking,
  onUpdate,
  onReceipt,
  onReturn,
}: {
  booking: Booking;
  onUpdate: (b: Booking) => void;
  onReceipt: () => void;
  onReturn: () => void;
}) {
  const [score, setScore] = useState<number | null>(booking.feedback?.score ?? null);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const scale = ["Poor", "Fair", "Good", "Very good", "Excellent"];
  const sent = Boolean(booking.feedback);
  return (
    <>
      <section className="bd__card bd__actions" aria-label="After your journey">
        <Button variant="secondary" onClick={onReceipt}>
          <span className="seg-icon">
            <Icon name="download" size={20} /> Download receipt
          </span>
        </Button>
        <Button variant="primary" arrow onClick={onReturn}>
          Book the return
        </Button>
      </section>
      <section className="bd__card" aria-labelledby="fb-title">
        <h2 className="t-label" id="fb-title">
          How was the journey?
        </h2>
        {sent ? (
          <p role="status">Thank you. We read every note.</p>
        ) : (
          <form
            className="feedback"
            onSubmit={async (e) => {
              e.preventDefault();
              if (score === null) return;
              setSending(true);
              onUpdate(await sendFeedback(booking, score, note));
              setSending(false);
            }}
          >
            <fieldset className="feedback__scale">
              <legend className="visually-hidden">Rate the journey from 1 to 5</legend>
              {scale.map((s, i) => (
                <label key={s} className={score === i + 1 ? "is-on" : undefined}>
                  <input type="radio" name="score" value={i + 1} checked={score === i + 1} onChange={() => setScore(i + 1)} />
                  <span className="tnum">{i + 1}</span>
                  <span className="t-small">{s}</span>
                </label>
              ))}
            </fieldset>
            <label className="t-label" htmlFor="fb-note">
              Anything to add? (optional)
            </label>
            <textarea id="fb-note" className="input input--area" value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} />
            <Button type="submit" variant="secondary" disabled={score === null || sending}>
              {sending ? "Sending" : "Send"}
            </Button>
          </form>
        )}
      </section>
    </>
  );
}
