import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ZoomIn } from 'lucide-react';
import { MemoryPhoto } from '../../types/card';
import { MemoryArtSvg } from '../illustrations/MemoryArtSvg';

interface Scene6MemoryPolaroidsProps {
  photos: MemoryPhoto[];
  onReadLetter: () => void;
}

export const Scene6MemoryPolaroids: React.FC<Scene6MemoryPolaroidsProps> = ({
  photos,
  onReadLetter
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  // Slight natural tilt rotations for the 4 polaroids
  const rotations = [-2.5, 2.5, 2, -2];

  const renderPhotoContent = (photo: MemoryPhoto) => {
    if (photo.url.startsWith('default-')) {
      return <MemoryArtSvg type={photo.url} className="w-full h-full object-cover" />;
    }
    return (
      <img
        src={photo.url}
        alt={photo.caption || 'Memory'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-3 sm:px-4 py-4 overflow-hidden bg-[#FAF7F2] select-none">
      
      {/* Background Scrapbook Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#D6C7B8 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header Text Section */}
      <div className="text-center z-20 mt-2 max-w-sm px-2">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blush-500 font-medium text-xs tracking-widest uppercase mb-1"
        >
          Cherished memories 📷
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-2xl sm:text-3xl text-stone-800 font-semibold leading-snug"
        >
          Some moments are <br className="hidden sm:inline" />
          <span className="italic text-blush-500">worth keeping forever.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-stone-500 text-xs sm:text-sm mt-1 font-sans line-clamp-2"
        >
          Here's to all the laughs, chaos, late-night talks and little moments.
        </motion.p>
      </div>

      {/* 2x2 Scrapbook Polaroid Grid */}
      <div className="relative my-auto w-full max-w-sm sm:max-w-md grid grid-cols-2 gap-3 sm:gap-4 p-2 z-10">
        {photos.slice(0, 4).map((photo, index) => {
          const rot = rotations[index % rotations.length];
          return (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhoto(photo)}
              style={{ transform: `rotate(${rot}deg)` }}
              className="group relative bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200/60"
            >
              {/* Washi Masking Tape Accent on Top Edge */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3.5 bg-amber-100/70 border-t border-b border-amber-200/60 shadow-xs z-20 pointer-events-none"
                style={{
                  transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-3deg' : '4deg'})`
                }}
              />

              {/* Polaroid Image Frame */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-stone-100 border border-stone-200">
                {renderPhotoContent(photo)}
                
                {/* Subtle Hover Zoom Icon */}
                <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-1.5 rounded-full bg-white/90 shadow-sm text-stone-700">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Handwritten Polaroid Caption */}
              <div className="mt-2 text-center px-1">
                <p className="font-handwriting text-base sm:text-lg text-stone-700 leading-tight line-clamp-1">
                  {photo.caption || 'A special moment'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs flex flex-col items-center z-20 mb-3"
      >
        <button
          onClick={onReadLetter}
          className="btn-primary w-full group"
          aria-label="Read your letter"
        >
          <Mail className="w-4 h-4 fill-white/20 text-white group-hover:scale-110 transition-transform" />
          <span>Read your letter 💌</span>
        </button>
        <p className="text-stone-400 text-xs mt-1.5 font-handwriting text-base">
          a secret message from the heart
        </p>
      </motion.div>

      {/* Enlarged Polaroid Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/65 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-xs sm:max-w-sm w-full bg-white p-3.5 pb-6 rounded-md shadow-2xl border border-stone-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 p-1.5 rounded-full bg-white text-stone-600 hover:text-stone-900 shadow-md border border-stone-200 cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Full Image */}
              <div className="aspect-square w-full rounded overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                {renderPhotoContent(selectedPhoto)}
              </div>

              {/* Caption */}
              <div className="mt-3 text-center px-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-800 leading-snug">
                  {selectedPhoto.caption || 'A special moment'}
                </p>
                <p className="text-stone-400 text-xs font-sans mt-1">
                  captured with love ✨
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
