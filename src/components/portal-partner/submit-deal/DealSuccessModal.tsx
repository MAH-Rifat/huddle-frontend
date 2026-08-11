"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface DealSuccessModalProps {
  isOpen: boolean;
  dealId: string;
  submissionMethod: "ocr" | "form";
  uploadedDocsCount: number;
  submittedDate: string;
  onClose: () => void;
  onReset: () => void;
}

export function DealSuccessModal({
  isOpen,
  dealId,
  submissionMethod,
  uploadedDocsCount,
  submittedDate,
  onClose,
  onReset,
}: DealSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/35 backdrop-blur-[2.5px] z-[99999] flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-[12px] w-[669px] h-[795px] max-w-[95vw] max-h-[95vh] p-[24px] flex flex-col justify-between items-end shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 select-none overflow-y-auto">
        {/* Top Close Button (Node 35:6475, cancel-circle, 24x24) */}
        <button
          type="button"
          onClick={onClose}
          className="size-[24px] flex items-center justify-center text-[#868484] hover:text-black transition-colors cursor-pointer shrink-0"
          title="Close"
        >
          <svg className="size-[24px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Inner Content Stack (Node 35:6476, 621px wide) */}
        <div className="flex flex-col gap-[32px] items-center w-full max-w-[621px] mx-auto">
          {/* Green Scalloped Checkmark Badge (Node 35:6477, checkmark-badge-01, 93x93) */}
          <div className="size-[93px] flex items-center justify-center shrink-0">
            <svg className="size-[93px]" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M37.2 9.3C41.2 5.3 47.7 5.3 51.7 9.3L54.3 11.9C56.2 13.8 58.8 14.9 61.5 14.9H65.2C70.9 14.9 75.5 19.5 75.5 25.2V28.9C75.5 31.6 76.6 34.2 78.5 36.1L81.1 38.7C85.1 42.7 85.1 49.2 81.1 53.2L78.5 55.8C76.6 57.7 75.5 60.3 75.5 63V66.7C75.5 72.4 70.9 77 65.2 77H61.5C58.8 77 56.2 78.1 54.3 80L51.7 82.6C47.7 86.6 41.2 86.6 37.2 82.6L34.6 80C32.7 78.1 30.1 77 27.4 77H23.7C18 77 13.4 72.4 13.4 66.7V63C13.4 60.3 12.3 57.7 10.4 55.8L7.8 53.2C3.8 49.2 3.8 42.7 7.8 38.7L10.4 36.1C12.3 34.2 13.4 31.6 13.4 28.9V25.2C13.4 19.5 18 14.9 23.7 14.9H27.4C30.1 14.9 32.7 13.8 34.6 11.9L37.2 9.3Z"
                fill="#a7f3d0"
                fillOpacity="0.45"
                stroke="#3fc951"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 46.5L41.5 56L61 36.5"
                stroke="#3fc951"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title, Subtitle, & Details Stack (Node 35:6478) */}
          <div className="flex flex-col gap-[31px] items-center w-full">
            {/* Title & Subtitle (Node 35:6479, 394px wide) */}
            <div className="flex flex-col gap-[6px] items-center text-center w-[394px] max-w-full">
              <h3 className="font-['Inter'] font-bold text-[26px] text-black leading-[1.2] whitespace-nowrap">
                Deal Submitted Successfully
              </h3>
              <p className="font-['Roboto'] font-normal text-[16px] text-[#868484] leading-normal">
                Your deal has been submitted to the underwriting team.
              </p>
            </div>

            {/* Structured Summary Box (Node 35:6565, 621px wide) */}
            <div className="bg-white border border-[#f5efeb] rounded-[8px] p-[24px] flex flex-col gap-[16px] w-full shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
              {/* Row 1: Deal ID */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Deal ID
                </span>
                <span className="font-['DM_Sans'] font-semibold text-[16px] text-black">
                  {dealId}
                </span>
              </div>
              <div className="h-[1px] bg-[rgba(0,0,0,0.06)] w-full" />

              {/* Row 2: Submission Method */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Submission Method
                </span>
                <span className="font-['DM_Sans'] font-semibold text-[16px] text-black">
                  {submissionMethod === "ocr" ? "Document Upload" : "Online Form"}
                </span>
              </div>
              <div className="h-[1px] bg-[rgba(0,0,0,0.06)] w-full" />

              {/* Row 3: Documents */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Documents
                </span>
                <span className="font-['DM_Sans'] font-semibold text-[16px] text-black">
                  {uploadedDocsCount} files uploaded
                </span>
              </div>
              <div className="h-[1px] bg-[rgba(0,0,0,0.06)] w-full" />

              {/* Row 4: Status */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Status
                </span>
                <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(26,78,224,0.2)] border border-[rgba(26,78,224,0.16)] text-[#3160e3] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                  Submitted
                </span>
              </div>
              <div className="h-[1px] bg-[rgba(0,0,0,0.06)] w-full" />

              {/* Row 5: Submitted Date */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Submitted
                </span>
                <span className="font-['DM_Sans'] font-semibold text-[16px] text-black">
                  {submittedDate}
                </span>
              </div>
              <div className="h-[1px] bg-[rgba(0,0,0,0.06)] w-full" />

              {/* Row 6: Next Step */}
              <div className="flex justify-between items-center h-[20px] w-full">
                <span className="font-['DM_Sans'] font-normal text-[14px] text-[#65636d]">
                  Next Step
                </span>
                <span className="font-['DM_Sans'] font-semibold text-[16px] text-black">
                  AI/OCR Processing
                </span>
              </div>

              {/* Purple Notification Banner (Node 35:6601) */}
              <div className="bg-[#faf5ff] border border-[#e9d4ff] rounded-[11px] p-[15px] flex gap-[10.5px] items-start w-full mt-1">
                <div className="pt-[1.75px] shrink-0">
                  <svg className="size-[16px] text-[#6e11b0]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 18 16 18H15.5C15.19 18 14.89 18.15 14.7 18.4L13.2 20.4C12.54 21.28 11.46 21.28 10.8 20.4L9.3 18.4C9.11 18.15 8.81 18 8.5 18V19Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start text-left">
                  <p className="font-['DM_Sans'] font-semibold text-[12.25px] text-[#6e11b0] leading-[17.5px]">
                    Notification sent
                  </p>
                  <p className="font-['DM_Sans'] font-normal text-[10.5px] text-[#9810fa] leading-[14px]">
                    The huddle underwriting team has been alerted and will begin review shortly.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons Row (Node 35:6585, 621px wide x 48px high, each 304.5px) */}
            <div className="flex gap-[12px] items-center w-full h-[48px]">
              <Link href="/partner/deals" className="flex-1 h-[48px]">
                <button
                  type="button"
                  className="w-full h-[48px] border border-black bg-white hover:bg-neutral-50 active:scale-[0.99] text-black font-['Inter'] font-bold text-[14px] leading-[24px] px-[20px] py-[12px] rounded-[8px] cursor-pointer transition-all text-center flex items-center justify-center"
                >
                  View My Deals
                </button>
              </Link>

              <button
                type="button"
                onClick={onReset}
                className="flex-1 h-[48px] bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.99] text-black font-['Inter'] font-bold text-[14px] leading-[24px] px-[20px] py-[12px] rounded-[8px] cursor-pointer transition-all shadow-xs text-center flex items-center justify-center"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
