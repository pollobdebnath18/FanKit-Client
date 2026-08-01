import { useMemo } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaTimes,
  FaSpinner,
  FaRegHeart,
} from "react-icons/fa";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { toggleWishlistItem, type WishlistResponse } from "../../api/wishlist.api";
import { getProductImage } from "../../lib/productImage";

const Wishlist = () => {
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

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaRegHeart className="mb-4 text-5xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Your Wishlist</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to see your saved items.
        </p>
        <Link
          to="/signin"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">My Wishlist</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-slate-100 bg-white">
              <div className="aspect-square bg-slate-200 rounded-t-2xl" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-8 w-full rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <FaHeart className="text-xl text-red-500" />
        <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
          <FaRegHeart className="mb-4 text-5xl text-slate-300" />
          <h2 className="text-lg font-bold text-slate-700">
            Your wishlist is empty
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Browse the shop and tap the heart icon to save items you love.
          </p>
          <Link
            to="/shop"
            className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
          >
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {products.map((product) => {
              const url = product.slug
                ? `/products/${product.slug}`
                : `/products/${product._id}`;
              return (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
                >
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeMutation.mutate(product._id)}
                    disabled={removeMutation.isPending}
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-400 shadow transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {removeMutation.isPending ? (
                      <FaSpinner className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FaTimes className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Image */}
                  <Link to={url} className="block aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {product.team}
                    </p>
                    <Link
                      to={url}
                      className="mt-1 line-clamp-2 min-h-[2rem] text-sm font-bold text-slate-900 transition hover:text-[#1D4ED8]"
                    >
                      {product.title}
                    </Link>

                    <div className="mt-auto pt-3">
                      <span className="text-base font-bold text-slate-900">
                        ৳{product.price.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      to={url}
                      className="mt-3 block w-full rounded-lg bg-[#0B1F3A] py-2 text-center text-xs font-bold text-white transition-colors hover:bg-[#132C52]"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
