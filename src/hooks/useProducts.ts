import { useQuery } from "@tanstack/react-query";
import { ProductAPI, type Product } from "../api/product.api";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductAPI.getAll,
  });
};
