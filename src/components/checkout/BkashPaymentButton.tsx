import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import { paymentMethodIcon } from "../../lib/orderStatus";
import { formatBDT } from "../../lib/format";

interface BkashPaymentButtonProps {
  amount: number;
  disabled?: boolean;
  /** Runs before simulating the payment; returning false aborts. */
  beforePay?: () => boolean;
}

/**
 * bKash is a demo checkout at the moment (no merchant keys available).
 * Clicking simulates a successful bKash payment and redirects to the
 * success page WITHOUT recording an order in the database.
 */
const BkashPaymentButton = ({
  amount,
  disabled,
  beforePay,
}: BkashPaymentButtonProps) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const Icon = paymentMethodIcon.bkash;

  const handleClick = () => {
    if (beforePay && !beforePay()) return;
    setIsPending(true);
    const trxID = `BKASH-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    window.setTimeout(() => {
      navigate(
        `/payment/success?method=bkash&trxID=${trxID}&amount=${amount}`,
        { replace: true },
      );
    }, 900);
  };

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E2136E] py-3 text-sm font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <FaSpinner className="h-4 w-4 animate-spin" />
          Processing bKash payment…
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          Pay {formatBDT(amount)} with bKash
        </>
      )}
    </button>
  );
};

export default BkashPaymentButton;
