import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type IconName =
  | "sparkle"
  | "home"
  | "groups"
  | "assignment"
  | "toolkit"
  | "library"
  | "settings"
  | "back"
  | "grid"
  | "bell"
  | "chevron"
  | "plus"
  | "menu"
  | "lock"
  | "share"
  | "filter"
  | "search"
  | "more-vertical"
  | "trash";

type IconPlaceholderProps = HTMLAttributes<HTMLSpanElement> & {
  name: IconName;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8"
};

export function IconPlaceholder({ name, label, size = "md", className, ...props }: IconPlaceholderProps) {
  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={twMerge("inline-flex shrink-0 items-center justify-center text-icon-muted", sizeClass[size], className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {renderIcon(name)}
      </svg>
    </span>
  );
}

function renderIcon(name: IconName) {
  switch (name) {
    case "sparkle":
      return (
        <>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
        </>
      );
    case "home":
      return (
        <>
          <path d="M4 4h6v6H4z" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6H4z" />
          <path d="M14 14h6v6h-6z" />
        </>
      );
    case "groups":
      return (
        <>
          <path d="M4 7h16v10H4z" />
          <path d="M8 11l3 3 5-5" />
        </>
      );
    case "assignment":
      return (
        <>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h5" />
          <path d="M10 12h5" />
          <path d="M10 16h4" />
        </>
      );
    case "toolkit":
      return (
        <>
          <path d="M6 4h12v16H6z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
        </>
      );
    case "library":
      return (
        <>
          <path d="M12 3a9 9 0 1 0 9 9h-9z" />
          <path d="M12 3v9h9" />
        </>
      );
    case "settings":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.8-1L14.4 3h-4l-.4 3.1a8 8 0 0 0-1.8 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.8 1l.4 3.1h4l.4-3.1a8 8 0 0 0 1.8-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z" />
        </>
      );
    case "back":
      return <path d="M15 5l-7 7 7 7" />;
    case "grid":
      return (
        <>
          <path d="M4 4h6v6H4z" />
          <path d="M14 4h6v6h-6z" />
          <path d="M4 14h6v6H4z" />
          <path d="M14 14h6v6h-6z" />
        </>
      );
    case "bell":
      return (
        <>
          <path d="M18 16H6c1-1 1.5-2.4 1.5-4V9a4.5 4.5 0 0 1 9 0v3c0 1.6.5 3 1.5 4z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </>
      );
    case "chevron":
      return <path d="M6 9l6 6 6-6" />;
    case "plus":
      return (
        <>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      );
    case "lock":
      return (
        <>
          <rect x="6" y="10" width="12" height="10" rx="2" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" />
        </>
      );
    case "share":
      return (
        <>
          <path d="M12 4v10" />
          <path d="M8 8l4-4 4 4" />
          <path d="M6 12v7h12v-7" />
        </>
      );
    case "filter":
      return <path d="M22 3H2l8 9v6l4 2v-8L22 3z" />;
    case "search":
      return (
        <>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </>
      );
    case "more-vertical":
      return (
        <>
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </>
      );
    case "trash":
      return (
        <>
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </>
      );
  }
}
