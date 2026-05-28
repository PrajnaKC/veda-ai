import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

type DesktopSubscriptionCardProps = {
  className?: string;
};

export function DesktopSubscriptionCard({ className }: DesktopSubscriptionCardProps) {
  return (
    <Card
      as="section"
      aria-label="Subscription summary"
      className={twMerge(
        "rounded-panel border border-brand-orange/10 bg-[#FFF8F1] p-4 shadow-none",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-brand-orange/10 text-brand-orange">
          <IconPlaceholder name="sparkle" className="text-brand-orange" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">Subscription</p>
          <h2 className="mt-1 font-display text-[18px] font-bold text-text-primary">Starter plan</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Unlock more AI generations, richer exports, and team collaboration.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-orange ring-1 ring-brand-orange/15">
          Free
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="flex items-center justify-between text-xs font-medium text-text-secondary">
          <span>Monthly credits</span>
          <span>3 / 10 used</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-brand-orange to-brand-accent" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href="/subscription"
          className="inline-flex items-center justify-center rounded-pill bg-brand-dark px-4 py-2 text-sm font-semibold text-text-inverse transition hover:bg-brand-darker"
        >
          Upgrade
        </Link>
        <Link
          href="/subscription"
          className="inline-flex items-center justify-center rounded-pill border border-icon-soft bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
        >
          Manage
        </Link>
      </div>
    </Card>
  );
}