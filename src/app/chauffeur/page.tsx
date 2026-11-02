import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/db/client";
import { chauffeurProfiles } from "@/db/schema";

export const metadata: Metadata = { title: "Chauffeur Dashboard" };

export default async function ChauffeurOverviewPage() {
  const user = await requireRole("chauffeur");
  const [profile] = await db
    .select()
    .from(chauffeurProfiles)
    .where(eq(chauffeurProfiles.userId, user.id))
    .limit(1);

  return (
    <div className="max-w-4xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate">Today</p>
      <h1 className="mt-2 font-serif text-3xl text-midnight">
        {profile ? `Welcome, ${profile.firstName}` : "Welcome"}
      </h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarClock} label="Today's assignments" value="0" />
        <StatCard icon={Clock} label="Upcoming bookings" value="0" />
        <StatCard icon={CheckCircle2} label="Completed bookings" value="0" />
      </div>

      <div className="mt-10 rounded-sm border border-midnight/10 bg-white p-8 text-center">
        <p className="font-serif text-xl text-midnight">No assignments yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
          Assigned bookings will appear here once dispatch assigns you a trip.
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
