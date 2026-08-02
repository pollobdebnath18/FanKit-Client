import type { CartLineItem } from "../api/cart.api";

export interface SummaryTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export const computeSummaryTotals = (items: CartLineItem[]): SummaryTotals => {
  let subtotal = 0;
  let discount = 0;
  for (const item of items) {
    const product = item.product;
    if (!product) continue;
    subtotal += product.price * item.quantity;
    if (product.comparePrice && product.comparePrice > product.price) {
      discount += (product.comparePrice - product.price) * item.quantity;
    }
  }
  const shipping = 0;
  return { subtotal, discount, shipping, total: subtotal + shipping };
};
