"use client";

import React from "react";
import { Sparkles, FileText } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Deal } from "@/types";

interface UnderwritingInspectorProps {
  deal: Deal;
}

export function UnderwritingInspector({ deal }: UnderwritingInspectorProps) {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <h3 className="font-bold text-sm text-surface-900 dark:text-surface-100">
            AI Ingestion & Extracted Field Inspector
          </h3>
        </div>
        <Badge variant="success" size="sm">
          98% OCR Confidence
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40">
          <span className="text-surface-400 font-semibold">Legal Entity:</span>
          <p className="font-bold text-surface-900 dark:text-surface-100 mt-0.5">{deal.businessName}</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40">
          <span className="text-surface-400 font-semibold">Entity Classification:</span>
          <p className="font-bold text-surface-900 dark:text-surface-100 mt-0.5">{deal.entityType}</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40">
          <span className="text-surface-400 font-semibold">Landlord / Lease Terms:</span>
          <p className="font-bold text-surface-900 dark:text-surface-100 mt-0.5">3 Years Remaining ($4,200/mo)</p>
        </div>
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40">
          <span className="text-surface-400 font-semibold">Payment Terminal Model:</span>
          <p className="font-bold text-surface-900 dark:text-surface-100 mt-0.5">Clover Flex POS (Verified)</p>
        </div>
      </div>

      <div className="pt-2 border-t border-surface-100 dark:border-surface-800 space-y-2">
        <span className="font-bold text-surface-700 dark:text-surface-300">
          Extracted Document Checklist:
        </span>
        {deal.documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-2.5 rounded-xl border border-surface-200 dark:border-surface-800">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-600" />
              <span className="font-semibold text-surface-900 dark:text-surface-100">{doc.name}</span>
            </div>
            <Badge variant="success" size="sm">
              Verified
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
