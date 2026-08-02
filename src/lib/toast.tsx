import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { ToastContext } from "./toast-context";
import type { ToastType } from "./toast-context";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const icons: Record<ToastType, ReactNode> = {
  success: <FaCheckCircle className="h-4 w-4 text-emerald-500" />,
  error: <FaExclamationCircle className="h-4 w-4 text-red-500" />,
  info: <FaInfoCircle className="h-4 w-4 text-blue-500" />,
};

let toastCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = ++toastCounter;
      setToasts((prev) => [...prev, { id, type, message }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  const value = useMemo(
    () => ({
      toast: {
        success: (message: string) => push("success", message),
        error: (message: string) => push("error", message),
        info: (message: string) => push("info", message),
      },
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-lg"
            >
              <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
              <p className="flex-1 text-sm font-medium text-slate-800">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => remove(toast.id)}
                className="shrink-0 text-slate-400 transition hover:text-slate-600"
                aria-label="Dismiss notification"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
