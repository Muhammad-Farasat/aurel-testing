import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useDraft } from "../../booking/DraftContext";
import { serviceLabels, serviceQuestions, resolveJourney, type ComboKey, type Draft, type Service } from "../../booking/model";
import { fieldId, validateJourney } from "../../booking/validate";
import { useStepErrors } from "../../booking/useStepErrors";
import { addMinutes, minutesOf } from "../../config/market";
import { serviceRules } from "../../config/serviceRules";
import { placeById, type Place } from "../../data/places";
import { lookupFlight } from "../../services/flights";
import { driveMinutes } from "../../services/pricing";
import { useOnline } from "../../hooks";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Segments } from "../form/Segments";
import { PlaceField } from "../form/PlaceField";
import { DateField, TimeField } from "../form/DateField";
import { Stepper } from "../form/Stepper";
import { Field, TextArea, describedBy } from "../form/Field";
import { ErrorSummary } from "./ErrorSummary";
import { StepBar } from "./StepParts";
import "./booking.css";

const services: Service[] = ["transfer", "airport", "hourly", "fullday"];

/** The first field for each service: the one set large at the top of the panel. */
export function firstFieldKey(d: Draft): string {
  if (d.service === "airport") return "airport";
  if (d.service === "fullday") return "date";
  return "from";
}

function firstFieldDone(d: Draft): boolean {
  if (d.service === "airport") return Boolean(d.airportId);
  if (d.service === "fullday") return Boolean(d.date);
  return Boolean(d.fromId);
}

/**
 * Step 1 of BookingPanel. `entry` is the home and service-page version: the
 * question in display type, the first field set large, and the rest of the
 * step growing in place once the first field is answered (REF-004).
 * `step` is /book/journey: every field shown.
 */
