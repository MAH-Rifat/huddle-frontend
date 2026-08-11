"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BorrowerStepper } from "@/components/portal-customer/BorrowerStepper";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export default function BorrowerStep1CompanyPage() {
  const router = useRouter();
  const { loanApplication, updateLoanApplication, activePartner } = useApp();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoanApplication({ step: 2 });
    router.push("/apply/owners");
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-between">
      <PublicHeader />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-200/90 dark:border-surface-800 p-6 md:p-10 space-y-8">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              Business Loan Application
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
              Tell Us About Your Business
            </h1>
            <p className="text-xs text-surface-500 max-w-lg mx-auto">
              Please provide accurate business entity information for underwriting verification.
            </p>
          </div>

          {/* Stepper */}
          <BorrowerStepper currentStep={1} />

          {/* Step 1 Form */}
          <form onSubmit={handleContinue} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Legal Business Name*
                </label>
                <input
                  type="text"
                  required
                  value={loanApplication.legalBusinessName}
                  onChange={(e) =>
                    updateLoanApplication({ legalBusinessName: e.target.value })
                  }
                  placeholder="e.g. Johnson Supply Co."
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  DBA (Doing Business As)
                </label>
                <input
                  type="text"
                  value={loanApplication.dba}
                  onChange={(e) => updateLoanApplication({ dba: e.target.value })}
                  placeholder="(optional)"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Entity Type*
                </label>
                <select
                  required
                  value={loanApplication.entityType}
                  onChange={(e) =>
                    updateLoanApplication({ entityType: e.target.value as any })
                  }
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                >
                  <option value="LLC">LLC (Limited Liability Company)</option>
                  <option value="Corporation">Corporation (C-Corp / S-Corp)</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership (LP / LLP)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Verifiable Business Phone*
                </label>
                <input
                  type="tel"
                  required
                  value={loanApplication.businessPhone}
                  onChange={(e) =>
                    updateLoanApplication({ businessPhone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  NAICS Industry Code*
                </label>
                <input
                  type="text"
                  required
                  value={loanApplication.naicsCode}
                  onChange={(e) =>
                    updateLoanApplication({ naicsCode: e.target.value })
                  }
                  placeholder="e.g. 541611 – Management Consulting"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Business Website
                </label>
                <input
                  type="url"
                  value={loanApplication.website}
                  onChange={(e) =>
                    updateLoanApplication({ website: e.target.value })
                  }
                  placeholder="https://yourbusiness.com"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Date Established*
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  <input
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    value={loanApplication.establishedMonth}
                    onChange={(e) =>
                      updateLoanApplication({ establishedMonth: e.target.value })
                    }
                    className="px-3 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                  />
                  <input
                    type="text"
                    placeholder="DD"
                    maxLength={2}
                    value={loanApplication.establishedDay}
                    onChange={(e) =>
                      updateLoanApplication({ establishedDay: e.target.value })
                    }
                    className="px-3 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    maxLength={4}
                    value={loanApplication.establishedYear}
                    onChange={(e) =>
                      updateLoanApplication({ establishedYear: e.target.value })
                    }
                    className="px-3 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  State of Formation*
                </label>
                <input
                  type="text"
                  required
                  value={loanApplication.stateOfFormation}
                  onChange={(e) =>
                    updateLoanApplication({ stateOfFormation: e.target.value })
                  }
                  placeholder="e.g. GA, DE, CA"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Federal EIN or SSN*
                </label>
                <input
                  type="text"
                  required
                  value={loanApplication.einOrSsn}
                  onChange={(e) =>
                    updateLoanApplication({ einOrSsn: e.target.value })
                  }
                  placeholder="XX-XXXXXXX"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                  Annual Gross Receipts ($)*
                </label>
                <input
                  type="number"
                  required
                  value={loanApplication.annualGrossReceipts}
                  onChange={(e) =>
                    updateLoanApplication({
                      annualGrossReceipts: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="1250000"
                  className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>
            </div>

            {/* Business Physical Address */}
            <div className="pt-4 border-t border-surface-100 dark:border-surface-800 space-y-4">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Business Physical Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Address Line 1*
                  </label>
                  <input
                    type="text"
                    required
                    value={loanApplication.businessAddressLine1}
                    onChange={(e) =>
                      updateLoanApplication({
                        businessAddressLine1: e.target.value,
                      })
                    }
                    placeholder="Street address"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Suite / Apt
                  </label>
                  <input
                    type="text"
                    value={loanApplication.businessAddressLine2 || ""}
                    onChange={(e) =>
                      updateLoanApplication({
                        businessAddressLine2: e.target.value,
                      })
                    }
                    placeholder="Suite 400"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    City*
                  </label>
                  <input
                    type="text"
                    required
                    value={loanApplication.businessCity}
                    onChange={(e) =>
                      updateLoanApplication({ businessCity: e.target.value })
                    }
                    placeholder="Atlanta"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    State*
                  </label>
                  <input
                    type="text"
                    required
                    value={loanApplication.businessState}
                    onChange={(e) =>
                      updateLoanApplication({ businessState: e.target.value })
                    }
                    placeholder="GA"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Zip Code*
                  </label>
                  <input
                    type="text"
                    required
                    value={loanApplication.businessZip}
                    onChange={(e) =>
                      updateLoanApplication({ businessZip: e.target.value })
                    }
                    placeholder="30301"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => alert("Draft saved to your browser session.")}
              >
                Save & Continue Later
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

      <footer className="py-4 text-center text-xs text-surface-400 border-t border-surface-200 dark:border-surface-800">
        © {new Date().getFullYear()} {activePartner.name}. Powered by CapFlow Lending Engine.
      </footer>
    </div>
  );
}
