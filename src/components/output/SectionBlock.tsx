"use client";

import { QuestionRow } from "./QuestionRow";
import type { DifficultyType } from "./DifficultyBadge";

type QuestionItem = {
  text: string;
  difficulty: DifficultyType;
  marks: number;
  type?: string;
  options?: string[];
};

type SectionBlockProps = {
  title: string;
  subtitle?: string;
  instruction?: string;
  questions: QuestionItem[];
  startIndex: number;
};

export function SectionBlock({
  title,
  subtitle,
  instruction,
  questions,
  startIndex,
}: SectionBlockProps) {
  return (
    <section className="my-8 pb-6 border-b border-neutral-200 last:border-b-0 [page-break-inside:avoid] break-inside-avoid">
      <div className="flex flex-col items-center text-center mb-4">
        <h3 className="text-[22px] sm:text-[24px] font-bold text-neutral-900 uppercase tracking-widest leading-tight">
          {title}
        </h3>
        {subtitle && (
          <h4 className="text-[17px] sm:text-[18px] font-semibold text-neutral-800 uppercase tracking-wider mt-1">
            {subtitle}
          </h4>
        )}
        {instruction && (
          <p className="text-[15px] sm:text-[16px] italic text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            {instruction}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {questions.map((q, idx) => (
          <QuestionRow
            key={idx}
            index={startIndex + idx}
            text={q.text}
            difficulty={q.difficulty}
            marks={q.marks}
            type={q.type}
            options={q.options}
          />
        ))}
      </div>
    </section>
  );
}
