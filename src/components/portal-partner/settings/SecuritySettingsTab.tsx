"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SecuritySettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[28px] items-end">
      {/* Main Yellow Card (Node 36:12981) */}
      <div className="bg-[#fff9e6] rounded-[8px] px-[24px] py-[40px] flex flex-col gap-[32px] items-start w-full shadow-2xs">
        {/* Header Title (Node 36:13168) */}
        <h2 className="font-['Inter'] font-bold text-[26px] text-[#997300] leading-[1.2]">
          Change Password
        </h2>

        {/* Form Fields Container (Node 36:12988) */}
        <div className="w-full max-w-[1012px] flex flex-col gap-[16px] items-start">
          {/* Current Password (Node 36:12989) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Current Password
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center justify-between w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter your password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black placeholder:text-[#868484] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-neutral-400 hover:text-black p-1 transition-colors cursor-pointer shrink-0"
              >
                {showCurrent ? <EyeOff className="size-[22px]" /> : <Eye className="size-[22px]" />}
              </button>
            </div>
          </div>

          {/* New Password (Node 36:12993) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              New Password
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center justify-between w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black placeholder:text-[#868484] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-neutral-400 hover:text-black p-1 transition-colors cursor-pointer shrink-0"
              >
                {showNew ? <EyeOff className="size-[22px]" /> : <Eye className="size-[22px]" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Node 36:12997) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Confirm Password
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center justify-between w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black placeholder:text-[#868484] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-neutral-400 hover:text-black p-1 transition-colors cursor-pointer shrink-0"
              >
                {showConfirm ? <EyeOff className="size-[22px]" /> : <Eye className="size-[22px]" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Password CTA Button (Node 36:13005) */}
      <button
        type="submit"
        className="bg-[#232222] hover:bg-black active:scale-[0.98] h-[52px] px-[20px] py-[10px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all shadow-xs shrink-0"
      >
        <span className="font-['Inter'] font-bold text-[16px] text-white tracking-[0.5px] leading-[26px]">
          {isUpdated ? "Password Updated!" : "Update Password"}
        </span>
      </button>
    </form>
  );
}