export function JourneyFields({
  variant,
  onDone,
  doneLabel = "See vehicles",
  heading,
  headingId,
  lockService,
  headingLevel = 1,
}: {
  headingLevel?: 1 | 2;
  variant: "entry" | "step";
  onDone: () => void;
  doneLabel?: string;
  heading?: ReactNode;
  headingId?: string;
  lockService?: boolean;
}) {
  const { draft, update, setService } = useDraft();
  const { errors, summary, summaryRef, blur, clear, submit } = useStepErrors(draft, validateJourney);
  const online = useOnline();
  const [grown, setGrown] = useState(() => variant === "step" || firstFieldDone(draft));
  const growRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (growRef.current) growRef.current.inert = !grown;
  }, [grown]);

  useEffect(() => {
    if (firstFieldDone(draft)) setGrown(true);
  }, [draft]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!online) return;
    if (!grown) setGrown(true);
    if (submit()) onDone();
  };

  const placeProps = (key: ComboKey, idField: "fromId" | "toId" | "airportId") => ({
    id: fieldId(key),
    valueId: draft[idField],
    text: draft.typed[key],
    onText: (t: string) => update((d) => ({ [idField]: null, typed: { ...d.typed, [key]: t } }) as Partial<Draft>),
    onSelect: (p: Place) => {
      update((d) => ({ [idField]: p.id, typed: { ...d.typed, [key]: p.label } }) as Partial<Draft>);
      clear(fieldId(key));
    },
    onBlur: () => blur(fieldId(key)),
    error: errors[fieldId(key)],
  });

  const firstField = (() => {
    if (draft.service === "airport") {
      return (
        <PlaceField
          {...placeProps("airport", "airportId")}
          label="Airport and terminal"
          kind="airport"
          size="xl"
          placeholder="Heathrow, Gatwick or London City"
        />
      );
    }
    if (draft.service === "fullday") {
      return (
        <DateField
          id={fieldId("date")}
          label="Date"
          size="xl"
          value={draft.date}
          onChange={(v) => {
            update({ date: v });
            clear(fieldId("date"));
          }}
          onBlur={() => blur(fieldId("date"))}
          error={errors[fieldId("date")]}
        />
      );
    }
    return (
      <PlaceField
        {...placeProps("from", "fromId")}
        label={draft.service === "hourly" ? "Start address" : "Pickup address"}
        size="xl"
        placeholder="Hotel, address or airport"
      />
    );
  })();

  const HeadingTag = variant === "entry" && headingLevel === 1 ? "h1" : "h2";
  const question = serviceQuestions[draft.service];

  return (
    <form className={`panel panel--${variant}`} onSubmit={onSubmit} noValidate data-booking-panel>
      {!online ? (
        <p className="panel__offline t-small" role="status">
          <Icon name="error" size={18} /> You're offline. Your booking is saved on this device.
        </p>
      ) : null}

      {!lockService ? (
        <Segments
          name={`service-${variant}`}
          legend="Service"
          legendHidden={variant === "entry"}
          variant={variant === "entry" ? "line" : "box"}
          value={draft.service}
          options={services.map((s) => ({ value: s, label: serviceLabels[s] }))}
          onChange={(s) => setService(s)}
          className="panel__services"
        />
      ) : null}

      {variant === "entry" ? (
        <div className="panel__question-row">
          <HeadingTag className="panel__question t-display" id={headingId} aria-live="polite">
            {heading ?? question}
          </HeadingTag>
        </div>
      ) : (
        <p className="panel__step-question t-step muted">{question}</p>
      )}

      <ErrorSummary ref={summaryRef} errors={errors} visible={summary} />

      {draft.service === "airport" ? (
        <Segments
          name={`direction-${variant}`}
          legend="Direction"
          legendHidden
          value={draft.direction}
          options={[
            { value: "arriving", label: <span className="seg-icon"><Icon name="plane-arrive" size={20} /> Arriving</span> },
            { value: "departing", label: <span className="seg-icon"><Icon name="plane-depart" size={20} /> Catching a flight</span> },
          ]}
          onChange={(v) => update({ direction: v })}
          className="panel__direction"
        />
      ) : null}

      <div className="panel__first">{firstField}</div>

      <div className={grown ? "panel__grow is-open" : "panel__grow"} ref={growRef}>
        <div className="panel__grow-inner">
          <div className="panel__fields">
            <RestFields draft={draft} placeProps={placeProps} errors={errors} blur={blur} clear={clear} />
          </div>
          {variant === "step" ? (
            <StepBar label={doneLabel} disabled={!online} hint="Price on the next step" />
          ) : (
            <div className="panel__actions">
              <Button type="submit" variant="primary" arrow disabled={!online}>
                {doneLabel}
              </Button>
              <p className="t-small muted panel__price-note">Fixed price on the next step. Nothing is charged until you confirm.</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

type PlacePropsFn = (key: ComboKey, idField: "fromId" | "toId" | "airportId") => {
  id: string;
  valueId: string | null;
  text: string | undefined;
  onText: (t: string) => void;
  onSelect: (p: Place) => void;
  onBlur: () => void;
  error?: string;
};

function RestFields({
  draft,
  placeProps,
  errors,
  blur,
  clear,
}: {
  draft: Draft;
  placeProps: PlacePropsFn;
  errors: Record<string, string>;
  blur: (id: string) => void;
  clear: (id: string) => void;
}) {
  const { update } = useDraft();
  const dateField = (label: string) => (
    <DateField
      id={fieldId("date")}
      label={label}
      value={draft.date}
      onChange={(v) => {
        update({ date: v });
        clear(fieldId("date"));
      }}
      onBlur={() => blur(fieldId("date"))}
      error={errors[fieldId("date")]}
    />
  );
  const timeField = (label: string, helper?: string) => (
    <TimeField
      id={fieldId("time")}
      label={label}
      value={draft.time}
      helper={helper}
      onChange={(v) => update({ time: v, timeTouched: true })}
      onBlur={() => blur(fieldId("time"))}
      error={errors[fieldId("time")]}
    />
  );

  switch (draft.service) {
    case "transfer":
      return (
        <>
          <PlaceField {...placeProps("to", "toId")} label="Destination" />
          <Stops draft={draft} errors={errors} blur={blur} clear={clear} />
          <div className="panel__pair">
            {dateField("Date")}
            {timeField("Pickup time")}
          </div>
        </>
      );
    case "airport":
      return draft.direction === "arriving" ? (
        <Arriving draft={draft} placeProps={placeProps} errors={errors} blur={blur} dateField={dateField("Date of arrival")} />
      ) : (
        <Departing draft={draft} placeProps={placeProps} errors={errors} blur={blur} dateField={dateField("Date of flight")} />
      );
    case "hourly":
      return (
        <>
          <div className="panel__pair">
            {dateField("Date")}
            {timeField("Start time")}
          </div>
          <Stepper
            id={fieldId("hours")}
            label="Hours"
            value={draft.hours}
            min={serviceRules.hourlyMinHours}
            max={serviceRules.hourlyMaxHours}
            onChange={(n) => update({ hours: n })}
            unit={(n) => (draft.time ? `until ${addMinutes(draft.time, n * 60)}` : `hours`)}
            helper={`Minimum ${serviceRules.hourlyMinHours} hours. Extend on the day if your chauffeur is free.`}
          />
          <label className="check check--toggle">
            <input
              type="checkbox"
              checked={draft.endElsewhere}
              onChange={(e) => update({ endElsewhere: e.target.checked })}
            />
            <span>End somewhere else</span>
            <span className="t-small muted">Otherwise we finish where we started.</span>
          </label>
          {draft.endElsewhere ? <PlaceField {...placeProps("to", "toId")} label="End address" /> : null}
        </>
      );
    case "fullday":
      return (
        <>
          <PlaceField {...placeProps("from", "fromId")} label="Start address" />
          {timeField("Start time")}
          <Segments
            name="daylength"
            legend="Length of day"
            value={draft.dayLength}
            options={serviceRules.fullDayLengths.map((h) => ({
              value: h,
              label: <span className="tnum">{h} hours{draft.time ? `, until ${addMinutes(draft.time, h * 60)}` : ""}</span>,
            }))}
            onChange={(v) => update({ dayLength: v })}
          />
          <TextArea
            id={fieldId("plan")}
            label="Rough plan (optional)"
            helper="Where you need to be and when. Your chauffeur and our team see this."
            value={draft.plan}
            maxLength={600}
            onChange={(e) => update({ plan: e.target.value })}
          />
        </>
      );
  }
}

function Stops({
  draft,
  errors,
  blur,
  clear,
}: {
  draft: Draft;
  errors: Record<string, string>;
  blur: (id: string) => void;
  clear: (id: string) => void;
}) {
  const { update } = useDraft();
  const addRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="stops">
      {draft.stops.map((id, i) => {
        const key = `stop-${i}` as ComboKey;
        return (
          <PlaceField
            key={i}
            id={fieldId(key)}
            label={`Stop ${i + 1}`}
            valueId={id}
            text={draft.typed[key]}
            onText={(t) =>
              update((d) => ({ stops: d.stops.map((s, j) => (j === i ? null : s)), typed: { ...d.typed, [key]: t } }))
            }
            onSelect={(p) => {
              update((d) => ({ stops: d.stops.map((s, j) => (j === i ? p.id : s)), typed: { ...d.typed, [key]: p.label } }));
              clear(fieldId(key));
            }}
            onBlur={() => blur(fieldId(key))}
            error={errors[fieldId(key)]}
            autoFocus={id === null && !draft.typed[key]}
            trailing={
              <button
                type="button"
                className="stops__remove"
                aria-label={`Remove stop ${i + 1}`}
                onClick={() => {
                  update((d) => {
                    const typed = { ...d.typed };
                    // Shift typed text for the stops after the removed one.
                    for (let j = i; j < d.stops.length; j++) typed[`stop-${j}`] = d.typed[`stop-${j + 1}`];
                    return { stops: d.stops.filter((_, j) => j !== i), typed };
                  });
                  clear(fieldId(key));
                  addRef.current?.focus();
                }}
              >
                <Icon name="close" size={20} />
              </button>
            }
          />
        );
      })}
      {draft.stops.length < 3 ? (
        <Button ref={addRef} variant="text" onClick={() => update((d) => ({ stops: [...d.stops, null] }))}>
          <span className="seg-icon">
            <Icon name="plus" size={18} /> Add a stop
          </span>
        </Button>
      ) : null}
    </div>
  );
}

function Arriving({
  draft,
  placeProps,
  errors,
  blur,
  dateField,
}: {
  draft: Draft;
  placeProps: PlacePropsFn;
  errors: Record<string, string>;
  blur: (id: string) => void;
  dateField: ReactNode;
}) {
  const { update } = useDraft();
  const [looking, setLooking] = useState(false);
  const [terminalNote, setTerminalNote] = useState("");
  const lastLooked = useRef("");
  const fid = fieldId("flight");

  const find = async () => {
    const n = draft.flightNumber.trim();
    if (!n || n === lastLooked.current) return;
    lastLooked.current = n;
    setLooking(true);
    const r = await lookupFlight(n);
    setLooking(false);
    if (r.found) {
      const moved = draft.airportId !== r.flight.arrivalPlaceId;
      update({ flight: r.flight, flightState: "found", airportId: r.flight.arrivalPlaceId, typed: { ...draft.typed, airport: undefined } });
      setTerminalNote(moved ? `Terminal set from your flight: ${placeById(r.flight.arrivalPlaceId)?.label}.` : "");
    } else {
      update({ flight: null, flightState: "not-found" });
      setTerminalNote("");
    }
    blur(fid);
  };

  const j = resolveJourney(draft);
  const f = draft.flight;

  return (
    <>
      <div className="flight">
        <Field id={fid} label="Flight number" error={errors[fid]} helper={looking ? "Looking up your flight" : undefined}>
          <div className="flight__row">
            <input
              id={fid}
              className="input tnum flight__input"
              value={draft.flightNumber}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="BA117"
              aria-invalid={errors[fid] ? true : undefined}
              aria-describedby={describedBy(fid, errors[fid], looking ? "x" : undefined)}
              onChange={(e) => {
                lastLooked.current = "";
                update({ flightNumber: e.target.value.toUpperCase(), flight: null, flightState: "idle" });
              }}
              onBlur={() => {
                if (draft.flightNumber.trim()) void find();
                else blur(fid);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void find();
                }
              }}
            />
            <Button variant="secondary" onClick={() => void find()} disabled={looking} aria-describedby={fid}>
              {looking ? "Finding" : "Find flight"}
            </Button>
          </div>
        </Field>
        <div aria-live="polite" className="flight__result">
          {draft.flightState === "found" && f ? (
            <div className="flight__card">
              <p className="t-label muted">
                {f.airline} {f.number}
              </p>
              <p className="flight__route">
                {f.origin} <Icon name="arrow" size={18} /> {placeById(f.arrivalPlaceId)?.short}
              </p>
              <p className="tnum">
                Scheduled to land <strong>{f.scheduled}</strong>
                {f.status === "landed-early" ? <span className="flight__status"> Tracking: due {f.estimated}, early</span> : null}
                {f.status === "delayed" ? <span className="flight__status"> Tracking: due {f.estimated}, late</span> : null}
              </p>
              {terminalNote ? <p className="t-small muted">{terminalNote}</p> : null}
            </div>
          ) : null}
          {draft.flightState === "not-found" ? (
            <div className="flight__missing">
              <p className="t-small field__error">
                <Icon name="error" size={18} />
                <span>We couldn't find that flight. Check the number, or continue and enter the landing time yourself.</span>
              </p>
              <TimeField
                id={fieldId("landing")}
                label="Scheduled landing time"
                value={draft.landingManual}
                onChange={(v) => update({ landingManual: v })}
                onBlur={() => blur(fieldId("landing"))}
                error={errors[fieldId("landing")]}
              />
            </div>
          ) : null}
        </div>
      </div>

      <Segments
        name="meetafter"
        legend="Meet me after landing"
        value={draft.meetAfter}
        options={serviceRules.meetAfterLandingOptions.map((m) => ({ value: m, label: <span className="tnum">{m} min</span> }))}
        onChange={(v) => update({ meetAfter: v })}
      />
      <p className="panel__derived t-small" aria-live="polite">
        <Icon name="clock" size={18} />
        {j.pickupTime ? (
          <span>
            Your chauffeur meets you at <strong className="tnum">{j.pickupTime}</strong>. If the flight lands early or late,
            the pickup moves with it. {serviceRules.airportWaitingIncluded} minutes of waiting included.
          </span>
        ) : (
          <span>Pickup time is set from your flight, so you don't have to guess it.</span>
        )}
      </p>
      <PlaceField {...placeProps("to", "toId")} label="Destination" />
      {dateField}
    </>
  );
}

function Departing({
  draft,
  placeProps,
  errors,
  blur,
  dateField,
}: {
  draft: Draft;
  placeProps: PlacePropsFn;
  errors: Record<string, string>;
  blur: (id: string) => void;
  dateField: ReactNode;
}) {
  const { update } = useDraft();
  const from = placeById(draft.fromId);
  const airport = placeById(draft.airportId);
  const drive = from && airport ? driveMinutes([from, airport]) : null;
  const suggestion =
    /^\d{2}:\d{2}$/.test(draft.flightTime) && drive !== null
      ? addMinutes(draft.flightTime, -(serviceRules.departureCheckInBuffer + drive))
      : "";

  // Suggest a pickup time until the traveller sets one.
  useEffect(() => {
    if (suggestion && !draft.timeTouched && draft.time !== suggestion) update({ time: suggestion });
  }, [suggestion, draft.timeTouched, draft.time, update]);

  return (
    <>
      <PlaceField {...placeProps("from", "fromId")} label="Pickup address" />
      <div className="panel__pair">
        {dateField}
        <TimeField
          id={fieldId("flighttime")}
          label="Flight departs"
          value={draft.flightTime}
          onChange={(v) => update({ flightTime: v })}
          onBlur={() => blur(fieldId("flighttime"))}
          error={errors[fieldId("flighttime")]}
        />
      </div>
      <TimeField
        id={fieldId("time")}
        label="Pickup time"
        value={draft.time}
        onChange={(v) => update({ time: v, timeTouched: true })}
        onBlur={() => blur(fieldId("time"))}
        error={errors[fieldId("time")]}
        helper={
          suggestion
            ? `We suggest ${suggestion}: ${serviceRules.departureCheckInBuffer / 60} hours before your flight plus about ${drive} minutes' drive. Change it if you like.`
            : "Enter your flight time and we'll suggest when to leave."
        }
      />
      {draft.timeTouched && suggestion && minutesOf(draft.time) > minutesOf(suggestion) ? (
        <p className="t-small muted panel__derived">
          <Icon name="clock" size={18} /> This is later than we suggest. Allow time for traffic and security.
        </p>
      ) : null}
    </>
  );
}
