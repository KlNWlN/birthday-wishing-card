import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Scissors, ArrowRight } from 'lucide-react';
import { BirthdayCakeSvg } from '../illustrations/BirthdayCakeSvg';

interface Scene4CakeCuttingProps {
  onWishClick: () => void;
}

export const Scene4CakeCutting: React.FC<Scene4CakeCuttingProps> = ({
  onWishClick
}) => {
  const [isCut, setIsCut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [glowTrail, setGlowTrail] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);

  // Trigger confetti burst on cut
  const triggerConfetti = () => {
    // Left burst
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y: 0.65 },
      colors: ['#FFAAA6', '#F5C451', '#7CD4FD', '#C4E7BD', '#D83A6F']
    });
    // Right burst
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y: 0.65 },
      colors: ['#FFAAA6', '#F5C451', '#7CD4FD', '#C4E7BD', '#D83A6F']
    });
    // Center celebratory shower
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FF6B8B', '#F5C451', '#9EE2FF', '#FFFFFF']
      });
    }, 250);
  };

  const handleCutComplete = () => {
    if (isCut) return;
    setIsCut(true);
    triggerConfetti();
  };

  // Pointer event handlers for downward swipe/drag across cake
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCut) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Capture pointer
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    startYRef.current = e.clientY;
    setGlowTrail([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isCut) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentY = e.clientY;
    const deltaY = currentY - startYRef.current;
    const maxDistance = 180; // pixels to complete swipe

    if (deltaY > 0) {
      const progress = Math.min(Math.max(deltaY / maxDistance, 0), 1);
      setDragProgress(progress);

      // Add to glowing trail
      setGlowTrail((prev) => [
        ...prev.slice(-8),
        { x: e.clientX - rect.left, y: e.clientY - rect.top }
      ]);

      if (progress >= 0.85) {
        setIsDragging(false);
        handleCutComplete();
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isCut) return;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    setIsDragging(false);
    setGlowTrail([]);
    if (dragProgress < 0.85) {
      setDragProgress(0);
    }
  };

  // Clear glow trail after drag ends
  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => setGlowTrail([]), 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-6 overflow-hidden bg-cream-100 select-none">
      
      {/* Background Soft Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush-50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Text Section */}
      <div className="text-center z-20 mt-3 max-w-sm px-4">
        <motion.div
          key={isCut ? "cut-eyebrow" : "uncut-eyebrow"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blush-500 font-medium text-xs sm:text-sm tracking-widest uppercase mb-1"
        >
          {isCut ? 'Sweet celebration' : 'Cake time 🎂'}
        </motion.div>

        <motion.h2
          key={isCut ? "cut-heading" : "uncut-heading"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl text-stone-800 font-semibold leading-tight"
        >
          {isCut ? (
            <span className="text-blush-600 font-bold">You did it! 🎉</span>
          ) : (
            <>
              Make the first <span className="italic text-blush-500">cut ✨</span>
            </>
          )}
        </motion.h2>

        <motion.p
          key={isCut ? "cut-sub" : "uncut-sub"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-stone-500 text-sm sm:text-base mt-1.5 font-sans"
        >
          {isCut
            ? 'The first slice is always the sweetest one.'
            : 'Swipe down across the cake, top to bottom.'}
        </motion.p>
      </div>

      {/* Interactive Cake Drag Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative my-auto w-full max-w-xs sm:max-w-sm flex items-center justify-center z-10 touch-none cursor-grab active:cursor-grabbing"
      >
        <BirthdayCakeSvg
          isCut={isCut}
          splitOffset={isCut ? 36 : dragProgress * 30}
          showDashedLine={!isCut}
          className="w-72 h-72 sm:w-84 sm:h-84 drop-shadow-lg"
        />

        {/* Glowing Pointer Trail */}
        {glowTrail.map((point, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full pointer-events-none z-30 bg-gold-400 blur-[2px]"
            style={{
              left: point.x,
              top: point.y,
              width: 14 + index * 2,
              height: 14 + index * 2,
              transform: 'translate(-50%, -50%)',
              opacity: (index + 1) / glowTrail.length
            }}
          />
        ))}

        {/* Helper Hint: Swipe indicator bouncing */}
        {!isCut && (
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blush-200 shadow-md text-xs font-medium text-blush-600 flex items-center gap-1.5"
          >
            <Scissors className="w-3.5 h-3.5 text-blush-500 rotate-90" />
            <span>swipe down to slice</span>
          </motion.div>
        )}
      </div>

      {/* Bottom Area: Either "Tap to cut" Fallback or "Make a Wish" button */}
      <div className="w-full max-w-xs flex flex-col items-center z-20 mb-4 min-h-[85px] justify-end">
        <AnimatePresence mode="wait">
          {!isCut ? (
            <motion.div
              key="cut-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center w-full"
            >
              <button
                onClick={handleCutComplete}
                className="btn-secondary w-full text-xs sm:text-sm py-2.5 hover:border-blush-400"
              >
                <span>Or tap here to cut cake 🍰</span>
              </button>
              <p className="text-stone-400 text-xs mt-2 font-handwriting text-base">
                don't be shy, take a slice!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wish-reveal-button"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 220 }}
              className="flex flex-col items-center w-full"
            >
              <button
                onClick={onWishClick}
                className="btn-primary w-full group animate-pulse-subtle"
                aria-label="Make a wish"
              >
                <Sparkles className="w-4 h-4 text-gold-300 fill-gold-300" />
                <span>Make a wish ✨</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-stone-400 text-xs mt-2 font-handwriting text-base">
                ready for a magical secret wish?
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
