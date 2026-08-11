"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BorrowerStepper } from "@/components/portal-customer/BorrowerStepper";
import { EsignConsentBox } from "@/components/portal-customer/EsignConsentBox";
import { Button } from "@/components/common/Button";
import { SignaturePad } from "@/components/common/SignaturePad";
import { useApp } from "@/context/AppContext";

export default function BorrowerStep4EsignPage() {
  const router = useRouter();
  const { loanApplication, updateLoanApplication } = useApp();

  const [legalNameConsent, setLegalNameConsent] = useState(
    loanApplication.legalFirstNameConsent || "Marcus Johnson"
  );
  const [consentAgreed, setConsentAgreed] = useState(
    loanApplication.consentAgreed ?? true
  );

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoanApplication({
      legalFirstNameConsent: legalNameConsent,
      consentAgreed,
      step: 5,
    });
    router.push("/apply/documents");
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
              E-Signature & Declarations
            </h1>
            <p className="text-xs text-surface-500 max-w-lg mx-auto">
              Please review legal declarations and execute your digital signature.
            </p>
          </div>

          {/* Stepper */}
          <BorrowerStepper currentStep={4} />

          <form onSubmit={handleContinue} className="space-y-6 pt-4">
            {/* Signature Pads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 space-y-3">
                <SignaturePad
                  label="Primary Owner / Guarantor Signature*"
                  onSave={(data) => updateLoanApplication({ ownerSignature: data })}
                />
                <p className="text-[11px] text-surface-400">
                  Principal: {loanApplication.owners[0]?.firstName} {loanApplication.owners[0]?.lastName}
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 space-y-3">
                <SignaturePad
                  label="Co-Principal / Co-Guarantor Signature (Optional)"
                  onSave={(data) => updateLoanApplication({ coOwnerSignature: data })}
                />
                <p className="text-[11px] text-surface-400">Co-Signer / Secondary Principal</p>
              </div>
            </div>

            {/* Consent and typed name */}
            <EsignConsentBox
              legalName={legalNameConsent}
              onLegalNameChange={setLegalNameConsent}
              consentAgreed={consentAgreed}
              onConsentChange={setConsentAgreed}
            />

            {/* Actions */}
            <div className="pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => router.push("/apply/loan")}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-8"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue to Documents
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
