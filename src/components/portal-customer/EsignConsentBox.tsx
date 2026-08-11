"use client";

import React from "react";
import { FileCheck2 } from "lucide-react";

interface EsignConsentBoxProps {
  legalName: string;
  onLegalNameChange: (val: string) => void;
  consentAgreed: boolean;
  onConsentChange: (agreed: boolean) => void;
}

export function EsignConsentBox({
  legalName,
  onLegalNameChange,
  consentAgreed,
  onConsentChange,
}: EsignConsentBoxProps) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800/40 border border-surface-200 dark:border-surface-700 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-surface-900 dark:text-surface-100">
          <FileCheck2 className="h-4 w-4 text-brand-600" />
          <span>Certification and Authorization to Obtain Credit Reports</span>
        </div>
        <div className="text-[11px] text-surface-600 dark:text-surface-400 space-y-2 max-h-36 overflow-y-auto pr-2 leading-relaxed">
          <p>
            By signing below, each undersigned individual certifying on behalf of the
            applicant business entity certifies that all information provided in this
            application is true, accurate, and complete in all respects.
          </p>
          <p>
            The undersigned hereby authorizes CapFlow, participating financial partners, and
            institutional lenders to obtain consumer and business credit reports and verify
            bank records in connection with this credit request.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
          Type Full Legal Name as Digital Consent*
        </label>
        <input
          type="text"
          required
          value={legalName}
          onChange={(e) => onLegalNameChange(e.target.value)}
          placeholder="Marcus Johnson"
          className="w-full px-4 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-semibold text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            required
            checked={consentAgreed}
            onChange={(e) => onConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-xs text-surface-600 dark:text-surface-400 leading-normal">
            I understand that typing my legal name above and drawing my signature constitutes a
            binding electronic signature under the Electronic Signatures in Global and
            National Commerce Act (E-SIGN).
          </span>
        </label>
      </div>
    </div>
  );
}
