import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { ShopFilters, SortOption } from "../api/shop.api";
import { DEFAULT_LIMIT, getPriceRange } from "../lib/shop";

export interface ShopFilterParams {
  type?: string;
  gender?: string;
  brand?: string;
  search?: string;
  sort?: SortOption;
  page?: number;
  price?: string;
  availability?: "in-stock" | "out-of-stock";
  newArrival?: boolean;
  onSale?: boolean;
  featured?: boolean;
}

/**
 * Reads shop filters from (and writes them to) the URL query string so that
 * refreshing the page preserves the current filter state.
 */
export const useShopFilterParams = (sport: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo<ShopFilterParams>(() => {
    const sort = searchParams.get("sort") as SortOption | null;
    const page = Number(searchParams.get("page"));
    return {
      type: searchParams.get("type") ?? undefined,
      gender: searchParams.get("gender") ?? undefined,
      brand: searchParams.get("brand") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      sort: sort ?? undefined,
      page: Number.isFinite(page) && page > 1 ? page : undefined,
      price: searchParams.get("price") ?? undefined,
      availability: (searchParams.get("availability") as
        | "in-stock"
        | "out-of-stock"
        | null) ?? undefined,
      newArrival: searchParams.get("newArrival") === "true",
      onSale: searchParams.get("onSale") === "true",
      featured: searchParams.get("featured") === "true",
    };
  }, [searchParams]);

  const setParams = useCallback(
    (updates: Partial<ShopFilterParams>, resetPage = true) => {
      const next = new URLSearchParams(searchParams);
      const entries: [string, string | undefined][] = [
        ["type", updates.type],
        ["gender", updates.gender],
        ["brand", updates.brand],
        ["search", updates.search],
        ["sort", updates.sort],
        ["price", updates.price],
        ["availability", updates.availability],
      ];
      for (const [key, value] of entries) {
        if (value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      if (resetPage) next.delete("page");
      else if (updates.page) next.set("page", String(updates.page));

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const clearAll = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const priceRange = getPriceRange(params.price ?? "all");

  const shopFilters: ShopFilters = useMemo(
    () => ({
      sport,
      type: params.type,
      gender: params.gender,
      brand: params.brand,
      search: params.search,
      sort: params.sort ?? "newest",
      page: params.page ?? 1,
      limit: DEFAULT_LIMIT,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      availability: params.availability,
      newArrival: params.newArrival,
      onSale: params.onSale,
      featured: params.featured,
    }),
    [sport, params, priceRange],
  );

  const activeCount = useMemo(
    () =>
      [
        params.type,
        params.gender,
        params.brand,
        params.search,
        params.price !== "all" && params.price,
        params.availability,
        params.newArrival,
        params.onSale,
        params.featured,
      ].filter(
        Boolean,
      ).length,
    [params],
  );

  return { params, setParams, clearAll, shopFilters, activeCount };
};
