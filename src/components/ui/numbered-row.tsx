import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NumberedRowProps = {
  index: string;
  title: string;
  description: string;
  meta?: string;
  href?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
};

/**
 * A full-width editorial row: large numeral, title, description, optional
 * meta and link. The recurring device used for services, the booking
 * process, and "why AUREL" instead of repeating a card grid.
 */
export function NumberedRow({
  index,
  title,
  description,
  meta,
  href,
  tone = "light",
  children,
}: NumberedRowProps) {
  const isDark = tone === "dark";
  const content = (
    <div
      className={cn(
        "group grid grid-cols-[auto_1fr] items-start gap-6 border-t py-10 transition-colors sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-10",
        isDark ? "border-ivory/10" : "border-midnight/10",
        href && (isDark ? "hover:bg-ivory/5" : "hover:bg-midnight/5"),
      )}
    >
      <span className={cn("font-serif text-2xl tabular-nums", isDark ? "text-gold" : "text-gold")}>
        {index}
      </span>

      <div>
        <h3 className={cn("font-serif text-2xl sm:text-3xl", isDark ? "text-ivory" : "text-midnight")}>
          {title}
        </h3>
        <p className={cn("mt-2 max-w-xl text-sm sm:text-base", isDark ? "text-ivory/60" : "text-slate")}>
          {description}
        </p>
        {children}
      </div>

      <div className="col-span-2 flex items-center gap-3 sm:col-span-1 sm:flex-col sm:items-end sm:gap-2">
        {meta && (
          <span
            className={cn(
              "text-xs uppercase tracking-wider",
              isDark ? "text-ivory/50" : "text-slate",
            )}
          >
            {meta}
          </span>
        )}
        {href && (
          <ArrowRight
            className={cn(
              "size-5 shrink-0 transition-transform group-hover:translate-x-1",
              isDark ? "text-gold" : "text-gold",
            )}
            strokeWidth={1.75}
          />
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
