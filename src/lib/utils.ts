import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DealStage, UnderwritingStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getStageBadgeVariant(stage: DealStage | UnderwritingStatus): {
  bg: string;
  dot: string;
} {
  switch (stage) {
    case "Submitted":
    case "New":
      return {
        bg: "bg-[rgba(26,78,224,0.12)] text-[#3160e3] border border-[rgba(26,78,224,0.2)]",
        dot: "bg-[#3160e3]",
      };
    case "Validation":
    case "Processing":
    case "Under Review":
    case "In Review":
    case "Underwriting":
      return {
        bg: "bg-blue-50 text-blue-700 border border-blue-200",
        dot: "bg-blue-600",
      };
    case "Approved":
      return {
        bg: "bg-[rgba(0,188,125,0.12)] text-[#009966] border border-[rgba(0,188,125,0.2)]",
        dot: "bg-[#00d492]",
      };
    case "Funded":
      return {
        bg: "bg-[rgba(0,188,125,0.12)] text-[#009966] border border-[rgba(0,188,125,0.2)]",
        dot: "bg-[#00d492]",
      };
    case "Declined":
      return {
        bg: "bg-rose-50 text-rose-700 border border-rose-200",
        dot: "bg-rose-600",
      };
    case "Action Required":
      return {
        bg: "bg-amber-50 text-amber-800 border border-amber-200",
        dot: "bg-amber-600",
      };
    default:
      return {
        bg: "bg-neutral-100 text-neutral-700 border border-neutral-200",
        dot: "bg-neutral-500",
      };
  }
}
