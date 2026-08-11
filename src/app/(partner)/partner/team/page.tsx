"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { SalesRep } from "@/types";
import { mockSalesReps } from "@/mock/data";
import { AllUsersTable } from "@/components/portal-partner/team/AllUsersTable";
import { SalesRepUrlsTab } from "@/components/portal-partner/team/SalesRepUrlsTab";
import { PermissionMatrixTab } from "@/components/portal-partner/team/PermissionMatrixTab";
import { AddEditUserModal } from "@/components/portal-partner/team/AddEditUserModal";

export default function PartnerTeamPage() {
  const { activePartner } = useApp();

  // Active Tab: "users" | "urls" | "permissions"
  const [activeTab, setActiveTab] = useState<"users" | "urls" | "permissions">("users");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Users State (initialized with mock data)
  const [users, setUsers] = useState<SalesRep[]>(mockSalesReps);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<SalesRep | null>(null);

  // Filtered users list
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.trackableUrl.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const salesRepsOnly = users.filter((u) => u.role === "Sales Rep");

  const handleOpenAdd = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: SalesRep) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleSaveUser = (userData: Partial<SalesRep>) => {
    if (userToEdit) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userToEdit.id ? { ...u, ...userData } : u))
      );
    } else {
      const newUser: SalesRep = {
        id: `user-${Date.now()}`,
        name: userData.name || "New Member",
        email: userData.email || "",
        role: userData.role || "Sales Rep",
        customSlug: userData.customSlug || "new-user",
        trackableUrl:
          userData.trackableUrl ||
          `https://apply.capflow.io/${activePartner.slug}/${userData.customSlug || "new-user"}`,
        dealsSubmitted: 0,
        attributionPercent: 0,
        isActive: true,
        lastLogin: "Just invited",
        avatarUrl: "",
      };
      setUsers((prev) => [newUser, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 pb-16 select-none max-w-[1584px]">
      {/* Top Header & Search/Filter Controls (Nodes 86:19028 / 86:19235 / 86:19458) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="font-['Inter'] font-bold text-[36px] text-black leading-[1.3] tracking-tight">
            Manage Team
          </h1>
          <p className="font-['Roboto'] font-normal text-[16px] text-[#929292]">
            {users.length} users · {salesRepsOnly.length} sales reps · {activePartner.name}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3">
          {/* Pill Search Input */}
          <div className="bg-white border border-[#e8dcc8] rounded-[40px] h-[52px] w-[335px] max-w-full flex items-center px-4 gap-2.5 shadow-2xs">
            <Search className="size-5 text-[#897766] shrink-0" />
            <input
              type="text"
              placeholder="Search user or deal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[15px] font-['Roboto'] text-[#242220] placeholder-[#897766] focus:outline-none"
            />
          </div>

          {/* Filter Pill Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-[rgba(216,203,184,0.5)] hover:bg-[rgba(216,203,184,0.7)] active:scale-95 transition-all h-[52px] px-[18px] rounded-[40px] flex items-center gap-2 text-[#897766] font-['Inter'] font-normal text-[14px] cursor-pointer"
            >
              <Filter className="size-4.5 text-[#897766]" />
              <span>{roleFilter === "All" ? "Filter" : roleFilter}</span>
            </button>

            {/* Filter Dropdown Popover */}
            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 top-14 w-44 bg-white border border-[#e8dcc8] rounded-[12px] p-1.5 shadow-lg z-30 font-['DM_Sans'] text-[13px] animate-in fade-in zoom-in-95 duration-100">
                  {["All", "Portal Admin", "Sales Rep", "Viewer"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setRoleFilter(role);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] font-medium transition-colors cursor-pointer ${
                        roleFilter === role
                          ? "bg-[#fff9e6] text-[#ffbf00] font-bold"
                          : "text-[#242220] hover:bg-neutral-50"
                      }`}
                    >
                      {role === "All" ? "All Roles" : role}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar (Nodes 86:19042 / 86:19472) */}
      <div className="border-b border-[#e2e8f0] flex gap-2 relative z-10">
        {/* Tab 1: All Users */}
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`px-5 py-3 font-['DM_Sans'] text-[15px] font-medium transition-all cursor-pointer -mb-[1px] border-b-2 ${
            activeTab === "users"
              ? "text-[#ffbf00] border-[#ffbf00] font-bold"
              : "text-[#62748e] border-transparent hover:text-black"
          }`}
        >
          All Users
        </button>

        {/* Tab 2: Sales Rep URLs */}
        <button
          type="button"
          onClick={() => setActiveTab("urls")}
          className={`px-5 py-3 font-['DM_Sans'] text-[15px] font-medium transition-all cursor-pointer -mb-[1px] border-b-2 ${
            activeTab === "urls"
              ? "text-[#ffbf00] border-[#ffbf00] font-bold"
              : "text-[#62748e] border-transparent hover:text-black"
          }`}
        >
          Sales Rep URLs
        </button>

        {/* Tab 3: Permissions */}
        <button
          type="button"
          onClick={() => setActiveTab("permissions")}
          className={`px-5 py-3 font-['DM_Sans'] text-[15px] font-medium transition-all cursor-pointer -mb-[1px] border-b-2 ${
            activeTab === "permissions"
              ? "text-[#ffbf00] border-[#ffbf00] font-bold"
              : "text-[#62748e] border-transparent hover:text-black"
          }`}
        >
          Permissions
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="pt-2">
        {/* Tab 1: All Users View (Node 86:18952) */}
        {activeTab === "users" && (
          <AllUsersTable
            users={filteredUsers}
            onAddUserClick={handleOpenAdd}
            onEditUser={handleOpenEdit}
            onToggleDeactivate={handleToggleStatus}
          />
        )}

        {/* Tab 2: Sales Rep URLs View (Node 86:19159) */}
        {activeTab === "urls" && (
          <SalesRepUrlsTab
            salesReps={users}
            partnerSlug={activePartner.slug}
            onAddRepClick={handleOpenAdd}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Tab 3: Permissions View (Node 86:19382) */}
        {activeTab === "permissions" && <PermissionMatrixTab />}
      </div>

      {/* ADD / EDIT USER MODAL */}
      <AddEditUserModal
        isOpen={isModalOpen}
        userToEdit={userToEdit}
        partnerSlug={activePartner.slug}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}
