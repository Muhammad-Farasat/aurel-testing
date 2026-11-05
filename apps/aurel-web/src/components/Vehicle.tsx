import type { CSSProperties } from "react";
import { getTier, type TierId } from "../config/tiers";

/**
 * PLACEHOLDER IMAGERY. The four vehicle pictures in /public/vehicles are
 * AI-generated renders (Figma generate_image, 2026-11-05), cut out from a
 * studio ground. They stand in until the owner answers the imagery question
 * and the fleet is photographed (DESIGN_DIRECTION.md, Imagery). They show
 * generic body shapes with no badges; they are not AUREL's actual cars.
 *
 * All four face left, side-on, lit the same way, so any tier can replace any
 * other without the layout moving.
 */
export const vehicleImage: Record<TierId, { src: string; w: number; h: number }> = {
  business: { src: "/vehicles/business", w: 1402, h: 448 },
  first: { src: "/vehicles/first", w: 1413, h: 427 },
  suv: { src: "/vehicles/suv", w: 1365, h: 514 },
  van: { src: "/vehicles/van", w: 1411, h: 552 },
};

export function Vehicle({
  tier,
  sizes = "(min-width: 1100px) 60vw, 100vw",
  className,
  style,
  priority = false,
  decorative = false,
}: {
  tier: TierId;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** True when a nearby heading already names the tier. */
  decorative?: boolean;
}) {
  const img = vehicleImage[tier];
  const name = getTier(tier)?.name ?? "";
  return (
    <img
      className={["vehicle", className ?? ""].filter(Boolean).join(" ")}
      style={style}
      src={`${img.src}-1600.webp`}
      srcSet={`${img.src}-800.webp 800w, ${img.src}-1600.webp ${img.w}w`}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={decorative ? "" : `${name}, side view. Placeholder image.`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      data-placeholder="ai-generated"
    />
  );
}
