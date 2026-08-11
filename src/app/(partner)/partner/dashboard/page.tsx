"use client";

import React from "react";
import {
  FileText,
  Loader,
  CheckCircle,
  CircleDollarSign,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { DealPipelineChart } from "@/components/portal-partner/DealPipelineChart";
import { MonthlyPerformanceChart } from "@/components/portal-partner/MonthlyPerformanceChart";
import { RecentDealsTable } from "@/components/portal-partner/RecentDealsTable";
import { ActionRequiredWidget } from "@/components/portal-partner/ActionRequiredWidget";
import { QuickActionsWidget } from "@/components/portal-partner/QuickActionsWidget";

export default function PartnerDashboardPage() {
  const kpis = [
    {
      title: "DEALS SUBMITTED",
      value: "24",
      subtitle: "All time",
      icon: <FileText className="size-5 text-[#ffbf00]" />,
    },
    {
      title: "IN PROGRESS",
      value: "6",
      subtitle: "Currently in work",
      icon: <Loader className="size-5 text-[#ffbf00] animate-spin" />,
    },
    {
      title: "APPROVED",
      value: "11",
      subtitle: "This quarter",
      icon: <CheckCircle className="size-5 text-[#ffbf00]" />,
    },
    {
      title: "FUNDED",
      value: "8",
      subtitle: "$2.14M total",
      icon: <CircleDollarSign className="size-5 text-[#ffbf00]" />,
    },
    {
      title: "DECLINED",
      value: "3",
      subtitle: "This quarter",
      icon: <XCircle className="size-5 text-[#ffbf00]" />,
    },
    {
      title: "ACTION REQUIRED",
      value: "2",
      subtitle: "Needs attention",
      icon: <AlertTriangle className="size-5 text-[#ffbf00]" />,
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-[1680px] mx-auto select-none font-['Inter']">
      {/* ROW 1: 6 KPI Cards Grid (Figma Node 110:9125) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 w-full">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="h-[116px] rounded-[16px] bg-[#fff9e6] border border-[rgba(255,191,0,0.22)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.06),0px_4px_6px_-4px_rgba(0,0,0,0.04)] p-5 relative overflow-hidden flex items-start justify-between"
          >
            {/* Ambient Gold Radial Glow */}
            <div className="absolute bg-[rgba(255,191,0,0.22)] blur-[35px] h-[140px] left-[110px] rounded-full top-[-50px] w-[140px] pointer-events-none" />

            <div className="relative z-10 space-y-0.5">
              <p className="font-['Inter'] font-bold text-[11px] uppercase tracking-wide text-black leading-tight">
                {kpi.title}
              </p>
              <p className="font-['Inter'] font-bold text-[24px] text-black leading-tight pt-1">
                {kpi.value}
              </p>
              <p className="font-['DM_Sans'] text-[11.5px] text-[#929292] leading-tight pt-0.5">
                {kpi.subtitle}
              </p>
            </div>

            <div className="relative z-10 shrink-0 mt-0.5">
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2: 2 Charts Side-by-Side (Figma Node 34:1411) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
        {/* Left: Deal Pipeline Horizontal Bar Chart (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <DealPipelineChart />
        </div>

        {/* Right: Monthly Performance Area Chart (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <MonthlyPerformanceChart />
        </div>
      </div>

      {/* ROW 3: Bottom Row - Equal Height Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
        {/* Left: Recent Deals Table (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <RecentDealsTable />
        </div>

        {/* Right: Action Required & Quick Actions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-between h-full">
          <ActionRequiredWidget />
          <QuickActionsWidget />
        </div>
      </div>
    </div>
  );
}
