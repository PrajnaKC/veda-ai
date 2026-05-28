"use client";

import { useFilteredAssignments } from "@/hooks/useFilteredAssignments";
import { useUiStore } from "@/store/uiStore";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { MobileAssignmentCard } from "./MobileAssignmentCard";

export function MobileAssignmentList() {
  const { assignments: filteredAssignments, loading, error } = useFilteredAssignments();
  const { searchQuery } = useUiStore();

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-panel border border-dashed border-icon-soft/40 bg-surface/60 px-6 py-12 text-center">
        <p className="text-sm text-text-secondary">Loading assignments…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-panel border border-dashed border-brand-accent/30 bg-surface/60 px-6 py-12 text-center">
        <p className="text-sm text-text-secondary">{error}</p>
      </div>
    );
  }

  if (filteredAssignments.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-panel border border-dashed border-icon-soft/40 bg-surface/60 px-6 py-12 text-center"
        aria-live="polite"
      >
        <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
          <IconPlaceholder name="search" size="md" className="text-brand-orange" />
        </span>
        <h3 className="text-base font-bold text-text-primary">No assignments found</h3>
        <p className="mt-1 max-w-xs text-sm text-text-secondary">
          {searchQuery.trim()
            ? `No results for "${searchQuery}". Try a different search.`
            : "No assignments match the current filter."}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4" aria-label="Assignments list">
      {filteredAssignments.map((assignment) => (
        <li key={assignment.id}>
          <MobileAssignmentCard assignment={assignment} />
        </li>
      ))}
    </ul>
  );
}
