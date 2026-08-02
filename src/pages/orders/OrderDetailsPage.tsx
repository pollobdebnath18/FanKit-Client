import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaReceipt,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useOrder } from "../../hooks/useOrders";
import { formatBDT, formatDateTime } from "../../lib/format";
import { ORDER_FLOW, orderStatusLabel } from "../../lib/orderStatus";
import {
  OrderStatusBadge,
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "../../components/orders/Badges";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOrder(id);
  const order = data?.order;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6">
        <div className="mb-6 h-8 w-64 rounded bg-slate-200" />
        <div className="mb-6 h-24 rounded-2xl bg-slate-100" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 rounded-2xl bg-white lg:col-span-2" />
          <div className="h-64 rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-lg font-bold text-slate-900">Order not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          This order may have been removed or you don&apos;t have access to it.
        </p>
        <Link
          to="/orders"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Back to Orders
        </Link>
      </div>
    );
  }

  const flowIndex = ORDER_FLOW.indexOf(order.status);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        to="/orders"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline"
      >
        <FaArrowLeft className="text-xs" />
        Back to Orders
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A] md:text-3xl">
            Order {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Placed on {formatDateTime(order.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PaymentMethodBadge method={order.paymentMethod} />
          <PaymentStatusBadge status={order.paymentStatus} />
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Status timeline */}
      {order.status !== "cancelled" ? (
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            {ORDER_FLOW.map((step, index) => {
              const reached = index <= flowIndex;
              const isLast = index === ORDER_FLOW.length - 1;
              return (
                <div
                  key={step}
                  className={`flex items-center ${isLast ? "" : "flex-1"}`}
                >
                  <div className="flex flex-col items-center">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black ${
                        reached
                          ? "bg-[#2563EB] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </motion.span>
                    <span
                      className={`mt-2 text-[11px] font-semibold ${
                        reached ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {orderStatusLabel[step]}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`mx-2 mb-6 h-0.5 flex-1 rounded ${
                        index < flowIndex ? "bg-[#2563EB]" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
          This order has been cancelled.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
              <FaReceipt className="h-4 w-4 text-[#2563EB]" />
              Items
            </h2>
            <div className="divide-y divide-slate-50">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 py-3">
                  <img
                    src={item.image || "https://placehold.co/600x600?text=No+Image"}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 rounded-xl border border-slate-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/products/${item.productId}`}
                      className="line-clamp-1 text-sm font-bold text-slate-900 transition hover:text-[#1D4ED8]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.size ? `Size: ${item.size} · ` : ""}
                      {formatBDT(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    {formatBDT(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-dashed border-slate-200 pt-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">
                  {formatBDT(order.subtotal)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-semibold">
                    −{formatBDT(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-semibold">
                  {order.shipping === 0
                    ? "Free"
                    : formatBDT(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-3">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-lg font-black text-[#0B1F3A]">
                  {formatBDT(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <FaUser className="h-4 w-4 text-[#2563EB]" />
              Customer
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs text-slate-400">Full Name</dt>
                <dd className="font-semibold text-slate-800">
                  {order.customer?.fullName ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Email</dt>
                <dd className="break-all font-semibold text-slate-800">
                  {order.customer?.email ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Phone</dt>
                <dd className="font-semibold text-slate-800">
                  {order.customer?.phone ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <FaMapMarkerAlt className="h-4 w-4 text-[#2563EB]" />
              Shipping Address
            </h2>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-slate-600">
              <p>{order.shippingAddress?.address ?? "—"}</p>
              <p>
                {order.shippingAddress?.city ?? ""}
                {order.shippingAddress?.postalCode
                  ? `, ${order.shippingAddress.postalCode}`
                  : ""}
              </p>
              <p>{order.shippingAddress?.country ?? ""}</p>
            </address>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-base font-bold text-slate-900">Payment</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Method</dt>
                <dd className="font-semibold text-slate-800">
                  {order.paymentMethod}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Status</dt>
                <dd className="font-semibold text-slate-800">
                  {order.paymentStatus}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-400">Transaction</dt>
                <dd className="break-all font-mono text-xs font-semibold text-slate-800">
                  {order.transactionId ?? "—"}
                </dd>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-400">Tracking</dt>
                  <dd className="font-semibold text-slate-800">
                    {order.trackingNumber}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
