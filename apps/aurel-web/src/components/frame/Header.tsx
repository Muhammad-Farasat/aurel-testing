import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

/**
 * No nav bar (P-010): the wordmark, Menu and one quiet Book. It scrolls away
 * on the way down and returns on the way up. Over the kerb (light ground) it
 * switches to the outside colours.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [light, setLight] = useState<[boolean, boolean]>([false, false]);
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
        // Sample both ends: on the home hero the door splits the bar in two.
        const at = (x: number) =>
          document.elementFromPoint(x, 36)?.closest<HTMLElement>("[data-ground]")?.dataset.ground === "kerb";
        const next: [boolean, boolean] = [at(8), at(window.innerWidth - 8)];
        h.style.pointerEvents = prev;
        setLight((cur) => (cur[0] === next[0] && cur[1] === next[1] ? cur : next));
      }
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    // Grounds can also move without a scroll (the hero door's latch).
    window.addEventListener("aurel:ground", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      window.removeEventListener("aurel:ground", on);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={["frame", hidden && !indexOpen ? "is-hidden" : "", ""].filter(Boolean).join(" ")}
        onFocus={() => setHidden(false)}
      >
        <div className="frame__inner wrap">
          <Wordmark className={light[0] ? "on-light is-light" : ""} />
          <div className={light[1] ? "frame__end on-light is-light" : "frame__end"}>
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
            <Link to="/book/journey" className="btn btn--secondary frame__book" viewTransition>
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
