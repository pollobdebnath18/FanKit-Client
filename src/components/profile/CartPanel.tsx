import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { FaShoppingBag, FaRegSadTear } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { getProductImage } from "../../lib/productImage";
import { formatBDT } from "../../lib/format";

const CartPanel = () => {
  const navigate = useNavigate();
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();
  const isLoggedIn = !!session?.user || !!currentUser;

  const { data: cartData, isLoading } = useCart(isLoggedIn);
  const items = useMemo(() => cartData?.cart?.items ?? [], [cartData]);
  const subtotal = cartData?.cart?.subtotal ?? 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex animate-pulse gap-4 rounded-2xl border border-slate-100 bg-white p-4"
          >
            <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="h-6 w-20 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
        <FaRegSadTear className="mb-4 text-5xl text-slate-300" />
        <h3 className="text-lg font-bold text-slate-700">Your cart is empty</h3>
        <p className="mt-1 text-sm text-slate-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          to="/shop/all-products"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => {
          if (!item.product) return null;
          const product = item.product;
          return (
            <div
              key={item._id}
              className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <Link to={`/products/${product._id}`} className="shrink-0">
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 rounded-xl object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {item.size && `Size: ${item.size}`}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="line-clamp-1 text-sm font-bold text-slate-900 transition hover:text-[#1D4ED8]"
                >
                  {product.title}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {formatBDT(product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:flex-row">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Subtotal
          </p>
          <p className="text-2xl font-black text-[#0B1F3A]">
            {formatBDT(subtotal)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/cart"
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Cart
          </Link>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="inline-flex items-center gap-2 rounded-full bg-[#E0A421] px-6 py-2.5 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#F5C542]"
          >
            <FaShoppingBag /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
