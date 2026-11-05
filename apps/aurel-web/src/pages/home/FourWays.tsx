import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import type { Service } from "../../booking/model";
import { useInView, useMediaQuery, useReducedMotion, useScrollProgress } from "../../hooks";
import { ChapterFrame, ServiceGlyph } from "../../components/story/Story";
import { Icon } from "../../components/Icon";

const rows: { service: Service; name: string; line: string; to: string }[] = [
  { service: "transfer", name: "Transfers", line: "From one door to another, at the time you set.", to: "/transfers" },
  { service: "airport", name: "Airport transfers", line: "Met at arrivals. The pickup follows your flight.", to: "/airport-transfers" },
  { service: "hourly", name: "Hourly", line: "A chauffeur for as many hours as the day needs.", to: "/hourly" },
  { service: "fullday", name: "Full day", line: "One car and one chauffeur, morning to night.", to: "/full-day" },
];

/** Chapter 02: the four services as a typographic index with a time-shape glyph each. */
export function FourWays() {
  const reduce = useReducedMotion();
  const isPhone = useMediaQuery("(max-width: 599px)");
  const pinned = !reduce && !isPhone;
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, pinned);
  const active = pinned ? Math.min(3, Math.floor(p * 4)) : -1;
  const { setService } = useDraft();

  const bookThis = (s: Service) => {
    setService(s);
    const panel = document.getElementById("booking");
    panel?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setTimeout(() => {
      document.querySelector<HTMLElement>("[data-booking-panel] .nameboard input, [data-booking-panel] .nameboard button")?.focus({ preventScroll: true });
    }, reduce ? 0 : 500);
  };

  return (
    <section ref={ref} className={pinned ? "ways ways--pinned" : "ways"} data-ground="light" aria-labelledby="ways-title">
      <div className="ways__pin">
        <ChapterFrame label="02 Services" />
        <div className="wrap ways__grid">
          <h2 id="ways-title" className="ways__title t-label">
            Four ways to book
          </h2>
          <ol className="ways__list">
            {rows.map((r, i) => (
              <WayRow
                key={r.service}
                row={r}
                index={i}
                active={active}
                pinned={pinned}
                reduce={reduce}
                onBook={() => bookThis(r.service)}
              />
            ))}
          </ol>
          {pinned ? (
            <div className="ways__glyph" aria-hidden="true">
              {rows.map((r, i) => (
                <ServiceGlyph key={r.service} service={r.service} drawn={i === active} className={i === active ? "is-current" : ""} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function WayRow({
  row,
  index,
  active,
  pinned,
  reduce,
  onBook,
}: {
  row: (typeof rows)[number];
  index: number;
  active: number;
  pinned: boolean;
  reduce: boolean;
  onBook: () => void;
}) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.4 });
  const distance = pinned ? Math.abs(index - active) : 0;
  const state = reduce ? "is-static" : pinned ? (index === active ? "is-active" : `is-dim-${Math.min(distance, 2)}`) : inView ? "is-active" : "is-waiting";
  return (
    <li ref={ref} className={`ways__row ${state}`}>
      <span className="ways__pointer" aria-hidden="true">
        <Icon name="arrow" size={28} />
      </span>
      <span className="ways__num t-label tnum">0{index + 1}</span>
      {!pinned ? <ServiceGlyph service={row.service} drawn={inView} className="ways__inline-glyph" /> : null}
      <Link to={row.to} className="ways__name" viewTransition>
        {row.name}
      </Link>
      <p className="ways__line muted">{row.line}</p>
      <button type="button" className="btn btn--text ways__book" onClick={onBook}>
        <span className="btn__label">Book this</span>
      </button>
    </li>
  );
}
