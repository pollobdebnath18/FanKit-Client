import {
  orderStatusBadge,
  orderStatusLabel,
  paymentMethodIcon,
  paymentMethodLabel,
  paymentStatusBadge,
  paymentStatusLabel,
} from "../../lib/orderStatus";
import type {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../lib/orderStatus";

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${orderStatusBadge[status] ?? orderStatusBadge.pending}`}
  >
    {orderStatusLabel[status] ?? status}
  </span>
);

export const PaymentStatusBadge = ({
  status,
}: {
  status: PaymentStatus;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${paymentStatusBadge[status] ?? paymentStatusBadge.pending}`}
  >
    {paymentStatusLabel[status] ?? status}
  </span>
);

export const PaymentMethodBadge = ({
  method,
}: {
  method: PaymentMethod;
}) => {
  const Icon = paymentMethodIcon[method] ?? paymentMethodIcon.stripe;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
      <Icon className="h-3.5 w-3.5" />
      {paymentMethodLabel[method] ?? method}
    </span>
  );
};
