import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { TeddyBearSvg } from '../illustrations/TeddyBearSvg';

interface Scene5MakeAWishProps {
  onWishComplete: () => void;
}

export const Scene5MakeAWish: React.FC<Scene5MakeAWishProps> = ({
  onWishComplete
}) => {
  const [hasWished, setHasWished] = useState(false);

  const handleMakeWish = () => {
    if (hasWished) return;
    setHasWished(true);

    // After 2.5s, proceed automatically, or user can click early
    setTimeout(() => {
      onWishComplete();
    }, 2800);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden bg-gradient-to-b from-cream-100 via-blush-50 to-[#FFF4E5] select-none">
      
      {/* Soft Glowing Radial Center Halo */}
      <motion.div
        animate={{
          scale: hasWished ? [1, 1.4, 1.2] : [1, 1.08, 1],
          opacity: hasWished ? [0.6, 0.9, 0.7] : [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-gold-300/40 via-blush-200/50 to-pink-200/40 blur-3xl pointer-events-none"
      />

      {/* Upward Floating Sparkles & Stars (intensifies when wish made) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(hasWished ? 30 : 12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              y: '100%',
              x: `${(i * 13) % 90 + 5}%`,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.9, 0],
              scale: [0.5, (i % 3) * 0.4 + 0.8, 0.2]
            }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.2) % 3,
              ease: "easeOut"
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            ) : (
              <div
                className="rounded-full bg-gold-400"
                style={{ width: (i % 3) * 3 + 4, height: (i % 3) * 3 + 4 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Header Text Section */}
      <div className="text-center z-20 mt-4 max-w-sm px-4">
        <AnimatePresence mode="wait">
          {!hasWished ? (
            <motion.div
              key="wish-prompt"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-blush-200 text-blush-600 text-xs font-medium tracking-wide uppercase shadow-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>a sacred moment</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 font-semibold leading-tight">
                Close your <span className="italic text-blush-500 font-bold">eyes...</span>
              </h2>
              <p className="text-stone-500 text-sm sm:text-base mt-2 font-sans">
                Make a little wish for the year ahead.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wish-granted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-700 text-xs font-semibold tracking-wide uppercase shadow-sm mb-3">
                <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                <span>whispered to the stars</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-blush-600 font-bold leading-tight">
                Your wish is on its way ✨
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 font-handwriting text-xl sm:text-2xl text-gold-600">
                "Somewhere, a tiny star just said yes."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centerpiece: Teddy Bear with Paws Together Praying/Wishing */}
      <div className="relative my-auto w-full max-w-xs sm:max-w-sm flex flex-col items-center justify-center z-10">
        <motion.div
          animate={{
            y: [0, -6, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-xl"
        >
          <TeddyBearSvg variant="wishing" className="w-full h-full" />
        </motion.div>

        {/* Golden Candle Light Halo below Teddy */}
        <div className="w-32 h-6 bg-gold-400/30 rounded-full blur-md -mt-3" />
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full max-w-xs flex flex-col items-center z-20 mb-4 min-h-[85px] justify-end">
        <AnimatePresence mode="wait">
          {!hasWished ? (
            <motion.button
              key="btn-make-wish"
              onClick={handleMakeWish}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="btn-primary w-full group cursor-pointer"
              aria-label="I made my wish"
            >
              <Star className="w-4 h-4 fill-white text-white group-hover:rotate-45 transition-transform duration-300" />
              <span>I made my wish ✨</span>
            </motion.button>
          ) : (
            <motion.button
              key="btn-continue"
              onClick={onWishComplete}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="btn-secondary w-full group text-xs sm:text-sm py-3"
            >
              <span>Continue to Memories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
        <p className="text-stone-400 text-xs mt-2 font-handwriting text-base">
          {hasWished ? 'holding onto memories next...' : 'take a deep breath and believe'}
        </p>
      </div>

    </div>
  );
};
