import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  X, 
  Sparkles, 
  MessageCircle, 
  Globe, 
  AlertTriangle,
  Smartphone,
  Info
} from 'lucide-react';
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
  const [customDomain, setCustomDomain] = useState<string>('');
  const [showDomainInput, setShowDomainInput] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  if (!isOpen) return null;

  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Compute shareable URL
  const activeBaseUrl = customDomain.trim() ? customDomain.trim() : undefined;
  const shareUrl = generateShareableUrl(cardData, activeBaseUrl);
  const urlLength = shareUrl.length;
  const approxKb = (urlLength / 1024).toFixed(1);
  const isLargePayload = urlLength > 3500;

  // Copy to clipboard with multi-fallback
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch {
      // Fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
      prompt('Copy your link:', shareUrl);
    }
  };

  // Native share sheet (WhatsApp, iMessage, etc.)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Birthday Surprise for ${cardData.recipientName}! 🎂`,
          text: `A special birthday wishing card made just for you, ${cardData.recipientName}! ✨`,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share dismissed or failed:', err);
      }
    }
  };

  const whatsappMessage = encodeURIComponent(
    `🎂 A special birthday surprise for you, ${cardData.recipientName}! ✨\n\nOpen your card here:\n${shareUrl}`
  );
  // Uses api.whatsapp.com which works reliably on both mobile and desktop
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/65 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative max-w-lg w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-blush-200 overflow-hidden my-auto"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-blush-100/60 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-full bg-blush-100 text-blush-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-800">
                Your Shareable Link ✨
              </h3>
              <p className="text-stone-500 text-xs">
                Zero-backend encoded card for {cardData.recipientName}
              </p>
            </div>
          </div>

          {/* Localhost Notice Banner */}
          {isLocalhost && !customDomain && (
            <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>You are currently previewing on localhost</span>
              </div>
              <p className="text-amber-700">
                A <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">localhost</code> link only works on your current computer. Other people won't be able to open it until you deploy the site to a free public host like <strong>Vercel</strong> or <strong>Netlify</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowDomainInput(!showDomainInput)}
                className="mt-1 font-semibold underline text-amber-800 hover:text-amber-950 inline-block"
              >
                {showDomainInput ? 'Hide live domain override' : 'Have a live domain? Click here to use it'}
              </button>
            </div>
          )}

          {/* Live Domain Override Input */}
          {(showDomainInput || (!isLocalhost && showDomainInput)) && (
            <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">
                Custom Live Domain (e.g. https://your-name.vercel.app)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="https://birthday-card.vercel.app"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-300 outline-none focus:border-blush-500"
                />
                {customDomain && (
                  <button
                    type="button"
                    onClick={() => setCustomDomain('')}
                    className="text-xs text-stone-400 hover:text-stone-600 px-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}

          {/* URL Display & Copy Box */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Shareable URL
              </label>
              <span className={`text-[11px] font-medium ${isLargePayload ? 'text-amber-600' : 'text-emerald-600'}`}>
                {approxKb} KB ({urlLength} characters)
              </span>
            </div>

            <div className="flex items-center gap-2 bg-stone-50 rounded-2xl p-2 border border-stone-200 focus-within:border-blush-400 focus-within:ring-2 focus-within:ring-blush-100 transition-all">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent border-none text-xs text-stone-700 px-2 outline-none font-mono truncate"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blush-500 hover:bg-blush-600 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Large URL Warning if custom photos exceed WhatsApp safety limit */}
          {isLargePayload && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Some chat apps (like WhatsApp) can truncate links over 4,000 characters. For the best sharing experience across all chat apps, using the built-in cute illustrations keeps links under 1 KB.
              </span>
            </div>
          )}

          {/* Action Sharing Buttons */}
          <div className="mt-5 space-y-2.5">
            {/* Native Mobile Share Sheet if supported */}
            {canNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blush-500 hover:bg-blush-600 text-white font-medium text-sm transition-all shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via Any App (Messages, AirDrop, etc.)</span>
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Share on WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>

              {/* Open Card in Browser */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCard();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs sm:text-sm transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-stone-500" />
                <span>Open & Test Card</span>
              </button>
            </div>
          </div>

          {/* Friendly Footnote */}
          <p className="text-center text-stone-400 text-[11px] mt-4 font-sans">
            Recipient opens the card instantly in their mobile browser • No sign-up required
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
