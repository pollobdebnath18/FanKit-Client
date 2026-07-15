import { apiClient } from "./apiClient";

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface RelatedProduct {
  _id: string;
  title: string;
  price: number;
  imageUrl?: string;
  images?: string[];
}

export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  team: string;
  category: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  sizes: string[];
  images: string[];
  /** @deprecated kept for backward compatibility with older single-image records */
  imageUrl?: string;
  brand?: string;
  season?: string;
  sku?: string;
  tags?: string[];
  allowCustomization?: boolean;
  isFeatured?: boolean;
  status?: "draft" | "published";
  reviews?: Review[];
  relatedProducts?: RelatedProduct[];
  createdAt: string;
  updatedAt?: string;
}

export type CreateProduct = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export const ProductAPI = {
  // Get all products
  getAll() {
    return apiClient<Product[]>("/api/products");
  },

  // Get single product
  getById(id: string) {
    return apiClient<Product>(`/api/products/${id}`);
  },

  // Create product
  create(product: CreateProduct) {
    return apiClient<Product>("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  // Update product
  update(id: string, product: Partial<CreateProduct>) {
    return apiClient<Product>(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  },

  // Delete product
  delete(id: string) {
    return apiClient<{ message: string }>(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};
