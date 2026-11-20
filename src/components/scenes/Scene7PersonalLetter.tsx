import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface Scene7PersonalLetterProps {
  recipientName: string;
  senderName: string;
  letter: string;
  onNext: () => void;
}

export const Scene7PersonalLetter: React.FC<Scene7PersonalLetterProps> = ({
  recipientName,
  senderName,
  letter,
  onNext
}) => {
  // Format letter into paragraphs
  const paragraphs = letter
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-3 sm:px-4 py-4 overflow-hidden bg-gradient-to-b from-cream-100 via-blush-50 to-cream-100 select-none">
      
      {/* Background Subtle Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blush-300/40"
            style={{
              width: (i % 3) * 3 + 4,
              height: (i % 3) * 3 + 4,
              top: `${(i * 14) % 90 + 5}%`,
              left: `${(i * 26) % 85 + 5}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-20 mt-1"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-blush-200 text-blush-600 text-xs font-medium tracking-widest uppercase shadow-xs">
          <Sparkles className="w-3 h-3 text-gold-500" />
          <span>A letter, just for you</span>
        </div>
      </motion.div>

      {/* Stationery Paper Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
        className="relative my-auto w-full max-w-sm sm:max-w-md stationery-card rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-xl z-10 flex flex-col max-h-[62vh] overflow-hidden"
      >
        {/* Subtle decorative vintage card border */}
        <div className="absolute inset-2 border border-dashed border-blush-200/80 rounded-xl pointer-events-none" />

        {/* Letter Headline */}
        <div className="border-b border-blush-100 pb-3 mb-3 z-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-800 font-bold leading-tight">
            For you, <span className="italic text-blush-500 font-semibold">{recipientName || 'Dear Friend'}</span>
          </h2>
          <p className="text-stone-400 text-xs font-handwriting text-base mt-0.5">
            written with warmth and fondness
          </p>
        </div>

        {/* Scrollable Letter Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 z-10 text-stone-700 text-sm sm:text-base leading-relaxed font-sans select-text">
          {paragraphs.map((p, index) => (
            <p
              key={index}
              className={`${index === 0 ? 'drop-cap' : ''} text-justify sm:text-left`}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Sign-off at bottom right */}
        <div className="mt-4 pt-2 border-t border-blush-100/80 flex items-center justify-end gap-1.5 text-right z-10">
          <span className="font-handwriting text-xl sm:text-2xl text-blush-600 font-semibold italic">
            — {senderName || 'Someone Special'}
          </span>
          <Heart className="w-3.5 h-3.5 fill-blush-500 text-blush-500" />
        </div>
      </motion.div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs flex flex-col items-center z-20 mb-3"
      >
        <button
          onClick={onNext}
          className="btn-primary w-full group"
          aria-label="One last thing"
        >
          <span>One last thing 💛</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-stone-400 text-xs mt-1.5 font-handwriting text-base">
          a final celebration awaits you
        </p>
      </motion.div>

    </div>
  );
};
