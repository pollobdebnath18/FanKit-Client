/** Formats a number as BDT (Taka), matching the cart page display. */
export const formatBDT = (amount: number): string =>
  `৳${Math.round(amount).toLocaleString("en-IN")}`;

/** Compact BDT (e.g. ৳1.2M, ৳850K) for dashboard stat cards. */
export const formatCompactBDT = (amount: number): string => {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) return `৳${(amount / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `৳${(amount / 1_000).toFixed(1)}K`;
  return `৳${Math.round(amount).toLocaleString("en-IN")}`;
};

/** Formats a JS Date / date string into a readable "Jul 20, 2026" string. */
export const formatDate = (
  value: string | Date | undefined | null,
): string => {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** Human-friendly relative time (e.g. "5 mins ago", "3 hours ago"). */
export const timeAgo = (value: string | Date | undefined | null): string => {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(value);
};

/** Formats a date + time "Jul 20, 2026, 2:30 PM". */
export const formatDateTime = (
  value: string | Date | undefined | null,
): string => {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
