export type BadgeTone =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary"
  | "brand";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  error: "bg-red-50 text-red-700 ring-red-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
  primary: "bg-primary/10 text-primary ring-primary/20",
  brand: "bg-brand/10 text-brand ring-brand/20",
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-sky-500",
  primary: "bg-primary",
  brand: "bg-brand",
};

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

const StatusBadge = ({
  label,
  tone = "neutral",
  dot = false,
  className = "",
}: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}
  >
    {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} />}
    {label}
  </span>
);

export default StatusBadge;
