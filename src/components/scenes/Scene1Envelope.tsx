import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { FloralEnvelopeSvg } from '../illustrations/FloralEnvelopeSvg';
import { TeddyBearSvg } from '../illustrations/TeddyBearSvg';
import { BunnySvg } from '../illustrations/BunnySvg';

interface Scene1EnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

export const Scene1Envelope: React.FC<Scene1EnvelopeProps> = ({
  recipientName,
  onOpen
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleOpenClick = () => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setIsOpen(true);
    // Give the flap opening, card slide-up, and plushies peek time to shine
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden bg-gradient-to-b from-cream-100 via-blush-50 to-blush-100 select-none">
      
      {/* Floating Sparkles & Dust in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) * 2 + 3,
              height: (i % 3) * 2 + 3,
              backgroundColor: i % 2 === 0 ? '#F5C451' : '#FFAAA6',
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 90 + 5}%`,
              opacity: 0.6
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.4) % 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header Text Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-20 mt-4 max-w-sm"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-blush-200 text-blush-600 text-xs font-medium tracking-wide uppercase shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>a little something ✨</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 leading-tight">
          There's something <span className="italic text-blush-500 font-semibold">for you</span>
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-2 font-sans">
          A tiny birthday surprise, made just for you.
        </p>
      </motion.div>

      {/* Centerpiece: Floral Envelope with Wax Seal */}
      <div className="relative my-auto w-full max-w-xs sm:max-w-sm flex items-center justify-center z-10">
        <FloralEnvelopeSvg isOpen={isOpen} recipientName={recipientName} />

        {/* Peek-a-boo Plushies: Pop out from left & right when envelope opens */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Teddy Bear popping out from bottom-left */}
              <motion.div
                initial={{ x: -90, y: 30, rotate: -25, opacity: 0 }}
                animate={{ x: -20, y: -10, rotate: -12, opacity: 1 }}
                exit={{ x: -90, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 15, delay: 0.2 }}
                className="absolute -left-12 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 z-30 pointer-events-none drop-shadow-lg"
              >
                <TeddyBearSvg variant="party" className="w-full h-full" />
              </motion.div>

              {/* Bunny popping out from bottom-right */}
              <motion.div
                initial={{ x: 90, y: 30, rotate: 25, opacity: 0 }}
                animate={{ x: 20, y: -10, rotate: 12, opacity: 1 }}
                exit={{ x: 90, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 15, delay: 0.3 }}
                className="absolute -right-12 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 z-30 pointer-events-none drop-shadow-lg"
              >
                <BunnySvg variant="peeking" className="w-full h-full" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-xs flex flex-col items-center z-20 mb-4"
      >
        <button
          onClick={handleOpenClick}
          disabled={hasTriggered}
          className="btn-primary w-full group overflow-hidden"
          aria-label="Open your surprise"
        >
          <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
          <span>{hasTriggered ? 'Unfolding surprise...' : '🤍 Open your surprise ✨'}</span>
        </button>
        <p className="text-stone-400 text-xs mt-2.5 font-handwriting text-base">
          tap above to begin your journey
        </p>
      </motion.div>

    </div>
  );
};
