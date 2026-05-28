import { useId } from "react";
import { twMerge } from "tailwind-merge";

type DesktopLogoProps = {
  className?: string;
};

export function DesktopLogo({ className }: DesktopLogoProps) {
  const id = useId().replace(/:/g, "");
  const bgGradientId = `${id}-bg`;
  const highlightGradientId = `${id}-highlight`;
  const shadowId = `${id}-shadow`;

  return (
    <header className={twMerge("hidden items-center gap-3 px-5 py-4 lg:flex", className)} aria-label="VedaAI Logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        role="img"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={bgGradientId} x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E56820" />
            <stop offset="1" stopColor="#D45E3E" />
          </linearGradient>
          <linearGradient id={highlightGradientId} x1="10" y1="6" x2="30" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id={shadowId} x="-8" y="-6" width="56" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.16" />
            <feDropShadow dx="0" dy="4" stdDeviation="3.2" floodColor="#000000" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodColor="#FFFFFF" floodOpacity="0.18" />
          </filter>
        </defs>
        <rect width="40" height="40" rx="10" fill={`url(#${bgGradientId})`} />
        <rect width="40" height="40" rx="10" fill={`url(#${highlightGradientId})`} opacity="0.22" />
        <g filter={`url(#${shadowId})`}>
          <path d="M10.6 12.2H15.9L20 24.2L24.1 12.2H29.4L22.2 27.8H17.8L10.6 12.2Z" fill="#FFFFFF" />
          <path d="M14.9 12.2H17.4L20 18.8L22.6 12.2H25.1L21.1 21.8H18.9L14.9 12.2Z" fill="#FFFFFF" opacity="0.18" />
        </g>
      </svg>
      <span className="font-display text-[22px] font-bold leading-none text-[#303030]">VedaAI</span>
    </header>
  );
}