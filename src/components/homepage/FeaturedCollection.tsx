import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";
import ProductCardSkeleton from "../loader/ProductCardSkeleton";
import JerseyCard from "../products/JerseyCard";
import type { Product } from "../../api/product.api";

const QuickViewModal = lazy(
  () => import("../products/QuickViewModal"),
);

const FeaturedCollection = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 6),
    [products],
  );

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || featured.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaStar className="text-[#F5A623]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
                Editor&apos;s Pick
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
          </div>

          <Link
            to="/shop/all-products"
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <JerseyCard
                product={product}
                onQuickView={setQuickView}
                index={idx}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/shop/all-products"
            className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B1F3A]/20 transition-all duration-300 hover:bg-[#1A3A5C] hover:shadow-xl"
          >
            Shop All Featured
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>
      </div>

      <Suspense>
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </Suspense>
    </section>
  );
};

export default FeaturedCollection;
