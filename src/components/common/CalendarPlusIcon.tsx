import React from "react";

export function CalendarPlusIcon({ className = "w-6 h-6 text-neutral-700" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M4 11h16M12 15v-2m0 0v2m0-2h2m-2 0H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
