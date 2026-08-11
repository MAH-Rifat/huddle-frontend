"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  Building,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const { deals, partners } = useApp();
  const [cashflowOpen, setCashflowOpen] = useState(true);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Deals",
      href: "/admin/deals",
      icon: <FileCheck2 className="h-4 w-4" />,
      count: deals.length,
    },
    {
      label: "Partners",
      href: "/admin/partners",
      icon: <Building className="h-4 w-4" />,
      count: partners.length,
    },
  ];

  const cashflowSubItems = [
    { label: "Overview", tab: "overview" },
    { label: "Bank & Debt Summary", tab: "bank-debt" },
    { label: "Balance Insights", tab: "balance" },
    { label: "Profit & Loss", tab: "profit-loss" },
    { label: "Lender Match", tab: "lender-match" },
  ];

  return (
    <aside className="w-64 shrink-0 bg-surface-900 text-white min-h-screen flex flex-col justify-between border-r border-surface-800 select-none">
      <div>
        {/* Logo / Header */}
        <div className="p-5 border-b border-surface-800 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-black text-sm text-white shadow-md">
              CF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">
                  CapFlow Admin
                </span>
              </div>
              <p className="text-[11px] text-surface-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-400" /> Platform Underwriting
              </p>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-surface-800/60 border border-surface-700/50 flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              AS
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-900" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">Andrew Smith</p>
            <p className="text-[11px] text-surface-400 truncate">Senior Underwriter</p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-surface-500 mb-2">
            Main
          </p>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/admin/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-brand-600 text-white font-semibold shadow-sm"
                    : "text-surface-300 hover:bg-surface-800/80 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("transition-colors", isActive ? "text-white" : "text-surface-400 group-hover:text-white")}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      isActive ? "bg-brand-700 text-white" : "bg-surface-800 text-surface-400"
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Cashflow Reports Accordion */}
          <div className="pt-2">
            <button
              onClick={() => setCashflowOpen(!cashflowOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-surface-400 hover:text-surface-200 transition-colors"
            >
              <div className="flex items-center gap-2 text-indigo-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Cashflow Reports</span>
              </div>
              {cashflowOpen ? (
                <ChevronDown className="h-3.5 w-3.5 text-surface-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-surface-400" />
              )}
            </button>

            {cashflowOpen && (
              <div className="mt-1 ml-4 pl-3 border-l border-surface-800 space-y-1">
                {cashflowSubItems.map((sub) => {
                  const isCashflow = pathname === "/admin/cashflow-reports";
                  return (
                    <Link
                      key={sub.tab}
                      href={`/admin/cashflow-reports?tab=${sub.tab}`}
                      className={cn(
                        "block px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                        isCashflow
                          ? "text-surface-300 hover:text-white hover:bg-surface-800/60"
                          : "text-surface-400 hover:text-white hover:bg-surface-800/60"
                      )}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Platform Settings */}
          <div className="pt-4">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-surface-500 mb-2">
              System
            </p>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                pathname === "/admin/settings"
                  ? "bg-brand-600 text-white font-semibold shadow-sm"
                  : "text-surface-300 hover:bg-surface-800/80 hover:text-white"
              )}
            >
              <Settings className="h-4 w-4 text-surface-400 group-hover:text-white" />
              <span>Platform Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Version Tag */}
      <div className="p-4 border-t border-surface-800 flex items-center justify-between text-[11px] text-surface-400">
        <span>CapFlow v2.4 (Enterprise)</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>
    </aside>
  );
}
