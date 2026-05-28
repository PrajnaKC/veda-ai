import type { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement>> & {
  as?: "aside" | "section" | "article" | "div";
};

export function Card({ as = "div", children, className, ...props }: CardProps) {
  const Component = as;

  return (
    <Component className={twMerge("rounded-panel bg-surface", className)} {...props}>
      {children}
    </Component>
  );
}
