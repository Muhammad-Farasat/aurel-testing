import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Wordmark } from "../../components/frame/Header";
import { Icon } from "../../components/Icon";
import { Summary, SummaryChips } from "./Summary";
import { legalLinks } from "../../config/sitemap";
import "../../components/frame/frame.css";
import "../../components/booking/booking.css";

export const steps = [
  { path: "journey", label: "Journey" },
  { path: "vehicle", label: "Vehicle" },
  { path: "details", label: "Details" },
  { path: "review", label: "Review" },
] as const;

export type StepPath = (typeof steps)[number]["path"];

/**
 * Booking frame: wordmark, step indicator ("2 of 4 Vehicle" plus four ticks),
 * Exit. No Index, no persistent action, one line of legal links.
 */
export function BookLayout() {
  const location = useLocation();
  const current = steps.findIndex((s) => location.pathname.endsWith(`/${s.path}`));
  const idx = current < 0 ? 0 : current;
  const from = useRef<string>((location.state as { from?: string } | null)?.from ?? "/");

  useEffect(() => {
    document.title = `${steps[idx]!.label}, step ${idx + 1} of 4. Book with AUREL`;
  }, [idx]);

  return (
    <div className="book">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="book__frame">
        <div className="wrap book__frame-inner">
          <Wordmark />
          <div className="steps-ind" aria-label="Progress">
            <p className="t-small">
              <span className="tnum">{idx + 1} of 4</span> <strong>{steps[idx]!.label}</strong>
            </p>
            <span className="steps-ind__ticks" aria-hidden="true">
              {steps.map((s, i) => (
                <span key={s.path} className={["steps-ind__tick", i < idx ? "is-done" : "", i === idx ? "is-current" : ""].join(" ")} />
              ))}
            </span>
          </div>
          <Link to={from.current.startsWith("/book") ? "/" : from.current} className="book__exit">
            Exit <Icon name="close" size={20} />
          </Link>
        </div>
      </header>
      <div className="book__body">
        <div className="wrap grid book__grid">
          <div className="book__chips">
            <SummaryChips />
          </div>
          <main className="book__main" id="main" tabIndex={-1}>
            <Outlet />
          </main>
          <aside className="book__side" aria-label="Your journey">
            <Summary />
          </aside>
        </div>
      </div>
      <footer className="book__legal t-small">
        <div className="wrap">
          <ul>
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li className="muted">Your booking is saved on this device as you go.</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
