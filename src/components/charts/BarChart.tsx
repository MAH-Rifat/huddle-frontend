"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BarDataPoint {
  label: string;
  value: number;
  secondaryLabel?: string;
  color?: string;
}

interface BarChartProps {
  data: BarDataPoint[];
  height?: number;
  className?: string;
}

export function BarChart({ data, height = 180, className }: BarChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {data.map((item, idx) => {
        const percent = Math.round((item.value / maxValue) * 100);
        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-surface-700 dark:text-surface-300">
                {item.label}
              </span>
              <span className="font-semibold text-surface-900 dark:text-surface-100">
                {item.secondaryLabel || `${item.value}%`}
              </span>
            </div>
            <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percent}%`,
                  backgroundColor: item.color || "#2563eb",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
