"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Upload } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

interface ActionRequiredCardProps {
  dealCount: number;
  featuredDealTitle: string;
  featuredDealDesc: string;
  actionHref: string;
}

export function ActionRequiredCard({
  dealCount,
  featuredDealTitle,
  featuredDealDesc,
  actionHref,
}: ActionRequiredCardProps) {
  if (dealCount === 0) return null;

  return (
    <div className="p-4 md:p-5 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
              Missing Documents & Action Required ({dealCount} Deals)
            </h3>
            <Badge variant="warning" size="sm">
              Priority
            </Badge>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
            <strong>{featuredDealTitle}</strong> {featuredDealDesc}
          </p>
        </div>
      </div>

      <Link href={actionHref}>
        <Button variant="outline" size="sm" className="bg-white dark:bg-surface-900 border-amber-300 text-amber-900 font-bold hover:bg-amber-50">
          <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload Document
        </Button>
      </Link>
    </div>
  );
}
