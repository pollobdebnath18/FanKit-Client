import { useQuery } from "@tanstack/react-query";
import { ProductAPI } from "../api/product.api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductAPI.getAll,
  });
};
