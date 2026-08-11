"use client";

import React, { useState } from "react";
import { UserCircle2, Shield, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ProfileSettingsTab } from "@/components/portal-partner/settings/ProfileSettingsTab";
import { SecuritySettingsTab } from "@/components/portal-partner/settings/SecuritySettingsTab";
import { NotificationsSettingsTab } from "@/components/portal-partner/settings/NotificationsSettingsTab";

export default function PartnerSettingsPage() {
  const { activePartner } = useApp();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");

  return (
    <div className="w-full space-y-6 pb-16 select-none max-w-[1300px]">
      {/* Header Area (Nodes 36:12663 / 36:12963 / 36:13249) */}
      <div className="space-y-1">
        <h1 className="font-['Inter'] font-bold text-[36px] text-black leading-[1.3] tracking-tight">
          Settings
        </h1>
        <p className="font-['Roboto'] font-normal text-[16px] text-[#929292]">
          Configure platform-wide settings and policies
        </p>
      </div>

      {/* Main Settings Body: Left Vertical Sidebar + Right Content (Nodes 36:12851 / 36:12966 / 36:13252) */}
      <div className="flex flex-col md:flex-row gap-[35px] items-start pt-2">
        {/* Left Vertical Tabs (Node 36:12248) */}
        <div className="flex md:flex-col gap-[7px] w-full md:w-[176px] shrink-0">
          {/* Profile Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`h-[36.4px] w-full px-[12px] py-[8px] rounded-[6px] flex items-center gap-[10px] cursor-pointer transition-all ${
              activeTab === "profile"
                ? "bg-[rgba(229,181,79,0.2)] text-[#ffbf00]"
                : "text-[#787a7f] hover:bg-neutral-100/70"
            }`}
          >
            <UserCircle2 className={`size-[16px] shrink-0 ${activeTab === "profile" ? "text-[#ffbf00]" : "text-[#787a7f]"}`} />
            <span className="font-['DM_Sans'] text-[14px] font-normal leading-[1.4] whitespace-nowrap">
              Profile
            </span>
          </button>

          {/* Security Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`h-[36.4px] w-full px-[12px] py-[8px] rounded-[6px] flex items-center gap-[10px] cursor-pointer transition-all ${
              activeTab === "security"
                ? "bg-[rgba(229,181,79,0.2)] text-[#ffbf00]"
                : "text-[#787a7f] hover:bg-neutral-100/70"
            }`}
          >
            <Shield className={`size-[16px] shrink-0 ${activeTab === "security" ? "text-[#ffbf00]" : "text-[#787a7f]"}`} />
            <span className="font-['DM_Sans'] text-[14px] font-normal leading-[1.4] whitespace-nowrap">
              Security
            </span>
          </button>

          {/* Notifications Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`h-[36.4px] w-full px-[12px] py-[8px] rounded-[6px] flex items-center gap-[10px] cursor-pointer transition-all ${
              activeTab === "notifications"
                ? "bg-[rgba(229,181,79,0.2)] text-[#ffbf00]"
                : "text-[#787a7f] hover:bg-neutral-100/70"
            }`}
          >
            <Bell className={`size-[16px] shrink-0 ${activeTab === "notifications" ? "text-[#ffbf00]" : "text-[#787a7f]"}`} />
            <span className="font-['DM_Sans'] text-[14px] font-normal leading-[1.4] whitespace-nowrap">
              Notifications
            </span>
          </button>
        </div>

        {/* Right Content Panels */}
        <div className="flex-1 w-full max-w-[1070px]">
          {activeTab === "profile" && <ProfileSettingsTab activePartner={activePartner} />}
          {activeTab === "security" && <SecuritySettingsTab />}
          {activeTab === "notifications" && <NotificationsSettingsTab />}
        </div>
      </div>
    </div>
  );
}
