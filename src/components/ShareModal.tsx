import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, Share2, X, Sparkles, MessageCircle } from 'lucide-react';
import { BirthdayCardData } from '../types/card';
import { generateShareableUrl } from '../utils/urlData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: BirthdayCardData;
  onOpenCard: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  cardData,
  onOpenCard
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = generateShareableUrl(cardData);
  const urlLength = shareUrl.length;
  const approxKb = (urlLength / 1024).toFixed(1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `🎂 A special birthday surprise for you, ${cardData.recipientName}! ✨\n\nOpen your card here: ${shareUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blush-200 overflow-hidden"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blush-100/60 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-blush-100 text-blush-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-800">
                Your Link is Ready! ✨
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm">
                100% plug-and-play, zero-backend shareable card
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Send this magical link to <strong className="text-blush-600">{cardData.recipientName}</strong>. Everything is encoded directly into the URL hash, requiring no login, no server, and no database!
          </p>

          {/* URL Display & Copy Box */}
          <div className="mt-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Shareable Link
            </label>
            <div className="flex items-center gap-2 bg-stone-50 rounded-2xl p-2 border border-stone-200 focus-within:border-blush-400 focus-within:ring-2 focus-within:ring-blush-100 transition-all">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-stone-700 px-2 outline-none font-mono truncate"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blush-500 hover:bg-blush-600 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* URL Size & Status Badge */}
          <div className="mt-3 flex items-center justify-between text-xs text-stone-500 px-1">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Ready to send anywhere
            </span>
            <span>URL size: ~{approxKb} KB</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Share on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            {/* Open Card */}
            <button
              onClick={() => {
                onClose();
                onOpenCard();
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blush-50 hover:bg-blush-100 text-blush-700 font-medium text-sm border border-blush-200 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open & Experience Card</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
