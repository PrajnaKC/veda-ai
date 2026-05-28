"use client";

import { useId, useRef, type DragEvent } from "react";

type UploadBoxProps = {
  file?: File;
  onFileChange: (file?: File) => void;
};

export function UploadBox({ file, onFileChange }: UploadBoxProps) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (selectedFile?: File) => {
    onFileChange(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileSelection(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-3xl border-[1.75px] border-dashed border-neutral-300 bg-neutral-50/50 md:bg-white p-6 md:p-8 text-center transition hover:bg-neutral-50 cursor-pointer w-full min-h-[202px]"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
      >
        <input
          id={fileInputId}
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,text/plain,application/pdf,image/jpeg,image/png"
          className="sr-only"
          onChange={(event) => handleFileSelection(event.target.files?.[0])}
        />
        
        {/* Upload Cloud Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#1E1E1E]">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        {/* Texts */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold text-base text-[#303030]">Choose a file or drag & drop it here</span>
          <span className="text-sm text-[#A9A9A9]">JPEG, PNG, PDF, TXT upto 10MB</span>
        </div>

        {/* Browse Files Button */}
        <button
          type="button"
          className="px-6 py-2 rounded-full bg-[#F6F6F6] text-[#303030] font-semibold text-sm shadow-sm border border-neutral-200 transition hover:bg-neutral-100"
          onClick={(event) => {
            event.stopPropagation();
            openFilePicker();
          }}
        >
          Browse Files
        </button>

        {file ? (
          <div className="mt-2 text-sm text-green-700 font-semibold truncate max-w-full flex items-center gap-3">
            Selected: {file.name}
            <button
              type="button"
              className="text-neutral-500 underline underline-offset-2"
              onClick={(event) => {
                event.stopPropagation();
                handleFileSelection(undefined);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove
            </button>
          </div>
        ) : null}
      </div>
      
      {/* Upload instruction label */}
      <span className="text-center font-semibold text-[#303030]/60 text-sm md:text-base">
        Upload images of your preferred document/image
      </span>
    </div>
  );
}
