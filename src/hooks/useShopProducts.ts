import { useQuery } from "@tanstack/react-query";
import { ShopAPI, type ShopFilters, type ShopResponse } from "../api/shop.api";

export const useShopProducts = (filters: ShopFilters, enabled = true) => {
  return useQuery<ShopResponse>({
    queryKey: ["shop-products", filters],
    queryFn: () => ShopAPI.getProducts(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
    enabled,
  });
};
