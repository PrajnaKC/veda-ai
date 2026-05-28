"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bell, ChevronDown, Menu, Sparkles } from "lucide-react";

type NavbarProps = {
  onOpenSidebar?: () => void;
};

export function Navbar({ onOpenSidebar }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-3 right-3 top-3 z-30 flex h-14 items-center justify-between gap-2 rounded-[16px] bg-[rgba(255,255,255,0.75)] px-3 pl-6 pr-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-[4px] lg:left-[327px] lg:w-[1100px] lg:right-auto lg:px-3 lg:pl-6"
      aria-label="Top navigation"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#2B2B2B] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </button>

        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#2B2B2B] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </button>

        <div className="flex items-center gap-2 text-[18px] font-semibold text-[#A9A9A9]">
          <Sparkles className="size-4 text-[#A9A9A9]" />
          <span>Create New</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-9 items-center justify-center rounded-full bg-[#F6F6F6] text-[#2B2B2B] transition hover:-translate-y-0.5 hover:bg-[#F0F0F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
        >
          <Bell className="size-4" />
          <span className="absolute right-[10px] top-[8px] size-2 rounded-full bg-[#FF5623]" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Open profile menu"
          className="flex items-center gap-2 rounded-full bg-transparent px-2 py-1.5 text-[#2B2B2B] transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
        >
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[linear-gradient(180deg,#F0D3BD_0%,#D7A16E_100%)] text-[11px] font-bold text-[#2B2B2B]">
            JD
          </span>
          <span className="hidden text-[14px] font-semibold text-[#2B2B2B] sm:inline">John Doe</span>
          <ChevronDown className="hidden size-4 text-[#2B2B2B] sm:inline" />
        </button>
      </div>
    </motion.header>
  );
}
