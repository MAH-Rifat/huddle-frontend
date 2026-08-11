"use client";

import React, { useState } from "react";
import { Copy, Check, Edit2 } from "lucide-react";
import { SalesRep } from "@/types";

interface AllUsersTableProps {
  users: SalesRep[];
  onAddUserClick: () => void;
  onEditUser: (user: SalesRep) => void;
  onToggleDeactivate: (userId: string) => void;
}

export function AllUsersTable({
  users,
  onAddUserClick,
  onEditUser,
  onToggleDeactivate,
}: AllUsersTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRolePermissions = (role: string) => {
    if (role === "Portal Admin") {
      return [
        "Submit Deals",
        "View All Deals",
        "Manage Users",
        "View Reports",
        "Manage Portal Settings",
      ];
    }
    if (role === "Sales Rep") {
      return ["Submit Deals", "View Own Deals", "View Own Reports"];
    }
    return ["View Own Deals", "View Reports"];
  };

  return (
    <div className="space-y-4 w-full">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between">
        <p className="font-['DM_Sans'] text-[14.2px] text-[#0f172b]">
          <span className="font-bold">{users.length}</span>{" "}
          <span className="font-normal text-[#45556c]">
            users in this organization
          </span>
        </p>

        <button
          type="button"
          onClick={onAddUserClick}
          className="bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.98] h-[40px] px-[20px] py-[12px] rounded-[8px] font-['Inter'] font-bold text-[14px] text-black shadow-xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <svg className="size-[18px] text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table Card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12.7px] overflow-hidden shadow-[0px_1.157px_1.736px_rgba(0,0,0,0.06),0px_1.157px_1.157px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#f1f5f9] h-[43px]">
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px]">
                  User
                </th>
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px]">
                  Role
                </th>
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px]">
                  Permissions
                </th>
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px]">
                  Application URL
                </th>
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px]">
                  Last Login
                </th>
                <th className="px-4 py-2 font-['DM_Sans'] font-semibold text-[13px] text-[#62748e] uppercase tracking-[0.33px] text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f8fafc]">
              {users.map((user) => {
                const permissions = getRolePermissions(user.role);
                const isInactive = !user.isActive;

                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-[#fcfdfd] transition-colors h-[60px] ${
                      isInactive ? "opacity-60 bg-[#f8fafc]/50" : ""
                    }`}
                  >
                    {/* User Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-[30px] rounded-full bg-[#1d4ed8] text-white font-bold flex items-center justify-center text-[12px] shrink-0 font-['DM_Sans'] shadow-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-['DM_Sans'] font-semibold text-[13px] text-[#1d293d] leading-tight">
                            {user.name}
                          </p>
                          <p className="font-['DM_Sans'] text-[12px] text-[#90a1b9] leading-tight mt-0.5">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      {user.role === "Portal Admin" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[4.2px] bg-[#eff6ff] text-[#1447e6] font-['DM_Sans'] font-medium text-[13px]">
                          Portal Admin
                        </span>
                      ) : user.role === "Sales Rep" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[4.2px] bg-[#faf5ff] text-[#8200db] font-['DM_Sans'] font-medium text-[13px]">
                          Sales Rep
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[4.2px] bg-[#f1f5f9] text-[#45556c] font-['DM_Sans'] font-medium text-[13px]">
                          Viewer
                        </span>
                      )}
                    </td>

                    {/* Permissions Badges */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[340px]">
                        {permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className="bg-[#f1f5f9] text-[#45556c] font-['DM_Sans'] text-[11px] px-1.5 py-0.5 rounded-[4px] whitespace-nowrap"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Application URL */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 max-w-[230px]">
                        <div className="bg-[#f8fafc] border border-[#e2e8f0] px-2 py-1 rounded-[4px] text-[11.5px] font-['JetBrains_Mono'] text-[#45556c] truncate flex-1">
                          {user.trackableUrl}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyUrl(user.trackableUrl, user.id)}
                          className="p-1 rounded-[4px] hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer shrink-0"
                          title="Copy Link"
                        >
                          {copiedId === user.id ? (
                            <Check className="size-3.5 text-[#00c950]" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Last Login */}
                    <td className="px-4 py-3 font-['DM_Sans'] text-[12.5px] text-[#90a1b9] whitespace-nowrap">
                      {user.lastLogin || "2h ago"}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEditUser(user)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] hover:bg-neutral-100 text-[#45556c] font-['DM_Sans'] font-medium text-[12.5px] cursor-pointer transition-colors"
                        >
                          <Edit2 className="size-3 text-[#45556c]" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleDeactivate(user.id)}
                          className={`px-2.5 py-1 rounded-[4px] border border-solid font-['DM_Sans'] font-medium text-[12.5px] cursor-pointer transition-colors ${
                            user.isActive
                              ? "border-[#ffc9c9] text-[#e7000b] hover:bg-red-50"
                              : "border-[#a4f4cf] text-[#009966] hover:bg-emerald-50"
                          }`}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
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
    </div>
  );
}
