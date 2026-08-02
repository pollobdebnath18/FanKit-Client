import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
  isRetrying = false,
  className = "",
}: ErrorStateProps) => (
  <div
    className={`flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
      <FaExclamationTriangle className="h-7 w-7" />
    </div>
    <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
    <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaRedo className={isRetrying ? "animate-spin" : ""} />
        {isRetrying ? "Retrying..." : "Try again"}
      </button>
    )}
  </div>
);

export default ErrorState;
