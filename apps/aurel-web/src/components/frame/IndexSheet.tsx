import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { indexGroups, legalLinks } from "../../config/sitemap";
import { tagline } from "../../config/copy";
import { market } from "../../config/market";
import { Icon } from "../Icon";

/**
 * The Index replaces a nav bar (P-010): a full-screen sheet on day paper, set
 * like a departures board. A native modal dialog traps focus and makes the
 * page behind it inert; Esc and Close return focus to the Index button.
 */
export function IndexSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add("index-open");
      requestAnimationFrame(() => firstLink.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onDialogClose = () => {
      document.documentElement.classList.remove("index-open");
      onClose();
      document.getElementById("index-button")?.focus();
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      d.close();
    };
    d.addEventListener("close", onDialogClose);
    d.addEventListener("cancel", onCancel);
    return () => {
      d.removeEventListener("close", onDialogClose);
      d.removeEventListener("cancel", onCancel);
    };
  }, [onClose]);

  let first = true;
  return (
    <dialog ref={ref} className="index" aria-labelledby="index-title">
      <div className="index__bar wrap">
        <span className="t-board index__mark" aria-hidden="true">
          AUREL
        </span>
        <h2 className="visually-hidden" id="index-title">
          Index
        </h2>
        <button type="button" className="frame__link index__close" onClick={() => ref.current?.close()}>
          Close <Icon name="close" size={20} />
        </button>
      </div>
      <nav className="index__body wrap" aria-label="Index">
        <div className="index__grid">
          {indexGroups.map((g, gi) => (
            <section key={g.title} className="index__group" style={{ ["--i" as string]: gi }}>
              <h3 className="t-label index__group-title">
                <span className="tnum">{String(gi + 1).padStart(2, "0")}</span> {g.title}
              </h3>
              <ul>
                {g.links.map((l) => {
                  const isFirst = first;
                  first = false;
                  return (
                    <li key={l.to} className={l.to === "/sign-in" ? "index__item index__item--signin" : "index__item"}>
                      <Link
                        to={l.to}
                        ref={isFirst ? firstLink : undefined}
                        className="index__link"
                        aria-current={location.pathname === l.to ? "page" : undefined}
                        viewTransition
                        onClick={() => ref.current?.close()}
                      >
                        <span className="index__label">{l.label}</span>
                        <span className="index__line t-small">{l.line}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </nav>
      <div className="index__foot wrap t-small">
        <span>AUREL. {tagline}</span>
        <a href={market.phoneHref} className="tnum">
          {market.phone}
        </a>
        <span className="index__legal">
          {legalLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => ref.current?.close()}>
              {l.label}
            </Link>
          ))}
        </span>
      </div>
    </dialog>
  );
}
