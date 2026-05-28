"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { QuestionPaperPreview } from "@/components/QuestionPaperPreview";
import { ResponseBanner } from "@/components/ResponseBanner";
import { Sidebar } from "@/components/Sidebar";
import { questionPaperData } from "@/data/questionPaper";
import { useQuestionPaperStore } from "@/store/questionPaperStore";

export function QuestionPaperOutputShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const setPaperData = useQuestionPaperStore((state) => state.setPaperData);
  const paperData = useQuestionPaperStore((state) => state.paperData);

  useEffect(() => {
    setPaperData(questionPaperData);
  }, [setPaperData]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#E6E6E6] text-[#2B2B2B]">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <Navbar onOpenSidebar={() => setMobileOpen(true)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="absolute left-3 right-3 top-[80px] bottom-3 flex min-h-0 flex-col gap-2 rounded-[32px] bg-[#5E5E5E] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.12)] lg:left-[327px] lg:right-auto lg:w-[1100px]"
        aria-label="Generated question paper output"
      >
        <ResponseBanner text={paperData.responseMessage} paperData={paperData} />
        <QuestionPaperPreview paperData={paperData} />
      </motion.main>
    </div>
  );
}
