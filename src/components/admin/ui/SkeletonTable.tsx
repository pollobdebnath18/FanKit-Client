import Skeleton from "./Skeleton";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable = ({ rows = 6, columns = 5 }: SkeletonTableProps) => (
  <div className="space-y-4 p-2">
    <div className="flex items-center gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={`h-${i}`} className="h-3 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex items-center gap-4 border-t border-slate-100 pt-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`${rowIndex}-${colIndex}`}
            className={`h-8 flex-1 ${colIndex === 0 ? "max-w-12" : ""}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonTable;
