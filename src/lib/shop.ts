import type { SortOption } from "../api/shop.api";

export interface ShopCategoryConfig {
  slug: string;
  label: string;
  tagline: string;
  heroFrom: string;
  heroTo: string;
  accent: string;
}

export const ALL_PRODUCTS_CONFIG: ShopCategoryConfig = {
  slug: "all-products",
  label: "All Products",
  tagline: "Browse the complete FanKit collection",
  heroFrom: "#111827",
  heroTo: "#374151",
  accent: "#F5A623",
};

export const SHOP_CATEGORIES: Record<string, ShopCategoryConfig> = {
  [ALL_PRODUCTS_CONFIG.slug]: ALL_PRODUCTS_CONFIG,
  football: {
    slug: "football",
    label: "Football",
    tagline: "Official football kits, retro legends & training gear",
    heroFrom: "#0B1F3A",
    heroTo: "#2563EB",
    accent: "#F5A623",
  },
  cricket: {
    slug: "cricket",
    label: "Cricket",
    tagline: "National, franchise & training cricket jerseys",
    heroFrom: "#0D2B22",
    heroTo: "#10B981",
    accent: "#F59E0B",
  },
  accessories: {
    slug: "accessories",
    label: "Accessories",
    tagline: "Caps, scarves, bottles & more to complete the look",
    heroFrom: "#1F2937",
    heroTo: "#6B7280",
    accent: "#EF4444",
  },
};

export const SHOP_CATEGORY_SLUGS = Object.keys(SHOP_CATEGORIES);

export const getShopCategory = (slug: string): ShopCategoryConfig | null =>
  SHOP_CATEGORIES[slug] ??
  (slug === ALL_PRODUCTS_CONFIG.slug ? ALL_PRODUCTS_CONFIG : null);

export interface GenderOption {
  value: string;
  label: string;
}

export const GENDER_OPTIONS: GenderOption[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "unisex", label: "Unisex" },
];

export interface SortOptionItem {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionItem[] = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "best-selling", label: "Best Selling" },
  { value: "highest-rated", label: "Highest Rated" },
];

export interface PriceRangeOption {
  value: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGES: PriceRangeOption[] = [
  { value: "all", label: "All Prices", min: 0, max: Number.MAX_SAFE_INTEGER },
  { value: "under-200", label: "Under - 300", min: 0, max: 200 },
  { value: "200-400", label: "200 – 400", min: 200, max: 400 },
  { value: "400-600", label: "400 – 600", min: 400, max: 600 },
  { value: "over-600", label: "Over - 800", min: 600, max: Number.MAX_SAFE_INTEGER },
];

export const getPriceRange = (value: string): PriceRangeOption =>
  PRICE_RANGES.find((r) => r.value === value) ?? PRICE_RANGES[0];

/**
 * Converts a display label ("Club Jerseys") to a URL-safe slug
 * ("club-jerseys"). The server normalizes slugs back to labels when filtering.
 */
export const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

export const DEFAULT_LIMIT = 12;
