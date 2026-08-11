"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  PlusSquare,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
} from "lucide-react";

interface DealRow {
  id: string;
  dealNumber: string;
  businessName: string;
  amount: string;
  submitted: string;
  status: "Submitted" | "Validation" | "Approved" | "Underwriting" | "Funded" | "Declined" | "Action Required";
  href: string;
}

const allDeals: DealRow[] = [
  {
    id: "deal-1",
    dealNumber: "DL-2402",
    businessName: "Meridian Construction LLC",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Submitted",
    href: "/partner/deals/deal-1",
  },
  {
    id: "deal-2",
    dealNumber: "DL-2403",
    businessName: "BluePeak Tech Solutions",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Validation",
    href: "/partner/deals/deal-2",
  },
  {
    id: "deal-3",
    dealNumber: "DL-2404",
    businessName: "Harbor Ridge Properties",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Submitted",
    href: "/partner/deals/deal-3",
  },
  {
    id: "deal-4",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Approved",
    href: "/partner/deals/deal-4",
  },
  {
    id: "deal-5",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Submitted",
    href: "/partner/deals/deal-5",
  },
  {
    id: "deal-6",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Approved",
    href: "/partner/deals/deal-6",
  },
  {
    id: "deal-7",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Approved",
    href: "/partner/deals/deal-7",
  },
  {
    id: "deal-8",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Approved",
    href: "/partner/deals/deal-8",
  },
  {
    id: "deal-9",
    dealNumber: "DL-2401",
    businessName: "Solaris Energy Corp",
    amount: "$250K",
    submitted: "Jan 18, 2024",
    status: "Approved",
    href: "/partner/deals/deal-9",
  },
];

