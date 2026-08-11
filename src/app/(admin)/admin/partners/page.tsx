"use client";

import React from "react";
import Link from "next/link";
import {
  PlusCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";

export default function AdminPartnersDirectoryPage() {
  const { partners } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
            Multi-Tenant Partner Organizations
          </h2>
          <p className="text-xs text-surface-500">
            Manage white-labeled brokerages, origination volumes, and custom branding
          </p>
        </div>

        <Link href="/admin/partners/new">
          <Button variant="primary" leftIcon={<PlusCircle className="h-4 w-4" />}>
            Create New Partner
          </Button>
        </Link>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:border-indigo-300 transition-all">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md"
                  style={{ backgroundColor: partner.brandColor || "#1d4ed8" }}
                >
                  {partner.logoAbbr || "HB"}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-surface-900 dark:text-surface-50">
                    {partner.name}
                  </h3>
                  <p className="text-[11px] text-surface-400 font-mono">
                    /{partner.slug}
                  </p>
                </div>
              </div>
              <Badge variant={partner.status === "Active" ? "success" : "neutral"} size="sm">
                {partner.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-surface-50 dark:bg-surface-800/40 text-center">
                <div>
                  <span className="text-[10px] text-surface-400 font-semibold">Total Deals</span>
                  <p className="text-base font-bold text-surface-900 dark:text-surface-100">{partner.totalDeals}</p>
                </div>
                <div>
                  <span className="text-[10px] text-surface-400 font-semibold">In Work</span>
                  <p className="text-base font-bold text-blue-600">{partner.inWorkDeals}</p>
                </div>
                <div>
                  <span className="text-[10px] text-surface-400 font-semibold">Funded Vol.</span>
                  <p className="text-base font-bold text-emerald-600">{formatCurrency(partner.totalFundedVolume)}</p>
                </div>
              </div>

              <div className="space-y-2 text-surface-600 dark:text-surface-300">
                <div className="flex justify-between">
                  <span className="text-surface-400">Primary Contact:</span>
                  <span className="font-semibold">{partner.primaryContactName} ({partner.primaryContactEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-400">Application Portal:</span>
                  <a
                    href={`/apply/${partner.slug}/jennifer-moore`}
                    target="_blank"
                    className="font-mono text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    apply.capflow.io/{partner.slug} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
                <span className="text-[11px] text-surface-400">
                  {partner.salesRepsCount || 2} Sales Reps Configured
                </span>
                <Link href={`/admin/partners/${partner.id}`}>
                  <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
                    Manage Partner
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
