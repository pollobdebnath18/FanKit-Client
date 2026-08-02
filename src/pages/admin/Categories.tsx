import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaBaseballBall,
  FaBoxOpen,
  FaFutbol,
  FaHatCowboy,
  FaRedo,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type { Product } from "../../api/product.api";
import { useProducts } from "../../hooks/useProducts";
import {
  PRODUCT_CATALOG,
  SUBCATEGORIES,
  getCatalogCategory,
  getCatalogTypeLabel,
} from "../../lib/catalog";
import PageHeader from "../../components/admin/ui/PageHeader";
import SectionCard from "../../components/admin/ui/SectionCard";
import EmptyState from "../../components/admin/ui/EmptyState";
import ErrorState from "../../components/admin/ui/ErrorState";
import Skeleton from "../../components/admin/ui/Skeleton";

const CATEGORY_ICONS: Record<string, IconType> = {
  football: FaFutbol,
  cricket: FaBaseballBall,
  accessories: FaHatCowboy,
};

const CATEGORY_CHIP: Record<string, string> = {
  football: "bg-blue-50 text-blue-600",
  cricket: "bg-emerald-50 text-emerald-600",
  accessories: "bg-amber-50 text-amber-600",
};

const Categories = () => {
  const { data: products = [], isPending, isError, refetch } = useProducts();

  const productsByCategory = useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const product of products) {
      const key = product.category ?? "other";
      (map[key] ??= []).push(product);
    }
    return map;
  }, [products]);

  const uncategorized = products.filter((p) => !getCatalogCategory(p.category ?? ""));

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        title="Categories"
        subtitle="Overview of your product catalog by category"
      />

      {isError && (
        <SectionCard>
          <ErrorState
            title="Couldn't load categories"
            message="We ran into a problem fetching your products."
            onRetry={() => void refetch()}
          />
        </SectionCard>
      )}

      {!isError && (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {isPending
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-11 w-11 rounded-xl" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="mt-5 h-5 w-28" />
                    <Skeleton className="mt-2 h-3 w-40" />
                    <div className="mt-6 space-y-3">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : PRODUCT_CATALOG.map((category, index) => {
                  const Icon = CATEGORY_ICONS[category.value] ?? FaBoxOpen;
                  const categoryProducts = productsByCategory[category.value] ?? [];
                  const typeCounts = category.types.map((type) => ({
                    ...type,
                    count: categoryProducts.filter((p) => p.type === type.value).length,
                  }));
                  const knownTypeTotal = typeCounts.reduce((sum, t) => sum + t.count, 0);
                  const extraCount = categoryProducts.length - knownTypeTotal;

                  return (
                    <motion.section
                      key={category.value}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${CATEGORY_CHIP[category.value] ?? "bg-slate-100 text-slate-500"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <h2 className="mt-4 text-lg font-bold text-slate-900">{category.label}</h2>
                      <p className="mt-0.5 text-xs text-slate-400">{category.tagline}</p>

                      <ul className="mt-5 flex-1 space-y-2.5">
                        {typeCounts.map((type) => (
                          <li key={type.value} className="flex items-center justify-between gap-2">
                            <span className="text-sm text-slate-600">{type.label}</span>
                            <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-500">
                              {type.count}
                            </span>
                          </li>
                        ))}
                        {extraCount > 0 && (
                          <li className="flex items-center justify-between gap-2">
                            <span className="text-sm text-slate-500">Other types</span>
                            <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-500">
                              {extraCount}
                            </span>
                          </li>
                        )}
                      </ul>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Subcategories
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {SUBCATEGORIES.map((sub) => {
                            const count = categoryProducts.filter(
                              (p) => p.subcategory === sub.value,
                            ).length;
                            return (
                              <span
                                key={sub.value}
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  count > 0
                                    ? "bg-brand/5 text-brand"
                                    : "bg-slate-50 text-slate-400"
                                }`}
                              >
                                {sub.label}
                                <span className="font-bold">{count}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.section>
                  );
                })}
          </div>

          {!isPending && products.length === 0 && (
            <SectionCard>
              <EmptyState
                title="No products in the catalog"
                message="Add your first product to start building out your categories."
                action={
                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                  >
                    <FaRedo className="h-3.5 w-3.5" />
                    Refresh
                  </button>
                }
              />
            </SectionCard>
          )}

          {!isPending && uncategorized.length > 0 && (
            <SectionCard title="Uncategorized products" subtitle="Products missing a category">
              <div className="flex flex-wrap gap-2">
                {uncategorized.slice(0, 12).map((product) => (
                  <span
                    key={product._id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {product.title}
                    <span className="text-slate-300">·</span>
                    {getCatalogTypeLabel("", product.type ?? "")}
                  </span>
                ))}
                {uncategorized.length > 12 && (
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-400">
                    +{uncategorized.length - 12} more
                  </span>
                )}
              </div>
            </SectionCard>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
