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
}

export interface Product {
  _id: string;
  title: string;
  slug?: string;
  sport?: string;
  gender?: string;
  category?: string;
  subcategory?: string | null;
  type?: string | null;
  team: string;
  brand?: string;
  season?: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  sku?: string;
  sizes?: string[];
  colors?: string[];
  images?: string[];
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  rating?: number;
  reviewCount?: number;
  salesCount?: number;
  status?: "active" | "draft" | "archived";

  reviews?: Review[];
  relatedProducts?: RelatedProduct[];

  createdAt: string;
  updatedAt?: string;
}

export interface CreateProduct {
  title: string;
  sport: string;
  gender?: string | null;
  category?: string;
  type?: string | null;
  team: string;
  brand?: string;
  season?: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  sku?: string;
  sizes?: string[];
  colors?: string[];
  images?: string[];
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  status?: "active" | "draft" | "archived";
}

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
