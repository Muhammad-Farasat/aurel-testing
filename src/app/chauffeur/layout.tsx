import { LayoutDashboard, UserRound } from "lucide-react";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/db/client";
import { chauffeurProfiles } from "@/db/schema";
import { DashboardShell, type DashboardNavItem } from "@/components/layout/dashboard-shell";

const NAV_ITEMS: DashboardNavItem[] = [
  { label: "Overview", href: "/chauffeur", icon: LayoutDashboard },
  { label: "Profile", href: "/chauffeur/profile", icon: UserRound },
];

export default async function ChauffeurLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("chauffeur");
  const [profile] = await db
    .select()
    .from(chauffeurProfiles)
    .where(eq(chauffeurProfiles.userId, user.id))
    .limit(1);

  const userLabel = profile ? `${profile.firstName} ${profile.lastName}` : (user.email ?? "");

  return (
    <DashboardShell roleLabel="Chauffeur" navItems={NAV_ITEMS} userLabel={userLabel}>
      {children}
    </DashboardShell>
  );
}
