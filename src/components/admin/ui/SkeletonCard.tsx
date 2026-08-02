import Skeleton from "./Skeleton";

const SkeletonCard = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
    <Skeleton className="mt-5 h-8 w-32" />
    <Skeleton className="mt-3 h-3 w-24" />
  </div>
);

export default SkeletonCard;
