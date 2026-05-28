"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

type MobileAssignmentsHeaderProps = {
  showBackButton?: boolean;
  backHref?: string;
};

export function MobileAssignmentsHeader({
  showBackButton = true,
  backHref = "/assignments?view=empty"
}: MobileAssignmentsHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex min-h-11 items-center justify-center" aria-label="Assignments page header">
      {showBackButton ? (
        backHref ? (
          <Link
            href={backHref}
            aria-label="Go back to empty assignments"
            className="absolute left-0 inline-flex size-10 items-center justify-center rounded-full bg-surface-muted text-icon-default transition hover:bg-surface active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <IconPlaceholder name="back" size="sm" className="text-icon-default" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="absolute left-0 inline-flex size-10 items-center justify-center rounded-full bg-surface-muted text-icon-default transition hover:bg-surface active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <IconPlaceholder name="back" size="sm" className="text-icon-default" />
          </button>
        )
      ) : null}
      <h1 className="text-lg font-bold tracking-tight text-text-primary">Assignments</h1>
    </header>
  );
}
