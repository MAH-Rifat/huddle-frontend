"use client";

import React, { useState } from "react";
import { Search, Copy, Check, ExternalLink, Info, PlusSquare } from "lucide-react";
import { SalesRep } from "@/types";

interface SalesRepUrlsTabProps {
  salesReps: SalesRep[];
  partnerSlug?: string;
  onAddRepClick: () => void;
  onToggleStatus: (id: string) => void;
}

export function SalesRepUrlsTab({
  salesReps,
  partnerSlug = "abc-capital",
  onAddRepClick,
  onToggleStatus,
}: SalesRepUrlsTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [repSearchQuery, setRepSearchQuery] = useState("");

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredReps = salesReps.filter((rep) =>
    rep.name.toLowerCase().includes(repSearchQuery.toLowerCase()) ||
    rep.email.toLowerCase().includes(repSearchQuery.toLowerCase()) ||
    rep.trackableUrl.toLowerCase().includes(repSearchQuery.toLowerCase())
  );

  const totalDeals = salesReps.reduce((acc, rep) => acc + (rep.dealsSubmitted || 0), 0) || 1;
  const repsCount = salesReps.filter((r) => r.role === "Sales Rep").length;
  const adminsCount = salesReps.filter((r) => r.role === "Portal Admin").length;

  return (
    <div className="space-y-4 w-full">
      {/* 1. Header Bar with Title, Subtitle, and Add Sales Rep Button (Node 102:4106) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="font-['DM_Sans'] font-medium text-[14.6px] text-[#314158] leading-tight">
            Sales Representative Application URLs
          </h2>
          <p className="font-['DM_Sans'] text-[12.5px] text-[#62748e] mt-1 leading-normal">
            Each rep has a unique trackable URL — deals submitted through it are automatically attributed to them.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddRepClick}
          className="bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.98] h-[40px] px-[20px] py-[12px] rounded-[8px] font-['Inter'] font-bold text-[14px] text-black shadow-xs flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <PlusSquare className="size-4.5 text-black" />
          <span>Add Sales Rep</span>
        </button>
      </div>

      {/* 2. Blue Info Banner: How trackable URLs work (Node 102:4116) */}
      <div className="bg-[#eff6ff] border border-[#bedbff] rounded-[13.1px] p-[18px] flex items-start gap-3 shadow-xs">
        <div className="size-5 rounded-full bg-[#bedbff] text-[#193cb8] flex items-center justify-center shrink-0 mt-0.5">
          <Info className="size-3.5" />
        </div>

        <div className="space-y-1 text-[#193cb8] font-['DM_Sans'] text-[12.5px]">
          <p className="font-semibold text-[12.5px] leading-tight">
            How trackable URLs work
          </p>
          <div className="leading-[1.6]">
            <span>Each sales representative gets a unique URL in the format: </span>
            <span className="inline-block bg-[#dbeafe] px-2 py-0.5 rounded-[4.2px] font-['JetBrains_Mono'] text-[12px] text-[#193cb8] my-0.5">
              https://apply.capflow.io/{partnerSlug}/<span className="text-[#1447e6]">[rep-slug]</span>
            </span>
            <p className="mt-1">
              When a client applies using that URL, the deal is automatically tagged with the partner organization and the individual sales rep, enabling full attribution tracking.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Table Card Container (Node 102:4132) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[13.1px] overflow-hidden shadow-[0px_1.19px_1.79px_rgba(0,0,0,0.1),0px_1.19px_1.19px_rgba(0,0,0,0.1)]">
        {/* Card Header: Search reps input + Rep/Admin counts (Node 102:4133) */}
        <div className="border-b border-[#f1f5f9] px-5 py-3 flex items-center justify-between gap-4">
          <div className="relative w-[333px] max-w-full">
            <div className="absolute left-3 top-2 size-3.5 text-[#90a1b9] flex items-center justify-center">
              <Search className="size-3.5 text-[#90a1b9]" />
            </div>
            <input
              type="text"
              placeholder="Search reps…"
              value={repSearchQuery}
              onChange={(e) => setRepSearchQuery(e.target.value)}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[8.3px] pl-8 pr-3 py-1.5 text-[12.5px] font-['DM_Sans'] text-[#314158] placeholder-[rgba(15,23,42,0.5)] focus:outline-none focus:ring-1 focus:ring-[#ffbf00]"
            />
          </div>

          <p className="font-['DM_Sans'] text-[12.5px] text-[#62748e] shrink-0">
            {repsCount} reps · {adminsCount} admins
          </p>
        </div>

        {/* Table Rows (Node 102:4143) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[960px] border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#f1f5f9] h-[43px]">
                <th className="px-5 py-2 font-['DM_Sans'] font-semibold text-[13.1px] text-[#62748e] uppercase tracking-[0.33px]">
                  Representative
                </th>
                <th className="px-5 py-2 font-['DM_Sans'] font-semibold text-[13.1px] text-[#62748e] uppercase tracking-[0.33px]">
                  Unique Application URL
                </th>
                <th className="px-5 py-2 font-['DM_Sans'] font-semibold text-[13.1px] text-[#62748e] uppercase tracking-[0.33px]">
                  Deals Submitted
                </th>
                <th className="px-5 py-2 font-['DM_Sans'] font-semibold text-[13.1px] text-[#62748e] uppercase tracking-[0.33px]">
                  Status
                </th>
                <th className="px-5 py-2 font-['DM_Sans'] font-semibold text-[13.1px] text-[#62748e] uppercase tracking-[0.33px] text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f8fafc]">
              {filteredReps.map((rep) => {
                const repPercent = Math.round(((rep.dealsSubmitted || 0) / totalDeals) * 100);
                const isInactive = !rep.isActive;

                return (
                  <tr
                    key={rep.id}
                    className={`hover:bg-[#fcfdfd] transition-colors h-[60px] ${
                      isInactive ? "opacity-50" : ""
                    }`}
                  >
                    {/* Representative Info + Role Badge underneath (Node 102:4151) */}
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="size-[29.3px] rounded-full bg-[#1d4ed8] text-white font-bold flex items-center justify-center text-[12px] shrink-0 font-['DM_Sans'] shadow-xs">
                          {rep.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="font-['DM_Sans'] font-semibold text-[12.5px] text-[#1d293d] leading-tight">
                            {rep.name}
                          </p>
                          <div className="mt-0.5">
                            {rep.role === "Portal Admin" ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[4.2px] bg-[#eff6ff] text-[#155dfc] font-['DM_Sans'] font-medium text-[11.9px] leading-tight">
                                Portal Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[4.2px] bg-[#faf5ff] text-[#9810fa] font-['DM_Sans'] font-medium text-[11.9px] leading-tight">
                                Sales Rep
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Unique Application URL + Copy button (Node 102:4159) */}
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2 max-w-[420px]">
                        <div className="bg-[#f8fafc] border border-[#e2e8f0] px-2.5 py-1.5 rounded-[4.2px] text-[13.1px] font-['JetBrains_Mono'] text-[#314158] truncate flex-1 leading-tight">
                          {rep.trackableUrl}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyUrl(rep.trackableUrl, rep.id)}
                          className="p-1.5 rounded-[4.2px] hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer shrink-0"
                          title="Copy Link"
                        >
                          {copiedId === rep.id ? (
                            <Check className="size-3.5 text-[#00c950]" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Deals Submitted: number + blue bar (Node 102:4167) */}
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5 w-[140px]">
                        <span className="font-['JetBrains_Mono'] font-bold text-[12.5px] text-[#1d293d] w-5">
                          {rep.dealsSubmitted}
                        </span>
                        <div className="w-[66.7px] bg-[#f1f5f9] h-[6.3px] rounded-full overflow-hidden shrink-0">
                          <div
                            className="bg-[#1d4ed8] h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, Math.max(8, repPercent * 1.5))}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Badge (Node 102:4172) */}
                    <td className="px-5 py-2.5">
                      {rep.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-[4.2px] bg-[#ecfdf5] border border-[#a4f4cf] text-[#007a55] font-['JetBrains_Mono'] font-medium text-[13.1px] tracking-[0.33px]">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-[4.2px] bg-[#f8fafc] border border-[#e2e8f0] text-[#45556c] font-['JetBrains_Mono'] font-medium text-[13.1px] tracking-[0.33px]">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions (Node 102:4174) */}
                    <td className="px-5 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => window.open(rep.trackableUrl, "_blank")}
                          className="p-1.5 rounded-[4.2px] hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                          title="Open Link"
                        >
                          <ExternalLink className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleStatus(rep.id)}
                          className={`px-2.5 py-1 rounded-[4.2px] border border-solid font-['DM_Sans'] font-medium text-[13.1px] cursor-pointer transition-colors ${
                            rep.isActive
                              ? "border-[#ffc9c9] text-[#e7000b] hover:bg-red-50"
                              : "border-[#a4f4cf] text-[#009966] hover:bg-emerald-50"
                          }`}
                        >
                          {rep.isActive ? "Disable URL" : "Enable URL"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Attribution by Sales Rep Summary Card (Node 102:4271) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[13.1px] p-[22px] shadow-[0px_1.19px_1.79px_rgba(0,0,0,0.1),0px_1.19px_1.19px_rgba(0,0,0,0.1)] space-y-4">
        <h3 className="font-['Outfit'] font-semibold text-[14.6px] text-[#314158] tracking-tight">
          Attribution by Sales Rep
        </h3>

        <div className="space-y-3 pt-1">
          {salesReps.map((rep) => {
            const repPercent = Math.round(((rep.dealsSubmitted || 0) / totalDeals) * 100);

            return (
              <div key={rep.id} className="flex items-center gap-4">
                <div className="size-[29.3px] rounded-full bg-[#1d4ed8] text-white font-bold flex items-center justify-center text-[12px] shrink-0 font-['DM_Sans'] shadow-xs">
                  {rep.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <p className="font-['DM_Sans'] text-[12.5px] text-[#45556c] w-[116px] shrink-0 truncate">
                  {rep.name}
                </p>

                {/* Yellow/Gold progress bar matching Figma Node 102:4280 */}
                <div className="flex-1 bg-[#f1f5f9] h-[8.34px] rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffbf00] opacity-80 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, repPercent)}%` }}
                  />
                </div>

                <span className="font-['JetBrains_Mono'] font-bold text-[12.5px] text-[#314158] w-[33px] text-right">
                  {rep.dealsSubmitted}
                </span>

                <span className="font-['DM_Sans'] text-[11.9px] text-[#90a1b9] w-[33px] text-right">
                  {repPercent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
