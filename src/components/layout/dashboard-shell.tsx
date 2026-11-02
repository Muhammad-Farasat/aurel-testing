import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function DashboardShell({
  roleLabel,
  navItems,
  userLabel,
  children,
}: {
  roleLabel: string;
  navItems: DashboardNavItem[];
  userLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f5ef] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col justify-between border-b border-midnight/10 bg-midnight px-6 py-8 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div>
          <Link href="/" className="font-serif text-xl tracking-wide text-ivory">
            AUREL
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold">{roleLabel}</p>

          <nav className="mt-10 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-ivory/80 transition-colors",
                  "hover:bg-ivory/5 hover:text-ivory",
                )}
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-ivory/10 pt-6">
          <p className="truncate text-sm text-ivory/70">{userLabel}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-3 flex items-center gap-2 text-sm text-slate hover:text-gold"
            >
              <LogOut className="size-4" strokeWidth={1.75} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="px-6 py-10 sm:px-10 lg:py-12">{children}</main>
    </div>
  );
}
