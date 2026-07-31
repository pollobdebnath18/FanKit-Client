import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import type { FilterCounts } from "../../api/shop.api";
import {
  GENDER_OPTIONS,
  PRICE_RANGES,
  slugify,
  type ShopCategoryConfig,
} from "../../lib/shop";
import type { ShopFilterParams } from "../../hooks/useShopFilterParams";

interface ShopSidebarProps {
  config: ShopCategoryConfig;
  counts: FilterCounts | undefined;
  params: ShopFilterParams;
  activeCount: number;
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onChange: (updates: Partial<ShopFilterParams>) => void;
  onClearAll: () => void;
}

const sortEntries = (record: Record<string, number> | undefined) =>
  Object.entries(record ?? {}).sort(
    ([, a], [, b]) => (b as number) - (a as number),
  );

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => (
  <div className="border-b border-slate-100 py-4">
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold uppercase tracking-wide text-slate-700">
        {title}
        <FaChevronDown className="h-3 w-3 text-slate-400 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3 space-y-1.5">{children}</div>
    </details>
  </div>
);

const FilterButton = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition ${
      active
        ? "bg-[#E0A421]/10 font-semibold text-[#E0A421]"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <span className="truncate">{label}</span>
    {count != null && (
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
          active ? "bg-[#E0A421] text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const ShopSidebar = ({
  config,
  counts,
  params,
  activeCount,
  isOpen,
  collapsed,
  onClose,
  onChange,
  onClearAll,
}: ShopSidebarProps) => {
  const types = sortEntries(counts?.types);
  const brands = sortEntries(counts?.brands);

  const content = (
    <div className="sidebar-scroll flex h-full max-h-[inherit] flex-col overflow-y-auto">
      {isOpen && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="font-bold text-slate-900">Filters</h3>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <FaTimes className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="px-5">
        {activeCount > 0 && (
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs font-semibold text-slate-500">
              {activeCount} active filter{activeCount > 1 ? "s" : ""}
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-bold text-[#E0A421] hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        <FilterSection title="Product Type">
          {types.length === 0 && (
            <p className="px-2.5 text-sm text-slate-400">No types yet</p>
          )}
          {types.map(([type, count]) => {
            const slug = slugify(type);
            return (
              <FilterButton
                key={type}
                label={type}
                count={count as number}
                active={params.type === slug}
                onClick={() =>
                  onChange({ type: params.type === slug ? undefined : slug })
                }
              />
            );
          })}
        </FilterSection>

        <FilterSection title="Gender">
          {GENDER_OPTIONS.map((gender) => {
            const count = counts?.genders?.[gender.value];
            if (count == null && params.gender !== gender.value) return null;
            return (
              <FilterButton
                key={gender.value}
                label={gender.label}
                count={count}
                active={params.gender === gender.value}
                onClick={() =>
                  onChange({
                    gender: params.gender === gender.value ? undefined : gender.value,
                  })
                }
              />
            );
          })}
        </FilterSection>

        <FilterSection title="Price">
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range) => (
              <FilterButton
                key={range.value}
                label={range.label}
                active={params.price === range.value}
                onClick={() =>
                  onChange({ price: params.price === range.value ? undefined : range.value })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability" defaultOpen={false}>
          <FilterButton
            label="In Stock"
            count={counts?.inStock}
            active={params.availability === "in-stock"}
            onClick={() =>
              onChange({
                availability: params.availability === "in-stock" ? undefined : "in-stock",
              })
            }
          />
          <FilterButton
            label="Out of Stock"
            count={counts?.outOfStock}
            active={params.availability === "out-of-stock"}
            onClick={() =>
              onChange({
                availability: params.availability === "out-of-stock" ? undefined : "out-of-stock",
              })
            }
          />
        </FilterSection>

        {brands.length > 0 && (
          <FilterSection title="Brand" defaultOpen={false}>
            {brands.map(([brand, count]) => (
              <FilterButton
                key={brand}
                label={brand}
                count={count as number}
                active={params.brand === brand}
                onClick={() => onChange({ brand: params.brand === brand ? undefined : brand })}
              />
            ))}
          </FilterSection>
        )}
      </div>

      {isOpen && (
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#0B1F3A] py-3 text-sm font-bold text-white transition hover:bg-[#132C52]"
          >
            Show Results
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet sidebar — collapsible on tablet via the `collapsed` flag */}
      <aside
        className={
          collapsed
            ? "hidden md:hidden lg:block md:w-64 lg:w-1/4"
            : "hidden md:block md:w-64 lg:w-1/4"
        }
      >
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-[90] w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer label used by toolbar for mobile filter button context */}
      <span className="sr-only">{config.label} filters</span>
    </>
  );
};

export default ShopSidebar;
