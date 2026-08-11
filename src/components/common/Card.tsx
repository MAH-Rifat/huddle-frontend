import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "surface";
  hoverable?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverable = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white dark:bg-surface-900 border border-surface-200/90 dark:border-surface-800 shadow-sm",
    glass:
      "bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200/70 dark:border-surface-800/70 shadow-sm",
    outline:
      "bg-transparent border border-surface-200 dark:border-surface-800",
    surface:
      "bg-surface-50 dark:bg-surface-950 border border-surface-200 dark:border-surface-800",
  };

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200 overflow-hidden",
        variantStyles[variant],
        hoverable && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-surface-100 dark:border-surface-800/80 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold text-surface-900 dark:text-surface-50", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-surface-500 dark:text-surface-400 mt-0.5", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4 bg-surface-50/50 dark:bg-surface-950/50 border-t border-surface-100 dark:border-surface-800/80 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}
