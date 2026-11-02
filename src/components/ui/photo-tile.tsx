import Image from "next/image";
import Link from "next/link";

/**
 * A full-bleed photographic tile: image, bottom gradient scrim, name with a
 * drawn rule beneath it, one line of copy. No numeral, no icon, no card
 * border — the device real premium sites (Wheely, Range Rover) use in place
 * of a numbered list or spec-sheet grid. Proportions vary by `aspect` so a
 * row of tiles doesn't read as identical boxes.
 */
export function PhotoTile({
  href,
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  aspect = "aspect-[4/5]",
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
  aspect?: string;
}) {
  return (
    <Link href={href} className={`group relative block overflow-hidden ${aspect}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_20%,_rgba(11,18,32,0.55)_55%,_rgba(11,18,32,0.95)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)] sm:p-8">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        )}
        <h3 className="mt-3 font-serif text-2xl text-ivory sm:text-3xl">{title}</h3>
        <span aria-hidden className="mt-3 block h-px w-10 bg-gold" />
        <p className="mt-3 max-w-sm text-sm text-ivory/75">{description}</p>
      </div>
    </Link>
  );
}
