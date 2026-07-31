import { motion } from "framer-motion";
import { FaSlidersH, FaThLarge, FaList, FaSearch } from "react-icons/fa";
import { SORT_OPTIONS, type ShopCategoryConfig } from "../../lib/shop";
import type { SortOption } from "../../api/shop.api";

interface ShopToolbarProps {
  config: ShopCategoryConfig;
  totalProducts: number;
  sort: SortOption;
  search: string;
  view: "grid" | "list";
  isFilterOpen: boolean;
  onToggleFilters: () => void;
  onSort: (sort: SortOption) => void;
  onSearch: (search: string) => void;
  onView: (view: "grid" | "list") => void;
}

const ShopToolbar = ({
  config,
  totalProducts,
  sort,
  search,
  view,
  isFilterOpen,
  onToggleFilters,
  onSort,
  onSearch,
  onView,
}: ShopToolbarProps) => {
  return (
    <div className="space-y-4">
      {/* Title + count */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            {config.label}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalProducts} product{totalProducts === 1 ? "" : "s"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-44 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-400 sm:w-56"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={onToggleFilters}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition lg:hidden ${
              isFilterOpen
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
            }`}
          >
            <FaSlidersH className="h-3.5 w-3.5" />
            Filters
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortOption)}
            aria-label="Sort products"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>

          {/* Grid / list toggle */}
          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onView("grid")}
              aria-label="Grid view"
              className={`px-3 py-2 transition ${
                view === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <FaThLarge className="h-3.5 w-3.5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onView("list")}
              aria-label="List view"
              className={`px-3 py-2 transition ${
                view === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <FaList className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;
