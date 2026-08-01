import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTimes, FaShoppingBag, FaHeart, FaStar, FaRegStar, FaCheck, FaSpinner } from "react-icons/fa";
import type { Product } from "../../api/product.api";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useWishlist } from "../../hooks/useWishlist";
import { addCartItem } from "../../api/cart.api";
import { toggleWishlistItem, type WishlistResponse } from "../../api/wishlist.api";
import { getProductImage } from "../../lib/productImage";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session } = useAuthSession();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isLoggedIn = !!session?.user;
  const { data: wishlistData } = useWishlist(isLoggedIn);
  const wishlistIds = useMemo(
    () => new Set((wishlistData?.wishlist?.products ?? []).map((p) => p._id)),
    [wishlistData],
  );
  const isWishlisted = product ? wishlistIds.has(product._id) : false;

  const toggleWishlistMutation = useMutation({
    mutationFn: (productId: string) => {
      return toggleWishlistItem(productId, !isWishlisted);
    },
    onMutate: async (productId) => {
      if (!product) return;
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<WishlistResponse>(["wishlist"]);
      queryClient.setQueryData<WishlistResponse>(["wishlist"], (old) => {
        const current = old?.wishlist?.products ?? [];
        const exists = current.some((p) => p._id === productId);
        return {
          success: true,
          wishlist: {
            _id: old?.wishlist?._id ?? "optimistic",
            products: exists
              ? current.filter((p) => p._id !== productId)
              : [{ ...product }, ...current],
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

  // Reset transient state whenever a different product opens (render-time sync).
  const productId = product?._id ?? null;
  const [prevProductId, setPrevProductId] = useState<string | null>(productId);
  if (prevProductId !== productId) {
    setPrevProductId(productId);
    setSelectedSize("");
    setAdded(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const price = product?.price ?? 0;
  const comparePrice = product?.comparePrice ?? null;
  const onSale = product?.onSale ?? (comparePrice != null && comparePrice > price);
  const rating = product?.rating ?? 0;
  const inStock = (product?.stock ?? 0) > 0;

  if (!product) return null;

  const url = product.slug ? `/products/${product.slug}` : `/products/${product._id}`;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    const size = product.sizes && product.sizes.length > 0 ? selectedSize || product.sizes[0] : undefined;
    setAdding(true);
    try {
      await addCartItem({ productId: product._id, quantity: 1, size });
      setAdded(true);
      setTimeout(() => onClose(), 900);
    } catch {
      // ignore — cart endpoint returns its own error to the caller
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    toggleWishlistMutation.mutate(product._id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view ${product.title}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow transition hover:text-slate-900"
          >
            <FaTimes className="h-4 w-4" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-slate-100 md:aspect-auto md:min-h-[420px]">
              <img
                src={getProductImage(product)}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              {onSale && (
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold uppercase text-white shadow">
                  Sale
                </span>
              )}
              {!inStock && (
                <span className="absolute inset-x-3 bottom-3 rounded-lg bg-black/70 px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-white">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#0B1F3A]/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#0B1F3A]">
                  {product.category || product.sport}
                </span>
                <span className="text-xs font-semibold uppercase text-slate-400">
                  {product.team}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-slate-900 md:text-2xl">
                {product.title}
              </h3>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= Math.round(rating) ? (
                      <FaStar key={i} className="h-3.5 w-3.5" />
                    ) : (
                      <FaRegStar key={i} className="h-3.5 w-3.5" />
                    ),
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {product.rating ?? 0} ({product.reviewCount ?? 0})
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-slate-900">৳{price.toLocaleString()}</span>
                {onSale && comparePrice && (
                  <span className="text-base text-[#F5A623] line-through">
                    ৳{comparePrice.toLocaleString()}
                  </span>
                )}
                {onSale && comparePrice && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                    {Math.round(100 - (price / comparePrice) * 100)}% off
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500 line-clamp-3">
                {product.fullDescription || product.shortDescription}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase text-slate-500">
                    Select Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                            : "border-slate-300 text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || !inStock}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition ${
                    added ? "bg-emerald-500" : "bg-[#0B1F3A] hover:bg-[#132C52]"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {added ? <FaCheck className="h-4 w-4" /> : <FaShoppingBag className="h-4 w-4" />}
                  {adding ? "Adding..." : added ? "Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlist}
                  disabled={toggleWishlistMutation.isPending}
                  aria-label="Add to wishlist"
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-slate-200 text-slate-400 hover:text-red-500"
                  }`}
                >
                  {toggleWishlistMutation.isPending ? (
                    <FaSpinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <FaHeart className={isWishlisted ? "h-4 w-4 fill-current" : "h-4 w-4"} />
                  )}
                </button>
              </div>

              <Link
                to={url}
                onClick={onClose}
                className="mt-3 text-center text-sm font-semibold text-[#0B1F3A] hover:underline"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
