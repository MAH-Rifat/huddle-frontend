"use client";

import React from "react";
import { Shield } from "lucide-react";

interface PartnerBrandEditorProps {
  name: string;
  brandColor: string;
  logoAbbr: string;
  welcomeTitle: string;
  onNameChange: (val: string) => void;
  onColorChange: (val: string) => void;
  onLogoChange: (val: string) => void;
  onTitleChange: (val: string) => void;
}

export function PartnerBrandEditor({
  name,
  brandColor,
  logoAbbr,
  welcomeTitle,
  onNameChange,
  onColorChange,
  onLogoChange,
  onTitleChange,
}: PartnerBrandEditorProps) {
  return (
    <div className="space-y-6 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-surface-700 dark:text-surface-300">
            Logo Abbreviation (2–4 chars)*
          </label>
          <input
            type="text"
            maxLength={4}
            value={logoAbbr}
            onChange={(e) => onLogoChange(e.target.value.toUpperCase())}
            placeholder="HBC"
            className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-bold text-center text-sm"
          />
        </div>

        <div>
          <label className="block font-bold text-surface-700 dark:text-surface-300">
            Brand Hex Color Theme*
          </label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-10 w-12 rounded-lg cursor-pointer border border-surface-200"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-mono"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-bold text-surface-700 dark:text-surface-300">
            Portal Welcome Page Title
          </label>
          <input
            type="text"
            value={welcomeTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
          />
        </div>
      </div>

      {/* Live Co-Branding Header Preview */}
      <div className="pt-4 border-t border-surface-100 dark:border-surface-800 space-y-2">
        <span className="text-xs font-bold text-surface-700 dark:text-surface-300 uppercase tracking-wider">
          Live Co-Branding Header Preview
        </span>
        <div className="p-4 rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-sm"
              style={{ backgroundColor: brandColor }}
            >
              {logoAbbr || "HB"}
            </div>
            <div>
              <p className="font-bold text-sm text-surface-900 dark:text-surface-50">
                {name || "Partner Name"}
              </p>
              <p className="text-[11px] text-surface-400 flex items-center gap-1">
                <Shield className="h-3 w-3 text-emerald-500" /> Secure Business Lending Portal
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-brand-600 hidden sm:block">
            (855) 678-6759
          </span>
        </div>
      </div>
    </div>
  );
}
