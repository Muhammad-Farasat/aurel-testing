import { useEffect, useRef, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { formatMoney } from "../../config/market";
import { Button } from "../Button";

/** Step title: a heading that receives focus on step change. */
export function StepHead({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: false });
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className="step__head">
      <p className="t-label muted">Step {n} of 4</p>
      <h1 className="step__title t-step" tabIndex={-1} ref={ref}>
        {title}
      </h1>
      {children}
    </div>
  );
}

/** The step's primary action, with the running total on tablet and phone. */
export function StepBar({
  label,
  total,
  hint,
  disabled,
  busy,
  onClick,
  type = "submit",
  form,
  shortLabel,
}: {
  label: string;
  total?: number | null;
  hint?: string;
  disabled?: boolean;
  busy?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
  form?: string;
  /** Label for phones, where the bar is narrow. */
  shortLabel?: string;
}) {
  return (
    <div className="stepbar">
      <div className="stepbar__total" aria-hidden="true">
        {total != null ? (
          <>
            <span className="stepbar__amount tnum">{formatMoney(total)}</span>
            <span className="t-small stepbar__hint">Fixed price</span>
          </>
        ) : (
          <span className="t-small stepbar__hint">{hint ?? "Price on the next step"}</span>
        )}
      </div>
      <Button
        type={type}
        form={form}
        variant="primary"
        arrow={!busy}
        disabled={disabled}
        aria-disabled={busy || undefined}
        onClick={onClick}
      >
        {shortLabel ? (
          <>
            <span className="stepbar__long">{label}</span>
            <span className="stepbar__short">{shortLabel}</span>
          </>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}

/** "?return=review" sends a corrected step straight back to Review. */
export function useReturnTo(): "review" | null {
  const [params] = useSearchParams();
  return params.get("return") === "review" ? "review" : null;
}
