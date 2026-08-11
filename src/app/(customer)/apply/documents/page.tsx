"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BorrowerStepper } from "@/components/portal-customer/BorrowerStepper";
import { DocumentUploadChecklist } from "@/components/portal-customer/DocumentUploadChecklist";
import { Button } from "@/components/common/Button";
import { FileUpload } from "@/components/common/FileUpload";
import { useApp } from "@/context/AppContext";

export default function BorrowerStep5DocumentsPage() {
  const router = useRouter();
  const { loanApplication, submitLoanApplication } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const docChecklist = [
    {
      title: "Business Tax Returns (Last 2 Years)",
      desc: "Complete IRS Forms 1120, 1120S, or 1065 with all schedules.",
      status: "Ready",
    },
    {
      title: "6 Months Business Bank Statements",
      desc: "All active operating accounts with complete transaction pages.",
      status: "Ready",
    },
    {
      title: "Government-Issued Photo ID",
      desc: "Driver's license or passport for all 20%+ owners.",
      status: "Ready",
    },
  ];

  const handleSubmitApplication = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitLoanApplication();
      setIsSubmitting(false);
      router.push("/apply/success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-between">
      <PublicHeader />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-200/90 dark:border-surface-800 p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              Final Step
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
              Supporting Financial Documents
            </h1>
            <p className="text-xs text-surface-500 max-w-lg mx-auto">
              Attach supporting financial documentation for instant automated OCR underwriting.
            </p>
          </div>

          {/* Stepper */}
          <BorrowerStepper currentStep={5} />

          <div className="space-y-6 pt-4">
            {/* Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Required Verification Documents
              </h3>
              <DocumentUploadChecklist items={docChecklist} />
            </div>

            {/* Drag and Drop Uploader */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                Upload Additional Files or Financial Packages
              </label>
              <FileUpload
                title="Drop your PDF files or financial statements here"
                description="Supports PDF, CSV, Excel up to 25MB each. Protected by 256-bit encryption."
              />
            </div>

            {/* AI Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-surface-700 dark:text-surface-300">
                <p className="font-bold text-surface-900 dark:text-surface-100">
                  Automated OCR Ingestion Enabled
                </p>
                <p className="text-surface-600 dark:text-surface-400 mt-0.5 text-[11px]">
                  Our underwriting engine instantly extracts bank transactions and financial line items
                  to deliver pre-approval decisions within 1–2 business days.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => router.push("/apply/esign")}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="primary"
                className="px-8 font-bold"
                isLoading={isSubmitting}
                onClick={handleSubmitApplication}
                rightIcon={<CheckCircle2 className="h-4 w-4" />}
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
