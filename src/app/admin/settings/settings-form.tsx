"use client";

import { useActionState } from "react";
import { updateContactSettingsAction, type SettingsActionState } from "./actions";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ContactSettings } from "@/server/services/settings-service";

const initialState: SettingsActionState = {};

export function SettingsForm({ initial }: { initial: ContactSettings }) {
  const [state, formAction, isPending] = useActionState(updateContactSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="contactEmail">Support email</Label>
        <Input id="contactEmail" name="contactEmail" type="email" defaultValue={initial.contactEmail} required />
      </div>
      <div>
        <Label htmlFor="contactPhone">Support phone</Label>
        <Input id="contactPhone" name="contactPhone" type="tel" defaultValue={initial.contactPhone} required />
      </div>
      <div>
        <Label htmlFor="businessAddress">Business address</Label>
        <Textarea id="businessAddress" name="businessAddress" rows={3} defaultValue={initial.businessAddress} />
      </div>
      <div>
        <Label htmlFor="supportHours">Support hours</Label>
        <Input id="supportHours" name="supportHours" defaultValue={initial.supportHours} />
      </div>
      <FieldError>{state.error}</FieldError>
      {state.success && <p className="text-xs text-emerald-700">{state.success}</p>}
      <Button type="submit" variant="dark" disabled={isPending}>
        {isPending ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
