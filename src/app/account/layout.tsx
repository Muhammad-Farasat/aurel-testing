import { LayoutDashboard, UserRound } from "lucide-react";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/db/client";
import { customerProfiles } from "@/db/schema";
import { DashboardShell, type DashboardNavItem } from "@/components/layout/dashboard-shell";

const NAV_ITEMS: DashboardNavItem[] = [
  { label: "Overview", href: "/account", icon: LayoutDashboard },
  { label: "Profile", href: "/account/profile", icon: UserRound },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("customer");
  const [profile] = await db
    .select()
    .from(customerProfiles)
    .where(eq(customerProfiles.userId, user.id))
    .limit(1);

  const userLabel = profile ? `${profile.firstName} ${profile.lastName}` : (user.email ?? "");

  return (
    <DashboardShell roleLabel="Customer" navItems={NAV_ITEMS} userLabel={userLabel}>
      {children}
    </DashboardShell>
  );
}
