import { Link } from "react-router";
import { FaShoppingBag } from "react-icons/fa";
import type { CartLineItem } from "../../api/cart.api";
import { getProductImage } from "../../lib/productImage";
import { formatBDT } from "../../lib/format";
import type { SummaryTotals } from "../../lib/cartTotals";

interface OrderSummaryProps {
  items: CartLineItem[];
  totals: SummaryTotals;
  compact?: boolean;
}

const OrderSummary = ({ items, totals, compact }: OrderSummaryProps) => {
  const visibleItems = compact ? items.slice(0, 3) : items;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <FaShoppingBag className="h-4 w-4 text-[#2563EB]" />
          Order Summary
        </h2>
        <span className="text-sm font-semibold text-slate-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Products */}
      <div className="divide-y divide-slate-50 px-5">
        {visibleItems.map((item) => {
          if (!item.product) return null;
          const product = item.product;
          return (
            <div key={item._id} className="flex items-center gap-3 py-3">
              <div className="relative shrink-0">
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-lg border border-slate-100 object-cover"
                />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0B1F3A] px-1 text-[10px] font-bold text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${product._id}`}
                  className="line-clamp-1 text-sm font-semibold text-slate-800 transition hover:text-[#1D4ED8]"
                >
                  {product.title}
                </Link>
                <p className="mt-0.5 text-xs text-slate-400">
                  {item.size ? `Size: ${item.size} · ` : ""}
                  {formatBDT(product.price)} each
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold text-slate-900">
                {formatBDT(product.price * item.quantity)}
              </span>
            </div>
          );
        })}
        {compact && items.length > visibleItems.length && (
          <p className="py-3 text-center text-xs font-medium text-slate-400">
            +{items.length - visibleItems.length} more item
            {items.length - visibleItems.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="space-y-2.5 border-t border-slate-100 px-5 py-4 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">
            {formatBDT(totals.subtotal)}
          </span>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span className="font-semibold">
              −{formatBDT(totals.discount)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-slate-500">
          <span>Shipping</span>
          <span className="font-semibold text-emerald-600">
            {totals.shipping === 0 ? "Free" : formatBDT(totals.shipping)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-xl font-black text-[#0B1F3A]">
            {formatBDT(totals.total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
