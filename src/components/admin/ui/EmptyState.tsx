import type { ReactNode } from "react";
import { FaBoxOpen } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const EmptyState = ({
  title,
  message,
  icon,
  action,
  className = "",
}: EmptyStateProps) => (
  <div
    className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
      {icon ?? <FaBoxOpen className="h-7 w-7" />}
    </div>
    <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
    {message && (
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
