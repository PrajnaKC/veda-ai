"use client";

type PaperHeaderProps = {
  schoolName: string;
  schoolLogo?: string;
  examTitle?: string;
  subject: string;
  className: string;
};

export function PaperHeader({
  schoolName,
  schoolLogo,
  examTitle,
  subject,
  className,
}: PaperHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center gap-2 border-b-2 border-neutral-800 pb-4 mb-4">
      {schoolLogo && (
        <div className="flex justify-center mb-3">
          <img
            src={schoolLogo}
            alt={`${schoolName} logo`}
            className="h-16 w-16 object-contain"
            onError={(e) => {
              // Hide image if failed to load
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
      <h1 className="text-[28px] sm:text-[32px] font-bold text-neutral-900 uppercase tracking-tight leading-none">
        {schoolName}
      </h1>
      {examTitle && (
        <h2 className="text-[18px] sm:text-[20px] font-bold text-neutral-800 uppercase tracking-wider">
          {examTitle}
        </h2>
      )}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[16px] sm:text-[18px] font-semibold text-neutral-700 mt-1">
        <span>Subject: <span className="font-normal">{subject}</span></span>
        <span className="hidden sm:inline text-neutral-400">|</span>
        <span>Class: <span className="font-normal">{className}</span></span>
      </div>
    </header>
  );
}
