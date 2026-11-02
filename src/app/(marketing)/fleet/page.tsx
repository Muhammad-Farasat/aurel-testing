import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { vehicleCategories, vehicles } from "@/db/schema";
import { Reveal } from "@/components/ui/reveal";
import { VehicleShowcase } from "@/components/marketing/vehicle-showcase";
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
          fleet.map((vehicle) => (
            <section key={vehicle.id} className="border-t border-midnight/10">
              <Reveal>
                <VehicleShowcase
                  imageSrc={VEHICLE_IMAGES[vehicle.categoryKey] ?? MARKETING_IMAGES.businessClassVehicle}
                  categoryName={vehicle.categoryName}
                  name={vehicle.name}
                  modelLine={[vehicle.model, vehicle.year?.toString()].filter(Boolean).join(" · ")}
                  description={vehicle.categoryDescription}
                  passengerCapacity={vehicle.passengerCapacity}
                  luggageCapacity={vehicle.luggageCapacity}
                  amenities={vehicle.amenities}
                  startingPrice={vehicle.startingPrice}
                />
              </Reveal>
            </section>
          ))
        )}
      </div>
    </>
  );
}
