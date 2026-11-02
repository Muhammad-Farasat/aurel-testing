type Step = { title: string; description: string };

/**
 * A connected-line timeline, not a stacked numbered list: a horizontal rule
 * threaded through small markers on desktop, collapsing to a left-hand
 * vertical rule on narrow screens. Gives the booking process its own
 * distinct mechanic instead of reusing the services/vehicle device.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className="relative border-l border-ivory/15 pl-6 lg:border-l-0 lg:pl-0">
          <div className="relative lg:pt-6">
            <span
              aria-hidden
              className="absolute -left-[29px] top-0 size-2.5 rounded-full border-2 border-gold bg-midnight lg:left-0 lg:top-0"
            />
            <span
              aria-hidden
              className="hidden lg:block lg:absolute lg:left-1.5 lg:top-1 lg:h-px lg:w-full lg:bg-ivory/15"
            />
            <p className="text-xs uppercase tracking-[0.2em] text-ivory/40">Step {i + 1}</p>
            <h3 className="mt-2 font-serif text-xl text-ivory">{step.title}</h3>
            <p className="mt-2 text-sm text-ivory/60">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
