"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Tabs } from "@/components/common/Tabs";
import { useApp } from "@/context/AppContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import { mockActivityEvents, mockSalesReps } from "@/mock/data";

export default function AdminPartnerDetailPage() {
  const params = useParams();
  const partnerId = (params?.id as string) || "partner-1";
  const { partners, deals } = useApp();

  const partner = partners.find((p) => p.id === partnerId || p.slug === partnerId) || partners[0];
  const [activeTab, setActiveTab] = useState("users");
  const [copied, setCopied] = useState(false);

  const partnerDeals = deals.filter((d) => d.partnerId === partner.id || d.partnerName === partner.name);

  const tabs = [
    { id: "users", label: "Users & Access" },
    { id: "reps", label: "Sales Representatives", count: mockSalesReps.length },
    { id: "deals", label: "Originated Deals", count: partnerDeals.length },
    { id: "config", label: "Portal Configuration" },
    { id: "activity", label: "Activity Audit Log", count: mockActivityEvents.length },
  ];

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/partners">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
                {partner.name}
              </h2>
              <Badge variant={partner.status === "Active" ? "success" : "neutral"} dot>
                {partner.status}
              </Badge>
            </div>
            <p className="text-xs text-surface-400">
              Slug: <span className="font-mono text-indigo-600">/{partner.slug}</span> · Created on {formatDate(partner.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href={`/apply/${partner.slug}/jennifer-moore`} target="_blank">
            <Button variant="outline" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
              Open Public Portal
            </Button>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Users & Access */}
      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle>Organization Members & Permissions</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-6">Member</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
                {mockSalesReps.map((rep) => (
                  <tr key={rep.id} className="hover:bg-surface-50/60 dark:hover:bg-surface-800/30">
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-surface-900 dark:text-surface-100">{rep.name}</p>
                      <p className="text-[11px] text-surface-400">{rep.email}</p>
                    </td>
                    <td className="py-3.5 px-6">
                      <Badge variant={rep.role === "Portal Admin" ? "purple" : "blue"}>
                        {rep.role}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-surface-500">{rep.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: Sales Reps */}
      {activeTab === "reps" && (
        <div className="space-y-4">
          {mockSalesReps.map((rep) => (
            <Card key={rep.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                  {rep.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-surface-900 dark:text-surface-100 text-sm">{rep.name}</span>
                    <Badge variant="blue" size="sm">{rep.role}</Badge>
                  </div>
                  <p className="font-mono text-[11px] text-indigo-600 mt-0.5">
                    apply.capflow.io/{partner.slug}/{rep.customSlug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-surface-900 dark:text-surface-100">{rep.dealsSubmitted} Deals</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">{rep.attributionPercent}% Attribution</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyUrl(rep.trackableUrl)}
                  leftIcon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Deals Originated */}
      {activeTab === "deals" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-6">Deal ID</th>
                  <th className="py-3 px-6">Business</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
                {partnerDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="py-3.5 px-6 font-bold text-indigo-600">
                      <Link href={`/admin/deals/${deal.id}`}>{deal.dealNumber}</Link>
                    </td>
                    <td className="py-3.5 px-6 font-semibold">{deal.businessName}</td>
                    <td className="py-3.5 px-6 font-bold">{formatCurrency(deal.requestedAmount)}</td>
                    <td className="py-3.5 px-6">
                      <Badge stage={deal.stage} dot />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 4: Portal Configuration */}
      {activeTab === "config" && (
        <Card>
          <CardHeader>
            <CardTitle>Co-Branding & URL Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-surface-400 font-semibold">Primary Brand Color:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-7 w-7 rounded-lg shadow-xs"
                    style={{ backgroundColor: partner.brandColor }}
                  />
                  <span className="font-mono font-bold text-surface-900 dark:text-surface-100">{partner.brandColor}</span>
                </div>
              </div>
              <div>
                <span className="text-surface-400 font-semibold">Logo Abbreviation:</span>
                <p className="font-bold text-surface-900 dark:text-surface-100 mt-1">{partner.logoAbbr}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-surface-400 font-semibold">Portal Welcome Title:</span>
                <p className="font-semibold text-surface-900 dark:text-surface-100 mt-1">{partner.welcomeTitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 5: Activity Audit Log */}
      {activeTab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle>System & Underwriting Audit Events</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-4 text-xs">
            {mockActivityEvents.map((evt) => (
              <div key={evt.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-800/40 border border-surface-100 dark:border-surface-800">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <div>
                    <span className="font-bold text-surface-900 dark:text-surface-100">{evt.user}</span> ·{" "}
                    <span className="text-surface-600 dark:text-surface-300">{evt.action} on {evt.targetId}</span>
                  </div>
                </div>
                <span className="text-surface-400 font-medium">{evt.timestamp}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
