"use client";

import Link from "next/link";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { useUiStore } from "@/store/uiStore";

const mobileTabs = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Assignments", href: "/assignments", icon: "assignment" },
  { label: "Library", href: "#", icon: "library" },
  { label: "AI Toolkit", href: "#", icon: "sparkle" }
] as const;

export function MobileBottomNav() {
  const { activeMobileTab, setActiveMobileTab } = useUiStore();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-[157px] bg-[rgba(240,240,240,0.05)] px-2 pt-6 backdrop-blur-mobile lg:hidden">
      <nav
        aria-label="Mobile primary navigation"
        className="mx-auto grid h-[73px] max-w-[373px] grid-cols-4 items-center rounded-[22px] bg-navigation-dark px-4"
      >
        {mobileTabs.map((item) => {
          const active = activeMobileTab === item.label;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setActiveMobileTab(item.label)}
              className={
                active
                  ? "grid justify-items-center gap-1 text-xs font-semibold text-text-inverse"
                  : "grid justify-items-center gap-1 text-xs font-semibold text-text-secondary transition hover:text-text-inverse"
              }
            >
              <IconPlaceholder
                name={item.icon}
                size="md"
                className={active ? "text-text-inverse" : "text-text-secondary"}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
