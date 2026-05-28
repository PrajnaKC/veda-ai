import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <label className="grid gap-1 text-sm">
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        id={inputId}
        className={twMerge("w-full rounded border border-neutral-300 px-3 py-2", className)}
        {...props}
      />
    </label>
  );
}
