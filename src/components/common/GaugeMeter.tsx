"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GaugeMeterProps {
  value?: number; // 0 to 100
  color?: string;
  size?: number;
  className?: string;
}

export function GaugeMeter({
  value = 75,
  color = "#22c55e",
  size = 44,
  className,
}: GaugeMeterProps) {
  // SVG gauge arc
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // half circle arc
  const progress = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size / 1.7 }}
    >
      <svg
        width={size}
        height={size / 1.5}
        viewBox={`0 0 ${size} ${size / 1.5}`}
        className="overflow-visible"
      >
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 1.8} A ${radius} ${radius} 0 0 1 ${
            size - strokeWidth / 2
          } ${size / 1.8}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Value Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 1.8} A ${radius} ${radius} 0 0 1 ${
            size - strokeWidth / 2
          } ${size / 1.8}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
    </div>
  );
}
