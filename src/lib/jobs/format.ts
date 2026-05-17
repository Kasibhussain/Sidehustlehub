import type { Job, PayType } from "@/types/job";

export function formatPay(
  payType: PayType,
  payAmount: number,
  payAmountMax?: number | null,
): string {
  if (payType === "offer") {
    return "Make an offer";
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(n);

  if (
    payAmountMax != null &&
    payAmountMax > 0 &&
    payAmountMax > payAmount
  ) {
    const range = `${fmt(payAmount)}–${fmt(payAmountMax)}`;
    return payType === "hourly" ? `${range}/hr` : range;
  }

  const amount = fmt(payAmount);
  return payType === "hourly" ? `${amount}/hr` : amount;
}

export function formatPostedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDeadline(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Value for `<input type="datetime-local" />` in the user's local timezone. */
export function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatJobPay(job: Job): string {
  return formatPay(job.payType, job.payAmount, job.payAmountMax);
}

export function jobSummary(job: Job): string {
  const pay = formatJobPay(job);
  return `${job.category}${job.subcategory ? ` · ${job.subcategory}` : ""} · ${job.location} · ${pay}`;
}
