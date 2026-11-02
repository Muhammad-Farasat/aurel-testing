import type { Metadata } from "next";

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
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-midnight/90">
          <p>
            AUREL was built for people who treat time, privacy, and reliability as non-negotiable.
            We are not a ride-hailing app — we are a chauffeur service, built around professional
            drivers, a maintained fleet, and reservations made in advance.
          </p>
          <p>
            Every booking is matched to a vetted chauffeur and a vehicle suited to the journey.
            Punctuality is treated as a baseline, not a feature: pickup windows are tracked,
            flights are monitored for airport transfers, and every trip is confirmed before it
            begins.
          </p>
          <p>
            Our goal is a consistent experience, whether you book a single transfer or a fully
            chauffeured day — composed, private, and precisely on time.
          </p>
        </div>
      </section>
    </>
  );
}
