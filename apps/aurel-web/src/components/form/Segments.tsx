import type { ReactNode } from "react";
import "./form.css";

/**
 * A radio group drawn as square segments. Native radio inputs give arrow-key
 * movement and screen reader semantics for free.
 */
export function Segments<T extends string | number>({
  name,
  legend,
  legendHidden,
  value,
  options,
  onChange,
  className,
  variant = "box",
}: {
  name: string;
  legend: string;
  legendHidden?: boolean;
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
  className?: string;
  variant?: "box" | "line";
}) {
  return (
    <fieldset className={["segments", `segments--${variant}`, className ?? ""].filter(Boolean).join(" ")}>
      <legend className={legendHidden ? "visually-hidden" : "t-label segments__legend"}>{legend}</legend>
      <div className="segments__row" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          return (
            <div className="segments__item" key={String(o.value)}>
              <input
                className="segments__input"
                type="radio"
                id={id}
                name={name}
                value={String(o.value)}
                checked={value === o.value}
                onChange={() => onChange(o.value)}
              />
              <label className="segments__label" htmlFor={id}>
                {o.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
