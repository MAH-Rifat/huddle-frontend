"use client";

import React, { useState } from "react";

interface NotificationOption {
  id: string;
  title: string;
  enabled: boolean;
}

export function NotificationsSettingsTab() {
  const [notifications, setNotifications] = useState<NotificationOption[]>([
    {
      id: "submitted",
      title: "Deal Submitted Confirmation",
      enabled: true,
    },
    {
      id: "docs",
      title: "Document Required Alerts",
      enabled: true,
    },
    {
      id: "underwriting",
      title: "Underwriting Updates",
      enabled: true,
    },
    {
      id: "funded",
      title: "Deal Approved / Funded",
      enabled: true,
    },
    {
      id: "declined",
      title: "Deal Declined",
      enabled: true,
    },
  ]);

  const toggleOption = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-[28px] items-end">
      {/* Main Yellow Card (Node 36:13267) */}
      <div className="bg-[#fff9e6] rounded-[8px] px-[24px] py-[40px] flex flex-col gap-[32px] items-start w-full shadow-2xs">
        {/* Header Title (Node 36:13268) */}
        <h2 className="font-['Inter'] font-bold text-[26px] text-[#997300] leading-[1.2]">
          Notification Settings
        </h2>

        {/* Toggles Container (Node 36:13328) */}
        <div className="w-full flex flex-col gap-[36px] items-start">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-end justify-between cursor-pointer select-none"
              onClick={() => toggleOption(item.id)}
            >
              <p className="font-['DM_Sans'] font-semibold text-[14px] text-black leading-[1.5]">
                {item.title}
              </p>

              {/* Gold Switch (Node 36:13332) */}
              <div
                className={`h-[20px] w-[34px] rounded-[200px] pl-[4px] pr-[3px] py-[2px] transition-colors flex items-center shrink-0 ${
                  item.enabled
                    ? "bg-[#bf8f00] justify-end"
                    : "bg-neutral-300 justify-start"
                }`}
              >
                <div className="size-[16px] rounded-full bg-white shadow-xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
