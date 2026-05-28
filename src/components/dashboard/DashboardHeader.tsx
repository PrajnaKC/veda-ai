"use client";

export function DashboardHeader() {
  return (
    <header 
      className="flex flex-col justify-center gap-4 py-6 md:py-8 lg:h-[162px] lg:gap-[16px]"
      aria-label="Assignments Dashboard Header"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-3.5 w-3.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></span>
        </span>
        <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
          Live System Active
        </span>
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          Assignments
        </h1>
        <p className="mt-1 text-sm font-medium text-text-secondary md:text-base">
          Manage and create assignments for your classes.
        </p>
      </div>
    </header>
  );
}
