"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Bell, Upload } from "lucide-react";

export function ActionRequiredWidget() {
  return (
    <div className="bg-white border border-[rgba(255,191,0,0.12)] rounded-[7px] p-[21px] flex flex-col justify-between w-full flex-1 select-none drop-shadow-[0px_4px_9px_rgba(230,164,0,0.08)]">
      {/* Section Header (Node 34:879) */}
      <div className="flex flex-col h-[49px]">
        <h3 className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
          Action Required
        </h3>
        <p className="font-['DM_Sans'] font-normal text-[14px] text-[#929292] leading-[1.4]">
          2 items need your attention
        </p>
      </div>

      {/* Items Container (Node 34:884) */}
      <div className="flex flex-col w-full space-y-[10.5px] my-auto">
        {/* Item 1: Orange Box - Bank Statement Missing (Node 34:885) */}
        <div className="bg-[rgba(255,105,0,0.08)] border border-[rgba(255,105,0,0.25)] rounded-[7px] p-[11.5px] flex flex-col items-start gap-[11.5px] w-full">
          <div className="flex items-start gap-[7px] w-full">
            <div className="pt-[1.75px] shrink-0">
              <AlertCircle className="size-[18px] text-[#ff6900]" />
            </div>
            <div className="flex flex-col gap-[2px] flex-1 min-w-0">
              <p className="font-['DM_Sans'] font-semibold text-[16px] text-black leading-normal truncate">
                BluePeak Tech Solutions
              </p>
              <p className="font-['DM_Sans'] font-normal text-[14px] text-[#929292] leading-[1.4]">
                Q3 2023 Bank Statement Missing
              </p>
            </div>
          </div>

          {/* Upload Document Button (Node 34:897) */}
          <Link href="/partner/deals/deal-2" className="w-full">
            <button
              type="button"
              className="w-full border border-[rgba(255,105,0,0.3)] bg-transparent hover:bg-orange-500/10 active:scale-[0.98] transition-all rounded-[5px] px-[11.5px] py-[11.25px] flex items-center justify-center gap-[7px]"
            >
              <Upload className="size-[16.5px] text-[#ffb86a]" />
              <span className="font-['Inter'] font-bold text-[14px] text-[#ffb86a] leading-[24px] text-center">
                Upload Document
              </span>
            </button>
          </Link>
        </div>

        {/* Item 2: Blue Box - Under Review (Node 34:904) */}
        <div className="bg-[rgba(43,127,255,0.08)] border border-[rgba(43,127,255,0.25)] rounded-[7px] p-[11.5px] flex items-start gap-[7px] w-full">
          <div className="pt-[1.75px] shrink-0">
            <Bell className="size-[18px] text-[#2777f6]" />
          </div>
          <div className="flex flex-col gap-[1.75px] flex-1 min-w-0">
            <p className="font-['DM_Sans'] font-semibold text-[16px] text-[#2777f6] leading-normal truncate">
              DL-2401 Under Review
            </p>
            <p className="font-['DM_Sans'] font-normal text-[14px] text-[#8ec5ff] leading-[1.4]">
              Meridian Construction — Awaiting underwriter decision
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
