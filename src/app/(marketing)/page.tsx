import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import { db } from "@/db/client";
import { vehicleCategories, vehicles } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { NumberedRow } from "@/components/ui/numbered-row";
import { Reveal } from "@/components/ui/reveal";
import { Testimonials } from "@/components/marketing/testimonials";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

const SERVICES = [
  {
    index: "01",
    name: "Point-to-Point Transfer",
    description: "One pickup, one destination. Ideal for meetings, events, and personal travel.",
    href: "/services#point-to-point",
  },
  {
    index: "02",
    name: "Airport Transfer",
    description: "Flight-tracked pickups and drop-offs, with optional meet-and-greet.",
    href: "/services#airport-transfer",
  },
  {
    index: "03",
    name: "Hourly Chauffeur",
    description: "Reserve a chauffeur for a block of hours, on your schedule.",
    href: "/services#hourly",
  },
  {
    index: "04",
    name: "Full-Day Chauffeur",
    description: "A dedicated vehicle and driver for the entire day.",
    href: "/services#full-day",
  },
];

const PROCESS = [
  {
    index: "01",
    title: "Select a service",
    description: "Point-to-point, airport, hourly, or full-day, chosen around how you're moving.",
  },
  {
    index: "02",
    title: "Enter journey details",
    description: "Pickup, destination, timing, and passenger count. Flight details for airport transfers.",
  },
  {
    index: "03",
    title: "Choose your vehicle",
    description: "Only vehicles with the capacity for your trip are shown, with pricing up front.",
  },
  {
    index: "04",
    title: "Confirm and pay",
    description: "A clear price breakdown before you confirm, then a booking reference and driver details.",
  },
];

const VEHICLE_IMAGES: Record<string, string> = {
  business_class: MARKETING_IMAGES.businessClassVehicle,
  first_class: MARKETING_IMAGES.firstClassVehicle,
  luxury_suv: MARKETING_IMAGES.luxurySuv,
  luxury_van: MARKETING_IMAGES.luxuryVan,
};

async function getFeaturedVehicles() {
  const rows = await db
    .select({
      id: vehicles.id,
      name: vehicles.name,
      passengerCapacity: vehicles.passengerCapacity,
      luggageCapacity: vehicles.luggageCapacity,
      startingPrice: vehicles.startingPrice,
      categoryKey: vehicleCategories.key,
      categoryName: vehicleCategories.name,
    })
    .from(vehicles)
    .innerJoin(vehicleCategories, eq(vehicles.categoryId, vehicleCategories.id))
    .where(eq(vehicles.isActive, true))
    .orderBy(asc(vehicleCategories.sortOrder));
  return rows;
}

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-midnight">
        <Image
          src={MARKETING_IMAGES.heroNightCar}
          alt="A chauffeured sedan on a city street at night"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(11,18,32,0.35)_0%,_rgba(11,18,32,0.55)_55%,_rgba(11,18,32,0.95)_100%)]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-40 pb-16 lg:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Private Chauffeur Service</p>
          <h1 className="mt-6 max-w-3xl text-balance font-serif text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Arrive composed, every time.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg text-ivory/80">
            AUREL pairs vetted professional chauffeurs with a curated fleet, so every journey is
            punctual, private, and precisely arranged.
          </p>

          {/* Quick service selector. The booking entry point lives in the hero itself. */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-ivory/15 pt-8">
            <span className="mr-2 text-xs uppercase tracking-wider text-ivory/50">Travel by</span>
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-full border border-ivory/25 px-4 py-2 text-sm text-ivory/90 transition-colors hover:border-gold hover:text-gold"
              >
                {service.name}
              </Link>
            ))}
            <Button href="/register" className="ml-auto">
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ivory px-6 py-24 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate">AUREL</p>
          <p className="mt-6 text-balance font-serif text-2xl leading-relaxed text-midnight sm:text-3xl">
            Not a ride-hailing app. A chauffeur service built on advance reservations, vetted
            drivers, and a maintained fleet, arranged around how and when you actually travel.
          </p>
        </Reveal>
      </section>

      {/* Services, as numbered editorial rows */}
      <section className="bg-ivory px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            {SERVICES.map((service) => (
              <NumberedRow
                key={service.href}
                index={service.index}
                title={service.name}
                description={service.description}
                href={service.href}
              />
            ))}
            <div className="border-t border-midnight/10" />
          </Reveal>
        </div>
      </section>

      {/* Featured vehicles: horizontal scroll strip, deliberately not a card grid */}
      {featuredVehicles.length > 0 && (
        <section className="bg-charcoal py-24">
          <Reveal className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">The fleet</p>
                <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                  A vehicle for the occasion
                </h2>
              </div>
              <Link
                href="/fleet"
                className="hidden shrink-0 items-center gap-2 text-sm text-ivory/70 hover:text-gold sm:flex"
              >
                View full fleet <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 flex gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:px-12 [&::-webkit-scrollbar]:hidden">
            {featuredVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href="/fleet"
                className="group w-[78vw] shrink-0 snap-start sm:w-[420px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={VEHICLE_IMAGES[vehicle.categoryKey] ?? MARKETING_IMAGES.businessClassVehicle}
                    alt={vehicle.name}
                    fill
                    sizes="(min-width: 640px) 420px, 78vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold">{vehicle.categoryName}</p>
                    <p className="mt-1 font-serif text-xl text-ivory">{vehicle.name}</p>
                    <p className="mt-1 text-sm text-ivory/50">
                      {vehicle.passengerCapacity} passengers · {vehicle.luggageCapacity} luggage
                    </p>
                  </div>
                  {vehicle.startingPrice && (
                    <p className="shrink-0 text-sm text-ivory/70">
                      From ${(vehicle.startingPrice / 100).toFixed(0)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Why AUREL: quiet, restrained */}
      <section className="bg-ivory px-6 py-24 lg:px-12">
        <Reveal className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">Why AUREL</p>
            <h2 className="mt-4 font-serif text-3xl text-midnight sm:text-4xl">
              What you&rsquo;re actually paying for
            </h2>
          </div>

          <div className="mt-14">
            <NumberedRow
              index="01"
              title="Vetted chauffeurs"
              description="Every driver is screened and trained before taking a single booking."
            />
            <NumberedRow
              index="02"
              title="Punctuality as a baseline"
              description="Flights are tracked, pickup windows are monitored, and trips are confirmed before they begin."
            />
            <NumberedRow
              index="03"
              title="Transparent pricing"
              description="The full price breakdown is shown before you confirm, with no surprise charges after the fact."
            />
            <div className="border-t border-midnight/10" />
          </div>
        </Reveal>
      </section>

      {/* Booking process, dark and numbered */}
      <section className="bg-midnight px-6 py-24 lg:px-12">
        <Reveal className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">How it works</p>
            <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
              Reserved in four steps
            </h2>
          </div>

          <div className="mt-14">
            {PROCESS.map((step) => (
              <NumberedRow
                key={step.index}
                index={step.index}
                title={step.title}
                description={step.description}
                tone="dark"
              />
            ))}
            <div className="border-t border-ivory/10" />
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal px-6 py-24 lg:px-12">
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>

      {/* Final CTA */}
      <section id="book" className="relative overflow-hidden px-6 py-32 text-center lg:px-12">
        <Image
          src={MARKETING_IMAGES.nightRoadTrails}
          alt="Light trails on a road at night"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-midnight/80" />

        <div className="relative">
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
        </div>
      </section>
    </>
  );
}
