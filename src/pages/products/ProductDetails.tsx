import { useState } from "react";
import { useParams, Link } from "react-router";
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
} from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";

type TabKey = "overview" | "specs" | "reviews" | "related";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id!);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [sizeError, setSizeError] = useState(false);

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
        <h1 className="text-xl font-bold text-slate-900">Jersey not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          This product may have been removed or the link is incorrect.
        </p>
        <Link
          to="/jerseys"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Browse Jerseys
        </Link>
      </div>
    );
  }

  // ---------- Derived data (permissive, since backend shape may evolve) ----------
  const images: string[] =
    product.images?.length > 0
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : [];

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
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

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    // TODO: wire to cart service, e.g. addToCart({ productId: product._id, size: selectedSize, quantity })
    console.log("Add to cart:", {
      productId: product._id,
      size: selectedSize,
      quantity,
    });
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
        <Link to="/jerseys" className="hover:text-slate-700">
          Jerseys
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
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {images.length > 0 ? (
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <FaTshirt className="text-6xl" />
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((img, index) => (
                <button
                  key={img + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                    activeImage === index
                      ? "border-[#E0A421]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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
            {product.isFeatured && (
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
              ${displayPrice?.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  ${product.price.toFixed(2)}
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
                  In Stock{" "}
                  {product.stock <= 10 && `(only ${product.stock} left)`}
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

          {product.allowCustomization && (
            <p className="mt-3 text-xs text-slate-500">
              ✓ Name & number customization available at checkout
            </p>
          )}

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center rounded-full border border-slate-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-slate-900"
                aria-label="Decrease quantity"
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-slate-600 hover:text-slate-900"
                aria-label="Increase quantity"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#0B1F3A] px-6 py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/5 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              type="button"
              disabled={!inStock}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E0A421] px-6 py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#F5C542] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              <FaBolt /> Buy Now
            </button>
          </div>
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
                  ? "border-[#E0A421] text-[#0B1F3A]"
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
                  ["Category", product.category],
                  ["Brand", product.brand],
                  ["Season", product.season],
                  ["SKU", product.sku],
                  [
                    "Available Sizes",
                    sizes.length > 0 ? sizes.join(", ") : "One size",
                  ],
                  [
                    "Customization",
                    product.allowCustomization ? "Available" : "Not available",
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
                    No reviews yet for this jersey.
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
                        to={`/jerseys/${item._id}`}
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
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
                  <p className="text-sm text-slate-500">
                    No related jerseys to show right now.
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
