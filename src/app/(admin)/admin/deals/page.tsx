"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/lib/utils";

export default function AdminDealsMasterQueuePage() {
  const { deals } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("All");

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.dealNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPartner =
      selectedPartner === "All" || deal.partnerName === selectedPartner;
    return matchesSearch && matchesPartner;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
            Master Deals Queue
          </h2>
          <p className="text-xs text-surface-500">
            Full platform origination portfolio and underwriting queue
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
            className="px-3.5 py-2 text-xs bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl font-semibold"
          >
            <option value="All">All Partners (Multi-Tenant)</option>
            <option value="ABC Capital Bank">ABC Capital Bank</option>
            <option value="Harvest Business Capital">Harvest Business Capital</option>
            <option value="Metro Finance">Metro Finance</option>
            <option value="Summit Financial">Summit Financial</option>
          </select>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search deals, borrowers, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 dark:bg-surface-800/60 border-b border-surface-200 dark:border-surface-800 text-surface-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Deal ID</th>
                <th className="py-3.5 px-6">Business / Client</th>
                <th className="py-3.5 px-6">Partner Org</th>
                <th className="py-3.5 px-6">Requested Amount</th>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">Stage</th>
                <th className="py-3.5 px-6">Underwriter</th>
                <th className="py-3.5 px-6 text-right">Workbench</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800 font-medium">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-surface-50/80 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-indigo-600">
                    <Link href={`/admin/deals/${deal.id}`}>{deal.dealNumber}</Link>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-surface-900 dark:text-surface-100">{deal.businessName}</p>
                    <p className="text-[11px] text-surface-400">{deal.clientName}</p>
                  </td>
                  <td className="py-4 px-6 font-semibold text-surface-700 dark:text-surface-300">
                    {deal.partnerName}
                  </td>
                  <td className="py-4 px-6 font-bold text-surface-900 dark:text-surface-100">
                    {formatCurrency(deal.requestedAmount)}
                  </td>
                  <td className="py-4 px-6 text-surface-600 dark:text-surface-300">{deal.productType}</td>
                  <td className="py-4 px-6">
                    <Badge stage={deal.stage} dot />
                  </td>
                  <td className="py-4 px-6 text-surface-600 dark:text-surface-300">
                    {deal.assignedUnderwriter || "Unassigned"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/admin/deals/${deal.id}`}>
                      <Button variant="outline" size="sm">
                        Inspect & Underwrite
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
