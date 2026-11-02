"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { updateProfileSchema, changePasswordSchema } from "@/lib/validation/profile";
import {
  updateCustomerProfile,
  changePassword,
  EmailAlreadyRegisteredError,
  IncorrectPasswordError,
} from "@/server/services/user-service";

export type ProfileActionState = { error?: string; success?: string };

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireRole("customer");

  const parsed = updateProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await updateCustomerProfile(user.id, parsed.data);
  } catch (error) {
    if (error instanceof EmailAlreadyRegisteredError) {
      return { error: error.message };
    }
    return { error: "Could not update your profile. Please try again." };
  }

  revalidatePath("/account/profile");
  revalidatePath("/account");
  return { success: "Profile updated." };
}

export async function changePasswordAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireRole("customer");

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await changePassword(user.id, parsed.data);
  } catch (error) {
    if (error instanceof IncorrectPasswordError) {
      return { error: error.message };
    }
    return { error: "Could not change your password. Please try again." };
  }

  return { success: "Password updated." };
}
