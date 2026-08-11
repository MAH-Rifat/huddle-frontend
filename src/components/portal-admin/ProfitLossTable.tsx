"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { ProfitLossRow } from "@/types";

interface ProfitLossTableProps {
  rows: ProfitLossRow[];
}

export function ProfitLossTable({ rows }: ProfitLossTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
          <tr>
            <th className="py-3 px-6">Line Item Category</th>
            <th className="py-3 px-6 text-right">FY 2025 ($)</th>
            <th className="py-3 px-6 text-right">FY 2026 YTD ($)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
          {rows.map((row, idx) => {
            if (row.isSubheader) {
              return (
                <tr key={idx} className="bg-surface-100/60 dark:bg-surface-800/80">
                  <td colSpan={3} className="py-2.5 px-6 font-bold uppercase text-[10px] tracking-wider text-surface-700 dark:text-surface-300">
                    {row.category}
                  </td>
                </tr>
              );
            }
            return (
              <tr
                key={idx}
                className={row.isTotal ? "font-bold bg-surface-50/50 dark:bg-surface-800/30 text-surface-900 dark:text-surface-50" : "text-surface-600 dark:text-surface-300"}
              >
                <td className="py-3 px-6">{row.category}</td>
                <td className="py-3 px-6 text-right font-mono">
                  {row.category.includes("Margin") ? `${row.year2025}%` : formatCurrency(row.year2025)}
                </td>
                <td className="py-3 px-6 text-right font-mono">
                  {row.category.includes("Margin") ? `${row.year2026}%` : formatCurrency(row.year2026)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
