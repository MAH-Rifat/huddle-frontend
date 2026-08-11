"use client";

import React, { useState } from "react";
import { Copy, Check, Camera, Link2 } from "lucide-react";
import { Partner } from "@/types";

interface ProfileSettingsTabProps {
  activePartner: Partner;
}

export function ProfileSettingsTab({ activePartner }: ProfileSettingsTabProps) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("Jennifer Moore");
  const [workEmail, setWorkEmail] = useState("j.moore@abccapital.com");
  const [phone, setPhone] = useState("+1 (212) 555-0100");
  const [organization, setOrganization] = useState(activePartner.name || "ABC Capital Bank");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80"
  );

  const referralUrl = `https://apply.capflow.io/${activePartner.slug || "abc-capital"}/jennifer-moore`;

  const copyUrl = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[28px] items-end">
      {/* Main Yellow Card (Node 36:12780) */}
      <div className="bg-[#fff9e6] rounded-[8px] px-[24px] py-[40px] flex flex-col gap-[14px] items-center w-full shadow-2xs">
        {/* Avatar with Camera Button (Node 36:12877) */}
        <div className="relative inline-grid place-items-start leading-none">
          <div className="size-[144.97px] rounded-[200px] border-2 border-white overflow-hidden shadow-sm bg-white">
            <img
              src={avatarUrl}
              alt="Profile"
              className="size-full object-cover"
            />
          </div>

          <label
            htmlFor="profile-photo-upload"
            className="absolute bottom-0 right-0 bg-[#232222] hover:bg-black active:scale-95 transition-all text-white size-[43.5px] rounded-full flex items-center justify-center shadow-md cursor-pointer"
            title="Change Photo"
          >
            <Camera className="size-[18px]" />
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Form Container (Node 36:12781) */}
        <div className="w-full max-w-[1012px] flex flex-col gap-[16px] items-start pt-2">
          {/* Unique Application URL Box (Node 86:19939) */}
          <div className="bg-[#ffebb0] border-2 border-[rgba(255,191,0,0.1)] rounded-[11px] p-[16px] w-full flex flex-col gap-[7px]">
            {/* Top Row: Title + Role Badge */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-[7px]">
                <Link2 className="size-[14px] text-[#314158]" />
                <p className="font-['DM_Sans'] font-semibold text-[10.5px] text-[#314158] uppercase tracking-[0.2625px]">
                  Your Unique Application URL
                </p>
              </div>

              <div className="bg-[rgba(29,78,216,0.13)] px-[7px] py-[1.75px] rounded-[3.5px]">
                <span className="font-['DM_Sans'] font-medium text-[11px] text-[#1d4ed8] leading-[16.5px]">
                  Portal Admin
                </span>
              </div>
            </div>

            {/* Middle Row: Code Bar + Copy Button */}
            <div className="flex items-center gap-[10.5px] w-full pt-[7px]">
              <div className="bg-white border border-[#e2e8f0] rounded-[7px] h-[33.5px] px-[11.5px] py-[8px] flex items-center flex-1 min-w-0 overflow-hidden">
                <p className="font-['JetBrains_Mono'] font-normal text-[12.25px] text-[#1d293d] truncate leading-[17.5px]">
                  {referralUrl}
                </p>
              </div>

              <button
                type="button"
                onClick={copyUrl}
                className="bg-white hover:bg-neutral-50 active:scale-95 border border-[#e2e8f0] rounded-[7px] h-[33.5px] px-[11.5px] py-[8px] flex items-center gap-[5.25px] text-[#45556c] font-['DM_Sans'] font-semibold text-[10.5px] leading-[14px] cursor-pointer transition-all shrink-0"
              >
                {copied ? (
                  <Check className="size-[12px] text-[#00c950]" />
                ) : (
                  <Copy className="size-[12px]" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Bottom Disclaimer */}
            <p className="font-['DM_Sans'] font-normal text-[10.5px] text-[#90a1b9] pt-[7px] leading-[14px]">
              All applications submitted via this link are attributed to your profile for tracking and reporting.
            </p>
          </div>

          {/* Full Name Field (Node 36:12782) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Full Name
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Work Email Field (Node 36:12787) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Work Email
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Field (Node 36:12792) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Phone
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Organization Field (Node 36:12872) */}
          <div className="w-full flex flex-col gap-[12px]">
            <label className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Organization
            </label>
            <div className="bg-white rounded-[6px] h-[52px] px-[16px] py-[10px] flex items-center w-full shadow-2xs border border-transparent focus-within:border-[#ffbf00]">
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-transparent font-['Roboto'] font-normal text-[16px] text-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button (Node 36:12797) */}
      <button
        type="submit"
        className="bg-[#232222] hover:bg-black active:scale-[0.98] h-[52px] px-[20px] py-[10px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all shadow-xs shrink-0"
      >
        <span className="font-['Inter'] font-bold text-[16px] text-white tracking-[0.5px] leading-[26px]">
          {isSaved ? "Saved Changes!" : "Save Changes"}
        </span>
      </button>
    </form>
  );
}
