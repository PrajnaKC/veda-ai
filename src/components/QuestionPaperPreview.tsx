"use client";

import { motion } from "framer-motion";
import { QuestionPaper } from "@/components/output/QuestionPaper";
import type { QuestionPaperData } from "@/data/questionPaper";

type QuestionPaperPreviewProps = {
  paperData: QuestionPaperData;
};

export function QuestionPaperPreview({ paperData }: QuestionPaperPreviewProps) {
  // Map QuestionPaperData to the unified QuestionPaper component props
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

  const instructionsList = [
    "Attempt all questions.",
    "Use diagrams where necessary.",
    "Answer in neat handwriting.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      className="min-h-0 flex-1 overflow-y-auto w-full pr-1 scrollbar-thin"
      aria-label="Question paper preview container"
    >
      <QuestionPaper
        schoolName={paperData.school}
        examTitle="MID TERM EXAMINATION"
        subject={paperData.subject}
        className={paperData.className}
        duration={paperData.timeAllowed}
        maximumMarks={paperData.maximumMarks}
        instructions={instructionsList}
        sections={mappedSections}
        answerKey={mappedAnswerKey}
      />
    </motion.div>
  );
}
