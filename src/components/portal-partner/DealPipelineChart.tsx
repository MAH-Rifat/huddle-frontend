"use client";

import React, { useState } from "react";

export function DealPipelineChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bars = [
    { label: "Submitted", widthPercent: 95, count: 24, volume: "$6.25M" },
    { label: "Processing", widthPercent: 78, count: 18, volume: "$4.80M" },
    { label: "Underwriting", widthPercent: 70, count: 14, volume: "$3.90M" },
    { label: "Approved", widthPercent: 52, count: 11, volume: "$2.85M" },
    { label: "Funded", widthPercent: 42, count: 8, volume: "$2.14M" },
  ];

  return (
    <div className="bg-white border border-[rgba(255,191,0,0.12)] rounded-[8px] p-5 lg:p-6 drop-shadow-[0px_4px_9px_rgba(230,164,0,0.08)] flex flex-col justify-between h-[270px] w-full select-none">
      {/* Title & Hover readout */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-['Inter'] font-bold text-[17px] text-black tracking-tight">
          Deal Pipeline
        </h3>
        {hoveredIndex !== null ? (
          <span className="text-[12px] font-['DM_Sans'] font-bold text-[#b45309] bg-[#fff9e6] px-2.5 py-0.5 rounded-full border border-[rgba(255,191,0,0.2)] animate-fade-in">
            {bars[hoveredIndex].count} Deals ({bars[hoveredIndex].volume})
          </span>
        ) : (
          <span className="text-[11.5px] font-['DM_Sans'] text-[#929292] hidden sm:inline">
            Hover stage for details
          </span>
        )}
      </div>

      {/* 5 Horizontal Bars with Dashed Background Lines */}
      <div className="flex-1 flex flex-col justify-between py-1 mt-1">
        {bars.map((bar, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center gap-4 relative group cursor-pointer"
            >
              {/* Left Stage Label */}
              <div
                className={`w-24 text-left font-['DM_Sans'] text-[13px] shrink-0 transition-colors ${
                  isHovered ? "font-bold text-black" : "font-semibold text-black"
                }`}
              >
                {bar.label}
              </div>

              {/* Bar & Track Container */}
              <div className="flex-1 relative flex items-center h-6">
                {/* Dashed background guideline */}
                <div className="absolute inset-x-0 h-0 border-b border-dashed border-neutral-200/90" />

                {/* Golden Yellow Bar */}
                <div
                  className={`h-[14px] rounded-r-xs relative z-10 transition-all duration-300 ${
                    isHovered
                      ? "bg-[#ffbf00] shadow-[0_0_12px_rgba(255,191,0,0.6)] scale-y-110"
                      : "bg-[#e6a400] shadow-xs"
                  }`}
                  style={{ width: `${bar.widthPercent}%` }}
                />

                {/* Floating tooltip on hover */}
                {isHovered && (
                  <div
                    className="absolute -top-6 z-30 bg-[#333333] text-white text-[10.5px] font-bold px-2 py-0.5 rounded-[4px] shadow-md pointer-events-none transform -translate-x-1/2 whitespace-nowrap animate-fade-in"
                    style={{ left: `${Math.min(Math.max(bar.widthPercent, 15), 85)}%` }}
                  >
                    {bar.count} Deals · {bar.volume}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
