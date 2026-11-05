import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

/**
 * Top frame: wordmark left, Sign in and Index right. Scrolls away on the way
 * down and returns on the way up. Text colour follows the ground under it.
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
          <nav className="frame__nav" aria-label="Site">
            <Link to="/sign-in" className="frame__link frame__signin" viewTransition>
              Sign in
            </Link>
            <button
              type="button"
              className="frame__link"
              aria-haspopup="dialog"
              aria-expanded={indexOpen}
              onClick={() => setIndexOpen(true)}
              id="index-button"
            >
              Index
            </button>
          </nav>
        </div>
      </header>
      <IndexSheet open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}
