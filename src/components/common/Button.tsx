import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "glossy";
  size?: "sm" | "md" | "lg";
};

export function Button({ children, className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const variants = {
    primary: "border border-brand-dark bg-brand-dark text-text-inverse hover:bg-brand-darker",
    secondary: "border border-icon-soft bg-surface text-text-primary hover:bg-surface-muted",
    ghost: "border border-transparent bg-transparent text-text-primary hover:bg-surface-muted",
    danger: "border border-brand-accent bg-surface text-brand-accent hover:bg-surface-muted",
    glossy: "rounded-pill border-2 border-brand-accent bg-gradient-button text-text-inverse shadow-button hover:brightness-110"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-7 py-4 text-base"
  };

  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-50",
        variant === "glossy" ? "" : "rounded",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
