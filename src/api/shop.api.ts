import { apiClient } from "./apiClient";
import type { Product } from "./product.api";

export interface FilterCounts {
  types: Record<string, number>;
  genders: Record<string, number>;
  brands: Record<string, number>;
  inStock: number;
  outOfStock: number;
}

export interface ShopResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  filterCounts: FilterCounts;
}

export type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "best-selling"
  | "highest-rated";

export interface ShopFilters {
  sport: string;
  type?: string;
  gender?: string;
  brand?: string;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  availability?: "in-stock" | "out-of-stock";
}

export const ShopAPI = {
  getProducts(filters: ShopFilters) {
    const params = new URLSearchParams();

    if (filters.sport) params.append("category", filters.sport);
    if (filters.type) params.append("type", filters.type);
    if (filters.gender) params.append("gender", filters.gender);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.search) params.append("search", filters.search);
    if (filters.sort && filters.sort !== "newest")
      params.append("sort", filters.sort);
    if (filters.page && filters.page > 1)
      params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));
    if (filters.minPrice != null)
      params.append("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null)
      params.append("maxPrice", String(filters.maxPrice));
    if (filters.availability)
      params.append("availability", filters.availability);

    return apiClient<ShopResponse>(
      `/api/products?${params.toString()}`,
    );
  },
};
