import { Link } from "react-router";
import { FaArrowLeft, FaCreditCard, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import PaymentResultLayout from "../../components/checkout/PaymentResultLayout";

const CancelIcon = () => (
  <motion.div
    initial={{ scale: 0.4, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-300"
  >
    <FaCreditCard className="h-11 w-11 text-white" />
  </motion.div>
);

const PaymentCancel = () => {
  return (
    <PaymentResultLayout
      icon={<CancelIcon />}
      title="Payment Cancelled"
      subtitle="You have cancelled the payment. No money was charged and your cart is still safe."
    >
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          to="/checkout"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3 text-sm font-bold text-white transition-colors hover:bg-[#132C52]"
        >
          <FaCreditCard className="h-3.5 w-3.5" />
          Retry Checkout
        </Link>
        <Link
          to="/cart"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <FaShoppingCart className="h-3.5 w-3.5" />
          Review Cart
        </Link>
      </div>
      <Link
        to="/shop/all-products"
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline"
      >
        <FaArrowLeft className="text-xs" />
        Continue Shopping
      </Link>
    </PaymentResultLayout>
  );
};

export default PaymentCancel;
