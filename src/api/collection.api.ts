import { apiClient } from "./apiClient";
import type { Product } from "./product.api";

export interface CollectionResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CollectionFilters {
  search?: string;
  category?: string;
  team?: string;
  sort?: string;
  page?: number;
  maxPrice?: number;
}

export const CollectionAPI = {
  getAllCollection(filters: CollectionFilters) {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);

    if (filters.category && filters.category !== "All")
      params.append("category", filters.category);

    if (filters.team && filters.team !== "All")
      params.append("team", filters.team);

    if (filters.sort) params.append("sort", filters.sort);

    if (filters.page) params.append("page", String(filters.page));

    if (filters.maxPrice) params.append("maxPrice", String(filters.maxPrice));

    return apiClient<CollectionResponse>(
      `/api/collections?${params.toString()}`,
    );
  },
};
