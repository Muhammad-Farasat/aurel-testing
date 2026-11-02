import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/db/client";
import { siteSettings, SITE_SETTING_KEYS } from "@/db/schema";

export type ContactSettings = {
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  supportHours: string;
};

const DEFAULTS: ContactSettings = {
  contactEmail: "concierge@aurel.example",
  contactPhone: "+1 (555) 010-0100",
  businessAddress: "",
  supportHours: "24/7",
};

export async function getContactSettings(): Promise<ContactSettings> {
  const rows = await db.select().from(siteSettings);
  const map = new Map(rows.map((r) => [r.key, r.value]));

  return {
    contactEmail: map.get(SITE_SETTING_KEYS.contactEmail) ?? DEFAULTS.contactEmail,
    contactPhone: map.get(SITE_SETTING_KEYS.contactPhone) ?? DEFAULTS.contactPhone,
    businessAddress: map.get(SITE_SETTING_KEYS.businessAddress) ?? DEFAULTS.businessAddress,
    supportHours: map.get(SITE_SETTING_KEYS.supportHours) ?? DEFAULTS.supportHours,
  };
}

export async function updateContactSettings(input: ContactSettings) {
  const now = new Date();
  await db
    .insert(siteSettings)
    .values([
      { key: SITE_SETTING_KEYS.contactEmail, value: input.contactEmail, updatedAt: now },
      { key: SITE_SETTING_KEYS.contactPhone, value: input.contactPhone, updatedAt: now },
      { key: SITE_SETTING_KEYS.businessAddress, value: input.businessAddress, updatedAt: now },
      { key: SITE_SETTING_KEYS.supportHours, value: input.supportHours, updatedAt: now },
    ])
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: sql`excluded.value`, updatedAt: sql`excluded.updated_at` },
    });
}
