/** Formats a number as BDT (Taka), matching the cart page display. */
export const formatBDT = (amount: number): string =>
  `৳${Math.round(amount).toLocaleString("en-IN")}`;

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
