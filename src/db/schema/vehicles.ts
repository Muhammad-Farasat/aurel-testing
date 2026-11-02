import { boolean, integer, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const vehicleCategories = pgTable("vehicle_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => vehicleCategories.id, { onDelete: "restrict" }),
  name: varchar("name", { length: 160 }).notNull(),
  model: varchar("model", { length: 160 }),
  year: integer("year"),
  licensePlate: varchar("license_plate", { length: 32 }).unique(),
  passengerCapacity: integer("passenger_capacity").notNull(),
  luggageCapacity: integer("luggage_capacity").notNull(),
  imageUrl: varchar("image_url", { length: 512 }),
  /** Short amenity labels, e.g. ["Wi-Fi", "Water", "Charging ports"]. */
  amenities: jsonb("amenities").$type<string[]>().notNull().default([]),
  startingPrice: integer("starting_price_cents"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
