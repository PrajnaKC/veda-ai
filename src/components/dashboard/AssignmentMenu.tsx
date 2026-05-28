"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useUiStore } from "@/store/uiStore";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import type { MockAssignment } from "@/store/uiStore";

interface AssignmentMenuProps {
  assignment: MockAssignment;
}

export function AssignmentMenu({ assignment }: AssignmentMenuProps) {
  const { dropdownOpenId, setDropdownOpenId, setSelectedAssignment } = useUiStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const isOpen = dropdownOpenId === assignment.id;

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpenId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setDropdownOpenId]);

  // Handle keyboard events (Escape to close, basic tab/arrow trap)
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpenId(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    
    // Auto focus first item on open for screen-readers & keyboard users
    if (firstItemRef.current) {
      firstItemRef.current.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setDropdownOpenId]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-10 z-50 w-48 origin-top-right rounded-xl bg-surface p-1.5 shadow-sidebar border border-icon-soft/10 ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`assignment-menu-trigger-${assignment.id}`}
    >
      <div className="py-1" role="none">
        <Link
          ref={firstItemRef}
          href={`/assignments/${assignment.id}`}
          onClick={() => {
            setDropdownOpenId(null);
            setSelectedAssignment(assignment);
          }}
          className="flex w-full items-center gap-3.5 rounded-lg px-3 py-2 text-left text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
          role="menuitem"
        >
          <IconPlaceholder name="assignment" className="size-4 text-icon-default" />
          <span>View Assignment</span>
        </Link>

        <hr className="my-1 border-icon-soft/10" />

        <button
          type="button"
          onClick={async () => {
            const response = await fetch(`/api/assignments/${assignment.id}`, { method: "DELETE" });

            if (response.ok) {
              setDropdownOpenId(null);
              window.location.href = "/assignments";
              return;
            }

            setDropdownOpenId(null);
          }}
          className="flex w-full items-center gap-3.5 rounded-lg px-3 py-2 text-left text-sm font-semibold text-icon-danger hover:bg-icon-danger/5 transition"
          role="menuitem"
        >
          <IconPlaceholder name="trash" className="size-4 text-icon-danger" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
