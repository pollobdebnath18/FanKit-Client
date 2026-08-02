import { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaShoppingBag,
  FaHeart,
  FaFire,
  FaUserCog,
} from "react-icons/fa";
import { useMyOrders } from "../../hooks/useOrders";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { formatBDT, formatDate } from "../../lib/format";
import { OrderStatusBadge } from "../orders/Badges";
import StatCards from "./StatCards";

const OverviewPanel = () => {
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();
  const isLoggedIn = !!session?.user || !!currentUser;

  const { data: ordersData, isLoading: ordersLoading } = useMyOrders(isLoggedIn);
  const { data: wishlistData } = useWishlist(isLoggedIn);
  const { data: cartData } = useCart(isLoggedIn);

  const orders = useMemo(() => ordersData?.orders ?? [], [ordersData]);
  const wishlistCount = wishlistData?.wishlist?.products.length ?? 0;
  const cartCount = (cartData?.cart?.items ?? []).reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );
  const totalSpent = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + o.total, 0),
    [orders],
  );

  const quickActions = [
    {
      label: "Continue Shopping",
      description: "Explore all products",
      href: "/shop/all-products",
      Icon: FaShoppingBag,
      accent: "text-[#1D4ED8]",
    },
    {
      label: "Today's Deals",
      description: "Up to 50% off fan kits",
      href: "/offers",
      Icon: FaFire,
      accent: "text-[#F5A623]",
    },
    {
      label: "My Wishlist",
      description: `${wishlistCount} saved items`,
      href: "/wishlist",
      Icon: FaHeart,
      accent: "text-rose-500",
    },
    {
      label: "Account Settings",
      description: "Profile & password",
      href: "/profile?tab=settings",
      Icon: FaUserCog,
      accent: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-10">
      <StatCards
        ordersCount={orders.length}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        totalSpent={totalSpent}
      />

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(({ label, description, href, Icon, accent }) => (
          <Link
            key={label}
            to={href}
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <Icon className={`h-6 w-6 ${accent}`} />
            <p className="mt-3 flex items-center gap-1 text-sm font-bold text-slate-900">
              {label}
              <FaArrowRight className="h-2.5 w-2.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#1D4ED8]" />
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{description}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
          {orders.length > 0 && (
            <Link
              to="/orders"
              className="text-sm font-bold text-[#1D4ED8] hover:underline"
            >
              View all
            </Link>
          )}
        </div>

        {ordersLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-slate-100 bg-white"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-14 text-center">
            <FaShoppingBag className="mb-3 text-4xl text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No orders yet</p>
            <p className="mt-1 text-xs text-slate-500">
              Your recent orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/orders/${order._id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-bold text-[#0B1F3A]">
                      {order.orderNumber}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {formatDate(order.createdAt)} · {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-sm font-black text-[#0B1F3A]">
                      {formatBDT(order.total)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPanel;
