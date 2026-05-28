"use client";

import { useUiStore } from "@/store/uiStore";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function FilterBar() {
  const { searchQuery, setSearchQuery, filterValue, setFilterValue } = useUiStore();

  return (
    <section 
      className="flex flex-col gap-4 rounded-panel bg-surface-glass p-4 shadow-sm backdrop-blur-nav border border-white/20 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5"
      aria-label="Filter and search toolbar"
    >
      {/* Left: Filter Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setFilterValue(filterValue === "All" ? "Active" : "All")}
          className="inline-flex items-center gap-2 rounded-lg bg-surface/50 px-3.5 py-1.5 text-sm font-semibold text-text-primary border border-icon-soft/20 hover:bg-surface-muted transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"
          aria-label={`Current filter is ${filterValue}. Click to toggle filter.`}
        >
          <IconPlaceholder name="filter" className="text-icon-default size-4" />
          <span className="text-text-primary">Filter By</span>
          <span className="rounded-full bg-brand-orange/10 px-2 py-0.5 text-xs font-bold text-brand-orange">
            {filterValue}
          </span>
        </button>
      </div>

      {/* Right: Search Box */}
      <div className="relative w-full sm:max-w-xs md:max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <IconPlaceholder name="search" className="size-4 text-icon-muted" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Assignment"
          className="w-full rounded-pill border border-icon-soft bg-surface/85 py-2 pl-11 pr-4 text-sm text-text-primary placeholder-text-muted outline-none ring-offset-2 transition hover:bg-surface focus:border-brand-accent focus:bg-surface focus:ring-2 focus:ring-brand-accent/20"
          aria-label="Search Assignments"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-text-muted hover:text-text-primary text-xs font-bold transition"
            aria-label="Clear search query"
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
}
