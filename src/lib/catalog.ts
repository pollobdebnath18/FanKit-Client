export type ProductCategory = "football" | "cricket" | "accessories";

export interface CatalogType {
  value: string;
  label: string;
}

export interface CatalogCategory {
  value: ProductCategory;
  label: string;
  tagline: string;
  types: CatalogType[];
}

export const PRODUCT_CATALOG: CatalogCategory[] = [
  {
    value: "football",
    label: "Football",
    tagline: "Club, national, retro & training kits",
    types: [
      { value: "club-jerseys", label: "Club Jerseys" },
      { value: "national-team-jerseys", label: "National Team Jerseys" },
      { value: "retro-jerseys", label: "Retro Jerseys" },
      { value: "training-kits", label: "Training Kits" },
    ],
  },
  {
    value: "cricket",
    label: "Cricket",
    tagline: "International, franchise & training jerseys",
    types: [
      { value: "international-jerseys", label: "International Jerseys" },
      { value: "franchise-jerseys", label: "Franchise Jerseys" },
      { value: "training-jerseys", label: "Training Jerseys" },
    ],
  },
  {
    value: "accessories",
    label: "Accessories",
    tagline: "Caps, scarves, bottles & more",
    types: [
      { value: "caps", label: "Caps" },
      { value: "scarves", label: "Scarves" },
      { value: "socks", label: "Socks" },
      { value: "water-bottles", label: "Water Bottles" },
      { value: "gym-bags", label: "Gym Bags" },
      { value: "wristbands", label: "Wristbands" },
      { value: "keychains", label: "Keychains" },
      { value: "stickers", label: "Stickers" },
    ],
  },
];

export const SUBCATEGORIES = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "unisex", label: "Unisex" },
] as const;

export const getCatalogCategory = (
  value: string,
): CatalogCategory | undefined =>
  PRODUCT_CATALOG.find((c) => c.value === value);

export const getCatalogTypeLabel = (
  category: string,
  type: string,
): string => {
  const catalogCategory = getCatalogCategory(category);
  return (
    catalogCategory?.types.find((t) => t.value === type)?.label ??
    type.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};
