"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Check } from "lucide-react";

interface UploadApplicationStepProps {
  applicationFile: {
    name: string;
    size: string;
  };
  onFileSelect: (file: File) => void;
}

export function UploadApplicationStep({
  applicationFile,
  onFileSelect,
}: UploadApplicationStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-5">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg"
        className="hidden"
        onChange={handleFileChange}
      />

      <div>
        <h2 className="font-['Inter'] font-bold text-[24px] text-black">
          Upload Application
        </h2>
        <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-0.5">
          Upload your completed application file
        </p>
      </div>

      {/* Clickable & Draggable Dropzone Container */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-[10px] p-10 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all ${
          isDragging
            ? "border-[#ffbf00] bg-[#fff9e6]/60 scale-[1.01]"
            : "border-[#e2e8f0] bg-white hover:border-[#ffbf00] hover:bg-[#fff9e6]/20"
        }`}
      >
        <div className="size-12 rounded-full bg-[#fff9e6] text-[#ffbf00] flex items-center justify-center pointer-events-none">
          <UploadCloud className="size-6 text-[#ffbf00]" />
        </div>
        <div className="pointer-events-none">
          <p className="font-['Inter'] font-semibold text-[14px] text-[#1d293d]">
            Drop application file here or click to browse
          </p>
          <p className="font-['DM_Sans'] text-[12px] text-[#929292] mt-0.5">
            PDF, DOC, DOCX up to 50MB
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="border border-[#e2e8f0] hover:bg-neutral-50 rounded-[6px] px-4 py-1.5 text-[12px] font-semibold text-[#1d293d] transition-colors cursor-pointer"
        >
          Choose File
        </button>
      </div>

      {/* Uploaded File Row (Node 35:3107) */}
      <div className="bg-[#fff9e6] border border-[rgba(255,191,0,0.2)] rounded-[8px] p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-[5px] bg-[#515151] flex items-center justify-center text-white">
            <FileText className="size-4" />
          </div>
          <div>
            <p className="font-['DM_Sans'] font-semibold text-[14px] text-black truncate max-w-[360px]">
              {applicationFile.name}
            </p>
            <p className="font-['DM_Sans'] text-[12px] text-[#929292]">
              {applicationFile.size} · Uploaded
            </p>
          </div>
        </div>

        <div className="size-5 rounded-full bg-[rgba(63,201,81,0.15)] flex items-center justify-center text-[#3fc951]">
          <Check className="size-3.5 stroke-[3]" />
        </div>
      </div>
    </div>
  );
}
