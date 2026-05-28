"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUiStore } from "@/store/uiStore";
import { useFilteredAssignments } from "@/hooks/useFilteredAssignments";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AssignmentGrid } from "@/components/dashboard/AssignmentGrid";
import { FloatingCreateButton } from "@/components/dashboard/FloatingCreateButton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { MobileAssignmentsHeader } from "@/components/dashboard/MobileAssignmentsHeader";
import { MobileFilterBar } from "@/components/dashboard/MobileFilterBar";
import { MobileAssignmentList } from "@/components/dashboard/MobileAssignmentList";
import { FloatingActionButton } from "@/components/common/FloatingActionButton";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function AssignmentsPageContent() {
  const searchParams = useSearchParams();
  const isExplicitEmptyView = searchParams.get("view") === "empty";
  const isExplicitFilledView = searchParams.get("view") === "filled";
  const { setSelectedNav, setActiveMobileTab } = useUiStore();
  const { assignments, loading } = useFilteredAssignments();
  const shouldShowEmptyState = isExplicitEmptyView || (!loading && assignments.length === 0 && !isExplicitFilledView);

  useEffect(() => {
    setSelectedNav("Assignments");
    setActiveMobileTab("Assignments");
  }, [setSelectedNav, setActiveMobileTab]);

  if (shouldShowEmptyState) {
    return (
      <>
        {/* Page 1 — empty assignments (mobile) */}
        <div
          className="mx-auto flex w-full max-w-[373px] flex-col px-2.5 pb-6 lg:hidden"
          aria-label="Empty assignments"
        >
          <MobileAssignmentsHeader showBackButton={false} />
          <EmptyState />
          <MobileBottomNav />
        </div>

        {/* Page 1 — empty assignments (desktop) */}
        <div className="mx-auto hidden w-full max-w-[1100px] flex-1 lg:flex lg:items-center lg:justify-center">
          <EmptyState />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Page 2 — filled assignments dashboard (mobile) */}
      <div
        className="mx-auto flex w-full max-w-[373px] flex-col gap-6 px-2.5 pb-6 lg:hidden"
        aria-label="Mobile assignments dashboard"
      >
        <MobileAssignmentsHeader backHref="/assignments?view=empty" />
        <MobileFilterBar />
        <MobileAssignmentList />
        <FloatingActionButton />
        <MobileBottomNav />
      </div>

      {/* Page 2 — filled assignments dashboard (desktop) */}
      <div className="mx-auto hidden w-full max-w-[1100px] flex-col gap-3 px-0 lg:flex lg:gap-[12px]">
        <DashboardHeader />
        <FilterBar />
        <AssignmentGrid />
        <FloatingCreateButton />
      </div>
    </>
  );
}
