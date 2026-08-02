import type { ComponentType } from "react";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "cancelled";

export type PaymentMethod = "stripe" | "bkash" | "cash-on-delivery";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/** Tailwind badge classes per order status. */
export const orderStatusBadge: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  processing: "bg-blue-50 text-blue-700 ring-blue-200",
  shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  delivered: "bg-green-50 text-green-700 ring-green-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
};

/** Ordered timeline used on the order details page. */
export const ORDER_FLOW: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
];

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  pending: "Payment Pending",
  paid: "Paid",
  failed: "Payment Failed",
  cancelled: "Payment Cancelled",
};

export const paymentStatusBadge: Record<PaymentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
};

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  stripe: "Card (Stripe)",
  bkash: "bKash",
  "cash-on-delivery": "Cash on Delivery",
};

export const paymentMethodIcon: Record<PaymentMethod, ComponentType<{ className?: string }>> = {
  stripe: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.75 13.3c-.1.7-1.3 3.6-5.6 3.6-3.2 0-5.2-2.2-5.2-5.4 0-3.5 2.6-5.6 5.9-5.6 2.9 0 4.4 1.3 5 2.3l-2.2 1.4c-.4-.6-1.1-1.3-2.7-1.3-2 0-3.3 1.6-3.3 3.2 0 1.7 1.2 3.3 3.3 3.3 2 0 2.7-1.2 3-2.1l-3.2-.1v-2.5h6.1c.2.8.2 1.5.2 2.2z" />
    </svg>
  ),
  bkash: (props) => (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zm0 4c15.5 0 28 12.5 28 28S47.5 60 32 60 4 47.5 4 32 16.5 4 32 4zm-1.2 9.8c-4.6.7-8 4.1-8.7 8.7-.6 3.8 1 7.6 4.1 9.9.2.2.4.4.6.5-.1 2.4-2.1 4.3-4.5 4.3h-.6c-2.7-.1-4.9-2.2-5.1-4.9h-2.2c.2 4 3.3 7.1 7.3 7.3h.5c3.9 0 7-3.1 7-7v-11c0-1.1.9-2 2-2h1.2c.2-2.2-1.5-4.1-3.8-4.3l-1.1-.1zm-3.3 8.2h.9c.6 0 1 .4 1 1v6.3c0 .6-.4 1-1 1h-.9c-1.1 0-2-.9-2-2v-4.3c0-1.1.9-2 2-2z" />
    </svg>
  ),
  "cash-on-delivery": (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm7-3h-2v-2h2v2z" />
    </svg>
  ),
};
