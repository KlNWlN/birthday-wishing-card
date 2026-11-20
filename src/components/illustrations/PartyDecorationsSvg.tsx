import React from 'react';

export const BuntingFlagsSvg: React.FC<{ className?: string }> = ({
  className = "w-full h-12"
}) => {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      {/* Curved Hanging Line */}
      <path
        d="M-10 15 Q150 40 300 25 Q450 40 610 15"
        stroke="#E2D4C6"
        strokeWidth="2"
        fill="none"
      />
      {/* Pennants */}
      {/* 1 */}
      <polygon points="20,17 50,19 35,52" fill="#FCE7EF" stroke="#EAAFC1" strokeWidth="1" />
      {/* 2 */}
      <polygon points="70,21 100,24 85,58" fill="#FDE8E0" stroke="#EBBCAE" strokeWidth="1" />
      {/* 3 */}
      <polygon points="120,26 150,28 135,63" fill="#E8E3F5" stroke="#C5B8DE" strokeWidth="1" />
      {/* 4 */}
      <polygon points="170,28 200,29 185,65" fill="#E2F0D9" stroke="#B8D4A8" strokeWidth="1" />
      {/* 5 */}
      <polygon points="220,28 250,26 235,63" fill="#FCE7EF" stroke="#EAAFC1" strokeWidth="1" />
      {/* 6 */}
      <polygon points="270,25 300,25 285,60" fill="#FDE08A" stroke="#E5B94B" strokeWidth="1" />
      {/* 7 */}
      <polygon points="320,26 350,28 335,63" fill="#E8E3F5" stroke="#C5B8DE" strokeWidth="1" />
      {/* 8 */}
      <polygon points="370,29 400,30 385,65" fill="#FCE7EF" stroke="#EAAFC1" strokeWidth="1" />
      {/* 9 */}
      <polygon points="420,30 450,29 435,64" fill="#E2F0D9" stroke="#B8D4A8" strokeWidth="1" />
      {/* 10 */}
      <polygon points="470,27 500,24 485,60" fill="#FDE8E0" stroke="#EBBCAE" strokeWidth="1" />
      {/* 11 */}
      <polygon points="520,22 550,19 535,54" fill="#FDE08A" stroke="#E5B94B" strokeWidth="1" />
      {/* 12 */}
      <polygon points="570,18 600,15 585,48" fill="#E8E3F5" stroke="#C5B8DE" strokeWidth="1" />
    </svg>
  );
};

export const BalloonsSvg: React.FC<{ className?: string }> = ({
  className = "w-32 h-44"
}) => {
  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="balloonPink" cx="35%" cy="35%" r="65%">
          <stop stopColor="#FFA6C1" />
          <stop offset="0.7" stopColor="#F5658C" />
          <stop offset="1" stopColor="#D83A6F" />
        </radialGradient>
        <radialGradient id="balloonGold" cx="35%" cy="35%" r="65%">
          <stop stopColor="#FFF2A3" />
          <stop offset="0.7" stopColor="#F5C451" />
          <stop offset="1" stopColor="#D99B1D" />
        </radialGradient>
        <radialGradient id="balloonLavender" cx="35%" cy="35%" r="65%">
          <stop stopColor="#EDE5FB" />
          <stop offset="0.7" stopColor="#C9B4F1" />
          <stop offset="1" stopColor="#9C77DC" />
        </radialGradient>
        <radialGradient id="balloonMint" cx="35%" cy="35%" r="65%">
          <stop stopColor="#E2F9DB" />
          <stop offset="0.7" stopColor="#AEE0A4" />
          <stop offset="1" stopColor="#7AC16D" />
        </radialGradient>
      </defs>

      {/* Strings converging at bottom */}
      <path d="M45 110 Q55 160 80 215" stroke="#C8B8AB" strokeWidth="1.2" fill="none" />
      <path d="M115 110 Q105 160 80 215" stroke="#C8B8AB" strokeWidth="1.2" fill="none" />
      <path d="M80 95 Q80 150 80 215" stroke="#C8B8AB" strokeWidth="1.2" fill="none" />
      <path d="M60 135 Q70 170 80 215" stroke="#C8B8AB" strokeWidth="1.2" fill="none" />

      {/* Balloon 1: Mint (back left) */}
      <g transform="translate(18, 55)">
        <ellipse cx="32" cy="40" rx="24" ry="29" fill="url(#balloonMint)" />
        <ellipse cx="23" cy="30" rx="6" ry="10" fill="white" opacity="0.4" />
        <polygon points="30,68 34,68 32,72" fill="#7AC16D" />
      </g>

      {/* Balloon 2: Lavender (back right) */}
      <g transform="translate(75, 45)">
        <ellipse cx="34" cy="42" rx="26" ry="32" fill="url(#balloonLavender)" />
        <ellipse cx="25" cy="31" rx="7" ry="11" fill="white" opacity="0.4" />
        <polygon points="32,73 36,73 34,77" fill="#9C77DC" />
      </g>

      {/* Balloon 3: Gold (center high) */}
      <g transform="translate(45, 10)">
        <ellipse cx="35" cy="44" rx="28" ry="35" fill="url(#balloonGold)" />
        <ellipse cx="26" cy="31" rx="8" ry="12" fill="white" opacity="0.45" />
        <polygon points="33,78 37,78 35,82" fill="#D99B1D" />
      </g>

      {/* Balloon 4: Rose Pink (front and center) */}
      <g transform="translate(25, 40)">
        <ellipse cx="38" cy="48" rx="30" ry="36" fill="url(#balloonPink)" />
        <ellipse cx="28" cy="34" rx="9" ry="13" fill="white" opacity="0.45" />
        <polygon points="36,83 40,83 38,87" fill="#D83A6F" />
      </g>

      {/* Cute ribbon bow at bottom string knot */}
      <circle cx="80" cy="215" r="3.5" fill="#D83A6F" />
      <ellipse cx="73" cy="213" rx="6" ry="3.5" transform="rotate(-20 73 213)" fill="#FF9EAA" />
      <ellipse cx="87" cy="213" rx="6" ry="3.5" transform="rotate(20 87 213)" fill="#FF9EAA" />
    </svg>
  );
};

