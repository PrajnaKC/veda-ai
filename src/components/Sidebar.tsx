"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, Home, LibraryBig, Settings2, Sparkles, UsersRound, X } from "lucide-react";
import { DesktopLogo } from "@/components/layout/DesktopLogo";
import { DesktopSubscriptionCard } from "@/components/layout/DesktopSubscriptionCard";
import { useAssignmentCount } from "@/hooks/useAssignmentCount";

type SidebarProps = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  active?: boolean;
  badge?: number | null;
};

function SidebarContent() {
  const { count: assignmentCount } = useAssignmentCount();

  const navItems: NavItem[] = [
    { label: "Home", href: "#", icon: Home, active: true },
    { label: "My Groups", href: "#", icon: UsersRound },
    { label: "Assignments", href: "#", icon: FolderOpen, badge: assignmentCount },
    { label: "AI Teacher Toolkit", href: "#", icon: Sparkles },
    { label: "My Library", href: "#", icon: LibraryBig }
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#272727] text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
          V
        </div>
        <span className="font-display text-[28px] font-bold leading-none tracking-[-0.03em] text-[#2B2B2B]">
          VedaAI
        </span>
      </div>

      <button
        type="button"
        className="mt-8 inline-flex h-[42px] items-center justify-center gap-2 rounded-full border border-[#FF5623]/40 bg-[#272727] px-5 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(255,86,35,0.45),0_10px_20px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
      >
        <Sparkles className="size-4" />
        AI Teacher&apos;s Toolkit
      </button>

      <nav className="mt-8 grid gap-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-[10px] px-3 py-2 text-[14px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]",
                item.active
                  ? "bg-[#F2F2F2] font-medium text-[#2B2B2B]"
                  : "text-[#7B7B7B] hover:bg-[#F7F7F7] hover:text-[#2B2B2B]"
              ].join(" ")}
            >
              <Icon className={item.active ? "size-4 text-[#2B2B2B]" : "size-4 text-[#8A8A8A]"} />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge !== null ? (
                <span
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF5623] px-1.5 text-[10px] font-bold text-white"
                  aria-label={`${item.badge} assignments in database`}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-4">
        <button
          type="button"
          className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-left text-[14px] text-[#7B7B7B] transition hover:bg-[#F7F7F7] hover:text-[#2B2B2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
        >
          <Settings2 className="size-4 text-[#8A8A8A]" />
          <span>Settings</span>
        </button>

        <DesktopSubscriptionCard className="hidden lg:block" />

        <section className="flex items-center gap-3 rounded-[16px] bg-[#F0F0F0] p-3" aria-label="School profile card">
          <div className="flex size-10 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#4A4A4A] shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
            DPS
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[#2B2B2B]">Delhi Public School</p>
            <p className="truncate text-[12px] text-[#7B7B7B]">Bokaro Steel City</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside
        className="fixed left-3 top-3 z-20 hidden h-[724px] w-[304px] overflow-hidden rounded-[16px] bg-white px-6 py-6 shadow-[0px_16px_48px_rgba(0,0,0,0.12),0px_32px_48px_rgba(0,0,0,0.2)] lg:block"
        aria-label="Sidebar navigation"
      >
        <DesktopLogo />
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            aria-hidden="true"
          >
            <motion.aside
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="flex h-full w-[304px] flex-col bg-white px-6 py-6 shadow-[0px_16px_48px_rgba(0,0,0,0.2)]"
              onClick={(event) => event.stopPropagation()}
              aria-label="Mobile sidebar navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#272727] text-sm font-bold text-white">
                    V
                  </div>
                  <span className="font-display text-[28px] font-bold tracking-[-0.03em] text-[#2B2B2B]">
                    VedaAI
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-[#F6F6F6] text-[#2B2B2B]"
                  onClick={onCloseMobile}
                  aria-label="Close navigation menu"
                >
                  <X className="size-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
