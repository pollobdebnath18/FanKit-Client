import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPage: (page: number) => void;
}

const getPages = (current: number, total: number): (number | "…")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
};

const ShopPagination = ({ currentPage, totalPages, onPage }: ShopPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronLeft className="h-3.5 w-3.5" />
      </motion.button>

      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-slate-400">
            …
          </span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
              page === currentPage
                ? "bg-blue-600 text-white shadow"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {page}
          </motion.button>
        ),
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronRight className="h-3.5 w-3.5" />
      </motion.button>
    </nav>
  );
};

export default ShopPagination;
