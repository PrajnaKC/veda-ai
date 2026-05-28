"use client";

export type DifficultyType = "easy" | "medium" | "moderate" | "hard" | "challenging" | "Easy" | "Moderate" | "Challenging" | string;

type DifficultyBadgeProps = {
  difficulty: DifficultyType;
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const diffNormalized = difficulty.toLowerCase().trim();

  let colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let label = "EASY";

  if (diffNormalized === "moderate" || diffNormalized === "medium") {
    colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
    label = "MODERATE";
  } else if (diffNormalized === "hard" || diffNormalized === "challenging") {
    colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
    label = "HARD";
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colorClasses}`}
    >
      {label}
    </span>
  );
}
