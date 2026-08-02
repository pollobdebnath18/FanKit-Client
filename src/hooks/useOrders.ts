import { useQuery } from "@tanstack/react-query";
import { OrdersAPI } from "../api/orders.api";

export const useMyOrders = (enabled = true) => {
  return useQuery({
    queryKey: ["orders", "mine"],
    queryFn: OrdersAPI.getMine,
    enabled,
  });
};

export const useOrder = (id: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => OrdersAPI.getById(id!),
    enabled: Boolean(id) && enabled,
  });
};

export const useOrderByPayment = (
  paymentId: string | undefined,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["orders", "by-payment", paymentId],
    queryFn: () => OrdersAPI.getByPayment(paymentId!),
    enabled: Boolean(paymentId) && enabled,
  });
};

export const useAllOrders = (enabled = true) => {
  return useQuery({
    queryKey: ["orders", "admin"],
    queryFn: OrdersAPI.getAllForAdmin,
    enabled,
  });
};
