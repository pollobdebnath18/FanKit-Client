import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { FaLock, FaSpinner } from "react-icons/fa";
import { useToast } from "../../lib/toast-context";
import { formatBDT } from "../../lib/format";

interface StripePaymentFormProps {
  amount: number;
  orderId: string;
  email: string;
  onSuccess: (paymentIntentId: string) => void;
}

const StripePaymentForm = ({
  amount,
  email,
  onSuccess,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsPaying(true);
    setError(null);

    const { error: submitError, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

    if (submitError) {
      setError(submitError.message ?? "Payment failed. Please try again.");
      toast.error(submitError.message ?? "Payment failed.");
      setIsPaying(false);
      return;
    }

    // No redirect required — payment already succeeded.
    onSuccess(paymentIntent?.id ?? "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <p className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
        <FaLock className="h-3.5 w-3.5 text-[#2563EB]" />
        Card Payment
      </p>

      <PaymentElement
        options={{
          layout: {
            type: "tabs",
            defaultCollapsed: false,
          },
          business: { name: "FanKit" },
        }}
      />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={!stripe || !elements || isPaying}
        whileTap={{ scale: 0.98 }}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3 text-sm font-bold text-white transition-colors hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPaying ? (
          <>
            <FaSpinner className="h-4 w-4 animate-spin" />
            Processing Payment…
          </>
        ) : (
          <>
            <FaLock className="h-3.5 w-3.5" />
            Pay {formatBDT(amount)}
          </>
        )}
      </motion.button>
    </form>
  );
};

export default StripePaymentForm;
