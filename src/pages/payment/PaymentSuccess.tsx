import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import PaymentResultLayout from "../../components/checkout/PaymentResultLayout";
import SuccessAnimation from "../../components/checkout/SuccessAnimation";
import { useOrderByPayment } from "../../hooks/useOrders";
import { PaymentsAPI } from "../../api/payments.api";
import { paymentMethodIcon, paymentMethodLabel } from "../../lib/orderStatus";
import { formatBDT, formatDate } from "../../lib/format";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const queryClient = useQueryClient();

  const orderId = params.get("orderId");
  const method = params.get("method");
  const trxID = params.get("trxID");
  const amount = params.get("amount");
  const paymentIntent = params.get("payment_intent");
  const redirectStatus = params.get("redirect_status");

  // Stripe 3DS redirects back here with only a payment_intent — resolve the order.
  const { data: paymentOrder } = useOrderByPayment(
    !orderId && paymentIntent ? paymentIntent : undefined,
    !orderId && Boolean(paymentIntent),
  );

  const order = orderId ? null : paymentOrder?.order ?? null;

  const isBkashDemo = method === "bkash" && !orderId;

  // Confirm the payment on the server (idempotent with the webhook) so the
  // order shows as paid in "My Orders" and the cart is cleared.
  const confirmMutation = useMutation({
    mutationFn: (paymentIntentId: string) =>
      PaymentsAPI.confirmStripePayment(paymentIntentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    if (paymentIntent && !isBkashDemo) {
      confirmMutation.mutate(paymentIntent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIntent, isBkashDemo]);

  const displayOrderId = orderId ?? order?._id ?? "";
  const displayMethod =
    method === "bkash"
      ? "bKash"
      : method === "stripe"
        ? "Card (Stripe)"
        : order?.paymentMethod
          ? paymentMethodLabel[order.paymentMethod]
          : "";
  const MethodIcon =
    method === "bkash"
      ? paymentMethodIcon.bkash
      : paymentMethodIcon.stripe;

  const displayTrxID =
    trxID ?? order?.transactionId ?? (paymentIntent ? paymentIntent : "");
  const displayAmount = amount
    ? Number(amount)
    : order
      ? order.total
      : null;

  // If we expected a Stripe redirect but it didn't succeed, redirect to failure.
  useEffect(() => {
    if (paymentIntent && redirectStatus && redirectStatus !== "succeeded") {
      window.location.href = `/payment/failure${orderId ? `?orderId=${orderId}` : ""}`;
    }
  }, [paymentIntent, redirectStatus, orderId]);

  return (
    <PaymentResultLayout
      icon={<SuccessAnimation size={100} />}
      title="Payment Successful!"
      subtitle="Thank you for your purchase. Your order has been confirmed."
    >
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/50">
        <div className="grid grid-cols-2 gap-4 p-5 text-left">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Order ID
            </p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-900">
              {displayOrderId
                ? displayOrderId.slice(-10).toUpperCase()
                : isBkashDemo
                  ? "Demo"
                  : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Payment Method
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              {MethodIcon && (
                <MethodIcon className="h-4 w-4 text-[#E2136E]" />
              )}
              {displayMethod || "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Transaction ID
            </p>
            <p className="mt-1 break-all font-mono text-sm font-bold text-slate-900">
              {displayTrxID || "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Amount Paid
            </p>
            <p className="mt-1 text-sm font-bold text-emerald-600">
              {displayAmount !== null ? formatBDT(displayAmount) : "—"}
            </p>
          </div>
        </div>
        {order && (
          <p className="border-t border-emerald-100 px-5 py-3 text-xs text-slate-500">
            Ordered on {formatDate(order.createdAt)}
          </p>
        )}
        {isBkashDemo && (
          <p className="border-t border-emerald-100 bg-amber-50/50 px-5 py-3 text-xs font-medium text-amber-600">
            bKash is a demo checkout — no order was recorded. Your cart has not
            been changed.
          </p>
        )}
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        {!isBkashDemo && (
          <Link
            to="/orders"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3 text-sm font-bold text-white transition-colors hover:bg-[#132C52]"
          >
            View My Orders
            <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
        <Link
          to="/shop/all-products"
          className={`flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 ${
            isBkashDemo ? "border-[#0B1F3A] bg-[#0B1F3A] text-white hover:bg-[#132C52]" : ""
          }`}
        >
          <FaShoppingBag className="h-3.5 w-3.5" />
          Continue Shopping
        </Link>
      </div>
    </PaymentResultLayout>
  );
};

export default PaymentSuccess;
