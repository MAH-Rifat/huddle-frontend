"use client";

import React from "react";
import { Sparkles, Edit3 } from "lucide-react";

interface DealSubmitWizardProps {
  method: "ocr" | "form";
  onMethodChange: (method: "ocr" | "form") => void;
}

export function DealSubmitWizard({ method, onMethodChange }: DealSubmitWizardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        onClick={() => onMethodChange("ocr")}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all space-y-4 ${
          method === "ocr"
            ? "border-brand-600 bg-brand-50/40 dark:bg-brand-950/30 ring-4 ring-brand-100 dark:ring-brand-900/40"
            : "border-surface-200 dark:border-surface-800 hover:border-surface-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-brand-600 text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
            Fast Track AI
          </span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-surface-900 dark:text-surface-50">
            Upload Existing PDF Application
          </h4>
          <p className="text-xs text-surface-500 mt-1 leading-relaxed">
            Upload a completed loan application PDF. Our AI OCR engine will automatically extract business details, owner info, and financial parameters.
          </p>
        </div>
      </div>

      <div
        onClick={() => onMethodChange("form")}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all space-y-4 ${
          method === "form"
            ? "border-brand-600 bg-brand-50/40 dark:bg-brand-950/30 ring-4 ring-brand-100 dark:ring-brand-900/40"
            : "border-surface-200 dark:border-surface-800 hover:border-surface-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-surface-800 text-white">
            <Edit3 className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold text-surface-500">Standard</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-surface-900 dark:text-surface-50">
            Fill Out Online Form
          </h4>
          <p className="text-xs text-surface-500 mt-1 leading-relaxed">
            Manually enter borrower entity info, owners, requested loan amount, and upload supporting bank records step-by-step.
          </p>
        </div>
      </div>
    </div>
  );
}
