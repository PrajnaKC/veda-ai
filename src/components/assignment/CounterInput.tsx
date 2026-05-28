"use client";

import { Button } from "@/components/common/Button";

type CounterInputProps = {
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
};

export function CounterInput({ label, value, min = 1, onChange }: CounterInputProps) {
  return (
    <div className="grid gap-2">
      <span className="text-xs font-semibold mb-1">{label}</span>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          className="w-8 h-8 rounded-full text-lg flex items-center justify-center"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          –
        </Button>
        <span className="min-w-8 text-center text-base font-medium">{value}</span>
        <Button
          type="button"
          variant="secondary"
          className="w-8 h-8 rounded-full text-lg flex items-center justify-center"
          onClick={() => onChange(value + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