export const GiftBoxSvg: React.FC<{ className?: string }> = ({
  className = "w-28 h-28"
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="boxGrad" x1="20" y1="45" x2="100" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE8E0" />
          <stop offset="1" stopColor="#F5CAB9" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="15" y1="35" x2="105" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2EC" />
          <stop offset="1" stopColor="#ECC2B0" />
        </linearGradient>
        <linearGradient id="ribbonPink" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FF7A9E" />
          <stop offset="1" stopColor="#D83A6F" />
        </linearGradient>
      </defs>

      {/* Box Body */}
      <rect x="24" y="52" width="72" height="52" rx="6" fill="url(#boxGrad)" stroke="#DFB2A1" strokeWidth="1.5" />
      {/* Vertical Ribbon */}
      <rect x="54" y="52" width="12" height="52" fill="url(#ribbonPink)" />

      {/* Box Lid */}
      <rect x="18" y="38" width="84" height="16" rx="4" fill="url(#lidGrad)" stroke="#DFB2A1" strokeWidth="1.5" />
      {/* Lid Ribbon */}
      <rect x="54" y="38" width="12" height="16" fill="url(#ribbonPink)" />

      {/* Ribbon Bow on Top */}
      {/* Left loop */}
      <path
        d="M60 38 C45 20, 26 26, 44 38 Z"
        fill="url(#ribbonPink)"
        stroke="#B82255"
        strokeWidth="1"
      />
      {/* Right loop */}
      <path
        d="M60 38 C75 20, 94 26, 76 38 Z"
        fill="url(#ribbonPink)"
        stroke="#B82255"
        strokeWidth="1"
      />
      {/* Center Knot */}
      <circle cx="60" cy="38" r="6" fill="#FCE7EF" stroke="#D83A6F" strokeWidth="2" />

      {/* Ribbon tails */}
      <path d="M57 41 Q48 50 44 60" stroke="#D83A6F" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M63 41 Q72 50 76 60" stroke="#D83A6F" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Sparkles */}
      <circle cx="20" cy="30" r="2" fill="#F5C451" />
      <circle cx="100" cy="40" r="2.5" fill="#F5C451" />
    </svg>
  );
};

export const MoonStarsSvg: React.FC<{ className?: string }> = ({
  className = "w-36 h-36"
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#FFF4D0" />
          <stop offset="0.7" stopColor="#F5C451" />
          <stop offset="1" stopColor="#E2A729" />
        </radialGradient>
        <filter id="crescentGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glowing Crescent Moon */}
      <path
        d="M100 25 C60 25 35 60 45 105 C55 140 90 150 120 135 C85 130 70 100 78 70 C85 45 105 32 120 28 C113 26 107 25 100 25 Z"
        fill="url(#moonGlow)"
        filter="url(#crescentGlow)"
      />
      {/* Friendly Sleepy Moon Face */}
      <path d="M72 75 Q76 79 80 75" stroke="#9C6B10" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="82" cy="84" r="3.5" fill="#FFAAA6" opacity="0.6" />

      {/* Twinkling 4-point stars */}
      {/* Star 1 */}
      <g transform="translate(30, 40)" className="animate-pulse">
        <path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="#FFE899" />
      </g>
      {/* Star 2 */}
      <g transform="translate(135, 95)" className="animate-pulse">
        <path d="M0 -7 L1.5 -1.5 L7 0 L1.5 1.5 L0 7 L-1.5 1.5 L-7 0 L-1.5 -1.5 Z" fill="#FFF2BF" />
      </g>
      {/* Star 3 */}
      <g transform="translate(42, 120)">
        <path d="M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z" fill="#FFE899" />
      </g>
      {/* Star 4 */}
      <circle cx="120" cy="15" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="20" cy="80" r="1.5" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
};
