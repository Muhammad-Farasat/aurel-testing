import { useLayoutEffect, useRef } from "react";
import { useDraft } from "../../booking/DraftContext";
import { serviceQuestions } from "../../booking/model";
import { tagline } from "../../config/copy";
import { useInView, useReducedMotion } from "../../hooks";
import { Icon } from "../../components/Icon";

/** Chapter 06: the designed ending on night ground (P-009). */
export function Ending() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reduce = useReducedMotion();
  const { draft } = useDraft();
  const letters = "AUREL".split("");
  const markRef = useRef<HTMLHeadingElement>(null);
  const fitRef = useRef<HTMLSpanElement>(null);

  // Set the wordmark across the whole grid: measure at 100px, scale to fit.
  useLayoutEffect(() => {
    const mark = markRef.current;
    const fit = fitRef.current;
    if (!mark || !fit) return;
    const run = () => {
      mark.style.fontSize = "100px";
      const w = fit.getBoundingClientRect().width;
      if (w > 0) mark.style.fontSize = `${(100 * mark.clientWidth) / w}px`;
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(mark);
    void document.fonts?.ready.then(run);
    return () => ro.disconnect();
  }, []);

  const backToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setTimeout(() => {
      document.querySelector<HTMLElement>("[data-booking-panel] .nameboard input, [data-booking-panel] .nameboard button")?.focus({ preventScroll: true });
    }, reduce ? 0 : 600);
  };

  return (
    <section className="ending on-dark" data-ground="dark" data-hide-action aria-labelledby="ending-title">
      <div className="wrap ending__inner" ref={ref}>
        <h2 id="ending-title" ref={markRef} className={inView || reduce ? "ending__mark is-on" : "ending__mark"} aria-label="AUREL">
          <span className="ending__fit" ref={fitRef}>
            {letters.map((l, i) => (
              <span key={i} aria-hidden="true" style={{ transitionDelay: `${i * 30}ms` }}>
                {l}
              </span>
            ))}
          </span>
        </h2>
        <div className="ending__row">
          <p className="ending__tag t-title">{tagline}</p>
          <button type="button" className="ending__ask" onClick={backToBooking}>
            <span className="t-label muted">Book a journey</span>
            <span className="ending__question">{serviceQuestions[draft.service]}</span>
            <Icon name="arrow" size={28} className="btn__arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
