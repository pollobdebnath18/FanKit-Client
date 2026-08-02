import type { IconType } from "react-icons";
import {
  FaChartBar,
  FaChartLine,
  FaCog,
  FaListAlt,
  FaPlus,
  FaShoppingBag,
  FaThLarge,
  FaTshirt,
  FaUsers,
} from "react-icons/fa";
import type { CrumbItem } from "./ui/Breadcrumb";

export interface AdminNavLink {
  label: string;
  to: string;
  icon: IconType;
  end?: boolean;
}

export interface AdminNavSection {
  label: string;
  icon: IconType;
  children: AdminNavLink[];
}

export type AdminNavItem = AdminNavLink | AdminNavSection;

export const isNavSection = (item: AdminNavItem): item is AdminNavSection =>
  "children" in item;

export const NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: FaChartLine, end: true },
  {
    label: "Products",
    icon: FaTshirt,
    children: [
      { label: "All Products", to: "/admin/products", icon: FaThLarge },
      { label: "Add Product", to: "/admin/add-product", icon: FaPlus },
      { label: "Categories", to: "/admin/categories", icon: FaListAlt },
    ],
  },
  { label: "Orders", to: "/admin/orders", icon: FaShoppingBag },
  { label: "Users", to: "/admin/users", icon: FaUsers },
  { label: "Analytics", to: "/admin/analytics", icon: FaChartBar },
  { label: "Settings", to: "/admin/settings", icon: FaCog },
];

interface PageMeta {
  title: string;
  crumbs: CrumbItem[];
}

const PAGE_META: Record<string, PageMeta> = {
  dashboard: {
    title: "Dashboard",
    crumbs: [{ label: "Dashboard" }],
  },
  products: {
    title: "All Products",
    crumbs: [
      { label: "Products", to: "/admin/products" },
      { label: "All Products" },
    ],
  },
  "add-product": {
    title: "Add Product",
    crumbs: [
      { label: "Products", to: "/admin/products" },
      { label: "Add Product" },
    ],
  },
  categories: {
    title: "Categories",
    crumbs: [
      { label: "Products", to: "/admin/products" },
      { label: "Categories" },
    ],
  },
  orders: {
    title: "Orders",
    crumbs: [{ label: "Orders" }],
  },
  users: {
    title: "Users",
    crumbs: [{ label: "Users" }],
  },
  analytics: {
    title: "Analytics",
    crumbs: [{ label: "Analytics" }],
  },
  settings: {
    title: "Settings",
    crumbs: [{ label: "Settings" }],
  },
};

/** Resolves title + breadcrumb trail for an admin pathname. */
export const getAdminPageMeta = (pathname: string): PageMeta => {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  const meta = PAGE_META[segment];
  if (!meta) {
    return { title: "Dashboard", crumbs: [{ label: "Dashboard" }] };
  }
  return { title: meta.title, crumbs: meta.crumbs };
};
