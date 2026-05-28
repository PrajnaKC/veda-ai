"use client";

import Link from "next/link";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function FloatingCreateButton() {
  return (
    <div className="hidden lg:block">
      <Link 
        href="/assignments/create"
        className="fixed bottom-8 left-[calc(50%+152px)] -translate-x-1/2 z-40"
      >
        <button
          type="button"
          aria-label="Create new assignment"
          className="flex items-center justify-center gap-2.5 rounded-pill border border-white/15 bg-gradient-button px-7 py-4 text-sm font-bold text-white shadow-button ring-offset-2 hover:brightness-115 hover:scale-105 active:scale-98 active:brightness-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
        >
          <IconPlaceholder name="plus" className="size-4 text-white" />
          <span>Create Assignment</span>
        </button>
      </Link>
    </div>
  );
}
