import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { CalendarClock, CarFront, Trophy } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/db/client";
import { customerProfiles } from "@/db/schema";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountOverviewPage() {
  const user = await requireRole("customer");
  const [profile] = await db
    .select()
    .from(customerProfiles)
    .where(eq(customerProfiles.userId, user.id))
    .limit(1);

  return (
    <div className="max-w-4xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate">Welcome back</p>
      <h1 className="mt-2 font-serif text-3xl text-midnight">
        {profile ? profile.firstName : "there"}
      </h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarClock} label="Upcoming booking" value="None scheduled" />
        <StatCard icon={CarFront} label="Completed rides" value="0" />
        <StatCard icon={Trophy} label="Member since" value={new Date().getFullYear().toString()} />
      </div>

      <div className="mt-10 rounded-sm border border-midnight/10 bg-white p-8 text-center">
        <p className="font-serif text-xl text-midnight">No bookings yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
          When you reserve a chauffeur, your upcoming and past trips will appear here.
        </p>
        <Button href="/" className="mt-6">
          Book a Chauffeur
        </Button>
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
