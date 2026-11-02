import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitFeature } from "@/components/ui/split-feature";
import { Reveal } from "@/components/ui/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = { title: "Services" };

const SERVICES = [
  {
    id: "point-to-point",
    name: "Point-to-Point Transfer",
    description:
      "Travel from one pickup location to one destination, with a chauffeur arranged around your schedule.",
    details: [
      "One pickup, one destination",
      "Suited to business meetings, events, and personal travel",
      "Live route and distance shown before you confirm",
    ],
    image: MARKETING_IMAGES.heroNightCar,
  },
  {
    id: "airport-transfer",
    name: "Airport Transfer",
    description:
      "Airport pickup or drop-off with your flight tracked in advance, so delays don't become your problem.",
    details: [
      "Flight number and airline tracked ahead of pickup",
      "Optional meet-and-greet at the gate or baggage claim",
      "Additional waiting time built into the quote",
    ],
    image: MARKETING_IMAGES.airportTransfer,
  },
  {
    id: "hourly",
    name: "Hourly Chauffeur",
    description:
      "Hire a chauffeur for a block of hours from a starting location you choose, for days with more than one stop.",
    details: [
      "Pick the number of hours you need",
      "Multiple stops without rebooking",
      "Ideal for meetings or events with an uncertain schedule",
    ],
    image: MARKETING_IMAGES.driverSeatDetail,
  },
  {
    id: "full-day",
    name: "Full-Day Chauffeur",
    description:
      "Reserve a chauffeur and vehicle for the entire day, for business trips, events, and extended travel.",
    details: [
      "One vehicle and driver, all day",
      "Suited to multi-stop business trips and events",
      "Priced as a flat day rate, not an hourly estimate",
    ],
    image: MARKETING_IMAGES.luxuryVan,
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
            className="scroll-mt-24 border-t border-midnight/10 px-6 py-20 lg:px-12"
          >
            <Reveal className="mx-auto max-w-6xl">
              <SplitFeature
                imageSrc={service.image}
                imageAlt={service.name}
                imageSide={i % 2 === 0 ? "left" : "right"}
                eyebrow={`0${i + 1} · Service`}
                title={service.name}
                aspect="aspect-[4/3]"
              >
                <p>{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={2} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/register" variant="outline" size="sm" className="mt-2">
                  Book This Service
                </Button>
              </SplitFeature>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
