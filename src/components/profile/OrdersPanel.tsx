import { Link } from "react-router";
import { FaArrowRight, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import { useMyOrders } from "../../hooks/useOrders";
import { formatBDT, formatDate } from "../../lib/format";
import { OrderStatusBadge } from "../orders/Badges";

const OrdersPanel = () => {
  const { data, isLoading, isError } = useMyOrders();
  const orders = data?.orders ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
            <div className="mt-4 h-14 rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center">
        <p className="text-sm font-semibold text-red-500">
          We couldn&apos;t load your orders. Please try again later.
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
        <FaBoxOpen className="mb-4 text-5xl text-slate-300" />
        <h3 className="text-lg font-bold text-slate-700">No orders yet</h3>
        <p className="mt-1 text-sm text-slate-500">
          When you place an order it will show up here.
        </p>
        <Link
          to="/shop/all-products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          <FaShoppingBag className="h-3.5 w-3.5" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {orders.map((order) => {
          const firstItem = order.items[0];
          const itemCount = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );
          return (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-slate-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-bold text-[#0B1F3A]">
                    {order.orderNumber}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-slate-50 pt-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item) => (
                    <img
                      key={item.productId}
                      src={
                        item.image ||
                        "https://placehold.co/600x600?text=No+Image"
                      }
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-lg border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                    {firstItem?.title}
                    {order.items.length > 1 && (
                      <span className="font-normal text-slate-400">
                        {" "}
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">{itemCount} items</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#0B1F3A]">
                    {formatBDT(order.total)}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8]">
                    Details <FaArrowRight className="h-2.5 w-2.5" />
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-6 text-center">
        <Link
          to="/orders"
          className="text-sm font-bold text-[#1D4ED8] hover:underline"
        >
          View all {orders.length} orders →
        </Link>
      </p>
    </div>
  );
};

export default OrdersPanel;
