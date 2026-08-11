"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string | number;
  label: string;
  sublabel?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
  variant?: "horizontal" | "pills" | "progress";
}

export function Stepper({
  steps,
  currentStepIndex,
  onStepClick,
  className,
  variant = "horizontal",
}: StepperProps) {
  if (variant === "pills") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <button
              key={step.id}
              disabled={!onStepClick || idx > currentStepIndex}
              onClick={() => onStepClick && onStepClick(idx)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                isCurrent
                  ? "bg-brand-600 text-white shadow-xs"
                  : isCompleted
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-surface-100 text-surface-400 dark:bg-surface-800"
              )}
            >
              <span
                className={cn(
                  "h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold",
                  isCurrent ? "bg-white text-brand-600" : isCompleted ? "bg-emerald-600 text-white" : "bg-surface-300 text-surface-600"
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : idx + 1}
              </span>
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative flex items-center justify-between">
        {/* Connecting Line Background */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-200 dark:bg-surface-800 z-0" />

        {/* Progress Line */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 z-0"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 90}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
              onClick={() => onStepClick && onStepClick(idx)}
            >
              <div
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center border-2 text-xs font-semibold transition-all duration-200 shadow-sm",
                  isCompleted
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : isCurrent
                    ? "bg-brand-600 border-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-950"
                    : "bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-500"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    isCurrent
                      ? "text-brand-600 dark:text-brand-400 font-bold"
                      : isCompleted
                      ? "text-surface-900 dark:text-surface-100 font-semibold"
                      : "text-surface-400 dark:text-surface-500"
                  )}
                >
                  {step.label}
                </p>
                {step.sublabel && (
                  <p className="text-[10px] text-surface-400">{step.sublabel}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
