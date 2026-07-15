import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTshirt,
} from "react-icons/fa";
import { useProducts } from "../../hooks/useProducts";
import type { ProductSort } from "../../api/product.api";
import JerseyCard from "../../components/products/JerseyCard";

const CATEGORIES = [
  "Home Kit",
  "Away Kit",
  "Third Kit",
  "Goalkeeper Kit",
  "Retro",
  "Player Edition",
];
const TEAMS = [
  "Argentina",
  "Belgium",
  "Brazil",
  "Colombia",
  "Croatia",
  "Egypt",
  "England",
  "France",
  "Germany",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
];
const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
const PAGE_SIZE = 12;

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read every filter directly from the URL — this IS the source of truth,
  // not local component state. Refresh, share the link, or hit back/forward
  // in the browser and the exact same filters/page are restored.
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const team = searchParams.get("team") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const sort = (searchParams.get("sort") as ProductSort) || "newest";
  const page = Number(searchParams.get("page") ?? "1");

  // Local-only state for the search input, so typing doesn't rewrite the
  // URL (and refetch) on every keystroke — only after the debounce settles.
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ search: searchInput, page: "1" });
      }
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Helper: merge new values into the URL, removing empty ones entirely
  // so the URL stays clean (no "?category=&team=" clutter).
  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });
    setSearchParams(next);
  };

  const { data, isLoading, isFetching } = useProducts({
    search: search || undefined,
    category: category || undefined,
    team: team || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort,
    page,
    limit: PAGE_SIZE,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    search || category || team || minPrice || maxPrice || sort !== "newest",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Collections
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore every jersey collection, filtered your way.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-4 relative max-w-md">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search jerseys by name or team..."
          className="input input-bordered w-full pl-11"
        />
      </div>

      {/* Filter row */}
      <div className="mb-8 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Category</span>
          <select
            value={category}
            onChange={(e) =>
              updateParams({ category: e.target.value, page: "1" })
            }
            className="select select-bordered select-sm"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Team</span>
          <select
            value={team}
            onChange={(e) => updateParams({ team: e.target.value, page: "1" })}
            className="select select-bordered select-sm"
          >
            <option value="">All Teams</option>
            {TEAMS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Min Price</span>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) =>
              updateParams({ minPrice: e.target.value, page: "1" })
            }
            placeholder="$0"
            className="input input-bordered input-sm w-24"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Max Price</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) =>
              updateParams({ maxPrice: e.target.value, page: "1" })
            }
            placeholder="$500"
            className="input input-bordered input-sm w-24"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Sort By</span>
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
            className="select select-bordered select-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mb-1 text-sm font-semibold text-[#0B1F3A] hover:underline"
          >
            Clear filters
          </button>
        )}

        {!isLoading && (
          <span className="mb-1 ml-auto text-sm text-slate-500">
            {total} jersey{total === 1 ? "" : "s"} found
          </span>
        )}
      </div>

      {/* Results grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
            >
              <div className="aspect-square bg-slate-200" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/3 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${
            isFetching ? "opacity-60 transition-opacity" : ""
          }`}
        >
          {products.map((product) => (
            <JerseyCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
          <FaTshirt className="mb-4 text-4xl text-slate-300" />
          <p className="text-sm font-medium text-slate-600">
            No jerseys match your filters.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Try a different price range or category.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-full bg-[#0B1F3A] px-5 py-2 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && products.length > 0 && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() =>
              updateParams({ page: String(Math.max(1, page - 1)) })
            }
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => updateParams({ page: String(pageNumber) })}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  page === pageNumber
                    ? "bg-[#0B1F3A] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              updateParams({ page: String(Math.min(totalPages, page + 1)) })
            }
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Collections;
