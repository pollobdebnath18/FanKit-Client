import { useQuery } from "@tanstack/react-query";
import { ProductAPI, type Product } from "../api/product.api"; // <-- import Product from here now

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => ProductAPI.getById(id),
    enabled: !!id,
  });
};
