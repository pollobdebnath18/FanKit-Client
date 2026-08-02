import type { IconType } from "react-icons";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

type StatsCardTone = "brand" | "blue" | "emerald" | "amber" | "violet";

const toneStyles: Record<StatsCardTone, { chip: string; icon: string }> = {
  brand: {
    chip: "from-brand/10 to-brand/5",
    icon: "text-brand",
  },
  blue: {
    chip: "from-blue-500/10 to-sky-500/5",
    icon: "text-blue-600",
  },
  emerald: {
    chip: "from-emerald-500/10 to-teal-500/5",
    icon: "text-emerald-600",
  },
  amber: {
    chip: "from-amber-500/10 to-orange-500/5",
    icon: "text-amber-600",
  },
  violet: {
    chip: "from-violet-500/10 to-purple-500/5",
    icon: "text-violet-600",
  },
};

interface StatsCardProps {
  label: string;
  value: string;
  icon: IconType;
  change?: number;
  hint?: string;
  tone?: StatsCardTone;
  index?: number;
}

const StatsCard = ({
  label,
  value,
  icon: Icon,
  change,
  hint,
  tone = "blue",
  index = 0,
}: StatsCardProps) => {
  const isPositive = (change ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${toneStyles[tone].chip}`}
        >
          <Icon className={`h-5 w-5 ${toneStyles[tone].icon}`} />
        </div>
      </div>
      <p className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {typeof change === "number" && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isPositive ? (
              <FaArrowUp className="text-[10px]" />
            ) : (
              <FaArrowDown className="text-[10px]" />
            )}
            {Math.abs(change)}%
          </span>
        )}
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
    </motion.div>
  );
};

export default StatsCard;
