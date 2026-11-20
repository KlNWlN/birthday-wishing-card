import React from 'react';

interface BirthdayCakeSvgProps {
  className?: string;
  isCut?: boolean;
  splitOffset?: number; // 0 to 40
  showDashedLine?: boolean;
}

export const BirthdayCakeSvg: React.FC<BirthdayCakeSvgProps> = ({
  className = "w-72 h-72 sm:w-80 sm:h-80",
  isCut = false,
  splitOffset = 0,
  showDashedLine = true
}) => {
  const currentOffset = isCut ? Math.max(splitOffset, 32) : splitOffset;

  return (
    <div className={`relative mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="tier1Grad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#F9DFEA" />
            <stop offset="1" stopColor="#F5CADC" />
          </linearGradient>
          <linearGradient id="tier2Grad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#E6F5E3" />
            <stop offset="1" stopColor="#D2EACD" />
          </linearGradient>
          <linearGradient id="tier3Grad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFF9EB" />
            <stop offset="1" stopColor="#FDEBCB" />
          </linearGradient>
          <linearGradient id="frostingDrip" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFF0F5" />
          </linearGradient>
          <linearGradient id="candleGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FF9EAA" />
            <stop offset="1" stopColor="#FF6B8B" />
          </linearGradient>
          <linearGradient id="candleGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#9EE2FF" />
            <stop offset="1" stopColor="#5BC8FC" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop stopColor="#FF8C42" />
            <stop offset="0.6" stopColor="#FFDE59" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Cake Stand / Plate gradient */}
          <linearGradient id="plateGrad" x1="50" y1="280" x2="270" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8F7F4" />
            <stop offset="0.5" stopColor="#EFECE6" />
            <stop offset="1" stopColor="#DED8CF" />
          </linearGradient>
        </defs>

        {/* Cake Stand / Plate */}
        <g id="cakeStand">
          <ellipse cx="160" cy="285" rx="120" ry="18" fill="url(#plateGrad)" stroke="#D4CCC1" strokeWidth="2" />
          <ellipse cx="160" cy="281" rx="108" ry="12" fill="#FFFFFF" opacity="0.6" />
          <path d="M125 292 C125 305 135 310 160 310 C185 310 195 305 195 292 Z" fill="#E2DDD5" stroke="#D4CCC1" strokeWidth="1.5" />
        </g>

        {/* LEFT HALF OF CAKE */}
        <g
          id="leftCakeHalf"
          style={{
            transform: `translateX(-${currentOffset}px)`,
            transition: currentOffset > 0 ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
          }}
        >
          {/* Tier 3 (Bottom) Left */}
          <path
            d="M50 240 C50 240 50 270 160 270 L160 215 C100 215 50 225 50 240 Z"
            fill="url(#tier3Grad)"
            stroke="#EAD5B5"
            strokeWidth="1.5"
          />
          {/* Tier 3 Frosting Scallops Left */}
          <path
            d="M50 240 Q65 252 80 242 Q95 252 110 242 Q125 252 140 242 Q150 250 160 244 L160 215 C100 215 50 225 50 240 Z"
            fill="url(#frostingDrip)"
            stroke="#F0DFD0"
            strokeWidth="1"
          />
          {/* Pearls on Bottom Tier */}
          <circle cx="70" cy="254" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />
          <circle cx="100" cy="257" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />
          <circle cx="130" cy="258" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />

          {/* Tier 2 (Middle) Left */}
          <path
            d="M75 175 C75 175 75 215 160 215 L160 165 C115 165 75 172 75 175 Z"
            fill="url(#tier2Grad)"
            stroke="#BCD7B6"
            strokeWidth="1.5"
          />
          {/* Tier 2 Frosting Drips Left */}
          <path
            d="M75 175 C85 192 90 190 98 180 C105 194 112 192 120 178 C128 196 135 194 145 178 C152 190 156 186 160 180 L160 165 C115 165 75 172 75 175 Z"
            fill="url(#frostingDrip)"
          />
          {/* Sugar decorations */}
          <circle cx="95" cy="198" r="3.5" fill="#FF85A2" />
          <circle cx="125" cy="202" r="3.5" fill="#F5C451" />

          {/* Tier 1 (Top) Left */}
          <path
            d="M100 120 C100 120 100 165 160 165 L160 115 C130 115 100 118 100 120 Z"
            fill="url(#tier1Grad)"
            stroke="#E8B5C9"
            strokeWidth="1.5"
          />
          {/* Tier 1 Frosting Top & Drips Left */}
          <path
            d="M100 120 C108 135 114 133 120 125 C128 138 134 135 142 123 C150 134 155 132 160 125 L160 115 C130 115 100 118 100 120 Z"
            fill="url(#frostingDrip)"
          />

          {/* Left Candle */}
          <rect x="125" y="80" width="8" height="35" rx="3" fill="url(#candleGrad1)" />
          <path d="M125 90 L133 87" stroke="white" strokeWidth="1.5" />
          <path d="M125 102 L133 99" stroke="white" strokeWidth="1.5" />
          <line x1="129" y1="80" x2="129" y2="72" stroke="#666" strokeWidth="1.5" />
          {/* Candle Flame Left */}
          <path
            d="M129 55 C124 64 125 72 129 72 C133 72 134 64 129 55 Z"
            fill="url(#flameGrad)"
            filter="url(#flameGlow)"
            className="animate-pulse-subtle"
          />

          {/* INNER CAKE SECTION (Revealed when cut) */}
          {currentOffset > 0 && (
            <g id="leftInnerCakeSlice">
              <rect x="156" y="115" width="4" height="155" fill="#FFE5A3" />
              {/* Colorful inner sponge and cream layers */}
              <line x1="156" y1="130" x2="160" y2="130" stroke="#FF85A2" strokeWidth="6" />
              <line x1="156" y1="140" x2="160" y2="140" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="156" y1="155" x2="160" y2="155" stroke="#C4E7BD" strokeWidth="6" />
              <line x1="156" y1="180" x2="160" y2="180" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="156" y1="200" x2="160" y2="200" stroke="#FDE08A" strokeWidth="7" />
              <line x1="156" y1="225" x2="160" y2="225" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="156" y1="245" x2="160" y2="245" stroke="#FFAAA6" strokeWidth="6" />
            </g>
          )}
        </g>

        {/* RIGHT HALF OF CAKE */}
        <g
          id="rightCakeHalf"
          style={{
            transform: `translateX(${currentOffset}px)`,
            transition: currentOffset > 0 ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
          }}
        >
          {/* Tier 3 (Bottom) Right */}
          <path
            d="M160 270 C270 270 270 240 270 240 C270 225 220 215 160 215 Z"
            fill="url(#tier3Grad)"
            stroke="#EAD5B5"
            strokeWidth="1.5"
          />
          {/* Tier 3 Frosting Scallops Right */}
          <path
            d="M160 244 Q170 250 180 242 Q195 252 210 242 Q225 252 240 242 Q255 252 270 240 C270 225 220 215 160 215 Z"
            fill="url(#frostingDrip)"
            stroke="#F0DFD0"
            strokeWidth="1"
          />
          {/* Pearls on Bottom Tier */}
          <circle cx="190" cy="258" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />
          <circle cx="220" cy="257" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />
          <circle cx="250" cy="254" r="3" fill="#FFF9EB" stroke="#D8C7A3" strokeWidth="0.8" />

          {/* Tier 2 (Middle) Right */}
          <path
            d="M160 215 C245 215 245 175 245 175 C245 172 205 165 160 165 Z"
            fill="url(#tier2Grad)"
            stroke="#BCD7B6"
            strokeWidth="1.5"
          />
          {/* Tier 2 Frosting Drips Right */}
          <path
            d="M160 180 C164 186 168 190 175 178 C185 194 192 196 200 178 C208 192 215 194 222 180 C230 190 235 192 245 175 C245 172 205 165 160 165 Z"
            fill="url(#frostingDrip)"
          />
          {/* Sugar decorations */}
          <circle cx="195" cy="202" r="3.5" fill="#7CD4FD" />
          <circle cx="225" cy="198" r="3.5" fill="#FF85A2" />

          {/* Tier 1 (Top) Right */}
          <path
            d="M160 165 C220 165 220 120 220 120 C220 118 190 115 160 115 Z"
            fill="url(#tier1Grad)"
            stroke="#E8B5C9"
            strokeWidth="1.5"
          />
          {/* Tier 1 Frosting Top & Drips Right */}
          <path
            d="M160 125 C165 132 170 134 178 123 C186 135 192 138 200 125 C206 133 212 135 220 120 C220 118 190 115 160 115 Z"
            fill="url(#frostingDrip)"
          />

          {/* Right Candle */}
          <rect x="187" y="80" width="8" height="35" rx="3" fill="url(#candleGrad2)" />
          <path d="M187 90 L195 87" stroke="white" strokeWidth="1.5" />
          <path d="M187 102 L195 99" stroke="white" strokeWidth="1.5" />
          <line x1="191" y1="80" x2="191" y2="72" stroke="#666" strokeWidth="1.5" />
          {/* Candle Flame Right */}
          <path
            d="M191 55 C186 64 187 72 191 72 C195 72 196 64 191 55 Z"
            fill="url(#flameGrad)"
            filter="url(#flameGlow)"
            className="animate-pulse-subtle"
          />

          {/* INNER CAKE SECTION (Revealed when cut) */}
          {currentOffset > 0 && (
            <g id="rightInnerCakeSlice">
              <rect x="160" y="115" width="4" height="155" fill="#FFE5A3" />
              {/* Colorful inner sponge and cream layers */}
              <line x1="160" y1="130" x2="164" y2="130" stroke="#FF85A2" strokeWidth="6" />
              <line x1="160" y1="140" x2="164" y2="140" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="160" y1="155" x2="164" y2="155" stroke="#C4E7BD" strokeWidth="6" />
              <line x1="160" y1="180" x2="164" y2="180" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="160" y1="200" x2="164" y2="200" stroke="#FDE08A" strokeWidth="7" />
              <line x1="160" y1="225" x2="164" y2="225" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="160" y1="245" x2="164" y2="245" stroke="#FFAAA6" strokeWidth="6" />
            </g>
          )}
        </g>

        {/* Center Candle (Top of Cake) */}
        {!isCut && (
          <g id="centerCandle">
            <rect x="156" y="65" width="8" height="50" rx="3" fill="#F5C451" />
            <path d="M156 78 L164 75" stroke="#FFF" strokeWidth="1.5" />
            <path d="M156 94 L164 91" stroke="#FFF" strokeWidth="1.5" />
            <line x1="160" y1="65" x2="160" y2="55" stroke="#444" strokeWidth="1.5" />
            <path
              d="M160 36 C154 46 155 55 160 55 C165 55 166 46 160 36 Z"
              fill="url(#flameGrad)"
              filter="url(#flameGlow)"
              className="animate-pulse-subtle"
            />
          </g>
        )}

        {/* Vertical Dashed Cut Line (Down Center) */}
        {!isCut && showDashedLine && (
          <g id="cutLineGuide">
            <line
              x1="160"
              y1="30"
              x2="160"
              y2="280"
              stroke="#D83A6F"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="anim-dashed-line"
              opacity="0.75"
            />
            {/* Cute scissor icon indicator at top */}
            <circle cx="160" cy="28" r="10" fill="#D83A6F" />
            <path d="M156 25 L164 31 M156 31 L164 25" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
