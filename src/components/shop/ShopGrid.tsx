import { motion } from "framer-motion";
import { FaSearch, FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
import JerseyCard from "../products/JerseyCard";
import ProductCardSkeleton from "../loader/ProductCardSkeleton";
import type { Product } from "../../api/product.api";

interface ShopGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  hasSearch: boolean;
  view: "grid" | "list";
  onRetry: () => void;
  onQuickView: (product: Product) => void;
}

const ShopGrid = ({
  products,
  isLoading,
  isError,
  hasSearch,
  view,
  onRetry,
  onQuickView,
}: ShopGridProps) => {
  if (isLoading) {
    return (
      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
            : "grid grid-cols-1 gap-4"
        }
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-20 text-center">
        <FaExclamationTriangle className="h-10 w-10 text-amber-400" />
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Something went wrong
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          We couldn't load the products. Please try again.
        </p>
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-20 text-center">
        {hasSearch ? (
          <>
            <FaSearch className="h-10 w-10 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No results for your search
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try different keywords or remove some filters to see more products.
            </p>
          </>
        ) : (
          <>
            <FaBoxOpen className="h-10 w-10 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No products found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              No products match the current filters. Try clearing a few filters.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={
        view === "grid"
          ? "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
          : "grid grid-cols-1 gap-4"
      }
    >
      {products.map((product, index) => (
        <JerseyCard
          key={product._id}
          product={product}
          layout={view}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </motion.div>
  );
};

export default ShopGrid;
