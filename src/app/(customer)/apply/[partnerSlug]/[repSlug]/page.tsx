"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Loader2 } from "lucide-react";

export default function TrackableRepReferralPage() {
  const router = useRouter();
  const params = useParams();
  const partnerSlug = (params?.partnerSlug as string) || "abc-capital";
  const repSlug = (params?.repSlug as string) || "jennifer-moore";
  const { getPartnerBySlug, setActivePartner, updateLoanApplication } = useApp();

  useEffect(() => {
    const matchedPartner = getPartnerBySlug(partnerSlug);
    if (matchedPartner) {
      setActivePartner(matchedPartner);
    }
    updateLoanApplication({
      partnerSlug,
      repSlug,
      step: 1,
    });

    const timer = setTimeout(() => {
      router.push("/apply");
    }, 400);

    return () => clearTimeout(timer);
  }, [partnerSlug, repSlug, getPartnerBySlug, setActivePartner, updateLoanApplication, router]);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="h-12 w-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
        HB
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-bold text-surface-900 dark:text-surface-50">
          Loading Co-Branded Portal...
        </h2>
        <p className="text-xs text-surface-500">
          Attributing application to {repSlug} ({partnerSlug})
        </p>
      </div>
      <Loader2 className="h-6 w-6 text-brand-600 animate-spin" />
    </div>
  );
}