export default function PartnerDealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

  const filterOptions = [
    "All",
    "Submitted",
    "Validation",
    "Underwriting",
    "Approved",
    "Funded",
    "Declined",
    "Action Required",
  ];

  const filteredDeals = allDeals.filter((deal) => {
    const matchesSearch =
      deal.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.dealNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || deal.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full space-y-6 pb-12 select-none">
      {/* 1. Header Row (Node 35:7927) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Inter'] font-bold text-[36px] text-black leading-[1.3] tracking-tight">
            My Deals
          </h1>
        </div>

        {/* Submit New Deal Button (Node 35:7920) */}
        <Link href="/partner/submit-deal">
          <button className="bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.98] transition-all text-black font-['Inter'] font-bold text-[16px] tracking-[0.5px] px-[20px] py-[12px] rounded-[8px] flex items-center gap-[8px] shadow-xs cursor-pointer">
            <PlusSquare className="size-5 text-black stroke-[2.2]" />
            <span>Submit New Deal</span>
          </button>
        </Link>
      </div>

      {/* 2. Search & Filter Bar (Node 35:8047 & 35:8051) */}
      <div className="flex items-center justify-between gap-4 relative">
        {/* Search Input (Node 35:8052) */}
        <div className="flex-1 bg-white border border-[#e8dcc8] rounded-[40px] h-[52px] px-[18px] flex items-center gap-3 shadow-2xs">
          <Search className="size-5 text-[#897766] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deal"
            className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black placeholder:text-[#897766] focus:outline-none"
          />
        </div>

        {/* Filter Pill Button (Node 35:8055) */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[rgba(216,203,184,0.5)] hover:bg-[rgba(216,203,184,0.7)] transition-colors h-[52px] px-[20px] rounded-[40px] flex items-center gap-2 text-[#897766] font-['Inter'] font-normal text-[14px] cursor-pointer"
          >
            <SlidersHorizontal className="size-5 text-[#897766]" />
            <span>{selectedFilter === "All" ? "Filter" : selectedFilter}</span>
          </button>

          {/* Filter Dropdown Popover */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-[16px] border border-[#e8dcc8] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-[#897766]">
                Filter by Status
              </div>
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    setIsFilterOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left text-[13px] font-medium flex items-center justify-between hover:bg-[#fff9e6] transition-colors text-black cursor-pointer"
                >
                  <span>{option}</span>
                  {selectedFilter === option && (
                    <Check className="size-4 text-[#c59609]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Deals Table Card (Node 35:7928 & 35:7936) */}
      <div className="bg-[#fff5d9] border border-[rgba(255,191,0,0.2)] rounded-[8px] p-[17px] shadow-xs">
        <div className="w-full overflow-x-auto rounded-[10px] overflow-hidden bg-white shadow-xs">
          <table className="w-full border-separate border-spacing-0 text-left min-w-[850px]">
            {/* Table Header (Node 35:7938 - 35:8009) */}
            <thead>
              <tr className="bg-[#1b2a4a] h-[59px] text-white font-['DM_Sans'] font-semibold text-[16px]">
                <th className="px-[24px] py-[16px] rounded-tl-[10px] text-left w-[16%]">
                  Deal ID
                </th>
                <th className="px-[24px] py-[16px] text-center w-[25%]">
                  Business Name
                </th>
                <th className="px-[24px] py-[16px] text-center w-[17%]">
                  Amount
                </th>
                <th className="px-[24px] py-[16px] text-center w-[18%]">
                  Submitted
                </th>
                <th className="px-[24px] py-[16px] text-center w-[14%]">
                  Status
                </th>
                <th className="px-[24px] py-[16px] text-center rounded-tr-[10px] w-[10%]">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body Rows (Node 35:7940 - 35:8158) */}
            <tbody className="bg-white">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-[#929292] font-['DM_Sans'] text-[15px] rounded-b-[10px]"
                  >
                    No deals found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal, idx) => {
                  const isLastRow = idx === filteredDeals.length - 1;

                  return (
                    <tr
                      key={idx}
                      className="h-[72px] hover:bg-[#fffdf7] transition-colors"
                    >
                      {/* Deal ID */}
                      <td
                        className={`px-[24px] py-[16px] border-b border-l border-[rgba(89,67,0,0.12)] font-['Inter'] font-normal text-[16px] text-[#e6a400] whitespace-nowrap ${
                          isLastRow ? "rounded-bl-[10px]" : ""
                        }`}
                      >
                        <Link href={deal.href}>{deal.dealNumber}</Link>
                      </td>

                      {/* Business Name */}
                      <td className="px-[24px] py-[16px] border-b border-l border-[rgba(89,67,0,0.12)] text-center font-['DM_Sans'] font-semibold text-[14px] text-black whitespace-nowrap">
                        {deal.businessName}
                      </td>

                      {/* Amount */}
                      <td className="px-[24px] py-[16px] border-b border-l border-[rgba(89,67,0,0.12)] text-center font-['DM_Sans'] font-semibold text-[16px] text-black whitespace-nowrap">
                        {deal.amount}
                      </td>

                      {/* Submitted Date */}
                      <td className="px-[24px] py-[16px] border-b border-l border-[rgba(89,67,0,0.12)] text-center font-['DM_Sans'] font-normal text-[14px] text-[#929292] whitespace-nowrap">
                        {deal.submitted}
                      </td>

                      {/* Status Badge */}
                      <td className="px-[24px] py-[16px] border-b border-l border-[rgba(89,67,0,0.12)] text-center whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {deal.status === "Approved" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(91,229,109,0.2)] border border-[rgba(91,229,109,0.24)] text-[#3fc951] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Approved
                            </span>
                          )}
                          {deal.status === "Validation" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(255,191,0,0.2)] border border-[rgba(255,191,0,0.24)] text-[#ffbf00] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Validation
                            </span>
                          )}
                          {deal.status === "Submitted" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(26,78,224,0.2)] border border-[rgba(26,78,224,0.16)] text-[#3160e3] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Submitted
                            </span>
                          )}
                          {deal.status === "Underwriting" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(130,0,219,0.12)] border border-[rgba(233,212,255,0.41)] text-[#ad5be5] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Underwriting
                            </span>
                          )}
                          {deal.status === "Funded" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(91,229,109,0.2)] border border-[rgba(91,229,109,0.24)] text-[#3fc951] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Funded
                            </span>
                          )}
                          {deal.status === "Action Required" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.25)] text-[#ef4444] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Action Required
                            </span>
                          )}
                          {deal.status === "Declined" && (
                            <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-neutral-200 border border-neutral-300 text-neutral-600 font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                              Declined
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Button (Eye Icon) */}
                      <td
                        className={`px-[24px] py-[16px] border-b border-l border-r border-[rgba(89,67,0,0.12)] text-center ${
                          isLastRow ? "rounded-br-[10px]" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <Link href={deal.href}>
                            <button
                              type="button"
                              className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                              title="View Deal Details"
                            >
                              <Eye className="size-[20px]" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Pagination Bar (Node 35:8165) */}
      <div className="flex items-center justify-end gap-1 pt-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="h-[36px] pl-2.5 pr-4 py-2 rounded-[6px] flex items-center gap-2 text-[14px] font-['Geist'] font-medium text-[#09090b] hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-4" />
          <span>Previous</span>
        </button>

        {/* Page 1 */}
        <button
          onClick={() => setCurrentPage(1)}
          className={`size-[40px] rounded-[6px] flex items-center justify-center text-[14px] font-['Geist'] font-medium cursor-pointer transition-colors ${
            currentPage === 1
              ? "bg-[#fbf1e1] border border-[#624d3b] text-[#09090b]"
              : "text-[#09090b] hover:bg-neutral-100"
          }`}
        >
          1
        </button>

        {/* Page 2 (Active in Figma) */}
        <button
          onClick={() => setCurrentPage(2)}
          className={`size-[40px] rounded-[6px] flex items-center justify-center text-[14px] font-['Geist'] font-medium cursor-pointer transition-colors ${
            currentPage === 2
              ? "bg-[#fbf1e1] border border-[#624d3b] text-[#09090b]"
              : "text-[#09090b] hover:bg-neutral-100"
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          onClick={() => setCurrentPage(3)}
          className={`size-[40px] rounded-[6px] flex items-center justify-center text-[14px] font-['Geist'] font-medium cursor-pointer transition-colors ${
            currentPage === 3
              ? "bg-[#fbf1e1] border border-[#624d3b] text-[#09090b]"
              : "text-[#09090b] hover:bg-neutral-100"
          }`}
        >
          3
        </button>

        {/* Ellipsis */}
        <span className="size-[36px] flex items-center justify-center text-[14px] font-['Geist'] font-medium text-[#09090b]">
          ...
        </span>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
          className="h-[36px] pl-4 pr-2.5 py-2 rounded-[6px] flex items-center gap-2 text-[14px] font-['Geist'] font-medium text-[#09090b] hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
