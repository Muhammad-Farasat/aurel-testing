import { useRef } from "react";
import { standards } from "../../config/copy";
import { useReducedMotion, useScrollProgress } from "../../hooks";
import { ChapterFrame } from "../../components/story/Story";

/**
 * Chapter 04: the standard. Ground turns from day to dusk as the chapter pins;
 * each scroll step brings one standard in at display size, pushing the last up
 * and dimming it. Reduced motion: a plain numbered list on dusk.
 */
export function Standards() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, !reduce);
  const active = Math.min(standards.length - 1, Math.floor(p * standards.length));
  const dusk = reduce || p > 0;

  if (reduce) {
    return (
      <section className="std std--static on-dark" data-ground="dark" aria-labelledby="std-title">
        <ChapterFrame label="04 Standard" />
        <div className="wrap">
          <h2 id="std-title" className="t-label muted std__title">
            The standard
          </h2>
          <ol className="std__list">
            {standards.map((s) => (
              <li key={s.n}>
                <span className="t-label tnum muted">{s.n}</span>
                <p className="t-title">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={dusk ? "std is-dusk on-dark" : "std"}
      data-ground={dusk ? "dark" : "light"}
      aria-labelledby="std-title"
    >
      <div className="std__pin">
        <ChapterFrame label="04 Standard" hour={`${standards[active]!.n} / 0${standards.length}`} />
        <div className="wrap std__stage">
          <h2 id="std-title" className="visually-hidden">
            The standard
          </h2>
          <ol className="std__items">
            {standards.map((s, i) => (
              <li
                key={s.n}
                className={i === active ? "std__item is-active" : i === active - 1 ? "std__item is-past" : i < active ? "std__item is-gone" : "std__item is-next"}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="std__n t-label tnum">{s.n}</span>
                <p className="std__text t-display">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
