import { useRef } from "react";
import { morning, sampleBoardName } from "../../config/copy";
import { useMediaQuery, useReducedMotion, useScrollProgress, range } from "../../hooks";
import { ChapterFrame, Words } from "../../components/story/Story";
import { NameBoard, BoardName } from "../../components/NameBoard";

/**
 * Chapter 01, one morning minute by minute. Scroll scrubs the clock from 06:40
 * to 08:40; the ground moves from dawn to day; the flight lands twelve minutes
 * early and the pickup marker slides to match; the name board enters at 07:55.
 */
const KEYS: [number, number][] = [
  [0, 400], // 06:40
  [0.33, 445], // 07:25
  [0.66, 475], // 07:55
  [1, 520], // 08:40
];

function clockAt(p: number): number {
  for (let i = 1; i < KEYS.length; i++) {
    const [p0, m0] = KEYS[i - 1]!;
    const [p1, m1] = KEYS[i]!;
    if (p <= p1) return Math.round(m0 + ((p - p0) / (p1 - p0)) * (m1 - m0));
  }
  return 520;
}

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

// Rule spans 06:30 to 08:50.
const RULE_START = 390;
const RULE_END = 530;
const pos = (m: number) => ((m - RULE_START) / (RULE_END - RULE_START)) * 100;

// dawn #E3E1DA → day #F1EFEA
function ground(p: number): string {
  const t = range(p, 0.05, 0.7);
  const a = [0xe3, 0xe1, 0xda];
  const b = [0xf1, 0xef, 0xea];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i]! - v) * t)).join(" ")})`;
}

export function Morning() {
  const reduce = useReducedMotion();
  return reduce ? <MorningStatic /> : <MorningScrubbed />;
}

function FlightArc({ progress }: { progress: number }) {
  return (
    <svg className="arc" viewBox="0 0 600 196" role="img" aria-label="Flight BA117 from New York JFK to London Heathrow">
      <path className="arc__track" d="M20 160 C 160 10, 440 10, 580 160" />
      <path className="arc__fill" d="M20 160 C 160 10, 440 10, 580 160" pathLength={1} style={{ strokeDashoffset: 1 - progress }} />
      <rect className="arc__end" x="14" y="154" width="12" height="12" />
      <rect className={progress >= 1 ? "arc__end is-landed" : "arc__end"} x="574" y="154" width="12" height="12" />
      <text className="arc__label" x="14" y="192">
        JFK
      </text>
      <text className="arc__label" x="586" y="192" textAnchor="end">
        LHR T5
      </text>
    </svg>
  );
}

function MorningScrubbed() {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);
  const isPhone = useMediaQuery("(max-width: 599px)");
  const clock = clockAt(p);
  const landed = clock >= 443; // 07:23
  const flight = range(clock, 400, 443);
  const activeIndex = morning.reduce((acc, m, i) => (clock >= toMin(m.time) ? i : acc), 0);
  const boardIn = clock >= 475;

  // Markers on the rule.
  const landingMin = landed ? 443 : 455; // scheduled 07:35, actual 07:23
  const pickupMin = landed ? 473 : 485; // 08:05 moves to 07:53

  return (
    <section
      ref={ref}
      className="morning"
      data-ground="light"
      aria-labelledby="morning-title"
      style={{ ["--ground" as string]: ground(p) }}
    >
      <div className="morning__pin">
        <ChapterFrame label="01 Airport" hour={hhmm(clock)} />
        <div className="wrap morning__grid">
          <div className="morning__left">
            <h2 id="morning-title" className="visually-hidden">
              One morning, minute by minute
            </h2>
            <p className="morning__hour t-display tnum" aria-hidden="true">
              {hhmm(clock)}
            </p>
            <div className="morning__event" aria-live="off">
              {morning.map((m, i) => (
                <div key={m.time} className={i === activeIndex ? "morning__copy is-active" : "morning__copy"}>
                  <p className="morning__title">
                    <Words text={m.title} on={i === activeIndex} />
                  </p>
                  <p className="morning__line muted">
                    <Words text={m.line} on={i === activeIndex} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="morning__right">
            <div className={boardIn ? "morning__top is-board" : "morning__top"}>
              {!isPhone ? <FlightArc progress={flight} /> : null}
              <div className="morning__board">
                <NameBoard size="lg">
                  <BoardName name={sampleBoardName} />
                </NameBoard>
              </div>
            </div>
            <div className="rule rule--v" aria-hidden="true">
              <div className="rule__track" />
              <div className="rule__progress" style={{ height: `${pos(clock)}%` }} />
              {morning.map((m, i) => (
                <div
                  key={m.time}
                  className={clock >= toMin(m.time) ? "rule__stop is-past" : "rule__stop"}
                  style={{ top: `${pos(toMin(m.time))}%` }}
                >
                  <span className="rule__tick" />
                  <span className="rule__time tnum">{m.time}</span>
                  <span className="rule__text">{["Flight checked", "Pickup moved", "At arrivals", "At the door"][i]}</span>
                </div>
              ))}
              <div className={landed ? "rule__marker rule__marker--land is-moved" : "rule__marker rule__marker--land"} style={{ top: `${pos(landingMin)}%` }}>
                <span className="tnum">{hhmm(landingMin)}</span> {landed ? "landed, 12 min early" : "scheduled landing"}
              </div>
              <div className={landed ? "rule__marker rule__marker--pickup is-moved" : "rule__marker rule__marker--pickup"} style={{ top: `${pos(pickupMin)}%` }}>
                Pickup <span className="tnum">{hhmm(pickupMin)}</span>
              </div>
              <div className="rule__now" style={{ top: `${pos(clock)}%` }} />
            </div>
          </div>
        </div>
      </div>
      <p className="visually-hidden">
        {morning.map((m) => `${m.time}: ${m.title} ${m.line}`).join(" ")}
      </p>
    </section>
  );
}

/** Reduced motion: a static list of the four timestamps and the finished arc. */
function MorningStatic() {
  return (
    <section className="morning morning--static" data-ground="light" aria-labelledby="morning-title-s">
      <ChapterFrame label="01 Airport" hour="06:40 to 08:40" />
      <div className="wrap morning__static">
        <h2 id="morning-title-s" className="t-title">
          One morning, minute by minute.
        </h2>
        <FlightArc progress={1} />
        <ol className="morning__list">
          {morning.map((m) => (
            <li key={m.time}>
              <span className="t-input-xl tnum">{m.time}</span>
              <span>
                <strong>{m.title}</strong> <span className="muted">{m.line}</span>
              </span>
            </li>
          ))}
        </ol>
        <NameBoard size="lg" className="morning__static-board">
          <BoardName name={sampleBoardName} />
        </NameBoard>
      </div>
    </section>
  );
}
