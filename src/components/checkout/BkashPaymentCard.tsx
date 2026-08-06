import { useState } from "react";
import { useNavigate } from "react-router";
import { FaLock, FaSpinner } from "react-icons/fa";
import { formatBDT } from "../../lib/format";

interface BkashPaymentCardProps {
  amount: number;
  disabled?: boolean;
  /** Runs before simulating the payment; returning false aborts. */
  beforePay?: () => boolean;
}

/**
 * bKash demo checkout. Clicking "Pay with bKash" simulates a successful
 * payment and redirects to the success page. No order is recorded in the DB.
 */
const BkashPaymentCard = ({
  amount,
  disabled,
  beforePay,
}: BkashPaymentCardProps) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

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
      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E2136E] to-[#C50B57] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E2136E]/25 transition-all hover:brightness-110 hover:shadow-[#E2136E]/35 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? (
        <>
          <FaSpinner className="h-4 w-4 animate-spin" />
          Processing bKash payment…
        </>
      ) : (
        <>
          <FaLock className="h-3 w-3" />
          Pay {formatBDT(amount)} with bKash
        </>
      )}
    </button>
  );
};

export default BkashPaymentCard;