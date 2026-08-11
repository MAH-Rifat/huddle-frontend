"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { SalesRep, UserRole } from "@/types";

interface AddEditUserModalProps {
  isOpen: boolean;
  userToEdit: SalesRep | null;
  partnerSlug: string;
  onClose: () => void;
  onSave: (user: Partial<SalesRep>) => void;
}

export function AddEditUserModal({
  isOpen,
  userToEdit,
  partnerSlug,
  onClose,
  onSave,
}: AddEditUserModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Sales Rep");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
    } else {
      setName("");
      setEmail("");
      setRole("Sales Rep");
    }
  }, [userToEdit, isOpen]);

  if (!mounted || !isOpen) return null;

  const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, "-") || "user-name";
  const previewUrl = `https://apply.capflow.io/${partnerSlug}/${generatedSlug}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSave({
      name,
      email,
      role,
      customSlug: generatedSlug,
      trackableUrl: previewUrl,
    });
  };

  return createPortal(
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/35 backdrop-blur-[2.5px] z-[99999] flex items-center justify-center p-4 transition-all select-none">
      <div className="bg-white rounded-[16px] max-w-[500px] w-full p-6 shadow-2xl space-y-6 relative border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Inter'] font-bold text-[20px] text-black">
              {userToEdit ? "Edit Team Member" : "Add Team Member"}
            </h3>
            <p className="font-['DM_Sans'] text-[13px] text-[#929292] mt-0.5">
              {userToEdit
                ? "Update permissions and profile details for this member"
                : "Invite a new sales representative or admin to your portal"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-['DM_Sans']">
          <div>
            <label className="block text-[13px] font-bold text-black mb-1.5">
              Full Name*
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3.5 py-2.5 text-[13.5px] bg-[#fff9e6]/40 border border-[rgba(255,191,0,0.3)] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#ffbf00] text-black placeholder:text-[#94a3b8]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-black mb-1.5">
              Work Email*
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 text-[13.5px] bg-[#fff9e6]/40 border border-[rgba(255,191,0,0.3)] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#ffbf00] text-black placeholder:text-[#94a3b8]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-black mb-1.5">
              Role &amp; Permissions Level*
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 text-[13.5px] bg-[#fff9e6]/40 border border-[rgba(255,191,0,0.3)] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#ffbf00] text-black cursor-pointer"
            >
              <option value="Sales Rep">Sales Rep (Unique Referral Link &amp; Own Deals)</option>
              <option value="Portal Admin">Portal Admin (Full Team &amp; Organization Management)</option>
              <option value="Viewer">Viewer (Read-Only Access to Pipeline &amp; Reports)</option>
            </select>
          </div>

          {/* Dynamic Link Preview */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-3 space-y-1">
            <p className="text-[11px] font-bold text-[#62748e] uppercase tracking-wider">
              Auto-Generated Referral URL
            </p>
            <p className="text-[12px] font-['JetBrains_Mono'] text-[#1d293d] truncate">
              {previewUrl}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-[8px] border border-black text-black font-['Inter'] font-bold text-[13px] hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gradient-to-b from-[#ffc005] to-[#c59609] hover:brightness-105 active:scale-[0.98] px-6 py-2.5 rounded-[8px] font-['Inter'] font-bold text-[13px] text-black shadow-xs cursor-pointer transition-all"
            >
              {userToEdit ? "Save Changes" : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
