import type { ReactNode } from "react";
import EmptyState from "./EmptyState";
import SkeletonTable from "./SkeletonTable";

export interface DataColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: DataColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: T) => void;
}

const DataTable = <T,>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  emptyState,
  onRowClick,
}: DataTableProps<T>) => {
  if (isLoading) {
    return <SkeletonTable rows={6} columns={Math.max(columns.length, 3)} />;
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50/50">
        {emptyState ?? <EmptyState title="No data yet" message="There's nothing to show here right now." />}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-4 py-3 ${column.headerClassName ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`transition-colors ${
                onRowClick ? "cursor-pointer hover:bg-slate-50/70" : "hover:bg-slate-50/50"
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className={`px-4 py-3.5 ${column.className ?? ""}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
