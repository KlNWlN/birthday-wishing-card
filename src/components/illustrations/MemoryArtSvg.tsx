import React from 'react';

interface MemoryArtSvgProps {
  type: string;
  className?: string;
}

export const MemoryArtSvg: React.FC<MemoryArtSvgProps> = ({
  type,
  className = "w-full h-full"
}) => {
  if (type === 'default-1') {
    // Starlit Night & Glowing Lantern
    return (
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#1C2340" />
            <stop offset="0.7" stopColor="#303A63" />
            <stop offset="1" stopColor="#4A5886" />
          </linearGradient>
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#FFF9E0" />
            <stop offset="0.4" stopColor="#F5C451" />
            <stop offset="0.8" stopColor="#E29020" stopOpacity="0.4" />
            <stop offset="1" stopColor="#303A63" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Background Sky */}
        <rect width="240" height="240" fill="url(#skyGrad1)" />
        {/* Rolling Hills */}
        <path d="M-20 200 Q40 170 120 185 Q200 200 260 175 L260 250 L-20 250 Z" fill="#182035" />
        <path d="M-10 220 Q80 195 160 210 Q220 220 260 205 L260 250 L-10 250 Z" fill="#0F1422" />

        {/* Stars */}
        <circle cx="45" cy="40" r="1.5" fill="#FFF" opacity="0.9" />
        <circle cx="85" cy="65" r="2" fill="#F5C451" opacity="0.8" />
        <circle cx="130" cy="30" r="1.5" fill="#FFF" opacity="0.7" />
        <circle cx="180" cy="55" r="2.5" fill="#FFEAA7" opacity="0.9" />
        <circle cx="210" cy="35" r="1.5" fill="#FFF" opacity="0.6" />
        <circle cx="160" cy="90" r="1.5" fill="#FFF" opacity="0.8" />
        {/* 4-point twinkle star */}
        <path d="M100 45 L102 50 L107 52 L102 54 L100 59 L98 54 L93 52 L98 50 Z" fill="#FFF2A3" />

        {/* Glowing Lantern Center */}
        <circle cx="120" cy="140" r="50" fill="url(#lanternGlow)" />
        {/* Lantern Hook & Roof */}
        <path d="M120 95 C115 95 112 100 112 105 L128 105 C128 100 125 95 120 95 Z" fill="#2E2018" />
        <polygon points="106,110 134,110 128,105 112,105" fill="#3D2B22" />
        {/* Lantern Glass Body */}
        <path d="M108 110 L112 155 L128 155 L132 110 Z" fill="#FFF5D6" opacity="0.9" stroke="#3D2B22" strokeWidth="2" />
        {/* Candle Flame inside */}
        <ellipse cx="120" cy="138" rx="4" ry="7" fill="#F5C451" />
        <circle cx="120" cy="140" r="2" fill="#FFF" />
        {/* Lantern Base */}
        <rect x="108" y="155" width="24" height="6" rx="2" fill="#3D2B22" />
        {/* Sparkles floating from lantern */}
        <circle cx="140" cy="120" r="2" fill="#FFF9E0" />
        <circle cx="148" cy="108" r="1.5" fill="#F5C451" />
        <circle cx="95" cy="125" r="1.5" fill="#FFF" />
      </svg>
    );
  }

  if (type === 'default-2') {
    // Road Trip & Golden Mountains
    return (
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#F9A88F" />
            <stop offset="0.5" stopColor="#FBD38D" />
            <stop offset="1" stopColor="#FEFCBF" />
          </linearGradient>
          <linearGradient id="mtnGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#9C77DC" />
            <stop offset="1" stopColor="#6C4EA5" />
          </linearGradient>
          <linearGradient id="carRed" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#FF758F" />
            <stop offset="1" stopColor="#D83A6F" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="240" height="240" fill="url(#sunsetSky)" />
        {/* Golden Sun */}
        <circle cx="120" cy="115" r="32" fill="#FFFFFF" opacity="0.85" />
        {/* Distant Mountains */}
        <polygon points="-10,150 50,90 120,150" fill="url(#mtnGrad1)" opacity="0.6" />
        <polygon points="80,150 160,80 250,150" fill="url(#mtnGrad1)" opacity="0.8" />
        <polygon points="30,165 95,110 180,165" fill="#583C8C" opacity="0.85" />
        {/* Rolling Ground */}
        <path d="M-10 160 Q120 150 250 160 L250 250 L-10 250 Z" fill="#F0DCBC" />
        {/* Scenic Winding Road */}
        <path d="M70 250 Q110 185 120 155 L126 155 Q135 185 170 250 Z" fill="#887870" />
        <path d="M120 250 L121 230 M121 215 L122 195 M122 180 L123 165" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 6" />

        {/* Vintage Cute Convertible Car */}
        <g transform="translate(100, 185)">
          {/* Car Body */}
          <path d="M0 16 C5 8 12 8 20 8 L30 8 C36 8 40 12 44 16 L46 22 L-2 22 Z" fill="#FFE5EC" />
          <rect x="-4" y="20" width="52" height="12" rx="4" fill="url(#carRed)" />
          {/* Windshield */}
          <path d="M8 9 L15 1 L28 1 L32 9 Z" fill="#E8F4F8" opacity="0.85" stroke="#D83A6F" strokeWidth="1" />
          {/* Headlights */}
          <circle cx="-1" cy="24" r="3" fill="#FFF2A3" />
          <circle cx="45" cy="24" r="3" fill="#FFF2A3" />
          {/* Wheels */}
          <circle cx="6" cy="32" r="6" fill="#2E2018" />
          <circle cx="6" cy="32" r="3" fill="#DFD2C4" />
          <circle cx="38" cy="32" r="6" fill="#2E2018" />
          <circle cx="38" cy="32" r="3" fill="#DFD2C4" />
        </g>
      </svg>
    );
  }

  if (type === 'default-3') {
    // Cozy Cafe, Sweet Treats & Laughter
    return (
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="cafeBg" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFF7F0" />
            <stop offset="1" stopColor="#FCEADE" />
          </linearGradient>
          <linearGradient id="tableWood" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#F3D5B5" />
            <stop offset="1" stopColor="#E0B589" />
          </linearGradient>
        </defs>
        {/* Cafe Wall */}
        <rect width="240" height="240" fill="url(#cafeBg)" />
        {/* Subtle striped bistro wallpaper */}
        <line x1="40" y1="0" x2="40" y2="140" stroke="#F8DFCE" strokeWidth="8" opacity="0.4" />
        <line x1="80" y1="0" x2="80" y2="140" stroke="#F8DFCE" strokeWidth="8" opacity="0.4" />
        <line x1="120" y1="0" x2="120" y2="140" stroke="#F8DFCE" strokeWidth="8" opacity="0.4" />
        <line x1="160" y1="0" x2="160" y2="140" stroke="#F8DFCE" strokeWidth="8" opacity="0.4" />
        <line x1="200" y1="0" x2="200" y2="140" stroke="#F8DFCE" strokeWidth="8" opacity="0.4" />

        {/* Bistro Table Surface */}
        <ellipse cx="120" cy="180" rx="100" ry="45" fill="url(#tableWood)" stroke="#CCA275" strokeWidth="2" />
        {/* Tablecloth lace coaster */}
        <circle cx="120" cy="178" r="35" fill="#FFFDF9" stroke="#EADCCB" strokeWidth="1" strokeDasharray="3 3" />

        {/* Cup 1: Pink Latte with Heart Art */}
        <g transform="translate(65, 148)">
          <ellipse cx="20" cy="22" rx="16" ry="12" fill="#FF85A2" />
          <ellipse cx="20" cy="18" rx="14" ry="9" fill="#FFF3EB" />
          <ellipse cx="20" cy="18" rx="11" ry="7" fill="#8C583B" />
          {/* Latte Foam Heart */}
          <path d="M20 20 C18 18 16 16 16 14 C16 12 18 11 20 13 C22 11 24 12 24 14 C24 16 22 18 20 20 Z" fill="#FFF" />
          {/* Cup handle */}
          <path d="M5 16 C0 16 0 24 5 24" stroke="#FF85A2" strokeWidth="3" fill="none" />
          {/* Steaming aroma */}
          <path d="M18 10 Q16 4 20 0" stroke="#C5A48A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>

        {/* Cup 2: Sage Green Tea Cup */}
        <g transform="translate(145, 148)">
          <ellipse cx="20" cy="22" rx="16" ry="12" fill="#B3D9A5" />
          <ellipse cx="20" cy="18" rx="14" ry="9" fill="#FFF3EB" />
          <ellipse cx="20" cy="18" rx="11" ry="7" fill="#C59A6F" />
          {/* Cup handle */}
          <path d="M35 16 C40 16 40 24 35 24" stroke="#B3D9A5" strokeWidth="3" fill="none" />
          {/* Steaming aroma */}
          <path d="M22 10 Q24 4 20 0" stroke="#C5A48A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>

        {/* Delicious Golden Croissant on Plate */}
        <g transform="translate(100, 165)">
          <ellipse cx="20" cy="15" rx="20" ry="12" fill="#FFFFFF" stroke="#E2D4C6" strokeWidth="1" />
          {/* Croissant crescent */}
          <path d="M6 14 C10 6, 30 6, 34 14 C28 17, 12 17, 6 14 Z" fill="#E89F4C" stroke="#C47926" strokeWidth="1" />
          <path d="M12 11 C15 7, 25 7, 28 11" stroke="#D1832A" strokeWidth="1.5" fill="none" />
        </g>

        {/* Floating Heart / Sparkle Laughs */}
        <path d="M110 95 C108 90 102 90 102 95 C102 100 110 106 110 106 C110 106 118 100 118 95 C118 90 112 90 110 95 Z" fill="#FF85A2" opacity="0.75" />
        <circle cx="130" cy="85" r="2.5" fill="#F5C451" />
        <circle cx="90" cy="100" r="2" fill="#F5C451" />
      </svg>
    );
  }

  // default-4: Blooming Friendship Flowers & Hearts
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flowerBg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F6F3FF" />
          <stop offset="1" stopColor="#EFE7FC" />
        </linearGradient>
        <radialGradient id="sunflowerCenter" cx="50%" cy="50%" r="50%">
          <stop stopColor="#8C583B" />
          <stop offset="1" stopColor="#5D3A26" />
        </radialGradient>
      </defs>
      {/* Soft Lavender Background */}
      <rect width="240" height="240" fill="url(#flowerBg)" />

      {/* Flower Stems and Leaves */}
      <path d="M85 240 Q90 160 85 110" stroke="#7EAC70" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M155 240 Q150 160 155 120" stroke="#7EAC70" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Connected Leaf loop symbolizing friendship */}
      <path d="M87 180 Q120 170 153 180" stroke="#7EAC70" strokeWidth="3" fill="none" />
      <ellipse cx="120" cy="175" rx="14" ry="7" fill="#A4CE96" />

      {/* Left Flower: Bright Golden Sunflower */}
      <g transform="translate(85, 110)">
        {/* Yellow Petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-28"
            rx="7"
            ry="18"
            fill="#F5C451"
            transform={`rotate(${deg})`}
            stroke="#DF9E1B"
            strokeWidth="0.8"
          />
        ))}
        {/* Center Seed Disk */}
        <circle cx="0" cy="0" r="18" fill="url(#sunflowerCenter)" />
        <circle cx="0" cy="0" r="14" stroke="#A66F4E" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        {/* Smiling face on sunflower */}
        <circle cx="-5" cy="-2" r="2" fill="#FFF2A3" />
        <circle cx="5" cy="-2" r="2" fill="#FFF2A3" />
        <path d="M-4 4 Q0 8 4 4" stroke="#FFF2A3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Right Flower: Soft Blush Peony/Rose */}
      <g transform="translate(155, 120)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-22"
            rx="12"
            ry="16"
            fill="#FFAAA6"
            opacity="0.85"
            transform={`rotate(${deg})`}
          />
        ))}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-15"
            rx="10"
            ry="14"
            fill="#FF85A2"
            opacity="0.9"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="12" fill="#D83A6F" />
        <circle cx="0" cy="0" r="7" fill="#FFF0F5" />
      </g>

      {/* Connected Twin Heart Sparkle */}
      <g transform="translate(120, 60)">
        <path
          d="M0 10 C-3 6 -12 0 -12 -6 C-12 -11 -7 -13 -3 -13 C-0.5 -13 2 -11 0 -8 C-2 -11 0.5 -13 3 -13 C7 -13 12 -11 12 -6 C12 0 3 6 0 10 Z"
          fill="#D83A6F"
        />
        <circle cx="-16" cy="-10" r="2" fill="#F5C451" />
        <circle cx="16" cy="-10" r="2" fill="#F5C451" />
      </g>
    </svg>
  );
};
