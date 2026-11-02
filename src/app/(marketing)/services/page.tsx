import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PhotoTile } from "@/components/ui/photo-tile";
import { Reveal } from "@/components/ui/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = { title: "Services" };

const SERVICES = [
  {
    id: "point-to-point",
    name: "Point-to-Point Transfer",
    tagline: "One pickup, one destination, arranged around your schedule.",
    description:
      "Travel from one pickup location to one destination, suited to business meetings, events, and personal travel. The route and distance are shown before you confirm.",
    meta: "Live route shown before booking",
    image: MARKETING_IMAGES.heroNightCar,
  },
  {
    id: "airport-transfer",
    name: "Airport Transfer",
    tagline: "Flight-tracked pickups, so delays don't become your problem.",
    description:
      "Airport pickup or drop-off with your flight number and airline tracked in advance. Add meet-and-greet at the gate or baggage claim, with waiting time built into the quote.",
    meta: "Meet-and-greet available",
    image: MARKETING_IMAGES.airportTransfer,
  },
  {
    id: "hourly",
    name: "Hourly Chauffeur",
    tagline: "A chauffeur on call for a block of hours.",
    description:
      "Hire a chauffeur for a block of hours from a starting location you choose, ideal for multi-stop days or events with an uncertain schedule. No rebooking between stops.",
    meta: "Multiple stops, one booking",
    image: MARKETING_IMAGES.driverSeatDetail,
  },
  {
    id: "full-day",
    name: "Full-Day Chauffeur",
    tagline: "One vehicle and driver, for the entire day.",
    description:
      "Reserve a chauffeur and vehicle for the entire day, suited to multi-stop business trips, events, and extended travel. Priced as a flat day rate, not an hourly estimate.",
    meta: "Flat day rate",
    image: MARKETING_IMAGES.businessDistrictSedan,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-midnight px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Services</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
            Four ways to travel with AUREL
          </h1>
          <p className="mt-6 max-w-xl text-ivory/70">
            Each service has its own pricing rules and booking flow, built around how that trip
            actually works rather than a single generic ride type.
          </p>
        </div>
      </section>

      <div className="bg-ivory">
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 border-t border-midnight/10 px-6 py-16 lg:px-12"
          >
            <Reveal className="mx-auto max-w-5xl">
              <PhotoTile
                href="/register"
                imageSrc={service.image}
                imageAlt={service.name}
                title={service.name}
                description={service.tagline}
                aspect={i % 2 === 0 ? "aspect-[21/9]" : "aspect-[16/9]"}
              />
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="max-w-xl text-slate">{service.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-gold">{service.meta}</p>
                </div>
                <Button href="/register" variant="outline" size="sm" className="shrink-0">
                  Book This Service
                </Button>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
