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
  href: string;
  menu: NavLinkItem[] | NavGroup[];
}

export type NavEntry =
  | { type: "link"; label: string; href: string; end?: boolean }
  | {
      type: "dropdown";
      label: string;
      href: string;
      menu: NavLinkItem[] | NavGroup[];
    };

// ---------- Dropdown data (REQUIREMENTS.md §4.2) ----------

const shopMenu: NavLinkItem[] = [
  { label: "All Products", href: "/shop/all-products" },
  { label: "Football", href: "/shop/football" },
  { label: "Cricket", href: "/shop/cricket" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "New Arrivals", href: "/collections" },
  { label: "Best Sellers", href: "/collections" },
  { label: "Sale", href: "/collections" },
];

const footballMenu: NavGroup[] = [
  {
    group: "Men's",
    links: [
      { label: "Club Jerseys", href: "/shop/football?type=club-jerseys&gender=men" },
      { label: "National Team Jerseys", href: "/shop/football?type=national-team-jerseys&gender=men" },
      { label: "Retro Jerseys", href: "/shop/football?type=retro-jerseys&gender=men" },
      { label: "Training Kits", href: "/shop/football?type=training-kits&gender=men" },
    ],
  },
  {
    group: "Women's",
    links: [
      { label: "Club Jerseys", href: "/shop/football?type=club-jerseys&gender=women" },
      { label: "National Team Jerseys", href: "/shop/football?type=national-team-jerseys&gender=women" },
    ],
  },
  {
    group: "Kids",
    links: [
      { label: "Club Jerseys", href: "/shop/football?type=club-jerseys&gender=kids" },
      { label: "National Team Jerseys", href: "/shop/football?type=national-team-jerseys&gender=kids" },
    ],
  },
];

const cricketMenu: NavGroup[] = [
  {
    group: "Men's",
    links: [
      { label: "International Jerseys", href: "/shop/cricket?type=international-jerseys&gender=men" },
      { label: "Franchise Jerseys", href: "/shop/cricket?type=franchise-jerseys&gender=men" },
      { label: "Training Jerseys", href: "/shop/cricket?type=training-jerseys&gender=men" },
    ],
  },
  {
    group: "Women's",
    links: [
      { label: "International Jerseys", href: "/shop/cricket?type=international-jerseys&gender=women" },
      { label: "Franchise Jerseys", href: "/shop/cricket?type=franchise-jerseys&gender=women" },
    ],
  },
  {
    group: "Kids",
    links: [
      { label: "International Jerseys", href: "/shop/cricket?type=international-jerseys&gender=kids" },
      { label: "Franchise Jerseys", href: "/shop/cricket?type=franchise-jerseys&gender=kids" },
    ],
  },
];

const accessoriesMenu: NavLinkItem[] = [
  { label: "Caps", href: "/shop/accessories?type=caps" },
  { label: "Scarves", href: "/shop/accessories?type=scarves" },
  { label: "Socks", href: "/shop/accessories?type=socks" },
  { label: "Water Bottles", href: "/shop/accessories?type=water-bottles" },
  { label: "Gym Bags", href: "/shop/accessories?type=gym-bags" },
  { label: "Wristbands", href: "/shop/accessories?type=wristbands" },
  { label: "Keychains", href: "/shop/accessories?type=keychains" },
  { label: "Stickers", href: "/shop/accessories?type=stickers" },
];

const dropdownItems: DropdownItem[] = [
  { label: "Football", href: "/shop/football", menu: footballMenu },
  { label: "Cricket", href: "/shop/cricket", menu: cricketMenu },
  { label: "Accessories", href: "/shop/accessories", menu: accessoriesMenu },
  { label: "Shop", href: "/shop", menu: shopMenu },
];

// Nav serial: Home, Football, Cricket, Accessories, Shop, About, Blog, Contact
export const navItems: NavEntry[] = [
  { type: "link", label: "Home", href: "/", end: true },
  ...dropdownItems.map((item) => ({
    type: "dropdown" as const,
    label: item.label,
    href: item.href,
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
