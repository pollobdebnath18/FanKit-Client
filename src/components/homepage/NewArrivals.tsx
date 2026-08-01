import { lazy, Suspense, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";
import ProductCardSkeleton from "../loader/ProductCardSkeleton";
import JerseyCard from "../products/JerseyCard";
import { Link } from "react-router";
import type { Product } from "../../api/product.api";

const QuickViewModal = lazy(
  () => import("../products/QuickViewModal"),
);

const NewArrivals = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const [quickView, setQuickView] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500 text-lg">Failed to load products.</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              New{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Arrivals
              </span>
            </h2>

            <p className="text-lg text-gray-600">
              Fresh jersey collections just added
            </p>
          </div>

          <Link
            to="shop/all-products"
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        {/* No Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold">No Products Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <JerseyCard key={product._id} product={product} onQuickView={setQuickView} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">
            Discover our newest jersey collection!
          </p>

          <Link
            to="/shop/all-products"
            className="px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Shop All New Jerseys
          </Link>
        </div>
      </div>

      <Suspense>
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </Suspense>
    </section>
  );
};

export default NewArrivals;
