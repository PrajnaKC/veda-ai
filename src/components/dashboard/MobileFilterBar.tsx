"use client";

import { useUiStore } from "@/store/uiStore";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function MobileFilterBar() {
  const { searchQuery, setSearchQuery, filterValue, setFilterValue } = useUiStore();

  const toggleFilter = () => {
    setFilterValue(filterValue === "All" ? "Active" : "All");
  };

  return (
    <section
      className="flex items-center gap-3 rounded-panel border border-white/30 bg-surface-glass p-3 shadow-soft backdrop-blur-nav"
      aria-label="Filter and search toolbar"
    >
      <button
        type="button"
        onClick={toggleFilter}
        aria-label={`Filter assignments. Current filter: ${filterValue}. Tap to toggle.`}
        aria-pressed={filterValue !== "All"}
        className="inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-text-muted transition hover:text-text-primary active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        <IconPlaceholder name="filter" size="sm" className="text-icon-muted" />
        <span>Filter</span>
      </button>

      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <IconPlaceholder name="search" size="sm" className="text-icon-muted" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search Name"
          aria-label="Search assignments by name"
          className="w-full rounded-pill border border-icon-soft/60 bg-surface/90 py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition hover:border-icon-soft focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>
    </section>
  );
}
