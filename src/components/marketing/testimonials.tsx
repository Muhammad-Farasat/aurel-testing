"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Illustrative examples, not verified customer reviews. AUREL hasn't
 * launched yet, so there are no real ones to show. No invented names, photos,
 * or ratings; attribution stays generic (role + city) rather than implying a
 * specific, checkable identity. Replace with real reviews once bookings and
 * the review system (Phase 4) produce them.
 */
const QUOTES = [
  {
    quote:
      "Every pickup has been on time and the car is always spotless. I stopped thinking about the ride and just focused on the meeting.",
    attribution: "Management Consultant, Chicago",
  },
  {
    quote:
      "Our flight was delayed almost two hours. The driver had already adjusted the pickup time before we landed.",
    attribution: "Frequent Flyer, Dallas",
  },
  {
    quote:
      "Booked a full day for a wedding and never had to think about logistics again. Just told the driver where we were headed next.",
    attribution: "Event Planner, Austin",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = QUOTES[index];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-serif text-2xl leading-relaxed text-ivory sm:text-3xl">
        &ldquo;{current.quote}&rdquo;
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">{current.attribution}</p>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length)}
          className="text-ivory/50 transition-colors hover:text-gold"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </button>

        <div className="flex gap-2">
          {QUOTES.map((q, i) => (
            <button
              key={q.attribution}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i === index ? "bg-gold" : "bg-ivory/20",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % QUOTES.length)}
          className="text-ivory/50 transition-colors hover:text-gold"
        >
          <ChevronRight className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
