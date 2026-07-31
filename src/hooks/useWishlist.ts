import { useQuery } from "@tanstack/react-query";
import { WishlistAPI, type WishlistResponse } from "../api/wishlist.api";

export const useWishlist = (enabled = true) => {
  return useQuery<WishlistResponse>({
    queryKey: ["wishlist"],
    queryFn: WishlistAPI.get,
    enabled,
  });
};
