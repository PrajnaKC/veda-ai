import Link from "next/link";
import { EmptyStateIllustration } from "./EmptyStateIllustration";

function PlusIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M10 4.5v11" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 10h11" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function EmptyState() {
  return (
    <section
      className="flex min-h-[calc(100dvh-356px)] flex-1 items-center justify-center py-6 lg:min-h-0 lg:py-0"
      aria-labelledby="empty-assignments-title"
    >
      <div className="flex w-full max-w-[486px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-3">
          <EmptyStateIllustration />
          <div className="flex w-full flex-col items-center gap-0.5 text-center">
            <h1
              id="empty-assignments-title"
              className="font-display text-xl font-bold leading-[1.4] tracking-[-0.04em] text-[#303030]"
            >
              No assignments yet
            </h1>
            <p className="font-display text-base font-normal leading-[1.4] tracking-[-0.04em] text-[rgba(94,94,94,0.8)]">
              Create your first assignment to start collecting and grading student submissions. You can set up
              rubrics, define marking criteria, and let AI assist with grading.
            </p>
          </div>
        </div>

        <Link
          href="/assignments/create"
          className="inline-flex h-[46px] w-[277px] max-w-full items-center justify-center gap-1 rounded-[48px] bg-[#181818] px-6 py-3 font-display text-base font-medium leading-[1.4] tracking-[-0.04em] text-white transition hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181818]"
          aria-label="Create your first assignment"
        >
          <PlusIcon />
          Create Your First Assignment
        </Link>
      </div>
    </section>
  );
}
