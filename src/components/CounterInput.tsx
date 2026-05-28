import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface CounterInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
  min?: number;
}

export default function CounterInput({ value, onIncrement, onDecrement, label, min = 1 }: CounterInputProps) {
  return (
    <div className="flex flex-col items-center gap-1" aria-label={label}>
      <span className="text-xs text-neutral-500 mb-1">{label}</span>
      <div className="flex items-center bg-white rounded-full shadow px-2 py-1 gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onDecrement}
          className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
        >
          <Minus className="w-4 h-4 text-neutral-500" />
        </motion.button>
        <span className="font-semibold text-neutral-800 w-6 text-center">{value}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onIncrement}
          className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-4 h-4 text-neutral-500" />
        </motion.button>
      </div>
    </div>
  );
}
