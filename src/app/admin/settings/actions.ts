"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { updateContactSettings } from "@/server/services/settings-service";
import { contactSettingsSchema } from "@/lib/validation/settings";

export type SettingsActionState = { error?: string; success?: string };

export async function updateContactSettingsAction(
  _prevState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  await requireRole("admin");

  const parsed = contactSettingsSchema.safeParse({
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    businessAddress: formData.get("businessAddress"),
    supportHours: formData.get("supportHours"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await updateContactSettings(parsed.data);
  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  return { success: "Contact details updated." };
}
