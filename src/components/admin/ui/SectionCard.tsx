import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

const SectionCard = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "",
}: SectionCardProps) => {
  const hasHeader = title || action;
  return (
    <section
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm ${className}`}
    >
      {hasHeader && (
        <header className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            {title && (
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={bodyClassName || "p-5 sm:p-6"}>{children}</div>
    </section>
  );
};

export default SectionCard;
