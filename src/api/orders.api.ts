import { apiClient } from "./apiClient";
import type {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../lib/orderStatus";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  size?: string | null;
  quantity: number;
  image: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderStatusEntry {
  status: string;
  at: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string | null;
  paymentId: string | null;
  statusHistory: OrderStatusEntry[];
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  success: boolean;
  orders: Order[];
}

interface OrderResponse {
  success: boolean;
  order: Order;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

export const OrdersAPI = {
  /** Current user's orders. */
  getMine() {
    return apiClient<OrdersResponse>("/api/orders");
  },

  /** Single order (ownership + admin enforced on server). */
  getById(id: string) {
    return apiClient<OrderResponse>(`/api/orders/${id}`);
  },

  /** Find an order by its Stripe payment intent id (used on the success page). */
  getByPayment(paymentId: string) {
    return apiClient<OrderResponse>(`/api/orders/by-payment/${paymentId}`);
  },

  /** All orders (admin). */
  getAllForAdmin() {
    return apiClient<OrdersResponse>("/api/orders/admin");
  },

  /** Update order status (admin). */
  updateStatus(id: string, status: OrderStatus) {
    return apiClient<MessageResponse>(`/api/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** Add / update tracking number (admin). */
  updateTracking(id: string, trackingNumber: string) {
    return apiClient<MessageResponse>(`/api/orders/${id}/tracking`, {
      method: "PATCH",
      body: JSON.stringify({ trackingNumber }),
    });
  },
};
