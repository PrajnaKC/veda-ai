"use client";

import { motion } from "framer-motion";
import { PDFExportButton } from "@/components/output/PDFExportButton";
import type { QuestionPaperData } from "@/data/questionPaper";

type ResponseBannerProps = {
  text: string;
  paperData: QuestionPaperData;
};

export function ResponseBanner({ text, paperData }: ResponseBannerProps) {
  // Map QuestionPaperData to PDFExportButton props
  const mappedSections = paperData.sections.map((sec) => ({
    title: sec.title,
    subtitle: sec.subtitle,
    instruction: sec.helperText,
    questions: sec.questions.map((q) => ({
      text: q.text,
      difficulty: q.difficulty,
      marks: q.marks,
    })),
  }));

  const mappedAnswerKey = paperData.answerKey.map((e) => ({
    id: e.id,
    answer: e.answer,
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-[32px] bg-[rgba(24,24,24,0.8)] px-8 py-6 text-white shadow-[0_24px_40px_rgba(0,0,0,0.12)] gap-4 border border-white/10"
      aria-label="AI response banner"
    >
      <p className="max-w-4xl font-display text-[18px] sm:text-[20px] font-bold leading-[1.35] tracking-[-0.01em] text-white">
        {text}
      </p>
      <div className="shrink-0">
        <PDFExportButton
          schoolName={paperData.school}
          examTitle="MID TERM EXAMINATION"
          subject={paperData.subject}
          className={paperData.className}
          duration={paperData.timeAllowed}
          maximumMarks={paperData.maximumMarks}
          instructions={[
            "Attempt all questions.",
            "Use diagrams where necessary.",
            "Answer in neat handwriting.",
          ]}
          sections={mappedSections}
          answerKey={mappedAnswerKey}
        />
      </div>
    </motion.section>
  );
}
