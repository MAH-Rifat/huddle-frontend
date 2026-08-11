"use client";

import React from "react";
import { FileText, Check } from "lucide-react";

interface ChecklistItem {
  title: string;
  desc: string;
  status: string;
}

interface DocumentUploadChecklistProps {
  items: ChecklistItem[];
}

export function DocumentUploadChecklist({ items }: DocumentUploadChecklistProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-950/50 space-y-2 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-brand-600" />
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                <Check className="h-3 w-3" /> {item.status}
              </span>
            </div>
            <h4 className="text-xs font-bold text-surface-900 dark:text-surface-100 mt-2">
              {item.title}
            </h4>
            <p className="text-[11px] text-surface-500 mt-1 leading-normal">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
