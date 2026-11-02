import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Services" };

const SERVICES = [
  {
    id: "point-to-point",
    name: "Point-to-Point Transfer",
    description:
      "Travel from one pickup location to one destination, with a chauffeur arranged around your schedule. Suited to business meetings, events, and personal travel.",
  },
  {
    id: "airport-transfer",
    name: "Airport Transfer",
    description:
      "Airport pickup or drop-off with your flight tracked in advance. Share your flight number and airline, and add meet-and-greet service at the gate or baggage claim.",
  },
  {
    id: "hourly",
    name: "Hourly Chauffeur",
    description:
      "Hire a chauffeur for a block of hours from a starting location you choose. Ideal for multi-stop days, meetings, or events with an uncertain schedule.",
  },
  {
    id: "full-day",
    name: "Full-Day Chauffeur",
    description:
      "Reserve a chauffeur and vehicle for the entire day. Suited to business trips, events, and extended personal travel.",
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
        </div>
      </section>

      <section className="bg-ivory px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl divide-y divide-midnight/10">
          {SERVICES.map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-24 py-12 first:pt-0">
              <h2 className="font-serif text-2xl text-midnight">{service.name}</h2>
              <p className="mt-4 max-w-2xl text-slate">{service.description}</p>
              <Button href="/register" variant="outline" size="sm" className="mt-6">
                Book This Service
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
