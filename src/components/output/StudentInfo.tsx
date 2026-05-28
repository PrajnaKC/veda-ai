"use client";

export function StudentInfo() {
  return (
    <section className="my-6 border border-neutral-300 rounded-xl p-5 bg-neutral-50/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-neutral-800 shrink-0">Name:</span>
          <div className="flex-1 border-b border-neutral-400 min-h-[22px]"></div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-neutral-800 shrink-0">Roll Number:</span>
          <div className="flex-1 border-b border-neutral-400 min-h-[22px]"></div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-semibold text-neutral-800 shrink-0">Section:</span>
          <div className="flex-1 border-b border-neutral-400 min-h-[22px]"></div>
        </div>
      </div>
    </section>
  );
}
