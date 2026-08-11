"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { UnderwritingInspector } from "@/components/portal-admin/UnderwritingInspector";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";

export default function AdminDealUnderwritingPage() {
  const params = useParams();
  const dealId = (params?.id as string) || "deal-1";
  const { getDealById, updateDealStage, addDealNote } = useApp();

  const deal = getDealById(dealId) || getDealById("deal-1");
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  if (!deal) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-sm font-semibold text-surface-500">Deal not found.</p>
        <Link href="/admin/deals">
          <Button variant="outline">Back to Queue</Button>
        </Link>
      </div>
    );
  }

  const handleApprove = () => {
    updateDealStage(deal.id, "Approved");
    addDealNote(deal.id, "Underwriting completed: Deal Approved by Senior Credit Analyst.", "Andrew Smith", "Underwriter");
    setDecisionFeedback("Deal Approved! Ready for closing.");
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  const handleRequestDocs = () => {
    updateDealStage(deal.id, "Action Required");
    addDealNote(deal.id, "Requested updated borrower documentation for further cashflow validation.", "Andrew Smith", "Underwriter");
    setDecisionFeedback("Requested missing documents from Partner.");
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  const handleDecline = () => {
    updateDealStage(deal.id, "Declined");
    addDealNote(deal.id, "Deal declined based on existing debt-to-income threshold.", "Andrew Smith", "Underwriter");
    setDecisionFeedback("Deal has been marked as Declined.");
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Underwriting Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/deals">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
                {deal.businessName}
              </h2>
              <Badge stage={deal.stage} dot />
            </div>
            <p className="text-xs text-surface-400">
              Reference: <span className="font-bold text-indigo-600">{deal.dealNumber}</span> · Partner:{" "}
              <span className="font-semibold text-surface-700 dark:text-surface-300">{deal.partnerName}</span>
            </p>
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={handleDecline}
            leftIcon={<XCircle className="h-4 w-4" />}
          >
            Decline
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRequestDocs}
            leftIcon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
          >
            Request Docs
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleApprove}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
          >
            Approve Deal
          </Button>
        </div>
      </div>

      {decisionFeedback && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-fade-in">
          <Check className="h-4 w-4" /> {decisionFeedback}
        </div>
      )}

      {/* Financial Snapshot Key Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">Annual Revenue</span>
          <p className="text-lg font-black text-surface-900 dark:text-surface-50">
            {formatCurrency(deal.financialMetrics.annualRevenue)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">Monthly Cash Flow</span>
          <p className="text-lg font-black text-emerald-600">
            +{formatCurrency(deal.financialMetrics.monthlyCashFlow)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">Existing Debt</span>
          <p className="text-lg font-black text-surface-900 dark:text-surface-50">
            {formatCurrency(deal.financialMetrics.existingDebt)}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">FICO Credit Score</span>
          <p className="text-lg font-black text-indigo-600">{deal.financialMetrics.creditScore}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">DSCR Coverage</span>
          <p className="text-lg font-black text-emerald-600">{deal.financialMetrics.dscr || 1.42}x</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
          <span className="text-[11px] text-surface-400 font-semibold">Time in Business</span>
          <p className="text-lg font-black text-surface-900 dark:text-surface-50">
            {deal.financialMetrics.timeInBusinessYears} Years
          </p>
        </div>
      </div>

      {/* AI OCR Extracted Fields & PDF Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: OCR Extracted Fields */}
        <Card className="p-6">
          <UnderwritingInspector deal={deal} />
        </Card>

        {/* Right: Cashflow Deep Link & Notes */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-indigo-950 to-surface-900 text-white border-indigo-800/60 space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Automated Cashflow Analysis
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                90-Day Cashflow Volatility & EBITDA Health
              </h3>
              <p className="text-xs text-surface-300 mt-1 leading-relaxed">
                Applicant demonstrates positive daily operating cash flow ($65/day avg) with zero overdraft / NSF occurrences.
              </p>
            </div>

            <Link href="/admin/cashflow-reports" className="block">
              <Button variant="brand" className="w-full justify-between">
                <span>View Full 5-Tab Cashflow Report</span>
                <TrendingUp className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          {/* Underwriter Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Underwriting Log & Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {deal.notes.map((note) => (
                <div key={note.id} className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40 border border-surface-100 dark:border-surface-800 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-surface-900 dark:text-surface-100">{note.authorName} ({note.authorRole})</span>
                    <span className="text-surface-400 font-normal">{note.timestamp}</span>
                  </div>
                  <p className="text-surface-600 dark:text-surface-300">{note.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
