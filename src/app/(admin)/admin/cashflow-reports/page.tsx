"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Download,
  Copy,
  Check,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Tabs } from "@/components/common/Tabs";
import { Modal } from "@/components/common/Modal";
import { AreaChart } from "@/components/charts/AreaChart";
import { CashflowOverviewGrid } from "@/components/portal-admin/CashflowOverviewGrid";
import { ProfitLossTable } from "@/components/portal-admin/ProfitLossTable";
import { LenderMatchGrid } from "@/components/portal-admin/LenderMatchGrid";
import {
  mockCashflowMetrics,
  mockBankStatementSummaries,
  mockProfitLossRows,
} from "@/mock/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminCashflowReportsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-surface-400">Loading Cashflow Suite...</div>}>
      <CashflowReportsContent />
    </Suspense>
  );
}

function CashflowReportsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [addMetricModalOpen, setAddMetricModalOpen] = useState(false);
  const [copiedPnl, setCopiedPnl] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bank-debt", label: "Bank & Debt Summary" },
    { id: "balance", label: "Balance Insights" },
    { id: "profit-loss", label: "Profit & Loss (P&L)" },
    { id: "lender-match", label: "Lender Match" },
  ];

  const handleCopyPnl = () => {
    setCopiedPnl(true);
    setTimeout(() => setCopiedPnl(false), 2000);
  };

  const balanceChartData = [
    { label: "Day 1", value: 45200 },
    { label: "Day 5", value: 46800 },
    { label: "Day 10", value: 44100 },
    { label: "Day 15", value: 49500 },
    { label: "Day 20", value: 47200 },
    { label: "Day 25", value: 51000 },
    { label: "Day 30", value: 53800 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight flex items-center gap-2">
            Cashflow Reports & Forecasting
          </h2>
          <p className="text-xs text-surface-500">
            Real-time balance prediction, bank transaction coverage, and P&L financial analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => setAddMetricModalOpen(true)}
          >
            Add Custom Metric
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert("Exported complete Financials XLSX package.")}
          >
            Export All (.xlsx)
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <CashflowOverviewGrid metrics={mockCashflowMetrics} />

          {/* Quick Balance Trajectory Preview */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>30-Day Daily Balance Trajectory Forecast</CardTitle>
                <p className="text-xs text-surface-400">
                  Historical operating balance compared with predictive model
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart data={balanceChartData} height={200} strokeColor="#10b981" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Bank & Debt Summary */}
      {activeTab === "bank-debt" && (
        <div className="space-y-6">
          {/* Coverage Bar */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
              Transaction Data Ingestion Coverage
            </h3>
            <div className="h-4 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-600" style={{ width: "65%" }} title="PDF OCR (65%)" />
              <div className="h-full bg-emerald-500" style={{ width: "23%" }} title="Plaid API (23%)" />
              <div className="h-full bg-amber-400" style={{ width: "12%" }} title="Missing / Pending (12%)" />
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-surface-600 dark:text-surface-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Bank Statement PDF OCR (65%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Plaid Open Banking API (23%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Unconnected / Reconciled (12%)
              </span>
            </div>
          </Card>

          {/* Monthly Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bank Statement Aggregates</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-6">Month</th>
                    <th className="py-3 px-6">Beginning Balance</th>
                    <th className="py-3 px-6">Total Deposits</th>
                    <th className="py-3 px-6">Total Withdrawals</th>
                    <th className="py-3 px-6">Ending Balance</th>
                    <th className="py-3 px-6">Avg Daily Balance</th>
                    <th className="py-3 px-6 text-center">NSF / Overdraft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
                  {mockBankStatementSummaries.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-50/60 dark:hover:bg-surface-800/30">
                      <td className="py-3.5 px-6 font-bold text-surface-900 dark:text-surface-100">{row.month}</td>
                      <td className="py-3.5 px-6">{formatCurrency(row.beginningBalance)}</td>
                      <td className="py-3.5 px-6 font-semibold text-emerald-600">+{formatCurrency(row.totalDeposits)}</td>
                      <td className="py-3.5 px-6 font-semibold text-rose-600">-{formatCurrency(row.totalWithdrawals)}</td>
                      <td className="py-3.5 px-6 font-bold">{formatCurrency(row.endingBalance)}</td>
                      <td className="py-3.5 px-6 font-bold text-indigo-600">{formatCurrency(row.avgDailyBalance)}</td>
                      <td className="py-3.5 px-6 text-center">
                        <Badge variant="success" size="sm">
                          0 Events
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Balance Insights */}
      {activeTab === "balance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-surface-400">Predicted 30-Day Avg Balance</span>
              <p className="text-2xl font-black text-indigo-600">$46,609</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+4.2% Growth Expected</p>
            </Card>
            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-surface-400">Negative Balance Days (365d)</span>
              <p className="text-2xl font-black text-emerald-600">0 Days</p>
              <p className="text-[11px] text-surface-400">100% Positive Solvency</p>
            </Card>
            <Card className="p-5 space-y-1">
              <span className="text-xs font-semibold text-surface-400">NSF / Returned Items (365d)</span>
              <p className="text-2xl font-black text-emerald-600">0 Items</p>
              <p className="text-[11px] text-surface-400">Clean Bank Records</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Cash Balance Trajectory & Volatility</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart data={balanceChartData} height={240} strokeColor="#4f46e5" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 4: Profit & Loss Statement */}
      {activeTab === "profit-loss" && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Profit & Loss (P&L) Financial Statement</CardTitle>
              <p className="text-xs text-surface-400">Full annual statement with EBITDA and margin breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPnl}
                leftIcon={copiedPnl ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              >
                {copiedPnl ? "Copied" : "Copy Table"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                onClick={() => alert("Exported P&L to Excel (.xlsx)")}
              >
                Export Excel
              </Button>
            </div>
          </CardHeader>
          <ProfitLossTable rows={mockProfitLossRows} />
        </Card>
      )}

      {/* Tab 5: Lender Match */}
      {activeTab === "lender-match" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs text-indigo-950 dark:text-indigo-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <span>
                Automated credit matching engine evaluated 4 institutional lenders against this applicant&apos;s DSCR (1.42) and revenue ($1.25M).
              </span>
            </div>
            <Badge variant="success">2 Optimal Matches</Badge>
          </div>

          <LenderMatchGrid
            matches={[
              {
                lender: "Summit Commercial Credit",
                program: "SBA 7(a) Working Capital Express",
                rate: "Prime + 2.25%",
                maxAmount: "$350,000",
                fitScore: "96% Fit",
                recommended: true,
              },
              {
                lender: "BluePeak Institutional Fund",
                program: "Term Equipment & Growth Facility",
                rate: "7.8% Fixed",
                maxAmount: "$250,000",
                fitScore: "91% Fit",
                recommended: false,
              },
            ]}
            onAllocate={(lender) => alert(`Allocated deal to ${lender}`)}
          />
        </div>
      )}

      {/* Add Metric Modal */}
      <Modal
        isOpen={addMetricModalOpen}
        onClose={() => setAddMetricModalOpen(false)}
        title="Add Custom Underwriting Metric"
        description="Configure a custom ratio or transaction formula for this portfolio"
      >
        <div className="space-y-4 pt-2 text-xs">
          <div>
            <label className="block font-bold text-surface-700 dark:text-surface-300">Metric Name*</label>
            <input
              type="text"
              placeholder="e.g. Daily Balance Volatility Index"
              className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-surface-700 dark:text-surface-300">Calculation Source*</label>
            <select className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl">
              <option>Net Operating Cashflow</option>
              <option>Debt Service Coverage (DSCR)</option>
              <option>EBITDA Margin Percentage</option>
              <option>Daily Ledger Balance Delta</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setAddMetricModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setAddMetricModalOpen(false)}>Add to Dashboard</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
