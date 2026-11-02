"use client";

import { useActionState } from "react";
import { sendContactMessageAction, type ContactActionState } from "./actions";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: ContactActionState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessageAction, initialState);

  if (state.success) {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        Thank you. Your message has been sent and we will reply shortly.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <FieldError>{state.error}</FieldError>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
