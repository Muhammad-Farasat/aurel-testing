import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    name: "Point-to-Point Transfer",
    description: "One pickup, one destination. Ideal for meetings, events, and personal travel.",
    href: "/services#point-to-point",
  },
  {
    name: "Airport Transfer",
    description: "Flight-tracked pickups and drop-offs, with optional meet-and-greet.",
    href: "/services#airport-transfer",
  },
  {
    name: "Hourly Chauffeur",
    description: "Reserve a chauffeur for a block of hours, on your schedule.",
    href: "/services#hourly",
  },
  {
    name: "Full-Day Chauffeur",
    description: "A dedicated vehicle and driver for the entire day.",
    href: "/services#full-day",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-midnight">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(198,166,107,0.12),_transparent_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_60%,_rgba(0,0,0,0.35)_100%)]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-24 lg:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Private Chauffeur Service</p>
          <h1 className="font-serif-display mt-6 max-w-3xl text-balance text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Arrive composed, every time.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg text-ivory/70">
            AUREL pairs vetted professional chauffeurs with a curated fleet, so every journey is
            punctual, private, and precisely arranged.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/register" size="lg">
              Book a Chauffeur
            </Button>
            <Button href="/fleet" size="lg" variant="outline-light">
              Explore the Fleet
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ivory px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">Services</p>
            <h2 className="mt-4 font-serif text-3xl text-midnight sm:text-4xl">
              Arranged around how you move
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-midnight/10 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group bg-ivory p-8 transition-colors hover:bg-white sm:p-10"
              >
                <h3 className="font-serif text-xl text-midnight">{service.name}</h3>
                <p className="mt-3 text-sm text-slate">{service.description}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-wider text-gold group-hover:text-[#8a6c35]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="bg-charcoal px-6 py-24 text-center lg:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Ready when you are</p>
        <h2 className="mx-auto mt-4 max-w-xl text-balance font-serif text-3xl text-ivory sm:text-4xl">
          Reserve your next journey in minutes
        </h2>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/register" size="lg">
            Create an Account
          </Button>
          <Button href="/login" size="lg" variant="outline-light">
            Sign In
          </Button>
        </div>
      </section>
    </>
  );
}
