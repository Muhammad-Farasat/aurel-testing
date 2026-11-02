import { boolean, index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { users } from "./users";

/**
 * Known notification types. Kept as an app-level union rather than a DB enum
 * so new notification kinds don't require a migration.
 */
export const NOTIFICATION_TYPES = [
  "booking_confirmed",
  "payment_succeeded",
  "payment_failed",
  "chauffeur_assigned",
  "booking_updated",
  "booking_cancelled",
  "refund_processed",
  "assignment_changed",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull().$type<NotificationType>(),
    title: varchar("title", { length: 160 }).notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").notNull().default(false),
    relatedBookingId: uuid("related_booking_id").references(() => bookings.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("notifications_user_idx").on(table.userId, table.isRead)],
);
