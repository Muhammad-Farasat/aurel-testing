import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["customer", "chauffeur", "admin"]);

export const serviceTypeEnum = pgEnum("service_type", [
  "point_to_point",
  "airport_transfer",
  "hourly",
  "full_day",
]);

// Single status field drives the customer, chauffeur, and admin views of a
// booking's lifecycle. The chauffeur-facing steps (assigned..completed) are a
// subsequence of this list.
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending_payment",
  "payment_failed",
  "confirmed",
  "assigned",
  "accepted",
  "en_route",
  "arrived",
  "onboard",
  "completed",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
  "partially_refunded",
]);

export const refundStatusEnum = pgEnum("refund_status", [
  "pending",
  "approved",
  "rejected",
  "processed",
]);

export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type ServiceType = (typeof serviceTypeEnum.enumValues)[number];
export type BookingStatus = (typeof bookingStatusEnum.enumValues)[number];
export type PaymentStatus = (typeof paymentStatusEnum.enumValues)[number];
export type RefundStatus = (typeof refundStatusEnum.enumValues)[number];
