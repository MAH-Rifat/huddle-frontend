"use client";

import React, { useState } from "react";

interface MonthPoint {
  month: string;
  amount: string;
  deals: number;
  y: number; // SVG Y coordinate (0 at 3.2M, 120 at 0M)
  isGreen?: boolean;
}

export function MonthlyPerformanceChart() {
  const yLabels = ["3.2M", "2.4M", "1.6M", "0.8M", "0M"];

  const points: MonthPoint[] = [
    { month: "Aug", amount: "$0.95M", deals: 4, y: 88 },
    { month: "Sep", amount: "$2.14M", deals: 8, y: 42 },
    { month: "Oct", amount: "$1.85M", deals: 7, y: 54, isGreen: true },
    { month: "Nov", amount: "$2.40M", deals: 10, y: 32, isGreen: true },
    { month: "Dec", amount: "$3.10M", deals: 12, y: 12 },
    { month: "Jan", amount: "$2.20M", deals: 9, y: 40 },
    { month: "Feb", amount: "$0.80M", deals: 3, y: 96 },
  ];

  // Default active month is Sep (index 1) matching Figma
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const activePoint = points[activeIndex];

  // SVG viewBox is 0 0 700 130
  // Each of the 7 months is centered at (idx * 100 + 50)
  const getX = (idx: number) => idx * 100 + 50;

  // Build SVG path smoothly connecting through each month point
  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(idx);
    if (idx === 0) return `M ${x} ${pt.y}`;
    const prevPt = points[idx - 1];
    const prevX = getX(idx - 1);
    const cpX1 = prevX + 45;
    const cpX2 = x - 45;
    return `${acc} C ${cpX1} ${prevPt.y}, ${cpX2} ${pt.y}, ${x} ${pt.y}`;
  }, "");

  // Area under curve
  const areaD = `${pathD} L ${getX(points.length - 1)} 125 L ${getX(0)} 125 Z`;

  return (
    <div className="bg-white border border-[rgba(255,191,0,0.12)] rounded-[8px] p-5 lg:p-6 drop-shadow-[0px_4px_9px_rgba(230,164,0,0.08)] flex flex-col justify-between h-[270px] w-full relative select-none">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-['Inter'] font-bold text-[17px] text-black tracking-tight">
          Monthly Performance
        </h3>
        <div className="text-[12px] font-['DM_Sans'] text-neutral-500 hidden sm:block">
          Selected: <span className="font-bold text-black">{activePoint.month}</span> ({activePoint.amount} · {activePoint.deals} Deals)
        </div>
      </div>

      <div className="relative h-[180px] w-full mt-1">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 w-9 flex flex-col justify-between text-right text-[11px] font-['Inter'] text-[#929292] pointer-events-none pr-1.5">
          {yLabels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>

        {/* Dashed Horizontal Grid Lines */}
        <div className="absolute left-9 right-0 top-1.5 bottom-6 flex flex-col justify-between pointer-events-none">
          {yLabels.map((_, idx) => (
            <div key={idx} className="h-0 border-b border-dashed border-neutral-200/90 w-full" />
          ))}
        </div>

        {/* Main Graph Area (left-9 right-0) */}
        <div className="absolute left-9 right-0 top-1.5 bottom-6">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 700 130"
          >
            <defs>
              <linearGradient id="perfAreaGradExact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffbf00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffbf00" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Gradient Area */}
            <path d={areaD} fill="url(#perfAreaGradExact)" />

            {/* Main Gold Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#ffd54f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Vertical Marker Line at Active Month */}
            <line
              x1={getX(activeIndex)}
              y1="0"
              x2={getX(activeIndex)}
              y2="125"
              stroke="#ffbf00"
              strokeDasharray="3 3"
              strokeWidth="1.5"
              className="transition-all duration-300"
            />

            {/* ONLY ONE DOT DIRECTLY AT THE TOP OF EACH OF THE 7 MONTHS */}
            {points.map((pt, idx) => {
              const cx = getX(idx);
              const isSelected = activeIndex === idx;

              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Dot */}
                  <circle
                    cx={cx}
                    cy={pt.y}
                    r={isSelected ? 6 : 4}
                    fill={pt.isGreen ? "#1e5e3a" : "#ffbf00"}
                    className={`${
                      isSelected
                        ? "stroke-white stroke-2 drop-shadow-md"
                        : "stroke-transparent"
                    } transition-all duration-300 cursor-pointer`}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip Box Precisely Over Active Month */}
          <div
            className="absolute -top-3.5 z-30 bg-[#333333] text-white px-2.5 py-1.5 rounded-[4px] shadow-lg flex flex-col items-center pointer-events-none transition-all duration-300 transform -translate-x-1/2 whitespace-nowrap"
            style={{
              left: `${((activeIndex + 0.5) / 7) * 100}%`,
            }}
          >
            <span className="font-['Inter'] text-[10px] text-neutral-300 leading-tight">
              {activePoint.month}
            </span>
            <span className="font-['DM_Sans'] text-[11px] font-bold text-white leading-tight">
              {activePoint.amount} total
            </span>
          </div>

          {/* 7 Interactive Column Hover Zones */}
          <div className="absolute inset-0 grid grid-cols-7 z-20">
            {points.map((pt, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className="h-full w-full cursor-pointer hover:bg-amber-500/5 transition-colors"
                title={`${pt.month}: ${pt.amount}`}
              />
            ))}
          </div>
        </div>

        {/* X-Axis Month Labels Centered Directly Under Each Column */}
        <div className="absolute left-9 right-0 bottom-0 grid grid-cols-7 text-center text-[11.5px] font-['Inter']">
          {points.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-colors font-medium ${
                activeIndex === idx
                  ? "text-black font-bold scale-105"
                  : "text-[#929292] hover:text-black"
              }`}
            >
              {pt.month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
