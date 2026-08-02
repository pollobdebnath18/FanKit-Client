import type { Order } from "../api/orders.api";
import type { Product } from "../api/product.api";
import type { User } from "../api/user.api";
import { formatBDT } from "./format";
import { ORDER_STATUSES, orderStatusLabel, type OrderStatus } from "./orderStatus";

export interface MonthlyPoint {
  key: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface StatusCount {
  status: OrderStatus;
  label: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  type: "order" | "product" | "user";
  title: string;
  description: string;
  at: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueTrend: number;
  ordersTrend: number;
  productsTrend: number;
  customersTrend: number;
  monthlyRevenue: MonthlyPoint[];
  statusCounts: StatusCount[];
  recentOrders: Order[];
  topProducts: Product[];
  activity: ActivityItem[];
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthKey = (value: string | Date): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "unknown";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const monthLabel = (key: string): string => {
  const monthIndex = Number(key.split("-")[1]) - 1;
  return MONTH_LABELS[monthIndex] ?? key;
};

const percentageChange = (current: number, previous: number): number => {
  if (previous <= 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

/** Returns an array of the last `count` months as `{ key, label }`, oldest first. */
const lastMonths = (count: number): { key: string; label: string }[] => {
  const now = new Date();
  const months: { key: string; label: string }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    months.push({ key, label: monthLabel(key) });
  }
  return months;
};

const byDateDesc = (a: { createdAt?: string }, b: { createdAt?: string }) =>
  new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();

const recentActivity = (
  orders: Order[],
  products: Product[],
  users: User[],
): ActivityItem[] => {
  const items: ActivityItem[] = [];

  const sortedOrders = [...orders].sort(byDateDesc);
  const sortedProducts = [...products].sort(byDateDesc);
  const sortedUsers = [...users].sort(byDateDesc);

  for (const order of sortedOrders.slice(0, 6)) {
    items.push({
      id: `order-${order._id}`,
      type: "order",
      title: `New order ${order.orderNumber}`,
      description: `${order.customer?.fullName ?? "A customer"} · ${formatBDT(order.total)}`,
      at: order.createdAt,
    });
  }

  for (const product of sortedProducts.slice(0, 3)) {
    items.push({
      id: `product-${product._id}`,
      type: "product",
      title: "New product listed",
      description: product.title,
      at: product.createdAt,
    });
  }

  for (const user of sortedUsers.slice(0, 3)) {
    items.push({
      id: `user-${user._id}`,
      type: "user",
      title: "New customer registered",
      description: user.name,
      at: user.createdAt,
    });
  }

  return items
    .filter((item) => item.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8);
};

export const buildDashboardStats = (
  products: Product[],
  orders: Order[],
  users: User[],
): DashboardStats => {
  const now = new Date();
  const currentKey = monthKey(now);
  const previousKey = monthKey(
    new Date(now.getFullYear(), now.getMonth() - 1, 1),
  );

  let totalRevenue = 0;
  let currentMonthRevenue = 0;
  let previousMonthRevenue = 0;
  let currentMonthOrders = 0;
  let previousMonthOrders = 0;

  for (const order of orders) {
    totalRevenue += order.total ?? 0;
    const key = monthKey(order.createdAt);
    if (key === currentKey) {
      currentMonthRevenue += order.total ?? 0;
      currentMonthOrders += 1;
    } else if (key === previousKey) {
      previousMonthRevenue += order.total ?? 0;
      previousMonthOrders += 1;
    }
  }

  const currentMonthKey = currentKey;
  const newProductsCurrentMonth = products.filter(
    (p) => monthKey(p.createdAt) === currentMonthKey,
  ).length;
  const newProductsPreviousMonth = products.filter(
    (p) => monthKey(p.createdAt) === previousKey,
  ).length;

  const newUsersCurrentMonth = users.filter(
    (u) => monthKey(u.createdAt) === currentMonthKey,
  ).length;
  const newUsersPreviousMonth = users.filter(
    (u) => monthKey(u.createdAt) === previousKey,
  ).length;

  const monthlyRevenue = lastMonths(8).map(({ key, label }) => {
    let revenue = 0;
    let count = 0;
    for (const order of orders) {
      if (monthKey(order.createdAt) === key) {
        revenue += order.total ?? 0;
        count += 1;
      }
    }
    return { key, label, revenue, orders: count };
  });

  const statusCounts: StatusCount[] = ORDER_STATUSES.map((status) => ({
    status,
    label: orderStatusLabel[status],
    count: orders.filter((o) => o.status === status).length,
  }));

  const recentOrders = [...orders].sort(byDateDesc).slice(0, 6);

  const topProducts = [...products]
    .sort(
      (a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0) || byDateDesc(a, b),
    )
    .slice(0, 5);

  return {
    totalRevenue,
    totalOrders: orders.length,
    totalProducts: products.length,
    totalCustomers: users.length,
    revenueTrend: percentageChange(currentMonthRevenue, previousMonthRevenue),
    ordersTrend: percentageChange(currentMonthOrders, previousMonthOrders),
    productsTrend: percentageChange(
      newProductsCurrentMonth,
      newProductsPreviousMonth,
    ),
    customersTrend: percentageChange(
      newUsersCurrentMonth,
      newUsersPreviousMonth,
    ),
    monthlyRevenue,
    statusCounts,
    recentOrders,
    topProducts,
    activity: recentActivity(orders, products, users),
  };
};
