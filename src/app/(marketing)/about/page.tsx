import type { Metadata } from "next";
import { SplitFeature } from "@/components/ui/split-feature";
import { NumberedRow } from "@/components/ui/numbered-row";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-midnight px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">About AUREL</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
            Transportation, arranged with care
          </h1>
        </div>
      </section>

      <section className="bg-ivory px-6 py-20 lg:px-12">
        <Reveal className="mx-auto max-w-6xl">
          <SplitFeature
            imageSrc={MARKETING_IMAGES.driverSeatDetail}
            imageAlt="Driver's view of a luxury vehicle's interior"
            imageSide="right"
            eyebrow="Our philosophy"
            title="Not a ride-hailing app"
          >
            <p>
              AUREL was built for people who treat time, privacy, and reliability as
              non-negotiable. It is a chauffeur service: professional drivers, a maintained fleet,
              and reservations made in advance, not a car that happens to be nearby.
            </p>
            <p>
              Every booking is matched to a vetted chauffeur and a vehicle suited to the journey.
              Punctuality is treated as a baseline, not a feature. Pickup windows are tracked,
              flights are monitored for airport transfers, and every trip is confirmed before it
              begins.
            </p>
          </SplitFeature>
        </Reveal>
      </section>

      <section className="bg-ivory px-6 pb-24 lg:px-12">
        <Reveal className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">What we hold to</p>
            <h2 className="mt-4 font-serif text-3xl text-midnight sm:text-4xl">
              Three commitments
            </h2>
          </div>

          <div className="mt-14">
            <NumberedRow
              index="01"
              title="Privacy by default"
              description="Trip details stay between you and your chauffeur. Nothing about a booking is shared beyond what's needed to complete it."
            />
            <NumberedRow
              index="02"
              title="One point of contact"
              description="Your assigned chauffeur sees the trip through from pickup to drop-off, not a rotating pool of drivers."
            />
            <NumberedRow
              index="03"
              title="Consistent, not occasional"
              description="The same standard applies whether it's a single transfer or a fully chauffeured day."
            />
            <div className="border-t border-midnight/10" />
          </div>
        </Reveal>
      </section>

      <section className="bg-charcoal px-6 py-24 text-center lg:px-12">
        <Reveal>
          <p className="mx-auto max-w-2xl text-balance font-serif text-2xl leading-relaxed text-ivory sm:text-3xl">
            Composed, private, and precisely on time. That&rsquo;s the whole idea.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button href="/register" size="lg">
              Create an Account
            </Button>
            <Button href="/fleet" size="lg" variant="outline-light">
              Explore the Fleet
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
