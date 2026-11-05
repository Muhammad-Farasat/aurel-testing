import type { ReactNode } from "react";
import type { Service } from "../../booking/model";
import "./story.css";

/** The corner frame shared by every chapter: label top left, hour top right. */
export function ChapterFrame({ label, hour, children }: { label: string; hour?: ReactNode; children?: ReactNode }) {
  return (
    <div className="chapter-frame wrap">
      <p className="t-label chapter-frame__label">{label}</p>
      {children}
      {hour !== undefined ? (
        <p className="t-label chapter-frame__hour tnum" aria-hidden="true">
          {hour}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Each service drawn as a shape in time: A→B line; plane to door; a bracket of
 * hours; a day arc. `drawn` strokes it in.
 */
export function ServiceGlyph({ service, drawn, className }: { service: Service; drawn: boolean; className?: string }) {
  const cls = ["glyph", drawn ? "is-drawn" : "", className ?? ""].join(" ");
  switch (service) {
    case "transfer":
      return (
        <svg className={cls} viewBox="0 0 240 120" aria-hidden="true">
          <rect className="glyph__dot" x="14" y="54" width="12" height="12" />
          <path className="glyph__line" pathLength={1} d="M26 60 H214" />
          <rect className="glyph__dot glyph__dot--end" x="214" y="54" width="12" height="12" />
        </svg>
      );
    case "airport":
      return (
        <svg className={cls} viewBox="0 0 240 120" aria-hidden="true">
          <path className="glyph__line" pathLength={1} d="M10 30 C 70 30, 110 92, 170 92 H200" />
          <path className="glyph__thin" d="M10 96 H230" />
          <rect className="glyph__dot glyph__dot--end" x="200" y="62" width="30" height="34" />
        </svg>
      );
    case "hourly":
      return (
        <svg className={cls} viewBox="0 0 240 120" aria-hidden="true">
          <path className="glyph__line" pathLength={1} d="M20 36 V84 M20 60 H220 M220 36 V84" />
          {[60, 100, 140, 180].map((x) => (
            <path key={x} className="glyph__thin" d={`M${x} 50 V70`} />
          ))}
        </svg>
      );
    case "fullday":
      return (
        <svg className={cls} viewBox="0 0 240 120" aria-hidden="true">
          <path className="glyph__thin" d="M10 100 H230" />
          <path className="glyph__line" pathLength={1} d="M24 100 A 96 80 0 0 1 216 100" />
          <rect className="glyph__dot glyph__dot--end" x="114" y="14" width="12" height="12" />
        </svg>
      );
  }
}

/** Split text into words that reveal one after another when `on` is true. */
export function Words({ text, on, className }: { text: string; on: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={["words", on ? "is-on" : "", className ?? ""].join(" ")}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="words__w" style={{ transitionDelay: on ? `${i * 40}ms` : "0ms" }}>
            {w}{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
