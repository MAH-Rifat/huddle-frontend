"use client";

import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

interface TopNavbarProps {
  portalType?: "partner" | "admin";
}

export function TopNavbar({ portalType = "partner" }: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-[76px] px-8 bg-[#fdf5ed] border-b border-[#f5efeb] flex items-center justify-between shrink-0 z-30 select-none shadow-2xs">
      {/* Title Greeting */}
      <div>
        <h1 className="text-[24px] font-bold text-black tracking-tight font-['Inter']">
          Welcome Back !
        </h1>
      </div>

      {/* Right Action Widgets */}
      <div className="flex items-center gap-4">
        {/* Search Bar matching Figma */}
        <div className="bg-white border border-neutral-200/80 rounded-[50px] h-[46px] w-[310px] flex items-center justify-between pl-4 pr-1 shadow-xs">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#242220] placeholder-[#94a3b8] focus:outline-none font-normal"
          />
          <button
            type="button"
            className="bg-black hover:bg-neutral-800 active:scale-95 transition-transform rounded-full size-[36px] flex items-center justify-center text-white shrink-0"
          >
            <Search className="size-3.5" />
          </button>
        </div>

        {/* Notification Bell matching Figma */}
        <button
          type="button"
          className="bg-white hover:bg-neutral-50 active:scale-95 transition-all rounded-full size-[46px] flex items-center justify-center text-black border border-neutral-200/80 shadow-xs"
        >
          <Bell className="size-4.5 text-[#242220]" />
        </button>

        {/* User Profile Pill matching Figma */}
        <div className="bg-transparent flex items-center gap-3 pl-2">
          <div className="size-10 rounded-full bg-[#d4c4b7] text-black font-bold flex items-center justify-center text-xs overflow-hidden border border-white shadow-xs">
            <span className="font-semibold text-neutral-800">J</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[14px] font-bold text-black leading-tight">
              John
            </span>
            <span className="text-[12px] text-[#65636d] leading-snug">
              john@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
