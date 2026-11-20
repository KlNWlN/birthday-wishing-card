import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TeddyBearSvg } from '../illustrations/TeddyBearSvg';
import { MoonStarsSvg } from '../illustrations/PartyDecorationsSvg';

interface Scene2DarkRoomProps {
  onTurnOnLights: () => void;
}

export const Scene2DarkRoom: React.FC<Scene2DarkRoomProps> = ({
  onTurnOnLights
}) => {
  const [isTurningOn, setIsTurningOn] = useState(false);

  const handleClick = () => {
    if (isTurningOn) return;
    setIsTurningOn(true);
    setTimeout(() => {
      onTurnOnLights();
    }, 1100);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden bg-night-900 text-white select-none">
      
      {/* Background Starry Sky with Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: (i % 3) + 1.5,
              height: (i % 3) + 1.5,
              top: `${(i * 17) % 85 + 5}%`,
              left: `${(i * 29) % 92 + 4}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.7, 1.3, 0.7]
            }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.3) % 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Ambient Dark-Blue & Violet Glow Clouds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-night-800/60 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Right: Glowing Crescent Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-6 right-4 sm:top-10 sm:right-8 z-10 pointer-events-none"
      >
        <MoonStarsSvg className="w-28 h-28 sm:w-36 sm:h-36" />
      </motion.div>

      {/* Center Text Section */}
      <div className="text-center z-20 mt-16 sm:mt-20 max-w-sm px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-gold-400 text-lg sm:text-xl font-medium mb-3 tracking-wide"
        >
          Shhh...
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl text-cream-50 font-medium leading-tight"
        >
          The room is waiting <br />
          <span className="italic font-light text-blush-200">for you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-300 text-sm sm:text-base mt-3 font-sans"
        >
          Someone left the lights off on purpose.
        </motion.p>
      </div>

      {/* Sleepy Teddy Bear in Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-24 left-4 sm:left-8 z-10 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none"
      >
        <TeddyBearSvg variant="sleepy" className="w-full h-full" />
      </motion.div>

      {/* Bottom Glowing CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-xs flex flex-col items-center z-20 mb-8"
      >
        <button
          onClick={handleClick}
          disabled={isTurningOn}
          className="btn-gold-glow w-full group cursor-pointer"
          aria-label="Turn on the lights"
        >
          <Lightbulb className="w-5 h-5 text-night-900 group-hover:rotate-12 transition-transform duration-300" />
          <span>{isTurningOn ? 'Illuminating...' : 'Turn on the lights ✨'}</span>
        </button>
        <p className="text-gold-300/70 text-xs mt-2.5 font-handwriting text-base">
          tap to illuminate the party
        </p>
      </motion.div>

      {/* Radial Warm-Light Flood Animation on Click */}
      <AnimatePresence>
        {isTurningOn && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 35, opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 rounded-full w-20 h-20 bg-gradient-to-r from-amber-100 via-yellow-200 to-cream-100 pointer-events-none"
            style={{
              bottom: '5rem',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
