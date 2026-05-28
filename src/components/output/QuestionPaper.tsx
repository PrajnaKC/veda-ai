"use client";

import { PaperHeader } from "./PaperHeader";
import { StudentInfo } from "./StudentInfo";
import { SectionBlock } from "./SectionBlock";
import { AnswerKey } from "./AnswerKey";
import type { DifficultyType } from "./DifficultyBadge";

type QuestionItem = {
  text: string;
  difficulty: DifficultyType;
  marks: number;
};

type SectionItem = {
  title: string;
  subtitle?: string;
  instruction?: string;
  questions: QuestionItem[];
};

type AnswerKeyItem = {
  id: number | string;
  answer: string;
};

type QuestionPaperProps = {
  schoolName: string;
  schoolLogo?: string;
  examTitle?: string;
  subject: string;
  className: string;
  duration: string;
  maximumMarks: string | number;
  instructions: string[];
  sections: SectionItem[];
  answerKey?: AnswerKeyItem[];
};

export function QuestionPaper({
  schoolName,
  schoolLogo,
  examTitle,
  subject,
  className,
  duration,
  maximumMarks,
  instructions,
  sections,
  answerKey,
}: QuestionPaperProps) {
  return (
    <article className="mx-auto w-full max-w-[1060px] bg-white shadow-xl font-sans text-neutral-850 border border-neutral-200 p-6 md:p-8 rounded-[24px] md:rounded-[32px] [page-break-inside:avoid] break-inside-avoid">
      <PaperHeader
        schoolName={schoolName}
        schoolLogo={schoolLogo}
        examTitle={examTitle}
        subject={subject}
        className={className}
      />

      {/* META ROW */}
      <div className="flex justify-between items-center border-t-2 border-b-2 border-neutral-900 py-3 my-5 text-[16px] sm:text-[18px] font-bold text-neutral-950 uppercase tracking-tight">
        <span>Time Allowed: {duration}</span>
        <span>Maximum Marks: {maximumMarks}</span>
      </div>

      {/* INSTRUCTION BLOCK */}
      <div className="my-5 text-[15px] sm:text-[16px] text-neutral-800">
        <h4 className="font-bold mb-2">Instructions:</h4>
        <ul className="list-none space-y-1.5 pl-0">
          <li className="flex items-start gap-1">
            <span className="font-bold">•</span>
            <span>All questions are compulsory unless stated otherwise.</span>
          </li>
          {instructions.map((inst, index) => {
            // Strip leading bullets if present in string to avoid duplication
            const cleanInst = inst.replace(/^[•\-\*\s]+/, "");
            return (
              <li key={index} className="flex items-start gap-1">
                <span className="font-bold">•</span>
                <span>{cleanInst}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* STUDENT DETAILS SECTION */}
      <StudentInfo />

      {/* SECTIONS */}
      {sections && sections.length > 0 ? (
        (() => {
          let globalQuestionIndex = 1;
          return sections.map((sec, index) => {
            const currentStartIndex = globalQuestionIndex;
            globalQuestionIndex += sec.questions.length;
            return (
              <SectionBlock
                key={index}
                title={sec.title}
                subtitle={sec.subtitle}
                instruction={sec.instruction}
                questions={sec.questions}
                startIndex={currentStartIndex}
              />
            );
          });
        })()
      ) : (
        <p className="text-neutral-500 text-center py-8">
          No sections available in this question paper.
        </p>
      )}

      <p className="pt-2 text-[15px] sm:text-[16px] font-bold text-neutral-900 border-t border-neutral-100 mt-6 pb-2">
        End of Question Paper
      </p>

      {/* ANSWER KEY SECTION */}
      {answerKey && answerKey.length > 0 && (
        <AnswerKey answerKey={answerKey} />
      )}
    </article>
  );
}
