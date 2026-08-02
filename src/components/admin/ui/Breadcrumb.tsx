import { Fragment } from "react";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa";

export interface CrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: CrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const lastIndex = items.length - 1;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {items.map((item, index) => {
          const isLast = index === lastIndex;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <li aria-hidden="true">
                  <FaChevronRight className="h-2.5 w-2.5 text-slate-300" />
                </li>
              )}
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="font-medium text-slate-400 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="font-semibold text-slate-700"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
