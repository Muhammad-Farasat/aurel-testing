import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getContactSettings } from "@/server/services/settings-service";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = { title: "Platform Settings" };

export default async function AdminSettingsPage() {
  await requireRole("admin");
  const contact = await getContactSettings();

  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate">Platform</p>
      <h1 className="mt-2 font-serif text-3xl text-midnight">Contact Settings</h1>
      <p className="mt-2 text-sm text-slate">
        These details power the public Contact page and customer-facing support information.
      </p>

      <section className="mt-8 rounded-sm border border-midnight/10 bg-white p-8">
        <SettingsForm initial={contact} />
      </section>
    </div>
  );
}
