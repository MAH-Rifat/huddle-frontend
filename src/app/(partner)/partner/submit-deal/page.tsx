"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { SubmitDealStepper } from "@/components/portal-partner/submit-deal/SubmitDealStepper";
import { MethodSelectionStep } from "@/components/portal-partner/submit-deal/MethodSelectionStep";
import { UploadApplicationStep } from "@/components/portal-partner/submit-deal/UploadApplicationStep";
import {
  UploadSupportingDocsStep,
  UploadedDoc,
} from "@/components/portal-partner/submit-deal/UploadSupportingDocsStep";
import { DealNotesStep } from "@/components/portal-partner/submit-deal/DealNotesStep";
import { ReviewSubmitStep } from "@/components/portal-partner/submit-deal/ReviewSubmitStep";
import { DealSuccessModal } from "@/components/portal-partner/submit-deal/DealSuccessModal";

export default function SubmitDealPage() {
  const router = useRouter();
  const { addDeal, activePartner } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [submissionMethod, setSubmissionMethod] = useState<"ocr" | "form">("ocr");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedDealId, setSubmittedDealId] = useState("DL-2406");
  const [submittedDate, setSubmittedDate] = useState("Jul 11, 2026 · 10:24 AM");

  const [dealNotes, setDealNotes] = useState("");

  // Step 2: Application File Upload State
  const [applicationFile, setApplicationFile] = useState<{
    name: string;
    size: string;
  }>({
    name: "application_meridian_construction.pdf",
    size: "2.4 MB",
  });

  // Step 3: Supporting Docs State
  const [supportingDocs, setSupportingDocs] = useState<UploadedDoc[]>([
    {
      id: "doc-1",
      name: "bank_statements.pdf",
      category: "Bank Statement",
      displayTitle: "Bank Statements",
      subtitle: "Last 3–6 months",
      size: "4.2 MB",
      uploaded: true,
    },
    {
      id: "doc-2",
      name: "financial_statements.pdf",
      category: "Financial Statement",
      displayTitle: "Financial Statements",
      subtitle: "P&L, Balance Sheet",
      size: "3.1 MB",
      uploaded: true,
    },
    {
      id: "doc-3",
      name: "",
      category: "Tax Return",
      displayTitle: "Tax Returns",
      subtitle: "Last 2 years",
      size: "",
      uploaded: false,
    },
    {
      id: "doc-4",
      name: "",
      category: "Application",
      displayTitle: "Application",
      subtitle: "Signed application form",
      size: "",
      uploaded: false,
    },
    {
      id: "doc-5",
      name: "",
      category: "Other",
      displayTitle: "Other Supporting Documents",
      subtitle: "Any additional documentation",
      size: "",
      uploaded: false,
    },
  ]);

  const steps = [
    { id: 1, label: "Choose Method" },
    { id: 2, label: "Upload Application" },
    { id: 3, label: "Supporting Docs" },
    { id: 4, label: "Deal Notes" },
    { id: 5, label: "Review & Submit" },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSelectMethod = (method: "ocr" | "form") => {
    setSubmissionMethod(method);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleApplicationFileSelect = (file: File) => {
    setApplicationFile({
      name: file.name,
      size: formatFileSize(file.size),
    });
  };

  const handleSupportingDocUpload = (docId: string, file: File) => {
    setSupportingDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              name: file.name,
              size: formatFileSize(file.size),
              uploaded: true,
            }
          : doc
      )
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr =
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) +
        " · " +
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

      const newDeal = addDeal({
        clientName: "James Harrington",
        businessName: "Meridian Construction LLC",
        dba: "Meridian Builders",
        entityType: "LLC",
        industry: "Construction",
        address: "920 Industrial Pkwy, Denver, CO 80216",
        email: "j.harrington@meridianbuilders.com",
        phone: "(303) 555-7712",
        requestedAmount: 250000,
        fundingPurpose: "Equipment Purchase",
        productType: "Term Loan",
        stage: "Submitted",
        underwritingStatus: "New",
        partnerId: activePartner.id,
        partnerName: activePartner.name,
        financialMetrics: {
          annualRevenue: 3800000,
          monthlyExpenses: 240000,
          monthlyCashFlow: 95000,
          existingDebt: 320000,
          creditScore: 755,
          timeInBusinessYears: 9,
          dscr: 1.85,
        },
        documents: [
          {
            id: `doc-${Date.now()}-1`,
            name: applicationFile.name,
            category: "Application",
            uploadedAt: new Date().toISOString().split("T")[0],
            fileSize: applicationFile.size,
            status: "verified",
            fileType: "pdf",
          },
          ...supportingDocs
            .filter((d) => d.uploaded)
            .map((d, idx) => ({
              id: `doc-${Date.now()}-${idx + 2}`,
              name: d.name || `${d.displayTitle.toLowerCase().replace(/\s+/g, "_")}.pdf`,
              category: d.category,
              uploadedAt: new Date().toISOString().split("T")[0],
              fileSize: d.size || "2.5 MB",
              status: "verified" as const,
              fileType: "pdf",
            })),
        ],
        notes: [
          {
            id: `note-${Date.now()}`,
            authorName: "Andrew Smith",
            authorRole: "Partner Admin",
            content: dealNotes || "Deal submitted via portal.",
            timestamp: "Just now",
          },
        ],
      });

      setSubmittedDealId(newDeal.dealNumber);
      setSubmittedDate(dateStr);
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccessModalOpen(false);
    setCurrentStep(1);
    setDealNotes("");
    setApplicationFile({
      name: "application_meridian_construction.pdf",
      size: "2.4 MB",
    });
  };

  return (
    <div className="w-full space-y-6 pb-16 select-none max-w-[1316px]">
      {/* Header (All Screens) */}
      <div className="space-y-1">
        <h1 className="font-['Inter'] font-bold text-[36px] text-black leading-[1.3] tracking-tight">
          Submit New Deal
        </h1>
        <p className="font-['DM_Sans'] font-normal text-[14px] text-[#929292] leading-[1.4]">
          Choose your preferred submission method below
        </p>
      </div>

      {/* STEP 1: Method Selection (Node 34:1414) */}
      {currentStep === 1 && (
        <MethodSelectionStep onSelectMethod={handleSelectMethod} />
      )}

      {/* STEPS 2 TO 5: Wizard Layout with Left Stepper & Right Panel */}
      {currentStep > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Left Vertical Stepper */}
          <SubmitDealStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(stepId) => setCurrentStep(stepId)}
          />

          {/* Right Form Content Panel (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between min-h-[460px] space-y-6">
            {/* STEP 2: Upload Application (Node 35:2735) */}
            {currentStep === 2 && (
              <UploadApplicationStep
                applicationFile={applicationFile}
                onFileSelect={handleApplicationFileSelect}
              />
            )}

            {/* STEP 3: Upload Supporting Documents (Node 35:5930) */}
            {currentStep === 3 && (
              <UploadSupportingDocsStep
                docs={supportingDocs}
                onUploadDoc={handleSupportingDocUpload}
              />
            )}

            {/* STEP 4: Deal Notes (Node 35:6170) */}
            {currentStep === 4 && (
              <DealNotesStep
                dealNotes={dealNotes}
                onChangeNotes={setDealNotes}
              />
            )}

            {/* STEP 5: Review & Submit (Node 35:5302) */}
            {currentStep === 5 && (
              <ReviewSubmitStep supportingDocs={supportingDocs} />
            )}

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              <button
                type="button"
                onClick={handleBack}
                className="border border-black rounded-[8px] px-8 py-2.5 font-['Inter'] font-bold text-[14px] text-black hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.98] rounded-[8px] px-9 py-2.5 font-['Inter'] font-bold text-[14px] text-black shadow-xs cursor-pointer transition-all"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEAL SUBMITTED SUCCESSFULLY MODAL (Figma Node 35:6474 - Exact 669px x 795px) */}
      <DealSuccessModal
        isOpen={isSuccessModalOpen}
        dealId={submittedDealId}
        submissionMethod={submissionMethod}
        uploadedDocsCount={1 + supportingDocs.filter((d) => d.uploaded).length}
        submittedDate={submittedDate}
        onClose={() => router.push("/partner/deals")}
        onReset={handleReset}
      />
    </div>
  );
}
