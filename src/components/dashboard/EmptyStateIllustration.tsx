type EmptyStateIllustrationProps = {
  className?: string;
};

export function EmptyStateIllustration({ className }: EmptyStateIllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 300"
      className={className ?? "h-[300px] w-[300px] max-w-full"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="empty-bg-gradient" x1="150" y1="30" x2="150" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2F2F2" />
          <stop offset="1" stopColor="#EFEFEF" />
        </linearGradient>
        <linearGradient id="empty-lens-inner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.14" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFADAD" />
        </linearGradient>
        <filter id="empty-page-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="15" floodColor="#929292" floodOpacity="0.19" />
        </filter>
        <filter id="empty-cloud-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="6" dy="4" stdDeviation="6.5" floodColor="#1B778B" floodOpacity="0.09" />
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="150" cy="149" r="120" fill="url(#empty-bg-gradient)" />

      {/* Doodles — left star */}
      <path
        d="M44 112c48-15 62-48 62-48"
        stroke="#011625"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M43 112c-30 0-30-31 3-24 28 6 23 38-9 63"
        stroke="#011625"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M82 218l9 20 9-20 20-9-20-9-9-20-9 20-20 9 20 9z"
        stroke="#417BA4"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="285" cy="184" r="6" fill="#417BA4" />

      {/* Page card */}
      <g filter="url(#empty-page-shadow)">
        <rect x="88" y="64" width="125" height="155" rx="16" fill="#FFFFFF" />
      </g>

      {/* Skeleton content on page */}
      <rect x="100" y="88" width="50" height="10" rx="5" fill="#011625" />
      <rect x="100" y="108" width="100" height="10" rx="5" fill="#D5D5D5" />
      <rect x="100" y="128" width="100" height="10" rx="5" fill="#D5D5D5" />
      <rect x="100" y="148" width="100" height="10" rx="5" fill="#D5D5D5" />
      <rect x="100" y="168" width="100" height="10" rx="5" fill="#D5D5D5" />

      {/* Cloud */}
      <g filter="url(#empty-cloud-shadow)">
        <ellipse cx="258" cy="67" rx="35" ry="20" fill="#FFFFFF" />
        <ellipse cx="238" cy="72" rx="18" ry="14" fill="#FFFFFF" />
        <ellipse cx="272" cy="74" rx="22" ry="16" fill="#FFFFFF" />
      </g>
      <circle cx="244" cy="67" r="6" fill="#CCC6D9" />
      <rect x="256" y="61" width="32" height="12" rx="6" fill="#D5D5D5" />

      {/* Magnifying glass */}
      <circle cx="204" cy="163" r="76" fill="#CCC6D9" />
      <circle cx="204" cy="163" r="76" fill="#17CB9E" fillOpacity="0.35" />
      <circle cx="204" cy="163" r="62.5" fill="#E1DCEB" />
      <circle cx="204" cy="163" r="53" fill="url(#empty-lens-inner)" />
      <circle cx="204" cy="163" r="54.5" fill="rgba(255,255,255,0.3)" />

      {/* Red close on lens */}
      <circle cx="204" cy="163" r="25" fill="#FF4040" />
      <path d="M192 151l24 24M216 151l-24 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

      {/* Handle */}
      <path
        d="M252 210l38 42"
        stroke="#E1DCEB"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M248 206l42 46"
        stroke="#CCC6D9"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}
