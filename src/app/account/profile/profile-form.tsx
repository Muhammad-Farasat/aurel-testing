"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileActionState } from "./actions";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: ProfileActionState = {};

export function ProfileForm({
  initial,
}: {
  initial: { firstName: string; lastName: string; phone: string; email: string };
}) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" defaultValue={initial.firstName} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" defaultValue={initial.lastName} required />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={initial.email} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" defaultValue={initial.phone} required />
      </div>
      <FieldError>{state.error}</FieldError>
      {state.success && <p className="text-xs text-emerald-700">{state.success}</p>}
      <Button type="submit" variant="dark" disabled={isPending}>
        {isPending ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
