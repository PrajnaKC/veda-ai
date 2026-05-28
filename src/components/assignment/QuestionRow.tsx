"use client";

import type { QuestionType } from "@/types/assignment";

const questionOptions = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Answer Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "Case Study Questions"
];

type QuestionRowProps = {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export function QuestionRow({ value, onChange, onRemove, canRemove }: QuestionRowProps) {
  return (
    <>
      {/* Desktop view: aligned horizontal row */}
      <div className="hidden md:grid grid-cols-[1fr_24px_132px_132px] gap-4 items-center py-1">
        {/* Dropdown Select */}
        <div className="relative flex items-center justify-between px-4 py-2 border border-[#DADADA] rounded-2xl bg-white text-sm font-semibold h-11 shadow-sm hover:border-neutral-400 transition">
          <select
            value={value.type}
            onChange={(event) => onChange({ ...value, type: event.target.value })}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {questionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="truncate pr-4 text-[#303030]">{value.type}</span>
          <svg className="w-4 h-4 text-[#303030] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition shrink-0"
          aria-label="Remove question type"
        >
          <svg className="w-4 h-4 text-[#303030]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* No. of Questions counter pill */}
        <div className="flex items-center justify-between bg-white border border-[#DADADA] rounded-full h-[38px] px-2.5 w-[132px] shadow-sm">
          <button
            type="button"
            onClick={() => onChange({ ...value, count: Math.max(1, value.count - 1) })}
            className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
          >
            –
          </button>
          <span className="text-[#303030] font-semibold text-base">{value.count}</span>
          <button
            type="button"
            onClick={() => onChange({ ...value, count: value.count + 1 })}
            className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
          >
            +
          </button>
        </div>

        {/* Marks counter pill */}
        <div className="flex items-center justify-between bg-white border border-[#DADADA] rounded-full h-[38px] px-2.5 w-[132px] shadow-sm">
          <button
            type="button"
            onClick={() => onChange({ ...value, marks: Math.max(1, value.marks - 1) })}
            className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
          >
            –
          </button>
          <span className="text-[#303030] font-semibold text-base">{value.marks}</span>
          <button
            type="button"
            onClick={() => onChange({ ...value, marks: value.marks + 1 })}
            className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Mobile view: card layout */}
      <div className="md:hidden flex flex-col gap-3 bg-white rounded-[24px] p-3 shadow-sm border border-neutral-100 w-full">
        {/* Header (select + remove) */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 flex items-center justify-between px-4 py-2 border border-[#DADADA] rounded-full bg-white text-sm font-semibold h-11">
            <select
              value={value.type}
              onChange={(event) => onChange({ ...value, type: event.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {questionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="truncate pr-4 text-[#303030]">{value.type}</span>
            <svg className="w-4 h-4 text-[#303030] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 disabled:opacity-30 transition shrink-0"
            aria-label="Remove question type"
          >
            <svg className="w-4 h-4 text-[#303030]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Parameter row (grey card) */}
        <div className="flex gap-3 bg-[#F0F0F0] rounded-[24px] p-2 items-center justify-between w-full">
          {/* No of Questions */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[#303030] font-semibold text-xs text-center">No. of Questions</span>
            <div className="flex items-center justify-between bg-white rounded-full h-[38px] px-2 w-full shadow-sm">
              <button
                type="button"
                onClick={() => onChange({ ...value, count: Math.max(1, value.count - 1) })}
                className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
              >
                –
              </button>
              <span className="text-[#303030] font-semibold text-sm">{value.count}</span>
              <button
                type="button"
                onClick={() => onChange({ ...value, count: value.count + 1 })}
                className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Marks */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[#303030] font-semibold text-xs text-center">Marks</span>
            <div className="flex items-center justify-between bg-white rounded-full h-[38px] px-2 w-full shadow-sm">
              <button
                type="button"
                onClick={() => onChange({ ...value, marks: Math.max(1, value.marks - 1) })}
                className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
              >
                –
              </button>
              <span className="text-[#303030] font-semibold text-sm">{value.marks}</span>
              <button
                type="button"
                onClick={() => onChange({ ...value, marks: value.marks + 1 })}
                className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-[#5E5E5E] font-semibold text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
