import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import { hasDraft, resolveJourney, routeLabel, whenLabel } from "../../booking/model";
import { validateJourney } from "../../booking/validate";
import { Icon } from "../Icon";

/**
 * One persistent booking action (P-010): a square ink bar at the bottom,
 * shown once every booking panel on the page is out of view. With a draft it
 * reads "Continue: Heathrow T5 → The Savoy, Thu 07:40" with the amber now-dot.
 */
export function PersistentAction() {
  const { draft } = useDraft();
  const location = useLocation();
  const navigate = useNavigate();
  const [panelVisible, setPanelVisible] = useState(true);
  const [hasPanel, setHasPanel] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const t = setTimeout(() => {
      // Hidden while a booking panel, the ending or the footer is in view.
      const panels = document.querySelectorAll("[data-booking-panel], [data-hide-action]");
      setHasPanel(document.querySelectorAll("[data-booking-panel]").length > 0);
      if (!panels.length) {
        setPanelVisible(false);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setPanelVisible(visible.size > 0);
        },
        { threshold: 0.05 },
      );
      panels.forEach((p) => io!.observe(p));
    }, 60);
    return () => {
      clearTimeout(t);
      io?.disconnect();
    };
  }, [location.pathname]);

  const hiddenRoute = /^\/(book|booking|account)(\/|$)/.test(location.pathname);
  const show = !hiddenRoute && !panelVisible;

  const j = resolveJourney(draft);
  const draftLine = hasDraft(draft) ? [routeLabel(j, draft), whenLabel(j)].filter(Boolean).join(", ") : "";

  const go = () => {
    const panel = document.querySelector<HTMLElement>("[data-booking-panel]");
    if (hasPanel && panel) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // Focus the next empty field, or the panel's Continue.
      const ids = Object.keys(validateJourney(draft));
      const target =
        ids.map((id) => document.getElementById(id)).find((el) => el && !el.closest("[inert]")) ??
        panel.querySelector<HTMLElement>("button[type=submit]:not([disabled])") ??
        panel.querySelector<HTMLElement>("input, button");
      setTimeout(() => target?.focus({ preventScroll: true }), reduce ? 0 : 450);
    } else {
      navigate("/book/journey", { state: { from: location.pathname } });
    }
  };

  return (
    <div className={show ? "paction is-shown" : "paction"} aria-hidden={!show}>
      <button type="button" className="paction__btn" onClick={go} tabIndex={show ? 0 : -1}>
        {draftLine ? (
          <>
            <span className="now-dot" aria-hidden="true" />
            <span className="paction__label">
              <span className="paction__verb">Continue:</span> <span className="tnum">{draftLine}</span>
            </span>
          </>
        ) : (
          <span className="paction__label">Book a journey</span>
        )}
        <Icon name="arrow" size={20} className="btn__arrow" />
      </button>
    </div>
  );
}
