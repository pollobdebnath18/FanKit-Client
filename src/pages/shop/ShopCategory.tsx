import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import type { Product } from "../../api/product.api";
import type { SortOption } from "../../api/shop.api";
import { useShopProducts } from "../../hooks/useShopProducts";
import { useShopFilterParams } from "../../hooks/useShopFilterParams";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { getShopCategory } from "../../lib/shop";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ShopToolbar from "../../components/shop/ShopToolbar";
import ShopGrid from "../../components/shop/ShopGrid";
import ShopPagination from "../../components/shop/ShopPagination";
import { SHOP_CATEGORIES } from "../../lib/shop";
import ErrorPage from "../../components/error/ErrorPage";
import { usePageMeta } from "../../hooks/usePageMeta";

// Only fetched when the user actually opens quick view.
const QuickViewModal = lazy(
  () => import("../../components/products/QuickViewModal"),
);

const MOBILE_BREAKPOINT = "(max-width: 767px)";

const ShopCategory = () => {
  const { category } = useParams<{ category: string }>();
  const config = getShopCategory(category ?? "");
  // All Products page shows every item (no sport filter sent to the API).
  const sport = config?.slug === "all-products" ? "" : (config?.slug ?? "");

  usePageMeta({
    title: config
      ? `FanKit - ${config.label} Jerseys`
      : "FanKit - Jerseys & Fan Gear",
    description: config
      ? `${config.tagline}. Shop official ${config.label.toLowerCase()} jerseys and fan gear at FanKit.`
      : "Shop the full FanKit collection - official jerseys, kits and fan accessories.",
    keywords: `${config?.label ?? "FanKit"} jerseys, ${
      config?.label ?? "sports"
    } merchandise, fan gear`,
    image: "/favicon.svg",
  });

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState<Product | null>(null);
  // Local search input (instant typing) → debounced URL write (stable query key).
  const [searchInput, setSearchInput] = useState("");

  const { params, setParams, clearAll, shopFilters, activeCount } =
    useShopFilterParams(sport);

  const { data, isLoading, isError, refetch } = useShopProducts(
    shopFilters,
    !!config,
  );

  const products = data?.products ?? [];
  const totalProducts = data?.totalProducts ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? 1;

  // Sync local search state with the URL (e.g. on manual navigation / back)
  // without an effect — adjusts state during render (React recommended pattern).
  const urlSearch = params.search ?? "";
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchInput(urlSearch);
  }

  // Debounce search input → URL so the query key stays stable while typing.
  useEffect(() => {
    if (searchInput === (params.search ?? "")) return;
    const timeout = setTimeout(() => {
      setParams({ search: searchInput || undefined });
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Mobile opens a drawer; tablet toggles the inline sidebar visibility.
  const handleToggleFilters = useCallback(() => {
    if (isMobile) {
      setIsDrawerOpen((open) => !open);
    } else {
      setIsSidebarCollapsed((collapsed) => !collapsed);
    }
  }, [isMobile]);

  const handleSort = useCallback(
    (sort: SortOption) =>
      setParams({ sort: sort === "newest" ? undefined : sort }),
    [setParams],
  );

  const handlePage = useCallback(
    (page: number) => setParams({ page }, false),
    [setParams],
  );

  if (!config) {
    return <ErrorPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <ShopSidebar
            config={config}
            counts={data?.filterCounts}
            params={params}
            activeCount={activeCount}
            isOpen={isDrawerOpen}
            collapsed={isSidebarCollapsed}
            onClose={() => setIsDrawerOpen(false)}
            onChange={(updates) => setParams(updates)}
            onClearAll={clearAll}
          />

          {/* Main column */}
          <div className="min-w-0 flex-1">
            {/* Sport tabs */}
            <div className="mb-4 flex gap-2">
              {Object.values(SHOP_CATEGORIES).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    category === cat.slug
                      ? "bg-[#0B1F3A] text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <ShopToolbar
              config={config}
              totalProducts={totalProducts}
              sort={params.sort ?? "newest"}
              search={searchInput}
              view={view}
              isFilterOpen={isDrawerOpen || !isSidebarCollapsed}
              onToggleFilters={handleToggleFilters}
              onSort={handleSort}
              onSearch={setSearchInput}
              onView={setView}
            />

            <div className="mt-6">
              <ShopGrid
                products={products}
                isLoading={isLoading}
                isError={isError}
                hasSearch={!!params.search}
                view={view}
                onRetry={() => refetch()}
                onQuickView={setQuickView}
              />
            </div>

            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPage={handlePage}
            />
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </Suspense>
    </motion.div>
  );
};

export default ShopCategory;
