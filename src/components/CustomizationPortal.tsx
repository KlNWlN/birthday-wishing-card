import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  User, 
  Music, 
  Upload, 
  RefreshCw, 
  Eye, 
  Share2, 
  Check, 
  Image as ImageIcon 
} from 'lucide-react';
import { BirthdayCardData, DEFAULT_CARD_DATA, DEFAULT_PHOTOS, DEFAULT_LETTER } from '../types/card';
import { compressImageFile } from '../utils/imageCompressor';
import { MemoryArtSvg } from './illustrations/MemoryArtSvg';
import { ShareModal } from './ShareModal';

interface CustomizationPortalProps {
  initialData?: BirthdayCardData;
  onPreview: (data: BirthdayCardData) => void;
}

export const CustomizationPortal: React.FC<CustomizationPortalProps> = ({
  initialData = DEFAULT_CARD_DATA,
  onPreview
}) => {
  const [cardData, setCardData] = useState<BirthdayCardData>(initialData);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [compressingIndex, setCompressingIndex] = useState<number | null>(null);

  // Field change handlers
  const handleTextChange = (field: keyof BirthdayCardData, value: string | boolean) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setCardData((prev) => {
      const updatedPhotos = [...prev.photos];
      updatedPhotos[index] = { ...updatedPhotos[index], caption };
      return { ...prev, photos: updatedPhotos };
    });
  };

  const handlePhotoUpload = async (index: number, file: File) => {
    try {
      setCompressingIndex(index);
      const compressedDataUrl = await compressImageFile(file, 320, 0.65);
      setCardData((prev) => {
        const updatedPhotos = [...prev.photos];
        updatedPhotos[index] = {
          ...updatedPhotos[index],
          url: compressedDataUrl
        };
        return { ...prev, photos: updatedPhotos };
      });
    } catch (err) {
      console.error('Failed to compress image:', err);
      alert('Could not compress the selected image. Please try another photo.');
    } finally {
      setCompressingIndex(null);
    }
  };

  const handleResetPhoto = (index: number) => {
    setCardData((prev) => {
      const updatedPhotos = [...prev.photos];
      updatedPhotos[index] = {
        ...updatedPhotos[index],
        url: DEFAULT_PHOTOS[index].url,
        caption: DEFAULT_PHOTOS[index].caption
      };
      return { ...prev, photos: updatedPhotos };
    });
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all fields back to default demo card?')) {
      setCardData(DEFAULT_CARD_DATA);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-100 via-blush-50/40 to-cream-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Top Header & Branding */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-blush-200 text-blush-600 text-xs font-semibold uppercase tracking-wider shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Interactive Birthday Card Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-stone-800 font-bold tracking-tight">
            Design a Magical <br />
            <span className="italic text-blush-500 font-bold bg-gradient-to-r from-blush-500 via-rose-500 to-blush-600 bg-clip-text text-transparent">
              Birthday Experience ✨
            </span>
          </h1>

          <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Customize an 8-scene animated storybook card. Once customized, generate a unique shareable link with zero server or database setup!
          </p>
        </header>

        {/* Main Card Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-blush-100 space-y-8">
          
          {/* Section 1: Core Details */}
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 flex items-center gap-2">
                <span>1. Card Details</span>
              </h2>
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="text-xs text-stone-400 hover:text-blush-600 flex items-center gap-1 transition-colors"
                title="Reset all fields to demo"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Recipient's Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Recipient's Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.recipientName}
                    onChange={(e) => handleTextChange('recipientName', e.target.value)}
                    placeholder="e.g. Aanya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:border-blush-500 focus:ring-2 focus:ring-blush-100 outline-none transition-all"
                  />
                  <Heart className="w-4 h-4 text-blush-300 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Birthday Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Birthday Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.birthdayDate}
                    onChange={(e) => handleTextChange('birthdayDate', e.target.value)}
                    placeholder="e.g. 28 September"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:border-blush-500 focus:ring-2 focus:ring-blush-100 outline-none transition-all"
                  />
                  <Calendar className="w-4 h-4 text-blush-300 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Sender's Name / Sign-off */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Sender / Sign-off
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.senderName}
                    onChange={(e) => handleTextChange('senderName', e.target.value)}
                    placeholder="e.g. Someone Special"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:border-blush-500 focus:ring-2 focus:ring-blush-100 outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-blush-300 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Personal Letter */}
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800">
                2. Personal Letter 💌
              </h2>
              <button
                type="button"
                onClick={() => handleTextChange('letter', DEFAULT_LETTER)}
                className="text-xs text-blush-600 hover:text-blush-700 underline"
              >
                Restore Template
              </button>
            </div>

            <div>
              <textarea
                rows={6}
                value={cardData.letter}
                onChange={(e) => handleTextChange('letter', e.target.value)}
                placeholder="Write your personal birthday message here..."
                className="w-full p-4 rounded-2xl border border-stone-200 text-stone-800 text-sm sm:text-base leading-relaxed focus:border-blush-500 focus:ring-2 focus:ring-blush-100 outline-none transition-all resize-y font-sans"
              />
              <p className="text-stone-400 text-xs mt-1.5 flex items-center justify-between">
                <span>Supports multiple paragraphs. The first letter renders with an elegant decorative drop-cap.</span>
                <span>{cardData.letter.length} characters</span>
              </p>
            </div>
          </div>

          {/* Section 3: 4 Memory Photos */}
          <div>
            <div className="border-b border-stone-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-800">
                  3. Memory Photos & Captions 📷
                </h2>
                <p className="text-stone-500 text-xs mt-0.5">
                  Pre-loaded with cute pastel illustrations, or upload your own photos (auto-compressed via Canvas).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cardData.photos.slice(0, 4).map((photo, index) => {
                const isDefault = photo.url.startsWith('default-');

                return (
                  <div
                    key={photo.id || index}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                      <span>Memory Photo #{index + 1}</span>
                      {!isDefault && (
                        <button
                          type="button"
                          onClick={() => handleResetPhoto(index)}
                          className="text-blush-600 hover:text-blush-700 underline text-xs"
                        >
                          Use Cute Illustration
                        </button>
                      )}
                    </div>

                    {/* Image Preview & Upload Dropzone */}
                    <div className="flex items-center gap-3">
                      {/* Image Thumbnail */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-stone-200 bg-white shrink-0 shadow-xs">
                        {isDefault ? (
                          <MemoryArtSvg type={photo.url} className="w-full h-full object-cover" />
                        ) : (
                          <img
                            src={photo.url}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                          />
                        )}

                        {compressingIndex === index && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs text-blush-600 font-medium">
                            Resizing...
                          </div>
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 space-y-1.5">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blush-50 border border-stone-200 hover:border-blush-300 text-stone-700 hover:text-blush-600 text-xs font-medium cursor-pointer transition-all shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isDefault ? 'Upload Photo' : 'Change Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePhotoUpload(index, file);
                            }}
                          />
                        </label>
                        <p className="text-[11px] text-stone-400">
                          {isDefault
                            ? 'Cute pastel default active'
                            : 'Compressed for URL sharing'}
                        </p>
                      </div>
                    </div>

                    {/* Caption Input */}
                    <div>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handleCaptionChange(index, e.target.value)}
                        placeholder="Handwritten caption..."
                        className="w-full px-3 py-1.5 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm font-handwriting text-lg focus:border-blush-500 focus:ring-1 focus:ring-blush-100 outline-none transition-all bg-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Audio Toggle */}
          <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blush-100 text-blush-600">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800">
                  Music-Box Birthday Melody
                </h4>
                <p className="text-xs text-stone-500">
                  Synthesizes a soft, gentle lullaby melody using Web Audio API on first click.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={cardData.musicEnabled}
                onChange={(e) => handleTextChange('musicEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blush-500" />
            </label>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3 justify-end">
            {/* Preview Button */}
            <button
              type="button"
              onClick={() => onPreview(cardData)}
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-blush-500" />
              <span>Preview Card</span>
            </button>

            {/* Create Shareable Link Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Create Shareable Link ✨</span>
            </button>
          </div>

        </div>

      </div>

      {/* Shareable Link Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        cardData={cardData}
        onOpenCard={() => onPreview(cardData)}
      />
    </div>
  );
};
