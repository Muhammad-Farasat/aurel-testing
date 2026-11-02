import Image from "next/image";
import { Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * A full-width vehicle module: large photo with name overlaid at the bottom
 * edge (the Range Rover model-page pattern), then capacity/amenities/price
 * below in plain text. Every vehicle gets the same generous presentation
 * stacked down the page, rather than a side-by-side spec-sheet row.
 */
export function VehicleShowcase({
  imageSrc,
  categoryName,
  name,
  modelLine,
  description,
  passengerCapacity,
  luggageCapacity,
  amenities,
  startingPrice,
}: {
  imageSrc: string;
  categoryName: string;
  name: string;
  modelLine?: string;
  description: string;
  passengerCapacity: number;
  luggageCapacity: number;
  amenities: string[];
  startingPrice?: number | null;
}) {
  return (
    <div className="group">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_20%,_rgba(11,18,32,0.55)_55%,_rgba(11,18,32,0.95)_100%)]"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{categoryName}</p>
          <h2 className="mt-3 font-serif text-3xl text-ivory sm:text-4xl">{name}</h2>
          <span aria-hidden className="mt-3 block h-px w-12 bg-gold" />
          {modelLine && <p className="mt-3 text-sm text-ivory/60">{modelLine}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <div>
          <p className="max-w-xl text-slate">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-midnight">
            <span className="flex items-center gap-2">
              <Users className="size-4 text-gold" strokeWidth={1.75} />
              {passengerCapacity} passengers
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="size-4 text-gold" strokeWidth={1.75} />
              {luggageCapacity} luggage
            </span>
          </div>
          {amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {amenities.map((amenity) => (
                <Badge key={amenity} tone="neutral">
                  {amenity}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {startingPrice && (
          <p className="shrink-0 text-sm text-slate">
            Starting from{" "}
            <span className="font-serif text-2xl text-midnight">
              ${(startingPrice / 100).toFixed(0)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
