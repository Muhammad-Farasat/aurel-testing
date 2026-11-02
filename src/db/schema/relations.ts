import { relations } from "drizzle-orm";
import { bookingAssignmentLogs, bookings } from "./bookings";
import { customerProfiles, chauffeurProfiles, users } from "./users";
import { vehicleCategories, vehicles } from "./vehicles";
import { payments, refunds } from "./payments";
import { reviews } from "./reviews";
import { notifications } from "./notifications";

export const usersRelations = relations(users, ({ one, many }) => ({
  customerProfile: one(customerProfiles, {
    fields: [users.id],
    references: [customerProfiles.userId],
  }),
  chauffeurProfile: one(chauffeurProfiles, {
    fields: [users.id],
    references: [chauffeurProfiles.userId],
  }),
  bookingsAsCustomer: many(bookings, { relationName: "customerBookings" }),
  bookingsAsChauffeur: many(bookings, { relationName: "chauffeurBookings" }),
  notifications: many(notifications),
}));

export const customerProfilesRelations = relations(customerProfiles, ({ one }) => ({
  user: one(users, { fields: [customerProfiles.userId], references: [users.id] }),
}));

export const chauffeurProfilesRelations = relations(chauffeurProfiles, ({ one }) => ({
  user: one(users, { fields: [chauffeurProfiles.userId], references: [users.id] }),
}));

export const vehicleCategoriesRelations = relations(vehicleCategories, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  category: one(vehicleCategories, {
    fields: [vehicles.categoryId],
    references: [vehicleCategories.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  customer: one(users, {
    fields: [bookings.customerId],
    references: [users.id],
    relationName: "customerBookings",
  }),
  chauffeur: one(users, {
    fields: [bookings.chauffeurId],
    references: [users.id],
    relationName: "chauffeurBookings",
  }),
  vehicle: one(vehicles, { fields: [bookings.vehicleId], references: [vehicles.id] }),
  vehicleCategory: one(vehicleCategories, {
    fields: [bookings.vehicleCategoryId],
    references: [vehicleCategories.id],
  }),
  assignmentLogs: many(bookingAssignmentLogs),
  payments: many(payments),
  refunds: many(refunds),
  review: one(reviews, { fields: [bookings.id], references: [reviews.bookingId] }),
}));

export const bookingAssignmentLogsRelations = relations(bookingAssignmentLogs, ({ one }) => ({
  booking: one(bookings, { fields: [bookingAssignmentLogs.bookingId], references: [bookings.id] }),
}));

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  booking: one(bookings, { fields: [payments.bookingId], references: [bookings.id] }),
  refunds: many(refunds),
}));

export const refundsRelations = relations(refunds, ({ one }) => ({
  payment: one(payments, { fields: [refunds.paymentId], references: [payments.id] }),
  booking: one(bookings, { fields: [refunds.bookingId], references: [bookings.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, { fields: [reviews.bookingId], references: [bookings.id] }),
  customer: one(users, { fields: [reviews.customerId], references: [users.id] }),
  chauffeur: one(users, { fields: [reviews.chauffeurId], references: [users.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
  relatedBooking: one(bookings, {
    fields: [notifications.relatedBookingId],
    references: [bookings.id],
  }),
}));
