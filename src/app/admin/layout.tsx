import { LayoutDashboard, Settings } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { DashboardShell, type DashboardNavItem } from "@/components/layout/dashboard-shell";

const NAV_ITEMS: DashboardNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("admin");

  return (
    <DashboardShell roleLabel="Administrator" navItems={NAV_ITEMS} userLabel={user.email ?? ""}>
      {children}
    </DashboardShell>
  );
}
