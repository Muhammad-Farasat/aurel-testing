import { useEffect, useRef, useState } from "react";
import { formatLongDay, market, parseIsoDate, toIsoDate } from "../../config/market";
import { useMediaQuery } from "../../hooks";
import { Icon } from "../Icon";
import { FieldError, describedBy } from "./Field";
import "./form.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 12);
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/**
 * Date field. Desktop and tablet: an accessible calendar grid. Phones: the
 * native date input, which is faster and more reliable there.
 */
export function DateField({
  id,
  label,
  value,
  onChange,
  error,
  size = "md",
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  size?: "md" | "xl";
  onBlur?: () => void;
}) {
  const isPhone = useMediaQuery("(max-width: 599px)");
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const minIso = toIsoDate(today);

  if (isPhone) {
    return (
      <div className={["field", `date--${size}`, error ? "has-error" : ""].join(" ")}>
        <label className="field__label t-label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type="date"
          className={["input", size === "xl" ? "input--xl t-input-xl" : "", "tnum"].join(" ")}
          min={minIso}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
        />
        <FieldError id={id} message={error} />
      </div>
    );
  }
  return <CalendarField id={id} label={label} value={value} onChange={onChange} error={error} size={size} today={today} onBlur={onBlur} />;
}

function CalendarField({
  id,
  label,
  value,
  onChange,
  error,
  size,
  today,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  size: "md" | "xl";
  today: Date;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = parseIsoDate(value);
  const [focus, setFocus] = useState<Date>(selected ?? today);
  const btnRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLTableElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const month = startOfMonth(focus);
  const gridStart = addDays(month, -((month.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  const monthLabel = new Intl.DateTimeFormat(market.locale, { month: "long", year: "numeric" }).format(month);
  const minIso = toIsoDate(today);

  useEffect(() => {
    if (!open) return;
    const cell = gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${toIsoDate(focus)}"]`);
    cell?.focus();
  }, [open, focus]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const close = (restore = true) => {
    setOpen(false);
    if (restore) btnRef.current?.focus();
    onBlur?.();
  };

  const pick = (d: Date) => {
    if (toIsoDate(d) < minIso) return;
    onChange(toIsoDate(d));
    close();
  };

  const move = (n: number) => {
    const next = addDays(focus, n);
    if (toIsoDate(next) < minIso) return;
    setFocus(next);
  };

  const shiftMonth = (n: number) => {
    const next = new Date(focus);
    next.setMonth(next.getMonth() + n);
    if (toIsoDate(next) < minIso) setFocus(new Date(today));
    else setFocus(next);
  };

  return (
    <div className={["field", "date", `date--${size}`, error ? "has-error" : ""].join(" ")} ref={wrapRef}>
      <span className="field__label t-label" id={`${id}-label`}>
        {label}
      </span>
      <button
        ref={btnRef}
        id={id}
        type="button"
        className={["input", "date__button", size === "xl" ? "input--xl t-input-xl" : ""].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}`}
        aria-describedby={describedBy(id, error)}
        aria-invalid={error ? true : undefined}
        onClick={() => {
          setFocus(selected ?? today);
          setOpen((o) => !o);
        }}
      >
        <span className={value ? "tnum" : "date__placeholder"}>{value ? formatLongDay(value) : "Choose a date"}</span>
        <Icon name="calendar" size={size === "xl" ? 28 : 20} />
      </button>
      {open ? (
        <div
          className="calendar"
          role="dialog"
          aria-modal="false"
          aria-label={`Choose ${label.toLowerCase()}`}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              close();
            }
          }}
        >
          <div className="calendar__head">
            <button type="button" className="calendar__nav" onClick={() => shiftMonth(-1)} aria-label="Previous month">
              <Icon name="arrow-left" size={20} />
            </button>
            <p className="calendar__month t-step" aria-live="polite">
              {monthLabel}
            </p>
            <button type="button" className="calendar__nav" onClick={() => shiftMonth(1)} aria-label="Next month">
              <Icon name="arrow" size={20} />
            </button>
          </div>
          <table className="calendar__grid" role="grid" ref={gridRef} aria-label={monthLabel}>
            <thead>
              <tr>
                {WEEKDAYS.map((w) => (
                  <th key={w} scope="col" className="t-label" abbr={w}>
                    {w.slice(0, 2)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((d) => {
                    const iso = toIsoDate(d);
                    const inMonth = d.getMonth() === month.getMonth();
                    const past = iso < minIso;
                    const isSel = iso === value;
                    const isFocus = iso === toIsoDate(focus);
                    return (
                      <td key={iso} role="gridcell" aria-selected={isSel}>
                        <button
                          type="button"
                          data-iso={iso}
                          tabIndex={isFocus ? 0 : -1}
                          className={[
                            "calendar__day",
                            "tnum",
                            inMonth ? "" : "is-outside",
                            isSel ? "is-selected" : "",
                            iso === minIso ? "is-today" : "",
                          ].join(" ")}
                          disabled={past}
                          aria-label={formatLongDay(iso)}
                          aria-current={iso === minIso ? "date" : undefined}
                          onClick={() => pick(d)}
                          onKeyDown={(e) => {
                            const k = e.key;
                            const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
                            if (k in map) {
                              e.preventDefault();
                              move(map[k]!);
                            } else if (k === "PageUp") {
                              e.preventDefault();
                              shiftMonth(-1);
                            } else if (k === "PageDown") {
                              e.preventDefault();
                              shiftMonth(1);
                            } else if (k === "Home") {
                              e.preventDefault();
                              move(-((focus.getDay() + 6) % 7));
                            } else if (k === "End") {
                              e.preventDefault();
                              move(6 - ((focus.getDay() + 6) % 7));
                            }
                          }}
                        >
                          {d.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="t-small muted calendar__hint">Arrow keys move by day, Page Up and Page Down by month.</p>
        </div>
      ) : null}
      <FieldError id={id} message={error} />
    </div>
  );
}

export function TimeField({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  helper?: string;
  onBlur?: () => void;
}) {
  return (
    <div className={["field", error ? "has-error" : ""].join(" ")}>
      <label className="field__label t-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="time"
        step={300}
        className="input tnum"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, helper)}
      />
      {helper ? (
        <p className="field__help t-small muted" id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
      <FieldError id={id} message={error} />
    </div>
  );
}
