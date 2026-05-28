import { AvatarPlaceholder } from "@/components/common/AvatarPlaceholder";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";

export function Navbar() {
  return (
    <header className="flex h-navbar items-center justify-between rounded-panel bg-surface-glass px-6" aria-label="Page header">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          aria-label="Go back"
          className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-icon-default transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <IconPlaceholder name="back" className="text-icon-default" />
        </button>
        <button
          type="button"
          aria-label="Open overview"
          className="inline-flex size-11 items-center justify-center rounded-full text-icon-muted transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <IconPlaceholder name="grid" className="text-icon-muted" />
        </button>
        <span className="truncate text-xl font-semibold text-text-muted">Assignment</span>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-11 items-center justify-center rounded-full transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <IconPlaceholder name="bell" className="text-icon-default" />
          <span className="absolute right-2 top-1 size-3 rounded-full bg-brand-accent" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Open user menu"
          className="flex items-center gap-3 rounded-pill px-2 py-1 transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <AvatarPlaceholder label="John Doe" />
          <span className="hidden font-semibold text-text-primary sm:inline">John Doe</span>
          <IconPlaceholder name="chevron" size="sm" className="hidden text-icon-default sm:inline-flex" />
        </button>
      </div>
    </header>
  );
}
