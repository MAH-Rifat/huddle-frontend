"use client";

import React from "react";
import {
  FileText,
  Loader2,
  CheckCircle2,
  DollarSign,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface PartnerKpiGridProps {
  submitted?: number;
  inProgress?: number;
  approved?: number;
  funded?: number;
  declined?: number;
  actionRequired?: number;
}

export function PartnerKpiGrid({
  submitted = 24,
  inProgress = 6,
  approved = 11,
  funded = 8,
  declined = 3,
  actionRequired = 2,
}: PartnerKpiGridProps) {
  const cards = [
    {
      title: "DEALS SUBMITTED",
      value: submitted,
      subtitle: "All time",
      icon: <FileText className="size-6 text-[#242220]" />,
    },
    {
      title: "IN PROGRESS",
      value: inProgress,
      subtitle: "Currently in work",
      icon: <Loader2 className="size-6 text-[#242220] animate-spin" />,
    },
    {
      title: "APPROVED",
      value: approved,
      subtitle: "This quarter",
      icon: <CheckCircle2 className="size-6 text-[#00d492]" />,
    },
    {
      title: "FUNDED",
      value: funded,
      subtitle: "$2.14M total",
      icon: <DollarSign className="size-6 text-[#00d492]" />,
    },
    {
      title: "DECLINED",
      value: declined,
      subtitle: "This quarter",
      icon: <XCircle className="size-6 text-[#ef4444]" />,
    },
    {
      title: "ACTION REQUIRED",
      value: actionRequired,
      subtitle: "Needs attention",
      icon: <AlertCircle className="size-6 text-[#f59e0b]" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative h-[124px] rounded-[16px] bg-[#fff9e6] border border-[rgba(255,191,0,0.2)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.06),0px_4px_6px_-4px_rgba(0,0,0,0.04)] overflow-hidden p-6 flex items-start justify-between group hover:border-[rgba(255,191,0,0.4)] transition-all"
        >
          {/* Ambient Glow */}
          <div className="absolute bg-[rgba(255,191,0,0.25)] blur-[40px] h-[155px] left-[125px] rounded-full top-[-56px] w-[160px] pointer-events-none" />

          {/* Left Text */}
          <div className="flex flex-col gap-1 relative z-10">
            <p className="font-['Inter'] font-bold text-[12px] uppercase text-black leading-tight tracking-wide">
              {card.title}
            </p>
            <p className="font-['Inter'] font-bold text-[26px] text-black leading-none mt-1">
              {card.value}
            </p>
            <p className="font-['DM_Sans'] text-[12px] text-[#929292] leading-tight mt-0.5">
              {card.subtitle}
            </p>
          </div>

          {/* Right Icon */}
          <div className="relative z-10 shrink-0">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
