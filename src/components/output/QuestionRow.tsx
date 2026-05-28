"use client";

import { DifficultyBadge, type DifficultyType } from "./DifficultyBadge";

type QuestionRowProps = {
  index: number;
  text: string;
  difficulty: DifficultyType;
  marks: number;
  type?: string;
  options?: string[];
};

export function QuestionRow({ index, text, difficulty, marks, type, options }: QuestionRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 last:border-b-0 group hover:bg-neutral-50/40 px-2 rounded-lg transition-colors">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="shrink-0 mt-[2px]">
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <span className="font-bold text-neutral-800 text-[15px] sm:text-[16px] shrink-0">
          {index}.
        </span>
        <div className="text-neutral-800 text-[15px] sm:text-[16px] leading-relaxed break-words">
          <div className="font-medium mb-2">{text}</div>

          {/* Type-specific rendering hints */}
          {type === "mcq" && Array.isArray(options) && options.length > 0 && (
            <ul className="mt-2 pl-4 list-decimal text-sm text-neutral-700">
              {options.map((opt, i) => (
                <li key={i} className="mb-1">
                  {opt}
                </li>
              ))}
            </ul>
          )}

          {type === "numerical" && (
            <div className="mt-2 text-sm text-neutral-700 italic">Provide numerical answer. Units: {options?.[0] || "(units)"}</div>
          )}

          {type === "diagram" && (
            <div className="mt-2 p-3 border border-dashed border-neutral-200 rounded bg-neutral-50 text-sm text-neutral-700">
              <div className="font-semibold mb-1">Diagram required</div>
              <div>{(options && options[0]) || "Draw a suitable diagram showing relevant labels."}</div>
            </div>
          )}

          {type === "case" && (
            <div className="mt-3 p-3 bg-neutral-100 rounded text-sm text-neutral-800">
              <div className="font-semibold">Case study</div>
              <div className="mt-1 text-sm">{(options && options[0]) || "(Case text included above)"}</div>
            </div>
          )}

          {/* Show canonical answer if present (developer view) */}
        </div>
      </div>
      <div className="shrink-0 text-right font-semibold text-neutral-700 text-[14px] sm:text-[15px] whitespace-nowrap pt-[2px]">
        [{marks} {marks === 1 ? "Mark" : "Marks"}]
      </div>
    </div>
  );
}
