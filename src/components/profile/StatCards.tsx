import type { ComponentType } from "react";
import { FaShoppingBag, FaHeart, FaShoppingCart, FaCoins } from "react-icons/fa";
import { formatBDT } from "../../lib/format";

interface Stat {
  key: string;
  label: string;
  value: string;
  Icon: ComponentType<{ className?: string }>;
  accent: string;
}

interface StatCardsProps {
  ordersCount: number;
  wishlistCount: number;
  cartCount: number;
  totalSpent: number;
}

const StatCards = ({
  ordersCount,
  wishlistCount,
  cartCount,
  totalSpent,
}: StatCardsProps) => {
  const stats: Stat[] = [
    {
      key: "orders",
      label: "Total Orders",
      value: String(ordersCount),
      Icon: FaShoppingBag,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      key: "wishlist",
      label: "Wishlist Items",
      value: String(wishlistCount),
      Icon: FaHeart,
      accent: "from-rose-500 to-red-500",
    },
    {
      key: "cart",
      label: "Cart Items",
      value: String(cartCount),
      Icon: FaShoppingCart,
      accent: "from-amber-500 to-orange-500",
    },
    {
      key: "spent",
      label: "Total Spent",
      value: formatBDT(totalSpent),
      Icon: FaCoins,
      accent: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ key, label, value, Icon, accent }) => (
        <div
          key={key}
          className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-black text-slate-900">{value}</p>
            <p className="truncate text-xs font-semibold text-slate-500">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
