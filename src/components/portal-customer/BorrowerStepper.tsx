"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BorrowerStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Company" },
  { id: 2, label: "Owners" },
  { id: 3, label: "Loan" },
  { id: 4, label: "Apply" },
  { id: 5, label: "Documents" },
];

export function BorrowerStepper({ currentStep }: BorrowerStepperProps) {
  return (
    <div className="w-full py-4 max-w-2xl mx-auto">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-200 dark:bg-surface-800 z-0" />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 90}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
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
                {isCompleted ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium whitespace-nowrap",
                  isCurrent
                    ? "text-brand-600 dark:text-brand-400 font-bold"
                    : isCompleted
                    ? "text-surface-900 dark:text-surface-100 font-semibold"
                    : "text-surface-400 dark:text-surface-500"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
