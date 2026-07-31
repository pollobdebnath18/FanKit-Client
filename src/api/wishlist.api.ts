import { apiClient } from "./apiClient";
import type { Product } from "./product.api";

export interface WishlistResponse {
  success: boolean;
  wishlist: {
    _id: string;
    products: Product[];
  };
}

export const toggleWishlistItem = (productId: string, add: boolean) => {
  if (add) {
    return apiClient<{ success: boolean; message: string }>(
      "/api/wishlist/items",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      },
    );
  }
  return apiClient<{ success: boolean; message: string }>(
    `/api/wishlist/items/${productId}`,
    { method: "DELETE" },
  );
};

export const WishlistAPI = {
  get() {
    return apiClient<WishlistResponse>("/api/wishlist");
  },
  add(productId: string) {
    return apiClient<{ success: boolean; message: string }>(
      "/api/wishlist/items",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      },
    );
  },
  remove(productId: string) {
    return apiClient<{ success: boolean; message: string }>(
      `/api/wishlist/items/${productId}`,
      { method: "DELETE" },
    );
  },
};
