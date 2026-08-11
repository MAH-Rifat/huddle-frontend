"use client";

import React from "react";
import Link from "next/link";
import { Globe, PhoneCall, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface PublicHeaderProps {
  partnerName?: string;
  partnerLogoAbbr?: string;
  partnerColor?: string;
}

export function PublicHeader({
  partnerName,
  partnerLogoAbbr,
  partnerColor,
}: PublicHeaderProps) {
  const { activePartner } = useApp();

  const name = partnerName || activePartner.name;
  const logo = partnerLogoAbbr || activePartner.logoAbbr;
  const color = partnerColor || activePartner.brandColor || "#1d4ed8";

  return (
    <header className="w-full bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 py-4 px-6 md:px-12 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Co-Branded Logo */}
        <Link href="/apply" className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md"
            style={{ backgroundColor: color }}
          >
            {logo}
          </div>
          <div>
            <span className="font-bold text-base text-surface-900 dark:text-surface-50 tracking-tight">
              {name}
            </span>
            <p className="text-[11px] text-surface-500 flex items-center gap-1">
              <Shield className="h-3 w-3 text-emerald-600" /> Secure Business Lending Portal
            </p>
          </div>
        </Link>

        {/* Right Help & Language Tools */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[11px] text-surface-400">Need Assistance?</span>
            <a
              href="tel:8556786759"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <PhoneCall className="h-3.5 w-3.5" /> (855) 678-6759
            </a>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700 text-xs font-medium text-surface-700 dark:text-surface-300">
            <Globe className="h-3.5 w-3.5 text-surface-400" />
            <span>English</span>
          </div>
        </div>
      </div>
    </header>
  );
}
