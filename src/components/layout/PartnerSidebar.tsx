"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Users,
  Settings,
  ChevronDown,
  ChevronLeft,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function PartnerSidebar({
  isCollapsed = false,
  onToggleCollapse,
}: PartnerSidebarProps) {
  const pathname = usePathname();
  const [actionRequiredOpen, setActionRequiredOpen] = useState(true);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <aside className="h-full w-full backdrop-blur-[80px] bg-[rgba(255,237,224,0.56)] border-r border-[#f5efeb] flex flex-col justify-between select-none relative z-30 p-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="space-y-5 w-full flex flex-col items-center">
        {/* Top Logo Banner (Node 34:1274) */}
        <div className="w-full pt-1 pb-1 flex items-center overflow-hidden">
          <div className="flex items-center min-w-0 gap-3">
            <div className="size-10 rounded-xl bg-[#ffbf00] flex items-center justify-center text-black font-black text-xl shadow-xs shrink-0">
              h
            </div>
            <div
              className={cn(
                "flex flex-col whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isCollapsed ? "max-w-0 opacity-0 -translate-x-3 pointer-events-none" : "max-w-[170px] opacity-100 translate-x-0"
              )}
            >
              <h1 className="font-['Inter'] font-black text-[28px] tracking-[-1px] text-black leading-none lowercase">
                huddle
              </h1>
              <p className="font-['Inter'] font-medium text-[10px] text-[#c59609] tracking-tight mt-0.5">
                where biz comes together
              </p>
            </div>
          </div>
        </div>

        {/* User / Partner Profile Header Row (Node 34:1276) */}
        <div className="relative w-full flex items-center h-12">
          <div className="flex items-center min-w-0 gap-3 w-full">
            {/* 48px Circular Avatar */}
            <div className="size-11 rounded-full overflow-hidden border-2 border-white shadow-xs bg-[#e8ded8] shrink-0 relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Andrew Smith"
                className="size-full object-cover"
              />
            </div>

            {/* Profile Text */}
            <div
              className={cn(
                "flex flex-col whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isCollapsed ? "max-w-0 opacity-0 -translate-x-3 pointer-events-none" : "max-w-[140px] opacity-100 translate-x-0"
              )}
            >
              <p className="text-[11px] font-['Inter'] font-medium uppercase tracking-[0.4px] text-[rgba(0,0,0,0.32)] leading-tight">
                PARTNER PORTAL
              </p>
              <p className="text-[14px] font-['Inter'] font-semibold text-black truncate leading-snug mt-0.5">
                Andrew Smith
              </p>
            </div>
          </div>

          {/* Protruding Circular Collapse Toggle Button on the Right Border Line (Node 34:1250) */}
          <button
            onClick={onToggleCollapse}
            type="button"
            className="absolute -right-[30px] top-1/2 -translate-y-1/2 size-7 rounded-full bg-[#fbf3ec] border border-[#ebdcd3] shadow-sm flex items-center justify-center text-[#786a65] hover:text-black hover:bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 cursor-pointer active:scale-90"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "size-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isCollapsed ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>

        {/* Thin Gradient Divider Line (Node 34:1249) */}
        <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent via-[rgba(67,44,44,0.18)] to-transparent" />

        {/* Navigation Section (Node 34:1366) */}
        <div className="space-y-1 w-full flex flex-col">
          {/* Main Section Header */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isCollapsed ? "max-h-0 opacity-0 pointer-events-none" : "max-h-6 opacity-100 mb-1"
            )}
          >
            <p className="px-3 text-[11px] font-['Inter'] font-medium uppercase tracking-[0.4px] text-[rgba(36,34,32,0.4)] whitespace-nowrap">
              MAIN
            </p>
          </div>

          {/* 01. Dashboard (Node 34:1370) */}
          <Link
            href="/partner/dashboard"
            className={cn(
              "flex items-center rounded-[12px] text-[14px] font-medium h-[46px] px-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden",
              isActive("/partner/dashboard") || pathname === "/partner"
                ? "bg-[rgba(36,34,32,0.04)] text-[#242220] font-semibold border border-[rgba(245,239,235,0.08)] shadow-2xs"
                : "text-[rgba(36,34,32,0.56)] hover:bg-white/40 hover:text-black"
            )}
            title="Dashboard"
          >
            {(isActive("/partner/dashboard") || pathname === "/partner") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(204,139,139,0.35)] via-[rgba(184,99,99,0.15)] to-transparent blur-[16px] pointer-events-none" />
            )}
            <LayoutGrid className={cn("size-5 shrink-0 relative z-10 mx-auto lg:mx-0", (isActive("/partner/dashboard") || pathname === "/partner") ? "text-[#242220]" : "text-[rgba(36,34,32,0.56)]")} />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10 font-['Inter']",
                isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[140px] opacity-100 ml-3.5"
              )}
            >
              Dashboard
            </span>
          </Link>

          {/* 02. My Deals (Node 34:1374) */}
          <Link
            href="/partner/deals"
            className={cn(
              "flex items-center rounded-[12px] text-[14px] font-medium h-[46px] px-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden",
              isActive("/partner/deals")
                ? "bg-[rgba(36,34,32,0.04)] text-[#242220] font-semibold border border-[rgba(245,239,235,0.08)] shadow-2xs"
                : "text-[rgba(36,34,32,0.56)] hover:bg-white/40 hover:text-black"
            )}
            title="My Deals"
          >
            {isActive("/partner/deals") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(204,139,139,0.35)] via-[rgba(184,99,99,0.15)] to-transparent blur-[16px] pointer-events-none" />
            )}
            <FileText className={cn("size-5 shrink-0 relative z-10 mx-auto lg:mx-0", isActive("/partner/deals") ? "text-[#242220]" : "text-[rgba(36,34,32,0.56)]")} />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10 font-['Inter']",
                isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[140px] opacity-100 ml-3.5"
              )}
            >
              My Deals
            </span>
          </Link>

          {/* 03. ACTION REQUIRED Accordion with Tree Branches (Node 34:1380 & 34:1385) */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isCollapsed ? "max-h-0 opacity-0 pointer-events-none" : "max-h-48 opacity-100"
            )}
          >
            <button
              onClick={() => setActionRequiredOpen(!actionRequiredOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-['Inter'] font-medium uppercase tracking-[0.4px] text-[rgba(36,34,32,0.4)] hover:text-black cursor-pointer"
            >
              <span className="whitespace-nowrap">ACTION REQUIRED</span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-[rgba(36,34,32,0.4)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  actionRequiredOpen ? "" : "-rotate-90"
                )}
              />
            </button>

            {actionRequiredOpen && (
              <div className="pl-6 pt-1 pb-1 flex flex-col space-y-2 relative">
                {/* 01. Missing Documents with ├── branch line */}
                <div className="relative flex items-center min-h-[26px]">
                  {/* Tree branch connector */}
                  <div className="absolute -left-3 top-0 bottom-0 w-3 pointer-events-none">
                    {/* Continuous vertical stem */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-[#bfb4ac]" />
                    {/* Horizontal branch line to text */}
                    <div className="absolute left-0 top-1/2 w-3 h-[1.5px] bg-[#bfb4ac]" />
                  </div>

                  <Link
                    href="/partner/deals"
                    className="text-[13px] font-['Inter'] font-medium text-[rgba(36,34,32,0.7)] hover:text-black transition-colors pl-2 whitespace-nowrap"
                  >
                    Missing Documents
                  </Link>
                </div>

                {/* 02. Pending Actions with └── branch line */}
                <div className="relative flex items-center min-h-[26px]">
                  {/* Tree branch connector */}
                  <div className="absolute -left-3 top-0 bottom-0 w-3 pointer-events-none">
                    {/* Half height vertical stem terminating at middle */}
                    <div className="absolute left-0 top-0 h-1/2 w-[1.5px] bg-[#bfb4ac]" />
                    {/* Horizontal branch line to text */}
                    <div className="absolute left-0 top-1/2 w-3 h-[1.5px] bg-[#bfb4ac]" />
                  </div>

                  <Link
                    href="/partner/deals"
                    className="text-[13px] font-['Inter'] font-medium text-[rgba(36,34,32,0.7)] hover:text-black transition-colors pl-2 whitespace-nowrap"
                  >
                    Pending Actions
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 04. Users (Node 36:10782) */}
          <Link
            href="/partner/team"
            className={cn(
              "flex items-center rounded-[12px] text-[14px] font-medium h-[46px] px-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden",
              isActive("/partner/team")
                ? "bg-[rgba(36,34,32,0.04)] text-[#242220] font-semibold border border-[rgba(245,239,235,0.08)] shadow-2xs"
                : "text-[rgba(36,34,32,0.56)] hover:bg-white/40 hover:text-black"
            )}
            title="Users"
          >
            {isActive("/partner/team") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(204,139,139,0.35)] via-[rgba(184,99,99,0.15)] to-transparent blur-[16px] pointer-events-none" />
            )}
            <Users className={cn("size-5 shrink-0 relative z-10 mx-auto lg:mx-0", isActive("/partner/team") ? "text-[#242220]" : "text-[rgba(36,34,32,0.56)]")} />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10 font-['Inter']",
                isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[140px] opacity-100 ml-3.5"
              )}
            >
              Users
            </span>
          </Link>

          {/* 05. Settings (Node 86:15776) */}
          <Link
            href="/partner/settings"
            className={cn(
              "flex items-center rounded-[12px] text-[14px] font-medium h-[46px] px-3 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden",
              isActive("/partner/settings")
                ? "bg-[rgba(36,34,32,0.04)] text-[#242220] font-semibold border border-[rgba(245,239,235,0.08)] shadow-2xs"
                : "text-[rgba(36,34,32,0.56)] hover:bg-white/40 hover:text-black"
            )}
            title="Settings"
          >
            {isActive("/partner/settings") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(204,139,139,0.35)] via-[rgba(184,99,99,0.15)] to-transparent blur-[16px] pointer-events-none" />
            )}
            <Settings className={cn("size-5 shrink-0 relative z-10 mx-auto lg:mx-0", isActive("/partner/settings") ? "text-[#242220]" : "text-[rgba(36,34,32,0.56)]")} />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10 font-['Inter']",
                isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[140px] opacity-100 ml-3.5"
              )}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>

      {/* Promo Block (Bottom of Sidebar matching Figma Node 34:1258) */}
      <div className="w-full mt-4">
        {/* Expanded Mode Promo Card */}
        <div
          className={cn(
            "w-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center text-center",
            isCollapsed
              ? "max-h-0 opacity-0 pointer-events-none p-0"
              : "max-h-[220px] opacity-100 bg-[rgba(255,255,255,0.12)] border-[0.5px] border-[rgba(245,239,235,0.16)] p-4 rounded-[20px] shadow-2xs"
          )}
        >
          <div className="space-y-1 flex flex-col items-center justify-center text-center w-full">
            <h4 className="text-[15px] font-['Inter'] font-semibold text-[#242220] tracking-[0.16px] whitespace-nowrap text-center">
              Let&apos;s start!
            </h4>
            <p className="text-[12px] font-['Inter'] font-medium text-[rgba(36,34,32,0.56)] leading-[1.5] text-center px-1">
              Creating or adding new tasks couldn&apos;t be easier
            </p>
          </div>

          <Link href="/partner/submit-deal" className="block pt-3 w-full">
            <button className="w-full bg-[#ffbf00] hover:bg-[#e6ac00] active:bg-[#cc9900] transition-all text-black font-['Gilmer:Bold',sans-serif] font-bold text-[12px] py-2.5 px-3 rounded-[8px] shadow-2xs cursor-pointer text-center">
              Submit New Deal
            </button>
          </Link>
        </div>

        {/* Collapsed Mode Plus Button */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center",
            isCollapsed
              ? "max-h-12 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <Link href="/partner/submit-deal" title="Submit New Deal" className="flex items-center justify-center">
            <button className="size-10 rounded-xl bg-[#ffbf00] hover:bg-[#e6ac00] active:bg-[#cc9900] text-black font-bold flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-transform">
              <Plus className="size-5 stroke-[2.5]" />
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
