import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Sparkles, PlusCircle } from 'lucide-react';
import { TeddyBearSvg } from '../illustrations/TeddyBearSvg';

interface Scene8FinalCelebrationProps {
  recipientName: string;
  senderName: string;
  onReplay: () => void;
  onCreateYourOwn: () => void;
}

export const Scene8FinalCelebration: React.FC<Scene8FinalCelebrationProps> = ({
  recipientName,
  senderName,
  onReplay,
  onCreateYourOwn
}) => {
  // Launch gentle celebratory confetti burst on mount
  useEffect(() => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#FFAAA6', '#F5C451', '#7CD4FD', '#D83A6F', '#C4E7BD'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden bg-gradient-to-b from-blush-100 via-white to-blush-50 select-none">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blush-200/50 blur-3xl pointer-events-none" />

      {/* Header Announcement */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center z-20 mt-4 max-w-sm px-4"
      >
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 border border-blush-200 text-blush-600 text-xs font-semibold uppercase tracking-widest shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>wishing you the best</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-800 font-bold leading-tight">
          Happy Birthday, <br />
          <span className="italic text-blush-500 font-bold bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 bg-clip-text text-transparent">
            {recipientName || 'You'}! 🎂
          </span>
        </h1>

        <p className="text-stone-600 text-sm sm:text-base mt-2 font-sans max-w-xs mx-auto">
          May this year bring you countless little reasons to smile.
        </p>

        {senderName && (
          <p className="text-blush-600 font-handwriting text-2xl sm:text-3xl mt-2 font-semibold">
            — with love, {senderName} 💖
          </p>
        )}
      </motion.div>

      {/* Centerpiece: Cheerful Teddy Bear Holding Pink Balloon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        className="relative my-auto w-48 h-48 sm:w-56 sm:h-56 z-10 flex items-center justify-center pointer-events-none drop-shadow-xl"
      >
        <TeddyBearSvg variant="balloon" balloonColor="#D83A6F" className="w-full h-full" />
      </motion.div>

      {/* Bottom Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-xs flex flex-col items-center gap-2.5 z-20 mb-4"
      >
        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="btn-secondary w-full group cursor-pointer"
          aria-label="Replay the surprise"
        >
          <RotateCcw className="w-4 h-4 text-blush-500 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Replay the surprise ↺</span>
        </button>

        {/* Create Your Own Card Button */}
        <button
          onClick={onCreateYourOwn}
          className="btn-primary w-full group text-sm sm:text-base py-3"
          aria-label="Create your own birthday card"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Make your own card ✨</span>
        </button>

        <p className="text-stone-400 text-xs font-handwriting text-base">
          made with love • share the joy
        </p>
      </motion.div>

    </div>
  );
};
