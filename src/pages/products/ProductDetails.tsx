import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaStar,
  FaRegStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaBolt,
  FaCheckCircle,
  FaTimesCircle,
  FaTshirt,
  FaChevronRight,
  FaHeart,
  FaCheck,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useWishlist } from "../../hooks/useWishlist";
import { addCartItem } from "../../api/cart.api";
import { toggleWishlistItem, type WishlistResponse } from "../../api/wishlist.api";
import { getProductImage } from "../../lib/productImage";
import { usePageMeta } from "../../hooks/usePageMeta";

type TabKey = "overview" | "specs" | "reviews" | "related";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();
  const { data: product, isLoading } = useProduct(id!);

  usePageMeta({
    title: product
      ? `${product.title} | FanKit`
      : "Product Details | FanKit",
    description: product?.shortDescription,
    keywords: product
      ? `${product.title}, ${product.team}, ${product.sport ?? ""} jersey`
      : "FanKit product",
    image: product?.imageUrl,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [sizeError, setSizeError] = useState(false);
  const [actionError, setActionError] = useState("");
  const [added, setAdded] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const isLoggedIn = !!session?.user || !!currentUser;
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
      const previous = queryClient.getQueryData<WishlistResponse>([
        "wishlist",
      ]);
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

  const addToCartMutation = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // ---------- Loading state ----------
  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid animate-pulse grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-square w-full rounded-2xl bg-slate-200" />
            <div className="mt-4 flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 w-20 rounded-xl bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-8 w-3/4 rounded bg-slate-200" />
            <div className="h-6 w-32 rounded bg-slate-200" />
            <div className="h-10 w-full rounded bg-slate-200" />
            <div className="h-24 w-full rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // ---------- Not found state ----------
  if (!product) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaTshirt className="mb-4 text-4xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          This product may have been removed or the link is incorrect.
        </p>
        <Link
          to="/shop"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  // ---------- Derived data ----------
  const mainImage = getProductImage(product);

  const hasDiscount =
    product.comparePrice != null && product.comparePrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.comparePrice!) * 100)
    : 0;

  const inStock = (product.stock ?? 0) > 0;
  const sizes: string[] = product.sizes ?? [];

  const reviews = product.reviews ?? [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum: number, r: { rating: number }) => sum + r.rating,
          0,
        ) / reviews.length
      : 0;

  const relatedProducts = product.relatedProducts ?? [];

  const validateSelection = () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    setActionError("");
    addToCartMutation.mutate(
      {
        productId: product._id,
        size: selectedSize ?? undefined,
        quantity,
      },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1600);
        },
        onError: (err) =>
          setActionError(
            err instanceof Error ? err.message : "Something went wrong",
          ),
      },
    );
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    setActionError("");
    setIsBuying(true);
    addToCartMutation.mutate(
      {
        productId: product._id,
        size: selectedSize ?? undefined,
        quantity,
      },
      {
        onSuccess: () => navigate("/cart"),
        onError: (err) => {
          setIsBuying(false);
          setActionError(
            err instanceof Error ? err.message : "Something went wrong",
          );
        },
      },
    );
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    setActionError("");
    toggleWishlistMutation.mutate(product._id);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Description" },
    { key: "specs", label: "Specifications" },
    {
      key: "reviews",
      label: `Reviews${reviews.length > 0 ? ` (${reviews.length})` : ""}`,
    },
    { key: "related", label: "Related Items" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-700">
          Home
        </Link>
        <FaChevronRight className="text-[8px]" />
        <Link to="/shop" className="hover:text-slate-700">
          Shop
        </Link>
        {product.category && (
          <>
            <FaChevronRight className="text-[8px]" />
            <span>{product.category}</span>
          </>
        )}
        <FaChevronRight className="text-[8px]" />
        <span className="truncate text-slate-700">{product.title}</span>
      </nav>

      {/* Top section: gallery + buy box */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* ---------- Image gallery ---------- */}
        <div>
          <div className="group aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <FaTshirt className="text-6xl" />
              </div>
            )}
          </div>

        </div>

        {/* ---------- Buy box ---------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.team && (
              <span className="rounded-full bg-[#0B1F3A]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0B1F3A]">
                {product.team}
              </span>
            )}
            {product.category && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {product.category}
              </span>
            )}
            {product.featured && (
              <span className="rounded-full bg-[#E0A421]/15 px-3 py-1 text-xs font-semibold text-[#B07E19]">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            {product.title}
          </h1>

          {/* Rating summary */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-sm text-[#E0A421]">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= Math.round(averageRating) ? (
                  <FaStar key={star} />
                ) : (
                  <FaRegStar key={star} />
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
            >
              {reviews.length > 0
                ? `${averageRating.toFixed(1)} (${reviews.length} review${reviews.length === 1 ? "" : "s"})`
                : "No reviews yet"}
            </button>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-black text-slate-900">
              ৳{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-[#F5A623] line-through">
                  ৳{product.comparePrice!.toLocaleString()}
                </span>
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-[#D6392E]">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            {inStock ? (
              <>
                <FaCheckCircle className="text-green-600" />
                <span className="font-medium text-green-700">
                  In Stock {product.stock <= 10 && `(only ${product.stock} left)`}
                </span>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-slate-400" />
                <span className="font-medium text-slate-500">Out of Stock</span>
              </>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {product.shortDescription}
          </p>

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Size
                </span>
                {sizeError && (
                  <span className="text-xs text-error">
                    Please select a size
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`h-11 w-14 rounded-lg border text-sm font-semibold transition-colors ${
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

          {product.status === "active" &&
            product.tags?.includes("customization") && (
              <p className="mt-3 text-xs text-slate-500">
                ✓ Name & number customization available at checkout
              </p>
            )}

          {/* Quantity + Actions + Wishlist — single row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-slate-300">
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.max(1, Math.min(product.stock ?? 1, q - 1)))
                }
                disabled={!inStock}
                className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label="Decrease quantity"
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock ?? 1, q + 1))
                }
                disabled={!inStock}
                className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
                aria-label="Increase quantity"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock || addToCartMutation.isPending || isBuying}
              className={`flex items-center justify-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 ${
                added
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A]/5"
              }`}
            >
              {added ? (
                <FaCheck />
              ) : addToCartMutation.isPending ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaShoppingCart />
              )}
              {added
                ? "Added"
                : addToCartMutation.isPending
                  ? "Adding..."
                  : "Add to Cart"}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!inStock || addToCartMutation.isPending || isBuying}
              className="flex items-center justify-center gap-2 rounded-full bg-[#E0A421] px-6 py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#F5C542] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {isBuying ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaBolt />
              )}
              {isBuying ? "Processing..." : "Buy Now"}
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              disabled={toggleWishlistMutation.isPending}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-slate-300 text-slate-400 hover:border-red-300 hover:text-red-500"
              }`}
            >
              {toggleWishlistMutation.isPending ? (
                <FaSpinner className="h-4 w-4 animate-spin" />
              ) : (
                <FaHeart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              )}
            </button>
          </div>

          {actionError && (
            <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-600">
              <FaExclamationCircle /> {actionError}
            </p>
          )}
        </div>
      </div>

      {/* ---------- Tabbed detail sections ---------- */}
      <div className="mt-14">
        <div className="flex gap-6 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-[#F5A623] text-[#0B1F3A]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {/* Description / Overview */}
          {activeTab === "overview" && (
            <div className="max-w-3xl">
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {product.fullDescription}
              </p>
            </div>
          )}

          {/* Key Information / Specifications */}
          {activeTab === "specs" && (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-slate-200">
              <dl className="divide-y divide-slate-100">
                {[
                  ["Team / Country", product.team],
                  ["Sport", product.sport],
                  ["Category", product.category],
                  ["Gender", product.gender],
                  ["Brand", product.brand],
                  ["Season", product.season],
                  ["SKU", product.sku],
                  [
                    "Available Sizes",
                    sizes.length > 0 ? sizes.join(", ") : "One size",
                  ],
                  [
                    "Colors",
                    product.colors && product.colors.length > 0
                      ? product.colors.join(", ")
                      : null,
                  ],
                  [
                    "Customization",
                    product.tags?.includes("customization")
                      ? "Available"
                      : "Not available",
                  ],
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 px-5 py-3 text-sm"
                    >
                      <dt className="font-medium text-slate-500">{label}</dt>
                      <dd className="text-right font-semibold text-slate-800">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          {/* Reviews / Ratings */}
          {activeTab === "reviews" && (
            <div className="max-w-2xl">
              {reviews.length > 0 ? (
                <div className="space-y-5">
                  {reviews.map(
                    (review: {
                      id: string;
                      author: string;
                      rating: number;
                      comment: string;
                      date?: string;
                    }) => (
                      <div
                        key={review.id}
                        className="border-b border-slate-100 pb-5 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800">
                            {review.author}
                          </p>
                          {review.date && (
                            <span className="text-xs text-slate-400">
                              {review.date}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex text-xs text-[#E0A421]">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= review.rating ? (
                              <FaStar key={star} />
                            ) : (
                              <FaRegStar key={star} />
                            ),
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {review.comment}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
                  <p className="text-sm text-slate-500">
                    No reviews yet for this product.
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Be the first to share your experience.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Related Items */}
          {activeTab === "related" && (
            <div>
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {relatedProducts.map(
                    (item: {
                      _id: string;
                      title: string;
                      price: number;
                      imageUrl?: string;
                      images?: string[];
                    }) => (
                      <Link
                        key={item._id}
                        to={`/products/${item._id}`}
                        className="group overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-lg"
                      >
                        <div className="aspect-square overflow-hidden bg-slate-50">
                          <img
                            src={item.images?.[0] ?? item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ৳{item.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
                  <p className="text-sm text-slate-500">
                    No related products to show right now.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
