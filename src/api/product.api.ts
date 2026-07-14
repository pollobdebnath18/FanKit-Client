import { apiClient } from "./apiClient";

export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  team: string;
  category: string;
  price: number;
  stock: number;
  sizes: string[];
  imageUrl: string;
  createdAt: string;
}
export const ProductAPI = {
  getAll() {
    return apiClient<Product[]>("/api/products");
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
