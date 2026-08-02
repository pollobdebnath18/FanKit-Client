import type { InputHTMLAttributes } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface CheckoutFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

const CheckoutField = ({
  label,
  error,
  optional,
  id,
  className = "",
  ...inputProps
}: CheckoutFieldProps) => {
  const fieldId = id ?? inputProps.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-slate-700"
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal text-slate-400">(optional)</span>
        )}
      </label>
      <input
        id={fieldId}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-[#2563EB] focus:ring-[#2563EB]/10"
        } ${className}`}
        {...inputProps}
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-500">
          <FaExclamationCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckoutField;
