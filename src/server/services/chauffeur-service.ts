import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { chauffeurProfiles } from "@/db/schema";

export async function getChauffeurProfile(userId: string) {
  const [profile] = await db
    .select()
    .from(chauffeurProfiles)
    .where(eq(chauffeurProfiles.userId, userId))
    .limit(1);
  return profile ?? null;
}

export async function setChauffeurAvailability(userId: string, isAvailable: boolean) {
  await db
    .update(chauffeurProfiles)
    .set({ isAvailable, updatedAt: new Date() })
    .where(eq(chauffeurProfiles.userId, userId));
}
