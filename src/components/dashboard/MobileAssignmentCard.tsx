"use client";

import type { MockAssignment } from "@/store/uiStore";
import { useUiStore } from "@/store/uiStore";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { AssignmentMenu } from "./AssignmentMenu";

interface MobileAssignmentCardProps {
  assignment: MockAssignment;
}

export function MobileAssignmentCard({ assignment }: MobileAssignmentCardProps) {
  const { dropdownOpenId, setDropdownOpenId, setSelectedAssignment } = useUiStore();
  const isMenuOpen = dropdownOpenId === assignment.id;

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAssignment(assignment);
    setDropdownOpenId(isMenuOpen ? null : assignment.id);
  };

  return (
    <article className="relative rounded-panel border border-icon-soft/15 bg-surface p-4 shadow-soft transition active:scale-[0.99] hover:border-brand-accent/20">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-base font-bold leading-snug text-text-primary">
          {assignment.title}
        </h2>

        <div className="relative shrink-0">
          <button
            id={`assignment-menu-trigger-${assignment.id}`}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-label={`Open options for ${assignment.title}`}
            className={`inline-flex size-9 items-center justify-center rounded-full transition ${
              isMenuOpen
                ? "bg-surface-muted text-text-primary"
                : "text-icon-muted hover:bg-surface-muted hover:text-text-primary"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent`}
          >
            <IconPlaceholder name="more-vertical" size="sm" />
          </button>
          <AssignmentMenu assignment={assignment} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
        <p>
          <span className="font-medium text-text-secondary">Assigned on :</span>{" "}
          <span className="font-semibold text-text-primary">{assignment.assignedOn}</span>
        </p>
        <p>
          <span className="font-medium text-text-secondary">Due :</span>{" "}
          <span className="font-semibold text-text-primary">{assignment.dueDate}</span>
        </p>
      </div>
    </article>
  );
}
