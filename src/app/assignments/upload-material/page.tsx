"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";

export default function UploadMaterialPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-neutral-200">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-3xl mb-2">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Upload Material</h1>
          <p className="text-base text-neutral-600 text-center">Choose a PDF or text file to provide optional study material for Gemini context.</p>
        </div>
        <label className="w-full flex flex-col items-center gap-2 cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/80 p-6 text-center shadow-sm transition hover:bg-neutral-100">
          <span className="font-semibold text-base text-neutral-800">Choose a PDF or text file</span>
          <span className="text-sm text-neutral-500 mb-2">Drag & drop or click to select a file</span>
          <input
            type="file"
            accept=".pdf,.txt,text/plain,application/pdf"
            className="sr-only"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          {file ? <span className="text-sm text-green-700 font-medium">{file.name}</span> : null}
        </label>
        <Button type="button" className="w-full py-2 text-lg rounded-full" disabled={!file}>
          Upload
        </Button>
      </div>
    </section>
  );
}
