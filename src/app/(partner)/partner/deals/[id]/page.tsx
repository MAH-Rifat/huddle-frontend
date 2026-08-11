"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Coins,
  Briefcase,
  FileText,
  Building2,
  Globe,
  Upload,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function PartnerDealDetailPage() {
  const params = useParams();
  const dealId = (params?.id as string) || "deal-1";
  const { getDealById, addDealNote } = useApp();

  const deal = getDealById(dealId) || getDealById("deal-1");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([
    {
      id: "note-1",
      author: "Jennifer Moore",
      role: "You",
      date: "Nov 29, 2024",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      content:
        "Client recently expanded to a second location. Revenue may appear lower in the previous quarter due to startup costs at the new site. Strong cash flow expected in Q1 2025.",
    },
  ]);

  const dealProgressSteps = [
    { label: "Submitted", status: "completed" },
    { label: "Processing", status: "completed" },
    { label: "Under Review", status: "active" },
    { label: "Approved", status: "pending" },
    { label: "Funded", status: "pending" },
  ];

  const documents = [
    {
      id: "doc-1",
      title: "Bank Statements",
      subtitle: "Last 3–6 months",
    },
    {
      id: "doc-2",
      title: "Financial Statements",
      subtitle: "P&L, Balance Sheet",
    },
    {
      id: "doc-3",
      title: "Tax Returns",
      subtitle: "Last 2 years",
    },
    {
      id: "doc-4",
      title: "Application",
      subtitle: "Signed application form",
    },
    {
      id: "doc-5",
      title: "Other Supporting Documents",
      subtitle: "Any additional documentation",
    },
  ];

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const newNoteObj = {
      id: `note-${Date.now()}`,
      author: "Jennifer Moore",
      role: "You",
      date: "Just now",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      content: newNote.trim(),
    };
    setNotes((prev) => [...prev, newNoteObj]);
    if (deal) {
      addDealNote(deal.id, newNote.trim(), "Jennifer Moore", "Partner Admin");
    }
    setNewNote("");
  };

  return (
    <div className="w-full space-y-6 pb-16 select-none max-w-[1316px]">
      {/* 1. Back to My Deals Button (Node 36:9240) */}
      <div className="flex items-center">
        <Link
          href="/partner/deals"
          className="flex items-center gap-1.5 text-[#929292] hover:text-black transition-colors font-['Inter'] font-bold text-[12px]"
        >
          <ChevronLeft className="size-4 stroke-[2.5]" />
          <span>Back to My Deals</span>
        </Link>
      </div>

      {/* 2. Header Row: Deal Title & Status (Node 36:9244) */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-['Inter'] font-bold text-[18px] text-[#ffbf00] leading-[1.5] tracking-tight">
            {deal ? deal.dealNumber || "UW-2024-001" : "UW-2024-001"}
          </h1>
          <div className="bg-[rgba(130,0,219,0.12)] border border-[rgba(233,212,255,0.41)] h-[24px] px-[9px] py-[3px] rounded-[3.5px] flex items-center justify-center">
            <span className="font-['Gilmer:Bold',sans-serif] font-bold text-[10px] text-[#ad5be5] leading-[1.5] whitespace-nowrap">
              Underwriting
            </span>
          </div>
        </div>
        <p className="font-['DM_Sans'] font-normal text-[14px] text-[#929292] leading-[1.4]">
          {deal?.businessName || "Johnson Supply Co."} · {deal?.clientName || "Marcus Johnson"} · Submitted Dec 1, 2024
        </p>
      </div>

      {/* 3. Deal Progress Card (Node 36:9253 / 36:9684) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[11px] p-[18.5px] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] space-y-4">
        <p className="font-['Inter'] font-bold text-[12px] text-[#929292] uppercase leading-[18px] tracking-wider">
          Deal Progress
        </p>

        {/* Stepper with 5 Items and Exact Connector Lines (Node 36:9687 - 36:9711) */}
        <div className="w-full relative py-2">
          {/* 5-Step Grid */}
          <div className="grid grid-cols-5 w-full relative">
            {dealProgressSteps.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";
              const isPending = step.status === "pending";

              return (
                <div key={idx} className="flex flex-col items-center relative">
                  {/* Left Connector Line Segment (from previous step center to this step center) */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-3 right-1/2 w-full h-[2px] -translate-y-1/2 z-0 ${
                        idx <= 2 ? "bg-[#ffbf00]" : "bg-[#e2e8f0]"
                      }`}
                    />
                  )}

                  {/* Right Connector Line Segment (from this step center to next step center) */}
                  {idx < dealProgressSteps.length - 1 && (
                    <div
                      className={`absolute top-3 left-1/2 w-full h-[2px] -translate-y-1/2 z-0 ${
                        idx < 2 ? "bg-[#ffbf00]" : "bg-[#e2e8f0]"
                      }`}
                    />
                  )}

                  {/* Step Circle (24px, center at top-3 = 12px) */}
                  <div className="size-6 flex items-center justify-center bg-white rounded-full relative z-10">
                    {(isCompleted || isActive) ? (
                      <svg className="size-6 text-[#ffbf00]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11" fill="#ffbf00" />
                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="size-6 text-[#cbd5e1]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
                        <path d="M7.5 12L10.5 15L16.5 9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {/* Step Label (16px) */}
                  <p
                    className={`mt-2 font-['DM_Sans'] font-semibold text-[16px] text-center whitespace-nowrap leading-normal ${
                      isActive
                        ? "text-[#ffbf00]"
                        : isCompleted
                        ? "text-black"
                        : "text-[#929292]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Middle Section: Deal Information (Left) + Documents (Right) (Node 36:10179) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Deal Information (Node 36:9302, 511px) */}
        <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-[11px] p-[18.5px] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-['Inter'] font-bold text-[18px] text-black leading-[1.5]">
              Deal Information
            </h3>

            <div className="space-y-4">
              {/* Item 1: Requested Amount (Node 36:10096) */}
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#fff9e6] flex items-center justify-center text-[#ffbf00] shrink-0">
                  <Coins className="size-4.5" />
                </div>
                <div>
                  <p className="font-['DM_Sans'] font-semibold text-[12px] text-[#929292] leading-[1.5]">
                    Requested Amount
                  </p>
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#1d293d] leading-normal">
                    ${(deal?.requestedAmount || 125000).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Item 2: Funding Purpose (Node 36:10101) */}
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#fff9e6] flex items-center justify-center text-[#ffbf00] shrink-0">
                  <Briefcase className="size-4.5" />
                </div>
                <div>
                  <p className="font-['DM_Sans'] font-semibold text-[12px] text-[#929292] leading-[1.5]">
                    Funding Purpose
                  </p>
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#1d293d] leading-normal">
                    {deal?.fundingPurpose || "Working Capital"}
                  </p>
                </div>
              </div>

              {/* Item 3: Product Type (Node 36:10106) */}
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#fff9e6] flex items-center justify-center text-[#ffbf00] shrink-0">
                  <FileText className="size-4.5" />
                </div>
                <div>
                  <p className="font-['DM_Sans'] font-semibold text-[12px] text-[#929292] leading-[1.5]">
                    Product Type
                  </p>
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#1d293d] leading-normal">
                    {deal?.productType || "Term Loan"}
                  </p>
                </div>
              </div>

              {/* Item 4: Business Type (Node 36:10111) */}
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#fff9e6] flex items-center justify-center text-[#ffbf00] shrink-0">
                  <Building2 className="size-4.5" />
                </div>
                <div>
                  <p className="font-['DM_Sans'] font-semibold text-[12px] text-[#929292] leading-[1.5]">
                    Business Type
                  </p>
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#1d293d] leading-normal">
                    {deal?.entityType || "LLC"}
                  </p>
                </div>
              </div>

              {/* Item 5: Industry (Node 36:10116) */}
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#fff9e6] flex items-center justify-center text-[#ffbf00] shrink-0">
                  <Globe className="size-4.5" />
                </div>
                <div>
                  <p className="font-['DM_Sans'] font-semibold text-[12px] text-[#929292] leading-[1.5]">
                    Industry
                  </p>
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#1d293d] leading-normal">
                    {deal?.industry || "Wholesale"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Documents (Node 36:9365, 781px) */}
        <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-[11px] p-[18.5px] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h2 className="font-['Inter'] font-bold text-[26px] text-black leading-[1.2]">
              Documents
            </h2>

            {/* 5 Golden Document Cards (Node 36:10534 - 36:10623) */}
            <div className="space-y-2.5">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#fff9e6] border border-[rgba(255,191,0,0.18)] rounded-[7px] p-[11.5px] flex items-center justify-between hover:border-[rgba(255,191,0,0.38)] transition-colors"
                >
                  {/* Left: Document Icon in Gray Box + Titles */}
                  <div className="flex items-center gap-3">
                    <div className="size-7 rounded-[5px] bg-[#515151] flex items-center justify-center text-white shrink-0">
                      <FileText className="size-3.5" />
                    </div>
                    <div>
                      <p className="font-['DM_Sans'] font-semibold text-[14px] text-black leading-[1.5]">
                        {doc.title}
                      </p>
                      <p className="font-['DM_Sans'] font-normal text-[12px] text-[#929292] leading-[1.4]">
                        {doc.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Green Checkmark Badge & Download Icon (Node 36:10550 & 36:10551) */}
                  <div className="flex items-center gap-2">
                    <div className="size-[18px] text-[#00c950]" title="Verified">
                      <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 3L13.9 4.9C14.3 5.3 14.8 5.5 15.3 5.5H18V8.2C18 8.7 18.2 9.2 18.6 9.6L20.5 11.5L18.6 13.4C18.2 13.8 18 14.3 18 14.8V17.5H15.3C14.8 17.5 14.3 17.7 13.9 18.1L12 20L10.1 18.1C9.7 17.7 9.2 17.5 8.7 17.5H6V14.8C6 14.3 5.8 13.8 5.4 13.4L3.5 11.5L5.4 9.6C5.8 9.2 6 8.7 6 8.2V5.5H8.7C9.2 5.5 9.7 5.3 10.1 4.9L12 3Z" fill="rgba(0,201,80,0.15)" stroke="#00c950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading ${doc.title}`)}
                      className="p-1 text-black hover:text-[#ffbf00] transition-colors cursor-pointer"
                      title="Download file"
                    >
                      <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Upload Additional Doc Button (Node 36:10666) */}
          <button
            type="button"
            onClick={() => alert("Upload Additional Document dialog opened.")}
            className="w-full border border-[rgba(255,105,0,0.3)] hover:bg-[#fff9e6]/50 transition-colors rounded-[5px] py-[11.25px] px-[11.5px] flex items-center justify-center gap-[7px] text-[#ffb86a] font-['Inter'] font-bold text-[14px] leading-[24px] cursor-pointer active:scale-[0.99]"
          >
            <Upload className="size-[16.5px] text-[#ffb86a]" />
            <span>Upload Additional Doc</span>
          </button>
        </div>
      </div>

      {/* 5. Deal Notes & Communication Card (Node 36:9454 / 36:9455) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[11px] p-[18.5px] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] space-y-3.5">
        <p className="font-['Inter'] font-bold text-[12px] text-black uppercase leading-[18px] tracking-wider">
          Deal Notes &amp; Communication
        </p>

        {/* Existing Note Thread (Node 36:9459) */}
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-[#eff6ff] rounded-[11px] p-[14px] space-y-2 border border-blue-100/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={note.avatar}
                    alt={note.author}
                    className="size-[21px] rounded-full object-cover"
                  />
                  <p className="font-['DM_Sans'] font-semibold text-[14px] text-[#314158] leading-[1.5]">
                    {note.author}{" "}
                    <span className="text-[#90a1b9] font-normal">({note.role})</span>
                  </p>
                </div>
                <span className="font-['DM_Sans'] font-normal text-[10.5px] text-[#90a1b9] leading-[14px]">
                  {note.date}
                </span>
              </div>
              <p className="font-['DM_Sans'] font-normal text-[13px] text-[#314158] leading-[1.4]">
                {note.content}
              </p>
            </div>
          ))}
        </div>

        {/* Note Composer Textarea with Send Button (Node 36:9470 - 36:10759) */}
        <form onSubmit={handleSendNote} className="flex items-center gap-3 pt-2">
          <textarea
            rows={2}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note for the underwriting team…"
            className="flex-1 bg-white border border-[#e2e8f0] rounded-[11px] h-[70px] px-[11.5px] py-[9.75px] font-['DM_Sans'] font-normal text-[12px] text-black placeholder:text-[rgba(15,23,42,0.5)] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#ffbf00] resize-none"
          />
          <button
            type="submit"
            className="size-[44px] rounded-[8px] bg-[#232222] hover:bg-black active:bg-neutral-800 text-white flex items-center justify-center shrink-0 cursor-pointer transition-all shadow-xs"
            title="Send note"
          >
            <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
