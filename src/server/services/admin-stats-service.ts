import "server-only";
import { count, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { chauffeurProfiles, users, vehicles } from "@/db/schema";

export async function getAdminOverviewStats() {
  const [[{ value: customerCount }], [{ value: chauffeurCount }], [{ value: activeChauffeurCount }], [{ value: vehicleCount }]] =
    await Promise.all([
      db.select({ value: count() }).from(users).where(eq(users.role, "customer")),
      db.select({ value: count() }).from(users).where(eq(users.role, "chauffeur")),
      db
        .select({ value: count() })
        .from(chauffeurProfiles)
        .where(eq(chauffeurProfiles.isAvailable, true)),
      db.select({ value: count() }).from(vehicles).where(eq(vehicles.isActive, true)),
    ]);

  return {
    totalBookings: 0,
    revenue: 0,
    completedBookings: 0,
    pendingBookings: 0,
    customerCount,
    chauffeurCount,
    activeChauffeurCount,
    vehicleCount,
  };
}
