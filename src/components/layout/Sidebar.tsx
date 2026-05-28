"use client";

import Link from "next/link";
import { AvatarPlaceholder } from "@/components/common/AvatarPlaceholder";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { DesktopLogo } from "@/components/layout/DesktopLogo";
import { DesktopSubscriptionCard } from "@/components/layout/DesktopSubscriptionCard";
import { useAssignmentCount } from "@/hooks/useAssignmentCount";
import { useUiStore } from "@/store/uiStore";

type NavItem = {
  label: string;
  href: string;
  icon: "home" | "groups" | "assignment" | "toolkit" | "library";
  badge?: number | null;
};

export function Sidebar() {
  const { selectedNav, setSelectedNav } = useUiStore();
  const { count: assignmentCount } = useAssignmentCount();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: "home" },
    { label: "My Groups", href: "#", icon: "groups" },
    { label: "Assignments", href: "/assignments", icon: "assignment", badge: assignmentCount },
    { label: "AI Teacher's Toolkit", href: "#", icon: "toolkit" },
    { label: "My Library", href: "#", icon: "library" }
  ] as const;

  return (
    <Card
      as="aside"
      aria-label="Primary navigation"
      className="hidden h-[calc(100vh-2rem)] max-h-sidebar-panel w-sidebar shrink-0 flex-col overflow-y-auto p-6 shadow-sidebar lg:flex"
    >
      <DesktopLogo />

      <Link href="/assignments/create" className="mt-16">
        <Button
          type="button"
          variant="glossy"
          size="lg"
          className="w-full"
          aria-label="Create assignment"
        >
          <IconPlaceholder name="sparkle" className="text-text-inverse" />
          Create Assignment
        </Button>
      </Link>

      <nav className="mt-16 grid gap-3" aria-label="Sidebar links">
        {navItems.map((item) => {
          const active = selectedNav === item.label;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSelectedNav(item.label)}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "flex items-center gap-3 rounded-lg bg-surface-muted px-4 py-3 font-semibold text-text-primary"
                  : "flex items-center gap-3 rounded-lg px-4 py-3 text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
              }
            >
              <IconPlaceholder
                name={item.icon}
                className={active ? "text-icon-default" : "text-icon-muted"}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge !== null ? (
                <span
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[10px] font-bold text-white shadow-sm"
                  aria-label={`${item.badge} assignments in database`}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-6">
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
        >
          <IconPlaceholder name="settings" />
          <span>Settings</span>
        </button>

        <DesktopSubscriptionCard />

        <section className="flex items-center gap-4 rounded-panel bg-surface-muted p-4" aria-label="School profile">
          <AvatarPlaceholder label="Delhi Public School" size="lg" />
          <div className="min-w-0">
            <p className="truncate font-bold text-text-primary">Delhi Public School</p>
            <p className="truncate text-sm text-text-secondary">Bokaro Steel City</p>
          </div>
        </section>
      </div>
    </Card>
  );
}
