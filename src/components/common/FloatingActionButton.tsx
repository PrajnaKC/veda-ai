"use client";

import Link from "next/link";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function FloatingActionButton() {
  return (
    <Link
      href="/assignments/create"
      aria-label="Create assignment"
      className="fixed bottom-[132px] right-3 z-50 inline-flex size-11 items-center justify-center rounded-full bg-surface/90 text-brand-accent shadow-soft backdrop-blur-nav transition hover:bg-surface active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent min-[380px]:bottom-[140px] min-[380px]:right-4 min-[380px]:size-14 lg:hidden"
    >
      <IconPlaceholder name="plus" size="md" className="text-brand-accent" />
    </Link>
  );
}
