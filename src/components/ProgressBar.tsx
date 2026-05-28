import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4 w-full max-w-lg mx-auto my-8" aria-label="Progress bar">
      <div className="flex-1 h-2 rounded-full bg-neutral-200 relative">
        <div
          className={clsx(
            'h-2 rounded-full transition-all',
            step >= 1 ? 'bg-neutral-900 w-1/2' : 'bg-neutral-200 w-0'
          )}
        />
      </div>
      <div className={clsx(
        'w-6 h-6 rounded-full flex items-center justify-center border-2',
        step === 1 ? 'bg-neutral-900 border-neutral-900 text-white' : 'bg-white border-neutral-200 text-neutral-400'
      )}>
        1
      </div>
      <div className="flex-1 h-2 rounded-full bg-neutral-200 relative">
        <div
          className={clsx(
            'h-2 rounded-full transition-all',
            step === 2 ? 'bg-neutral-900 w-full' : 'bg-neutral-200 w-0'
          )}
        />
      </div>
      <div className={clsx(
        'w-6 h-6 rounded-full flex items-center justify-center border-2',
        step === 2 ? 'bg-neutral-900 border-neutral-900 text-white' : 'bg-white border-neutral-200 text-neutral-400'
      )}>
        2
      </div>
    </div>
  );
}
