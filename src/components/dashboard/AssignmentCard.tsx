"use client";

import { useUiStore, MockAssignment } from "@/store/uiStore";
import { Card } from "@/components/common/Card";
import { IconPlaceholder } from "@/components/common/IconPlaceholder";
import { AssignmentMenu } from "./AssignmentMenu";

interface AssignmentCardProps {
  assignment: MockAssignment;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const { dropdownOpenId, setDropdownOpenId } = useUiStore();

  const isMenuOpen = dropdownOpenId === assignment.id;

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMenuOpen) {
      setDropdownOpenId(null);
    } else {
      setDropdownOpenId(assignment.id);
    }
  };

  return (
    <Card
      as="article"
      className="relative flex flex-col justify-between p-7 shadow-md border border-neutral-200 hover:border-brand-orange/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/95 rounded-2xl"
    >
      {/* Top Row: Title + Overflow Trigger */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold leading-snug text-neutral-900 group-hover:text-brand-orange transition">
          {assignment.title}
        </h3>
        <div className="relative shrink-0">
          <button
            id={`assignment-menu-trigger-${assignment.id}`}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-label={`Open options for ${assignment.title}`}
            className={`inline-flex w-10 h-10 items-center justify-center rounded-full transition ${
              isMenuOpen
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange`}
          >
            <IconPlaceholder name="more-vertical" className="w-6 h-6" />
          </button>
          <AssignmentMenu assignment={assignment} />
        </div>
      </div>

      {/* Second Row: Date Metadata Grid with Typography Hierarchy */}
      <div className="grid grid-cols-2 gap-6 rounded-xl bg-neutral-50 p-5 border border-neutral-100">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
            Assigned On
          </span>
          <span className="text-base font-semibold text-neutral-800">
            {assignment.assignedOn}
          </span>
        </div>
        <div className="flex flex-col gap-1 border-l border-neutral-200 pl-6">
          <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
            Due Date
          </span>
          <span className="text-base font-semibold text-brand-orange">
            {assignment.dueDate}
          </span>
        </div>
      </div>
    </Card>
  );
}
