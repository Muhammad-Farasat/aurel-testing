import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Asymmetric image/content split. `imageSide` alternates the photo between
 * left and right across repeated uses of this component on one page, which
 * is what keeps a run of sections from reading as one repeated template.
 */
export function SplitFeature({
  imageSrc,
  imageAlt,
  imageSide = "left",
  tone = "light",
  eyebrow,
  title,
  children,
  aspect = "aspect-[4/5]",
}: {
  imageSrc: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  tone?: "light" | "dark";
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  aspect?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-2 lg:gap-16",
        imageSide === "right" && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div className={cn("relative overflow-hidden", aspect)}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        {eyebrow && (
          <p className={cn("text-xs uppercase tracking-[0.25em]", isDark ? "text-gold" : "text-slate")}>
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "mt-4 text-balance font-serif text-3xl sm:text-4xl",
            isDark ? "text-ivory" : "text-midnight",
          )}
        >
          {title}
        </h2>
        <div className={cn("mt-6 space-y-4 text-base leading-relaxed", isDark ? "text-ivory/70" : "text-slate")}>
          {children}
        </div>
      </div>
    </div>
  );
}
