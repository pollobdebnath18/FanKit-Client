import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg bg-slate-200/70 ${className ?? ""}`}
    {...props}
  />
);

export default Skeleton;
