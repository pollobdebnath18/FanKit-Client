import { motion } from "framer-motion";
import { FaLock, FaCreditCard } from "react-icons/fa";
import {
  FaCircleCheck,
  FaCircle,
} from "react-icons/fa6";
import { paymentMethodIcon } from "../../lib/orderStatus";

export type CheckoutMethod = "stripe" | "bkash";

interface PaymentMethodSelectorProps {
  value: CheckoutMethod;
  onChange: (method: CheckoutMethod) => void;
}

interface PaymentOption {
  id: CheckoutMethod;
  title: string;
  tagline: string;
}

const options: PaymentOption[] = [
  {
    id: "stripe",
    title: "Card (Stripe)",
    tagline: "Visa, Mastercard, Amex — secure checkout",
  },
  {
    id: "bkash",
    title: "bKash",
    tagline: "Pay with your bKash wallet instantly",
  },
];

const PaymentMethodSelector = ({
  value,
  onChange,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = value === option.id;
        const Icon =
          option.id === "stripe" ? FaCreditCard : paymentMethodIcon.bkash;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
              selected
                ? "border-[#2563EB] bg-[#2563EB]/5 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  selected
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <motion.span
                initial={false}
                animate={{ scale: selected ? 1 : 0.9 }}
              >
                {selected ? (
                  <FaCircleCheck className="h-6 w-6 text-[#2563EB]" />
                ) : (
                  <FaCircle className="h-6 w-6 text-slate-300" />
                )}
              </motion.span>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">
              {option.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{option.tagline}</p>
          </button>
        );
      })}
    </div>
  );
};

export const PaymentSecurityNote = () => (
  <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500">
    <FaLock className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
    Payments are encrypted and processed securely. Your order is only created
    after payment is verified.
  </div>
);

export default PaymentMethodSelector;
