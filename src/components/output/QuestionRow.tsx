"use client";

import { DifficultyBadge, type DifficultyType } from "./DifficultyBadge";

type QuestionRowProps = {
  index: number;
  text: string;
  difficulty: DifficultyType;
  marks: number;
};

export function QuestionRow({ index, text, difficulty, marks }: QuestionRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 last:border-b-0 group hover:bg-neutral-50/40 px-2 rounded-lg transition-colors">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="shrink-0 mt-[2px]">
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <span className="font-bold text-neutral-800 text-[15px] sm:text-[16px] shrink-0">
          {index}.
        </span>
        <span className="text-neutral-800 text-[15px] sm:text-[16px] leading-relaxed break-words">
          {text}
        </span>
      </div>
      <div className="shrink-0 text-right font-semibold text-neutral-700 text-[14px] sm:text-[15px] whitespace-nowrap pt-[2px]">
        [{marks} {marks === 1 ? "Mark" : "Marks"}]
      </div>
    </div>
  );
}
