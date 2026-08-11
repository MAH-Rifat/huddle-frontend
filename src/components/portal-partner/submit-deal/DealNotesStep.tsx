"use client";

import React from "react";

interface DealNotesStepProps {
  dealNotes: string;
  onChangeNotes: (notes: string) => void;
}

export function DealNotesStep({
  dealNotes,
  onChangeNotes,
}: DealNotesStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-['Inter'] font-bold text-[24px] text-black">
          Deal Notes
        </h2>
        <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-0.5">
          Add any additional context or information
        </p>
      </div>

      <div>
        <textarea
          rows={6}
          value={dealNotes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="Add relevant context about this deal — client circumstances, special considerations, or any additional information that may assist the underwriting team..."
          className="w-full bg-[#fff9e6] border border-[rgba(255,191,0,0.2)] rounded-[8px] p-4 text-[14px] text-black font-['DM_Sans'] leading-relaxed placeholder:text-[#929292] focus:outline-none focus:ring-2 focus:ring-[#ffbf00] resize-none h-[180px]"
        />
      </div>
    </div>
  );
}
