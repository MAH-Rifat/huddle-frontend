"use client";

import React from "react";
import { GaugeMeter } from "@/components/common/GaugeMeter";
import { Card } from "@/components/common/Card";
import { formatCurrency } from "@/lib/utils";
import { CashflowOverviewMetrics } from "@/types";

interface CashflowOverviewGridProps {
  metrics: CashflowOverviewMetrics;
}

export function CashflowOverviewGrid({ metrics }: CashflowOverviewGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Net Operating Daily Avg */}
      <Card className="p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-surface-500">
            Net Operating Daily Avg (90d)
          </span>
          <GaugeMeter value={80} color="#22c55e" />
        </div>
        <div>
          <p className="text-2xl font-black text-emerald-600">
            +${metrics.netOperatingDailyAvg}/day
          </p>
          <p className="text-[11px] text-surface-400 mt-0.5">
            1 Revenue Source · 0 Negative Days
          </p>
        </div>
      </Card>

      {/* Balance Avg 90 Days */}
      <Card className="p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-surface-500">
            Balance Avg (90 Days)
          </span>
          <GaugeMeter value={92} color="#4f46e5" />
        </div>
        <div>
          <p className="text-2xl font-black text-indigo-600">
            {formatCurrency(metrics.balanceAvg90Days)}
          </p>
          <p className="text-[11px] text-surface-400 mt-0.5">
            Predicted: {formatCurrency(metrics.predictedBalanceDailyAvg)}
          </p>
        </div>
      </Card>

      {/* DSCR Coverage */}
      <Card className="p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-surface-500">
            DSCR Coverage Ratio
          </span>
          <GaugeMeter value={75} color="#22c55e" />
        </div>
        <div>
          <p className="text-2xl font-black text-emerald-600">
            {metrics.dscr}x
          </p>
          <p className="text-[11px] text-surface-400 mt-0.5">
            Debt Repayments: $0/day avg
          </p>
        </div>
      </Card>

      {/* Data Quality */}
      <Card className="p-5 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-surface-500">
            Underwriting Confidence
          </span>
          <GaugeMeter value={metrics.confidenceScore} color="#2563eb" />
        </div>
        <div>
          <p className="text-2xl font-black text-brand-600">
            {metrics.confidenceScore}% Score
          </p>
          <p className="text-[11px] text-surface-400 mt-0.5">
            Freshness: {metrics.dataFreshnessDays} day ago
          </p>
        </div>
      </Card>
    </div>
  );
}
