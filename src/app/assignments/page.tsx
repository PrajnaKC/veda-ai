import { Suspense } from "react";
import { AssignmentsPageContent } from "@/components/dashboard/AssignmentsPageContent";

function AssignmentsPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[373px] justify-center px-2.5 py-12 lg:max-w-[1100px]">
      <p className="text-sm text-text-secondary">Loading assignments…</p>
    </div>
  );
}

export default function AssignmentsPage() {
  return (
    <Suspense fallback={<AssignmentsPageFallback />}>
      <AssignmentsPageContent />
    </Suspense>
  );
}
