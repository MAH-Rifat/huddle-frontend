"use client";

import React from "react";
import { UploadedDoc } from "./UploadSupportingDocsStep";

interface ReviewSubmitStepProps {
  supportingDocs: UploadedDoc[];
}

export function ReviewSubmitStep({ supportingDocs }: ReviewSubmitStepProps) {
  const bankDoc = supportingDocs.find((d) => d.category === "Bank Statement") || supportingDocs[0];
  const finDoc = supportingDocs.find((d) => d.category === "Financial Statement") || supportingDocs[1];
  const taxDoc = supportingDocs.find((d) => d.category === "Tax Return") || supportingDocs[2];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-['Inter'] font-bold text-[24px] text-black">
          Review &amp; Submit
        </h2>
        <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-0.5">
          Review your deal before submitting
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Card 1: BUSINESS */}
        <div className="bg-[#f4efe4] border border-[rgba(89,67,0,0.12)] rounded-[8px] p-4 space-y-3">
          <p className="font-['Inter'] font-bold text-[12px] text-[#1d293d] uppercase tracking-wider">
            Business
          </p>
          <div className="grid grid-cols-3 gap-4 font-['DM_Sans']">
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Business Name</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">Meridian Construction LLC</p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Industry</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">Construction</p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Contact</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">James Harrington</p>
            </div>
          </div>
        </div>

        {/* Card 2: DEAL */}
        <div className="bg-[#f4efe4] border border-[rgba(89,67,0,0.12)] rounded-[8px] p-4 space-y-3">
          <p className="font-['Inter'] font-bold text-[12px] text-[#1d293d] uppercase tracking-wider">
            Deal
          </p>
          <div className="grid grid-cols-3 gap-4 font-['DM_Sans']">
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Funding Amount</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">$250,000</p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Purpose</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">Equipment Purchase</p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Product</p>
              <p className="text-[14px] font-semibold text-black mt-0.5">Term Loan</p>
            </div>
          </div>
        </div>

        {/* Card 3: DOCUMENTS */}
        <div className="bg-[#f4efe4] border border-[rgba(89,67,0,0.12)] rounded-[8px] p-4 space-y-3">
          <p className="font-['Inter'] font-bold text-[12px] text-[#1d293d] uppercase tracking-wider">
            Documents
          </p>
          <div className="grid grid-cols-3 gap-4 font-['DM_Sans']">
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Bank Statements</p>
              <p className={`text-[14px] font-semibold mt-0.5 ${bankDoc?.uploaded ? "text-[#00c950]" : "text-[#ef4444]"}`}>
                {bankDoc?.uploaded ? "✓ Uploaded" : "✕ Missing"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Financial Statements</p>
              <p className={`text-[14px] font-semibold mt-0.5 ${finDoc?.uploaded ? "text-[#00c950]" : "text-[#ef4444]"}`}>
                {finDoc?.uploaded ? "✓ Uploaded" : "✕ Missing"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#929292] font-medium">Tax Returns</p>
              <p className={`text-[14px] font-semibold mt-0.5 ${taxDoc?.uploaded ? "text-[#00c950]" : "text-[#ef4444]"}`}>
                {taxDoc?.uploaded ? "✓ Uploaded" : "✕ Missing"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
