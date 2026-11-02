import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { vehicleCategories } from "@/db/schema";

export const metadata: Metadata = { title: "Fleet" };

export default async function FleetPage() {
  const categories = await db
    .select()
    .from(vehicleCategories)
    .where(eq(vehicleCategories.isActive, true))
    .orderBy(asc(vehicleCategories.sortOrder));

  return (
    <>
      <section className="bg-midnight px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Fleet</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
            A curated vehicle selection
          </h1>
        </div>
      </section>

      <section className="bg-ivory px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {categories.length === 0 ? (
            <p className="text-slate">Vehicle categories will appear here once seeded.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category.id} className="border border-midnight/10 bg-white p-8">
                  <h2 className="font-serif text-2xl text-midnight">{category.name}</h2>
                  <p className="mt-3 text-sm text-slate">{category.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
