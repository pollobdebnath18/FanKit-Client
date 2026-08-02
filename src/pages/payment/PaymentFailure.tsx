import { Link } from "react-router";
import { FaArrowLeft, FaRedo, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import PaymentResultLayout from "../../components/checkout/PaymentResultLayout";

const FailureIcon = () => (
  <motion.div
    initial={{ scale: 0.4, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-300"
  >
    <FaTimesCircle className="h-12 w-12 text-white" />
  </motion.div>
);

const PaymentFailure = () => {
  return (
    <PaymentResultLayout
      icon={<FailureIcon />}
      title="Payment Failed"
      subtitle="We couldn't process your payment. Your card / bKash wallet was not charged."
    >
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          to="/checkout"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3 text-sm font-bold text-white transition-colors hover:bg-[#132C52]"
        >
          <FaRedo className="h-3.5 w-3.5" />
          Try Again
        </Link>
        <Link
          to="/cart"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Back to Cart
        </Link>
      </div>
    </PaymentResultLayout>
  );
};

export default PaymentFailure;
