import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PaymentResultLayoutProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const PaymentResultLayout = ({
  icon,
  title,
  subtitle,
  children,
}: PaymentResultLayoutProps) => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      {icon}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <h1 className="text-2xl font-black text-[#0B1F3A]">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </motion.div>
      {children}
    </div>
  );
};

export default PaymentResultLayout;
