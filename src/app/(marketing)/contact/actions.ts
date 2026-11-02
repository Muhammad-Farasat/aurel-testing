"use server";

import { contactMessageSchema } from "@/lib/validation/contact";
import { getContactSettings } from "@/server/services/settings-service";
import { sendEmail } from "@/server/services/email-service";

export type ContactActionState = { error?: string; success?: boolean };

export async function sendContactMessageAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { contactEmail } = await getContactSettings();

  await sendEmail({
    to: contactEmail,
    subject: `New contact message from ${parsed.data.name}`,
    text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
  });

  return { success: true };
}
