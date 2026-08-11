"use client";

import React from "react";
import { UploadCloud, Edit3, Check, ArrowRight } from "lucide-react";

interface MethodSelectionStepProps {
  onSelectMethod: (method: "ocr" | "form") => void;
}

export function MethodSelectionStep({
  onSelectMethod,
}: MethodSelectionStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-stretch max-w-[1100px]">
      {/* Method A: Upload Existing Application */}
      <div
        onClick={() => onSelectMethod("ocr")}
        className="bg-white border border-[#e8dcc8] hover:border-[#ffbf00] rounded-[16px] p-7 flex flex-col justify-between space-y-6 cursor-pointer transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md group"
      >
        <div className="space-y-4">
          {/* Header: Method Badge + Upload Icon */}
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] font-bold text-[12px] text-[#ffbf00] uppercase tracking-wider">
              Method A
            </span>
            <div className="size-11 rounded-[12px] bg-[#fff9e6] flex items-center justify-center text-[#ffbf00]">
              <UploadCloud className="size-5.5" />
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-['Inter'] font-bold text-[20px] text-black">
              Upload Existing Application
            </h3>
            <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-2 leading-relaxed">
              Already have a completed application? Upload your documents and our AI will automatically extract all required data — no manual entry needed.
            </p>
          </div>

          {/* Features List Box */}
          <div className="bg-[#f8f5ee] rounded-[8px] p-4 space-y-2.5 text-[13px] font-['DM_Sans'] text-black font-medium">
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Upload completed application PDF</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Upload bank statements &amp; financials</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>AI reads &amp; extracts data automatically</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Fastest way to submit — under 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-[11px] font-bold text-[#00bc7d] bg-[rgba(0,188,125,0.12)] px-3 py-1.5 rounded-full">
            Recommended for returning partners
          </span>
          <div className="size-8 rounded-full bg-[#ffbf00] group-hover:scale-105 transition-transform flex items-center justify-center text-black shadow-xs">
            <ArrowRight className="size-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Method B: Complete Online Application */}
      <div
        onClick={() => onSelectMethod("form")}
        className="bg-white border border-[#e8dcc8] hover:border-[#ffbf00] rounded-[16px] p-7 flex flex-col justify-between space-y-6 cursor-pointer transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md group"
      >
        <div className="space-y-4">
          {/* Header: Method Badge + Edit Icon */}
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] font-bold text-[12px] text-[#ffbf00] uppercase tracking-wider">
              Method B
            </span>
            <div className="size-11 rounded-[12px] bg-[#fff9e6] flex items-center justify-center text-[#ffbf00]">
              <Edit3 className="size-5.5" />
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-['Inter'] font-bold text-[20px] text-black">
              Complete Online Application
            </h3>
            <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-2 leading-relaxed">
              Don&apos;t have a pre-filled application? Complete our guided step-by-step form to enter all client and deal information directly into our system.
            </p>
          </div>

          {/* Features List Box */}
          <div className="bg-[#f8f5ee] rounded-[8px] p-4 space-y-2.5 text-[13px] font-['DM_Sans'] text-black font-medium">
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>5-step guided application form</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Client info, deal details &amp; financials</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Upload supporting docs alongside form</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="size-4 rounded-full bg-[#ffbf00] flex items-center justify-center text-white shrink-0">
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span>Built-in validation at every step</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-[11px] font-bold text-[#6366f1] bg-[rgba(99,102,241,0.12)] px-3 py-1.5 rounded-full">
            Best for new client submissions
          </span>
          <div className="size-8 rounded-full bg-[#ffbf00] group-hover:scale-105 transition-transform flex items-center justify-center text-black shadow-xs">
            <ArrowRight className="size-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
