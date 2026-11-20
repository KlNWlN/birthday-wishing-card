import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { BirthdayCardData } from '../types/card';
import { musicBox } from '../utils/musicBox';
import { Scene1Envelope } from './scenes/Scene1Envelope';
import { Scene2DarkRoom } from './scenes/Scene2DarkRoom';
import { Scene3BirthdayReveal } from './scenes/Scene3BirthdayReveal';
import { Scene4CakeCutting } from './scenes/Scene4CakeCutting';
import { Scene5MakeAWish } from './scenes/Scene5MakeAWish';
import { Scene6MemoryPolaroids } from './scenes/Scene6MemoryPolaroids';
import { Scene7PersonalLetter } from './scenes/Scene7PersonalLetter';
import { Scene8FinalCelebration } from './scenes/Scene8FinalCelebration';

interface WishExperienceProps {
  cardData: BirthdayCardData;
  onBackToStudio: () => void;
}

export const WishExperience: React.FC<WishExperienceProps> = ({
  cardData,
  onBackToStudio
}) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(!cardData.musicEnabled);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Subscribe to music box state updates
  useEffect(() => {
    const unsubscribe = musicBox.subscribe(() => {
      setIsAudioMuted(musicBox.getIsMuted());
      setIsAudioPlaying(musicBox.getIsPlaying());
    });
    return () => {
      unsubscribe();
      musicBox.stop();
    };
  }, []);

  // Handle first gesture to unlock Web Audio API autoplay
  const handleStartMusic = () => {
    if (cardData.musicEnabled && !isAudioPlaying) {
      musicBox.start();
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAudioPlaying) {
      musicBox.start();
    } else {
      musicBox.toggleMute();
    }
  };

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 8));
  };

  const prevScene = () => {
    setCurrentScene((prev) => Math.max(prev - 1, 1));
  };

  const resetToStart = () => {
    setCurrentScene(1);
    if (cardData.musicEnabled) {
      musicBox.start();
    }
  };

  // Scene transition slide animations
  const pageVariants: Variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.35 } }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center bg-[#EFECE6] sm:p-4 overflow-hidden">
      
      {/* Ambient background blur elements for desktop */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-96 h-96 bg-blush-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-40 -right-40 w-96 h-96 bg-gold-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile/Tablet Device Container */}
      <div className="relative w-full sm:max-w-[430px] h-[100dvh] sm:h-[880px] sm:max-h-[92vh] sm:rounded-[40px] bg-white shadow-2xl overflow-hidden flex flex-col sm:border-[8px] sm:border-stone-800/10">
        
        {/* Floating Top Bar */}
        <header className="absolute top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-auto">
          {/* Back to Studio Button */}
          <button
            onClick={onBackToStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-stone-200/70 shadow-xs text-stone-600 hover:text-blush-600 text-xs font-medium transition-all"
            title="Edit or customize this card"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Studio</span>
          </button>

          {/* Scene Progress Dots & Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-stone-200/50 shadow-xs">
            <span className="text-[11px] font-semibold text-stone-600 tracking-wide">
              {currentScene}/8
            </span>
            <div className="flex items-center gap-1 ml-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setCurrentScene(s)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === currentScene
                      ? 'w-4 bg-blush-500'
                      : s < currentScene
                      ? 'w-1.5 bg-blush-300'
                      : 'w-1.5 bg-stone-200'
                  }`}
                  aria-label={`Jump to scene ${s}`}
                />
              ))}
            </div>
          </div>

          {/* Music Toggle Button */}
          {cardData.musicEnabled && (
            <button
              onClick={handleToggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-xs text-xs font-medium transition-all cursor-pointer ${
                !isAudioMuted && isAudioPlaying
                  ? 'bg-blush-50 border-blush-300 text-blush-700 animate-pulse-subtle'
                  : 'bg-white/80 border-stone-200/70 text-stone-500 hover:text-stone-700'
              }`}
              title={isAudioMuted ? 'Unmute music box' : 'Mute music box'}
            >
              {!isAudioMuted && isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-blush-600 animate-bounce" style={{ animationDuration: '2s' }} />
                  <span className="text-[11px] font-semibold">🔊 Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-[11px]">🔇 Muted</span>
                </>
              )}
            </button>
          )}
        </header>

        {/* Scene Content Frame */}
        <main className="relative w-full h-full flex-1 overflow-hidden pt-12 pb-3 flex flex-col">
          <AnimatePresence mode="wait">
            {currentScene === 1 && (
              <motion.div
                key="scene-1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene1Envelope
                  recipientName={cardData.recipientName}
                  onOpen={() => {
                    handleStartMusic();
                    nextScene();
                  }}
                />
              </motion.div>
            )}

            {currentScene === 2 && (
              <motion.div
                key="scene-2"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene2DarkRoom onTurnOnLights={nextScene} />
              </motion.div>
            )}

            {currentScene === 3 && (
              <motion.div
                key="scene-3"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene3BirthdayReveal
                  recipientName={cardData.recipientName}
                  birthdayDate={cardData.birthdayDate}
                  onNext={nextScene}
                />
              </motion.div>
            )}

            {currentScene === 4 && (
              <motion.div
                key="scene-4"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene4CakeCutting onWishClick={nextScene} />
              </motion.div>
            )}

            {currentScene === 5 && (
              <motion.div
                key="scene-5"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene5MakeAWish onWishComplete={nextScene} />
              </motion.div>
            )}

            {currentScene === 6 && (
              <motion.div
                key="scene-6"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene6MemoryPolaroids
                  photos={cardData.photos}
                  onReadLetter={nextScene}
                />
              </motion.div>
            )}

            {currentScene === 7 && (
              <motion.div
                key="scene-7"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene7PersonalLetter
                  recipientName={cardData.recipientName}
                  senderName={cardData.senderName}
                  letter={cardData.letter}
                  onNext={nextScene}
                />
              </motion.div>
            )}

            {currentScene === 8 && (
              <motion.div
                key="scene-8"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Scene8FinalCelebration
                  recipientName={cardData.recipientName}
                  senderName={cardData.senderName}
                  onReplay={resetToStart}
                  onCreateYourOwn={onBackToStudio}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Subtle Bottom Stepper Navigation (Only visible on hover/tap) */}
        <footer className="absolute bottom-1 left-0 right-0 z-40 px-4 py-1 flex items-center justify-between opacity-30 hover:opacity-100 transition-opacity pointer-events-none">
          {currentScene > 1 ? (
            <button
              onClick={prevScene}
              className="p-1 rounded-full bg-white/70 shadow-xs pointer-events-auto text-stone-600 hover:text-blush-600"
              title="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : <div />}

          {currentScene < 8 ? (
            <button
              onClick={nextScene}
              className="p-1 rounded-full bg-white/70 shadow-xs pointer-events-auto text-stone-600 hover:text-blush-600"
              title="Next scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </footer>

      </div>
    </div>
  );
};
