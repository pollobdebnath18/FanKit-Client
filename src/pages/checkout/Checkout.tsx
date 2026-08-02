import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaSpinner,
  FaLock,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useToast } from "../../lib/toast-context";
import { validateCheckout } from "../../lib/validation";
import type {
  CheckoutErrors,
  CheckoutForm,
  CheckoutShipping,
  CheckoutCustomer,
} from "../../lib/validation";
import { PaymentsAPI } from "../../api/payments.api";
import { stripePromise } from "../../lib/stripeClient";
import CustomerInfoForm from "../../components/checkout/CustomerInfoForm";
import ShippingForm from "../../components/checkout/ShippingForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import { computeSummaryTotals } from "../../lib/cartTotals";
import PaymentMethodSelector, {
  PaymentSecurityNote,
} from "../../components/checkout/PaymentMethodSelector";
import type { CheckoutMethod } from "../../components/checkout/PaymentMethodSelector";
import StripePaymentForm from "../../components/checkout/StripePaymentForm";
import BkashPaymentButton from "../../components/checkout/BkashPaymentButton";

interface StripeSession {
  clientSecret: string;
  orderId: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: session } = useAuthSession();
  const isLoggedIn = !!session?.user;

  const { data: cartData, isLoading } = useCart(isLoggedIn);
  const items = useMemo(() => cartData?.cart?.items ?? [], [cartData]);
  const totals = useMemo(() => computeSummaryTotals(items), [items]);

  const [method, setMethod] = useState<CheckoutMethod>("stripe");
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [stripeSession, setStripeSession] = useState<StripeSession | null>(
    null,
  );

  const [form, setForm] = useState<CheckoutForm>(() => ({
    customer: {
      fullName: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      phone: "",
    },
    shipping: { address: "", city: "", postalCode: "", country: "" },
  }));

  // Customer name/email are prefilled from the session (resolved by PrivateRoute).
  const updateCustomer = (field: keyof CheckoutCustomer, value: string) => {
    setForm((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateShipping = (
    field: keyof CheckoutShipping,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const payload = useMemo(
    () => ({
      customer: form.customer,
      shippingAddress: form.shipping,
    }),
    [form.customer, form.shipping],
  );

  const validate = () => {
    const nextErrors = validateCheckout(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      toast.error("Please fix the highlighted fields to continue.");
      return false;
    }
    return true;
  };

  const stripeIntentMutation = useMutation({
    mutationFn: () => PaymentsAPI.createStripeIntent(payload),
    onSuccess: (data) => {
      setStripeSession({
        clientSecret: data.clientSecret,
        orderId: data.orderId,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to start card payment.");
    },
  });

  const handleStripeContinue = () => {
    if (!validate()) return;
    stripeIntentMutation.mutate();
  };

  const handleStripeSuccess = (paymentIntentId: string) => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    if (!stripeSession) return;
    const param = paymentIntentId ? `&payment_intent=${paymentIntentId}` : "";
    navigate(
      `/payment/success?orderId=${stripeSession.orderId}&method=stripe${param}`,
      { replace: true },
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaLock className="mb-4 text-5xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">
          Please sign in to complete your purchase.
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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 h-7 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-100 bg-white p-6"
              >
                <div className="mb-4 h-5 w-40 rounded bg-slate-200" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-10 rounded-xl bg-slate-100" />
                  <div className="h-10 rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-96 animate-pulse rounded-2xl border border-slate-100 bg-white" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <FaCreditCard className="mb-4 text-5xl text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add some jerseys before heading to checkout.
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to="/cart"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline"
      >
        <FaArrowLeft className="text-xs" />
        Back to Cart
      </Link>

      <h1 className="mb-8 text-2xl font-black text-[#0B1F3A] md:text-3xl">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left — forms + payment */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Information */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                <FaUser className="h-3.5 w-3.5" />
              </span>
              Customer Information
            </h2>
            <CustomerInfoForm
              value={form.customer}
              errors={errors}
              onChange={updateCustomer}
            />
          </motion.section>

          {/* Shipping Information */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                <FaMapMarkerAlt className="h-3.5 w-3.5" />
              </span>
              Shipping Information
            </h2>
            <ShippingForm
              value={form.shipping}
              errors={errors}
              onChange={updateShipping}
            />
          </motion.section>

          {/* Payment Method */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                <FaCreditCard className="h-3.5 w-3.5" />
              </span>
              Payment Method
            </h2>
            <PaymentMethodSelector value={method} onChange={setMethod} />
            <PaymentSecurityNote />
          </motion.section>

          {/* Payment panel */}
          <motion.section
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {method === "stripe" ? (
              stripeSession ? (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret: stripeSession.clientSecret }}
                >
                  <StripePaymentForm
                    amount={totals.total}
                    email={form.customer.email}
                    orderId={stripeSession.orderId}
                    onSuccess={handleStripeSuccess}
                  />
                </Elements>
              ) : (
                <button
                  type="button"
                  onClick={handleStripeContinue}
                  disabled={stripeIntentMutation.isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {stripeIntentMutation.isPending ? (
                    <>
                      <FaSpinner className="h-4 w-4 animate-spin" />
                      Preparing secure payment…
                    </>
                  ) : (
                    <>
                      <FaLock className="h-3.5 w-3.5" />
                      Continue with Card Payment
                    </>
                  )}
                </button>
              )
            ) : (
              <BkashPaymentButton
                amount={totals.total}
                beforePay={validate}
              />
            )}
          </motion.section>
        </div>

        {/* Right — order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary items={items} totals={totals} compact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
