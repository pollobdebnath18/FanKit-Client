import { apiClient } from "./apiClient";

export interface CartLineItem {
  _id: string;
  productId: string;
  size?: string | null;
  quantity: number;
  product?: {
    _id: string;
    title: string;
    price: number;
    imageUrl?: string;
    images?: string[];
    stock: number;
  } | null;
}

export interface CartResponse {
  success: boolean;
  cart: {
    _id: string;
    items: CartLineItem[];
    subtotal: number;
  };
}

export const addCartItem = (payload: {
  productId: string;
  size?: string;
  quantity?: number;
}) => {
  return apiClient<{ success: boolean; message: string }>("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({
      productId: payload.productId,
      size: payload.size,
      quantity: payload.quantity ?? 1,
    }),
  });
};

export const CartAPI = {
  get() {
    return apiClient<CartResponse>("/api/cart");
  },
  add(payload: { productId: string; size?: string; quantity?: number }) {
    return addCartItem(payload);
  },
  update(id: string, quantity: number) {
    return apiClient<{ success: boolean; message: string }>(
      `/api/cart/items/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      },
    );
  },
  remove(id: string) {
    return apiClient<{ success: boolean; message: string }>(
      `/api/cart/items/${id}`,
      { method: "DELETE" },
    );
  },
  clear() {
    return apiClient<{ success: boolean; message: string }>("/api/cart", {
      method: "DELETE",
    });
  },
};
