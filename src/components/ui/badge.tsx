import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { BookingStatus, PaymentStatus } from "@/db/schema";

const badgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-midnight/5 text-midnight",
        gold: "bg-gold/15 text-[#8a6c35]",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
        info: "bg-sky-50 text-sky-700",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeStyles>) {
  return <span className={cn(badgeStyles({ tone }), className)} {...props} />;
}

const BOOKING_STATUS_TONE: Record<BookingStatus, VariantProps<typeof badgeStyles>["tone"]> = {
  pending_payment: "warning",
  payment_failed: "danger",
  confirmed: "info",
  assigned: "info",
  accepted: "info",
  en_route: "gold",
  arrived: "gold",
  onboard: "gold",
  completed: "success",
  cancelled: "neutral",
};

export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  pending_payment: "Pending Payment",
  payment_failed: "Payment Failed",
  confirmed: "Confirmed",
  assigned: "Chauffeur Assigned",
  accepted: "Accepted",
  en_route: "En Route to Pickup",
  arrived: "Arrived at Pickup",
  onboard: "Passenger On Board",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={BOOKING_STATUS_TONE[status]}>{BOOKING_STATUS_LABEL[status]}</Badge>;
}

const PAYMENT_STATUS_TONE: Record<PaymentStatus, VariantProps<typeof badgeStyles>["tone"]> = {
  pending: "warning",
  succeeded: "success",
  failed: "danger",
  refunded: "neutral",
  partially_refunded: "neutral",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: "Pending",
  succeeded: "Paid",
  failed: "Failed",
  refunded: "Refunded",
  partially_refunded: "Partially Refunded",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge tone={PAYMENT_STATUS_TONE[status]}>{PAYMENT_STATUS_LABEL[status]}</Badge>;
}
