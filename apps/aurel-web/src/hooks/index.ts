import { useEffect, useRef, useState, type RefObject } from "react";
import { marketClock } from "../config/market";

export function useMediaQuery(query: string): boolean {
  const get = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatches(mql.matches);
    on();
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** True once (or while, with `once: false`) the element is in view. */
export function useInView<T extends Element>(options: { once?: boolean; rootMargin?: string; threshold?: number } = {}) {
  const { once = true, rootMargin = "0px", threshold = 0.25 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);
  return [ref, inView] as const;
}

/**
 * Scroll progress (0 to 1) of a tall section whose child is `position: sticky`.
 * 0 when the section's top reaches the viewport top, 1 when its bottom reaches
 * the viewport bottom. Read with requestAnimationFrame; no scroll hijacking.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>, enabled = true): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const next = span <= 0 ? (r.top <= 0 ? 1 : 0) : Math.min(1, Math.max(0, -r.top / span));
      setP((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
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
  }, [ref, enabled]);
  return p;
}

export function useOnline(): boolean {
  const [online, setOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);
  return online;
}

/** The market's clock, updated each minute. */
export function useClock(): string {
  const [now, setNow] = useState(() => marketClock());
  useEffect(() => {
    const id = setInterval(() => setNow(marketClock()), 15_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Map p from [a, b] to [0, 1]. */
export const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
