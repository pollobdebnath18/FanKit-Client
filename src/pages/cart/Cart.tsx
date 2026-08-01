import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
  FaRegSadTear,
} from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { CartAPI, type CartResponse } from "../../api/cart.api";
import { getProductImage } from "../../lib/productImage";

const Cart = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session } = useAuthSession();
  const { currentUser } = useCurrentUser();
  const isLoggedIn = !!session?.user || !!currentUser;

  const { data: cartData, isLoading } = useCart(isLoggedIn);
  const items = useMemo(() => cartData?.cart?.items ?? [], [cartData]);
  const subtotal = cartData?.cart?.subtotal ?? 0;

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      CartAPI.update(id, quantity),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData<CartResponse>(["cart"]);
      queryClient.setQueryData<CartResponse>(["cart"], (old) => {
        if (!old) return old;
        const newItems = old.cart.items.map((item) =>
          item._id === id ? { ...item, quantity } : item,
        );
        const newSubtotal = newItems.reduce(
          (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
          0,
        );
        return {
          ...old,
          cart: { ...old.cart, items: newItems, subtotal: newSubtotal },
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => CartAPI.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData<CartResponse>(["cart"]);
      queryClient.setQueryData<CartResponse>(["cart"], (old) => {
        if (!old) return old;
        const newItems = old.cart.items.filter((item) => item._id !== id);
        const newSubtotal = newItems.reduce(
          (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
          0,
        );
        return {
          ...old,
          cart: { ...old.cart, items: newItems, subtotal: newSubtotal },
        };
      });
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: () => CartAPI.clear(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData<CartResponse>(["cart"]);
      queryClient.setQueryData<CartResponse>(["cart"], (old) => {
        if (!old) return old;
        return { ...old, cart: { ...old.cart, items: [], subtotal: 0 } };
      });
      return { previous };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaShoppingBag className="mb-4 text-5xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Your Cart</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to view your cart items.
        </p>
        <Link
          to="/signin"
          className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Shopping Cart</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4 rounded-2xl border border-slate-100 bg-white p-4">
              <div className="h-24 w-24 shrink-0 rounded-xl bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-6 w-20 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Shopping Cart
          <span className="ml-2 text-base font-normal text-slate-500">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 py-20 text-center">
          <FaRegSadTear className="mb-4 text-5xl text-slate-300" />
          <h2 className="text-lg font-bold text-slate-700">Your cart is empty</h2>
          <p className="mt-1 text-sm text-slate-500">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            to="/shop"
            className="mt-6 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#132C52]"
          >
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => {
                if (!item.product) return null;
                const product = item.product;
                const url = `/products/${product._id}`;
                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.25 }}
                    className="mb-4 flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <Link to={url} className="shrink-0">
                      <img
                        src={getProductImage(product)}
                        alt={product.title}
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        className="h-24 w-24 rounded-xl object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {item.size && `Size: ${item.size}`}
                          </p>
                          <Link
                            to={url}
                            className="line-clamp-1 text-sm font-bold text-slate-900 transition hover:text-[#1D4ED8]"
                          >
                            {product.title}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMutation.mutate(item._id)}
                          disabled={removeMutation.isPending}
                          className="shrink-0 rounded-full p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <FaTrashAlt className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-slate-300">
                          <button
                            type="button"
                            onClick={() =>
                              updateMutation.mutate({
                                id: item._id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                            disabled={item.quantity <= 1 || updateMutation.isPending}
                            className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus className="text-[10px]" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateMutation.mutate({
                                id: item._id,
                                quantity: item.quantity + 1,
                              })
                            }
                            disabled={updateMutation.isPending}
                            className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
                            aria-label="Increase quantity"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>
                        <span className="text-base font-bold text-slate-900">
                          ৳{(product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <Link
              to="/shop"
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline"
            >
              <FaArrowLeft className="text-xs" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

              <div className="mt-4 space-y-3 border-b border-slate-100 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-base font-bold text-slate-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#E0A421] py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#F5C542]"
              >
                <FaShoppingBag />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
