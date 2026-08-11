"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
          Platform System Settings
        </h2>
        <p className="text-xs text-surface-500">
          Configure multi-tenant security, underwriting AI models, and OCR ingestion parameters
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Underwriting & OCR Engine Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  OCR Extraction Confidence Threshold (%)
                </label>
                <input
                  type="number"
                  defaultValue={90}
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Minimum DSCR Ratio for Instant Pre-Approval
                </label>
                <input
                  type="number"
                  step="0.05"
                  defaultValue={1.25}
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              {[
                "Automatically dispatch loan applications with OCR confidence > 95% to fast-track underwriting",
                "Require manual credit analyst sign-off on any deal exceeding $250,000",
                "Enable automated Plaid Open Banking real-time bank statement syncing",
              ].map((setting, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-surface-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-surface-700 dark:text-surface-300">{setting}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" leftIcon={<Save className="h-4 w-4" />}>
            {isSaved ? "Settings Saved!" : "Save Platform Configuration"}
          </Button>
        </div>
      </form>
    </div>
  );
}
