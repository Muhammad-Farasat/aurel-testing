import { boolean, numeric, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { serviceTypeEnum } from "./enums";
import { vehicleCategories } from "./vehicles";

/**
 * A pricing rule applies to a service type, either globally (vehicleCategoryId
 * is null, carrying the shared base rates) or scoped to one category (carrying
 * that category's multiplier). A quote looks up the active global rule for the
 * service type and the active category rule for the chosen vehicle, then
 * applies the multiplier on top of the base rates. Rows are never edited after
 * a booking snapshots its price — admins deactivate a rule and insert a new
 * one, so historical bookings keep referencing the breakdown stored on them.
 */
export const pricingRules = pgTable("pricing_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  serviceType: serviceTypeEnum("service_type").notNull(),
  vehicleCategoryId: uuid("vehicle_category_id").references(() => vehicleCategories.id, {
    onDelete: "cascade",
  }),
  baseFare: numeric("base_fare", { precision: 10, scale: 2 }).notNull().default("0"),
  perKmRate: numeric("per_km_rate", { precision: 10, scale: 2 }).notNull().default("0"),
  perMinuteWaitingRate: numeric("per_minute_waiting_rate", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }).notNull().default("0"),
  fullDayRate: numeric("full_day_rate", { precision: 10, scale: 2 }).notNull().default("0"),
  airportFee: numeric("airport_fee", { precision: 10, scale: 2 }).notNull().default("0"),
  categoryMultiplier: numeric("category_multiplier", { precision: 5, scale: 2 })
    .notNull()
    .default("1"),
  taxPercent: numeric("tax_percent", { precision: 5, scale: 2 }).notNull().default("0"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  isActive: boolean("is_active").notNull().default(true),
  effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
