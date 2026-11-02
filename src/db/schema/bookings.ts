import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { bookingStatusEnum, serviceTypeEnum } from "./enums";
import { users } from "./users";
import { vehicleCategories, vehicles } from "./vehicles";

export type PriceBreakdown = {
  baseFare: number;
  distanceCharge: number;
  hourlyCharge: number;
  fullDayCharge: number;
  airportFee: number;
  waitingCharge: number;
  categoryMultiplier: number;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
  currency: string;
};

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingReference: varchar("booking_reference", { length: 20 }).notNull().unique(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    serviceType: serviceTypeEnum("service_type").notNull(),

    pickupAddress: text("pickup_address").notNull(),
    pickupLat: numeric("pickup_lat", { precision: 10, scale: 7 }),
    pickupLng: numeric("pickup_lng", { precision: 10, scale: 7 }),
    destinationAddress: text("destination_address"),
    destinationLat: numeric("destination_lat", { precision: 10, scale: 7 }),
    destinationLng: numeric("destination_lng", { precision: 10, scale: 7 }),

    pickupAt: timestamp("pickup_at", { withTimezone: true }).notNull(),
    durationHours: integer("duration_hours"),

    passengerCount: integer("passenger_count").notNull(),
    luggageCount: integer("luggage_count").notNull().default(0),
    specialInstructions: text("special_instructions"),

    flightNumber: varchar("flight_number", { length: 32 }),
    airline: varchar("airline", { length: 120 }),
    flightDetails: varchar("flight_details", { length: 255 }),
    meetAndGreet: boolean("meet_and_greet").notNull().default(false),

    vehicleCategoryId: uuid("vehicle_category_id")
      .notNull()
      .references(() => vehicleCategories.id, { onDelete: "restrict" }),
    vehicleId: uuid("vehicle_id").references(() => vehicles.id, { onDelete: "set null" }),
    chauffeurId: uuid("chauffeur_id").references(() => users.id, { onDelete: "set null" }),

    distanceKm: numeric("distance_km", { precision: 8, scale: 2 }),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),

    status: bookingStatusEnum("status").notNull().default("pending_payment"),
    /** Immutable snapshot of the price calculation at confirmation time. */
    priceBreakdown: jsonb("price_breakdown").$type<PriceBreakdown>().notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),

    customerName: varchar("customer_name", { length: 160 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 32 }).notNull(),

    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    cancellationReason: varchar("cancellation_reason", { length: 500 }),
    cancelledBy: uuid("cancelled_by").references(() => users.id, { onDelete: "set null" }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("bookings_customer_idx").on(table.customerId),
    index("bookings_chauffeur_idx").on(table.chauffeurId),
    index("bookings_vehicle_idx").on(table.vehicleId),
    index("bookings_status_idx").on(table.status),
    index("bookings_pickup_at_idx").on(table.pickupAt),
  ],
);

/** Audit trail of chauffeur/vehicle assignment changes for a booking. */
export const bookingAssignmentLogs = pgTable(
  "booking_assignment_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    chauffeurId: uuid("chauffeur_id").references(() => users.id, { onDelete: "set null" }),
    vehicleId: uuid("vehicle_id").references(() => vehicles.id, { onDelete: "set null" }),
    action: varchar("action", { length: 32 }).notNull(),
    performedBy: uuid("performed_by").references(() => users.id, { onDelete: "set null" }),
    notes: varchar("notes", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("booking_assignment_logs_booking_idx").on(table.bookingId)],
);
