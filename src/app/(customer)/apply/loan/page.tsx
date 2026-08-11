"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BorrowerStepper } from "@/components/portal-customer/BorrowerStepper";
import { LoanPurposeSelector } from "@/components/portal-customer/LoanPurposeSelector";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";

export default function BorrowerStep3LoanPage() {
  const router = useRouter();
  const { loanApplication, updateLoanApplication } = useApp();

  const loanPurposes = [
    "Working Capital",
    "Equipment Purchase",
    "Inventory Purchase",
    "Furniture & Fixtures Purchase",
    "Debt Refinance – Pay Notes Payable",
    "Debt Refinance – Pay Trade/Accounts Payable",
    "Purchase a Business – Asset Purchase",
    "Purchase a Business – Stock Purchase",
    "Purchase Land and Improvements",
    "Pay Off/Interim Construction Loan",
    "Make Renovations to an Existing Building",
    "Add an Addition to an Existing Building",
    "Purchase Land Only",
    "Construct a Building",
    "Fund the Start Up of this Business",
    "Leasehold Improvements",
  ];

  const [requestedAmount, setRequestedAmount] = useState(
    loanApplication.requestedAmount || 125000
  );
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(
    loanApplication.selectedPurposes || ["Working Capital", "Inventory Purchase"]
  );

  const togglePurpose = (purpose: string) => {
    if (selectedPurposes.includes(purpose)) {
      setSelectedPurposes(selectedPurposes.filter((p) => p !== purpose));
    } else {
      setSelectedPurposes([...selectedPurposes, purpose]);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoanApplication({
      requestedAmount,
      selectedPurposes,
      step: 4,
    });
    router.push("/apply/esign");
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-between">
      <PublicHeader />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-200/90 dark:border-surface-800 p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              Business Loan Application
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
              Use Of Proceeds
            </h1>
            <p className="text-xs text-surface-500 max-w-lg mx-auto">
              Your answers to these questions will help us determine the best funding options for your business.
            </p>
          </div>

          {/* Stepper */}
          <BorrowerStepper currentStep={3} />

          <form onSubmit={handleContinue} className="space-y-8 pt-4">
            {/* Loan Amount Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-900/90 via-surface-900 to-surface-900 text-white border border-brand-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-brand-300">Requested Loan Amount</p>
                  <p className="text-3xl md:text-4xl font-black text-white mt-1">
                    {formatCurrency(requestedAmount)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 text-white">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>

              <div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={requestedAmount}
                  onChange={(e) => setRequestedAmount(Number(e.target.value))}
                  className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-brand-400"
                />
                <div className="flex justify-between text-[11px] text-surface-400 mt-1 font-medium">
                  <span>$10,000</span>
                  <span>$250,000</span>
                  <span>$500,000+</span>
                </div>
              </div>
            </div>

            {/* Purpose Selection Pills */}
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                  Select Loan Purpose
                </h3>
                <p className="text-xs text-surface-500">
                  You can select multiple options that describe your use of funds.
                </p>
              </div>

              <LoanPurposeSelector
                purposes={loanPurposes}
                selected={selectedPurposes}
                onToggle={togglePurpose}
              />
            </div>

            {/* Estimates Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Provide Estimates Breakdown
              </h3>
              <div className="rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-100 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 font-bold text-surface-700 dark:text-surface-300">
                    <tr>
                      <th className="py-3 px-4">Purpose Category</th>
                      <th className="py-3 px-4">Total Need ($)*</th>
                      <th className="py-3 px-4">Estimated Down Payment ($)*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-800 font-medium">
                    {selectedPurposes.map((purpose, idx) => (
                      <tr key={idx} className="hover:bg-surface-50 dark:hover:bg-surface-800/40">
                        <td className="py-3 px-4 font-semibold text-surface-900 dark:text-surface-100">
                          {purpose}
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            defaultValue={`$${((requestedAmount / selectedPurposes.length) || 50000).toLocaleString()}`}
                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg font-medium"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            defaultValue="$0.00"
                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg font-medium"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => router.push("/apply/owners")}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-8"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
