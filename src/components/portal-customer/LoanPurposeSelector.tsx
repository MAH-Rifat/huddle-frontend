"use client";

import React from "react";
import { Check } from "lucide-react";

interface LoanPurposeSelectorProps {
  purposes: string[];
  selected: string[];
  onToggle: (purpose: string) => void;
}

export function LoanPurposeSelector({
  purposes,
  selected,
  onToggle,
}: LoanPurposeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {purposes.map((purpose) => {
        const isSelected = selected.includes(purpose);
        return (
          <button
            key={purpose}
            type="button"
            onClick={() => onToggle(purpose)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
              isSelected
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-surface-700 hover:border-surface-300"
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
            <span>{purpose}</span>
          </button>
        );
      })}
    </div>
  );
}
