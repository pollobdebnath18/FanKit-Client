import { apiClient } from "./apiClient";

export const ProductAPI = {
  getAll() {
    return apiClient("/api/products");
  },

  getById(id: string) {
    return apiClient(`/api/products/${id}`);
  },

  create(product: unknown) {
    return apiClient("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  update(id: string, product: unknown) {
    return apiClient(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  },

  delete(id: string) {
    return apiClient(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};
