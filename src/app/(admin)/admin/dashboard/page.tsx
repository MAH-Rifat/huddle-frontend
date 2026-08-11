"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  FileCheck2,
  Building,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { AreaChart } from "@/components/charts/AreaChart";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { deals, partners } = useApp();

  const chartData = [
    { label: "Jun", value: 340000 },
    { label: "Jul", value: 580000 },
    { label: "Aug", value: 890000 },
    { label: "Sep", value: 1200000 },
    { label: "Oct", value: 1650000 },
    { label: "Nov", value: 1980000 },
    { label: "Dec", value: 2140000 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
            Underwriting Command Center
          </h2>
          <p className="text-xs text-surface-500">
            Platform-wide origination, risk scoring, and lender allocation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/partners/new">
            <Button variant="outline" size="sm" leftIcon={<Building className="h-4 w-4" />}>
              Create Partner
            </Button>
          </Link>
          <Link href="/admin/cashflow-reports">
            <Button variant="primary" size="sm" leftIcon={<TrendingUp className="h-4 w-4" />}>
              Cashflow Suite
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-600 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-surface-500">Total Funded Volume</span>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-surface-900 dark:text-surface-50">$2,140,000</p>
          <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +32% vs Last Quarter
          </p>
        </Card>

        <Card className="p-5 border-l-4 border-l-brand-600 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-surface-500">Active Deals Queue</span>
            <FileCheck2 className="h-5 w-5 text-brand-600" />
          </div>
          <p className="text-2xl font-black text-surface-900 dark:text-surface-50">{deals.length} Deals</p>
          <p className="text-[11px] text-surface-400">6 new submissions in last 24h</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-purple-600 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-surface-500">Partner Brokerages</span>
            <Building className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-surface-900 dark:text-surface-50">{partners.length} Active Orgs</p>
          <p className="text-[11px] text-surface-400">14 Active sales reps</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-surface-500">Action Required</span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">2 Incomplete</p>
          <p className="text-[11px] text-amber-600 font-semibold">Missing tax/bank docs</p>
        </Card>
      </div>

      {/* Chart and Underwriting Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Platform Deal Volume & Growth</CardTitle>
              <p className="text-xs text-surface-400">Cumulative funding volume trajectory</p>
            </div>
            <Badge variant="success">All Partners</Badge>
          </CardHeader>
          <CardContent>
            <AreaChart data={chartData} height={200} strokeColor="#4f46e5" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Underwriting Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-surface-500">Auto-Approved (AI Score &gt; 90)</span>
                <span className="font-bold text-surface-900 dark:text-surface-100">48%</span>
              </div>
              <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: "48%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-surface-500">Analyst Manual Inspection</span>
                <span className="font-bold text-surface-900 dark:text-surface-100">38%</span>
              </div>
              <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: "38%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-surface-500">Reconciliation Exception</span>
                <span className="font-bold text-surface-900 dark:text-surface-100">14%</span>
              </div>
              <div className="h-2 w-full bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "14%" }} />
              </div>
            </div>

            <div className="pt-4 border-t border-surface-100 dark:border-surface-800">
              <Link href="/admin/cashflow-reports" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-between">
                <span>Open Cashflow Analysis Suite</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Deals Master Triage Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Global Underwriting Triage Queue</CardTitle>
            <p className="text-xs text-surface-400">Review, assign credit analysts, and decision loan packages</p>
          </div>
          <Link href="/admin/deals">
            <Button variant="outline" size="sm">
              View Master Queue
            </Button>
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Deal ID</th>
                <th className="py-3 px-6">Borrower / Business</th>
                <th className="py-3 px-6">Partner Org</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">DSCR / Credit</th>
                <th className="py-3 px-6">Stage</th>
                <th className="py-3 px-6">Underwriter</th>
                <th className="py-3 px-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-surface-50/80 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-indigo-600">
                    <Link href={`/admin/deals/${deal.id}`}>{deal.dealNumber}</Link>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-surface-900 dark:text-surface-100">{deal.businessName}</p>
                    <p className="text-[11px] text-surface-400">{deal.clientName}</p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-surface-700 dark:text-surface-300">
                    {deal.partnerName}
                  </td>
                  <td className="py-4 px-6 font-bold text-surface-900 dark:text-surface-100">
                    {formatCurrency(deal.requestedAmount)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-emerald-600">{deal.financialMetrics.dscr || 1.42}x</span> /{" "}
                    <span className="text-surface-500">{deal.financialMetrics.creditScore}</span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge stage={deal.stage} dot />
                  </td>
                  <td className="py-4 px-6 text-surface-600 dark:text-surface-300">
                    {deal.assignedUnderwriter || "Unassigned"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/admin/deals/${deal.id}`}>
                      <Button variant="outline" size="sm">
                        Inspect
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
