"use client";

import { useUiStore } from "@/store/uiStore";
import { useFilteredAssignments } from "@/hooks/useFilteredAssignments";
import { AssignmentCard } from "./AssignmentCard";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function AssignmentGrid() {
  const { searchQuery } = useUiStore();
  const { assignments: filteredAssignments, loading, error } = useFilteredAssignments();

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-panel border border-dashed border-icon-soft/40 bg-surface/50 p-12 text-center">
        <p className="text-sm text-text-secondary">Loading assignments…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-panel border border-dashed border-brand-accent/30 bg-surface/50 p-12 text-center">
        <p className="max-w-sm text-sm text-text-secondary">{error}</p>
      </div>
    );
  }

  if (filteredAssignments.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center rounded-panel bg-surface/50 p-12 text-center border border-dashed border-icon-soft/40"
        aria-live="polite"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-orange/5 text-brand-orange mb-4">
          <IconPlaceholder name="search" className="size-6 text-brand-orange" />
        </span>
        <h3 className="text-lg font-bold text-text-primary">
          No assignments found
        </h3>
        <p className="mt-1 text-sm text-text-secondary max-w-xs">
          We couldn&apos;t find any assignments matching &ldquo;{searchQuery}&rdquo;. Try modifying your search keywords.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 gap-6 pb-24 md:grid-cols-2 lg:gap-[16px]"
      aria-label="Assignments Grid"
    >
      {filteredAssignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
