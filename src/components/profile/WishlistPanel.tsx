import { useMemo } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegHeart, FaTimes, FaSpinner } from "react-icons/fa";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { toggleWishlistItem, type WishlistResponse } from "../../api/wishlist.api";
import { getProductImage } from "../../lib/productImage";

const WishlistPanel = () => {
  const queryClient = useQueryClient();
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();
  const isLoggedIn = !!session?.user || !!currentUser;

  const { data: wishlistData, isLoading } = useWishlist(isLoggedIn);
  const products = useMemo(
    () => wishlistData?.wishlist?.products ?? [],
    [wishlistData],
  );

  const removeMutation = useMutation({
    mutationFn: (productId: string) => toggleWishlistItem(productId, false),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<WishlistResponse>(["wishlist"]);
      queryClient.setQueryData<WishlistResponse>(["wishlist"], (old) => {
        const current = old?.wishlist?.products ?? [];
        return {
          success: true,
          wishlist: {
            _id: old?.wishlist?._id ?? "optimistic",
            products: current.filter((p) => p._id !== productId),
          },
        };
      });
      return { previous };
    },
    onError: (_err, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["wishlist"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-slate-100 bg-white"
          >
            <div className="aspect-square rounded-t-2xl bg-slate-200" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-3/4 rounded bg-slate-200" />
              <div className="h-6 w-1/3 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
        <FaRegHeart className="mb-4 text-5xl text-slate-300" />
        <h3 className="text-lg font-bold text-slate-700">
          Your wishlist is empty
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Tap the heart icon on any product to save it here.
        </p>
        <Link
          to="/shop/all-products"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => {
          const url = product.slug
            ? `/products/${product.slug}`
            : `/products/${product._id}`;
          return (
            <div
              key={product._id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => removeMutation.mutate(product._id)}
                disabled={removeMutation.isPending}
                aria-label="Remove from wishlist"
                className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-400 shadow transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {removeMutation.isPending ? (
                  <FaSpinner className="h-3 w-3 animate-spin" />
                ) : (
                  <FaTimes className="h-3 w-3" />
                )}
              </button>

              <Link
                to={url}
                className="block aspect-square overflow-hidden bg-slate-50"
              >
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col p-3">
                <Link
                  to={url}
                  className="line-clamp-2 min-h-[2rem] text-sm font-bold text-slate-900 transition hover:text-[#1D4ED8]"
                >
                  {product.title}
                </Link>
                <div className="mt-auto pt-2">
                  <span className="text-base font-bold text-slate-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center">
        <Link
          to="/wishlist"
          className="text-sm font-bold text-[#1D4ED8] hover:underline"
        >
          Open full wishlist →
        </Link>
      </p>
    </div>
  );
};

export default WishlistPanel;
