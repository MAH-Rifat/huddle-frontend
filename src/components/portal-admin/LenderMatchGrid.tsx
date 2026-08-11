"use client";

import React from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

interface LenderMatch {
  lender: string;
  program: string;
  rate: string;
  maxAmount: string;
  fitScore: string;
  recommended: boolean;
}

interface LenderMatchGridProps {
  matches: LenderMatch[];
  onAllocate?: (lender: string) => void;
}

export function LenderMatchGrid({ matches, onAllocate }: LenderMatchGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match, idx) => (
        <Card key={idx} className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-sm text-surface-900 dark:text-surface-50">{match.lender}</h3>
              <p className="text-xs text-surface-500 mt-0.5">{match.program}</p>
            </div>
            <Badge variant={match.recommended ? "success" : "blue"}>{match.fitScore}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-surface-100 dark:border-surface-800">
            <div>
              <span className="text-surface-400">Target Rate:</span>
              <p className="font-bold text-surface-900 dark:text-surface-100 mt-0.5">{match.rate}</p>
            </div>
            <div>
              <span className="text-surface-400">Max Facility:</span>
              <p className="font-bold text-emerald-600 mt-0.5">{match.maxAmount}</p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => onAllocate && onAllocate(match.lender)}
          >
            Allocate Package to {match.lender}
          </Button>
        </Card>
      ))}
    </div>
  );
}
