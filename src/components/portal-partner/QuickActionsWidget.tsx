"use client";

import React from "react";
import Link from "next/link";
import { Plus, Upload, ChevronRight } from "lucide-react";

export function QuickActionsWidget() {
  return (
    <div className="bg-white border border-[rgba(255,191,0,0.12)] rounded-[8px] p-[17px] flex flex-col justify-between w-full h-[178px] select-none drop-shadow-[0px_4px_9px_rgba(230,164,0,0.08)]">
      {/* Section Header (Node 34:916) */}
      <div>
        <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-black leading-[21px]">
          Quick Actions
        </h4>
      </div>

      {/* Button List (Node 34:918) */}
      <div className="flex flex-col gap-[8px] pt-[14px]">
        {/* Button 1: Submit New Deal (Node 34:920) */}
        <Link href="/partner/submit-deal" className="block w-full">
          <div className="border border-[rgba(80,120,200,0.15)] hover:border-[#ffbf00] hover:bg-[#fff9e6]/40 transition-all rounded-[7px] p-[11.5px] flex items-center gap-[10.5px] cursor-pointer">
            <div className="bg-[rgba(204,153,0,0.1)] rounded-[5px] size-[28px] flex items-center justify-center shrink-0">
              <Plus className="size-[14px] text-[#ffbf00] stroke-[3]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['DM_Sans'] font-semibold text-[14px] text-black leading-[1.5] truncate">
                Submit New Deal
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-end">
              <ChevronRight className="size-[14px] text-neutral-300" />
            </div>
          </div>
        </Link>

        {/* Button 2: Upload Documents (Node 34:931) */}
        <Link href="/partner/submit-deal" className="block w-full">
          <div className="border border-[rgba(80,120,200,0.15)] hover:border-[#ffbf00] hover:bg-[#fff9e6]/40 transition-all rounded-[7px] p-[11.5px] flex items-center gap-[10.5px] cursor-pointer">
            <div className="bg-[rgba(204,153,0,0.1)] rounded-[5px] size-[28px] flex items-center justify-center shrink-0">
              <Upload className="size-[14px] text-[#ffbf00] stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['DM_Sans'] font-semibold text-[14px] text-black leading-[1.5] truncate">
                Upload Documents
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-end">
              <ChevronRight className="size-[14px] text-neutral-300" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
