import type { Metadata } from "next";
import { Users, CarFront, UserCheck, ReceiptText } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { getAdminOverviewStats } from "@/server/services/admin-stats-service";

export const metadata: Metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  await requireRole("admin");
  const stats = await getAdminOverviewStats();

  return (
    <div className="max-w-5xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate">Business Overview</p>
      <h1 className="mt-2 font-serif text-3xl text-midnight">Dashboard</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Customers" value={stats.customerCount.toString()} />
        <StatCard
          icon={UserCheck}
          label="Chauffeurs (available)"
          value={`${stats.activeChauffeurCount} / ${stats.chauffeurCount}`}
        />
        <StatCard icon={CarFront} label="Active vehicles" value={stats.vehicleCount.toString()} />
        <StatCard icon={ReceiptText} label="Bookings this month" value={stats.totalBookings.toString()} />
      </div>

      <div className="mt-10 rounded-sm border border-midnight/10 bg-white p-8 text-center">
        <p className="font-serif text-xl text-midnight">No bookings yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate">
          Booking, fleet, chauffeur, and pricing management land in later phases of this build.
          This overview already reflects real seeded data from the database.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-midnight/10 bg-white p-6">
      <Icon className="size-5 text-gold" strokeWidth={1.75} />
      <p className="mt-4 text-xs uppercase tracking-wider text-slate">{label}</p>
      <p className="mt-1 font-serif text-xl text-midnight">{value}</p>
    </div>
  );
}
