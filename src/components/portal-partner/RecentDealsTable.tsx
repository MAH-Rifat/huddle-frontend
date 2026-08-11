"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

export function RecentDealsTable() {
  const deals = [
    {
      id: "DL-2402",
      businessName: "Meridian Construction LLC",
      amount: "$250K",
      submitted: "Jan 18, 2024",
      status: "Approved",
      badgeType: "approved",
      href: "/partner/deals/deal-1",
    },
    {
      id: "DL-2403",
      businessName: "BluePeak Tech Solutions",
      amount: "$250K",
      submitted: "Jan 18, 2024",
      status: "Validation",
      badgeType: "validation",
      href: "/partner/deals/deal-2",
    },
    {
      id: "DL-2404",
      businessName: "Harbor Ridge Properties",
      amount: "$250K",
      submitted: "Jan 18, 2024",
      status: "Submitted",
      badgeType: "submitted",
      href: "/partner/deals/deal-3",
    },
    {
      id: "DL-2401",
      businessName: "Solaris Energy Corp",
      amount: "$250K",
      submitted: "Jan 18, 2024",
      status: "Approved",
      badgeType: "approved",
      href: "/partner/deals/deal-4",
    },
    {
      id: "DL-2401",
      businessName: "Solaris Energy Corp",
      amount: "$250K",
      submitted: "Jan 18, 2024",
      status: "Approved",
      badgeType: "approved",
      href: "/partner/deals/deal-5",
    },
  ];

  return (
    <div className="bg-[rgba(255,245,217,0.5)] border border-[rgba(255,191,0,0.12)] rounded-[8px] p-[17px] flex flex-col justify-between gap-[20px] w-full h-full overflow-hidden select-none">
      {/* Top Header Row (Node 34:784) */}
      <div className="flex items-center justify-between w-full">
        <h3 className="font-['Inter'] font-bold text-[20px] text-black leading-[1.3]">
          Recent Deals
        </h3>
        <Link
          href="/partner/deals"
          className="flex items-center gap-1 font-['DM_Sans'] font-medium text-[12.8px] text-[#ffbf00] hover:text-[#e6ac00] transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="size-3 text-[#ffbf00]" />
        </Link>
      </div>

      {/* Table Container (Node 34:791) */}
      <div className="w-full overflow-x-auto rounded-[10px] shadow-xs flex-1 flex flex-col overflow-hidden bg-white">
        <table className="w-full border-separate border-spacing-0 text-left min-w-[700px] flex-1">
          {/* Table Header Row (Node 34:793) */}
          <thead>
            <tr className="bg-[#1b2a4a] h-[59px] text-white font-['DM_Sans'] font-semibold text-[16px]">
              <th className="px-[24px] py-[16px] rounded-tl-[10px] font-semibold text-left w-[16%]">
                Deal ID
              </th>
              <th className="px-[24px] py-[16px] text-center font-semibold w-[24%]">
                Business Name
              </th>
              <th className="px-[24px] py-[16px] text-center font-semibold w-[16%]">
                Amount
              </th>
              <th className="px-[24px] py-[16px] text-center font-semibold w-[18%]">
                Submitted
              </th>
              <th className="px-[24px] py-[16px] text-center font-semibold w-[16%]">
                Status
              </th>
              <th className="px-[24px] py-[16px] text-center font-semibold rounded-tr-[10px] w-[10%]">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body Rows (Node 34:795 - 34:875) */}
          <tbody className="bg-white">
            {deals.map((deal, idx) => {
              const isLastRow = idx === deals.length - 1;

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
                    <Link href={deal.href}>{deal.id}</Link>
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
                      {deal.badgeType === "approved" && (
                        <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(91,229,109,0.2)] border border-[rgba(91,229,109,0.24)] text-[#3fc951] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                          Approved
                        </span>
                      )}
                      {deal.badgeType === "validation" && (
                        <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(255,191,0,0.2)] border border-[rgba(255,191,0,0.24)] text-[#ffbf00] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                          Validation
                        </span>
                      )}
                      {deal.badgeType === "submitted" && (
                        <span className="inline-flex items-center justify-center h-[24px] px-[9px] py-[3px] rounded-[3.5px] bg-[rgba(26,78,224,0.2)] border border-[rgba(26,78,224,0.16)] text-[#3160e3] font-['Gilmer:Bold',sans-serif] font-bold text-[10px] leading-[1.5]">
                          Submitted
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
