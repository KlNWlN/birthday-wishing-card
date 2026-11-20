import React from 'react';
import { motion } from 'framer-motion';

interface FloralEnvelopeSvgProps {
  isOpen: boolean;
  recipientName: string;
  className?: string;
}

export const FloralEnvelopeSvg: React.FC<FloralEnvelopeSvgProps> = ({
  isOpen,
  recipientName,
  className = "w-full max-w-[340px] sm:max-w-[380px]"
}) => {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* Outer Envelope Container */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        
        {/* Soft Shadow underneath envelope */}
        <div 
          className="absolute -bottom-4 w-4/5 h-6 rounded-full bg-stone-300/40 blur-md transition-all duration-700" 
          style={{ transform: isOpen ? 'scale(1.1) translateY(4px)' : 'scale(1)' }}
        />

        {/* Sliding Card (slides out upwards when open) */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: isOpen ? -85 : 0,
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1.02 : 0.95
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: isOpen ? 0.35 : 0
          }}
          className="absolute z-10 w-[84%] bg-[#FFFDF9] rounded-xl p-5 border-2 border-dashed border-blush-300 shadow-xl flex flex-col items-center justify-center text-center pointer-events-none"
          style={{ top: '15%' }}
        >
          <div className="text-xs uppercase tracking-widest text-blush-400 font-semibold mb-1">
            A handwritten note
          </div>
          <div className="text-stone-500 font-serif italic text-sm">
            especially for
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-blush-600 mt-0.5 tracking-tight">
            {recipientName || 'You'} ✨
          </div>
          <div className="mt-2 flex items-center gap-2 text-gold-500 text-xs font-handwriting text-base">
            <span>• • •</span>
            <span>tap to explore</span>
            <span>• • •</span>
          </div>
        </motion.div>

        {/* Envelope Base SVG */}
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-20 drop-shadow-md"
        >
          <defs>
            <linearGradient id="envelopeBody" x1="200" y1="60" x2="200" y2="290" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFDF9" />
              <stop offset="0.7" stopColor="#FBF4EA" />
              <stop offset="1" stopColor="#F4EAE0" />
            </linearGradient>
            <linearGradient id="flapGrad" x1="200" y1="40" x2="200" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFDF9" />
              <stop offset="1" stopColor="#F5ECE4" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D8CFED" />
              <stop offset="0.5" stopColor="#C4B5E5" />
              <stop offset="1" stopColor="#B39FDC" />
            </linearGradient>
            <radialGradient id="waxGrad" cx="50%" cy="40%" r="50%">
              <stop stopColor="#F45E8D" />
              <stop offset="0.7" stopColor="#D83A6F" />
              <stop offset="1" stopColor="#A81B4B" />
            </radialGradient>
            <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8B1842" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Envelope Pocket Back Inside (visible when open) */}
          <rect x="30" y="60" width="340" height="230" rx="12" fill="#EBDDCF" />

          {/* Envelope Body (Sides and Bottom Fold) */}
          <path
            d="M30 60 L200 190 L370 60 L370 278 C370 284 365 290 358 290 L42 290 C35 290 30 284 30 278 Z"
            fill="url(#envelopeBody)"
            stroke="#DFD2C4"
            strokeWidth="1.5"
          />

          {/* Side fold shadow details */}
          <path d="M30 60 L185 180 L30 286 Z" fill="#F3E7DC" opacity="0.6" />
          <path d="M370 60 L215 180 L370 286 Z" fill="#EFE2D6" opacity="0.6" />
          {/* Bottom triangle fold */}
          <path d="M30 290 L200 170 L370 290 Z" fill="url(#envelopeBody)" stroke="#DFD2C4" strokeWidth="1" />

          {/* Floral Botanical Corner Embellishments */}
          {/* Top Left Leaves */}
          <g transform="translate(42, 75)" opacity="0.85">
            <path d="M0 0 Q10 -8 22 -4 Q12 6 0 0 Z" fill="#9FB898" />
            <path d="M5 8 Q16 4 25 12 Q14 18 5 8 Z" fill="#B3CBB0" />
            <circle cx="18" cy="2" r="3" fill="#FFB7C5" />
            <circle cx="8" cy="-6" r="2.5" fill="#FCE7EF" />
          </g>
          {/* Bottom Right Leaves */}
          <g transform="translate(325, 255) rotate(180)" opacity="0.85">
            <path d="M0 0 Q10 -8 22 -4 Q12 6 0 0 Z" fill="#9FB898" />
            <path d="M5 8 Q16 4 25 12 Q14 18 5 8 Z" fill="#B3CBB0" />
            <circle cx="18" cy="2" r="3" fill="#FFB7C5" />
          </g>

          {/* Lavender Satin Ribbon Band across envelope (hidden when open) */}
          {!isOpen && (
            <g id="ribbonBand">
              <rect x="30" y="152" width="340" height="24" fill="url(#ribbonGrad)" opacity="0.9" />
              <line x1="30" y1="152" x2="370" y2="152" stroke="#EFEAF7" strokeWidth="1" opacity="0.8" />
              <line x1="30" y1="176" x2="370" y2="176" stroke="#9E8AC4" strokeWidth="1" opacity="0.8" />
            </g>
          )}

          {/* Envelope Flap (Closes over the front or Flips up) */}
          {!isOpen ? (
            <g id="closedFlap">
              {/* Triangular Flap pointing down */}
              <path
                d="M30 60 C30 52 36 48 44 48 L356 48 C364 48 370 52 370 60 L206 182 C202 185 198 185 194 182 Z"
                fill="url(#flapGrad)"
                stroke="#D9CABB"
                strokeWidth="1.5"
              />
              {/* Subtle inner flap fold shadow */}
              <path
                d="M34 58 L200 178 L366 58"
                stroke="#EAE0D4"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Pink Heart Wax Seal */}
              <g transform="translate(200, 168)" filter="url(#waxShadow)">
                {/* Wobbly authentic wax seal puddle */}
                <path
                  d="M0 -26 C15 -27 24 -18 26 -6 C28 6 22 20 12 25 C2 30 -14 28 -22 18 C-30 8 -27 -10 -18 -22 C-10 -27 -4 -25 0 -26 Z"
                  fill="url(#waxGrad)"
                />
                {/* Wax seal inner rim */}
                <circle cx="0" cy="0" r="16" fill="none" stroke="#FFA3C2" strokeWidth="1.5" opacity="0.6" />
                {/* Embossed Heart in center */}
                <path
                  d="M0 6 C-1.5 4.5 -8 -1 -8 -6 C-8 -10 -5 -12 -1.5 -12 C0.5 -12 2.5 -10.5 0 -7 C-2.5 -10.5 -0.5 -12 1.5 -12 C5 -12 8 -10 8 -6 C8 -1 1.5 4.5 0 6 Z"
                  fill="#FFF0F5"
                  opacity="0.95"
                />
              </g>
            </g>
          ) : (
            /* Open Flap (folded upwards) */
            <g id="openFlap">
              <path
                d="M30 60 L200 -25 L370 60 Z"
                fill="#F7EEE6"
                stroke="#D9CABB"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Sparkles */}
          <circle cx="75" cy="40" r="2.5" fill="#F5C451" />
          <path d="M330 35 L332 40 L337 41 L332 43 L330 48 L328 43 L323 41 L328 40 Z" fill="#F5C451" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};
