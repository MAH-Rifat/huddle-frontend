"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  title?: string;
  description?: string;
  maxSizeMB?: number;
  accept?: string;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUpload({
  title = "Attach Images or Files",
  description = "Max file size 25MB in .pdf, .csv, .xlsx, .jpeg format",
  maxSizeMB = 25,
  accept = ".pdf,.csv,.xlsx,.xls,.jpg,.jpeg,.png",
  onFileSelect,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200",
        isDragging
          ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 ring-4 ring-brand-100"
          : "border-surface-200 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50 hover:bg-surface-100/60 dark:hover:bg-surface-800/60",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {selectedFile ? (
        <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 text-left">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-900 dark:text-surface-50 truncate max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-xs text-surface-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for AI processing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="p-1.5 text-surface-400 hover:text-rose-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-11 w-11 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">
              {title}
            </p>
            <p className="text-xs text-surface-400 mt-1 max-w-sm">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
