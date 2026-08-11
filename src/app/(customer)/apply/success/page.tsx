"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export default function ApplicationSuccessPage() {
  const { activePartner, deals } = useApp();
  const latestDeal = deals[0] || {
    dealNumber: "DL-2406",
    requestedAmount: 125000,
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-between">
      <PublicHeader />

      <main className="max-w-2xl w-full mx-auto px-4 py-12 md:py-16">
        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-200/90 dark:border-surface-800 p-8 md:p-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
              Application Submitted Successfully
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
              We&apos;ve Received Your Application!
            </h1>
            <p className="text-xs text-surface-500 max-w-md mx-auto">
              Your business loan application has been assigned Reference ID{" "}
              <span className="font-bold text-surface-900 dark:text-surface-100">
                {latestDeal.dealNumber}
              </span>{" "}
              and sent to our automated underwriting queue.
            </p>
          </div>

          {/* Timeline What Happens Next */}
          <div className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 text-left space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-300">
              What Happens Next:
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <p className="text-xs font-bold text-surface-900 dark:text-surface-100">
                    Automated Document Ingestion
                  </p>
                  <p className="text-[11px] text-surface-500">
                    Our AI models verify your tax returns and calculate real-time cashflow metrics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-surface-300 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <p className="text-xs font-bold text-surface-900 dark:text-surface-100">
                    Underwriting Review & Lender Matching
                  </p>
                  <p className="text-[11px] text-surface-500">
                    A dedicated credit analyst reviews your package to secure optimal terms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-surface-300 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <p className="text-xs font-bold text-surface-900 dark:text-surface-100">
                    Decision & Closing within 1–2 Days
                  </p>
                  <p className="text-[11px] text-surface-500">
                    You will receive funding terms and final closing documents via email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Return to Gateway
              </Button>
            </Link>
            <Link href="/partner/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View in Partner Portal
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-surface-400 border-t border-surface-200 dark:border-surface-800">
        © {new Date().getFullYear()} {activePartner.name}. Powered by CapFlow Lending Engine.
      </footer>
    </div>
  );
}
