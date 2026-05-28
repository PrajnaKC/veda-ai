"use client";

import { useId } from "react";
import { twMerge } from "tailwind-merge";

type VedaAILogoProps = {
  className?: string;
  size?: number;
  title?: string;
};

export function VedaAILogo({ className, size = 40, title = "VedaAI logo" }: VedaAILogoProps) {
  const id = useId().replace(/:/g, "");
  const bgGradientId = `${id}-bg-gradient`;
  const highlightGradientId = `${id}-highlight-gradient`;
  const shadowFilterId = `${id}-shadow-filter`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={twMerge("shrink-0", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="40" height="40" rx="10" fill={`url(#${bgGradientId})`} />
      <rect width="40" height="40" rx="10" fill={`url(#${highlightGradientId})`} opacity="0.22" />
      <g filter={`url(#${shadowFilterId})`}>
        <path
          d="M10.6 12.2H15.9L20 24.2L24.1 12.2H29.4L22.2 27.8H17.8L10.6 12.2Z"
          fill="white"
        />
        <path
          d="M14.9 12.2H17.4L20 18.8L22.6 12.2H25.1L21.1 21.8H18.9L14.9 12.2Z"
          fill="white"
          opacity="0.18"
        />
      </g>
      <defs>
        <linearGradient id={bgGradientId} x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E56820" />
          <stop offset="1" stopColor="#D45E3E" />
        </linearGradient>
        <linearGradient
          id={highlightGradientId}
          x1="10"
          y1="6"
          x2="30"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.34" />
          <stop offset="0.45" stopColor="white" stopOpacity="0.08" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter
          id={shadowFilterId}
          x="-8"
          y="-6"
          width="56"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.16" />
          <feDropShadow dx="0" dy="4" stdDeviation="3.2" floodColor="#000000" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodColor="#FFFFFF" floodOpacity="0.18" />
        </filter>
      </defs>
    </svg>
  );
}
