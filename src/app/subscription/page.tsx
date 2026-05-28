import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { DesktopSubscriptionCard } from "@/components/layout/DesktopSubscriptionCard";

const featureItems = [
  "Unlimited assignment generation",
  "Priority PDF rendering",
  "Shared school workspace",
  "Usage analytics and export history"
];

export default function SubscriptionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-2.5 py-6 lg:gap-8 lg:px-0">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Subscription</p>
        <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">Manage your plan</h1>
        <p className="max-w-2xl text-sm text-text-secondary md:text-base">
          Review your usage, unlock advanced features, and upgrade when your school needs more capacity.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <DesktopSubscriptionCard className="lg:self-start" />

        <Card as="section" aria-label="Subscription features" className="p-5">
          <h2 className="font-display text-xl font-bold text-text-primary">What you get</h2>
          <ul className="mt-4 grid gap-3 text-sm text-text-secondary">
            {featureItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg bg-surface-muted px-4 py-3">
                <span className="mt-1 inline-flex size-2 rounded-full bg-brand-orange" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="glossy" size="lg">
              Upgrade plan
            </Button>
            <Link
              href="/assignments"
              className="inline-flex items-center justify-center rounded-pill border border-icon-soft bg-surface px-5 py-4 text-base font-semibold text-text-primary transition hover:bg-surface-muted"
            >
              Back to assignments
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}