export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavGroup {
  group: string;
  links: NavLinkItem[];
}

export interface DropdownItem {
  label: string;
  menu: NavLinkItem[] | NavGroup[];
}

export type NavEntry =
  | { type: "link"; label: string; href: string; end?: boolean }
  | { type: "dropdown"; label: string; menu: NavLinkItem[] | NavGroup[] };

// ---------- Dropdown data (REQUIREMENTS.md §4.2) ----------

const shopMenu: NavLinkItem[] = [
  { label: "All Products", href: "/collections" },
  { label: "Football", href: "/collections/football" },
  { label: "Cricket", href: "/collections/cricket" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Sale", href: "/collections/sale" },
];

const footballMenu: NavGroup[] = [
  {
    group: "Men's",
    links: [
      { label: "Club Jerseys", href: "/collections?category=football&subcategory=men&type=club-jerseys" },
      { label: "National Team Jerseys", href: "/collections?category=football&subcategory=men&type=national-team-jerseys" },
      { label: "Retro Jerseys", href: "/collections?category=football&subcategory=men&type=retro-jerseys" },
      { label: "Training Kits", href: "/collections?category=football&subcategory=men&type=training-kits" },
    ],
  },
  {
    group: "Women's",
    links: [
      { label: "Club Jerseys", href: "/collections?category=football&subcategory=women&type=club-jerseys" },
      { label: "National Team Jerseys", href: "/collections?category=football&subcategory=women&type=national-team-jerseys" },
    ],
  },
  {
    group: "Kids",
    links: [
      { label: "Club Jerseys", href: "/collections?category=football&subcategory=kids&type=club-jerseys" },
      { label: "National Team Jerseys", href: "/collections?category=football&subcategory=kids&type=national-team-jerseys" },
    ],
  },
];

const cricketMenu: NavGroup[] = [
  {
    group: "Men's",
    links: [
      { label: "International Jerseys", href: "/collections?category=cricket&subcategory=men&type=international-jerseys" },
      { label: "Franchise Jerseys", href: "/collections?category=cricket&subcategory=men&type=franchise-jerseys" },
      { label: "Training Jerseys", href: "/collections?category=cricket&subcategory=men&type=training-jerseys" },
    ],
  },
  {
    group: "Women's",
    links: [
      { label: "International Jerseys", href: "/collections?category=cricket&subcategory=women&type=international-jerseys" },
      { label: "Franchise Jerseys", href: "/collections?category=cricket&subcategory=women&type=franchise-jerseys" },
    ],
  },
  {
    group: "Kids",
    links: [
      { label: "International Jerseys", href: "/collections?category=cricket&subcategory=kids&type=international-jerseys" },
      { label: "Franchise Jerseys", href: "/collections?category=cricket&subcategory=kids&type=franchise-jerseys" },
    ],
  },
];

const accessoriesMenu: NavLinkItem[] = [
  { label: "Caps", href: "/collections?category=accessories&type=caps" },
  { label: "Scarves", href: "/collections?category=accessories&type=scarves" },
  { label: "Socks", href: "/collections?category=accessories&type=socks" },
  { label: "Water Bottles", href: "/collections?category=accessories&type=water-bottles" },
  { label: "Gym Bags", href: "/collections?category=accessories&type=gym-bags" },
  { label: "Wristbands", href: "/collections?category=accessories&type=wristbands" },
  { label: "Keychains", href: "/collections?category=accessories&type=keychains" },
  { label: "Stickers", href: "/collections?category=accessories&type=stickers" },
];

const dropdownItems: DropdownItem[] = [
  { label: "Football", menu: footballMenu },
  { label: "Cricket", menu: cricketMenu },
  { label: "Accessories", menu: accessoriesMenu },
  { label: "Shop", menu: shopMenu },
];

// Nav serial: Home, Football, Cricket, Accessories, Shop, About, Blog, Contact
export const navItems: NavEntry[] = [
  { type: "link", label: "Home", href: "/", end: true },
  ...dropdownItems.map((item) => ({
    type: "dropdown" as const,
    label: item.label,
    menu: item.menu,
  })),
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Blog", href: "/blog" },
  { type: "link", label: "Contact", href: "/contact" },
];

// Desktop nav excludes About/Blog/Contact (they live in the Profile dropdown)
export const desktopNavItems: NavEntry[] = navItems.filter(
  (item) => !["About", "Blog", "Contact"].includes(item.label),
);
