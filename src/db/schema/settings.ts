import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** Admin-configurable key/value settings (contact details, support info, ...). */
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const SITE_SETTING_KEYS = {
  contactEmail: "contact_email",
  contactPhone: "contact_phone",
  businessAddress: "business_address",
  supportHours: "support_hours",
} as const;
