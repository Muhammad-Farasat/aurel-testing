import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "../Icon";
import { IndexSheet } from "./IndexSheet";
import "./frame.css";

export function Wordmark({ className }: { className?: string }) {
  // Typeset placeholder (Open question 8). No logo is invented here.
  return (
    <Link to="/" className={["wordmark", "t-board", className ?? ""].join(" ")} aria-label="AUREL, home" viewTransition>
      AUREL
    </Link>
  );
}

/** The three pages most visitors ask about after booking (P-024). */
const barLinks = [
  { to: "/airport-transfers", label: "Airports" },
  { to: "/fleet", label: "Fleet" },
  { to: "/business", label: "Business" },
];

/**
 * Small top bar: wordmark, three pill links, Menu and one Book action. It
 * scrolls away on the way down and returns on the way up. Its colours follow
 * the ground under it.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 120);
        lastY.current = y;
      }
      if (y < 20) setHidden(false);
      // Which ground is under the frame?
      const h = headerRef.current;
      if (h) {
        const prev = h.style.pointerEvents;
        h.style.pointerEvents = "none";
        const el = document.elementFromPoint(8, 36);
        h.style.pointerEvents = prev;
        const ground = el?.closest<HTMLElement>("[data-ground]")?.dataset.ground;
        setDark(ground === "dark");
      }
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={["frame", hidden && !indexOpen ? "is-hidden" : "", dark ? "on-dark is-dark" : ""].filter(Boolean).join(" ")}
        onFocus={() => setHidden(false)}
      >
        <div className="frame__inner wrap">
          <Wordmark />
          <nav className="frame__nav" aria-label="Main">
            {barLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className="frame__pill" viewTransition>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="frame__end">
            <button
              type="button"
              className="frame__menu"
              aria-haspopup="dialog"
              aria-expanded={indexOpen}
              onClick={() => setIndexOpen(true)}
              id="index-button"
            >
              <span className="frame__menu-icon" aria-hidden="true">
                <span />
                <span />
              </span>
              Menu
            </button>
            <Link to="/book/journey" className="btn btn--ink frame__book" viewTransition>
              <span className="btn__label">Book</span>
              <Icon name="arrow" size={20} className="btn__arrow" />
            </Link>
          </div>
        </div>
      </header>
      <IndexSheet open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}
