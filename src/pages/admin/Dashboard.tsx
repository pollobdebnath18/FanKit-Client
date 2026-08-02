import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaDollarSign,
  FaRedo,
  FaShoppingBag,
  FaTshirt,
  FaUserPlus,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import type { Order } from "../../api/orders.api";
import { useProducts } from "../../hooks/useProducts";
import { useAllOrders } from "../../hooks/useOrders";
import { useUsers } from "../../hooks/useUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { buildDashboardStats } from "../../lib/admin";
import { formatBDT, formatCompactBDT, formatDate, timeAgo } from "../../lib/format";
import { orderStatusLabel } from "../../lib/orderStatus";
import { getProductImage } from "../../lib/productImage";
import PageHeader from "../../components/admin/ui/PageHeader";
import SectionCard from "../../components/admin/ui/SectionCard";
import StatsCard from "../../components/admin/ui/StatsCard";
import StatusBadge from "../../components/admin/ui/StatusBadge";
import { orderStatusTone } from "../../lib/statusTones";
import DataTable, { type DataColumn } from "../../components/admin/ui/DataTable";
import EmptyState from "../../components/admin/ui/EmptyState";
import ErrorState from "../../components/admin/ui/ErrorState";
import SkeletonCard from "../../components/admin/ui/SkeletonCard";
import SkeletonTable from "../../components/admin/ui/SkeletonTable";

