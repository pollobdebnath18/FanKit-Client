import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShoppingBag,
  FaEye,
  FaStar,
  FaRegStar,
  FaCheck,
} from "react-icons/fa";
import type { Product } from "../../api/product.api";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuthSession } from "../../hooks/useAuthSession";
import { toggleWishlistItem } from "../../api/wishlist.api";
import { addCartItem } from "../../api/cart.api";
import { getProductImage } from "../../lib/productImage";

interface JerseyCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  layout?: "grid" | "list";
  index?: number;
}

const Stars = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5 text-amber-400">
    {[1, 2, 3, 4, 5].map((i) =>
      i <= Math.round(rating) ? (
        <FaStar key={i} className="h-3 w-3" />
      ) : (
        <FaRegStar key={i} className="h-3 w-3" />
      ),
    )}
  </div>
));
Stars.displayName = "Stars";

const Badge = memo(
  ({ label, className }: { label: string; className: string }) => (
    <span
      className={`absolute top-3 left-3 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow ${className}`}
    >
      {label}
    </span>
  ),
);
Badge.displayName = "Badge";

const JerseyCard = ({
  product,
  onQuickView,
  layout = "grid",
  index = 0,
}: JerseyCardProps) => {
  const navigate = useNavigate();
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isLoggedIn = !!session?.user || !!currentUser;
  const image = getProductImage(product);
  const price = product.price ?? 0;
  const comparePrice = product.comparePrice ?? null;
  const onSale =
    product.onSale ?? (comparePrice != null && comparePrice > price);
  const featured = product.featured ?? false;
  const isNew = product.newArrival ?? false;
  const rating = product.rating ?? 0;
  const inStock = (product.stock ?? 0) > 0;
  const url = product.slug
    ? `/products/${product.slug}`
    : `/products/${product._id}`;

  const handleAddToCart = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLoggedIn) {
        navigate("/signin");
        return;
      }
      setAdding(true);
      try {
        await addCartItem({
          productId: product._id,
          quantity: 1,
          size: product.sizes?.[0],
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      } catch {
        // toast handled by caller if needed; keep card usable
      } finally {
        setAdding(false);
      }
    },
    [isLoggedIn, navigate, product._id, product.sizes],
  );

  const handleWishlist = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLoggedIn) {
        navigate("/signin");
        return;
      }
      setIsWishlisted((prev) => !prev);
      try {
        await toggleWishlistItem(product._id, !isWishlisted);
      } catch {
        setIsWishlisted((prev) => !prev);
      }
    },
    [isLoggedIn, navigate, product._id, isWishlisted],
  );

  const handleQuickView = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onQuickView?.(product);
    },
    [onQuickView, product],
  );

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
        className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-xl"
      >
        <Link
          to={url}
          className="relative block h-36 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100"
        >
          <img
            src={image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {onSale && (
            <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow">
              Sale
            </span>
          )}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-slate-400">
                {product.team}
              </p>
              <Link
                to={url}
                className="line-clamp-1 font-bold text-slate-900 transition hover:text-blue-600"
              >
                {product.title}
              </Link>
            </div>
            <button
              onClick={handleWishlist}
              aria-label="Add to wishlist"
              className={`rounded-full p-2 transition ${
                isWishlisted
                  ? "text-red-500"
                  : "text-slate-300 hover:text-red-500"
              }`}
            >
              <FaHeart className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {product.shortDescription}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Stars rating={rating} />
            <span className="text-xs text-slate-400">
              ({product.reviewCount ?? 0})
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900">৳{price}</span>
              {onSale && comparePrice && (
                <span className="text-sm text-[#F5A623] line-through">
                  ৳{comparePrice}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding || !inStock}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {added ? (
                <FaCheck className="h-3 w-3" />
              ) : (
                <FaShoppingBag className="h-3 w-3" />
              )}
              {adding ? "Adding..." : added ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.5) }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={url} className="block h-full w-full">
          <img
            src={image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        {featured && (
          <Badge
            label="Featured"
            className="bg-gradient-to-r from-amber-400 to-orange-500"
          />
        )}
        {isNew && !featured && <Badge label="New" className="bg-blue-600" />}
        {onSale && (
          <Badge
            label={
              comparePrice
                ? `${Math.round(100 - (price / comparePrice) * 100)}% OFF`
                : "Sale"
            }
            className="left-auto right-3 bg-red-500"
          />
        )}
        {!inStock && (
          <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Out of Stock
          </span>
        )}

        {/* Wishlist & Quick view */}
        <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition ${
              isWishlisted
                ? "text-red-500"
                : "text-slate-400 hover:text-red-500"
            }`}
          >
            <FaHeart
              className={isWishlisted ? "h-3.5 w-3.5 fill-current" : "h-3.5 w-3.5"}
            />
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-600 shadow transition hover:text-blue-600"
          >
            <FaEye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-14 z-10 flex translate-y-16 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={adding || !inStock}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white shadow-lg transition ${
              added ? "bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {added ? (
              <FaCheck className="h-3 w-3" />
            ) : (
              <FaShoppingBag className="h-3 w-3" />
            )}
            {adding ? "Adding..." : added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {product.team}
          </p>
          <div className="flex items-center gap-1">
            <Stars rating={rating} />
            <span className="text-[10px] text-slate-400">
              ({product.reviewCount ?? 0})
            </span>
          </div>
        </div>

        <Link
          to={url}
          className="mt-1 line-clamp-2 min-h-[2.5rem] font-bold text-slate-900 transition hover:text-blue-600"
        >
          {product.title}
        </Link>

        <div className="mt-1 flex items-end justify-between pt-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-lg font-bold text-slate-900">৳{price}</span>
            {onSale && comparePrice && (
              <span className="text-xs text-[#F5A623] line-through">
                ৳{comparePrice}
              </span>
            )}
          </div>
          {product.category && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
              {product.category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(JerseyCard);
