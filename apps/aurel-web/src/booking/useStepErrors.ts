import { useCallback, useEffect, useRef, useState } from "react";
import type { Draft } from "./model";
import type { Errors } from "./validate";

/**
 * Errors appear when a field is left and on submit, never on each keystroke.
 * Errors already shown update as the draft changes, so they clear once fixed.
 */
export function useStepErrors(draft: Draft, validate: (d: Draft) => Errors) {
  const [shown, setShown] = useState<Errors>({});
  const [summary, setSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  useEffect(() => {
    setShown((prev) => {
      const keys = Object.keys(prev);
      if (!keys.length) return prev;
      const all = validate(draft);
      const next: Errors = {};
      for (const k of keys) if (all[k]) next[k] = all[k]!;
      return next;
    });
  }, [draft, validate]);

  useEffect(() => {
    if (summary && Object.keys(shown).length === 0) setSummary(false);
  }, [shown, summary]);

  /** Validate one field after it is left. Reads the latest draft. */
  const blur = useCallback(
    (id: string) => {
      // Defer so a value chosen on the same tick is in the draft first.
      setTimeout(() => {
        const msg = validate(draftRef.current)[id];
        setShown((prev) => {
          if (msg) return { ...prev, [id]: msg };
          if (!(id in prev)) return prev;
          const { [id]: _drop, ...rest } = prev;
          return rest;
        });
      }, 0);
    },
    [validate],
  );

  const clear = useCallback((id: string) => {
    setShown((prev) => {
      if (!(id in prev)) return prev;
      const { [id]: _drop, ...rest } = prev;
      return rest;
    });
  }, []);

  /** Validate everything; returns true when the step can continue. */
  const submit = useCallback((): boolean => {
    const all = validate(draftRef.current);
    setShown(all);
    const ok = Object.keys(all).length === 0;
    setSummary(!ok);
    if (!ok) requestAnimationFrame(() => summaryRef.current?.focus());
    return ok;
  }, [validate]);

  return { errors: shown, summary, summaryRef, blur, clear, submit, setShown };
}
