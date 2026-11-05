import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { isArrival, type Person } from "../../booking/model";
import { fieldId, journeyComplete, validateDetails } from "../../booking/validate";
import { useStepErrors } from "../../booking/useStepErrors";
import { addOns, serviceRules } from "../../config/serviceRules";
import { formatMoney } from "../../config/market";
import { Segments } from "../../components/form/Segments";
import { TextArea, TextField } from "../../components/form/Field";
import { NameBoard, BoardName } from "../../components/NameBoard";
import { ErrorSummary } from "../../components/booking/ErrorSummary";
import { StepBar, StepHead, useReturnTo } from "../../components/booking/StepParts";
import { useRunningTotal } from "./Summary";

export function DetailsStep() {
  const { draft, update } = useDraft();
  const navigate = useNavigate();
  const ret = useReturnTo();
  const { errors, summary, summaryRef, blur, submit } = useStepErrors(draft, validateDetails);
  const total = useRunningTotal(draft);

  if (!journeyComplete(draft)) return <Navigate to="/book/journey" replace />;
  if (!draft.tier) return <Navigate to="/book/vehicle" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submit()) navigate("/book/review");
  };

  const person = (prefix: "traveller" | "booker", p: Person, title: string) => {
    const set = (patch: Partial<Person>) => update((d) => ({ [prefix]: { ...d[prefix], ...patch } }));
    const id = (k: string) => fieldId(`${prefix}-${k}`);
    return (
      <fieldset className="step__section person-set">
        <legend className="t-step">{title}</legend>
        <div className="person">
          <TextField
            id={id("name")}
            label="Full name"
            autoComplete={prefix === "traveller" && draft.who === "me" ? "name" : "off"}
            value={p.name}
            onChange={(e) => set({ name: e.target.value })}
            onBlur={() => blur(id("name"))}
            error={errors[id("name")]}
          />
          <TextField
            id={id("phone")}
            label="Mobile"
            type="tel"
            inputMode="tel"
            autoComplete={prefix === "traveller" && draft.who === "me" ? "tel" : "off"}
            value={p.phone}
            onChange={(e) => set({ phone: e.target.value })}
            onBlur={() => blur(id("phone"))}
            error={errors[id("phone")]}
            helper={prefix === "traveller" ? "Your chauffeur's details arrive by text." : undefined}
          />
          <TextField
            id={id("email")}
            label="Email"
            type="email"
            inputMode="email"
            autoComplete={prefix === "traveller" && draft.who === "me" ? "email" : "off"}
            value={p.email}
            onChange={(e) => set({ email: e.target.value })}
            onBlur={() => blur(id("email"))}
            error={errors[id("email")]}
          />
        </div>
      </fieldset>
    );
  };

  const arrival = isArrival(draft);
  const boardText = draft.boardName || draft.traveller.name;

  return (
    <form className="step" onSubmit={onSubmit} noValidate>
      <StepHead n={3} title="Details" />
      <ErrorSummary ref={summaryRef} errors={errors} visible={summary} />

      <Segments
        name="who"
        legend="Who is travelling?"
        value={draft.who}
        options={[
          { value: "me", label: "Me" },
          { value: "someone", label: "Someone else" },
        ]}
        onChange={(v) => update({ who: v })}
        className="who"
      />

      {person("traveller", draft.traveller, draft.who === "me" ? "Your details" : "The traveller")}
      {draft.who === "someone" ? person("booker", draft.booker, "Your details, for the confirmation copy") : null}

      {arrival ? (
        <section className="step__section" aria-labelledby="board-title">
          <h2 className="t-step" id="board-title">
            The name board
          </h2>
          <div className="board-preview">
            <div>
              <p className="t-small muted" style={{ marginBottom: 8 }}>
                This is the board your chauffeur will hold at arrivals.
              </p>
              <NameBoard>
                <BoardName name={boardText} placeholder="TRAVELLER NAME" />
              </NameBoard>
            </div>
            <TextField
              id={fieldId("board")}
              label="Name on the board"
              value={draft.boardName}
              placeholder={draft.traveller.name || "As the traveller's name"}
              onChange={(e) => update({ boardName: e.target.value })}
              helper="Use a company name or initials for privacy. Meet-and-greet is included with airport arrivals."
              maxLength={28}
            />
          </div>
        </section>
      ) : null}

      <fieldset className="step__section">
        <legend className="t-step">Add-ons</legend>
        <div className="checks">
          {addOns.map((a) => (
            <label key={a.id} className="check">
              <input
                type="checkbox"
                checked={draft.addOns.includes(a.id)}
                onChange={(e) =>
                  update((d) => ({ addOns: e.target.checked ? [...d.addOns, a.id] : d.addOns.filter((x) => x !== a.id) }))
                }
              />
              <span>{a.label}</span>
              <span className="check__price">+{formatMoney(a.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <section className="step__section" aria-label="Notes and references">
        <TextArea
          id={fieldId("note")}
          label="Note for the chauffeur (optional)"
          value={draft.note}
          maxLength={serviceRules.noteMaxLength}
          onChange={(e) => update({ note: e.target.value })}
          error={errors[fieldId("note")]}
          helper={
            <span className="tnum" aria-live="polite">
              {draft.note.length} of {serviceRules.noteMaxLength} characters
            </span>
          }
        />
        <TextField
          id={fieldId("company")}
          label="Company reference or PO (optional)"
          value={draft.companyRef}
          onChange={(e) => update({ companyRef: e.target.value })}
          helper="Shown on the receipt, for expenses."
        />
      </section>

      <StepBar label={ret ? "Back to review" : "Review booking"} total={total} />
    </form>
  );
}
