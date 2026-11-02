"use server";

import { registerSchema } from "@/lib/validation/auth";
import { createCustomerUser, EmailAlreadyRegisteredError } from "@/server/services/user-service";
import { signIn } from "@/lib/auth";

export type RegisterActionState = {
  error?: string;
  fieldErrors?: Partial<Record<keyof typeof registerSchema.shape, string>>;
};

export async function registerAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: RegisterActionState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof registerSchema.shape;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  try {
    await createCustomerUser(parsed.data);
  } catch (error) {
    if (error instanceof EmailAlreadyRegisteredError) {
      return { fieldErrors: { email: error.message } };
    }
    return { error: "Something went wrong. Please try again." };
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/account",
  });

  return {};
}