const STATUS_CHART_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  paid: "#10b981",
  processing: "#2563eb",
  shipped: "#0ea5e9",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const activityStyles: Record<string, { icon: typeof FaShoppingBag; chip: string }> = {
  order: { icon: FaShoppingBag, chip: "bg-emerald-100 text-emerald-600" },
  product: { icon: FaTshirt, chip: "bg-blue-100 text-blue-600" },
  user: { icon: FaUserPlus, chip: "bg-amber-100 text-amber-600" },
};

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const productsQuery = useProducts();
  const ordersQuery = useAllOrders();
  const usersQuery = useUsers();

  const isLoading =
    productsQuery.isPending || ordersQuery.isPending || usersQuery.isPending;
  const isError =
    productsQuery.isError || ordersQuery.isError || usersQuery.isError;

  const stats = useMemo(
    () =>
      buildDashboardStats(
        productsQuery.data ?? [],
        ordersQuery.data?.orders ?? [],
        usersQuery.data ?? [],
      ),
    [productsQuery.data, ordersQuery.data, usersQuery.data],
  );

  const refetchAll = () => {
    void queryClient.refetchQueries({ queryKey: ["products"] });
    void queryClient.refetchQueries({ queryKey: ["orders"] });
    void queryClient.refetchQueries({ queryKey: ["users"] });
  };

  const isEmpty =
    !isLoading && !isError && stats.totalProducts === 0;

  const firstName = currentUser?.name?.split(" ")[0] ?? "Admin";
  const hasChartData = stats.totalOrders > 0;
  const statusPieData = stats.statusCounts.filter((entry) => entry.count > 0);

  const orderColumns: DataColumn<Order>[] = [
    {
      key: "order",
      header: "Order",
      render: (order) => (
        <span className="font-mono text-xs font-bold text-slate-700">
          {order.orderNumber}
        </span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (order) => (
        <div>
          <p className="font-semibold text-slate-900">
            {order.customer?.fullName ?? "—"}
          </p>
          <p className="text-xs text-slate-400">{order.customer?.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      className: "max-w-[200px]",
      render: (order) => (
        <p className="truncate text-slate-500">
          {order.items[0]?.title ?? "—"}
          {order.items.length > 1 && (
            <span className="text-slate-400"> +{order.items.length - 1}</span>
          )}
        </p>
      ),
    },
    {
      key: "total",
      header: "Total",
      render: (order) => (
        <span className="font-semibold text-slate-900">
          {formatBDT(order.total)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order) => (
        <StatusBadge
          label={orderStatusLabel[order.status] ?? order.status}
          tone={orderStatusTone(order.status)}
          dot
        />
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (order) => (
        <span className="text-xs text-slate-500">{formatDate(order.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${firstName} — here's what's happening at FanKit today.`}
        actions={
          <button
            type="button"
            onClick={refetchAll}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaRedo className="h-3.5 w-3.5" />
            Refresh
          </button>
        }
      />

      {isError && (
        <SectionCard>
          <ErrorState
            title="Couldn't load the dashboard"
            message="We ran into a problem fetching your store data. Please try again."
            onRetry={refetchAll}
            isRetrying={false}
          />
        </SectionCard>
      )}

      {!isError && (
        <>
          {/* Overview stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              <>
                <StatsCard
                  label="Total Revenue"
                  value={formatCompactBDT(stats.totalRevenue)}
                  icon={FaDollarSign}
                  change={stats.revenueTrend}
                  hint="vs last month"
                  tone="brand"
                  index={0}
                />
                <StatsCard
                  label="Total Orders"
                  value={stats.totalOrders.toLocaleString()}
                  icon={FaShoppingBag}
                  change={stats.ordersTrend}
                  hint="vs last month"
                  tone="blue"
                  index={1}
                />
                <StatsCard
                  label="Total Products"
                  value={stats.totalProducts.toLocaleString()}
                  icon={FaTshirt}
                  change={stats.productsTrend}
                  hint="vs last month"
                  tone="emerald"
                  index={2}
                />
                <StatsCard
                  label="Total Customers"
                  value={stats.totalCustomers.toLocaleString()}
                  icon={FaUsers}
                  change={stats.customersTrend}
                  hint="vs last month"
                  tone="amber"
                  index={3}
                />
              </>
            )}
          </div>

          {/* Empty state */}
          {isEmpty && (
            <SectionCard>
              <EmptyState
                title="Welcome to your FanKit store"
                message="Add your first product to start tracking revenue, orders and customers in real time."
                action={
                  <Link
                    to="/admin/add-product"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content shadow-sm transition hover:opacity-90"
                  >
                    Add your first product
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </Link>
                }
              />
            </SectionCard>
          )}

          {/* Charts */}
          <div className="grid gap-5 lg:grid-cols-3">
            <SectionCard
              title="Revenue Overview"
              subtitle="Monthly revenue from the last 8 months"
              className="lg:col-span-2"
            >
              {isLoading ? (
                <SkeletonTable rows={4} columns={4} />
              ) : !hasChartData ? (
                <EmptyState title="No revenue yet" message="Revenue trends will appear once orders start coming in." />
              ) : (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.monthlyRevenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value: number) => formatCompactBDT(value)}
                      />
                      <Tooltip formatter={(value) => formatBDT(Number(value))} cursor={{ stroke: "#e2e8f0" }} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </SectionCard>

            <SectionCard
              title="Order Status"
              subtitle="Distribution of all orders"
            >
              {isLoading ? (
                <SkeletonTable rows={3} columns={2} />
              ) : !hasChartData ? (
                <EmptyState title="No orders yet" message="Order statuses will show up here as orders are placed." />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-2">
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusPieData}
                          dataKey="count"
                          nameKey="label"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          strokeWidth={0}
                        >
                          {statusPieData.map((entry) => (
                            <Cell key={entry.status} fill={STATUS_CHART_COLORS[entry.status] ?? "#94a3b8"} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5">
                    {statusPieData.map((entry) => (
                      <li key={entry.status} className="flex items-center justify-between gap-2 text-xs">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: STATUS_CHART_COLORS[entry.status] ?? "#94a3b8" }}
                          />
                          {entry.label}
                        </span>
                        <span className="font-bold text-slate-800">{entry.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Recent orders + side lists */}
          <div className="grid gap-5 lg:grid-cols-3">
            <SectionCard
              title="Recent Orders"
              subtitle="Latest purchases across the store"
              className="lg:col-span-2"
              action={
                <Link
                  to="/admin/orders"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3.5 py-2 text-xs font-bold text-brand transition hover:bg-slate-100"
                >
                  View all
                  <FaArrowRight className="h-3 w-3" />
                </Link>
              }
              bodyClassName="p-0 sm:p-0"
            >
              {isLoading ? (
                <div className="p-5">
                  <SkeletonTable rows={6} columns={5} />
                </div>
              ) : (
                <DataTable
                  columns={orderColumns}
                  rows={stats.recentOrders}
                  rowKey={(order) => order._id}
                  onRowClick={() => navigate("/admin/orders")}
                  emptyState={
                    <EmptyState
                      title="No orders yet"
                      message="When customers place orders, they'll appear here."
                    />
                  }
                />
              )}
            </SectionCard>

            <div className="space-y-5">
              <SectionCard title="Top Selling Products" subtitle="Best performers by units sold">
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
                    ))}
                  </div>
                ) : stats.topProducts.length === 0 ? (
                  <EmptyState title="No products yet" message="Your best sellers will appear here." />
                ) : (
                  <ul className="space-y-4">
                    {stats.topProducts.map((product) => (
                      <li key={product._id} className="flex items-center gap-3">
                        <img
                          src={getProductImage(product)}
                          alt={product.title}
                          loading="lazy"
                          className="h-11 w-11 shrink-0 rounded-xl border border-slate-100 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">{product.title}</p>
                          <p className="text-xs text-slate-400">
                            {product.team} · {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">{formatBDT(product.price)}</p>
                          <p className="text-[11px] text-slate-400">{product.salesCount ?? 0} sold</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>

              <SectionCard title="Recent Activity" subtitle="Latest updates across operations">
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
                    ))}
                  </div>
                ) : stats.activity.length === 0 ? (
                  <EmptyState title="No activity yet" message="Recent changes will be logged here." />
                ) : (
                  <ul className="space-y-4">
                    {stats.activity.map((item) => {
                      const style = activityStyles[item.type];
                      const Icon = style.icon;
                      return (
                        <li key={item.id} className="flex gap-3">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.chip}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="truncate text-xs text-slate-500">{item.description}</p>
                            <p className="mt-0.5 text-[11px] text-slate-400">{timeAgo(item.at)}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </SectionCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
