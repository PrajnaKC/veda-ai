"use client";

import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { useQuestionPaperStore } from "@/store/questionPaperStore";

export function DownloadButton() {
  const downloadPDF = useQuestionPaperStore((state) => state.downloadPDF);
  const loading = useQuestionPaperStore((state) => state.loading);

  return (
    <motion.button
      type="button"
      onClick={downloadPDF}
      disabled={loading}
      whileHover={{ y: loading ? 0 : -1 }}
      whileTap={{ scale: loading ? 1 : 0.985 }}
      className="inline-flex h-11 w-[200px] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#2B2B2B] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623] disabled:cursor-not-allowed disabled:opacity-70"
      aria-label="Download question paper as PDF"
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      <span>Download as PDF</span>
    </motion.button>
  );
}
