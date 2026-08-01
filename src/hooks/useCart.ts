import { useQuery } from "@tanstack/react-query";
import { CartAPI, type CartResponse } from "../api/cart.api";

export const useCart = (enabled = true) => {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: CartAPI.get,
    enabled,
  });
};
