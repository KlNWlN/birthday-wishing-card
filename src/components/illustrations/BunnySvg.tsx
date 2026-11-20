import React from 'react';

interface BunnySvgProps {
  className?: string;
  variant?: 'peeking' | 'cheering';
}

export const BunnySvg: React.FC<BunnySvgProps> = ({
  className = "w-28 h-28",
  variant = 'peeking'
}) => {
  return (
    <svg
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bunnyGrad" x1="50" y1="20" x2="130" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.8" stopColor="#FDF7F2" />
          <stop offset="1" stopColor="#F5ECE4" />
        </linearGradient>
        <linearGradient id="innerEarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FFC2D1" />
          <stop offset="1" stopColor="#FFE5EC" />
        </linearGradient>
      </defs>

      {/* Long Floppy Ears */}
      {/* Left Ear */}
      <g transform="rotate(-15 65 50)">
        <ellipse cx="65" cy="50" rx="14" ry="45" fill="url(#bunnyGrad)" stroke="#E5D5C5" strokeWidth="2" />
        <ellipse cx="65" cy="52" rx="7" ry="34" fill="url(#innerEarGrad)" />
      </g>
      {/* Right Ear with friendly bend */}
      <g transform="rotate(18 115 50)">
        <ellipse cx="115" cy="50" rx="14" ry="45" fill="url(#bunnyGrad)" stroke="#E5D5C5" strokeWidth="2" />
        <ellipse cx="115" cy="52" rx="7" ry="34" fill="url(#innerEarGrad)" />
      </g>

      {/* Tiny flower on ear */}
      <g transform="translate(68, 55)">
        <circle cx="0" cy="-6" r="4" fill="#FFB7C5" />
        <circle cx="6" cy="-2" r="4" fill="#FFB7C5" />
        <circle cx="4" cy="5" r="4" fill="#FFB7C5" />
        <circle cx="-4" cy="5" r="4" fill="#FFB7C5" />
        <circle cx="-6" cy="-2" r="4" fill="#FFB7C5" />
        <circle cx="0" cy="1" r="3.5" fill="#F5C451" />
      </g>

      {/* Bunny Body */}
      <path
        d="M55 130 C45 155, 48 185, 90 185 C132 185, 135 155, 125 130 Z"
        fill="url(#bunnyGrad)"
        stroke="#E5D5C5"
        strokeWidth="2"
      />

      {/* Paws */}
      {variant === 'peeking' ? (
        <g id="bunnyPeekingPaws">
          <ellipse cx="72" cy="138" rx="11" ry="8" fill="#FFFFFF" stroke="#E5D5C5" strokeWidth="1.5" />
          <ellipse cx="108" cy="138" rx="11" ry="8" fill="#FFFFFF" stroke="#E5D5C5" strokeWidth="1.5" />
        </g>
      ) : (
        <g id="bunnyCheeringPaws">
          <ellipse cx="48" cy="115" rx="9" ry="14" transform="rotate(-30 48 115)" fill="#FFFFFF" stroke="#E5D5C5" strokeWidth="1.5" />
          <ellipse cx="132" cy="115" rx="9" ry="14" transform="rotate(30 132 115)" fill="#FFFFFF" stroke="#E5D5C5" strokeWidth="1.5" />
        </g>
      )}

      {/* Head */}
      <circle cx="90" cy="98" r="38" fill="url(#bunnyGrad)" stroke="#E5D5C5" strokeWidth="2" />

      {/* Eyes */}
      <ellipse cx="76" cy="95" rx="4.5" ry="5.5" fill="#3D3028" />
      <circle cx="75" cy="93" r="1.8" fill="white" />
      <circle cx="78" cy="96" r="0.8" fill="white" />

      <ellipse cx="104" cy="95" rx="4.5" ry="5.5" fill="#3D3028" />
      <circle cx="103" cy="93" r="1.8" fill="white" />
      <circle cx="106" cy="96" r="0.8" fill="white" />

      {/* Cute Bunny Nose */}
      <polygon points="90,105 87,101 93,101" fill="#FF85A2" />
      {/* Mouth */}
      <path d="M90 105 L90 108" stroke="#6D5A50" strokeWidth="1.5" />
      <path d="M85 108 Q90 112 95 108" stroke="#6D5A50" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Rosy Cheeks */}
      <ellipse cx="68" cy="103" rx="7" ry="4.5" fill="#FFAAA6" opacity="0.65" />
      <ellipse cx="112" cy="103" rx="7" ry="4.5" fill="#FFAAA6" opacity="0.65" />

      {/* Whiskers */}
      <line x1="64" y1="102" x2="50" y2="100" stroke="#C5B5A5" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="64" y1="106" x2="52" y2="108" stroke="#C5B5A5" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="116" y1="102" x2="130" y2="100" stroke="#C5B5A5" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="116" y1="106" x2="128" y2="108" stroke="#C5B5A5" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};
