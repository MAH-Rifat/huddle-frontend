"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface PermissionRow {
  name: string;
  admin: boolean;
  rep: boolean;
  viewer: boolean;
}

export function PermissionMatrixTab() {
  const permissions: PermissionRow[] = [
    {
      name: "Submit Deals",
      admin: true,
      rep: true,
      viewer: false,
    },
    {
      name: "View All Deals",
      admin: true,
      rep: false,
      viewer: true,
    },
    {
      name: "Manage Users",
      admin: true,
      rep: false,
      viewer: false,
    },
    {
      name: "View Reports",
      admin: true,
      rep: false,
      viewer: true,
    },
    {
      name: "Manage Portal Settings",
      admin: true,
      rep: false,
      viewer: false,
    },
    {
      name: "Access Underwriting Notes",
      admin: true,
      rep: false,
      viewer: false,
    },
    {
      name: "Export Pipeline Data",
      admin: true,
      rep: false,
      viewer: false,
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Role Permission Matrix Card (Node 86:19382) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[13.1px] p-[22px] shadow-[0px_1.19px_1.79px_rgba(0,0,0,0.06),0px_1.19px_1.19px_rgba(0,0,0,0.06)] space-y-4">
        <div>
          <h3 className="font-['Outfit'] font-semibold text-[15px] text-[#314158] tracking-tight">
            Role Permission Matrix
          </h3>
          <p className="font-['DM_Sans'] text-[13px] text-[#90a1b9] mt-0.5">
            System permissions assigned to each user role in this organization
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-[#f1f5f9] h-[43px]">
                <th className="py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px] w-[35%]">
                  Permission
                </th>
                <th className="py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px] text-center w-[21%]">
                  Portal Admin
                </th>
                <th className="py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px] text-center w-[21%]">
                  Sales Rep
                </th>
                <th className="py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px] text-center w-[21%]">
                  Viewer
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f8fafc]">
              {permissions.map((perm, idx) => (
                <tr key={idx} className="h-[48px] hover:bg-[#fcfdfd] transition-colors">
                  <td className="py-2 font-['DM_Sans'] font-medium text-[14.6px] text-[#314158]">
                    {perm.name}
                  </td>

                  {/* Portal Admin */}
                  <td className="py-2 text-center">
                    <div className="flex justify-center">
                      {perm.admin ? (
                        <div className="size-6 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
                          <X className="size-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Sales Rep */}
                  <td className="py-2 text-center">
                    <div className="flex justify-center">
                      {perm.rep ? (
                        <div className="size-6 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
                          <X className="size-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Viewer */}
                  <td className="py-2 text-center">
                    <div className="flex justify-center">
                      {perm.viewer ? (
                        <div className="size-6 rounded-full bg-emerald-50 text-[#009966] flex items-center justify-center">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
                          <X className="size-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
