import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { placeById, type Place, type PlaceKind } from "../../data/places";
import { kindLabel, searchPlaces } from "../../services/places";
import { useMediaQuery } from "../../hooks";
import { Icon } from "../Icon";
import { FieldError, describedBy } from "./Field";
import "./form.css";

/**
 * Place autocomplete, following the ARIA combobox pattern: results labelled
 * Airport, Hotel or Address; first result highlighted; Enter chooses; Esc
 * closes. On phones the field opens as a full-screen search sheet.
 */
export function PlaceField({
  id,
  label,
  kind,
  valueId,
  text,
  onText,
  onSelect,
  onBlur,
  error,
  size = "md",
  helper,
  autoFocus,
  trailing,
  placeholder,
}: {
  id: string;
  label: string;
  kind?: PlaceKind;
  valueId: string | null;
  text: string | undefined;
  onText: (t: string) => void;
  onSelect: (p: Place) => void;
  onBlur?: () => void;
  error?: string;
  size?: "md" | "xl";
  helper?: ReactNode;
  autoFocus?: boolean;
  trailing?: ReactNode;
  placeholder?: string;
}) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Place[]>([]);
  const [active, setActive] = useState(0);
  const reqId = useRef(0);
  const isPhone = useMediaQuery("(max-width: 599px)");
  const sheet = isPhone && open;

  const chosen = placeById(valueId);
  const shown = text ?? (chosen ? chosen.label : "");

  useEffect(() => {
    if (!open) return;
    const q = shown.trim();
    if (!q || (chosen && q === chosen.label)) {
      setResults([]);
      setLoading(false);
      return;
    }
    const n = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      const r = await searchPlaces(q, kind);
      if (n !== reqId.current) return;
      setResults(r);
      setActive(0);
      setLoading(false);
    }, 120);
    return () => clearTimeout(t);
  }, [shown, open, kind, chosen]);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheet]);

  const choose = (p: Place) => {
    onSelect(p);
    setOpen(false);
    setResults([]);
  };

  const showList = open && (loading || results.length > 0 || (shown.trim() !== "" && !(chosen && shown === chosen.label)));
  const activeId = showList && results[active] ? `${listId}-opt-${active}` : undefined;

  return (
    <div className={["field", "place", `place--${size}`, error ? "has-error" : "", sheet ? "is-sheet" : ""].filter(Boolean).join(" ")}>
      <div className="place__head">
        <label className="field__label t-label" htmlFor={id}>
          {label}
        </label>
        {sheet ? (
          <button type="button" className="place__close" onClick={() => setOpen(false)} aria-label="Close search">
            <Icon name="close" />
          </button>
        ) : null}
      </div>
      <div className="place__control">
        <input
          ref={inputRef}
          id={id}
          className={["input", size === "xl" ? "input--xl t-input-xl" : ""].join(" ")}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, helper)}
          autoComplete="off"
          spellCheck={false}
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={shown}
          onChange={(e) => {
            onText(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (shown && !chosen) setOpen(true);
            if (isPhone) setOpen(true);
          }}
          onBlur={() => {
            if (isPhone) return;
            setOpen(false);
            onBlur?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(results.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === "Enter") {
              if (showList && results[active]) {
                e.preventDefault();
                choose(results[active]!);
              }
            } else if (e.key === "Escape") {
              if (open) {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
              }
            }
          }}
        />
        {trailing}
        <ul className="place__list" id={listId} role="listbox" aria-label={`${label} suggestions`} hidden={!showList}>
          {loading ? (
            <li className="place__status t-small muted" role="presentation" aria-live="polite">
              Searching
            </li>
          ) : results.length === 0 ? (
            <li className="place__status t-small muted" role="presentation" aria-live="polite">
              No matches. Try a street, postcode, hotel or airport.
            </li>
          ) : (
            results.map((p, i) => (
              <li
                key={p.id}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? "place__opt is-active" : "place__opt"}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(p)}
              >
                <span className="place__kind t-label">{kindLabel[p.kind]}</span>
                <span className="place__text">
                  <span className="place__name">{p.label}</span>
                  <span className="place__detail t-small muted">{p.detail}</span>
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      {helper ? (
        <p className="field__help t-small muted" id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
      <FieldError id={id} message={error} />
    </div>
  );
}
