"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { setChauffeurAvailability } from "@/server/services/chauffeur-service";

export async function setAvailabilityAction(isAvailable: boolean) {
  const user = await requireRole("chauffeur");
  await setChauffeurAvailability(user.id, isAvailable);
  revalidatePath("/chauffeur/profile");
  revalidatePath("/chauffeur");
}
