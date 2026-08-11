import React from "react";
import { cn, getStageBadgeVariant } from "@/lib/utils";
import { DealStage, UnderwritingStatus } from "@/types";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "blue" | "purple" | "neutral" | "outline";
  stage?: DealStage | UnderwritingStatus;
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className,
  variant = "default",
  stage,
  size = "md",
  dot = false,
  ...props
}: BadgeProps) {
  let badgeStyles = "";
  let dotColor = "";

  if (stage) {
    const stageVariant = getStageBadgeVariant(stage);
    badgeStyles = stageVariant.bg;
    dotColor = stageVariant.dot;
  } else {
    switch (variant) {
      case "success":
        badgeStyles = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
        dotColor = "bg-emerald-500";
        break;
      case "warning":
        badgeStyles = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
        dotColor = "bg-amber-500";
        break;
      case "danger":
        badgeStyles = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
        dotColor = "bg-rose-500";
        break;
      case "blue":
        badgeStyles = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800";
        dotColor = "bg-blue-500";
        break;
      case "purple":
        badgeStyles = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
        dotColor = "bg-purple-500";
        break;
      case "outline":
        badgeStyles = "bg-transparent text-surface-700 border-surface-300 dark:text-surface-300 dark:border-surface-700";
        dotColor = "bg-surface-400";
        break;
      case "neutral":
      default:
        badgeStyles = "bg-surface-100 text-surface-700 border-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700";
        dotColor = "bg-surface-400";
        break;
    }
  }

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border shadow-2xs leading-none transition-colors",
        sizeStyles[size],
        badgeStyles,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />}
      {children || stage}
    </span>
  );
}
