import type { Metadata } from "next";
import Image from "next/image";
import { asc, eq } from "drizzle-orm";
import { Users, Briefcase } from "lucide-react";
import { db } from "@/db/client";
import { vehicleCategories, vehicles } from "@/db/schema";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = { title: "Fleet" };

const VEHICLE_IMAGES: Record<string, string> = {
  business_class: MARKETING_IMAGES.businessClassVehicle,
  first_class: MARKETING_IMAGES.firstClassVehicle,
  luxury_suv: MARKETING_IMAGES.luxurySuv,
  luxury_van: MARKETING_IMAGES.luxuryVan,
};

async function getFleet() {
  return db
    .select({
      id: vehicles.id,
      name: vehicles.name,
      model: vehicles.model,
      year: vehicles.year,
      passengerCapacity: vehicles.passengerCapacity,
      luggageCapacity: vehicles.luggageCapacity,
      amenities: vehicles.amenities,
      startingPrice: vehicles.startingPrice,
      categoryKey: vehicleCategories.key,
      categoryName: vehicleCategories.name,
      categoryDescription: vehicleCategories.description,
    })
    .from(vehicles)
    .innerJoin(vehicleCategories, eq(vehicles.categoryId, vehicleCategories.id))
    .where(eq(vehicles.isActive, true))
    .orderBy(asc(vehicleCategories.sortOrder));
}

export default async function FleetPage() {
  const fleet = await getFleet();

  return (
    <>
      <section className="bg-midnight px-6 pt-40 pb-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Fleet</p>
          <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
            A vehicle for every occasion
          </h1>
          <p className="mt-6 max-w-xl text-ivory/70">
            Every vehicle is matched to its category by capacity and finish, not just badge value.
            Availability is confirmed at booking, so what you see here is what can actually be
            assigned to your trip.
          </p>
        </div>
      </section>

      <div className="bg-ivory">
        {fleet.length === 0 ? (
          <p className="mx-auto max-w-4xl px-6 py-20 text-slate">
            Vehicle categories will appear here once seeded.
          </p>
        ) : (
          fleet.map((vehicle, i) => (
            <section key={vehicle.id} className="border-t border-midnight/10 px-6 py-16 lg:px-12">
              <Reveal className="mx-auto max-w-6xl">
                <div
                  className={`grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={VEHICLE_IMAGES[vehicle.categoryKey] ?? MARKETING_IMAGES.businessClassVehicle}
                      alt={vehicle.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">
                      {vehicle.categoryName}
                    </p>
                    <h2 className="mt-4 font-serif text-3xl text-midnight sm:text-4xl">
                      {vehicle.name}
                    </h2>
                    {vehicle.model && (
                      <p className="mt-1 text-sm text-slate">
                        {vehicle.model}
                        {vehicle.year ? ` · ${vehicle.year}` : ""}
                      </p>
                    )}
                    <p className="mt-4 max-w-md text-slate">{vehicle.categoryDescription}</p>

                    <div className="mt-6 flex gap-8">
                      <div className="flex items-center gap-2 text-midnight">
                        <Users className="size-5 text-gold" strokeWidth={1.75} />
                        <span className="text-sm">{vehicle.passengerCapacity} passengers</span>
                      </div>
                      <div className="flex items-center gap-2 text-midnight">
                        <Briefcase className="size-5 text-gold" strokeWidth={1.75} />
                        <span className="text-sm">{vehicle.luggageCapacity} luggage</span>
                      </div>
                    </div>

                    {vehicle.amenities.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {vehicle.amenities.map((amenity) => (
                          <Badge key={amenity} tone="neutral">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {vehicle.startingPrice && (
                      <p className="mt-8 text-sm text-slate">
                        Starting from{" "}
                        <span className="font-serif text-xl text-midnight">
                          ${(vehicle.startingPrice / 100).toFixed(0)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </section>
          ))
        )}
      </div>
    </>
  );
}
