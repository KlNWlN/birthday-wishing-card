import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Calendar } from 'lucide-react';
import { TeddyBearSvg } from '../illustrations/TeddyBearSvg';
import { BalloonsSvg, GiftBoxSvg, BuntingFlagsSvg } from '../illustrations/PartyDecorationsSvg';

interface Scene3BirthdayRevealProps {
  recipientName: string;
  birthdayDate: string;
  onNext: () => void;
}

export const Scene3BirthdayReveal: React.FC<Scene3BirthdayRevealProps> = ({
  recipientName,
  birthdayDate,
  onNext
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-4 overflow-hidden bg-[#FFFDF9] select-none">
      
      {/* Pastel Vertical-Striped Wallpaper Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #FDE8E0 0px, #FDE8E0 24px, transparent 24px, transparent 48px, #FCE7EF 48px, #FCE7EF 72px, transparent 72px, transparent 96px)'
        }}
      />

      {/* Hanging Bunting Flags at the Very Top */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
      >
        <BuntingFlagsSvg className="w-full h-12 sm:h-14 drop-shadow-sm" />
      </motion.div>

      {/* Floating Balloons (Top Right) */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-10 right-1 sm:right-6 z-10 animate-float-slow pointer-events-none"
      >
        <BalloonsSvg className="w-28 h-36 sm:w-36 sm:h-48 drop-shadow-md" />
      </motion.div>

      {/* Floating Handwritten Sticky Note */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: -6, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 }}
        className="absolute top-16 left-3 sm:left-8 z-20 bg-[#FFF7D6] px-3.5 py-2 rounded-md shadow-md border border-[#F0E0A6] text-stone-700 font-handwriting text-lg sm:text-xl pointer-events-none"
      >
        <span>yay, you're here! 🥳</span>
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-red-200/50 -rotate-2" />
      </motion.div>

      {/* Central Announcement Card */}
      <div className="relative z-20 flex flex-col items-center text-center mt-14 sm:mt-16 max-w-sm px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-blush-500 font-medium text-xs sm:text-sm tracking-wider uppercase mb-1 font-sans"
        >
          Look who's having a birthday...
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-800 font-semibold leading-tight drop-shadow-sm"
        >
          Happy Birthday, <br />
          <span className="italic text-blush-500 font-bold bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 bg-clip-text text-transparent">
            {recipientName || 'Friend'} ✨
          </span>
        </motion.h1>

        {/* Birthday Date Pill Badge */}
        {birthdayDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blush-200 text-stone-700 font-medium text-xs sm:text-sm shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-blush-500" />
            <span>🎂 {birthdayDate}</span>
          </motion.div>
        )}
      </div>

      {/* Cheering Characters & Gift Box at Bottom Section */}
      <div className="relative w-full max-w-sm flex items-end justify-between px-2 sm:px-6 z-10">
        {/* Gift Box Left */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
          className="w-20 h-20 sm:w-24 sm:h-24 pointer-events-none drop-shadow-sm"
        >
          <GiftBoxSvg className="w-full h-full" />
        </motion.div>

        {/* Cheering Party Teddy Bear Center-Right */}
        <motion.div
          initial={{ scale: 0, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          className="w-32 h-32 sm:w-40 sm:h-40 pointer-events-none drop-shadow-lg"
        >
          <TeddyBearSvg variant="cheering" className="w-full h-full" />
        </motion.div>
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-xs flex flex-col items-center z-20 mb-4"
      >
        <button
          onClick={onNext}
          className="btn-primary w-full group"
          aria-label="Continue to cake"
        >
          <span>There's more</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
        <p className="text-stone-400 text-xs mt-2 font-handwriting text-base">
          your cake is waiting downstairs 🍰
        </p>
      </motion.div>

    </div>
  );
};
