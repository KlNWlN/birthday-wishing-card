import React from 'react';

interface TeddyBearSvgProps {
  className?: string;
  variant?: 'party' | 'sleepy' | 'cheering' | 'wishing' | 'balloon';
  balloonColor?: string;
}

export const TeddyBearSvg: React.FC<TeddyBearSvgProps> = ({
  className = "w-32 h-32",
  variant = 'party',
  balloonColor = "#D83A6F"
}) => {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="furGrad" x1="50" y1="20" x2="150" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5D0A9" />
          <stop offset="0.6" stopColor="#E2AC74" />
          <stop offset="1" stopColor="#CA8B53" />
        </linearGradient>
        <linearGradient id="bellyGrad" x1="100" y1="120" x2="100" y2="185" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF3E3" />
          <stop offset="1" stopColor="#FCE0C3" />
        </linearGradient>
        <linearGradient id="partyHatGrad" x1="75" y1="10" x2="125" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF85A2" />
          <stop offset="0.5" stopColor="#F5C451" />
          <stop offset="1" stopColor="#7CD4FD" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Sleepy Nightcap or Party Hat */}
      {variant === 'sleepy' && (
        <g id="nightcap">
          <path
            d="M75 60 C80 20, 140 15, 155 45 C160 55, 175 65, 180 75"
            fill="#5D73AD"
            stroke="#415488"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M72 62 C85 55, 115 55, 130 63"
            stroke="#E8EDFA"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="180" cy="78" r="10" fill="#E8EDFA" />
        </g>
      )}

      {/* Balloon string and balloon if variant === 'balloon' */}
      {variant === 'balloon' && (
        <g id="balloonHolding">
          <path
            d="M145 130 Q170 100 160 50"
            stroke="#C08497"
            strokeWidth="2"
            strokeDasharray="3 3"
            fill="none"
          />
          {/* Heart/Round Balloon */}
          <ellipse cx="160" cy="35" rx="22" ry="26" fill={balloonColor} />
          <ellipse cx="152" cy="27" rx="6" ry="10" fill="white" opacity="0.4" />
          <polygon points="157,60 163,60 160,65" fill={balloonColor} />
        </g>
      )}

      {/* Ears */}
      <circle cx="62" cy="65" r="24" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
      <circle cx="62" cy="65" r="14" fill="#FCE0C3" opacity="0.9" />
      <circle cx="138" cy="65" r="24" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
      <circle cx="138" cy="65" r="14" fill="#FCE0C3" opacity="0.9" />

      {/* Body */}
      <path
        d="M60 145 C50 175, 55 200, 100 200 C145 200, 150 175, 140 145 Z"
        fill="url(#furGrad)"
        stroke="#B37541"
        strokeWidth="2"
      />
      {/* Belly Patch */}
      <ellipse cx="100" cy="165" rx="30" ry="26" fill="url(#bellyGrad)" />

      {/* Paws / Feet */}
      <ellipse cx="65" cy="198" rx="18" ry="12" fill="#E2AC74" stroke="#B37541" strokeWidth="1.5" />
      <circle cx="65" cy="198" r="8" fill="#FFF3E3" />
      <ellipse cx="135" cy="198" rx="18" ry="12" fill="#E2AC74" stroke="#B37541" strokeWidth="1.5" />
      <circle cx="135" cy="198" r="8" fill="#FFF3E3" />

      {/* Arms */}
      {variant === 'cheering' ? (
        <g id="armsCheering">
          <ellipse cx="45" cy="120" rx="14" ry="25" transform="rotate(-35 45 120)" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
          <ellipse cx="155" cy="120" rx="14" ry="25" transform="rotate(35 155 120)" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
        </g>
      ) : variant === 'wishing' ? (
        <g id="armsWishing">
          {/* Paws held together in prayer/wish */}
          <ellipse cx="90" cy="148" rx="14" ry="12" fill="url(#furGrad)" stroke="#B37541" strokeWidth="1.5" />
          <ellipse cx="110" cy="148" rx="14" ry="12" fill="url(#furGrad)" stroke="#B37541" strokeWidth="1.5" />
          <path d="M96 142 Q100 138 104 142" stroke="#B37541" strokeWidth="2" fill="none" />
          {/* Little glowing star between paws */}
          <path d="M100 138 L101.5 142 L106 142.5 L102.5 145 L103.5 149 L100 146.5 L96.5 149 L97.5 145 L94 142.5 L98.5 142 Z" fill="#F5C451" />
        </g>
      ) : (
        <g id="armsResting">
          <ellipse cx="55" cy="148" rx="14" ry="20" transform="rotate(20 55 148)" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
          <ellipse cx="145" cy="148" rx="14" ry="20" transform="rotate(-20 145 148)" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />
        </g>
      )}

      {/* Head */}
      <circle cx="100" cy="98" r="42" fill="url(#furGrad)" stroke="#B37541" strokeWidth="2" />

      {/* Snout */}
      <ellipse cx="100" cy="110" rx="20" ry="15" fill="#FFF3E3" />
      {/* Nose */}
      <path d="M93 103 C93 100, 107 100, 107 103 C107 108, 100 112, 100 112 C100 112, 93 108, 93 103 Z" fill="#4A3427" />
      {/* Mouth */}
      {variant === 'sleepy' ? (
        <path d="M96 114 Q100 117 104 114" stroke="#4A3427" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <g>
          <path d="M100 112 L100 116" stroke="#4A3427" strokeWidth="2" />
          <path d="M94 116 Q100 123 106 116" stroke="#4A3427" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M96 117 Q100 124 104 117" fill="#F8719D" />
        </g>
      )}

      {/* Eyes */}
      {variant === 'sleepy' || variant === 'wishing' ? (
        <g id="closedEyes">
          {/* Content curved shut eyes */}
          <path d="M80 94 Q88 100 92 94" stroke="#4A3427" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M108 94 Q112 100 120 94" stroke="#4A3427" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Eyelashes */}
          <path d="M78 95 L75 92" stroke="#4A3427" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M122 95 L125 92" stroke="#4A3427" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ) : (
        <g id="openEyes">
          <circle cx="85" cy="94" r="5" fill="#2E2018" />
          <circle cx="83.5" cy="92.5" r="1.8" fill="white" />
          <circle cx="115" cy="94" r="5" fill="#2E2018" />
          <circle cx="113.5" cy="92.5" r="1.8" fill="white" />
        </g>
      )}

      {/* Blush Cheeks */}
      <ellipse cx="74" cy="106" rx="8" ry="5" fill="#FF8BA7" opacity="0.6" />
      <ellipse cx="126" cy="106" rx="8" ry="5" fill="#FF8BA7" opacity="0.6" />

      {/* Party Hat (for party or cheering variants) */}
      {(variant === 'party' || variant === 'cheering' || variant === 'balloon') && (
        <g id="partyHat">
          <polygon points="100,28 78,64 122,64" fill="url(#partyHatGrad)" />
          {/* Hat stripes */}
          <path d="M84 55 Q100 59 116 55" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M89 44 Q100 47 111 44" stroke="#F5C451" strokeWidth="3" fill="none" />
          {/* Pom pom */}
          <circle cx="100" cy="27" r="7" fill="#FCE7EF" stroke="#D83A6F" strokeWidth="1.5" />
          {/* Sparkles around hat */}
          <circle cx="122" cy="25" r="2" fill="#F5C451" />
          <circle cx="78" cy="32" r="2.5" fill="#FF85A2" />
        </g>
      )}

      {/* Sleepy Zzz */}
      {variant === 'sleepy' && (
        <g id="zzz" fill="#F5C451" fontFamily="Caveat, cursive" fontWeight="bold">
          <text x="135" y="45" fontSize="18" opacity="0.9">z</text>
          <text x="150" y="32" fontSize="22" opacity="0.8">Z</text>
          <text x="168" y="18" fontSize="26" opacity="0.95">Z</text>
        </g>
      )}
    </svg>
  );
};
