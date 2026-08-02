import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaBoxOpen,
  FaEllipsisV,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import { OrdersAPI, type Order } from "../../api/orders.api";
import { useAllOrders } from "../../hooks/useOrders";
import { formatBDT, formatDateTime } from "../../lib/format";
import {
  ORDER_STATUSES,
  orderStatusLabel,
  paymentMethodLabel,
  paymentStatusLabel,
} from "../../lib/orderStatus";
import type { OrderStatus } from "../../lib/orderStatus";
import { useToast } from "../../lib/toast-context";

const statCards = [
  {
    key: "total",
    label: "Total Orders",
    color: "text-slate-500",
    bg: "bg-slate-50",
    icon: "📊",
  },
  {
    key: "pending",
    label: "Pending",
    color: "text-amber-500",
    bg: "bg-amber-50",
    icon: <FaClock />,
  },
  {
    key: "paid",
    label: "Paid",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: <FaCheckCircle />,
  },
  {
    key: "shipped",
    label: "Shipped",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    icon: <FaTruck />,
  },
  {
    key: "delivered",
    label: "Delivered",
    color: "text-green-500",
    bg: "bg-green-50",
    icon: <FaCheckCircle />,
  },
] as const;

const statusDot: Record<OrderStatus, string> = {
  pending: "bg-amber-400",
  paid: "bg-emerald-500",
  processing: "bg-blue-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const Orders = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data, isLoading, isError } = useAllOrders();
  const orders = useMemo(() => data?.orders ?? [], [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState("");

  const stats = useMemo(() => {
    const count = (status: OrderStatus) =>
      orders.filter((o) => o.status === status).length;
    return {
      total: orders.length,
      pending: count("pending"),
      paid: count("paid"),
      shipped: count("shipped"),
      delivered: count("delivered"),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesFilter =
        statusFilter === "All" || order.status === statusFilter;
      const matchesSearch =
        !term ||
        order.orderNumber.toLowerCase().includes(term) ||
        order.customer?.fullName?.toLowerCase().includes(term) ||
        order.customer?.email?.toLowerCase().includes(term) ||
        order.items.some((item) => item.title.toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["orders"] });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      OrdersAPI.updateStatus(id, status),
    onSuccess: (res) => {
      toast.success(res.message);
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
    onSettled: () => setActiveMenuId(null),
  });

  const trackingMutation = useMutation({
    mutationFn: ({
      id,
      trackingNumber,
    }: {
      id: string;
      trackingNumber: string;
    }) => OrdersAPI.updateTracking(id, trackingNumber),
    onSuccess: (res) => {
      toast.success(res.message);
      invalidate();
      setViewOrder(null);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const openView = (order: Order) => {
    setViewOrder(order);
    setTrackingInput(order.trackingNumber ?? "");
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">
          Manage Orders
        </h2>
        <p className="mt-1 text-slate-500">
          Track, filter and update customer orders and payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-xs"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.label}
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {stats[card.key]}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center text-sm font-bold ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
          <input
            type="text"
            placeholder="Search by order no, customer, email, product…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-[#F5A623] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <FaFilter className="text-xs text-slate-400" />
          <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {(["All", ...ORDER_STATUSES] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                  statusFilter === status
                    ? "bg-[#0B1F3A] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status === "All" ? "All" : orderStatusLabel[status]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : isError ? (
          <p className="py-12 text-center text-slate-400">
            Failed to load orders. Please try again later.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400">
                  <th className="pb-3 pl-2">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Products</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 pl-2 font-mono text-xs font-bold text-[#0B1F3A]">
                        {order.orderNumber}
                      </td>
                      <td className="py-4">
                        <p className="font-bold text-slate-900">
                          {order.customer?.fullName ?? "—"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {order.customer?.email ?? ""}
                        </p>
                      </td>
                      <td className="max-w-[180px] py-4">
                        <p className="line-clamp-1 font-medium">
                          {order.items[0]?.title}
                          {order.items.length > 1 && (
                            <span className="text-slate-400">
                              {" "}
                              +{order.items.length - 1}
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="py-4 font-semibold text-slate-900">
                        {formatBDT(order.total)}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-semibold capitalize text-slate-700">
                            {paymentMethodLabel[order.paymentMethod] ??
                              order.paymentMethod}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {paymentStatusLabel[order.paymentStatus] ??
                              order.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                            order.status === "cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusDot[order.status]}`}
                          />
                          {orderStatusLabel[order.status] ?? order.status}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-slate-500">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="relative py-4 pr-2 text-right">
                        <button
                          onClick={() => setActiveMenuId(order._id)}
                          className="p-2 text-slate-400 transition hover:bg-slate-50 hover:text-[#0B1F3A]"
                          aria-label="Order actions"
                        >
                          <FaEllipsisV />
                        </button>

                        {activeMenuId === order._id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-2 top-12 z-20 mt-1 w-52 rounded-lg border border-slate-100 bg-white py-1.5 text-left shadow-xl">
                              <button
                                onClick={() => openView(order)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#2563EB]"
                              >
                                <FaEye className="h-3 w-3" />
                                View Details & Payment
                              </button>
                              <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Update Status
                              </p>
                              {ORDER_STATUSES.map((status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    statusMutation.mutate({
                                      id: order._id,
                                      status,
                                    })
                                  }
                                  disabled={
                                    status === order.status ||
                                    statusMutation.isPending
                                  }
                                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold capitalize text-slate-700 transition hover:bg-slate-50 hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`}
                                  />
                                  {orderStatusLabel[status]}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-12 text-center text-slate-400"
                    >
                      <FaBoxOpen className="mx-auto mb-2 h-6 w-6" />
                      No orders found matching your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order details modal */}
      {viewOrder && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setViewOrder(null)}
        >
          <div
            className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-mono text-lg font-black text-[#0B1F3A]">
                  {viewOrder.orderNumber}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  Placed on {formatDateTime(viewOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setViewOrder(null)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Customer + shipping */}
              <div className="space-y-4 rounded-xl border border-slate-100 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Customer
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {viewOrder.customer?.fullName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {viewOrder.customer?.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    {viewOrder.customer?.phone}
                  </p>
                </div>
                <div className="border-t border-slate-50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Shipping Address
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {viewOrder.shippingAddress?.address},{" "}
                    {viewOrder.shippingAddress?.city}{" "}
                    {viewOrder.shippingAddress?.postalCode},{" "}
                    {viewOrder.shippingAddress?.country}
                  </p>
                </div>
                <div className="border-t border-slate-50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Payment Info
                  </p>
                  <div className="mt-1 space-y-1 text-xs">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Method</span>
                      <span className="font-semibold capitalize text-slate-800">
                        {paymentMethodLabel[viewOrder.paymentMethod] ??
                          viewOrder.paymentMethod}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className="font-semibold capitalize text-slate-800">
                        {paymentStatusLabel[viewOrder.paymentStatus] ??
                          viewOrder.paymentStatus}
                      </span>
                    </p>
                    <p className="flex justify-between gap-2">
                      <span className="text-slate-400">Transaction</span>
                      <span className="break-all font-mono font-semibold text-slate-800">
                        {viewOrder.transactionId ?? "—"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Items + tracking + status */}
              <div className="space-y-4 rounded-xl border border-slate-100 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Items
                  </p>
                  <div className="mt-2 max-h-40 space-y-2 overflow-y-auto pr-1">
                    {viewOrder.items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-2">
                        <img
                          src={item.image || "https://placehold.co/600x600?text=No+Image"}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-xs font-semibold text-slate-800">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {formatBDT(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          {formatBDT(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-dashed border-slate-200 pt-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Total</span>
                      <span className="font-black text-slate-900">
                        {formatBDT(viewOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Order Status
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ORDER_STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          statusMutation.mutate({ id: viewOrder._id, status })
                        }
                        disabled={
                          status === viewOrder.status ||
                          statusMutation.isPending
                        }
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize transition ${
                          status === viewOrder.status
                            ? "bg-[#0B1F3A] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {orderStatusLabel[status]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Tracking Number
                  </p>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="e.g. 1Z999AA10123456784"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#2563EB]"
                    />
                    <button
                      onClick={() =>
                        trackingMutation.mutate({
                          id: viewOrder._id,
                          trackingNumber: trackingInput,
                        })
                      }
                      disabled={
                        trackingMutation.isPending || !trackingInput.trim()
                      }
                      className="shrink-0 rounded-lg bg-[#0B1F3A] px-4 text-xs font-bold text-white transition hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
