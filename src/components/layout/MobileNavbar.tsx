"use client";

import { useEffect, useState } from "react";
import { AvatarPlaceholder } from "@/components/common/AvatarPlaceholder";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { VedaLogo } from "@/components/common/VedaLogo";
import { useUiStore } from "@/store/uiStore";

function MobileSystemBar() {
  const [timeLabel, setTimeLabel] = useState(() => new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  }));

  useEffect(() => {
    const updateTime = () => {
      setTimeLabel(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit"
        })
      );
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="grid h-[105px] bg-chrome-dark px-2 pb-3 pt-4 text-text-inverse" aria-label="Mobile browser chrome">
      <div className="flex items-center justify-between px-6 text-sm font-semibold">
        <span aria-label={`Current time ${timeLabel}`}>{timeLabel}</span>
        <span aria-hidden="true" className="text-xs">|||</span>
      </div>
      <div className="mt-3 flex h-10 items-center gap-2 rounded-pill bg-chrome-bar px-4 text-sm">
        <button
          type="button"
          aria-label="Site security"
          className="inline-flex size-6 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <IconPlaceholder name="lock" size="sm" className="text-text-inverse" />
        </button>
        <span className="min-w-0 flex-1 truncate text-center">web-to-figma.design</span>
        <button
          type="button"
          aria-label="Share page"
          className="inline-flex size-6 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <IconPlaceholder name="share" size="sm" className="text-text-inverse" />
        </button>
      </div>
    </section>
  );
}

export function MobileNavbar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  return (
    <div className="lg:hidden">
      <MobileSystemBar />
      <header className="px-2 pt-3" aria-label="Mobile app header">
        <div className="flex h-[81px] items-center justify-between gap-3 rounded-panel border border-white/30 bg-surface-glass px-5 py-[18px] shadow-soft backdrop-blur-nav">
          <div className="flex min-w-0 items-center gap-2">
            <VedaLogo variant="mark" size={40} />
            <span className="truncate text-[28px] font-bold leading-5 tracking-[-0.06em] text-text-primary">
              VedaAI
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 min-[380px]:gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative inline-flex size-10 items-center justify-center rounded-full bg-surface-muted transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <IconPlaceholder name="bell" className="text-icon-default" />
              <span className="absolute right-2 top-1 size-2.5 rounded-full bg-brand-accent" aria-hidden="true" />
            </button>
            <AvatarPlaceholder label="John Doe" size="sm" />
            <button
              type="button"
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex size-9 items-center justify-center rounded transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <IconPlaceholder name="menu" className="text-icon-default" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
