"use client";

import React, { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";

export interface UploadedDoc {
  id: string;
  name: string;
  category: "Bank Statement" | "Tax Return" | "Financial Statement" | "Application" | "ID" | "Other";
  displayTitle: string;
  subtitle: string;
  size: string;
  uploaded: boolean;
}

interface UploadSupportingDocsStepProps {
  docs: UploadedDoc[];
  onUploadDoc: (docId: string, file: File) => void;
}

export function UploadSupportingDocsStep({
  docs,
  onUploadDoc,
}: UploadSupportingDocsStepProps) {
  const docInputRef = useRef<HTMLInputElement>(null);
  const [activeDocIdToUpload, setActiveDocIdToUpload] = useState<string | null>(null);

  const triggerDocUpload = (docId: string) => {
    setActiveDocIdToUpload(docId);
    docInputRef.current?.click();
  };

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && activeDocIdToUpload) {
      onUploadDoc(activeDocIdToUpload, e.target.files[0]);
      setActiveDocIdToUpload(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Hidden File Input for Supporting Documents */}
      <input
        ref={docInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.xlsx"
        className="hidden"
        onChange={handleDocFileChange}
      />

      <div>
        <h2 className="font-['Inter'] font-bold text-[24px] text-black">
          Upload Supporting Documents
        </h2>
        <p className="font-['DM_Sans'] text-[14px] text-[#929292] mt-0.5">
          Ensure all mandatory verification documents are attached
        </p>
      </div>

      <div className="space-y-2.5">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#fff9e6] border border-[rgba(255,191,0,0.18)] rounded-[7px] p-[11.5px] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-[5px] bg-[#515151] flex items-center justify-center text-white">
                <FileText className="size-4" />
              </div>
              <div>
                <p className="font-['DM_Sans'] font-semibold text-[14px] text-black">
                  {doc.displayTitle}
                </p>
                <p className="font-['DM_Sans'] text-[12px] text-[#929292]">
                  {doc.uploaded && doc.name ? `${doc.name} (${doc.size})` : doc.subtitle}
                </p>
              </div>
            </div>

            {doc.uploaded ? (
              <div className="flex items-center gap-2">
                <span className="font-['Inter'] font-bold text-[13px] text-[#00c950]">
                  Uploaded
                </span>
                <button
                  type="button"
                  onClick={() => triggerDocUpload(doc.id)}
                  className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  title="Replace file"
                >
                  <Upload className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => triggerDocUpload(doc.id)}
                className="border border-[rgba(146,146,146,0.5)] hover:bg-white rounded-[5px] px-3 py-1 text-[12px] font-semibold text-[#65636d] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Upload className="size-3.5" />
                <span>Upload</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
