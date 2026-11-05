import { forwardRef } from "react";
import { Icon } from "../Icon";
import type { Errors } from "../../booking/validate";

/** Shown on submit; receives focus and links to each field with an error. */
export const ErrorSummary = forwardRef<HTMLDivElement, { errors: Errors; visible: boolean }>(function ErrorSummary(
  { errors, visible },
  ref,
) {
  const entries = Object.entries(errors);
  if (!visible || entries.length === 0) return null;
  return (
    <div className="error-summary" ref={ref} tabIndex={-1} role="alert" aria-labelledby="error-summary-title">
      <p className="error-summary__title" id="error-summary-title">
        <Icon name="error" size={20} />
        <span>
          {entries.length === 1 ? "One thing to check before you continue" : `${entries.length} things to check before you continue`}
        </span>
      </p>
      <ul>
        {entries.map(([id, msg]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                el?.focus();
                el?.scrollIntoView({ block: "center" });
              }}
            >
              {msg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
