import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import "./form.css";

/** − value + with 48×48 buttons; the number is readable and typeable. */
export function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
  unit,
  helper,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  unit?: (n: number) => string;
  helper?: string;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = (raw: string) => {
    const n = Number.parseInt(raw, 10);
    if (Number.isNaN(n)) {
      setText(String(value));
      return;
    }
    const c = Math.min(max, Math.max(min, n));
    setText(String(c));
    if (c !== value) onChange(c);
  };
  return (
    <div className="stepper">
      <label className="t-label stepper__label" htmlFor={id}>
        {label}
      </label>
      <div className="stepper__row">
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          aria-controls={id}
        >
          <Icon name="minus" size={20} />
        </button>
        <input
          id={id}
          className="stepper__value tnum"
          inputMode="numeric"
          pattern="[0-9]*"
          value={text}
          onChange={(e) => setText(e.target.value.replace(/\D/g, ""))}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
            if (e.key === "ArrowUp") {
              e.preventDefault();
              onChange(Math.min(max, value + 1));
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              onChange(Math.max(min, value - 1));
            }
          }}
          aria-describedby={helper ? `${id}-help` : undefined}
        />
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          aria-controls={id}
        >
          <Icon name="plus" size={20} />
        </button>
        {unit ? (
          <span className="stepper__unit" aria-hidden="true">
            {unit(value)}
          </span>
        ) : null}
      </div>
      {helper ? (
        <p className="t-small muted stepper__help" id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
    </div>
  );
}
