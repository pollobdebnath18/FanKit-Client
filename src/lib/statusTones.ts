import type { OrderStatus } from "./orderStatus";
import type { BadgeTone } from "../components/admin/ui/StatusBadge";

export const orderStatusTone = (status: OrderStatus): BadgeTone => {
  switch (status) {
    case "pending":
      return "warning";
    case "paid":
      return "success";
    case "processing":
      return "primary";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "neutral";
  }
};

export const productStatusTone = (
  status: "active" | "draft" | "archived",
): BadgeTone => {
  switch (status) {
    case "active":
      return "success";
    case "draft":
      return "neutral";
    case "archived":
      return "warning";
    default:
      return "neutral";
  }
};

export const userRoleTone = (role: "user" | "admin"): BadgeTone =>
  role === "admin" ? "brand" : "neutral";
