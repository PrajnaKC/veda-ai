import { twMerge } from "tailwind-merge";

type AvatarPlaceholderProps = {
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-10 text-sm",
  md: "size-12 text-base",
  lg: "size-16 text-lg"
};

export function AvatarPlaceholder({ label, size = "md", className }: AvatarPlaceholderProps) {
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span
      aria-label={label}
      className={twMerge(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-surface-muted font-bold text-text-primary",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
